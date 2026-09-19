"use client";

import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  COUNTRIES,
  checkoutSchema,
  type CheckoutFormValues,
} from "@/schemas/checkout";
import { Button } from "@/components/ui/button";

const fieldClass =
  "w-full min-h-11 px-3 rounded-control border border-[#a8b2ab] bg-white text-foreground aria-[invalid=true]:border-destructive";
const labelClass = "mb-2 block text-sm font-semibold";

export function CheckoutForm({
  onPlaceOrder,
}: {
  onPlaceOrder: (values: CheckoutFormValues) => Promise<void>;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutFormValues>({
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
      setSubmitError(
        "Your simulated order could not be placed. Please try again.",
      );
    } finally {
      submitting.current = false;
    }
  }

  return (
    <form
      noValidate
      onSubmit={(event) => {
        void handleSubmit(onSubmit)(event);
      }}
    >
      <h2 className="text-lg font-semibold">Contact &amp; delivery</h2>
      <div className="mt-5 grid gap-5">
        <div>
          <label htmlFor="fullName" className={labelClass}>
            Full name
          </label>
          <input
            id="fullName"
            type="text"
            autoComplete="name"
            placeholder="Jane Doe"
            className={fieldClass}
            aria-invalid={errors.fullName ? true : undefined}
            aria-describedby={errors.fullName ? "fullName-error" : undefined}
            {...register("fullName")}
          />
          {errors.fullName && (
            <p
              id="fullName-error"
              className="mt-1.5 text-[0.8125rem] text-destructive"
            >
              {errors.fullName.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="email" className={labelClass}>
            Email
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="jane@example.com"
            className={fieldClass}
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={errors.email ? "email-error" : undefined}
            {...register("email")}
          />
          {errors.email && (
            <p
              id="email-error"
              className="mt-1.5 text-[0.8125rem] text-destructive"
            >
              {errors.email.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="address" className={labelClass}>
            Address
          </label>
          <input
            id="address"
            type="text"
            autoComplete="street-address"
            placeholder="Bangladesh, Dhaka, 1234"
            className={fieldClass}
            aria-invalid={errors.address ? true : undefined}
            aria-describedby={errors.address ? "address-error" : undefined}
            {...register("address")}
          />
          {errors.address && (
            <p
              id="address-error"
              className="mt-1.5 text-[0.8125rem] text-destructive"
            >
              {errors.address.message}
            </p>
          )}
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="city" className={labelClass}>
              City
            </label>
            <input
              id="city"
              type="text"
              autoComplete="address-level2"
              placeholder="Dhaka"
              className={fieldClass}
              aria-invalid={errors.city ? true : undefined}
              aria-describedby={errors.city ? "city-error" : undefined}
              {...register("city")}
            />
            {errors.city && (
              <p
                id="city-error"
                className="mt-1.5 text-[0.8125rem] text-destructive"
              >
                {errors.city.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="postalCode" className={labelClass}>
              Postal code
            </label>
            <input
              id="postalCode"
              type="text"
              autoComplete="postal-code"
              placeholder="12345"
              className={fieldClass}
              aria-invalid={errors.postalCode ? true : undefined}
              aria-describedby={
                errors.postalCode ? "postalCode-error" : undefined
              }
              {...register("postalCode")}
            />
            {errors.postalCode && (
              <p
                id="postalCode-error"
                className="mt-1.5 text-[0.8125rem] text-destructive"
              >
                {errors.postalCode.message}
              </p>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="country" className={labelClass}>
            Country
          </label>
          <select
            id="country"
            defaultValue=""
            autoComplete="country-name"
            className={fieldClass}
            aria-invalid={errors.country ? true : undefined}
            aria-describedby={errors.country ? "country-error" : undefined}
            {...register("country")}
          >
            <option value="" disabled>
              Select a country
            </option>
            {COUNTRIES.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
          {errors.country && (
            <p
              id="country-error"
              className="mt-1.5 text-[0.8125rem] text-destructive"
            >
              {errors.country.message}
            </p>
          )}
        </div>
      </div>

      <p role="status" className="mt-4 min-h-6 text-sm text-muted">
        {isSubmitting ? "Placing your simulated order…" : ""}
      </p>
      {submitError && (
        <p role="alert" className="my-2 text-sm text-destructive">
          {submitError}
        </p>
      )}

      <Button
        type="submit"
        disabled={isSubmitting}
        aria-disabled={isSubmitting}
        className="mt-2 w-full sm:w-auto"
      >
        {isSubmitting ? "Placing order…" : "Complete order"}
      </Button>
    </form>
  );
}
