"use client";

import { useState } from "react";
import { HeaderSearchCombobox } from "./header-search-combobox";
import { SearchIcon } from "@/components/icons/search-icon";
import { CloseIcon } from "@/components/icons/close-icon";

export function HeaderSearch() {
  const [mobileOpen, setMobileOpen] = useState(false);
  return (
    <>
      <div className="hidden lg:block lg:w-56 xl:w-64">
        <HeaderSearchCombobox id="header-search-desktop" />
      </div>

      <button
        type="button"
        onClick={() => setMobileOpen((value) => !value)}
        aria-expanded={mobileOpen}
        aria-controls="header-search-mobile-panel"
        aria-label={mobileOpen ? "Close search" : "Search products"}
        className="inline-flex h-11 w-11 cursor-pointer items-center justify-center text-foreground hover:text-accent lg:hidden"
      >
        {mobileOpen ? (
          <CloseIcon className="h-5 w-5" />
        ) : (
          <SearchIcon className="h-5 w-5" />
        )}
      </button>

      {mobileOpen && (
        <div
          id="header-search-mobile-panel"
          className="absolute inset-x-0 top-full z-20 border-b border-border bg-background p-4 lg:hidden"
        >
          <HeaderSearchCombobox
            id="header-search-mobile"
            autoFocus
            onNavigate={() => setMobileOpen(false)}
          />
        </div>
      )}
    </>
  );
}
