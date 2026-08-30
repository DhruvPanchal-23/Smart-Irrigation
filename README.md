# KisanSetu

A full-stack college project that helps farmers register farms, select farm locations on a map, view weather information, and receive rule-based irrigation recommendations.

The system uses live weather data and predefined backend rules. It does not use Machine Learning, IoT sensors, or automatic pump control.

1. Project Overview

KisanSetu is a weather-based smart irrigation advisory system designed to help farmers make better irrigation decisions using farm location and weather conditions.

A farmer can:

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
Fetch Weather
   ↓
Generate Irrigation Recommendation
   ↓
View History
   ↓
Manage Profile
   ↓
Logout

The project is intended as an academic prototype and should not be treated as a replacement for professional agricultural advice.

2. Main Features

User registration

User login and logout

JWT-based authentication

Protected routes

Farmer profile management

Multiple farm support

Farm creation, viewing, editing, and deletion

OpenStreetMap location selection

Latitude and longitude storage

Live weather retrieval through backend

Weather history

Rule-based irrigation recommendations

Recommendation history

Responsive dashboard

Loading, empty, success, and error states

MongoDB Compass support for database inspection

3. Technology Stack

Frontend

React
Vite
Tailwind CSS
React Router DOM
Axios
React Hook Form
React Leaflet
Leaflet
Lucide React
React Hot Toast
Recharts

Backend

Node.js
Express.js
Mongoose
JSON Web Tokens
bcrypt
Axios
dotenv
CORS
Helmet
Morgan
express-validator

Database

MongoDB
MongoDB Compass

External Services

OpenWeather API
OpenStreetMap

Testing

Jest
Supertest
Vitest
React Testing Library

4. Project Scope

The current project includes:

Weather-based farm advisory

Rule-based irrigation recommendations

User authentication

Farm ownership protection

Weather and recommendation history

Responsive web interface

The current project does not include:

Machine Learning

Artificial Intelligence prediction models

IoT soil sensors

Automatic irrigation pump control

Satellite monitoring

Real soil-moisture measurement

Google Maps

These may be considered future scope.

5. Irrigation Recommendation Rules

The backend generates the recommendation.

Rules must run in this order:

if (rainProbability > 60) {
  return "No Irrigation Required";
}

if (humidity > 80) {
  return "Delay Irrigation";
}

if (temperature > 35) {
  return "Irrigate Today";
}

return "Monitor Weather";

Recommendation Results

Condition

Recommendation

Rain probability greater than 60%

No Irrigation Required

Humidity greater than 80%

Delay Irrigation

Temperature greater than 35°C

Irrigate Today

No higher-priority rule matched

Monitor Weather

The frontend must not calculate the official recommendation independently.

6. Project Folder Structure

weather-irrigation-system/
├── AGENTS.md
├── README.md
├── docs/
│   ├── README.md
│   ├── PRD.md
│   ├── REQUIREMENTS.md
│   ├── DECISIONS.md
│   ├── FEATURES.md
│   ├── USERS.md
│   ├── TESTING_PLAN.md
│   ├── ARCHITECTURE.md
│   ├── DATABASE.md
│   ├── API.md
│   ├── FRONTEND.md
│   ├── BACKEND.md
│   ├── UI_GUIDELINES.md
│   ├── TASKS.md
│   └── TODO.md
│
├── frontend/
│   ├── public/
│   ├── src/
│   ├── .env
│   ├── .env.example
│   ├── package.json
│   └── vite.config.js
│
└── backend/
    ├── config/
    ├── controllers/
    ├── middleware/
    ├── models/
    ├── routes/
    ├── services/
    ├── utils/
    ├── .env
    ├── .env.example
    ├── app.js
    ├── server.js
    └── package.json

7. Prerequisites

Install the following before running the project:

Node.js
npm
MongoDB Compass
Git

Recommended:

Node.js 20 or later
npm 10 or later
MongoDB 7 or later

Verify:

node --version
npm --version
mongod --version
git --version

8. Clone the Repository

git clone <repository-url>
cd weather-irrigation-system

Replace <repository-url> with the actual repository URL.

9. Backend Setup

Open a terminal:

cd backend
npm install

Create:

backend/.env

Example:

NODE_ENV=development
PORT=8000

MONGODB_URI=mongodb+srv://<username>:<url-encoded-password>@<cluster>.mongodb.net/smart_irrigation?retryWrites=true&w=majority

JWT_SECRET=replace_with_a_long_secure_random_value
JWT_EXPIRES_IN=1h

OPENWEATHER_API_KEY=replace_with_your_openweather_api_key
OPENWEATHER_BASE_URL=https://api.openweathermap.org

FRONTEND_URL=http://localhost:5173

Start the backend:

npm run dev

Expected backend URL:

http://localhost:8000

