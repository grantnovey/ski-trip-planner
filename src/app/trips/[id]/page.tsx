"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { usePersistedState } from "@/hooks/usePersistedState";
import type { Trip } from "../page";
import { Badge } from "@/ui/components/Badge";
import { Breadcrumbs } from "@/ui/components/Breadcrumbs";
import { Button } from "@/ui/components/Button";
import { DataFieldHorizontal } from "@/ui/components/DataFieldHorizontal";
import { DefaultPageLayout } from "@/ui/layouts/DefaultPageLayout";
import { DropdownMenu } from "@/ui/components/DropdownMenu";
import { IconButton } from "@/ui/components/IconButton";
import { ModernNavbar } from "@/ui/components/ModernNavbar";
import { Table } from "@/ui/components/Table";
import { Tabs } from "@/ui/components/Tabs";
import {
  FeatherCalendar,
  FeatherMapPin,
  FeatherPlus,
  FeatherStar,
  FeatherEdit2,
  FeatherTrash,
} from "@subframe/core";
import * as SubframeCore from "@subframe/core";

const MOCK_TRIPS: Trip[] = [
  { id: "1", name: "Park City 2025", location: "Park City, Utah", year: "2025", totalSpent: 3847.5 },
  { id: "2", name: "Aspen 2024", location: "Aspen, Colorado", year: "2024", totalSpent: 5234.0 },
  { id: "3", name: "Whistler 2024", location: "Whistler, BC", year: "2024", totalSpent: 4621.75 },
  { id: "4", name: "Jackson Hole 2023", location: "Jackson Hole, Wyoming", year: "2023", totalSpent: 3156.25 },
];

interface Expense {
  id: string;
  amount: number;
  category: string;
  categoryVariant: "brand" | "neutral" | "warning" | "success" | "error";
  date: string;
  description: string;
}

const MOCK_EXPENSES: Record<string, Expense[]> = {
  "1": [
    { id: "e1", amount: 450, category: "Lift Tickets", categoryVariant: "brand", date: "January 15, 2025", description: "Full day lift tickets for 2 people" },
    { id: "e2", amount: 1200, category: "Lodging", categoryVariant: "warning", date: "January 14, 2025", description: "Ski resort hotel - 3 nights" },
    { id: "e3", amount: 85.5, category: "Food", categoryVariant: "success", date: "January 15, 2025", description: "Lunch at mountain lodge" },
    { id: "e4", amount: 120, category: "Equipment Rental", categoryVariant: "neutral", date: "January 15, 2025", description: "Ski and boot rental for weekend" },
    { id: "e5", amount: 1800, category: "Flight", categoryVariant: "neutral", date: "January 10, 2025", description: "Round trip flights for 2 people" },
    { id: "e6", amount: 192.02, category: "Shuttle", categoryVariant: "neutral", date: "January 14, 2025", description: "Airport to resort shuttle service" },
  ],
};

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(amount);
}

const columnHelper = createColumnHelper<Expense>();

const expenseColumns = [
  columnHelper.accessor("amount", {
    header: "Amount",
    cell: (info) => (
      <span className="whitespace-nowrap text-body-bold font-body-bold text-default-font">
        {formatCurrency(info.getValue())}
      </span>
    ),
  }),
  columnHelper.accessor("category", {
    header: "Category",
    cell: (info) => {
      const row = info.row.original;
      return (
        <Badge variant={row.categoryVariant}>{row.category}</Badge>
      );
    },
  }),
  columnHelper.accessor((row) => new Date(row.date).getTime(), {
    id: "date",
    header: ({ column }) => (
      <button
        type="button"
        className="flex h-full w-full cursor-pointer items-center gap-1 px-3 text-left outline-none hover:opacity-80"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        <span className="whitespace-nowrap text-caption-bold font-caption-bold text-subtext-color">
          Date
        </span>
        <span className="text-caption font-caption text-subtext-color">
          {column.getIsSorted() === "asc"
            ? " ↑"
            : column.getIsSorted() === "desc"
              ? " ↓"
              : ""}
        </span>
      </button>
    ),
    cell: (info) => (
      <span className="whitespace-nowrap text-body font-body text-default-font">
        {info.row.original.date}
      </span>
    ),
    enableSorting: true,
    sortingFn: "basic",
  }),
  columnHelper.accessor("description", {
    header: "Description",
    cell: (info) => (
      <span className="text-body font-body text-subtext-color">
        {info.getValue()}
      </span>
    ),
  }),
  columnHelper.display({
    id: "actions",
    header: "",
    cell: () => (
      <div className="flex items-center justify-end">
        <IconButton
          size="small"
          icon={<FeatherTrash />}
          onClick={() => {}}
        />
      </div>
    ),
  }),
];

