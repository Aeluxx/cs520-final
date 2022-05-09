# CS 520 Final Project
By Ric Donati, Jakob Falus, Matthew Gregory, and James Topa

## Project Description
This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app). Its goal is to create a collaborative note-taking experience where users can work together on documents and help each other learn. The web site uses the MVC architecture and follows good design principles, ensuring that user experience is preserved while also streamlining the interface for ease of use.

## Running the Server

First, run the development server:

Make sure you have the appropriate environment variables in `.env.local`. You should have
- `DB_URL`
- `DB_NAME`
- `NEXT_PUBLIC_TINY_KEY`
- `JWT_SECRET`

Next, start the server. This can be done with either of the commands:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Running the Tests

Our tests use the ShallowRenderer object included by react tests combined with Jest functionality to ensure that each page is rendered appropriately. For each page, there are tests to ensure they compile and render without error, that they accept mock input, and that they match a snapshot of a developer-verified state. To run the tests, use the command:

```bash
npm test
```

This will run Jest, and the results will display in the window used to run the command.
