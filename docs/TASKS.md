AI Codex Task Plan
1. Document Purpose

This document defines the exact development tasks that AI Codex must complete for the Weather-Based Smart Irrigation Advisory System.

The project uses:

Frontend:
React + Vite + Tailwind CSS

Backend:
Node.js + Express.js

Database:
MongoDB + Compass

Database Tool:
MongoDB Compass

Map:
OpenStreetMap + React Leaflet

Weather:
OpenWeather API through backend

Authentication:
JWT + bcrypt

Recommendation:
Rule-based irrigation logic

AI Codex must follow the existing project documentation and must not replace the selected technologies without explicit approval.

2. Main Codex Objective

Build a complete, responsive, modular, secure, and testable full-stack prototype that allows a farmer to:

Register
   ↓
Login
   ↓
Open Dashboard
   ↓
Add Farm
   ↓
Select Farm Location
   ↓
Save Farm
   ↓
Fetch Weather
   ↓
Generate Recommendation
   ↓
View History
   ↓
Manage Profile
   ↓
Logout
3. Documentation Priority

When documents conflict, AI Codex must follow this order:

1. REQUIREMENTS.md
2. DECISIONS.md
3. ARCHITECTURE.md
4. API.md
5. DATABASE.md
6. BACKEND.md
7. FRONTEND.md
8. UI_GUIDELINES.md
9. FEATURES.md
10. TESTING_PLAN.md
11. TASKS.md
12. TODO.md

The actual implemented stack is Node.js and Express.js.

Do not use FastAPI or Python unless the backend is intentionally migrated.

4. General Rules for AI Codex

AI Codex must:

Preserve the current folder structure
Use ES modules consistently
Use functional React components
Use React hooks
Use Tailwind CSS
Use React Router
Use Axios for frontend API calls
Use Compass for MongoDB
Use Express middleware
Use JWT authentication
Hash passwords with bcrypt
Use OpenWeather only through the backend
Use OpenStreetMap with React Leaflet
Use MongoDB Compass for database inspection
Keep routes thin
Keep controllers focused
Keep business logic inside services
Keep recommendation rules in one file
Keep API calls in frontend services
Use reusable components
Add loading, empty, success, and error states
Validate data in both frontend and backend
Verify farm ownership in the backend
Keep secrets inside .env
Never expose API keys
Never return password hashes
Never trust client-provided user IDs
Never fabricate weather data
Never generate a recommendation without valid weather
Avoid monolithic files
Avoid duplicate logic
Avoid Bootstrap
Avoid inline CSS unless required by a third-party library
Keep all documentation synchronized with the implementation
5. Phase 1 — Project Audit
Task 1.1 — Inspect Existing Project

AI Codex must:

Review frontend folder structure
Review backend folder structure
Review package files
Review environment files
Review all documentation
Identify missing files
Identify duplicate logic
Identify broken imports
Identify unused files
Identify inconsistent naming
Identify FastAPI references that conflict with Express
Identify incomplete pages
Identify incomplete backend routes
Identify missing dependencies
Identify missing tests
Expected Output

Create a short implementation report containing:

Existing files
Missing files
Broken files
Conflicting documentation
Required dependencies
Recommended implementation order

Do not modify code during the first audit unless needed to fix a critical startup error.

6. Phase 2 — Backend Setup
Task 2.1 — Configure package.json

Ensure backend scripts exist:

{
  "scripts": {
    "dev": "nodemon server.js",
    "start": "node server.js",
    "test": "jest",
    "test:watch": "jest --watch",
    "lint": "eslint ."
  }
}

Ensure:

{
  "type": "module"
}

Install required dependencies:

express
Compass
jsonwebtoken
bcryptjs
axios
dotenv
cors
helmet
morgan
express-validator

Install development dependencies:

nodemon
jest
supertest
eslint
Task 2.2 — Configure Environment Files

Create or update:

backend/.env
backend/.env.example

Required values:

NODE_ENV=development
PORT=8000
MONGODB_URI=mongodb://127.0.0.1:27017/smart_irrigation
JWT_SECRET=
JWT_EXPIRES_IN=1h
OPENWEATHER_API_KEY=
OPENWEATHER_BASE_URL=https://api.openweathermap.org
FRONTEND_URL=http://localhost:5173

Rules:

Do not commit .env
Commit .env.example
Never add real secrets to documentation
Validate required environment variables on startup
Task 2.3 — Configure Database Connection

Implement:

backend/config/db.js

Requirements:

Connect once using Compass
Read MONGODB_URI
Log successful connection
Handle connection failure
Do not expose credentials
Exit process on initial connection failure
Task 2.4 — Configure JWT

Implement:

backend/config/jwt.js

Functions:

generateToken(payload)
verifyToken(token)

Requirements:

Read secret from .env
Use token expiration
Keep payload minimal
Return predictable token errors
7. Phase 3 — Backend Models
Task 3.1 — Implement User Model

File:

backend/models/User.js

Fields:

name
email
mobile
passwordHash
role
status
createdAt
updatedAt

Requirements:

Unique lowercase email
Farmer default role
Active default status
Password hash excluded from normal queries
Timestamps enabled
Password comparison method
Validation for name, email, and mobile
Task 3.2 — Implement Farm Model

File:

backend/models/Farm.js

Fields:

owner
farmName
cropName
area
areaUnit
state
district
village
latitude
longitude
createdAt
updatedAt

Requirements:

Owner ObjectId reference
Area greater than zero
Valid coordinate ranges
Allowed area units
Required ownership indexes
Timestamps enabled
Task 3.3 — Implement Weather History Model

File:

backend/models/WeatherHistory.js

Fields:

user
farm
temperature
feelsLike
humidity
windSpeed
pressure
rainProbability
weatherCondition
weatherDescription
weatherIcon
observedAt
recordedAt
createdAt
updatedAt

Requirements:

User and farm references
Valid numeric ranges
Compound history index
Timestamps enabled
Task 3.4 — Implement Recommendation Model

File:

backend/models/Recommendation.js

Fields:

user
farm
status
title
reason
recommendedAction
suggestedDuration
weatherSnapshot
disclaimer
generatedAt
createdAt
updatedAt

Allowed statuses:

no_irrigation
delay_irrigation
irrigate_today
monitor_weather

Requirements:

Store weather snapshot
Add history indexes
Validate status values
Enable timestamps
8. Phase 4 — Backend Utilities and Middleware
Task 4.1 — Implement API Response Helpers

File:

backend/utils/apiResponse.js

Functions:

sendSuccess(res, statusCode, message, data)
sendError(res, statusCode, message, code, errors)

Use consistent response structure.

Task 4.2 — Implement Constants

File:

backend/utils/constants.js

Include:

User roles
User statuses
Recommendation statuses
Area units
Pagination defaults
Error codes
Weather timeout
Advisory disclaimer

Do not store secrets.

Task 4.3 — Implement Logger

File:

backend/utils/logger.js

Support:

logger.info()
logger.warn()
logger.error()
logger.debug()

Do not log:

Passwords
Password hashes
JWT tokens
Authorization headers
API keys
Database credentials
Task 4.4 — Implement Authentication Middleware

File:

backend/middleware/auth.middleware.js

Functions:

protect
authorizeRoles(...roles)

Requirements:

Read Bearer token
Verify JWT
Load current user
Reject invalid or expired token
Reject inactive or suspended user
Attach safe user data to req.user
Task 4.5 — Implement Validation Middleware

File:

backend/middleware/validation.middleware.js

Use one library consistently.

Recommended:

express-validator

Create validation for:

Registration
Login
Profile update
Password change
Farm creation
Farm update
Pagination
MongoDB ObjectId
Task 4.6 — Implement Error Middleware

File:

backend/middleware/error.middleware.js

Functions:

notFoundHandler
errorHandler

Handle:

Compass validation errors
Duplicate key errors
Invalid ObjectIds
JWT errors
Expired tokens
Axios errors
Weather timeouts
Unexpected errors

Hide stack traces in production.

9. Phase 5 — Authentication Backend
Task 5.1 — Implement Authentication Service

File:

backend/services/auth.service.js

Functions:

registerUser(userData)
authenticateUser(email, password)
buildAuthResponse(user)
hashPassword(password)

Requirements:

Normalize email
Reject duplicates
Hash password
Force farmer role
Generate JWT
Return safe user object
Task 5.2 — Implement Authentication Controller

File:

backend/controllers/auth.controller.js

Functions:

registerUser
loginUser
getCurrentUser
logoutUser

