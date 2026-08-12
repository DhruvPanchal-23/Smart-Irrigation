AGENTS.md

1. Purpose

This file defines the operating rules for every AI coding agent working in this repository.

The agent must read this file before making any change.

The agent’s job is to:

Understand the repository

Read the project documentation

Follow the documented technology stack

Build the project incrementally

Preserve working code

Run the project

Test important functionality

Fix errors

Keep documentation synchronized

Report work honestly

The project is the Weather-Based Smart Irrigation Advisory System.

2. Mandatory Reading Order

Before editing code, read these files when they exist:

AGENTS.md
README.md
docs/README.md
docs/PRD.md
docs/REQUIREMENTS.md
docs/DECISIONS.md
docs/ARCHITECTURE.md
docs/API.md
docs/DATABASE.md
docs/BACKEND.md
docs/FRONTEND.md
docs/UI_GUIDELINES.md
docs/FEATURES.md
docs/USERS.md
docs/TESTING_PLAN.md
docs/TASKS.md
docs/TODO.md

Also inspect:

frontend/README.md
backend/README.md
frontend/package.json
backend/package.json
frontend/.env.example
backend/.env.example

Do not assume what a file contains based only on its name.

Read the actual content.

3. Documentation Priority

When documents conflict, follow this order:

1. REQUIREMENTS.md
2. DECISIONS.md
3. ARCHITECTURE.md
4. API.md
5. DATABASE.md
6. BACKEND.md
7. FRONTEND.md
8. UI_GUIDELINES.md
9. FEATURES.md
10. USERS.md
11. TESTING_PLAN.md
12. TASKS.md
13. TODO.md
14. README.md

Higher-priority documents override lower-priority documents.

If a conflict affects implementation:

Identify the conflict.

Follow the higher-priority document.

Update lower-priority documentation when appropriate.

Mention the decision in the final report.

Do not silently mix conflicting technologies.

4. Approved Technology Stack

Use the actual project stack:

Frontend:
React + Vite + Tailwind CSS

Backend:
Node.js + Express.js

Database:
MongoDB + Mongoose

Database inspection:
MongoDB Compass

Map:
OpenStreetMap + React Leaflet

Weather:
OpenWeather API through backend

Authentication:
JWT + bcrypt

Recommendation:
Backend rule-based logic

Do not add or switch to:

FastAPI
Django
Flask
Firebase
MySQL
PostgreSQL
Google Maps
Machine Learning
IoT
Automatic pump control

unless the documentation is intentionally updated and the user explicitly approves the change.

5. Repository Inspection Rules

Before changing code, inspect:

Repository root
frontend/
backend/
docs/
Git status
package.json files
environment files
configuration files
existing tests

Identify:

Existing working features

Missing files

Incomplete files

Broken imports

Missing packages

Duplicate logic

Naming inconsistencies

API mismatches

Database mismatches

Documentation conflicts

Security problems

Missing loading states

Missing empty states

Missing error states

Missing tests

Preserve working code whenever practical.

Do not delete or rewrite working files without a clear reason.

6. Planning Rule

Before implementation, produce a short plan containing:

1. Current repository condition
2. Important decisions from documentation
3. Missing or broken parts
4. Files to create or modify
5. Implementation order
6. Commands to run
7. Known blockers

After the plan, proceed without waiting for confirmation unless a real blocker exists.

A real blocker exists only when the required information cannot be determined from:

Documentation
Existing code
Environment examples
Reasonable project conventions

Do not ask unnecessary questions.

7. Main Product Workflow

The implementation must support:

Register
   ↓
Login
   ↓
Dashboard
   ↓
Add Farm
   ↓
Select Farm Location
   ↓
Save Farm
   ↓
Fetch Weather
   ↓
Generate Irrigation Recommendation
   ↓
View Weather and Recommendation History
   ↓
Manage Profile
   ↓
Logout

Build P0/MVP functionality before optional P1, P2, or P3 features.

8. Backend Rules

The backend must:

Use Node.js and Express.js

Use ES modules consistently when "type": "module" is configured

Use MongoDB through Mongoose

Use /api/v1

Keep routes thin

Keep controllers focused

Keep business logic in services

Keep recommendation rules in one authoritative file

Use middleware for authentication, validation, and errors

Use environment variables for secrets

Hash passwords with bcrypt

Use JWT expiration

Prevent public admin-role assignment

Verify farm ownership for every farm-specific operation

Validate ObjectIds safely

Return consistent JSON responses

Use correct HTTP status codes

Call OpenWeather only from the backend

Use external request timeouts

Normalize weather responses

Store weather history

Store recommendation history

