"use client";

import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

const SupabaseContext = createContext({})

export const useSupabase = () => {
  const context = useContext(SupabaseContext)
  if (!context) {
    throw new Error('useSupabase must be used within a SupabaseClientProvider')
  }
  return context
}

export default function SupabaseClientProvider({ children }) {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Check if Supabase environment variables are available
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      console.warn("Supabase environment variables are not set. Database features will be disabled.")
      setError(new Error("Supabase configuration missing"))
      setIsLoading(false)
      return
    }

    // Test the connection
    const testConnection = async () => {
      try {
        const { data, error } = await supabase
          .from('users')
          .select('count')
          .limit(1)
        
        if (error) {
          console.warn("Supabase connection test failed:", error)
          setError(error)
        } else {
          console.log("Supabase connected successfully")
        }
      } catch (err) {
        console.warn("Supabase connection test failed:", err)
        setError(err)
      } finally {
        setIsLoading(false)
      }
    }

    testConnection()
  }, [])

  const value = {
    supabase,
    isLoading,
    error
  }

  return (
    <SupabaseContext.Provider value={value}>
      {children}
    </SupabaseContext.Provider>
  )
}
