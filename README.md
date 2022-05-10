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

An example .env.local is included in this repository as 'env.local'. You will need to rename this to '.env.local' for it to be recognized.

Next, install next with the following command:
```bash
npm install next
```

After that, start the server. This can be done with either of the commands:

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

## Troubleshooting

If the server is not running, please check the package.json file. This contains each of the dependencies for the project, and is useful for finding potentially missing packages.

## Example Logins

Example accounts to test are listed below in {username, password} format:

`bob`: {bob@gmail.com, bobPass}
`tim`: {tim@hotmail.com, timSecret}
`user`: {user@email.com, mypassword123}
