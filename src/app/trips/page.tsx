"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { usePersistedState } from "@/hooks/usePersistedState";
import { Button } from "@/ui/components/Button";
import { DefaultPageLayout } from "@/ui/layouts/DefaultPageLayout";
import { FeatherPlus } from "@subframe/core";
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
  const [trips, setTrips] = usePersistedState<Trip[]>("ski-trip-planner:trips", MOCK_TRIPS);
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
          <div className="w-full items-start gap-5 grid grid-cols-3 grid-rows-2 mobile:grid mobile:grid-cols-1">
            {trips.map((trip) => (
              <TripCard
                key={trip.id}
                trip={trip}
                onClick={() => handleTripClick(trip.id)}
              />
            ))}
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
