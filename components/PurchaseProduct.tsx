"use client"
import React from "react"
import { loadStripe } from "@stripe/stripe-js"
import { Button } from "@/cosmic/elements/Button"
import { useState } from "react"
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ""
)
export function PurchaseProduct({
  stripe_product_id,
}: {
  stripe_product_id: string
}) {
  const [submitting, setSubmitting] = useState(false)
  async function handleSubmit() {
    setSubmitting(true)
    const res = await fetch("/api/checkout", {
      method: "POST",
      body: JSON.stringify({
        stripe_product_id,
        redirect_url: window.location.href.split("?")[0],
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
    if (!res.ok) {
      setSubmitting(false)
      alert("There was an error with this request. Please contact support.")
    } else {
      const data = await res.json()
      if (data.url) window.location = data.url
    }
  }
  React.useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search)
    if (query.get("success")) {
      console.log("Order placed! You will receive an email confirmation.")
    }

    if (query.get("canceled")) {
      console.log(
        "Order canceled -- continue to shop around and checkout when you're ready."
      )
    }
  }, [])
  return (
    <Button disabled={submitting} type="submit" onClick={handleSubmit}>
      {submitting ? <>Redirecting to purchase...</> : "Buy now"}
    </Button>
  )
}