Use standard API responses.

Task 5.3 — Implement Authentication Routes

File:

backend/routes/auth.routes.js

Endpoints:

POST /api/v1/auth/register
POST /api/v1/auth/login
GET  /api/v1/auth/me
POST /api/v1/auth/logout

Apply validation and authentication middleware correctly.

10. Phase 6 — User Profile Backend
Task 6.1 — Implement User Controller

File:

backend/controllers/user.controller.js

Functions:

getProfile
updateProfile
changePassword

Requirements:

Return farm count
Allow only approved fields
Verify current password
Hash new password
Never return password hash
Task 6.2 — Implement User Routes

File:

backend/routes/user.routes.js

Endpoints:

GET /api/v1/users/profile
PUT /api/v1/users/profile
PUT /api/v1/users/change-password

All routes require authentication.

11. Phase 7 — Farm Backend
Task 7.1 — Implement Farm Controller

File:

backend/controllers/farm.controller.js

Functions:

createFarm
getFarms
getFarmById
updateFarm
deleteFarm

Requirements:

Assign owner from req.user.id
Ignore client-provided owner
Verify ownership
Add search
Add crop filter
Add pagination
Add sorting
Validate ObjectIds
Return safe farm objects
Task 7.2 — Implement Farm Routes

File:

backend/routes/farm.routes.js

Endpoints:

POST   /api/v1/farms
GET    /api/v1/farms
GET    /api/v1/farms/:farmId
PUT    /api/v1/farms/:farmId
DELETE /api/v1/farms/:farmId

All routes require authentication.

Task 7.3 — Implement Farm Deletion Policy

When a farm is deleted:

Delete farm
Delete weather history
Delete recommendations

Use a transaction when available.

12. Phase 8 — Location Service
Task 8.1 — Implement Location Service

File:

backend/services/location.service.js

Functions:

validateCoordinates(latitude, longitude)
normalizeCoordinates(latitude, longitude)

Optional:

reverseGeocode(latitude, longitude)
isLocationInIndia(latitude, longitude)

Do not make reverse geocoding mandatory for the MVP.

13. Phase 9 — Weather Backend
Task 9.1 — Implement Weather Service

File:

backend/services/weather.service.js

Functions:

fetchCurrentWeather(latitude, longitude)
fetchForecast(latitude, longitude, days)
normalizeCurrentWeather(apiResponse)
normalizeForecast(apiResponse)
saveWeatherHistory(data)

Requirements:

Use Axios
Use metric units
Use timeout
Read API key from .env
Normalize response
Handle provider errors
Never expose API key
Never fabricate weather data
Task 9.2 — Implement Weather Controller

File:

backend/controllers/weather.controller.js

Functions:

getCurrentWeather
getForecast
getWeatherHistory

Requirements:

Verify farm ownership
Use stored farm coordinates
Save normalized weather history
Return safe errors
Task 9.3 — Implement Weather Routes

File:

backend/routes/weather.routes.js

Endpoints:

GET /api/v1/weather/:farmId
GET /api/v1/weather/:farmId/forecast
GET /api/v1/weather/:farmId/history

Forecast may remain optional for MVP.

14. Phase 10 — Recommendation Backend
Task 10.1 — Implement Irrigation Rules

File:

backend/utils/irrigationRules.js

Required rule priority:

1. Rain probability
2. Humidity
3. Temperature
4. Default

Required logic:

if (rainProbability > 60) {
  return {
    status: "no_irrigation",
    title: "No Irrigation Required",
  };
}

if (humidity > 80) {
  return {
    status: "delay_irrigation",
    title: "Delay Irrigation",
  };
}

if (temperature > 35) {
  return {
    status: "irrigate_today",
    title: "Irrigate Today",
  };
}

return {
  status: "monitor_weather",
  title: "Monitor Weather",
};

The function must also return:

reason
recommendedAction
Task 10.2 — Implement Recommendation Service

File:

backend/services/recommendation.service.js

Functions:

generateRecommendationForFarm(farm, weather)
saveRecommendation(data)
getLatestRecommendation(farmId, userId)
getRecommendationHistory(farmId, userId, options)

Requirements:

Use normalized weather
Call irrigation rules
Add disclaimer
Store weather snapshot
Save recommendation
Task 10.3 — Implement Recommendation Controller

File:

backend/controllers/recommendation.controller.js

Functions:

generateRecommendation
getLatestRecommendation
getRecommendationHistory

Do not generate a recommendation if weather retrieval fails.

Task 10.4 — Implement Recommendation Routes

File:

backend/routes/recommendation.routes.js

Endpoints:

POST /api/v1/recommendations/:farmId
GET  /api/v1/recommendations/:farmId
GET  /api/v1/recommendations/:farmId/history
15. Phase 11 — Express Application Setup
Task 11.1 — Implement app.js

Configure:

Express
CORS
Helmet
JSON parsing
URL-encoded parsing
Request logging
Health endpoint
API routes
404 middleware
Error middleware

Register:

/api/v1/auth
/api/v1/users
/api/v1/farms
/api/v1/weather
/api/v1/recommendations

Do not start the server in app.js.

Task 11.2 — Implement server.js

Responsibilities:

Load environment variables
Connect MongoDB
Start Express server
Handle startup errors
Handle graceful shutdown
Handle unhandled rejection
Handle uncaught exception
16. Phase 12 — MongoDB Compass Tasks

AI Codex must ensure the database appears correctly in MongoDB Compass.

Database:

smart_irrigation

Collections:

users
farms
weatherhistories
recommendations

Required indexes:

Users
{ email: 1 }

Unique:

Yes
Farms
{ owner: 1, createdAt: -1 }
{ owner: 1, farmName: 1 }
Weather History
{ farm: 1, recordedAt: -1 }
Recommendations
{ farm: 1, generatedAt: -1 }

AI Codex should not create database records manually when the backend API can create them.

17. Phase 13 — Frontend Setup
Task 13.1 — Configure Frontend Dependencies

Ensure these packages are installed:

react-router-dom
axios
react-hook-form
react-leaflet
leaflet
lucide-react
react-hot-toast
recharts

Create:

frontend/.env
frontend/.env.example

Value:

VITE_API_BASE_URL=http://localhost:8000/api/v1
Task 13.2 — Configure main.jsx

Requirements:

Import React
Import React DOM
Import BrowserRouter
Import AuthProvider
Import global CSS
Import Leaflet CSS
Render App
Task 13.3 — Configure App.jsx

App.jsx should render:

<AppRoutes />

Do not place the whole application in App.jsx.

18. Phase 14 — Frontend Services
Task 14.1 — Implement Axios Client

File:

frontend/src/services/api.js

Requirements:

Use VITE_API_BASE_URL
Add JSON headers
Add timeout
Add Bearer token
Handle 401 response
Avoid redirect loops
Task 14.2 — Implement Auth Service

File:

frontend/src/services/authService.js

Functions:

register(userData)
login(credentials)
getCurrentUser()
logout()
getProfile()
updateProfile(profileData)
changePassword(passwordData)
Task 14.3 — Implement Farm Service

File:

frontend/src/services/farmService.js

Functions:

createFarm(farmData)
getFarms(params)
getFarmById(farmId)
updateFarm(farmId, farmData)
deleteFarm(farmId)

Do not send userId.

Task 14.4 — Implement Weather Service

File:

frontend/src/services/weatherService.js

Functions:

getCurrentWeather(farmId)
getForecast(farmId, days)
getWeatherHistory(farmId, params)

Do not call OpenWeather directly.

Task 14.5 — Implement Recommendation Service

File:

frontend/src/services/recommendationService.js

Functions:

generateRecommendation(farmId)
getLatestRecommendation(farmId)
getRecommendationHistory(farmId, params)
19. Phase 15 — Frontend Authentication
Task 15.1 — Implement AuthContext.jsx

State:

user
token
isAuthenticated
loading
error

Functions:

login
register
logout
refreshUser
updateUser

Requirements:

Restore session after refresh
Verify token through backend
Clear expired session
Expose safe authentication state
Task 15.2 — Implement useAuth.js

Return the authentication context.

Throw an error when used outside AuthProvider.

Task 15.3 — Implement ProtectedRoute.jsx

Behaviour:

Loading → show loader
Authenticated → render Outlet
Unauthenticated → redirect to Login
20. Phase 16 — Frontend Layouts and Navigation
Task 16.1 — Implement Public Layout

File:

frontend/src/layouts/MainLayout.jsx

Structure:

Navbar
Outlet
Footer
Task 16.2 — Implement Dashboard Layout

