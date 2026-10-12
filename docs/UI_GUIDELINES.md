# UI Guidelines

## 1. Project UI Overview

Build a clean, modern, responsive, and professional user interface for the **Weather-Based Smart Irrigation Advisory System**.

The application is a college-level full-stack prototype that allows farmers to:

* Register and log in
* Add and manage farms
* Select farm locations using OpenStreetMap
* View current weather information
* Receive rule-based irrigation recommendations
* View weather and recommendation history
* Manage their profile

The interface must look like a real agriculture and weather-management dashboard while remaining simple, easy to understand, and suitable for academic demonstration.

---

# 2. Technology Requirements

Use the following frontend technologies:

* React.js
* Vite
* Tailwind CSS
* React Router DOM
* Axios
* React Hook Form
* React Leaflet
* Leaflet
* Lucide React Icons
* Recharts or Chart.js
* React Hot Toast

Use:

* Functional components
* React Hooks
* Reusable components
* Responsive Tailwind classes
* Clean and modular code
* Accessible HTML elements

Do not use:

* Inline CSS
* Bootstrap
* jQuery
* Hardcoded API data in production components
* Large monolithic components
* Unnecessary animations
* Green as the main application theme

---

# 3. Design Theme

Use a professional earth-based design system with warm brown, field green, and water blue.

The visual theme should represent:

* Water
* Irrigation
* Weather
* Technology
* Reliability
* Agriculture management

## Primary Theme

* Primary: Fresh Emerald (`#16865B`)
* Secondary: Water Teal Blue (`#287271`)
* Sidebar: Dark Earth Brown (`#3E2F26`)
* Background: Warm Sand (`#F7F3EB`)
* Cards: Warm White (`#FFFDF8`)
* Success: Green
* Warning: Amber
* Error: Red

The application should balance brown, green, and blue across navigation, buttons,
icons, highlights, charts, and information panels. Preserve semantic red and amber
for errors and warnings.

---

# 4. Colour Palette

Use the following colours consistently.

```js
const colors = {
  primary: "#2563EB",
  primaryDark: "#1D4ED8",
  primaryDarker: "#1E40AF",
  primaryLight: "#DBEAFE",
  primarySoft: "#EFF6FF",

  secondary: "#0EA5E9",
  secondaryDark: "#0284C7",
  secondaryLight: "#E0F2FE",

  navy: "#0F172A",
  navyLight: "#1E293B",
  navySoft: "#334155",

  background: "#F8FAFC",
  backgroundSecondary: "#F1F5F9",
  surface: "#FFFFFF",

  textPrimary: "#0F172A",
  textSecondary: "#475569",
  textMuted: "#64748B",
  textLight: "#CBD5E1",

  border: "#E2E8F0",
  borderDark: "#CBD5E1",

  success: "#16A34A",
  successLight: "#DCFCE7",

  warning: "#F59E0B",
  warningLight: "#FEF3C7",

  danger: "#DC2626",
  dangerLight: "#FEE2E2",

  info: "#0284C7",
  infoLight: "#E0F2FE",
};
```

## Tailwind Colour Mapping

```txt
Main page background: bg-slate-50
Secondary background: bg-slate-100
Card background: bg-white
Sidebar: bg-slate-900
Sidebar hover: hover:bg-slate-800
Primary button: bg-blue-600
Primary button hover: hover:bg-blue-700
Active navigation: bg-blue-600 text-white
Primary icons: text-blue-600
Information panel: bg-blue-50
Borders: border-slate-200
Primary heading: text-slate-900
Body text: text-slate-600
Muted text: text-slate-500
Success: bg-green-50 text-green-700
Warning: bg-amber-50 text-amber-700
Error: bg-red-50 text-red-700
```

---

# 5. Typography

Use a modern sans-serif font.

Preferred fonts:

* Inter
* Poppins
* System UI fallback

Recommended font stack:

```css
font-family:
  Inter,
  Poppins,
  ui-sans-serif,
  system-ui,
  -apple-system,
  BlinkMacSystemFont,
  "Segoe UI",
  sans-serif;
```

## Typography Scale

```txt
Page title:
text-2xl md:text-3xl font-bold text-slate-900

Section heading:
text-xl md:text-2xl font-semibold text-slate-900

Card title:
text-base md:text-lg font-semibold text-slate-900

Large statistic:
text-2xl md:text-3xl font-bold text-slate-900

Body text:
text-sm md:text-base text-slate-600

Secondary text:
text-sm text-slate-500

Label:
text-sm font-medium text-slate-700

Small helper text:
text-xs text-slate-500
```

