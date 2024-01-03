import { useEffect, useState } from 'react'

export type UseLayoutHeightOptions = {
  interval?: number
  defaultHeight?: string
  offset?: number
}

export function useLayoutHeight(options?: UseLayoutHeightOptions) {
  const { interval = 100, defaultHeight = '100vh', offset = 0 } = options || {}

  // On some mobile browsers, most commonly Chrome and Safari on iOS
  // 100vh actually refers to outerHeight.
  // This means the lower toolbar on the browser will not be taken into account,
  // cutting off the last couple of rems of your design.
  const [screenHeight, setScreenHeight] = useState(defaultHeight) /* fallback - JS loading */

  useEffect(() => {
    // TODO: add throttle
    const handleResize = () => {
      setScreenHeight(`${window.innerHeight - offset}px`)
    }
    window.addEventListener('resize', handleResize)
    handleResize()
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [offset])

  return { screenHeight, setScreenHeight }
}
