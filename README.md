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
Create a `.env` file at the root of the project using the `.env.example` example. SQLite is used for the development database. You can keep the same values for `HOST`, `PORT`, `DATABASE_CLIENT` and `DATABASE_FILENAME`. For the others, you can generate random keys using :

```bash
openssl rand -base64 16
```

Note that you need 2 keys separated by a comma for the `APP_KEYS` variable.  

Start the development server locally with :

```bash
npm run develop
```

The admin account creation page should open automatically in your browser (if not: http://localhost:1337/admin/auth/register-admin). Create a local user account.
Then stop the local server and import the test data:

```bash
npm run strapi import -- -f ./data/products_data_demo.tar.gz.enc --key products
```

Restart the server and the test products should appear in the back office.  

Check in the back office Settings, in Users & Permissions plugin > Roles > Public, that the permissions for `Product` are enabled for `find` and `findOne`.

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
