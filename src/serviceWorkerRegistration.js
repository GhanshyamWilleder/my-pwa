// src/serviceWorkerRegistration.js

// This function registers the service worker and logs the registration details.
export function register() {
  // if ("serviceWorker" in navigator) {
  //   window.addEventListener("load", () => {
  //     navigator.serviceWorker
  //       .register("firebase-messaging-sw.js")
  //       .then(async (registration) => {

  //         console.log(
  //           "Service Worker registered with scope:",
  //           registration.scope
  //         )
  //       })
  //       .catch((error) => {
  //         console.error("Service Worker registration failed:", error)
  //       })
  //   })
  // }

  if ("serviceWorker" in navigator) {
    window.addEventListener("load", function () {
      navigator.serviceWorker
        .register("firebase-messaging-sw.js")
        .then(
          async function (registration) {
            console.log("Service Worker registered", registration)
            await Notification.requestPermission()
            console.log("Worker registration successful", registration.scope)
          },
          function (err) {
            console.log("Worker registration failed", err)
          }
        )
        .catch(function (err) {
          console.log(err)
        })
    })
  } else {
    console.log("Service Worker is not supported by browser.")
  }
  if (!("PushManager" in window)) {
    console.log("No Push API Support!")
  } else if (Notification.permission !== "denied") {
    Notification.requestPermission().then(function (permission) {
      // If the user accepts, let's create a notification
      if (permission === "granted") {
        // var notification = new Notification("Hi there!");
        console.log("Permission granted for Notification")
      }
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
