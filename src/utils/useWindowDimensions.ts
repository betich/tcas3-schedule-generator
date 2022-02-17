import { useEffect, useState } from "react"

export function useWindowDimensions() {
  function getWindowDimensions() {
    const width = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
    const height = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)

    return { width, height }
  }

  const [windowDimensions, setWindowDimensions] = useState({ width: 0, height: 0 })

  useEffect(() => {
    setWindowDimensions(getWindowDimensions())

    function handleResize() {
      setWindowDimensions(getWindowDimensions())
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return windowDimensions
}
