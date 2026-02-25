# Ski Trip Planner: Features

This document describes the features of the Bluebird ski trip planning app, organized by MVP (first usable version) and future releases.

---

## MVP Features

### Trips

- **Trip list:** View all trips in a grid or list, sorted by date (newest first).
- **Create trip:** Modal with fields for trip name, location, start date, optional end date, and optional mountain selection.
- **Trip cards:** Each card shows trip name, location, year/dates, and total spent.
- **Trip detail:** Dedicated page for a single trip with header, optional mountain card, expense list, and category breakdown.
- **Edit trip (optional):** Update name, dates, or linked mountain.

**Data:**
- Trip ID, name, location, optional mountain ID, start date, optional end date.
- Total spent is computed from expenses.

---

### Expense Tracking

- **Add expense:** Modal or inline form with amount, category, optional description, and date.
- **Expense list:** List of expenses for a trip, grouped or sorted by date.
- **Edit/delete expense:** Update or remove an expense.
- **Category totals:** Summary of spend by category on the trip detail page.

**Predefined categories:**
- Lift tickets
- Lodging
- Food
- Gear
- Transport
- Other

---

### Mountain / Resort Stats

- **Mountain data:** Static seed data for 5–10 popular resorts (e.g., Park City, Aspen, Whistler, Jackson Hole).
- **Mountain picker:** Optional dropdown in Create Trip to select a mountain and auto-fill location.
- **Mountain card:** On trip detail, show linked mountain with name, location, and key stats (elevation, vertical drop, trails, lifts, acreage).
- **Stats displayed:** Elevation, vertical drop, trail count, lift count, acreage (when available).

---

## Deferred Features (Post-MVP)

### Weather / Conditions

- Current conditions and forecast for the trip location.
- Integration with Open-Meteo, OpenSnow, or similar provider.

### Cost Splitting

- Split expenses between trip participants.
- Track who owes whom.
- Simple reimbursement view.

### Authentication & Multi-User

- Sign up, log in, password reset.
- Per-user trips and expenses.
- Multi-device sync (Supabase or similar).

### Mountain API Integration

- Replace or supplement manual mountain data with API (e.g., OnTheSnow, resort APIs).
- Real-time or periodic updates to stats.

### Packing Lists & Notes

- Packing list per trip.
- Trip notes or itinerary.

### Historical Comparison

- Compare trip spend across years or resorts.
- E.g., "You spent 15% less than Aspen 2024."

---

## Feature Summary Table

| Feature | MVP | Future |
|---------|-----|--------|
| Trip list | ✓ | |
| Create trip | ✓ | |
| Trip detail | ✓ | |
| Add/edit/delete expenses | ✓ | |
| Category breakdown | ✓ | |
| Predefined expense categories | ✓ | |
| Mountain seed data | ✓ | |
| Mountain picker in create | ✓ | |
| Mountain card on trip | ✓ | |
| Weather / conditions | | ✓ |
| Cost splitting | | ✓ |
| Auth & multi-user | | ✓ |
| Mountain API | | ✓ |
| Packing lists & notes | | ✓ |
| Historical comparison | | ✓ |
