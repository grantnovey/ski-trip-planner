"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { DefaultPageLayout } from "@/ui/layouts/DefaultPageLayout";
import { Breadcrumb } from "@/ui/components/Breadcrumb";
import { Button } from "@/ui/components/Button";
import { FeatherArrowLeft } from "@subframe/core";
import FlipClock from "@/components/ui/flip-clock";


// Placeholder for trip details - extend with API/hook when backend is ready
export default function TripDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const tripId = params.id as string;

  return (
    <DefaultPageLayout>
      <div className="flex h-full w-full flex-col items-start gap-6 bg-neutral-50 px-6 py-12 overflow-auto">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Trips", href: "/trips" },
            { label: "Trip Details" },
          ]}
          className="mb-2"
        />
        <div className="flex w-full items-center gap-4">
          <Button
            variant="neutral-tertiary"
            icon={<FeatherArrowLeft />}
            onClick={() => router.push("/trips")}
          >
            Back
          </Button>
        </div>
        <div className="flex w-full flex-col items-start gap-2">
          <span className="text-heading-1 font-heading-1 text-default-font">
            Trip Details
          </span>
          <span className="text-body font-body text-subtext-color">
            Trip ID: {tripId}
          </span>
        </div>
        <div className="flex w-full flex-col items-start gap-4 rounded-md border border-solid border-neutral-border bg-default-background px-6 py-6 shadow-sm">
          <span className="text-caption font-caption text-subtext-color">
            <FlipClock countdown targetDate={new Date("2026-03-01")} />
          </span>
        </div>
      </div>
    </DefaultPageLayout>
  );
}
