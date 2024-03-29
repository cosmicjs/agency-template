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
  const [error, setError] = useState()
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
    const data = await res.json()
    if (!res.ok) {
      setSubmitting(false)
      setError(data.raw.message)
    } else {
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
    <>
      <Button disabled={submitting} type="submit" onClick={handleSubmit}>
        {submitting ? <>Redirecting to purchase...</> : "Buy now"}
      </Button>
      {error && (
        <div className="mt-6 border-red-500 border p-4 rounded-lg">
          There was an error from the API: <br />
          <br />
          {error}
          <br />
          <br />
          View the{" "}
          <a
            href="https://github.com/cosmicjs/agency-template"
            className="text-orange-600"
          >
            GitHub readme
          </a>{" "}
          for more information or reach out to{" "}
          <a
            href="https://www.cosmicjs.com/contact"
            className="text-orange-600"
          >
            Cosmic support
          </a>
          .
        </div>
      )}
    </>
  )
}
