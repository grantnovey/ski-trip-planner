"use client";

import React from "react";
import type { Trip } from "./page";

interface TripCardProps {
  trip: Trip;
  onClick: () => void;
}

export function TripCard({ trip, onClick }: TripCardProps) {
  const formattedAmount = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(trip.totalSpent);

  return (
    <button
      type="button"
      className="flex grow shrink-0 basis-0 flex-col items-start gap-4 rounded-md border border-solid border-neutral-border bg-default-background px-6 py-6 text-left hover:shadow-md transition-shadow cursor-pointer w-full"
      onClick={onClick}
    >
      <div className="flex w-full flex-col items-start gap-2">
        <span className="text-heading-2 font-heading-2 text-default-font">
          {trip.name}
        </span>
        <span className="text-caption font-caption text-subtext-color">
          {trip.location} • {trip.year}
        </span>
      </div>
      <div className="flex h-px w-full flex-none flex-col items-center gap-2 bg-neutral-200" />
      <div className="flex w-full flex-col items-start gap-1">
        <span className="text-caption font-caption text-subtext-color">
          Total Spent
        </span>
        <span className="text-heading-1 font-heading-1 text-default-font">
          {formattedAmount}
        </span>
      </div>
    </button>
  );
}
