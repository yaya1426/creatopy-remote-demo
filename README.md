# creatopy-remote-demo

Remote demo project using React.js, Sequelize (Sqlite3), GraphQL, and Redux-Toolkit written in Typescript

## Summary

This repo is composed of 2 projects:

- Backend (Nest.js: GraphQL / Apollo Server / Sequelize)
- Frontend (CRA: React.js / Redux Toolkit)

Both of the projects were created with _Typescript_.

The layout of the app was built using _Bootstrap v5_, and custom _Styled-Components_.

A sqlite database is attached in the repo, so no need to configure any database connections.

---

#### Frontend

- Built using create-react-app boilerplate with (redux-typescript) template by running this command:

`npx create-react-app frontend --template redux-typescript`

- The frontend is running at default port of CRA.

`http://localhost:3000`

#### Backend

- The backend node.js server is built using Nest.js boilerplate by running:

`nest new backend`

- Graphql Apollo Server was setup and configured to be available at:

`http://localhost:3001/graphql`

- The database is auto-synced and generated using Sequelize with Sqlite3. The database file can be found under:

`backend/db/data.db`

Feel free to delete the database in case wanted to test from scratch.

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
