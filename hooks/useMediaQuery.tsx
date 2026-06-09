'use client'
import { useCallback, useEffect, useState } from 'react'

interface WindowSize {
  width: number
  height: number
}

const useMediaQuery = (): WindowSize | undefined => {
  if (typeof window === 'undefined') return undefined

  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: window.innerWidth,
    height: window.innerHeight,
  })

  const handleResize = useCallback(() => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    })
  }, [])

  useEffect(() => {
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [handleResize])

  return windowSize
}

export default useMediaQuery