Expected API base URL:

http://localhost:8000/api/v1

Health check:

http://localhost:8000/health

10. Frontend Setup

Open another terminal:

cd frontend
npm install

Create:

frontend/.env

Add:

VITE_API_BASE_URL=http://localhost:8000/api/v1

Start the frontend:

npm run dev

Expected frontend URL:

http://localhost:5173

11. MongoDB Atlas and Compass Setup

Create an Atlas database user, allow your current IP address under Atlas Network Access, and copy the driver connection string into `backend/.env` as `MONGODB_URI`. Keep `smart_irrigation` as the database name and URL-encode special characters in the password.

You can use the same Atlas connection string in MongoDB Compass. Never commit it.

Connect and verify the database:

smart_irrigation

Expected collections:

users
farms
weatherhistories
recommendations

The collections may appear only after the backend creates the first records.

12. Start MongoDB on Windows

If MongoDB is installed as a Windows service:

net start MongoDB

To stop it:

net stop MongoDB

You can also start MongoDB through:

Windows Services
→ MongoDB Server
→ Start

13. Environment Variables

Backend

Variable

Required

Description

NODE_ENV

Yes

Application environment

PORT

Yes

Backend port

MONGODB_URI

Yes

MongoDB connection string

JWT_SECRET

Yes

JWT signing secret

JWT_EXPIRES_IN

Yes

Access-token expiration

OPENWEATHER_API_KEY

Yes for live weather

OpenWeather API key

OPENWEATHER_BASE_URL

Yes

OpenWeather base URL

FRONTEND_URL

Yes

Allowed frontend origin

Frontend

Variable

Required

Description

VITE_API_BASE_URL

Yes

Backend API base URL

Important:

Never commit .env

Commit .env.example

Never place backend secrets in frontend environment variables

Never expose the OpenWeather API key in React code

14. Main API Endpoints

Authentication

POST /api/v1/auth/register
POST /api/v1/auth/login
GET  /api/v1/auth/me
POST /api/v1/auth/logout

Users

GET /api/v1/users/profile
PUT /api/v1/users/profile
PUT /api/v1/users/change-password

Farms

POST   /api/v1/farms
GET    /api/v1/farms
GET    /api/v1/farms/:farmId
PUT    /api/v1/farms/:farmId
DELETE /api/v1/farms/:farmId

Weather

GET /api/v1/weather/:farmId
GET /api/v1/weather/:farmId/forecast
GET /api/v1/weather/:farmId/history

Recommendations

POST /api/v1/recommendations/:farmId
GET  /api/v1/recommendations/:farmId
GET  /api/v1/recommendations/:farmId/history

See:

docs/API.md

for complete request and response documentation.

15. Database Collections

Users

Stores:

name
email
mobile
passwordHash
role
status
timestamps

Farms

Stores:

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
timestamps

Weather History

Stores:

user
farm
temperature
humidity
windSpeed
pressure
rainProbability
weatherCondition
weatherDescription
recordedAt

Recommendations

Stores:

user
farm
status
title
reason
recommendedAction
weatherSnapshot
generatedAt
disclaimer

See:

docs/DATABASE.md

for complete database documentation.

16. Security Rules

The system must:

Hash passwords with bcrypt

Never store plain passwords

Never return password hashes

Use JWT expiration

Verify farm ownership

Block public role escalation

Keep API keys in the backend

Restrict CORS

Validate user input

Handle invalid ObjectIds

Hide production stack traces

Avoid logging tokens and secrets

Use HTTPS in production

17. Frontend Design

The application follows a blue design system.

Primary: #2563EB
Primary Dark: #1D4ED8
Secondary: #0EA5E9
Sidebar: #0F172A
Background: #F8FAFC
Surface: #FFFFFF

The interface must be:

Responsive

Mobile-friendly

Accessible

Consistent

Easy to navigate

Clear during loading and errors

See:

docs/UI_GUIDELINES.md

18. Running Tests

Backend

cd backend
npm test

Watch mode:

npm run test:watch

Frontend

cd frontend
npm test

or, depending on configured scripts:

npm run test

External OpenWeather requests must be mocked during automated tests.

19. Build Commands

Frontend Production Build

cd frontend
npm run build

Preview build:

npm run preview

Backend Production Start

cd backend
npm start

20. Lint Commands

Backend

cd backend
npm run lint

Frontend

cd frontend
npm run lint

Use the scripts that exist in each package.json.

21. Recommended Development Order

1. Read AGENTS.md
2. Read all docs files
3. Configure MongoDB
4. Configure backend environment
5. Run backend
6. Configure frontend environment
7. Run frontend
8. Test registration
9. Test login
10. Add farm
11. Select location
12. Fetch weather
13. Generate recommendation
14. Verify MongoDB Compass
15. Test history
16. Test profile
17. Run tests
18. Run build
19. Fix errors
20. Update documentation