File:

frontend/src/layouts/DashboardLayout.jsx

Structure:

Sidebar
Header
Outlet

Requirements:

Fixed sidebar on desktop
Drawer sidebar on mobile
User avatar or initials
Page title
Logout action
Task 16.3 — Implement Routes

File:

frontend/src/routes/AppRoutes.jsx

Public:

/
 /about
 /login
 /register

Protected:

/dashboard
/farms
/farms/add
/farms/:farmId
/farms/:farmId/edit
/weather
/recommendation
/history
/profile

Fallback:

*
21. Phase 17 — Common Frontend Components

Implement:

Alert.jsx
Button.jsx
Footer.jsx
Loader.jsx
Modal.jsx
Navbar.jsx
Sidebar.jsx

Recommended additional components:

Input.jsx
Select.jsx
PasswordInput.jsx
EmptyState.jsx
ErrorState.jsx
ConfirmDialog.jsx
PageHeader.jsx
Skeleton.jsx
Pagination.jsx

Every component must:

Accept props
Be reusable
Support responsive design
Support accessibility
Follow the blue design system
Include loading or disabled states where relevant
22. Phase 18 — Frontend Pages
Public Pages

Implement:

Home.jsx
About.jsx
Login.jsx
Register.jsx
NotFound.jsx
Protected Pages

Implement:

Dashboard.jsx
AddFarm.jsx
MyFarms.jsx
FarmDetails.jsx
EditFarm.jsx
Weather.jsx
Recommendation.jsx
History.jsx
Profile.jsx

Optional:

Features.jsx
Contact.jsx
23. Phase 19 — Farm Frontend

Implement:

FarmCard.jsx
FarmForm.jsx
FarmList.jsx
useFarms.js

Requirements:

Add farm
View farms
View farm details
Edit farm
Delete farm
Search farms
Filter by crop
Show loading state
Show empty state
Show error state
Confirm deletion
Prevent duplicate requests
24. Phase 20 — Map Frontend

Implement:

IndiaMap.jsx
LocationPicker.jsx
MarkerPopup.jsx

Requirements:

Centre map on India
Use OpenStreetMap
Capture map click
Place marker
Move marker
Display coordinates
Reset location
Show existing farm location
Work on mobile
Import Leaflet CSS
Fix marker icons if necessary
25. Phase 21 — Weather Frontend

Implement:

WeatherCard.jsx
WeatherDetails.jsx
ForecastCard.jsx
WeatherChart.jsx
useWeather.js

Requirements:

Select farm
Fetch weather
Display temperature
Display humidity
Display wind speed
Display pressure
Display rain probability
Display weather condition
Display last updated time
Add refresh
Add loading state
Add retry
Clear previous farm data
Never display fabricated weather

Forecast and charts are optional until MVP is complete.

26. Phase 22 — Recommendation Frontend

Implement:

RecommendationCard.jsx
StatusBadge.jsx

Requirements:

Select farm
Generate recommendation
Display status
Display title
Display reason
Display action
Display weather snapshot
Display generated time
Display disclaimer
Handle loading
Handle error
Prevent duplicate request
Never calculate the official result in React
27. Phase 23 — Profile Frontend

Implement:

Profile.jsx

Requirements:

Display user information
Display farm count
Update name
Update mobile
Change password
Add loading state
Add success and error feedback
Never display password hash
28. Phase 24 — Utilities

Implement frontend:

constants.js
formatters.js
helpers.js
validators.js

Required formatter behaviour:

Missing or invalid value → Not available

Never display:

undefined
null
NaN
[object Object]
29. Phase 25 — UI Requirements

AI Codex must follow UI_GUIDELINES.md.

Required design:

Primary blue: #2563EB
Dark blue: #1D4ED8
Sky blue: #0EA5E9
Sidebar navy: #0F172A
Background: #F8FAFC
Cards: #FFFFFF

Requirements:

Responsive
Mobile-first
Accessible
Consistent spacing
Consistent typography
White rounded cards
Dark navy sidebar
Loading states
Empty states
Error states
Toast notifications
Confirmation dialogs
Visible focus styles
Touch-friendly buttons
30. Phase 26 — Testing
Backend Tests

Use:

Jest
Supertest
MongoDB Memory Server or separate test database
Axios mocks

Test:

Registration
Duplicate email
Login
Invalid credentials
JWT
Expired token
Profile
Password change
Farm CRUD
Farm ownership
Invalid ObjectId
Weather success
Weather failure
Weather timeout
Recommendation rules
Recommendation history
Sensitive-field protection
Frontend Tests

Use:

Vitest
React Testing Library
Jest DOM

Test:

Login
Register
ProtectedRoute
FarmForm
LocationPicker
WeatherCard
RecommendationCard
Loading states
Error states
Empty states
Mobile navigation
Rule Boundary Tests

Test:

Rain probability 61
Rain probability 60
Humidity 81
Humidity 80
Temperature 36
Temperature 35
Multiple rules true
No rules true

External weather API calls must be mocked.

31. Phase 27 — Final Security Review

AI Codex must verify:

Passwords are hashed
Hashes are never returned
JWT secret is private
Tokens expire
Role escalation is blocked
Farm ownership is enforced
API key remains in backend
.env is ignored
CORS is restricted
Error stack is hidden in production
Invalid ObjectIds are handled
Input is validated
Duplicate submissions are prevented
Sensitive data is not logged
Production uses HTTPS
32. Phase 28 — Final Verification

AI Codex must run and verify:

Backend
cd backend
npm install
npm run dev
Frontend
cd frontend
npm install
npm run dev
Verify in Browser
Home page loads
Register works
Login works
Dashboard opens
Farm can be added
Map works
Weather loads
Recommendation works
History appears
Profile works
Logout works
Verify in MongoDB Compass
users document created
farms document created
weatherhistories document created
recommendations document created
indexes exist
ObjectId relationships are correct
33. Definition of Done

A task is complete only when:

Code is implemented
Code runs
No import error exists
Validation works
Loading state exists
Error state exists
Security rules are followed
API response matches documentation
Database data is correct
Relevant tests pass
Documentation is updated
34. AI Codex Must Not Do

AI Codex must not:

Change Node.js backend to FastAPI
Add Machine Learning
Add IoT
Add automatic pump control
Add Google Maps
Expose OpenWeather key
Store plain passwords
Trust frontend user IDs
Put all backend code in app.js
Put all frontend code in App.jsx
Duplicate recommendation rules
Generate fake weather
Generate recommendations when weather fails
Skip ownership checks
Skip validation
Skip loading and error states
Use Bootstrap
Hardcode live API responses
Delete existing working files without reason
Rename files without updating imports
Mark incomplete work as complete
35. Final Execution Order

AI Codex should execute tasks in this order:

1. Audit existing project
2. Fix stack and documentation conflicts
3. Configure backend
4. Connect MongoDB
5. Implement models
6. Implement middleware
7. Implement authentication
8. Implement user profile
9. Implement farm CRUD
10. Implement weather service
11. Implement recommendation engine
12. Configure Express app
13. Configure frontend
14. Implement authentication frontend
15. Implement layouts and routes
16. Implement common components
17. Implement farm UI
18. Implement map UI
19. Implement weather UI
20. Implement recommendation UI
21. Implement history
22. Implement profile
23. Add responsive and accessible styling
24. Write tests
25. Run complete project
26. Verify MongoDB Compass
27. Fix defects
28. Update documentation
29. Prepare final submission
36. Final Instruction to AI Codex

Build the project incrementally.

After every phase:

Run the code
Check for errors
Test the feature
Verify the database
Update the task status
Continue only after the current phase works

Do not generate the complete project in one massive response or one large file.

Create and update each file in its correct folder.

Preserve existing working code.

Use the documentation as the source of truth.

The final project must be:

Functional
Secure
Responsive
Modular
Testable
Consistent
Easy to demonstrate
Suitable for college submission
TASKS.md
AI Codex Task Plan
1. Document Purpose

This document defines the exact development tasks that AI Codex must complete for the Weather-Based Smart Irrigation Advisory System.

The project uses:

Frontend:
React + Vite + Tailwind CSS

Backend:
Node.js + Express.js

Database:
MongoDB + Compass

Database Tool:
MongoDB Compass

Map:
OpenStreetMap + React Leaflet

Weather:
OpenWeather API through backend

Authentication:
JWT + bcrypt

Recommendation:
Rule-based irrigation logic

AI Codex must follow the existing project documentation and must not replace the selected technologies without explicit approval.

