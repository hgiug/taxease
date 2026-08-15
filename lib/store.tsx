"use client"

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react"
import type { ActionStatus, AnalysisResult, BusinessProfile, SavedBusiness } from "@/types"
import { DEMO_BUSINESS_PROFILE } from "@/data/mock-business"
import { analyzeBusiness } from "@/lib/rules-engine"
import { newProfileId } from "@/lib/business-profile"

/**
 * Client-side session store for the demo flow.
 *
 * Holds a list of tracked businesses plus the active one, so the multi-page
 * flow (assessment -> dashboard -> compliance -> benefits ...) shares state
 * and the user can track more than one business. It is seeded with a demo
 * business so any page also works standalone. State is kept in sessionStorage
 * only to survive navigation/refresh during a demo — it is NOT a persistence
 * layer and will be replaced by the API/database later.
 */

const STORAGE_KEY = "taxease.session.v2"

interface PersistShape {
  businesses: SavedBusiness[]
  activeId: string
  hasCompletedAssessment: boolean
}

interface StoreValue {
  // Active business (backwards-compatible surface)
  profile: BusinessProfile
  result: AnalysisResult
  hasCompletedAssessment: boolean
  // Multi-business surface
  businesses: SavedBusiness[]
  activeId: string
  // Mutations
  setProfile: (profile: BusinessProfile) => void
  setResultDirect: (result: AnalysisResult) => void
  addBusiness: (result: AnalysisResult) => string
  switchBusiness: (id: string) => void
  removeBusiness: (id: string) => void
  setActionStatus: (id: string, status: ActionStatus) => void
  reset: () => void
}

const StoreContext = createContext<StoreValue | null>(null)

function seedBusiness(): SavedBusiness {
  const result = analyzeBusiness(DEMO_BUSINESS_PROFILE)
  return {
    id: result.profile.id ?? "demo",
    profile: result.profile,
    result,
    createdAt: new Date().toISOString(),
  }
}

function initialState(): PersistShape {
  const demo = seedBusiness()
  return { businesses: [demo], activeId: demo.id, hasCompletedAssessment: false }
}

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<PersistShape>(initialState)

  // Rehydrate from sessionStorage after mount (avoids hydration mismatch).
  useEffect(() => {
    if (typeof window === "undefined") return
    try {
      const raw = window.sessionStorage.getItem(STORAGE_KEY)
      if (raw) {
        const parsed = JSON.parse(raw) as PersistShape
        if (parsed.businesses?.length) setState(parsed)
      }
    } catch {
      // ignore corrupt storage
    }
  }, [])

  const persist = useCallback((next: PersistShape) => {
    if (typeof window === "undefined") return
    try {
      window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(next))
    } catch {
      // ignore quota errors
    }
  }, [])

  const commit = useCallback(
    (updater: (prev: PersistShape) => PersistShape) => {
      setState((prev) => {
        const next = updater(prev)
        persist(next)
        return next
      })
    },
    [persist],
  )

  const addBusiness = useCallback(
    (result: AnalysisResult): string => {
      const id = result.profile.id ?? newProfileId()
      const profile = { ...result.profile, id }
      const saved: SavedBusiness = { id, profile, result: { ...result, profile }, createdAt: new Date().toISOString() }
      commit((prev) => {
        // Replace the untouched demo seed on the first real assessment.
        const withoutDemo = prev.hasCompletedAssessment ? prev.businesses : []
        return {
          businesses: [...withoutDemo, saved],
          activeId: id,
          hasCompletedAssessment: true,
        }
      })
      return id
    },
    [commit],
  )

  // Backwards-compatible: analyse a profile and make it the active business.
  const setProfile = useCallback(
    (profile: BusinessProfile) => {
      const withId = { ...profile, id: profile.id ?? newProfileId() }
      addBusiness(analyzeBusiness(withId))
    },
    [addBusiness],
  )

  // Backwards-compatible: accept a precomputed result (from the API route).
  const setResultDirect = useCallback(
    (result: AnalysisResult) => {
      addBusiness(result)
    },
    [addBusiness],
  )

  const switchBusiness = useCallback(
    (id: string) => {
      commit((prev) => (prev.businesses.some((b) => b.id === id) ? { ...prev, activeId: id } : prev))
    },
    [commit],
  )

  const removeBusiness = useCallback(
    (id: string) => {
      commit((prev) => {
        const remaining = prev.businesses.filter((b) => b.id !== id)
        if (remaining.length === 0) {
          const demo = seedBusiness()
          return { businesses: [demo], activeId: demo.id, hasCompletedAssessment: false }
        }
        const activeId = prev.activeId === id ? remaining[0].id : prev.activeId
        return { ...prev, businesses: remaining, activeId }
      })
    },
    [commit],
  )

  const setActionStatus = useCallback(
    (itemId: string, status: ActionStatus) => {
      commit((prev) => ({
        ...prev,
        businesses: prev.businesses.map((b) =>
          b.id !== prev.activeId
            ? b
            : {
                ...b,
                result: {
                  ...b.result,
                  actionItems: b.result.actionItems.map((a) => (a.id === itemId ? { ...a, status } : a)),
                },
              },
        ),
      }))
    },
    [commit],
  )

  const reset = useCallback(() => {
    const next = initialState()
    setState(next)
    if (typeof window !== "undefined") window.sessionStorage.removeItem(STORAGE_KEY)
  }, [])

  const active = useMemo(
    () => state.businesses.find((b) => b.id === state.activeId) ?? state.businesses[0],
    [state.businesses, state.activeId],
  )

  const value = useMemo<StoreValue>(
    () => ({
      profile: active.profile,
      result: active.result,
      hasCompletedAssessment: state.hasCompletedAssessment,
      businesses: state.businesses,
      activeId: state.activeId,
      setProfile,
      setResultDirect,
      addBusiness,
      switchBusiness,
      removeBusiness,
      setActionStatus,
      reset,
    }),
    [active, state, setProfile, setResultDirect, addBusiness, switchBusiness, removeBusiness, setActionStatus, reset],
  )

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

export function useStore(): StoreValue {
  const ctx = useContext(StoreContext)
  if (!ctx) throw new Error("useStore must be used within StoreProvider")
  return ctx
}
