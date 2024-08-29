// src/serviceWorkerRegistration.js

// This function registers the service worker and logs the registration details.
export function register() {
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
     navigator.serviceWorker.register('/firebase-messaging-sw.js')
        .then((registration) => {
          console.log(
            "Service Worker registered with scope:",
            registration.scope
          )
        })
        .catch((error) => {
          console.error("Service Worker registration failed:", error)
        })
    })
  }
}

// This function unregisters the service worker, useful for development.
export function unregister() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.ready
      .then((registration) => {
        registration.unregister()
      })
      .catch((error) => {
        console.error("Service Worker unregistering failed:", error)
      })
  }
}