2. Main Codex Objective

Build a complete, responsive, modular, secure, and testable full-stack prototype that allows a farmer to:

Register
   ↓
Login
   ↓
Open Dashboard
   ↓
Add Farm
   ↓
Select Farm Location
   ↓
Save Farm
   ↓
Fetch Weather
   ↓
Generate Recommendation
   ↓
View History
   ↓
Manage Profile
   ↓
Logout
3. Documentation Priority

When documents conflict, AI Codex must follow this order:

1. REQUIREMENTS.md
2. DECISIONS.md
3. ARCHITECTURE.md
4. API.md
5. DATABASE.md
6. BACKEND.md
7. FRONTEND.md
8. UI_GUIDELINES.md
9. FEATURES.md
10. TESTING_PLAN.md
11. TASKS.md
12. TODO.md

The actual implemented stack is Node.js and Express.js.

Do not use FastAPI or Python unless the backend is intentionally migrated.

4. General Rules for AI Codex

AI Codex must:

Preserve the current folder structure
Use ES modules consistently
Use functional React components
Use React hooks
Use Tailwind CSS
Use React Router
Use Axios for frontend API calls
Use Compass for MongoDB
Use Express middleware
Use JWT authentication
Hash passwords with bcrypt
Use OpenWeather only through the backend
Use OpenStreetMap with React Leaflet
Use MongoDB Compass for database inspection
Keep routes thin
Keep controllers focused
Keep business logic inside services
Keep recommendation rules in one file
Keep API calls in frontend services
Use reusable components
Add loading, empty, success, and error states
Validate data in both frontend and backend
Verify farm ownership in the backend
Keep secrets inside .env
Never expose API keys
Never return password hashes
Never trust client-provided user IDs
Never fabricate weather data
Never generate a recommendation without valid weather
Avoid monolithic files
Avoid duplicate logic
Avoid Bootstrap
Avoid inline CSS unless required by a third-party library
Keep all documentation synchronized with the implementation
5. Phase 1 — Project Audit
Task 1.1 — Inspect Existing Project

AI Codex must:

Review frontend folder structure
Review backend folder structure
Review package files
Review environment files
Review all documentation
Identify missing files
Identify duplicate logic
Identify broken imports
Identify unused files
Identify inconsistent naming
Identify FastAPI references that conflict with Express
Identify incomplete pages
Identify incomplete backend routes
Identify missing dependencies
Identify missing tests
Expected Output

Create a short implementation report containing:

Existing files
Missing files
Broken files
Conflicting documentation
Required dependencies
Recommended implementation order

Do not modify code during the first audit unless needed to fix a critical startup error.

6. Phase 2 — Backend Setup
Task 2.1 — Configure package.json

Ensure backend scripts exist:

{
  "scripts": {
    "dev": "nodemon server.js",
    "start": "node server.js",
    "test": "jest",
    "test:watch": "jest --watch",
    "lint": "eslint ."
  }
}

Ensure:

{
  "type": "module"
}

Install required dependencies:

express
Compass
jsonwebtoken
bcryptjs
axios
dotenv
cors
helmet
morgan
express-validator

Install development dependencies:

nodemon
jest
supertest
eslint
Task 2.2 — Configure Environment Files

Create or update:

backend/.env
backend/.env.example

Required values:

NODE_ENV=development
PORT=8000
MONGODB_URI=mongodb://127.0.0.1:27017/smart_irrigation
JWT_SECRET=
JWT_EXPIRES_IN=1h
OPENWEATHER_API_KEY=
OPENWEATHER_BASE_URL=https://api.openweathermap.org
FRONTEND_URL=http://localhost:5173

Rules:

Do not commit .env
Commit .env.example
Never add real secrets to documentation
Validate required environment variables on startup
Task 2.3 — Configure Database Connection

Implement:

backend/config/db.js

Requirements:

Connect once using Compass
Read MONGODB_URI
Log successful connection
Handle connection failure
Do not expose credentials
Exit process on initial connection failure
Task 2.4 — Configure JWT

Implement:

backend/config/jwt.js

Functions:

generateToken(payload)
verifyToken(token)

Requirements:

Read secret from .env
Use token expiration
Keep payload minimal
Return predictable token errors
7. Phase 3 — Backend Models
Task 3.1 — Implement User Model

File:

backend/models/User.js

Fields:

name
email
mobile
passwordHash
role
status
createdAt
updatedAt

Requirements:

Unique lowercase email
Farmer default role
Active default status
Password hash excluded from normal queries
Timestamps enabled
Password comparison method
Validation for name, email, and mobile
Task 3.2 — Implement Farm Model

File:

backend/models/Farm.js

Fields:

owner
farmName
cropName
area
areaUnit
state
district
village
latitude
longitude
createdAt
updatedAt

Requirements:

Owner ObjectId reference
Area greater than zero
Valid coordinate ranges
Allowed area units
Required ownership indexes
Timestamps enabled
Task 3.3 — Implement Weather History Model

File:

backend/models/WeatherHistory.js

Fields:

user
farm
temperature
feelsLike
humidity
windSpeed
pressure
rainProbability
weatherCondition
weatherDescription
weatherIcon
observedAt
recordedAt
createdAt
updatedAt

Requirements:

User and farm references
Valid numeric ranges
Compound history index
Timestamps enabled
Task 3.4 — Implement Recommendation Model

File:

backend/models/Recommendation.js

Fields:

user
farm
status
title
reason
recommendedAction
suggestedDuration
weatherSnapshot
disclaimer
generatedAt
createdAt
updatedAt

Allowed statuses:

no_irrigation
delay_irrigation
irrigate_today
monitor_weather

Requirements:

Store weather snapshot
Add history indexes
Validate status values
Enable timestamps
8. Phase 4 — Backend Utilities and Middleware
Task 4.1 — Implement API Response Helpers

File:

backend/utils/apiResponse.js

Functions:

sendSuccess(res, statusCode, message, data)
sendError(res, statusCode, message, code, errors)

Use consistent response structure.

Task 4.2 — Implement Constants

File:

backend/utils/constants.js

Include:

User roles
User statuses
Recommendation statuses
Area units
Pagination defaults
Error codes
Weather timeout
Advisory disclaimer

Do not store secrets.

Task 4.3 — Implement Logger

File:

backend/utils/logger.js

Support:

logger.info()
logger.warn()
logger.error()
logger.debug()

Do not log:

Passwords
Password hashes
JWT tokens
Authorization headers
API keys
Database credentials
Task 4.4 — Implement Authentication Middleware

File:

backend/middleware/auth.middleware.js

Functions:

protect
authorizeRoles(...roles)

Requirements:

Read Bearer token
Verify JWT
Load current user
Reject invalid or expired token
Reject inactive or suspended user
Attach safe user data to req.user
Task 4.5 — Implement Validation Middleware

File:

backend/middleware/validation.middleware.js

Use one library consistently.

Recommended:

express-validator

Create validation for:

Registration
Login
Profile update
Password change
Farm creation
Farm update
Pagination
MongoDB ObjectId
Task 4.6 — Implement Error Middleware

File:

backend/middleware/error.middleware.js

Functions:

notFoundHandler
errorHandler

Handle:

Compass validation errors
Duplicate key errors
Invalid ObjectIds
JWT errors
Expired tokens
Axios errors
Weather timeouts
Unexpected errors

Hide stack traces in production.

9. Phase 5 — Authentication Backend
Task 5.1 — Implement Authentication Service

File:

backend/services/auth.service.js

Functions:

registerUser(userData)
authenticateUser(email, password)
buildAuthResponse(user)
hashPassword(password)

Requirements:

Normalize email
Reject duplicates
Hash password
Force farmer role
Generate JWT
Return safe user object
Task 5.2 — Implement Authentication Controller

File:

backend/controllers/auth.controller.js

Functions:

registerUser
loginUser
getCurrentUser
logoutUser

Use standard API responses.

Task 5.3 — Implement Authentication Routes

File:

backend/routes/auth.routes.js

Endpoints:

POST /api/v1/auth/register
POST /api/v1/auth/login
GET  /api/v1/auth/me
POST /api/v1/auth/logout

Apply validation and authentication middleware correctly.

10. Phase 6 — User Profile Backend
Task 6.1 — Implement User Controller

File:

backend/controllers/user.controller.js

Functions:

getProfile
updateProfile
changePassword

Requirements:

Return farm count
Allow only approved fields
Verify current password
Hash new password
Never return password hash
Task 6.2 — Implement User Routes

