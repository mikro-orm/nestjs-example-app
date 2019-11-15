# Nest + MySQL + TypeScript example integration

1. Install dependencies via `yarn` or `npm install`
2. Run `docker-compose up -d` to start mysql
3. Create `mikro-orm-nest-ts` database
4. Import `mysql-schema.sql` into it
5. Run via `yarn start` or `yarn start:dev` (nodemon)
6. Example API is running on localhost:3000

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
