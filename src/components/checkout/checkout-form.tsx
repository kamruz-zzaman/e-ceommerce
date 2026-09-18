"use client";

import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { COUNTRIES, checkoutSchema, type CheckoutFormValues } from "@/schemas/checkout";

export function CheckoutForm({ onPlaceOrder }: { onPlaceOrder: (values: CheckoutFormValues) => Promise<void> }) {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
  });
  // Synchronous guard against two rapid submit calls landing before React can disable the button.
  const submitting = useRef(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  async function onSubmit(values: CheckoutFormValues) {
    if (submitting.current) return;
    submitting.current = true;
    setSubmitError(null);
    try {
      await onPlaceOrder(values);
    } catch {
      setSubmitError("Your simulated order could not be placed. Please try again.");
    } finally {
      submitting.current = false;
    }
  }

  return (
    <form className="checkout-form" noValidate
      onSubmit={(event) => { void handleSubmit(onSubmit)(event); }}>
      <h2>Delivery details</h2>

      <div className="form-field">
        <label htmlFor="fullName">Full name</label>
        <input id="fullName" type="text" autoComplete="name"
          aria-invalid={errors.fullName ? true : undefined}
          aria-describedby={errors.fullName ? "fullName-error" : undefined}
          {...register("fullName")} />
        {errors.fullName && <p id="fullName-error" className="field-error">{errors.fullName.message}</p>}
      </div>

      <div className="form-field">
        <label htmlFor="email">Email</label>
        <input id="email" type="email" autoComplete="email"
          aria-invalid={errors.email ? true : undefined}
          aria-describedby={errors.email ? "email-error" : undefined}
          {...register("email")} />
        {errors.email && <p id="email-error" className="field-error">{errors.email.message}</p>}
      </div>

      <div className="form-field">
        <label htmlFor="address">Address</label>
        <input id="address" type="text" autoComplete="street-address"
          aria-invalid={errors.address ? true : undefined}
          aria-describedby={errors.address ? "address-error" : undefined}
          {...register("address")} />
        {errors.address && <p id="address-error" className="field-error">{errors.address.message}</p>}
      </div>

      <div className="form-field">
        <label htmlFor="city">City</label>
        <input id="city" type="text" autoComplete="address-level2"
          aria-invalid={errors.city ? true : undefined}
          aria-describedby={errors.city ? "city-error" : undefined}
          {...register("city")} />
        {errors.city && <p id="city-error" className="field-error">{errors.city.message}</p>}
      </div>

      <div className="form-field">
        <label htmlFor="postalCode">Postal code</label>
        <input id="postalCode" type="text" autoComplete="postal-code"
          aria-invalid={errors.postalCode ? true : undefined}
          aria-describedby={errors.postalCode ? "postalCode-error" : undefined}
          {...register("postalCode")} />
        {errors.postalCode && <p id="postalCode-error" className="field-error">{errors.postalCode.message}</p>}
      </div>

      <div className="form-field">
        <label htmlFor="country">Country</label>
        <select id="country" defaultValue="" autoComplete="country-name"
          aria-invalid={errors.country ? true : undefined}
          aria-describedby={errors.country ? "country-error" : undefined}
          {...register("country")}>
          <option value="" disabled>Select a country</option>
          {COUNTRIES.map((country) => <option key={country} value={country}>{country}</option>)}
        </select>
        {errors.country && <p id="country-error" className="field-error">{errors.country.message}</p>}
      </div>

      <p className="checkout-status" role="status">{isSubmitting ? "Placing your simulated order…" : ""}</p>
      {submitError && <p className="checkout-error" role="alert">{submitError}</p>}

      <button type="submit" className="commerce-button" disabled={isSubmitting} aria-disabled={isSubmitting}>
        {isSubmitting ? "Placing order…" : "Place order"}
      </button>
    </form>
  );
}
