"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/ui/components/Button";
import { DefaultPageLayout } from "@/ui/layouts/DefaultPageLayout";
import { FeatherCheck, FeatherPlus } from "@subframe/core";
import { Breadcrumb } from "@/ui/components/Breadcrumb";
import { CreateTripModal } from "@/app/trips/CreateTripModal";
import { TripCard } from "@/app/trips/TripCard";

export interface Trip {
  id: string;
  name: string;
  location: string;
  year: string;
  totalSpent: number;
}

// Sample data - replace with API/hook when backend is ready
const MOCK_TRIPS: Trip[] = [
  { id: "1", name: "Park City 2025", location: "Park City, Utah", year: "2025", totalSpent: 3847.5 },
  { id: "2", name: "Aspen 2024", location: "Aspen, Colorado", year: "2024", totalSpent: 5234.0 },
  { id: "3", name: "Whistler 2024", location: "Whistler, BC", year: "2024", totalSpent: 4621.75 },
  { id: "4", name: "Jackson Hole 2023", location: "Jackson Hole, Wyoming", year: "2023", totalSpent: 3156.25 },
];

export default function SkiTripsPage() {
  const router = useRouter();
  const [trips, setTrips] = useState<Trip[]>(MOCK_TRIPS);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const handleCreateTrip = (data: { name: string; location: string; year: string }) => {
    const newTrip: Trip = {
      id: crypto.randomUUID(),
      name: data.name,
      location: data.location,
      year: data.year,
      totalSpent: 0,
    };
    setTrips((prev) => [newTrip, ...prev]);
    setShowCreateModal(false);
    router.push(`/trips/${newTrip.id}`);
  };

  const handleTripClick = (tripId: string) => {
    router.push(`/trips/${tripId}`);
  };

  return (
    <DefaultPageLayout>
      <div className="flex h-full w-full flex-col items-start gap-2">
        <div className="flex w-full grow shrink-0 basis-0 flex-col items-start gap-6 bg-neutral-50 px-6 py-12 overflow-auto">
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Trips" },
            ]}
            className="mb-2"
          />
          <div className="flex w-full items-center justify-between">
            <span className="text-heading-1 font-heading-1 text-default-font">
              Ski Trip Expense Tracker
            </span>
            <Button
              icon={<FeatherPlus />}
              onClick={() => setShowCreateModal(true)}
            >
              Create New Trip
            </Button>
          </div>
          <div className="w-full items-start gap-6 grid grid-cols-3 mobile:grid mobile:grid-cols-1">
            {trips.map((trip) => (
              <TripCard
                key={trip.id}
                trip={trip}
                onClick={() => handleTripClick(trip.id)}
              />
            ))}
          </div>
          <div className="flex w-full items-start gap-4">
            <div className="flex grow shrink-0 basis-0 flex-col items-center overflow-hidden rounded-md border border-solid border-neutral-border bg-default-background shadow-sm">
              <div className="flex w-full flex-col items-start gap-4 border-b border-solid border-neutral-border bg-neutral-50 px-12 py-12">
                <img
                  className="h-12 flex-none rounded-full object-cover"
                  src="https://res.cloudinary.com/subframe/image/upload/v1723780577/uploads/302/hhmv6ey0yajkadnmcp0a.png"
                />
                <div className="flex w-full flex-col items-start gap-2">
                  <span className="text-heading-2 font-heading-2 text-default-font">
                    Basic
                  </span>
                  <span className="text-heading-3 font-heading-3 text-default-font">
                    For building personal portfolios and hobby sites
                  </span>
                </div>
              </div>
              <div className="flex w-full flex-col items-start gap-6 bg-default-background px-12 py-12">
                <div className="flex items-end gap-2">
                  <span className="text-heading-1 font-heading-1 text-default-font">
                    $15
                  </span>
                  <div className="flex items-end gap-2 pb-1">
                    <span className="text-body-bold font-body-bold text-subtext-color">
                      per user
                    </span>
                  </div>
                </div>
                <div className="flex w-full flex-col items-start gap-2">
                  <span className="text-body-bold font-body-bold text-default-font">
                    What&apos;s included
                  </span>
                  <div className="flex w-full flex-col items-start gap-2">
                    <div className="flex items-center gap-1">
                      <FeatherCheck className="text-body font-body text-subtext-color" />
                      <span className="text-body font-body text-subtext-color">
                        For hobby sites
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FeatherCheck className="text-body font-body text-subtext-color" />
                      <span className="text-body font-body text-subtext-color">
                        For hobby sites
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FeatherCheck className="text-body font-body text-subtext-color" />
                      <span className="text-body font-body text-subtext-color">
                        For hobby sites
                      </span>
                    </div>
                  </div>
                </div>
                <Button
                  className="h-10 w-full flex-none"
                  variant="neutral-secondary"
                  size="large"
                  onClick={() => {}}
                >
                  Get Started
                </Button>
              </div>
            </div>
            <div className="flex grow shrink-0 basis-0 flex-col items-center overflow-hidden rounded-md border border-solid border-neutral-border bg-default-background shadow-sm">
              <div className="flex w-full flex-col items-start gap-4 border-b border-solid border-neutral-border bg-neutral-50 px-12 py-12">
                <img
                  className="h-12 flex-none rounded-full object-cover"
                  src="https://res.cloudinary.com/subframe/image/upload/v1723780859/uploads/302/hh4s5xjmsigiehqkb1uh.png"
                />
                <div className="flex w-full flex-col items-start gap-2">
                  <span className="text-heading-2 font-heading-2 text-default-font">
                    Basic
                  </span>
                  <span className="text-heading-3 font-heading-3 text-default-font">
                    For building personal portfolios and hobby sites
                  </span>
                </div>
              </div>
              <div className="flex w-full flex-col items-start gap-6 bg-default-background px-12 py-12">
                <div className="flex items-end gap-2">
                  <span className="text-heading-1 font-heading-1 text-default-font">
                    $15
                  </span>
                  <div className="flex items-end gap-2 pb-1">
                    <span className="text-body-bold font-body-bold text-subtext-color">
                      per user
                    </span>
                  </div>
                </div>
                <div className="flex w-full flex-col items-start gap-2">
                  <span className="text-body-bold font-body-bold text-default-font">
                    What&apos;s included
                  </span>
                  <div className="flex w-full flex-col items-start gap-2">
                    <div className="flex items-center gap-1">
                      <FeatherCheck className="text-body font-body text-subtext-color" />
                      <span className="text-body font-body text-subtext-color">
                        For hobby sites
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FeatherCheck className="text-body font-body text-subtext-color" />
                      <span className="text-body font-body text-subtext-color">
                        For hobby sites
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FeatherCheck className="text-body font-body text-subtext-color" />
                      <span className="text-body font-body text-subtext-color">
                        For hobby sites
                      </span>
                    </div>
                  </div>
                </div>
                <Button
                  className="h-10 w-full flex-none"
                  variant="neutral-secondary"
                  size="large"
                  onClick={() => {}}
                >
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <CreateTripModal
        open={showCreateModal}
        onOpenChange={setShowCreateModal}
        onSubmit={handleCreateTrip}
      />
    </DefaultPageLayout>
  );
}
