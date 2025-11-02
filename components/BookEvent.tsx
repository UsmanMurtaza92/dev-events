"use client";

import { createBooking } from "@/lib/actions/booking.actions";
import posthog from "posthog-js";
import React, { useState } from "react";

interface BookEventProps {
  eventId: string;
  slug: string;
}

const BookEvent = ({ eventId, slug }: BookEventProps) => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const { success, error } = await createBooking({ eventId, slug, email })

    if (!success)  {
      posthog.captureException(error);
      return alert(`Booking failed : ${error}`)
    }
    posthog.capture('event_booked', { eventId, slug, email });
    alert(`Booking successful!`);
    setSubmitted(true);
  }

  return (
    <div id="book-event">
      {submitted ? (
        <p className="text-sm">
          Thank you for booking! A confirmation email has been sent to <b>{email}</b>.
        </p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              placeholder="Enter your email address"
            />
          </div>

          <button type="submit" className="button-submit">Book</button>
        </form>
      )}
    </div>
  );
};

export default BookEvent;