Do not use excessive font sizes or too many font weights.

---

# 6. Spacing System

Use a consistent 8-pixel spacing system.

Recommended spacing:

```txt
4px: very small gaps
8px: icon and text spacing
12px: compact component spacing
16px: standard spacing
24px: card padding
32px: section spacing
48px: major section spacing
64px: page section separation
```

Tailwind examples:

```txt
gap-2
gap-3
gap-4
gap-6
p-4
p-5
p-6
px-6
py-4
space-y-4
space-y-6
```

Avoid random or inconsistent spacing values.

---

# 7. Border Radius and Shadows

Use soft rounded corners.

```txt
Buttons: rounded-lg
Inputs: rounded-lg
Cards: rounded-xl or rounded-2xl
Modal: rounded-2xl
Icon container: rounded-xl
Status badge: rounded-full
```

Recommended shadows:

```txt
Cards: shadow-sm
Important cards: shadow-md
Dropdowns and modals: shadow-lg
```

Avoid heavy or dark shadows.

Recommended card style:

```jsx
className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
```

---

# 8. Application Layout

## Public Layout

Used for:

* Home
* About
* Login
* Register
* Contact
* Help

Structure:

```txt
Navbar
Main Content
Footer
```

The public navbar should:

* Use a white background
* Have a subtle bottom border
* Remain sticky at the top
* Display the logo on the left
* Display menu links in the centre or right
* Display Login and Register buttons
* Collapse into a mobile menu

Recommended styling:

```jsx
className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur"
```

## Dashboard Layout

Used for authenticated pages.

Structure:

```txt
Sidebar
Top Header
Main Content
```

Desktop:

```txt
Sidebar width: 256px
Content area: remaining width
```

Mobile:

```txt
Sidebar hidden by default
Hamburger menu opens drawer
Main content uses full width
```

Recommended structure:

```jsx
<div className="min-h-screen bg-slate-50">
  <Sidebar />

  <div className="lg:ml-64">
    <Header />

    <main className="p-4 md:p-6 lg:p-8">
      {children}
    </main>
  </div>
</div>
```

---

# 9. Sidebar Design

The sidebar must use a dark navy background.

```txt
Background: bg-slate-900
Logo text: text-blue-400
Normal item: text-slate-300
Hover item: hover:bg-slate-800 hover:text-white
Active item: bg-blue-600 text-white
Section label: text-slate-500
```

Sidebar menu:

* Dashboard
* Add Farm
* My Farms
* Weather
* Recommendation
* History
* Profile
* Logout

Each menu item must contain:

* Lucide icon
* Menu label
* Active-state styling
* Hover transition

Example:

```jsx
<NavLink
  to="/dashboard"
  className={({ isActive }) =>
    `flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition ${
      isActive
        ? "bg-blue-600 text-white"
        : "text-slate-300 hover:bg-slate-800 hover:text-white"
    }`
  }
>
  <LayoutDashboard size={20} />
  Dashboard
</NavLink>
```

---

# 10. Header Design

The dashboard header should contain:

* Mobile menu button
* Page title or breadcrumb
* Notification icon
* User avatar
* Farmer name
* Profile dropdown

Recommended style:

```jsx
className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 md:px-6"
```

The header must remain simple and should not contain too many controls.

---

# 11. Navigation Structure

## Public Navigation

```txt
Home
About
Features
Contact
Login
Register
```

## Authenticated Navigation

```txt
Dashboard
Add Farm
My Farms
Weather
Recommendation
History
Profile
Logout
```

## Optional Admin Navigation

```txt
Admin Dashboard
Users
Farms
Weather Records
Recommendations
Reports
Settings
Logout
```

Use React Router and `NavLink` for active navigation states.

---

# 12. Reusable Components

Create reusable components instead of repeating UI code.

Required components:

```txt
Navbar
Footer
Sidebar
Header
PageHeader
Button
Input
Select
Textarea
FormField
PasswordInput
SearchInput
Modal
ConfirmDialog
LoadingSpinner
PageLoader
EmptyState
ErrorState
StatusBadge
WeatherCard
ForecastCard
FarmCard
RecommendationCard
SummaryCard
HistoryTable
Pagination
MapSelector
ToastNotification
ProtectedRoute
```

Each component should:

* Accept props
* Avoid hardcoded content
* Support loading and disabled states where required
* Use consistent spacing and styles
* Be reusable across multiple pages

---

# 13. Button Design

## Primary Button

```jsx
className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
```

## Secondary Button

```jsx
className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
```

