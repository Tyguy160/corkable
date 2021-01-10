
# Backend

## Getting Started

Before you try to run the backend, you'll want to run `npm i` from the root backend directory. This will install all of the necessary node packages.

The next step is to create an environment file named `.env` and put the following inside:

```
PORT = 4000
MONGODB_PASSWORD = MvxNB4OXv4LTWej7
JWT_SECRET = e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
```

The first environment variable, `PORT`, is the port that the backend will be run on. This was hard-coded on the frontend (oops!), so it's imperative that you keep this as port 4000 until Tyler fixes his silly mistake.

The second variable, `MONGODB_PASSWORD` is the password for the user on the MongoDB hosted on Mongo Atlas. Keep this secret 🤫

The last variable is the `JWT_SECRET`, which is used to create each and every token. This should be kept under lock and key as well 🔐

## Running the Project

After creating the `.env` file at the root of the backend directory, simply type `npm run dev` to begin running the backend.
