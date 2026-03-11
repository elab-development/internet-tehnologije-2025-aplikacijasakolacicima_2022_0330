# Web aplikacija koja implementira rad sa kolačićima

Web aplikacija za iznajmljivanje vozila koja upotrebljava kolačiće za upravljanje sesijom, korisničkim preferencijama i "Zapamti me" funkcionalnošću. Cilj aplikacije je da korisnicima omogući jednostavno pregledanje, rezervaciju i plaćanje vozila.

## Opis aplikacije

Aplikacija podržava tri tipa korisnika sa različitim nivoima pristupa:


- **Gost** - Pregled i pretraga vozila, filtriranje i sortiranje, detalji vozila, nedavno pregledana vozila, registracija/logovanje, promena teme
- **Ulogovani korisnik** -  Sve što i gost + rezervacija vozila, istorija rezervacija, pamćenje podataka za login, plaćanje rezervacije, promena preferencija prikaza 
- **Admin** - Sve što i ulogovani korisnik + CRUD operacije nad vozilima, pregled svih rezervacija, statistike poslovanja

### Upotreba kolačića

Kolačići se u aplikaciji koriste za:
- **Sesiju korisnika** — `laravel_session` kolačić koji identifikuje prijavljenog korisnika
- **"Zapamti me"** — `remember_web` kolačić koji traje 60 dana i omogućava automatsku prijavu
- **Temu prikaza** — pamćenje svetle/tamne teme, traje 365 dana
  
## Tehnologije
- Backend (PHP, Laravel, MySQL, Composer, L5-Swagger)
- Frontend (React 18, TypeScript, Vite, Axios, React Router)
- DevOps (Docker, Docker Compose, Nginx, GitHub Actions)

## Pokretanje aplikacije

### 1. Kloniranje projekta

- `git clone https://github.com/elab-development/internet-tehnologije-2025-aplikacijasakolacicima_2022_0330.git`
- `cd internet-tehnologije-2025-aplikacijasakolacicima_2022_0330`

### 2. Konfiguracija .env fajla
- `cp .env.example .env`

Otvoriti `.env` fajl i podesiti:
```
APP_NAME=Laravel
APP_ENV=local
APP_KEY=                              
APP_DEBUG=true
APP_URL=http://localhost:8000

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=cookies_app
DB_USERNAME=root
DB_PASSWORD=

SESSION_DOMAIN=
SANCTUM_STATEFUL_DOMAINS=localhost,localhost:5173
SESSION_SECURE_COOKIE=false
FRONTEND_URL=http://localhost:5173
```

### 3. Pokretanje backenda

- `composer install`
- `php artisan key:generate`
- `php artisan migrate
- `php artisan serve`

Backend dostupan na: **http://localhost:8000*

### 4. Pokretanje frontenda

- `cd frontend`
- `npm install`
- `npm run dev`

Frontend dostupan na: **http://localhost:5173**

## Pokretanje pomoću Dockera

### 1. Konfiguracija .env fajla za Docker

- `cp .env.example .env`

- U `.env` fajlu za Docker, `DB_HOST` mora biti `db`, a ne `127.0.0.1`.

env:
```
APP_NAME="Vehicle Rental App"
APP_ENV=local
APP_KEY=                           
APP_DEBUG=true
APP_URL=http://localhost

DB_CONNECTION=mysql
DB_HOST=db                          
DB_PORT=3306
DB_DATABASE=cookies_app
DB_USERNAME=laravel
DB_PASSWORD=secret

SANCTUM_STATEFUL_DOMAINS=localhost
FRONTEND_URL=http://localhost
```

### 3. Izgradnja i pokretanje kontejnera

`docker-compose up --build -d`

### 4. Inicijalizacija aplikacije

- `docker-compose exec backend php artisan key:generate`
- `docker-compose exec backend php artisan migrate --seed`
- `docker-compose exec backend php artisan l5-swagger:generate`

## Pokretanje testova

- `php artisan test`

Testovi pokrivaju:
- **AuthTest** — registracija, prijava, uloge korisnika
- **VehicleTest** — listanje, detalji, filtriranje vozila
- **RentalTest** — kreiranje, pregled i validacija rezervacija

Testovi se automatski pokreću kroz **GitHub Actions CI/CD pipeline** na svaki `push` ili `pull request` prema `main` ili `develop` grani. Deploy na produkciju se vrši samo ako svi testovi prođu.

## Produkcija

Aplikacija je postavljena na **Render.com** platformi:

- Frontend  https://kolacici-frontend.onrender.com 
- Backend  https://kolacici-backend.onrender.com 
- Swagger dokumentacija   https://kolacici-backend.onrender.com/api/documentation 
