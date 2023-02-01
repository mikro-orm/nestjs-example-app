# Nest + Postgresql + TypeScript example integration

1. Install dependencies via `yarn` or `npm install`
2. Run `docker-compose up -d` to start Postgresql
3. Create database schema via `npx mikro-orm schema:create -r`. This will also create the 
   database if it does not exist.
4. Run via `yarn start` or `yarn start:dev` (nodemon)
5. Example API is running on http://localhost:3000

Available routes:

```
GET     /author        finds all authors
GET     /author/:id    finds author by id
POST    /author        creates new author
PUT     /author/:id    updates author by id
```

```
GET     /book          finds all books
GET     /book/:id      finds book by id
POST    /book          creates new book
PUT     /book/:id      updates book by id
```
