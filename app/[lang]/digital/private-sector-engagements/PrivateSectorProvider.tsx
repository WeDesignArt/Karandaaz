'use client'

import React, { createContext, useContext } from 'react'

const PrivateSectorContext = createContext(null)

export const PrivateSectorProvider = ({ value, children }: any) => {
  return <PrivateSectorContext.Provider value={value}>{children}</PrivateSectorContext.Provider>
}

export const usePrivateSectorContext = () => {
  const context = useContext(PrivateSectorContext)
  if (!context) {
    throw new Error('usePrivateSectorContext must be used within PrivateSectorProvider')
  }
  return context
}