export default function TripDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const tripId = params.id as string;
  const [trips] = usePersistedState<Trip[]>("ski-trip-planner:trips", MOCK_TRIPS);
  const [activeTab, setActiveTab] = useState<"dashboard" | "expenses">("dashboard");

  const trip = trips.find((t) => t.id === tripId);
  const expenses = tripId in MOCK_EXPENSES ? MOCK_EXPENSES[tripId] : [];

  const table = useReactTable({
    data: expenses,
    columns: expenseColumns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getRowId: (row) => row.id,
  });

  if (!trip) {
    return (
      <DefaultPageLayout>
        <div className="flex h-full w-full flex-col items-start gap-6 bg-default-background px-6 py-6">
          <p className="text-body font-body text-subtext-color">Trip not found.</p>
          <Button variant="neutral-secondary" onClick={() => router.push("/trips")}>
            Back to Trips
          </Button>
        </div>
      </DefaultPageLayout>
    );
  }

  return (
    <DefaultPageLayout>
      <div className="flex w-full flex-col gap-2">
        <div className="flex w-full shrink-0 basis-0 flex-col gap-2 px-6 pt-4">
          <ModernNavbar
            logo="https://res.cloudinary.com/subframe/image/upload/v1711417507/shared/y2rsnhq3mex4auk54aye.png"
            rightSlot={
              <>
                <Button variant="neutral-secondary" onClick={() => router.push("/trips")}>
                  Trips
                </Button>
                <Button>Log in</Button>
              </>
            }
          >
            <ModernNavbar.NavItem>Product</ModernNavbar.NavItem>
            <ModernNavbar.NavItem>Features</ModernNavbar.NavItem>
            <ModernNavbar.NavItem>Pricing</ModernNavbar.NavItem>
            <ModernNavbar.NavItem>About</ModernNavbar.NavItem>
          </ModernNavbar>
        </div>
        <div className="flex h-full w-full flex-col items-start gap-6 bg-default-background px-6 py-6 mobile:container mobile:max-w-none">
          <div className="flex w-full flex-col items-start">
            <Breadcrumbs>
              <Link href="/">
                <Breadcrumbs.Item>Home</Breadcrumbs.Item>
              </Link>
              <Breadcrumbs.Divider />
              <Link href="/trips">
                <Breadcrumbs.Item>Ski Trips</Breadcrumbs.Item>
              </Link>
              <Breadcrumbs.Divider />
              <Breadcrumbs.Item active={true}>{trip.name}</Breadcrumbs.Item>
            </Breadcrumbs>
          </div>
          <Tabs>
            <Tabs.Item
              active={activeTab === "dashboard"}
              onClick={() => setActiveTab("dashboard")}
            >
              Dashboard
            </Tabs.Item>
            <Tabs.Item
              active={activeTab === "expenses"}
              onClick={() => setActiveTab("expenses")}
            >
              Expenses
            </Tabs.Item>
          </Tabs>
          <div className="flex w-full flex-col items-start gap-6 rounded-md border border-solid border-neutral-border bg-default-background px-6 py-6 shadow-sm">
            <div className="flex w-full flex-wrap items-start justify-between">
              <div className="flex flex-col items-start gap-4">
                <span className="text-heading-1 font-heading-1 text-default-font">
                  {trip.name}
                </span>
                <div className="flex flex-col items-start gap-2">
                  <DataFieldHorizontal icon={<FeatherMapPin />} label="Location">
                    <span className="whitespace-nowrap text-body font-body text-default-font">
                      {trip.location}
                    </span>
                  </DataFieldHorizontal>
                  <DataFieldHorizontal icon={<FeatherCalendar />} label="Year">
                    <span className="whitespace-nowrap text-body font-body text-default-font">
                      {trip.year}
                    </span>
                  </DataFieldHorizontal>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <span className="text-caption font-caption text-subtext-color">
                  Total Spent
                </span>
                <span className="text-heading-1 font-heading-1 text-brand-600">
                  {formatCurrency(trip.totalSpent)}
                </span>
              </div>
            </div>
          </div>
          <div className="flex w-full items-center justify-between">
            <span className="text-heading-2 font-heading-2 text-default-font">
              Expenses
            </span>
            <SubframeCore.DropdownMenu.Root>
              <SubframeCore.DropdownMenu.Trigger asChild={true}>
                <Button icon={<FeatherPlus />}>Add Expense</Button>
              </SubframeCore.DropdownMenu.Trigger>
              <SubframeCore.DropdownMenu.Portal>
                <SubframeCore.DropdownMenu.Content
                  side="bottom"
                  align="end"
                  sideOffset={4}
                  asChild={true}
                >
                  <DropdownMenu>
                    <DropdownMenu.DropdownItem icon={<FeatherStar />}>
                      Favorite
                    </DropdownMenu.DropdownItem>
                    <DropdownMenu.DropdownItem icon={<FeatherPlus />}>
                      Add
                    </DropdownMenu.DropdownItem>
                    <DropdownMenu.DropdownItem icon={<FeatherEdit2 />}>
                      Edit
                    </DropdownMenu.DropdownItem>
                    <DropdownMenu.DropdownItem icon={<FeatherTrash />}>
                      Delete
                    </DropdownMenu.DropdownItem>
                  </DropdownMenu>
                </SubframeCore.DropdownMenu.Content>
              </SubframeCore.DropdownMenu.Portal>
            </SubframeCore.DropdownMenu.Root>
          </div>
          <div className="flex w-full flex-col items-start gap-2 rounded-md border border-solid border-neutral-border bg-default-background shadow-sm overflow-auto">
            <Table
              header={
                <Table.HeaderRow>
                  {table.getHeaderGroups()[0]?.headers.map((header) => (
                    <Table.HeaderCell key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </Table.HeaderCell>
                  ))}
                </Table.HeaderRow>
              }
            >
              {expenses.length === 0 ? (
                <Table.Row>
                  <Table.Cell className="h-16" colSpan={5}>
                    <span className="text-body font-body text-subtext-color">
                      No expenses yet. Add your first expense to get started.
                    </span>
                  </Table.Cell>
                </Table.Row>
              ) : (
                table.getRowModel().rows.map((row) => (
                  <Table.Row key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <Table.Cell
                        key={cell.id}
                        className={
                          cell.column.id === "actions"
                            ? "h-16 w-auto flex-none"
                            : "h-16 grow shrink-0 basis-0"
                        }
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </Table.Cell>
                    ))}
                  </Table.Row>
                ))
              )}
            </Table>
          </div>
        </div>
      </div>
    </DefaultPageLayout>
  );
}