Store recommendation weather snapshots

Handle database and provider failures safely

Hide stack traces in production

The backend must never:

Store plain passwords

Return password hashes

Trust client-provided user IDs

Expose API keys

Log tokens or secrets

Fabricate weather

Generate recommendations when weather fails

Place all logic in app.js

Put external API logic directly in route files

9. Authentication Rules

Authentication must:

Use JWT bearer tokens

Read tokens from the Authorization header

Validate token signatures

Validate token expiration

Load the current user

Reject inactive or suspended users

Attach safe user data to req.user

Return generic invalid-credentials errors

Clear frontend auth state on logout

Restore frontend authentication after refresh

Expected header:

Authorization: Bearer <access_token>

Public registration must always assign:

farmer

Never trust a role sent by the public client.

10. Farm Ownership Rules

Farm ownership must come from:

req.user.id

Never use these values as proof of ownership:

req.body.userId
req.body.owner
req.query.userId

Safe query pattern:

const farm = await Farm.findOne({
  _id: farmId,
  owner: req.user.id,
});

Ownership checks are required before:

Viewing a farm

Updating a farm

Deleting a farm

Fetching farm weather

Generating recommendations

Viewing weather history

Viewing recommendation history

11. Irrigation Recommendation Rules

The backend is the only source of truth.

Apply conditions in this exact order:

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

Every recommendation must include:

status
title
reason
recommendedAction
weatherSnapshot
generatedAt
disclaimer

The frontend must not duplicate the official rule logic.

Required boundary tests:

Rain probability = 61
Rain probability = 60
Humidity = 81
Humidity = 80
Temperature = 36
Temperature = 35
Multiple conditions true
No conditions true

12. Database Rules

Use:

Database:
smart_irrigation

Collections:

users
farms
weatherhistories
recommendations

Relationships:

Farm.owner → User._id

WeatherHistory.user → User._id
WeatherHistory.farm → Farm._id

Recommendation.user → User._id
Recommendation.farm → Farm._id

Required database behaviour:

Unique user email

Mongoose timestamps

Numeric coordinates

Valid ObjectId references

Farm owner indexes

Weather history indexes

Recommendation history indexes

Separate test database

No secrets stored in MongoDB

No plain passwords stored

Weather snapshots stored with recommendations

MongoDB Compass is for inspection and verification.

Application correctness must not depend on manual Compass edits.

13. Frontend Rules

The frontend must:

Use functional React components

Use React hooks

Use React Router

Use Tailwind CSS

Use a shared Axios client

Keep API calls in service files

Keep authentication in AuthContext

Use reusable hooks for data operations

Use React Hook Form for major forms

Use React Leaflet and OpenStreetMap

Import Leaflet CSS

Use public and dashboard layouts

Use protected routes

Restore authentication after refresh

Handle expired sessions

Use reusable common components

Include loading, success, empty, and error states

Prevent duplicate requests

Show accessible form errors

Use visible focus styles

Be responsive

Follow the documented blue design system

The frontend must never:

Connect directly to MongoDB

Include the OpenWeather API key

Calculate the official recommendation

Fabricate weather

Display raw backend stack traces

Display undefined, null, NaN, or [object Object]

Put all logic in App.jsx

Duplicate API configuration

14. UI Design Rules

Follow docs/UI_GUIDELINES.md.

Primary colors:

Primary: #2563EB
Primary Dark: #1D4ED8
Secondary: #0EA5E9
Sidebar: #0F172A
Background: #F8FAFC
Surface: #FFFFFF

The UI must include:

Responsive design

Dark navy dashboard sidebar

White rounded cards

Clear form labels

Button loading states

Empty states

Error states

Confirmation dialogs

Toast feedback

Keyboard navigation

Visible focus styles

Touch-friendly controls

Mobile-friendly maps and tables

15. Environment Rules

Use example files:

frontend/.env.example
backend/.env.example

Frontend example:

VITE_API_BASE_URL=http://localhost:8000/api/v1

Backend example:

NODE_ENV=development
PORT=8000
MONGODB_URI=mongodb://127.0.0.1:27017/smart_irrigation
JWT_SECRET=
JWT_EXPIRES_IN=1h
OPENWEATHER_API_KEY=
OPENWEATHER_BASE_URL=https://api.openweathermap.org
FRONTEND_URL=http://localhost:5173

Rules:

Never commit real secrets

Never overwrite valid user secrets

Never add fake production secrets

Add placeholders to .env.example

Report missing required secrets honestly

Continue all work that can be completed without missing secrets

16. Running the Project

Do not stop after writing code.

Use the scripts defined in the repository.

