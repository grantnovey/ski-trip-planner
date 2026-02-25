# Ski Trip Planner: User Flow

This document describes the user flow for the Bluebird ski trip planning app across the full trip lifecycle.

---

## Lifecycle Overview

The app supports four phases: **Planning**, **Pre-trip**, **During**, and **Post-trip**. Users move through these phases as they decide where to go, prepare for the trip, track spending while there, and review afterward.

```
Planning → Pre-trip → During → Post-trip
```

---

## Phase 1: Planning

**Goal:** Decide where and when to go.

| Step | User Action | App Support |
|------|-------------|-------------|
| 1 | Browse mountains/resorts | Mountain list or browser (future) |
| 2 | Compare resort stats | Trail count, elevation, vertical drop, lifts, acreage |
| 3 | Pick dates | Noted for trip creation |

**Flow:**
- User browses available mountains (manual list initially; API later).
- User compares key stats (elevation, vertical, trails, lifts) to narrow choices.
- User decides on dates and proceeds to create a trip.

---

## Phase 2: Pre-trip

**Goal:** Create the trip and link it to the chosen resort.

| Step | User Action | App Support |
|------|-------------|-------------|
| 1 | Create new trip | Create Trip modal |
| 2 | Enter trip name, location, dates | Form fields; optional mountain picker |
| 3 | Optionally link a mountain | Mountain dropdown pre-fills location |
| 4 | Save trip | Navigate to trip detail page |

**Flow:**
- User clicks "Create New Trip" on the trips list page.
- User fills in: trip name, location (or selects mountain to auto-fill), start date, optional end date.
- User submits; app creates trip and redirects to trip detail.
- Trip detail shows mountain card (if linked) with resort stats.

---

## Phase 3: During Trip

**Goal:** Log expenses in real-time as they occur.

| Step | User Action | App Support |
|------|-------------|-------------|
| 1 | Open trip on phone/laptop | Trip detail page |
| 2 | Add expense | Add Expense modal or inline form |
| 3 | Enter amount, category, optional description | Category dropdown, amount field |
| 4 | Save expense | Expense appears in list; total updates |
| 5 | Optionally check conditions | Weather/conditions (future) |

**Flow:**
- User opens the trip detail page (e.g., during or after a day on the mountain).
- User adds expenses as they occur (lift ticket, lunch, rental, etc.).
- User selects a category (Lift tickets, Lodging, Food, Gear, Transport, Other) and enters the amount.
- Each expense is saved and the trip total and category breakdown update immediately.

---

## Phase 4: Post-trip

**Goal:** Review spending and see how the trip compared.

| Step | User Action | App Support |
|------|-------------|-------------|
| 1 | View trip detail | Trip detail page |
| 2 | Review total spent | Total displayed in header |
| 3 | See breakdown by category | Category totals / chart |
| 4 | Compare to past trips (future) | Historical comparison |

**Flow:**
- User returns to the trip detail page after the trip.
- User sees total spent and per-category breakdown.
- User can add any missed expenses and review the final numbers.
- (Future) Compare to past trips (e.g., "15% less than Aspen 2024").

---

## Key Entry Points

| Entry Point | Route | Typical Phase |
|-------------|-------|---------------|
| Trips list | `/trips` | Any |
| Create trip | Modal from `/trips` | Pre-trip |
| Trip detail | `/trips/[id]` | During, Post |
| Mountains (future) | `/mountains` | Planning |

---

## Cross-Phase Behaviors

- **Trip list** is the main hub; users can create trips or open any existing trip.
- **Trip detail** is the primary working screen during and after the trip.
- **Mountain data** supports Planning (browse) and Pre-trip (link to trip).
- **Expenses** are the core interaction during and after the trip.
