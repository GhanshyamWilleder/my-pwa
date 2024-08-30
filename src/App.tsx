import React, { useState, useEffect } from "react"
import { messaging } from "./firebaseConfig"
import { getToken, onMessage } from "firebase/messaging"
import "./App.css"

const API_URL = "https://my-pwa-server.onrender.com"

const App: React.FC = () => {
  const [log, setLog] = useState<string[]>([])
  const [token, setToken] = useState<string | null>(null)
  const [isNotificationAllowed, setIsNotificationAllowed] = useState<
    boolean | null
  >(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    setTimeout(() => {
      requestNotifyPermission()
    }, 10000)
  }, [])

  const requestNotifyPermission = async () => {
    try {
      // Explicitly request notification permission
      const permission = await Notification.permission
      console.log("1")
      if (permission === "granted" && "serviceWorker" in navigator) {
        setIsNotificationAllowed(true)
        setIsLoading(true)
        console.log("Notification permission granted.")
        console.log("2")
        const token = await getToken(messaging, {
          vapidKey:
            "BALkZgzM8z3Ze7XiWZe5jZCuKTsprDFdfjj8VghYgInmn97oUM6uRRPpfptEICcmg5v64mSZ8-rdeiiCe_WPHWo",
        })
        if (token) {
          setToken(token)
          setLog((prevLog) => [
            ...prevLog,
            `Notification permission granted. Token: ${token}`,
          ])
        } else {
          setLog((prevLog) => [
            ...prevLog,
            "Notification permission granted, but unable to get token.",
          ])
        }
      } else if (permission === "denied") {
        setIsNotificationAllowed(false)
        setLog((prevLog) => [...prevLog, "Notification permission denied."])
      } else {
        setIsNotificationAllowed(false)
        setLog((prevLog) => [...prevLog, "Notification permission dismissed."])
      }
    } catch (error) {
      setLog((prevLog) => [
        ...prevLog,
        `Error requesting notification permission: ${error}`,
      ])
    }
  }

  const subscribe = async () => {
    if (token) {
      try {
        const response = await fetch(`${API_URL}/subscribe`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            tokenId: token,
          }),
        })
        if (response.ok) {
          console.log("Subscribed to notifications")
          setLog((prevLog) => [...prevLog, `subscribed to notifications`])
        } else {
          console.error("Failed to subscribe to notifications")
        }
      } catch (error) {
        console.error("Failed to subscribe to notifications:", error)
      }
      // Replace with your API call to store the token
    }
  }

  const unsubscribe = async () => {
    if (token) {
      // Replace with your API call to remove the token
      try {
        const response = await fetch(`${API_URL}/unsubscribe`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            tokenId: token,
          }),
        })
        if (response.ok) {
          console.log("Unsubscribed from notifications")
          setLog((prevLog) => [...prevLog, `unsubscribed from notifications`])
        } else {
          console.error("Failed to unsubscribe from notifications")
        }
      } catch (error) {
        console.error("Failed to unsubscribe from notifications:", error)
      }
    }
  }

  const sendNotification = async () => {
    // Replace with your API call to trigger a notification
    if (token) {
      try {
        const response = await fetch(`${API_URL}/send`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: "Hello from the client!",
            body: "This is a notification from the client.",
            tokenId: token,
          }),
        })
        if (response.ok) {
          console.log("Notification sent successfully")
          setLog((prevLog) => [...prevLog, "Notification sent"])
        } else {
          console.error("Failed to send notification")
        }
      } catch (error) {
        console.error("Failed to send notification:", error)
      }
    }
  }

  useEffect(() => {
    onMessage(messaging, (payload) => {
      setLog((prevLog) => [
        ...prevLog,
        `Message received: ${JSON.stringify(payload)}`,
      ])
    })
  }, [])

  return (
    <div>
      <h1>React PWA with Firebase Push Notifications</h1>
      {isNotificationAllowed === false && (
        <button onClick={requestNotifyPermission}>Allow Notifications</button>
      )}
      {!isLoading && <p>Loading...</p>}
      {isLoading && isNotificationAllowed && (
        <>
          {" "}
          <button onClick={sendNotification}>Send Notification</button>
          <button onClick={subscribe}>Subscribe</button>
          <button onClick={unsubscribe}>Unsubscribe</button>
        </>
      )}
      <div>
        <h2>Logs</h2>
        <ul>
          {log.map((entry, index) => (
            <li key={index}>{entry}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default App
