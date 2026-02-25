"use client";

import React, { useState } from "react";
import { Button } from "@/ui/components/Button";
import { Dialog } from "@/ui/components/Dialog";
import { TextField } from "@/ui/components/TextField";
import { Calendar } from "@/ui/components/Calendar";
import { Popover, FeatherCalendar } from "@subframe/core";

interface CreateTripModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: { name: string; location: string; year: string }) => void;
}

function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function CreateTripModal({
  open,
  onOpenChange,
  onSubmit,
}: CreateTripModalProps) {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    () => new Date()
  );
  const [calendarOpen, setCalendarOpen] = useState(false);

  const year = selectedDate?.getFullYear().toString() ?? "";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && location.trim() && year) {
      onSubmit({ name: name.trim(), location: location.trim(), year });
      setName("");
      setLocation("");
      setSelectedDate(new Date());
    }
  };

  const handleCancel = () => {
    setName("");
    setLocation("");
    setSelectedDate(new Date());
    onOpenChange(false);
  };

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    setCalendarOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <Dialog.Content>
          <form
            onSubmit={handleSubmit}
            className="flex w-full max-w-md flex-col items-start gap-6 p-6"
          >
            <div className="flex w-full flex-col items-start gap-2">
              <span className="text-heading-2 font-heading-2 text-default-font">
                Create New Trip
              </span>
              <span className="text-body font-body text-subtext-color">
                Add a new ski trip to track your expenses
              </span>
            </div>
            <div className="flex w-full flex-col items-start gap-4">
              <TextField label="Trip Name">
                <TextField.Input
                  placeholder="e.g. Park City 2025"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </TextField>
              <TextField label="Location">
                <TextField.Input
                  placeholder="e.g. Park City, Utah"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  required
                />
              </TextField>
              <TextField label="Date">
                <Popover.Root open={calendarOpen} onOpenChange={setCalendarOpen}>
                  <Popover.Trigger asChild>
                    <button
                      type="button"
                      className="flex h-full w-full cursor-pointer items-center gap-2 border-none bg-transparent px-0 py-0 text-left text-body font-body text-default-font outline-none placeholder:text-neutral-400"
                    >
                      <FeatherCalendar className="size-4 shrink-0 text-subtext-color" />
                      <span className={selectedDate ? "" : "text-neutral-400"}>
                        {selectedDate
                          ? formatDate(selectedDate)
                          : "Select a date"}
                      </span>
                    </button>
                  </Popover.Trigger>
                  <Popover.Content
                    align="start"
                    sideOffset={4}
                    className="z-50 rounded-md border border-solid border-neutral-border bg-default-background p-3 shadow-lg"
                  >
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={handleDateSelect}
                      defaultMonth={selectedDate ?? new Date()}
                    />
                  </Popover.Content>
                </Popover.Root>
              </TextField>
            </div>
            <div className="flex w-full items-center justify-end gap-2">
              <Button variant="neutral-secondary" onClick={handleCancel} type="button">
                Cancel
              </Button>
              <Button type="submit">Create</Button>
            </div>
          </form>
      </Dialog.Content>
    </Dialog>
  );
}