22. AI Coding Agent Instructions

Any AI coding agent must first read:

AGENTS.md
README.md
docs/*.md

The agent must:

Inspect the existing repository

Follow documentation priority

Preserve working code

Implement P0 features first

Run the project

Run tests

Fix errors

Verify MongoDB

Update docs/TASKS.md

Update docs/TODO.md

Report real blockers honestly

Do not ask the agent to ignore project documentation.

23. Troubleshooting

Backend Does Not Start

Check:

Node.js is installed
Dependencies are installed
.env exists
MongoDB is running
Port 8000 is available

Run:

cd backend
npm install
npm run dev

Frontend Does Not Start

Check:

Dependencies are installed
frontend/.env exists
VITE_API_BASE_URL is correct
Port 5173 is available

Run:

cd frontend
npm install
npm run dev

MongoDB Connection Refused

Error:

ECONNREFUSED 127.0.0.1:27017

Start MongoDB:

net start MongoDB

Check:

MONGODB_URI=mongodb://127.0.0.1:27017/smart_irrigation

Restart backend afterward.

Weather Does Not Load

Check:

OPENWEATHER_API_KEY exists
The API key is active
Backend has internet access
Farm has valid coordinates
Weather endpoint returns a safe error

Do not add fake weather data.

Map Does Not Display

Check:

leaflet is installed
react-leaflet is installed
Leaflet CSS is imported
Map container has a height
OpenStreetMap tile URL is correct

Authentication Fails After Refresh

Check:

Token is stored
Authorization header is attached
/auth/me works
JWT secret matches
Token is not expired
AuthContext restores the user

24. Documentation

Complete project documentation is stored in:

docs/

Important files:

File

Purpose

PRD.md

Product definition

REQUIREMENTS.md

Functional requirements

DECISIONS.md

Technical decisions

FEATURES.md

Feature list

USERS.md

User roles

ARCHITECTURE.md

System architecture

DATABASE.md

MongoDB structure

API.md

Endpoint documentation

FRONTEND.md

Frontend implementation

BACKEND.md

Backend implementation

UI_GUIDELINES.md

Design system

TESTING_PLAN.md

Testing strategy

TASKS.md

AI Codex task plan

TODO.md

Remaining work

25. Project Disclaimer

This project provides weather-based irrigation advice using predefined rules.

It does not use:

Soil-moisture sensors

Crop-stage analysis

Soil-type analysis

Machine Learning

Professional field inspection

Recommendations should be treated as advisory information only.

They are not a replacement for professional agricultural guidance.

26. Future Scope

Possible future improvements:

Multi-language support

Hindi and Marathi translations

SMS notifications

WhatsApp alerts

Mobile application

IoT soil sensors

Automatic pump control

Crop-specific rules

Machine Learning

Advanced reports

Admin dashboard

CSV and PDF export

These features must not delay the core MVP.

27. Contribution Rules

Before contributing:

Read AGENTS.md
Read relevant docs
Create a focused branch
Follow existing structure
Run tests
Run build
Update documentation
Avoid committing secrets

Commit messages should be clear and focused.

Example:

feat: add farm creation and ownership validation
fix: handle expired JWT in auth middleware
test: add irrigation rule boundary tests
docs: update MongoDB Compass setup

28. Definition of Done

The project is considered complete when:

Registration works
Login works
Logout works
Protected routes work
Farm CRUD works
Farm ownership is enforced
Map selection works
Weather integration works
Recommendation rules work
History is stored
Profile management works
Loading and error states exist
Frontend build succeeds
Backend starts successfully
Critical tests pass
MongoDB data is correct
Secrets are protected
Documentation matches the code

29. Quick Start

Terminal 1 — MongoDB

Ensure MongoDB is running.

net start MongoDB

Terminal 2 — Backend

cd backend
npm install
npm run dev

Terminal 3 — Frontend

cd frontend
npm install
npm run dev

Open:

http://localhost:5173

MongoDB Compass:

mongodb://127.0.0.1:27017

30. License

This project is created for academic and educational purposes.

Add a formal license file if the repository will be distributed publicly.

31. Simulated Dashboard Dataset

The authenticated dashboard uses the bundled five-year synthetic dataset for its
interactive demonstration. It does not call OpenWeather or another weather
provider. Farmers can select one of the seeded farms, step through historical
records, or play the timeline at 1, 5, or 10 seconds per simulated day.

All dashboard weather cards, seven-day charts, farm details, and stored
recommendations update from the selected dataset record. The dashboard always
displays a `Simulated Weather Data` badge and must not describe these readings as
live or observed weather.

The separate Weather and Recommendation pages and the backend API retain their
documented live-weather workflow.
