# Gai Savoir Strapi API

Gai Savoir website back-end, made with Strapi and Postgres.
About : https://www.gai-savoir.fr/apropos
Front-end : https://github.com/kyldex/gai-savoir-frontend

## Dev

Start the Strapi application with autoReload enabled :

```
npm run develop
# or
yarn develop
```
A `.env` file is needed (see `/.env.example`).

## Production

To build the admin panel :

```
npm run build
# or
yarn build
```

Then to start the Strapi application with autoReload disabled :

```
npm run start
# or
yarn start
```