File:

backend/routes/user.routes.js

Endpoints:

GET /api/v1/users/profile
PUT /api/v1/users/profile
PUT /api/v1/users/change-password

All routes require authentication.

11. Phase 7 — Farm Backend
Task 7.1 — Implement Farm Controller

File:

backend/controllers/farm.controller.js

Functions:

createFarm
getFarms
getFarmById
updateFarm
deleteFarm

Requirements:

Assign owner from req.user.id
Ignore client-provided owner
Verify ownership
Add search
Add crop filter
Add pagination
Add sorting
Validate ObjectIds
Return safe farm objects
Task 7.2 — Implement Farm Routes

File:

backend/routes/farm.routes.js

Endpoints:

POST   /api/v1/farms
GET    /api/v1/farms
GET    /api/v1/farms/:farmId
PUT    /api/v1/farms/:farmId
DELETE /api/v1/farms/:farmId

All routes require authentication.

Task 7.3 — Implement Farm Deletion Policy

When a farm is deleted:

Delete farm
Delete weather history
Delete recommendations

Use a transaction when available.

12. Phase 8 — Location Service
Task 8.1 — Implement Location Service

File:

backend/services/location.service.js

Functions:

validateCoordinates(latitude, longitude)
normalizeCoordinates(latitude, longitude)

Optional:

reverseGeocode(latitude, longitude)
isLocationInIndia(latitude, longitude)

Do not make reverse geocoding mandatory for the MVP.

13. Phase 9 — Weather Backend
Task 9.1 — Implement Weather Service

File:

backend/services/weather.service.js

Functions:

fetchCurrentWeather(latitude, longitude)
fetchForecast(latitude, longitude, days)
normalizeCurrentWeather(apiResponse)
normalizeForecast(apiResponse)
saveWeatherHistory(data)

Requirements:

Use Axios
Use metric units
Use timeout
Read API key from .env
Normalize response
Handle provider errors
Never expose API key
Never fabricate weather data
Task 9.2 — Implement Weather Controller

File:

backend/controllers/weather.controller.js

Functions:

getCurrentWeather
getForecast
getWeatherHistory

Requirements:

Verify farm ownership
Use stored farm coordinates
Save normalized weather history
Return safe errors
Task 9.3 — Implement Weather Routes

File:

backend/routes/weather.routes.js

Endpoints:

GET /api/v1/weather/:farmId
GET /api/v1/weather/:farmId/forecast
GET /api/v1/weather/:farmId/history

Forecast may remain optional for MVP.

14. Phase 10 — Recommendation Backend
Task 10.1 — Implement Irrigation Rules

File:

backend/utils/irrigationRules.js

Required rule priority:

1. Rain probability
2. Humidity
3. Temperature
4. Default

Required logic:

if (rainProbability > 60) {
  return {
    status: "no_irrigation",
    title: "No Irrigation Required",
  };
}

if (humidity > 80) {
  return {
    status: "delay_irrigation",
    title: "Delay Irrigation",
  };
}

if (temperature > 35) {
  return {
    status: "irrigate_today",
    title: "Irrigate Today",
  };
}

return {
  status: "monitor_weather",
  title: "Monitor Weather",
};

The function must also return:

reason
recommendedAction
Task 10.2 — Implement Recommendation Service

File:

backend/services/recommendation.service.js

Functions:

generateRecommendationForFarm(farm, weather)
saveRecommendation(data)
getLatestRecommendation(farmId, userId)
getRecommendationHistory(farmId, userId, options)

Requirements:

Use normalized weather
Call irrigation rules
Add disclaimer
Store weather snapshot
Save recommendation
Task 10.3 — Implement Recommendation Controller

File:

backend/controllers/recommendation.controller.js

Functions:

generateRecommendation
getLatestRecommendation
getRecommendationHistory

Do not generate a recommendation if weather retrieval fails.

Task 10.4 — Implement Recommendation Routes

File:

backend/routes/recommendation.routes.js

Endpoints:

POST /api/v1/recommendations/:farmId
GET  /api/v1/recommendations/:farmId
GET  /api/v1/recommendations/:farmId/history
15. Phase 11 — Express Application Setup
Task 11.1 — Implement app.js

Configure:

Express
CORS
Helmet
JSON parsing
URL-encoded parsing
Request logging
Health endpoint
API routes
404 middleware
Error middleware

Register:

/api/v1/auth
/api/v1/users
/api/v1/farms
/api/v1/weather
/api/v1/recommendations

Do not start the server in app.js.

Task 11.2 — Implement server.js

Responsibilities:

Load environment variables
Connect MongoDB
Start Express server
Handle startup errors
Handle graceful shutdown
Handle unhandled rejection
Handle uncaught exception
16. Phase 12 — MongoDB Compass Tasks

AI Codex must ensure the database appears correctly in MongoDB Compass.

Database:

smart_irrigation

Collections:

users
farms
weatherhistories
recommendations

Required indexes:

Users
{ email: 1 }

Unique:

Yes
Farms
{ owner: 1, createdAt: -1 }
{ owner: 1, farmName: 1 }
Weather History
{ farm: 1, recordedAt: -1 }
Recommendations
{ farm: 1, generatedAt: -1 }

AI Codex should not create database records manually when the backend API can create them.

17. Phase 13 — Frontend Setup
Task 13.1 — Configure Frontend Dependencies

Ensure these packages are installed:

react-router-dom
axios
react-hook-form
react-leaflet
leaflet
lucide-react
react-hot-toast
recharts

Create:

frontend/.env
frontend/.env.example

Value:

VITE_API_BASE_URL=http://localhost:8000/api/v1
Task 13.2 — Configure main.jsx

Requirements:

Import React
Import React DOM
Import BrowserRouter
Import AuthProvider
Import global CSS
Import Leaflet CSS
Render App
Task 13.3 — Configure App.jsx

App.jsx should render:

<AppRoutes />

Do not place the whole application in App.jsx.

18. Phase 14 — Frontend Services
Task 14.1 — Implement Axios Client

File:

frontend/src/services/api.js

Requirements:

Use VITE_API_BASE_URL
Add JSON headers
Add timeout
Add Bearer token
Handle 401 response
Avoid redirect loops
Task 14.2 — Implement Auth Service

File:

frontend/src/services/authService.js

Functions:

register(userData)
login(credentials)
getCurrentUser()
logout()
getProfile()
updateProfile(profileData)
changePassword(passwordData)
Task 14.3 — Implement Farm Service

File:

frontend/src/services/farmService.js

Functions:

createFarm(farmData)
getFarms(params)
getFarmById(farmId)
updateFarm(farmId, farmData)
deleteFarm(farmId)

Do not send userId.

Task 14.4 — Implement Weather Service

File:

frontend/src/services/weatherService.js

Functions:

getCurrentWeather(farmId)
getForecast(farmId, days)
getWeatherHistory(farmId, params)

Do not call OpenWeather directly.

Task 14.5 — Implement Recommendation Service

File:

frontend/src/services/recommendationService.js

Functions:

generateRecommendation(farmId)
getLatestRecommendation(farmId)
getRecommendationHistory(farmId, params)
19. Phase 15 — Frontend Authentication
Task 15.1 — Implement AuthContext.jsx

State:

user
token
isAuthenticated
loading
error

Functions:

login
register
logout
refreshUser
updateUser

Requirements:

Restore session after refresh
Verify token through backend
Clear expired session
Expose safe authentication state
Task 15.2 — Implement useAuth.js

Return the authentication context.

Throw an error when used outside AuthProvider.

Task 15.3 — Implement ProtectedRoute.jsx

Behaviour:

Loading → show loader
Authenticated → render Outlet
Unauthenticated → redirect to Login
20. Phase 16 — Frontend Layouts and Navigation
Task 16.1 — Implement Public Layout

File:

frontend/src/layouts/MainLayout.jsx

Structure:

Navbar
Outlet
Footer
Task 16.2 — Implement Dashboard Layout

File:

frontend/src/layouts/DashboardLayout.jsx

Structure:

Sidebar
Header
Outlet

Requirements:

Fixed sidebar on desktop
Drawer sidebar on mobile
User avatar or initials
Page title
Logout action
Task 16.3 — Implement Routes

File:

frontend/src/routes/AppRoutes.jsx

Public:

/
 /about
 /login
 /register

Protected:

/dashboard
/farms
/farms/add
/farms/:farmId
/farms/:farmId/edit
/weather
/recommendation
/history
/profile

Fallback:

*
21. Phase 17 — Common Frontend Components

