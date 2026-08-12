# Smart Irrigation API

Express 5 and Mongoose API under `/api/v1`. Configure the values documented in `.env.example`, then run `npm run dev`. Use `npm test` for the Node test suite.

## Production database

Vercel must use a MongoDB Atlas `MONGODB_URI`; a localhost URI only works during local development. Configure `MONGODB_URI`, `JWT_SECRET`, and `FRONTEND_URL` in the Vercel Production environment, allow the deployment to reach Atlas, and redeploy after changing environment variables. `FRONTEND_URL` may include a trailing slash; the API normalizes it before applying CORS.

`GET /api/v1/health` establishes the database connection and returns `503 DATABASE_UNAVAILABLE` when MongoDB cannot be reached. Database-backed requests use the same cached connection across warm serverless invocations.

## Five-year development seed

The bundled synthetic dataset contains one farmer, five farms, and five years of
weather and recommendation history. Validate it without a database:

```powershell
npm run seed:validate
```

To import it into the MongoDB database configured by `MONGODB_URI`, set a local
password for the seeded farmer and run:

```powershell
$env:SEED_USER_PASSWORD='choose-a-local-password'
npm run seed
```

Sign in with `rahulpatil@example.com` and that password. The importer converts
the source string IDs to deterministic MongoDB ObjectIds and can be rerun; it
replaces only records that use the bundled seed IDs. The weather is simulated
development data, not live or observed weather.
