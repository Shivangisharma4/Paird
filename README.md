# Paird

**Intelligent study partner matching, built in.**

Match with students who study what you study, score sessions automatically, and keep every study plan on track — no more studying alone.

---

## Stack

| Layer | Technology |
|---|---|
| Framework | [SvelteKit](https://kit.svelte.dev) |
| Language | TypeScript |
| Styling | [Tailwind CSS v4](https://tailwindcss.com) |
| ORM | [Drizzle ORM](https://orm.drizzle.team) |
| Database | [Neon](https://neon.tech) (serverless Postgres) |
| Runtime | Node.js 22+ |

---

## Getting Started

### 1. Clone and install

```bash
git clone https://github.com/Shivangisharma4/Paird.git
cd Paird
npm install
```

### 2. Set up environment

```bash
cp .env.example .env
```

Open `.env` and add your Neon database URL:

```env
DATABASE_URL=postgresql://user:password@ep-xxx.neon.tech/paird?sslmode=require
```

Get a free database at [neon.tech](https://neon.tech).

### 3. Push the schema

```bash
npx drizzle-kit push
```

### 4. Run the dev server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

---

## Project Structure

```
paird/
├── src/
│   ├── app.html              # HTML shell
│   ├── app.css               # Global styles + Tailwind
│   ├── lib/
│   │   └── db/
│   │       ├── schema.ts     # Drizzle table definitions
│   │       └── index.ts      # Neon + Drizzle client
│   └── routes/
│       ├── +layout.svelte    # Root layout
│       └── +page.svelte      # Landing page
├── drizzle.config.ts         # Drizzle Kit config
├── vite.config.ts            # Vite + Tailwind plugin
└── .env.example              # Environment variable template
```

---

## Database Schema

| Table | Description |
|---|---|
| `users` | Registered students (auth provider ID, university, major) |
| `profiles` | Study profile — subjects, seeking, goals, availability |
| `swipes` | Like / pass actions between users |
| `matches` | Mutual likes — confirmed study partner pairs |
| `sessions` | Scheduled study sessions linked to a match |

Generate and run migrations:

```bash
npx drizzle-kit generate
npx drizzle-kit migrate
```

---

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run preview` | Preview production build |
| `npx drizzle-kit push` | Push schema directly to DB |
| `npx drizzle-kit studio` | Open Drizzle Studio (DB GUI) |

---

## Roadmap

- [ ] Auth (university email OAuth)
- [ ] Swipe queue with match scoring
- [ ] Real-time session scheduling
- [ ] In-app messaging for matched pairs
- [ ] Subject-based leaderboards
