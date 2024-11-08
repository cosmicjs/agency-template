"use client"

import { useState } from "react"
import { CheckCircle, Loader2, XCircle } from "lucide-react"
import { cn } from "@/cosmic/utils"

import { Button } from "@/cosmic/elements/Button"
import { Input } from "@/cosmic/elements/Input"
import { Label } from "@/cosmic/elements/Label"
import { Textarea } from "@/cosmic/elements/TextArea"
import {
  addSubmission,
  AddSubmissionType,
} from "@/cosmic/blocks/contact-form/actions"

export function ContactForm({ className }: { className?: string }) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [company, setCompany] = useState("")
  const [message, setMessage] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [sumbitted, setSubmitted] = useState(false)
  const [error, setError] = useState(false)
  async function handleSubmitComment(e: React.SyntheticEvent) {
    setError(false)
    setSubmitting(true)
    if (!name.trim() || !email.trim() || !message.trim()) {
      setSubmitting(false)
      setError(true)
      return
    }
    const newSubmission: AddSubmissionType = {
      type: "form-submissions",
      title: name,
      metadata: {
        email,
        company,
        message,
      },
    }
    try {
      const res = await addSubmission(newSubmission)
      if (!res.object) {
        setSubmitting(false)
        setError(true)
        return
      } else {
        setSubmitting(false)
        setSubmitted(true)
        setTimeout(() => {
          setSubmitted(false)
          setName("")
          setEmail("")
          setCompany("")
          setMessage("")
        }, 3000)
      }
    } catch (err) {
      setSubmitting(false)
      setError(true)
      return
    }
  }
  function handleChangeName(e: React.SyntheticEvent) {
    const target = e.target as HTMLInputElement
    setName(target.value)
  }
  function handleChangeEmail(e: React.SyntheticEvent) {
    const target = e.target as HTMLInputElement
    setEmail(target.value)
  }
  function handleChangeCompany(e: React.SyntheticEvent) {
    const target = e.target as HTMLInputElement
    setCompany(target.value)
  }
  function handleChangeMessage(e: React.SyntheticEvent) {
    const target = e.target as HTMLInputElement
    setMessage(target.value)
  }
  return (
    <div className={cn("mb-8", className)}>
      <h2 className="mb-4 text-2xl">Contact us</h2>
      {error && (
        <div className="mb-4 flex rounded-xl border border-red-500 p-8">
          <XCircle className="relative top-1 mr-4 h-4 w-4 shrink-0 text-red-500" />
          There was an error with your request. Make sure all fields are valid.
        </div>
      )}
      {sumbitted ? (
        <div className="flex rounded-xl border border-green-500 p-8">
          <CheckCircle className="relative top-1 mr-4 h-4 w-4 shrink-0 text-green-500" />
          Message submitted.
        </div>
      ) : (
        <>
          <div className="mb-4">
            <Label htmlFor="name">Your full name *</Label>
            <Input
              id="name"
              placeholder="Name"
              onChange={handleChangeName}
              value={name}
            />
          </div>
          <div className="mb-4">
            <Label htmlFor="email">Your email *</Label>
            <Input
              id="email"
              placeholder="Email"
              onChange={handleChangeEmail}
              value={email}
            />
          </div>
          <div className="mb-4">
            <Label htmlFor="email">Company *</Label>
            <Input
              id="company"
              placeholder="Company"
              onChange={handleChangeCompany}
              value={company}
            />
          </div>
          <div className="mb-4">
            <Label htmlFor="message">Message *</Label>
            <Textarea
              id="message"
              placeholder="Message"
              onChange={handleChangeMessage}
              value={message}
            />
          </div>
          <div>
            <Button
              onClick={handleSubmitComment}
              type="submit"
              disabled={submitting}
            >
              {submitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                `Submit`
              )}
            </Button>
          </div>
        </>
      )}
    </div>
  )
}