## Danger Button

```jsx
className="inline-flex items-center justify-center gap-2 rounded-lg bg-red-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-red-700"
```

## Text Button

```jsx
className="text-sm font-medium text-blue-600 hover:text-blue-700"
```

Buttons must include loading states.

Example:

```jsx
<button disabled={isLoading}>
  {isLoading ? "Saving..." : "Save Farm"}
</button>
```

---

# 14. Input and Form Design

All forms must use:

* Visible labels
* Placeholder text
* Validation messages
* Required-field indicators
* Focus states
* Disabled states
* Helper text where needed

Recommended input style:

```jsx
className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
```

Error style:

```jsx
className="border-red-500 focus:border-red-500 focus:ring-red-100"
```

Validation message:

```jsx
<p className="mt-1 text-xs text-red-600">
  This field is required.
</p>
```

Use React Hook Form for:

* Login
* Registration
* Farm form
* Profile form
* Password change
* Contact form

Never rely only on placeholders as labels.

---

# 15. Cards

All cards should use:

```jsx
className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
```

Cards should contain:

* Clear title
* Optional icon
* Main value or content
* Secondary information
* Optional action button

Example summary card:

```jsx
function SummaryCard({ title, value, icon: Icon, description }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>

          <h3 className="mt-2 text-3xl font-bold text-slate-900">
            {value}
          </h3>

          {description && (
            <p className="mt-2 text-sm text-slate-500">
              {description}
            </p>
          )}
        </div>

        <div className="rounded-xl bg-blue-100 p-3">
          <Icon className="text-blue-600" size={24} />
        </div>
      </div>
    </div>
  );
}
```

---

# 16. Status Badges

Use consistent badges.

## Success

```jsx
className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700"
```

## Warning

```jsx
className="rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-700"
```

## Error

```jsx
className="rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-700"
```

## Information

```jsx
className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700"
```

Recommendation statuses:

```txt
Irrigate Today: blue or green
Delay Irrigation: amber
No Irrigation Required: green
Monitor Weather: blue
Weather unavailable: red
```

---

# 17. Page Requirements

## 17.1 Home Page

Create a modern landing page.

Sections:

1. Navbar
2. Hero section
3. Project overview
4. Main features
5. How it works
6. Benefits
7. Technology overview
8. Call-to-action
9. Footer

Hero content:

```txt
Weather-Based Smart Irrigation Advisory System

Make better irrigation decisions using live weather data and location-based recommendations.
```

Hero buttons:

* Get Started
* Learn More

Use a blue gradient background:

```jsx
className="bg-gradient-to-br from-blue-700 via-blue-600 to-sky-500"
```

Display a dashboard preview or agriculture/weather illustration on the right.

Do not overcrowd the home page.

---

## 17.2 About Page

Sections:

* Project introduction
* Problem statement
* Objectives
* Proposed solution
* Scope
* Technology stack
* Limitations
* Future scope

Use:

* Information cards
* Icons
* Step layouts
* Blue section headings
* Clear content separation

---

## 17.3 Login Page

Layout:

* Centred authentication card
* Optional illustration panel on desktop
* Single-column card on mobile

Fields:

* Email
* Password
* Remember me
* Forgot password
* Login button
* Register link

The login card should use:

```jsx
className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-lg md:p-8"
```

The page background may use:

```jsx
className="min-h-screen bg-gradient-to-br from-blue-50 via-slate-50 to-sky-100"
```

---

## 17.4 Register Page

Fields:

* Full name
* Email
* Mobile number
* Password
* Confirm password
* Terms checkbox
* Create account button
* Login link

Show password requirements clearly.

Use a two-column form only on large screens when appropriate.

---

## 17.5 Dashboard Page

Dashboard sections:

* Welcome card
* Total farms
* Current weather
* Rain probability
* Irrigation status
* Latest recommendation
* Farm details
* Weather chart
* Recent history
* Quick actions

Recommended grid:

```jsx
className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4"
```

Quick actions:

* Add Farm
* View Weather
* Get Recommendation
* View History

The main recommendation card should be visually prominent.

---

## 17.6 Add Farm Page

Sections:

1. Farm details form
2. Location details
3. OpenStreetMap selector
4. Selected coordinate summary
5. Save button

Fields:

* Farm name
* Crop name
* Area
* Area unit
* State
* District
* Village
* Latitude
* Longitude

Map requirements:

* Display OpenStreetMap using React Leaflet
* Restrict initial view to India
* Allow user to click on the map
* Place or move marker
* Display latitude and longitude
* Show a popup for selected location
* Provide a reset-location button
* Display loading and map error states