Implement:

Alert.jsx
Button.jsx
Footer.jsx
Loader.jsx
Modal.jsx
Navbar.jsx
Sidebar.jsx

Recommended additional components:

Input.jsx
Select.jsx
PasswordInput.jsx
EmptyState.jsx
ErrorState.jsx
ConfirmDialog.jsx
PageHeader.jsx
Skeleton.jsx
Pagination.jsx

Every component must:

Accept props
Be reusable
Support responsive design
Support accessibility
Follow the blue design system
Include loading or disabled states where relevant
22. Phase 18 — Frontend Pages
Public Pages

Implement:

Home.jsx
About.jsx
Login.jsx
Register.jsx
NotFound.jsx
Protected Pages

Implement:

Dashboard.jsx
AddFarm.jsx
MyFarms.jsx
FarmDetails.jsx
EditFarm.jsx
Weather.jsx
Recommendation.jsx
History.jsx
Profile.jsx

Optional:

Features.jsx
Contact.jsx
23. Phase 19 — Farm Frontend

Implement:

FarmCard.jsx
FarmForm.jsx
FarmList.jsx
useFarms.js

Requirements:

Add farm
View farms
View farm details
Edit farm
Delete farm
Search farms
Filter by crop
Show loading state
Show empty state
Show error state
Confirm deletion
Prevent duplicate requests
24. Phase 20 — Map Frontend

Implement:

IndiaMap.jsx
LocationPicker.jsx
MarkerPopup.jsx

Requirements:

Centre map on India
Use OpenStreetMap
Capture map click
Place marker
Move marker
Display coordinates
Reset location
Show existing farm location
Work on mobile
Import Leaflet CSS
Fix marker icons if necessary
25. Phase 21 — Weather Frontend

Implement:

WeatherCard.jsx
WeatherDetails.jsx
ForecastCard.jsx
WeatherChart.jsx
useWeather.js

Requirements:

Select farm
Fetch weather
Display temperature
Display humidity
Display wind speed
Display pressure
Display rain probability
Display weather condition
Display last updated time
Add refresh
Add loading state
Add retry
Clear previous farm data
Never display fabricated weather

Forecast and charts are optional until MVP is complete.

26. Phase 22 — Recommendation Frontend

Implement:

RecommendationCard.jsx
StatusBadge.jsx

Requirements:

Select farm
Generate recommendation
Display status
Display title
Display reason
Display action
Display weather snapshot
Display generated time
Display disclaimer
Handle loading
Handle error
Prevent duplicate request
Never calculate the official result in React
27. Phase 23 — Profile Frontend

Implement:

Profile.jsx

Requirements:

Display user information
Display farm count
Update name
Update mobile
Change password
Add loading state
Add success and error feedback
Never display password hash
28. Phase 24 — Utilities

Implement frontend:

constants.js
formatters.js
helpers.js
validators.js

Required formatter behaviour:

Missing or invalid value → Not available

Never display:

undefined
null
NaN
[object Object]
29. Phase 25 — UI Requirements

AI Codex must follow UI_GUIDELINES.md.

Required design:

Primary blue: #2563EB
Dark blue: #1D4ED8
Sky blue: #0EA5E9
Sidebar navy: #0F172A
Background: #F8FAFC
Cards: #FFFFFF

Requirements:

Responsive
Mobile-first
Accessible
Consistent spacing
Consistent typography
White rounded cards
Dark navy sidebar
Loading states
Empty states
Error states
Toast notifications
Confirmation dialogs
Visible focus styles
Touch-friendly buttons
30. Phase 26 — Testing
Backend Tests

Use:

Jest
Supertest
MongoDB Memory Server or separate test database
Axios mocks

Test:

Registration
Duplicate email
Login
Invalid credentials
JWT
Expired token
Profile
Password change
Farm CRUD
Farm ownership
Invalid ObjectId
Weather success
Weather failure
Weather timeout
Recommendation rules
Recommendation history
Sensitive-field protection
Frontend Tests

Use:

Vitest
React Testing Library
Jest DOM

Test:

Login
Register
ProtectedRoute
FarmForm
LocationPicker
WeatherCard
RecommendationCard
Loading states
Error states
Empty states
Mobile navigation
Rule Boundary Tests

Test:

Rain probability 61
Rain probability 60
Humidity 81
Humidity 80
Temperature 36
Temperature 35
Multiple rules true
No rules true

External weather API calls must be mocked.

31. Phase 27 — Final Security Review

AI Codex must verify:

Passwords are hashed
Hashes are never returned
JWT secret is private
Tokens expire
Role escalation is blocked
Farm ownership is enforced
API key remains in backend
.env is ignored
CORS is restricted
Error stack is hidden in production
Invalid ObjectIds are handled
Input is validated
Duplicate submissions are prevented
Sensitive data is not logged
Production uses HTTPS
32. Phase 28 — Final Verification

AI Codex must run and verify:

Backend
cd backend
npm install
npm run dev
Frontend
cd frontend
npm install
npm run dev
Verify in Browser
Home page loads
Register works
Login works
Dashboard opens
Farm can be added
Map works
Weather loads
Recommendation works
History appears
Profile works
Logout works
Verify in MongoDB Compass
users document created
farms document created
weatherhistories document created
recommendations document created
indexes exist
ObjectId relationships are correct
33. Definition of Done

A task is complete only when:

Code is implemented
Code runs
No import error exists
Validation works
Loading state exists
Error state exists
Security rules are followed
API response matches documentation
Database data is correct
Relevant tests pass
Documentation is updated
34. AI Codex Must Not Do

AI Codex must not:

Change Node.js backend to FastAPI
Add Machine Learning
Add IoT
Add automatic pump control
Add Google Maps
Expose OpenWeather key
Store plain passwords
Trust frontend user IDs
Put all backend code in app.js
Put all frontend code in App.jsx
Duplicate recommendation rules
Generate fake weather
Generate recommendations when weather fails
Skip ownership checks
Skip validation
Skip loading and error states
Use Bootstrap
Hardcode live API responses
Delete existing working files without reason
Rename files without updating imports
Mark incomplete work as complete
35. Final Execution Order

AI Codex should execute tasks in this order:

1. Audit existing project
2. Fix stack and documentation conflicts
3. Configure backend
4. Connect MongoDB
5. Implement models
6. Implement middleware
7. Implement authentication
8. Implement user profile
9. Implement farm CRUD
10. Implement weather service
11. Implement recommendation engine
12. Configure Express app
13. Configure frontend
14. Implement authentication frontend
15. Implement layouts and routes
16. Implement common components
17. Implement farm UI
18. Implement map UI
19. Implement weather UI
20. Implement recommendation UI
21. Implement history
22. Implement profile
23. Add responsive and accessible styling
24. Write tests
25. Run complete project
26. Verify MongoDB Compass
27. Fix defects
28. Update documentation
29. Prepare final submission
36. Final Instruction to AI Codex

Build the project incrementally.

After every phase:

Run the code
Check for errors
Test the feature
Verify the database
Update the task status
Continue only after the current phase works

Do not generate the complete project in one massive response or one large file.

Create and update each file in its correct folder.

Preserve existing working code.

Use the documentation as the source of truth.

The final project must be:

Functional
Secure
Responsive
Modular
Testable
Consistent
Easy to demonstrate
Suitable for college submission
## Verified Dashboard Analytics Implementation — 2026-07-23

- [x] Added farm selector and a fixed 7-day analytical view.
- [x] Added total farm area, temperature, humidity, rain probability, and wind-speed summaries.
- [x] Added current weather, latest recommendation, farm information, and OpenStreetMap panels.
- [x] Added responsive temperature/humidity, rain, and wind charts using Recharts.
- [x] Added recent weather and recommendation tables, complete quick actions, and saved-data weather alerts.
- [x] Added independent loading, empty, error, and retry states for weather and recommendation modules.
- [x] Verified with `npm run lint`, `npm run build`, and backend `npm test`.

## KisanSetu Branding and Responsive Layout — 2026-07-24

- [x] Updated user-visible legacy branding to KisanSetu.
- [x] Added KisanSetu browser title and metadata.
- [x] Fixed the mobile dashboard workspace and sidebar cascade.
- [x] Made cards, forms, grids, maps, charts, and tables adapt to narrow viewports.

## Profile Page Redesign — 2026-07-25

