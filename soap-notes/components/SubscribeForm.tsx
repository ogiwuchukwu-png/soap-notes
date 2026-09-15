"use client";

import { useState, type FormEvent } from "react";
import primitives from "./primitives.module.css";
import styles from "./SoapNotesLanding.module.css";

type Status = "idle" | "submitting" | "error" | "success";

export default function SubscribeForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    setError("");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) {
        setError(data.error ?? "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }
      setEmail("");
      setStatus("success");
    } catch {
      setError("Something went wrong. Please try again.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return <p className={styles.emailNote}>You&rsquo;re on the list. No spam. Just soap notes.</p>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.emailForm}>
        <input
          className={`${primitives.input} ${styles.emailInput}`}
          type="email"
          required
          placeholder="Your email address"
          aria-label="Your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          type="submit"
          className={`${primitives.btn} ${styles.emailCta}`}
          disabled={status === "submitting"}
        >
          {status === "submitting" ? "Sending…" : "Keep me posted"}
        </button>
      </div>
      {status === "error" ? (
        <p className={styles.emailNote} role="alert">
          {error}
        </p>
      ) : (
        <p className={styles.emailNote}>No spam. Just soap notes.</p>
      )}
    </form>
  );
}
