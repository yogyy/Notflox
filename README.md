# Notflox

Open Source TMDB client app

## Features

- Authentications
- Movie / Tv List
- Movie / Tv Details
- Trailer (if available)
- Watchlist (login require)

## Installation

Clone the repository:

```bash
npm install
npm run dev
```

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

```bash
DATABASE_URL= # PostgreSQL DB
BETTER_AUTH_SECRET=
BETTER_AUTH_URL=

GITHUB_ID=
GITHUB_SECRET=

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

TMDB_API_KEY=
NEXT_PUBLIC_UMAMI_WEBSITE_ID=

UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=
NODEJS_HELPERS=0 # require for vercel to hono work with the Pages Router
```

## Demo

### Login

```
email: lex@kryptonite.stn
pass: superman
```

## License

[MIT](https://choosealicense.com/licenses/mit/)