- [x] Rebuilt the authenticated profile page to match the approved agricultural dashboard mockup in the documented blue design system.
- [x] Connected profile details, password changes, farm summaries, and latest recommendation to existing APIs.
- [x] Added locally persisted notification and application preferences with responsive, accessible controls.
- [x] Added safe unavailable states for profile photos and account deletion where backend routes do not exist.
- [x] Verified the frontend with ESLint and a production build.

## Five-Year Development Seed — 2026-07-25

- [x] Bundle the supplied five-year synthetic analytics dataset.
- [x] Convert portable IDs and fields to the implemented Mongoose schemas.
- [x] Add password hashing, relationship checks, safe reruns, and batched inserts.
- [x] Add a database-free seed validation command and import instructions.

## Dataset-Driven Dashboard Simulation — 2026-07-29

- [x] Serve the bundled seed to the frontend without external weather requests.
- [x] Add farm selection and play/pause simulation controls.
- [x] Advance the simulation by one day every four seconds during playback.
- [x] Update eight current-weather summary cards from the selected record.
- [x] Build memoized seven-record weather and recommendation analytics.
- [x] Match current advice by `weatherSnapshot.weatherHistoryId`.
- [x] Add complete farm information and an explicit simulated-data disclaimer.
- [x] Verify frontend lint/build, backend tests, and seed validation.
## Earth Palette Refresh — 2026-08-06

- [x] Apply an earth-brown, field-green, and water-blue theme across shared UI surfaces.
- [x] Update analytics chart colors to match the refreshed design system.
- [x] Synchronize the documented color direction with the implementation.
## Mobile Navigation Drawer Fix — 2026-08-06

- [x] Remove the legacy horizontal dashboard menu behavior at narrow widths.
- [x] Keep navigation links, profile, and logout in a stable vertical drawer.
- [x] Add background scroll locking and Escape-key dismissal.
## Production Irrigation Advisor — 2026-08-07

- [x] Replace the minimal recommendation page with a production-style irrigation advisor.
- [x] Use stored simulated weather and matching saved recommendation records.
- [x] Add deterministic confidence and threshold support indicators without changing official rules.
- [x] Add weather metrics, irrigation method, schedule, plan, instructions, tables, actions, and disclaimer.
- [x] Add responsive and print layouts and verify frontend lint and build.

## Sugarcane About Page Redesign — 2026-08-09

- [x] Replace the minimal About page with a responsive sugarcane education experience.
- [x] Explain the crop cycle, irrigation priorities, common watering methods, and good field practices.
- [x] Keep advice general, weather-aware, and clearly qualified by local agronomic guidance.
- [x] Verify the frontend with ESLint and a production build.

## Login Page Split Layout — 2026-08-12

- [x] Rebuild the login page with the approved responsive split-screen composition.
- [x] Preserve the current earth, field-green, and water-blue color system.
- [x] Verify authentication states, accessibility, responsive layout, lint, and production build.

## Production Registration Reliability - 2026-08-12

- [x] Add cached MongoDB connection reuse for serverless requests.
- [x] Return a sanitized `503` when the production database is unavailable.
- [x] Normalize the configured production frontend origin for CORS.
- [x] Make the health endpoint verify and report database readiness.
- [!] Configure MongoDB Atlas/Vercel production secrets and verify registration in the deployed environment.
- [x] Update the backend environment template and setup documentation for MongoDB Atlas connection strings.
- [x] Validate the production Atlas URI safely, reconnect after dropped warm-function connections, and test nested provider error classification.

## Login Database Integration Fix - 2026-08-31

- [x] Restore database initialization middleware for every `/api/v1` request.
- [x] Restore normalized frontend-origin handling and database-aware health responses.
- [x] Verify local MongoDB connectivity and the login invalid-credentials response.
- [x] Pass backend tests, frontend lint, and the frontend production build.

## Microservices Clone - 2026-10-06

- [x] Create the separate clone, four domain processes and compatible gateway.
- [x] Pass 16 tests, separate-process MongoDB integration, frontend lint/build and frontend startup.
- [x] Document shared database/source, commands, inherited limitations and unverified live/browser checks.

## Sitemap and Robots Practical - 2026-10-11

- [x] Create public sitemap from implemented `/` and `/about` content routes; exclude authentication and private routes.
- [x] Verify XML parsing, local HTTP 200 responses, production artifact copies, frontend build and lint.
- [!] Publish and verify both files: the supplied Vercel domain returns `404 DEPLOYMENT_NOT_FOUND`; current deployment URL is needed.
- [ ] Capture six requested screenshots and attach them to the practical journal.

## Reference-inspired Landing Page - 2026-10-12

- [-] Implement the photograph hero, overlay navigation, blue primary actions, feature cards and onboarding section. Source, local HTTP delivery, lint and production build verified; desktop/mobile visual review remains pending because no browser surface is connected.
- [x] Remove the landing page's hardcoded sample weather reading.
- [x] Bundle the agricultural hero photograph locally and document its source.
- [x] Run frontend lint/build and the existing backend suite (11 tests passed); both development servers started.
- [ ] Visually verify desktop/mobile layout, keyboard navigation and account/section links in a browser.

## About content on the landing page - 2026-10-12

- [-] Replace the landing feature/process/note sections and footer with the existing sugarcane About guide. Source, lint and production build pass; visual browser checks remain pending.
- [-] Make About links scroll to `/#about`, remove the standalone page and redirect legacy `/about` visits. Update the sitemap to list only `/`; browser interaction verification remains pending.

- [x] Remove the Home/About section navigation from the landing header as requested; frontend lint and build pass.

## About palette alignment - 2026-10-12

- [-] Match the landing page palette in About: blue buttons/icons, navy headings and panels, white cards, slate backgrounds/text and borders. Lint and production build pass; connected-browser visual review remains pending.

## App-wide palette alignment - 2026-10-12

- [-] Apply the landing palette to shared controls, dashboard/sidebar, profile, advisor, login/register and analytics accents. Blue primary actions, navy navigation, white surfaces and slate text replace earth-tone styling. Lint and build pass; browser visual checks remain pending.
- [x] Synchronize UI_GUIDELINES.md with the blue/navy/white/slate palette.

## App-wide palette rollback - 2026-10-12

- [-] Revert the app-wide palette change at the user's request. Restore the earlier earth-tone shared/auth/dashboard/profile/advisor/chart styling while retaining the landing and embedded About styling. Lint/build pass; visual browser review remains pending. This supersedes the app-wide palette alignment entry.

## Green-to-blue accents - 2026-10-12

- [-] Replace green/teal decorative UI accents and their tints with blue across buttons, links, navigation, profile, advisor, authentication and charts. Preserve existing brown surfaces and neutral colors. Frontend lint/build pass; browser visual checks remain pending.

## Brighter blue preference - 2026-10-12

