import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";

const styles =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-control bg-accent px-5 " +
  "text-sm font-semibold text-white transition-colors hover:bg-accent-hover cursor-pointer " +
  "disabled:cursor-not-allowed disabled:bg-[#e9ece9] disabled:text-muted " +
  "aria-disabled:cursor-wait aria-disabled:opacity-65";

export function Button({
  className = "",
  ...props
}: ComponentPropsWithoutRef<"button">) {
  return <button className={`${styles} ${className}`} {...props} />;
}

export function ButtonLink({
  className = "",
  ...props
}: ComponentPropsWithoutRef<typeof Link>) {
  return <Link className={`${styles} ${className}`} {...props} />;
}
