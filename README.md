# creatopy-remote-demo

Remote demo project using React.js, Sequelize (Sqlite3), GraphQL, and Redux-Toolkit written in Typescript

## Summary

This repo is composed of 2 projects:

- Backend (Nest.js: GraphQL / Apollo Server / Sequelize)
- Frontend (CRA: React.js / Redux Toolkit)

Both of the projects were created with _Typescript_.

The layout of the app was built using _Bootstrap v5_, and custom _Styled-Components_.

A sqlite database is attached in the repo, so no need to configure any database connections.

#### Frontend

Built using create-react-app boilerplate with (redux-typescript) template by running this command:

`npx create-react-app frontend --template redux-typescript`

#### Backend

Built using Nest.js boilerplate by running:

`nest new backend`

---

### Running the app

First you need to run

```bash
npm install
```

in both the backend and the frontend project, to install all required packages.

#### Backend

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

#### Frontend

```bash
# development
$ npm run start

# build app
$ npm run build
```