- [-] Replace dark blue decorative accents, panel gradients and hover colors with primary blue (#2563EB), per user preference. Lint/build pass; browser visual verification remains pending.

## Landing glassmorphism - 2026-10-12

- [-] Add frosted glass to the landing navigation, secondary controls and About cards, with translucent surfaces, blue background glows, blur, borders and shadows. Include solid-surface fallbacks for browsers without backdrop-filter. Lint/build pass; browser visual review remains pending.

- [x] Remove the Irrigation strategy section and crop-stage moisture cards from the landing About guide as requested; lint and production build pass.

## Glass styling rollback - 2026-10-12

- [x] Remove the recently added landing/About glassmorphism block and restore preceding solid-surface styling. Lint/build pass. The earlier Irrigation strategy removal remains in place.

- [x] Change the landing About account-creation banner from navy to light blue (#DBEAFE), with readable dark text and the existing blue button. Frontend lint/build pass.

- [-] Add glassmorphism only to landing hero buttons and the header Sign up button: translucent backgrounds, blur, light borders and shadows with opaque fallbacks. Lint/build pass; browser visual review remains pending.

- [-] Refine landing buttons to the user's sculpted clear-glass reference: stronger blur, transparent surfaces, raised rim highlights and inset shadows. Lint/build pass; browser visual review remains pending.

- [-] Apply reference-inspired clear glass to About principle cards, irrigation-method cards, practice cards, crop illustration overlay and account banner. Add light blue background glows and opaque fallbacks. Lint/build pass; browser visual review remains pending.

- [x] Correct the About glass request: remove the About-content glass block and retain the existing clear-glass About KisanSetu hero button. Lint/build pass.

- [-] Strengthen the About KisanSetu button glass effect with 28px blur, greater transparency, brighter rims and deeper inset shadows. Lint/build pass; browser visual verification pending.

- [x] Revert the latest stronger About-button glass effect and restore the preceding clear-glass button styling. Lint/build pass.

- [x] Remove the remaining landing button glass styling and restore solid blue/white buttons. Lint/build pass.

- [-] Add a color-preserving glass finish to landing hero/header buttons: keep blue/white fills and label colors, with slight translucency, blur, rim highlights and shadows. Lint/build pass; browser visual review remains pending.

- [-] Match the supplied sculpted-glass reference with raised rims, deeper inset shadows and 24px blur on landing buttons, retaining blue and white tinted fills. Lint/build pass; browser visual comparison remains pending.

- [-] Refine landing button glass to thicker rounded rims, layered inset borders, 26px blur and more translucent blue/white tinted cores. Lint/build pass; browser visual comparison remains pending.

- [-] Increase landing button transparency to 48% tinted fills, sharpen glass highlights and reduce blur to reveal more background detail. Retain blue/white tints and add a primary-label shadow. Lint/build pass; browser visual review pending.

- [x] Remove the landing-button glass effect and restore original solid blue/white buttons at the user's request. Lint/build pass.

## Landing liquid-glass buttons - 2026-10-12

[-] Apply the reference-inspired silver glass finish to all five requested landing actions. CSS implemented; lint/build pass and Vite serves the landing page and updated CSS. Desktop/mobile visual and keyboard verification remains pending.


[-] Strengthen the five landing glass buttons with transparent cores and sharper reflective rims. Lint/build pass; browser visual verification remains pending.


[-] Remove borders and inset rim highlights from the five landing glass buttons. Lint/build pass; visual browser review remains pending.


[-] Remove the apparent glass rim and further reduce landing-button fill opacity. Lint/build pass; browser visual review remains pending.


[-] Apply borderless glassmorphism to the landing Explore down-arrow circle. Lint/build pass; browser visual review remains pending.


[-] Increase Explore arrow-circle transparency with lighter fill, blur, and shadow. Lint/build pass; browser visual review remains pending.


[-] Refine the Explore button with a clearer glass core and localized reflection. Lint/build pass; visual review remains pending.


[-] Apply frosted glass to the sugarcane illustration text overlay. Lint/build pass; browser visual review remains pending.


[-] Extend glassmorphism to the entire sugarcane illustration card. Lint/build pass; browser visual verification remains pending.


[x] Revert the latest whole-card glass styling, preserving the prior frosted text overlay. Lint/build pass.


[x] Revert the sugarcane text-overlay glass revision and restore its original styling. Lint/build pass.


[-] Apply color-preserving glass reflections to the sugarcane card and a subtly frosted white text panel. Original artwork/text colors retained; lint/build pass. Browser visual review remains pending.


[-] Upgrade the landing background to bundled 4K desktop, tablet, and portrait-mobile crops; add native picture selection and responsive hero layout. Image dimensions, lint/build, and local HTTP delivery pass. Browser visual checks remain pending.


[x] Remove the requested crop education, principles, farming timeline, irrigation-method cards, and field-practice checklist from AboutSection. Remove unused data/icons and the obsolete anchor link. Lint/build pass.


[-] Apply blue glass to the Start with KisanSetu button only. Lint/build pass; visual review remains pending.


[-] Refine Start with KisanSetu to a consistent primary-blue glass tint. Lint/build pass; visual review remains pending.


[-] Fix CSS specificity so the Start with KisanSetu blue-glass fill wins over the shared clear-glass rule, including hover and fallback. Lint/build pass; browser visual verification remains pending.


[-] Strengthen the Start with KisanSetu glass effect while preserving its blue fill and white text. Lint/build pass; visual review remains pending.


[-] Increase blue-glass button transparency while retaining its blue tint and white text. Lint/build pass; browser visual verification remains pending.


[-] Match Start with KisanSetu to the smooth reference pill in blue; remove inset highlights and use a uniform translucent fill. Lint/build pass; visual review remains pending.


[-] Style Start with KisanSetu using the latest light-blue sculpted-glass reference. Lint/build pass; browser visual review remains pending.


[x] Revert the latest light-blue sculpted-glass button change. Previous primary-blue glass styling restored; lint/build pass.


[x] Remove the landing About Farm with better context account banner and educational disclaimer at the user's request. Frontend lint/build pass.

[-] Refresh registration colors and layout with a farm-photo panel and white account card. Frontend lint/build and registration HTTP delivery pass; 11 backend tests pass. Browser visual and manual registration checks remain pending.


[x] Remove the About navigation link from registration only. Frontend lint and build pass.


[-] Match login to the refreshed registration design using shared registration styles; omit About on login. Frontend lint/build and login HTTP delivery pass. Browser visual and manual sign-in verification remain pending.


[-] Equalize photo and form panel dimensions on login/register desktop layouts. Lint/build pass; visual review pending.


[x] Remove the header Log in link from registration. Frontend lint/build pass.


[-] Hide the registration header and recolor its weather logo blue on white. Frontend lint/build pass; visual verification pending.


[-] Match login to registration's hidden header and blue/white logo. Frontend lint/build pass; visual review pending.


[-] Add the top-left KisanSetu home logo to login/register with reserved layout spacing. Frontend lint/build pass; visual review pending.


[-] Redesign login/register as a joined form-left/photo-right card with shared dimensions and responsive form-first stacking. Frontend lint/build pass; visual and manual auth checks pending. No dependencies or API changes.


[-] Change both authentication home logos to white on blue. Frontend lint/build pass; visual review pending.


[x] Revert the latest authentication logo color change. Previous blue wordmark restored; frontend lint/build pass.


[-] Refresh dashboard overview with navy sidebar, blue banner, white metric cards and responsive chart/details grids; explicitly label simulated weather. Lint/build and 11 backend tests pass; visual/manual authenticated verification pending. No dependencies added.


[x] Remove dashboard overview banner and relocate simulated-data disclosure to the farm-selector label. Frontend lint/build pass.


[-] Align farm, weather, recommendation, history and profile colors with the blue/slate dashboard. Shared workspace styling and form/profile/advisor overrides implemented; frontend lint/build pass. Visual/manual verification pending; no dependencies added.


[-] Change the workspace menu/sidebar to light-blue shades with readable dark labels and blue active items. Lint/build pass; visual review pending.


[-] Unify landing, authentication and sidebar brand symbols as outlined circular droplets. Lint/build pass; reference comparison pending.


[-] Error-check fixes: farm save/detail/delete error handling, coordinate validation, weather fallbacks/request guard, logout cleanup, /health alias and real forecast rain probability. Lint/build and 13 backend tests pass; both servers run and health confirms database connected. Manual browser workflow verification pending.


[x] Remove the dashboard sidebar promotional card at the user's request. Frontend lint and production build pass.

[-] Style sidebar account panel after the supplied Google-style reference: initials avatar, user name, Farmer account label, profile link and rounded logout button. Frontend lint/build pass; browser visual verification pending.

[x] Remove the sidebar account panel and its logout button at the user's request, superseding the preceding account-panel styling task. Unused handler/imports and panel styles removed; frontend lint/build pass.

[-] Add a Google-style account popup to the top-right header account control, with signed-in name/email, profile link, sign-out loading state and native dialog keyboard/focus handling. Frontend lint/build pass; browser interaction verification pending.

[-] Make the header notification bell functional and accessible with a labeled native dialog, Escape/outside-click dismissal, focus handling, a 44px target and preference link. Removed hardcoded unread count. Lint/build pass; browser keyboard verification pending.

[x] Remove the Profile page Account settings/My Profile heading and introductory description at the user's request. Frontend lint/build pass.

[-] Add persistent dark mode with accessible moon/sun controls in dashboard/public headers and authentication pages. Device preference supplies the initial theme; localStorage preserves explicit choices. Dark surfaces/forms/dialogs/charts implemented; lint/build pass. Browser contrast/mobile verification pending. No dependencies added.

[x] Remove the light/dark theme toggle from the landing-page header at the user's request. Other theme controls remain. Frontend lint/build pass.

[x] Hide the landing-page header at the user's request. Frontend lint/build pass.

[x] Keep the restored landing header transparent, including when dark mode was selected elsewhere. Removed header surface/border/shadow/blur; other content preserved. Frontend lint/build pass.

## Dark appearance consistency - 12 October 2026

- [-] Correct shared authentication field backgrounds, page gradient, card borders, links/focus and remaining workspace surfaces. CSS implemented; lint/build, all 13 backend tests, dev-server startup and authentication-route HTTP checks pass. Database health reports connected. Browser verification is pending; no browser surface is connected.