Use India as the initial location:

```js
const INDIA_CENTER = [20.5937, 78.9629];
```

Do not allow a farm to be submitted without a selected location.

---

## 17.7 My Farms Page

Display farms using cards or a responsive table.

Each farm item should show:

* Farm name
* Crop
* Area
* State
* District
* Village
* Coordinates
* Weather status
* View button
* Edit button
* Delete button

Provide:

* Search
* Filter by crop
* Empty state
* Delete confirmation modal
* Loading state

---

## 17.8 Farm Details Page

Display:

* Farm information
* Crop details
* Location
* OpenStreetMap marker
* Current weather
* Latest recommendation
* Recent weather history
* Edit farm action
* Delete farm action

Use a two-column desktop layout:

```txt
Left: farm information
Right: map and weather
```

Stack vertically on mobile.

---

## 17.9 Weather Page

Display:

* Selected farm dropdown
* Current temperature
* Humidity
* Wind speed
* Pressure
* Rain probability
* Weather description
* Weather icon
* Sunrise
* Sunset
* Last updated time
* Forecast cards
* Weather chart

Weather card icons:

* Thermometer
* Droplets
* Wind
* CloudRain
* Gauge
* CloudSun

Do not display fabricated weather data when API data is unavailable.

Show a clear error message instead.

---

## 17.10 Recommendation Page

Display:

* Selected farm
* Current weather summary
* Recommendation status
* Recommendation reason
* Recommended action
* Suggested irrigation duration when applicable
* Rule conditions used
* Save recommendation button
* Recommendation history

Rule-based recommendations:

```txt
Rain probability above 60%:
No Irrigation Required

Temperature above 35°C:
Irrigate Today

Humidity above 80%:
Delay Irrigation

Otherwise:
Monitor Weather
```

The recommendation card must change its visual status based on the result.

Example:

```txt
No Irrigation Required:
Green styling

Irrigate Today:
Blue styling

Delay Irrigation:
Amber styling

API Error:
Red styling
```

Clearly state that recommendations are advisory and weather-based.

---

## 17.11 History Page

Display recommendation and weather history.

Table columns:

* Date
* Farm
* Temperature
* Humidity
* Rain probability
* Weather condition
* Recommendation
* Status

Features:

* Search
* Farm filter
* Date filter
* Status filter
* Pagination
* Export button if implemented
* Mobile card layout

Tables must be horizontally scrollable on small screens.

---

## 17.12 Profile Page

Display:

* Profile avatar
* Full name
* Email
* Mobile number
* Account creation date
* Number of farms

Sections:

* Personal information
* Update profile
* Change password
* Account actions

Do not display the password.

Use separate cards for profile information and password changes.

---

## 17.13 Contact and Help Page

Sections:

* Contact form
* Support information
* Frequently asked questions
* Project information
* Email details
* College project disclaimer

Fields:

* Name
* Email
* Subject
* Message

Provide success and error feedback.

---

## 17.14 Not Found Page

Create a custom 404 page.

Display:

* Large `404`
* Page not found message
* Back to Home button
* Dashboard button for authenticated users

Use a clean blue illustration or icon.

---

# 18. OpenStreetMap Design

The map container should use:

```jsx
className="h-[400px] overflow-hidden rounded-2xl border border-slate-200"
```

Requirements:

* Disable map overflow outside rounded corners
* Display loading placeholder
* Display selected marker
* Show selected coordinates below map
* Use blue styling around the map container
* Keep map controls visible
* Ensure map works on mobile

Import Leaflet CSS correctly.

Fix default marker icon paths when required.

---

# 19. Weather Visualisation

Use Recharts or Chart.js.

Charts may display:

* Temperature trend
* Humidity trend
* Rain probability
* Weather history

Chart rules:

* Use blue as primary chart colour
* Use sky blue for secondary values
* Use subtle grid lines
* Use tooltips
* Use responsive containers
* Avoid 3D charts
* Avoid excessive colours
* Provide empty states when no history exists

Example chart container:

```jsx
<div className="h-72 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
  <ResponsiveContainer width="100%" height="100%">
    {/* chart */}
  </ResponsiveContainer>
</div>
```

---

# 20. Loading States

Every page that fetches data must have a loading state.

Use:

* Skeleton cards
* Spinner for buttons
* Page loader for initial page load
* Map loading placeholder
* Chart loading placeholder

Do not leave blank white spaces while loading.

Example skeleton:

```jsx
<div className="animate-pulse rounded-2xl border border-slate-200 bg-white p-5">
  <div className="h-4 w-24 rounded bg-slate-200" />
  <div className="mt-4 h-8 w-32 rounded bg-slate-200" />
</div>
```

---

# 21. Empty States

Create proper empty states for:

* No farms
* No weather history
* No recommendations
* No search results

Each empty state should contain:

* Icon
* Clear title
* Short explanation
* Relevant action button

Example:

```txt
No farms added yet

Add your first farm to start viewing weather and irrigation recommendations.

[Add Farm]
```

---

# 22. Error States

Display user-friendly error messages.

Examples:

```txt
Unable to fetch weather information.
Please check your internet connection and try again.

Farm could not be saved.
Please verify the entered details.

Your session has expired.
Please log in again.
```

Do not expose:

* API keys
* Stack traces
* Database errors
* Internal server information

Use toast notifications and inline errors where appropriate.

---

# 23. Modal and Dialog Design

Use modals for:

* Delete farm confirmation
* Logout confirmation if required
* Important warnings
* Success confirmations

Modal design:

```jsx
className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"
```

Overlay:

```jsx
className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm"
```

Include:

* Modal title
* Clear message
* Cancel button
* Confirm button
* Close icon
* Keyboard accessibility

---

# 24. Toast Notifications

Use toast notifications for:

* Login success
* Registration success
* Farm created
* Farm updated
* Farm deleted
* Profile updated
* Recommendation saved
* API failure
* Validation failure

Examples:

```txt
Farm added successfully.
Profile updated successfully.
Unable to fetch weather data.
```

Keep messages concise.

---

# 25. Responsive Design

The complete interface must work on:

* Mobile
* Tablet
* Laptop
* Desktop

## Breakpoints

Use standard Tailwind breakpoints:

```txt
sm: 640px
md: 768px
lg: 1024px
xl: 1280px
2xl: 1536px
```

## Mobile Rules

* Hide desktop sidebar
* Use mobile drawer navigation
* Stack cards vertically
* Use full-width buttons when needed
* Reduce padding
* Make tables horizontally scrollable
* Make forms single-column
* Maintain map usability
* Keep touch targets at least 44px high

## Desktop Rules

* Display fixed sidebar
* Use multi-column dashboard grids
* Use two-column forms where appropriate
* Display larger map and charts
* Keep content width readable

---

# 26. Accessibility

Follow basic accessibility standards.

Requirements:

* Use semantic HTML
* Add labels to all form controls
* Add `aria-label` to icon-only buttons
* Ensure keyboard navigation
* Use visible focus states
* Provide alt text for images
* Maintain sufficient colour contrast
* Do not communicate status using colour alone
* Use proper heading order
* Support screen-reader-friendly error messages

All interactive elements must be reachable using the keyboard.

---

# 27. Animation and Transitions

Use minimal, smooth animations.

Allowed:

* Button hover transition
* Card hover lift
* Sidebar drawer transition
* Dropdown fade
* Modal fade
* Skeleton loading animation

Recommended:

```jsx
className="transition duration-200 ease-in-out"
```

Avoid:

* Constantly moving elements
* Large bounce animations
* Heavy page transitions
* Excessive scaling
* Distracting effects

---

# 28. Icon Guidelines

Use Lucide React icons.

Recommended icons:

```txt
Home: Home
Dashboard: LayoutDashboard
Farm: Sprout
Add Farm: PlusCircle
Weather: CloudSun
Rain: CloudRain
Temperature: Thermometer
Humidity: Droplets
Wind: Wind
Map: MapPin
Recommendation: Lightbulb
History: History
Profile: User
Settings: Settings
Logout: LogOut
Notification: Bell
Edit: Pencil
Delete: Trash2
Search: Search
Menu: Menu
Close: X
Success: CheckCircle
Warning: AlertTriangle
Error: CircleX
```

Use consistent icon sizes:

```txt
Navigation: 20px
Card icon: 22–24px
Small action icon: 16–18px
Hero icon: 32–48px
```

---

# 29. Images and Branding

Use:

* Agriculture-related images
* Irrigation fields
* Weather illustrations
* Water imagery
* Farm maps
* Clean SVG illustrations

Avoid:

* Blurry images
* Watermarked images
* Random unrelated images
* Excessive background images

Logo design:

* Blue water droplet
* Leaf or crop symbol
* Simple modern style
* Project name beside logo

Suggested project name display:

```txt
Smart Irrigation
Weather Advisory System
```

---

# 30. Footer Design

Footer should contain:

* Project name
* Brief description
* Navigation links
* Technology links
* Contact information
* Copyright
* College project disclaimer

Recommended style:

```jsx
className="border-t border-slate-200 bg-slate-900 text-slate-300"
```

Use blue highlights for links.

---

# 31. Security UI Rules

The UI must:

* Never display tokens
* Never display API keys
* Never display raw passwords
* Hide password characters
* Provide password visibility toggle
* Confirm destructive actions
* Redirect unauthenticated users
* Clear user data after logout
* Display session-expired messages
* Disable duplicate form submissions

---

# 32. Code Organisation

Recommended frontend structure:

```txt
src/
├── assets/
│   ├── images/
│   ├── icons/
│   └── logo/
│
├── components/
│   ├── common/
│   ├── forms/
│   ├── layout/
│   ├── weather/
│   ├── farms/
│   ├── recommendations/
│   └── charts/
│
├── pages/
│   ├── public/
│   ├── auth/
│   ├── dashboard/
│   ├── farms/
│   ├── weather/
│   ├── recommendations/
│   ├── history/
│   └── profile/
│
├── layouts/
│   ├── PublicLayout.jsx
│   └── DashboardLayout.jsx
│
├── routes/
│   ├── AppRoutes.jsx
│   └── ProtectedRoute.jsx
│
├── services/
│   ├── api.js
│   ├── authService.js
│   ├── farmService.js
│   ├── weatherService.js
│   └── recommendationService.js
│
├── context/
│   └── AuthContext.jsx
│
├── hooks/
│   ├── useAuth.js
│   ├── useWeather.js
│   └── useFarms.js
│
├── utils/
│   ├── constants.js
│   ├── formatters.js
│   ├── validators.js
│   └── irrigationRules.js
│
├── App.jsx
├── main.jsx
└── index.css
```

---

# 33. Code Quality Rules

The generated interface must:

* Use reusable components
* Avoid duplicate code
* Use meaningful variable names
* Use meaningful component names
* Keep components focused
* Separate API logic from UI
* Separate business logic from components
* Use async/await
* Handle API errors
* Handle loading states
* Use environment variables
* Use ESLint-compatible code
* Avoid unnecessary comments
* Avoid deeply nested JSX
* Avoid files larger than necessary
* Use consistent import order

Do not put all pages inside `App.jsx`.

Do not place API calls directly in every component when a service can be used.

---

# 34. Data Display Rules

All dynamic values must have fallback states.

Example:

```jsx
<p>{weather?.temperature ?? "Not available"}</p>
```

Format:

* Temperature as `34°C`
* Humidity as `68%`
* Wind as `12 km/h`
* Rain probability as `40%`
* Area as `5 acres`
* Dates as readable local dates
* Time using the user’s locale

Do not display:

```txt
undefined
null
NaN
[object Object]
```

---

# 35. Final UI Quality Checklist

Before considering a page complete, confirm:

* The blue colour scheme is followed
* The page is responsive
* The page has loading states
* The page has empty states
* The page has error states
* All forms have validation
* Buttons have hover and disabled states
* Icons are consistent
* Spacing is consistent
* Typography is consistent
* Navigation works
* API errors are handled
* The page works on mobile
* The page is accessible
* No API key is hardcoded
* No dummy values appear as live data
* Components are reusable
* The page matches the rest of the application

---

# 36. Final Instruction to Codex

Create a complete, polished, production-style frontend for the Weather-Based Smart Irrigation Advisory System using this UI guideline.

The application must use:

* React.js
* Vite
* Tailwind CSS
* React Router
* Axios
* React Hook Form
* React Leaflet
* OpenStreetMap
* Lucide React Icons
* Recharts or Chart.js

The UI must:

* Use a blue and sky-blue design system
* Use a dark navy dashboard sidebar
* Use light slate page backgrounds
* Use white rounded cards
* Be responsive on mobile, tablet, and desktop
* Include proper loading, empty, success, and error states
* Use reusable components
* Use clean and modular code
* Follow accessibility standards
* Avoid placeholder-only implementation
* Avoid green as the primary colour
* Avoid hardcoded weather information
* Avoid hardcoded authentication data
* Never expose API keys
* Maintain consistent visual styling across every page

Build the pages in this order:

1. Shared design system
2. Public layout
3. Dashboard layout
4. Reusable components
5. Home page
6. Login page
7. Register page
8. Dashboard
9. Add Farm page
10. My Farms page
11. Farm Details page
12. Weather page
13. Recommendation page
14. History page
15. Profile page
16. Contact page
17. Not Found page
18. Responsive improvements
19. Loading and error states
20. Final UI consistency review

