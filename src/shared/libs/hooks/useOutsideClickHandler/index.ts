import { RefObject, useEffect, useRef } from 'react'

export function useOutsideClickHandler<T extends HTMLElement>(
  handler: (event: MouseEvent) => void
): RefObject<T> {
  const ref = useRef<T>(null)
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handler(event)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [ref])
  return ref
}
