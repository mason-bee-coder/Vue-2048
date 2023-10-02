declare global {
  interface Window {
    gtag: (...params: any) => void
  }
}

export {}