Typical backend commands:

cd backend
npm install
npm run dev

Typical frontend commands:

cd frontend
npm install
npm run dev

Also run available commands:

npm test
npm run lint
npm run build

When a command fails:

Read the complete error
Find the root cause
Fix it
Run the command again
Repeat until it passes or a real blocker remains

Do not claim the project runs unless it was actually executed successfully.

17. Testing Rules

Backend testing should use the configured tools, expected to include:

Jest
Supertest
MongoDB Memory Server or separate test database
Mocked Axios/OpenWeather requests

Frontend testing should use:

Vitest
React Testing Library
Jest DOM

Critical backend tests:

Registration

Duplicate email

Login

Invalid credentials

Valid JWT

Expired JWT

Profile retrieval

Profile update

Password change

Farm creation

Farm list

Farm details

Farm update

Farm deletion

Farm ownership

Invalid ObjectId

Weather success

Weather provider failure

Weather timeout

Recommendation rules

Recommendation history

Sensitive-field protection

Critical frontend tests:

Login

Register

Protected route

Farm form

Map location selection

Weather display

Recommendation display

Loading states

Error states

Empty states

Mobile navigation

External weather requests must be mocked in automated tests.

18. Code Quality Rules

Prefer:

Small focused files

Clear function names

Reusable helpers

Consistent naming

Early validation

Predictable errors

Documented API contracts

Minimal duplication

Safe fallbacks

Meaningful comments only where needed

Avoid:

Large monolithic files

Deeply nested logic

Copy-pasted components

Duplicate service functions

Unused dependencies

Dead code

Hidden side effects

Hardcoded secrets

Hardcoded live weather

Broad catch blocks that silently ignore errors

19. File Modification Rules

When creating or editing files:

Preserve existing naming conventions

Update imports

Keep folder structure consistent

Do not rename files without updating all references

Do not delete files without confirming they are unused

Do not replace a working module merely for style

Keep generated files out of source control where appropriate

Do not edit package-lock.json manually

Do not commit node_modules

Do not commit .env

20. Progress Tracking

Update:

docs/TASKS.md
docs/TODO.md

Status format:

[ ] Not started
[-] In progress
[x] Completed
[!] Blocked

Only mark a task complete after:

The code exists
The code runs
The feature works
Relevant tests pass
Documentation matches

Do not mark unverified work as complete.

21. Documentation Synchronization

When implementation changes a documented detail, update the related Markdown files.

Keep synchronized:

Technology stack

Folder structure

API paths

Request fields

Response fields

Database schemas

Environment variables

Test commands

Feature status

Run instructions

Do not weaken requirements merely to match incomplete code.

Fix the code first unless the documentation is clearly wrong according to a higher-priority document.

22. Definition of Done

The project is complete only when:

P0 workflow works
Backend starts
Frontend starts
Frontend build succeeds
Database connection works
Authentication works
Farm ownership works
Map selection works
Weather integration works
Recommendation rules work
History is stored
Profile operations work
Loading states exist
Empty states exist
Error states exist
Critical tests pass
Secrets are protected
Documentation matches the implementation

23. Final Report Requirements

At the end of the task, report:

Implemented

Features completed

Files created

Files changed

Dependencies added

Routes completed

Models completed

Pages completed

Tests added

Verification

Commands run

Test results

Build results

Lint results

Database verification

Manual workflow verification

Remaining Issues

List only genuine blockers or incomplete optional features.

Examples:

OpenWeather API key not provided
MongoDB service unavailable
Deployment credentials unavailable
Optional P2 feature not implemented

Run Instructions

Provide exact commands to start frontend and backend.

Test Instructions

Provide exact commands to run the test suites.

Do not claim success without verification.

24. Agent Behaviour

The agent must:

Work incrementally

Make reasonable decisions from documentation

Avoid unnecessary questions

Be honest about failures

Continue after recoverable errors

Fix issues before moving on

Preserve working code

Verify changes

Report blockers clearly

The agent must not:

Perform unrelated refactors

Introduce undocumented technologies

Hide errors

Invent successful test results

Claim completion without running commands

Leave broken imports

Leave placeholder implementations for P0 features

Generate fake live data

Expose credentials

Mark incomplete work as finished

25. Start Procedure

At the beginning of any major task:

1. Read AGENTS.md
2. Read README.md
3. Read all docs/*.md files
4. Inspect the repository
5. Inspect Git status
6. Identify conflicts and missing work
7. Produce a short plan
8. Implement phase by phase
9. Run and test
10. Fix errors
11. Update documentation
12. Provide a final verified report

Follow these rules for every coding task in this repository.