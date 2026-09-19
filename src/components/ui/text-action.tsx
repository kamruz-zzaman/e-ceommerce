import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";

const styles =
  "inline-flex min-h-11 items-center text-accent underline decoration-1 underline-offset-[3px] hover:text-accent-hover cursor-pointer";

export function TextActionLink({
  className = "",
  ...props
}: ComponentPropsWithoutRef<typeof Link>) {
  return <Link className={`${styles} ${className}`} {...props} />;
}

export function TextActionButton({
  className = "",
  ...props
}: ComponentPropsWithoutRef<"button">) {
  return (
    <button type="button" className={`${styles} ${className}`} {...props} />
  );
}
