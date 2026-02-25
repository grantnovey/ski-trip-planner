# Subframe Page Prompts

Use these prompts with `/subframe:design` or the Subframe `design_page` MCP tool to generate each page. Copy the prompt (and optional codeContext) when designing.

---

## 1. Trips List Page (`/trips`)

**Description:**

```
Ski trip list page: a dashboard showing all ski trips as cards in a responsive grid. Each card displays trip name, location, year/dates, and total spent. Page header with title "Ski Trip Expense Tracker" and a primary "Create New Trip" button. Breadcrumb: Home > Trips. Grid should work on mobile (1 column) and desktop (2-3 columns). Cards are clickable to navigate to trip detail. Clean, minimal layout with neutral backgrounds and subtle borders.
```

**CodeContext (paste if needed):**
```typescript
interface Trip {
  id: string;
  name: string;
  location: string;
  year: string;
  totalSpent: number;
}
```

**Variation ideas:**
- Compact card grid with emphasis on total spent
- Card layout with visual hierarchy and date prominence
- Minimal single-column list for mobile-first

---

## 2. Trip Detail Page (`/trips/[id]`)

**Description:**

```
Ski trip detail page: header section with trip name, dates, and total spent; optional mountain/resort card showing name, location, and stats (elevation, vertical drop, trails, lifts); expense list section with add-expense button; category breakdown showing spend by Lift tickets, Lodging, Food, Gear, Transport, Other. Breadcrumb: Home > Trips > Trip Details. Back button to return to trips list. Expenses displayed in a table or list with date, description, category, amount. Clean sections with cards or bordered containers. Countdown or date range visible in header.
```

**CodeContext (paste if needed):**
```typescript
interface Trip {
  id: string;
  name: string;
  location: string;
  startDate: string;
  endDate?: string;
  totalSpent: number;
  mountainId?: string;
}

interface Expense {
  id: string;
  tripId: string;
  amount: number;
  category: "lift_tickets" | "lodging" | "food" | "gear" | "transport" | "other";
  description?: string;
  date: string;
}
```

**Variation ideas:**
- Dense layout with expense table and category breakdown sidebar
- Card-based layout with mountain card prominent, expenses below
- Split-panel: trip info + mountain card on left, expenses on right

---

## 3. Create Trip Modal

**Description:**

```
Modal dialog for creating a new ski trip. Title "Create New Trip", subtitle "Add a new ski trip to track your expenses". Form fields: Trip Name (text), Location (text), optional Mountain picker (dropdown/select), Date or date range (calendar picker). Primary Submit and secondary Cancel buttons. Clean form layout with labels above inputs. Max width ~28rem so modal stays compact.
```

**CodeContext:**
```typescript
// Form submits: { name: string; location: string; mountainId?: string; startDate: string; endDate?: string }
```

---

## 4. Add Expense Modal

**Description:**

```
Modal dialog for adding an expense to a ski trip. Title "Add Expense". Form fields: Amount (currency input), Category (dropdown: Lift tickets, Lodging, Food, Gear, Transport, Other), optional Description (text), Date (date picker, defaults to today). Primary Submit and secondary Cancel buttons. Compact form with clear labels. Max width ~28rem.
```

**CodeContext:**
```typescript
type ExpenseCategory = "lift_tickets" | "lodging" | "food" | "gear" | "transport" | "other";
```

---

## 5. Mountain Card Component

**Description:**

```
Card component for displaying a ski resort/mountain: name as heading, location as subtitle, key stats in a compact grid or list: Elevation (ft), Vertical Drop (ft), Trails, Lifts, Acres. Neutral background, subtle border. Stats can be shown as labeled values (e.g., "Elevation: 10,000 ft"). Used inline on trip detail page.
```

---

## 6. Mountains List Page (Future: `/mountains`)

**Description:**

```
Browse page for ski mountains/resorts. List or grid of mountain cards. Each card: name, location, key stats (elevation, vertical, trails). Optional search or filter. Header "Mountains" or "Browse Resorts". Cards could link to trip creation or be selectable. Clean, scannable layout for comparison.
```

---

## Usage Notes

1. **First design:** Start with the Trips List page to set the visual direction.
2. **Reference pages:** After selecting a variation, use its page ID as `additionalPages` when designing Trip Detail and modals for consistency.
3. **Flow grouping:** Use the same `flowName` (e.g., "ski-trip-planner") for related pages so they appear together.
4. **CodeContext:** Pass the relevant interfaces when designing to help Subframe understand data structure and labels.
