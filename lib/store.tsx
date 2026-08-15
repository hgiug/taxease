"use client"

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react"
import type { ActionStatus, AssessmentResult, BusinessProfile } from "@/types"
import { MOCK_BUSINESS_PROFILE } from "@/data/mock-business"
import { analyzeBusiness } from "@/lib/rules-engine"

/**
 * Client-side session store for the demo flow.
 *
 * Holds the active business profile + assessment result so the multi-page
 * flow (assessment -> dashboard -> action plan ...) shares state. It is seeded
 * with demo data so any page also works standalone. State is kept in
 * sessionStorage only to survive navigation/refresh during a demo — it is not
 * a persistence layer and will be replaced by the API/database later.
 */

const STORAGE_KEY = "taxease.session.v1"

interface StoreValue {
  profile: BusinessProfile
  result: AssessmentResult
  hasCompletedAssessment: boolean
  setProfile: (profile: BusinessProfile) => void
  setResultDirect: (result: AssessmentResult) => void
  setActionStatus: (id: string, status: ActionStatus) => void
  reset: () => void
}

const StoreContext = createContext<StoreValue | null>(null)

function initialResult(): AssessmentResult {
  return analyzeBusiness(MOCK_BUSINESS_PROFILE)
}

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [result, setResult] = useState<AssessmentResult>(initialResult)
  const [hasCompletedAssessment, setHasCompleted] = useState(false)

  // Rehydrate from sessionStorage after mount (avoids hydration mismatch).
  useEffect(() => {
    if (typeof window === "undefined") return
    try {
      const raw = window.sessionStorage.getItem(STORAGE_KEY)
      if (raw) {
        const parsed = JSON.parse(raw) as { result: AssessmentResult; hasCompletedAssessment: boolean }
        if (parsed.result) setResult(parsed.result)
        if (parsed.hasCompletedAssessment) setHasCompleted(true)
      }
    } catch {
      // ignore corrupt storage
    }
  }, [])

  const persist = useCallback((next: AssessmentResult, completed: boolean) => {
    if (typeof window === "undefined") return
    try {
      window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ result: next, hasCompletedAssessment: completed }))
    } catch {
      // ignore quota errors
    }
  }, [])

  const setProfile = useCallback(
    (profile: BusinessProfile) => {
      const next = analyzeBusiness(profile)
      setResult(next)
      setHasCompleted(true)
      persist(next, true)
    },
    [persist],
  )

  const setResultDirect = useCallback(
    (next: AssessmentResult) => {
      setResult(next)
      setHasCompleted(true)
      persist(next, true)
    },
    [persist],
  )

  const setActionStatus = useCallback(
    (id: string, status: ActionStatus) => {
      setResult((prev) => {
        const next: AssessmentResult = {
          ...prev,
          actionItems: prev.actionItems.map((a) => (a.id === id ? { ...a, status } : a)),
        }
        persist(next, hasCompletedAssessment)
        return next
      })
    },
    [persist, hasCompletedAssessment],
  )

  const reset = useCallback(() => {
    const next = initialResult()
    setResult(next)
    setHasCompleted(false)
    if (typeof window !== "undefined") window.sessionStorage.removeItem(STORAGE_KEY)
  }, [])

  const value = useMemo<StoreValue>(
    () => ({
      profile: result.profile,
      result,
      hasCompletedAssessment,
      setProfile,
      setResultDirect,
      setActionStatus,
      reset,
    }),
    [result, hasCompletedAssessment, setProfile, setResultDirect, setActionStatus, reset],
  )

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

export function useStore(): StoreValue {
  const ctx = useContext(StoreContext)
  if (!ctx) throw new Error("useStore must be used within StoreProvider")
  return ctx
}
