# Gai Savoir Strapi API

Gai Savoir website back-end, made with Strapi and Postgres.  
Gai Savoir website : https://www.gai-savoir.fr  
Front-end source code : https://github.com/kyldex/gai-savoir-frontend  

## About Gai Savoir

(English below)  

Le Gai Savoir est une plateforme de contenus intellectuels, artistiques et citoyens visant à se libérer de la logique de segmentation propre à la politique et aux industries culturelles et créatives.  

Le Gai Savoir is a platform for intellectual, artistic and civic content designed to break free of the segmentation inherent in politics and the cultural and creative industries.  

→ https://www.gai-savoir.fr/apropos  

## Build and run locally

#### Prerequisites :  
- Node 18+, 20+

#### Dependencies :  

```
npm install
```

#### Configuration :  
Create a `.env` file at the root of the project using the `.env.example` example. You can keep the same values for `HOST`, `PORT`, `STRAPI_ADMIN_CLIENT_API_URL`, and `STRAPI_ADMIN_CLIENT_FRONTEND_URL`. For `APP_KEYS`, `API_TOKEN_SALT`, `ADMIN_JWT_SECRET`, `TRANSFER_TOKEN_SALT` and `JWT_SECRET`, you can generate random keys using :

```bash
openssl rand -base64 16
```
Note that you need 2 keys separated by a comma for the `APP_KEYS` variable.  

Ensure PostgreSQL is installed and running on your machine. Set the database variables values, the shared variable values with the front-end Next.js app, as well as the Cloudinary ones.  

Start the development server locally with :

```bash
npm run develop
```

The admin account creation page should open automatically in your browser (if not: http://localhost:1337/admin/auth/register-admin). Create a local user account.
Then stop the local server and import the test data:

```bash
npm run strapi import -- -f ./data/dev_data.tar.gz.enc --key gaisavoir
```

Restart the server and the test articles should appear in the back office.  

Check in the back office Settings, in Users & Permissions plugin > Roles > Public, that the needed permissions are enabled for `find` and `findOne`.

## Production

You'll need to create a `.env.prod` file at the root of the project.  
To build the admin panel :

```bash
npm run build
```

Then to start the Strapi application with autoReload disabled :

```bash
npm run start
```