Do not generate the entire project in one large file.

Generate each page and component in its correct folder and keep the implementation consistent with the project architecture and documentation.

## Accent update - 12 October 2026

Green/teal decorative UI accents are replaced by blue (#2563EB), dark blue
(#1D4ED8) hover states and light blue tints. Existing brown navigation/surfaces,
warm neutral backgrounds, semantic statuses and agricultural illustrations remain.
This supersedes the Fresh Emerald primary accent specified above.

### Brighter blue preference

Per the user's subsequent request, use primary blue (#2563EB) instead of dark
blue for accents, panels and hover states. This supersedes the dark-blue hover
instruction above. Warm neutral colors remain as previously specified.

### Landing liquid-glass buttons — 12 October 2026

Per the supplied user reference, the landing Get started, About KisanSetu,
header Sign up, Start with KisanSetu, and Create your farm account actions use
frosted silver pill surfaces with dark labels, backdrop blur, inset rim highlights,
and soft shadows. This overrides the solid blue/white fills for these five
actions only. Keep visible blue focus rings, reduced-motion support, and an
opaque gradient fallback when backdrop filtering is unavailable.

The stronger glass revision uses a mostly transparent core, 8px backdrop blur,
more saturated background detail, and brighter double rims. Hero/header labels
are white with a dark text shadow; About labels stay dark on light surfaces.


The landing glass buttons now have no border or inset rim lines, per user request.
Translucent fills, reflective gradients, blur, and soft shadows remain. Keyboard
focus outlines remain visible for accessibility.


The latest borderless revision removes the inset pseudo-element reflection and
all inset shadows that appeared as a rim. Glass fills use 3�15% white opacity
(5�20% on hover) with 5px blur for clearer background visibility.


The landing Explore down-arrow circle also uses borderless translucent glass,
6px backdrop blur, a soft shadow, and accessible focus/reduced-motion states.


The Explore circle's latest finish uses 1�6% white fill, 3px blur, and a lighter
shadow for greater transparency; hover fill remains subtle at 3�10%.


The Explore arrow circle now has a localized reflective sheen over a nearly
clear fill, 2px blur, and increased saturation. It remains borderless.


The sugarcane illustration's text overlay uses borderless frosted glass with
30�50% white gradient opacity, 14px backdrop blur, and dark readable labels.
An opaque fill is retained as a fallback where backdrop filtering is unsupported.


Glassmorphism now covers the entire sugarcane illustration component: translucent
landscape layers, 16px backdrop blur, softened sun/cane artwork, and a borderless
soft shadow. The frosted text panel remains. Opaque fallbacks are provided.


The whole-card glass change was reverted at the user's request. The original
sugarcane illustration is restored; only its text overlay retains frosted glass.


The sugarcane text-overlay glass revision was also reverted at the user's
request. The entire illustration card and its text panel use their original styling.


### Color-preserving sugarcane glass - 12 October 2026

Keep the illustration's original opaque landscape, sun, and cane colors. Add
a subtle reflection layer and soft glass highlights instead of fading the artwork.
The text panel retains its white appearance and existing blue/navy/slate text,
with slight translucency and 12px backdrop blur. Provide an opaque fallback.


### Responsive HD hero background - 12 October 2026

Use the original agricultural photo in device-specific crops: 3840x2160 desktop,
2048x1536 tablet, and 1200x1600 portrait mobile. Use native picture sources,
object-fit cover, and responsive object positions. Keep existing overlays/colors.
The phone hero expands with its content and preserves space for its bottom links.


The Start with KisanSetu action specifically uses blue-tinted translucent glass,
white text, 10px blur, and a soft blue shadow. It remains borderless and uses a
solid primary-blue fallback without backdrop-filter support.


The Start with KisanSetu glass tint now uses primary blue (#2563EB) throughout,
without cyan, with 75�92% tint opacity and white text.


The Start with KisanSetu blue-glass selector must override the shared landing
clear-glass selector in default, hover, and fallback states.


The blue Start with KisanSetu action now adds a soft reflective gradient and
inset highlights over its saturated blue tint, with 14px blur. Preserve the
blue color and white labels; do not add a border.


The Start with KisanSetu glass button now uses a more transparent 65�75%
primary-blue tint, subtle reflections, and 8px blur. White labels remain.


The Start with KisanSetu button follows the latest smooth-pill reference in blue:
a uniform 72% primary-blue glass fill, 12px blur, white text, more arrow spacing,
and a faint shadow. No borders, inset rims, or glossy highlight gradients.


The latest Start with KisanSetu reference uses translucent light-blue glass,
22px rounded corners, 16px blur, sculpted inset highlights, and a soft blue shadow.
White text and the existing arrow remain.


The latest light-blue sculpted-glass button revision was reverted at the user's
request. Start with KisanSetu returns to its preceding primary-blue glass pill.


### Registration refresh - 12 October 2026
The registration page uses a pale blue/slate canvas, rounded farm-photo panel with a primary-blue overlay, and a bordered white form card. Slate text and input borders replace warm brown neutrals on this page. Retain blue actions, visible focus styles, loading/error states, and a stacked mobile layout. Reuse the bundled landing photograph; no dependencies or API changes.


The registration header omits the About navigation link at the user's request.


Login reuses the registration page's photo panel, pale blue canvas, white card, slate form controls, responsive layout and blue actions. Both authentication headers omit About. Login retains its own copy and authentication behavior.


On desktop, login/register photo and form panels use equal grid columns and matching stretched heights (680px minimum) and 28px corners. Form content remains vertically centered. Stacked layouts use natural form height.


The registration header also omits Log in; the existing Sign in instead link remains within the form.


Registration hides the public header and fills the viewport. Its weather logo uses primary blue on a white tile; login retains its existing header/logo.


Login now shares registration's header-free, full-viewport layout and blue-on-white weather logo. This supersedes the preceding login header/logo exception.


Both authentication pages display a shared top-left KisanSetu home link with a white droplet in a blue tile and blue wordmark. Reserve top spacing for the logo without restoring the public header. Keep keyboard focus visible.


### Authentication redesign - 12 October 2026
Login/register now use a joined two-column card with equal panel dimensions: white form left and blue-overlaid farm photo right. The top-left home logo remains and public headers stay hidden. Use lighter borders, compact typography, 12px form-control corners, and shared styling. On tablet/mobile the form comes first and photo follows. This supersedes the previous separated photo-left/form-right layout.


The top-left login/register home logo now uses a white droplet and white KisanSetu wordmark on a primary-blue rounded background for contrast against the light page.


The latest white-wordmark/blue-background logo change was reverted. Authentication pages again use the blue KisanSetu wordmark beside a white droplet in a blue tile.


### Dashboard overview refresh - 12 October 2026
Scope the new overview styling to /dashboard. Use navy (#0F172A) navigation, primary-blue active links, a pale-blue overview banner, white rounded cards, slate labels, and visible blue focus rings. Weather metrics use four desktop columns, two on smaller screens, and one on narrow phones. The temperature/humidity chart spans the chart grid; rain/wind share a row on desktop and stack on mobile. Farm details and recommendation use equal desktop columns. Keep the bundled data explicitly labeled Simulated Weather Data.


The dashboard overview banner (kicker, title, description and icon badge) is removed at the user's request. The farm-selector label retains a compact simulated-weather disclosure.


### Workspace palette alignment - 12 October 2026
All authenticated pages now share the dashboard's navy sidebar, white surfaces, primary-blue accents, light-slate form controls and slate text. Applies to My Farms, Add Farm, farm details, Weather, Recommendation, History and Profile. Profile/advisor decorative warm colors use blue/slate; semantic success, warning and error states remain distinct. Page behavior and API contracts are unchanged.


The workspace sidebar now uses a light-blue gradient (#EFF6FF to #DBEAFE), slate/navy labels, pale-blue hover fills and bright-blue active links with white labels, per user request. Promo/user/close controls match the light theme. This supersedes the navy-sidebar direction for the workspace.


All brand symbols follow the supplied outlined circular droplet reference: a 44px circle, thin outline and 24px droplet with transparent fill. Use white on photo backgrounds and blue on light surfaces for contrast. Authentication story marks now use the same droplet symbol.


### Dark appearance
Dark mode uses #0B1220 backgrounds, #111C2E surfaces, #334155 borders, #E2E8F0 text and blue accents. Users can toggle it with the moon/sun control; the choice persists locally and defaults to the device appearance when unset. Preserve semantic status colors and map tile imagery. Browser contrast verification remains pending.


### Dark field and surface consistency - 12 October 2026

Theme complete authentication field wrappers, including icons and password controls, with #0B1526 fills and #475569 borders; nested inputs remain transparent. Replace pale authentication gradients in dark mode and use #334155 card borders. Links use #60A5FA with translucent blue focus rings. Nested workspace surfaces/table headers use dark fills; primary actions retain blue/white labels and disclaimers retain warning colors. Browser visual verification remains pending.
