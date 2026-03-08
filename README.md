## Laravel - React Project 
- Descripttion: Project Laravel + ReactTs for fullstack web.
- Purpose: Create CMS system

## Technology in project:
- Language: HTML, CSS, PHP, JavaScript, TypeScript
- Tailwind
- Docker
- Laravel
- ReactJs
- ReactTs

## How to start and testing project
### Start with docker (don't need install xampp, wamp)
- Install docker desktop
- Create dir ./mysql. If you have to rerun docker compose, make sure ./mysql is clear first
- Use cmd in this path
- Start project with the command below (just the first time): 
```
docker-compose down
docker-compose up -d --build
```
- On Window, start project 2nd time onwards with the command below:
```
.\start-project.bat
```
- On Linux & MacOS:
```
.\start-project.sh
```
- Use terminal laravel in docker:
```
docker exec -it Laravel-React-Web bash
```
- Use terminal react in docker:
```
docker exec -it Laravel-React-Frontend sh
```
- Migrate and seeding:
```
docker exec -it Laravel-React-Web bash
php artisan config:clear
php artisan cache:clear
php artisan migrate
php artisan db:seed
```

- Reset migrate and seeding:
```
docker exec -it Laravel-React-Web bash
php artisan migrate:fresh
php artisan db:seed
```

### Install swagger
- Install swagger:
```
composer require darkaonline/l5-swagger
```
- Publish swagger:
```
php artisan vendor:publish --provider "L5Swagger\L5SwaggerServiceProvider"
```
- Regenerate swagger:
```
php artisan config:clear
php artisan route:clear
php artisan cache:clear
php artisan l5-swagger:generate
```
- Access swagger:
```
http://localhost:8000/swagger/documentation
```

## Project structure 
```
Laravel-React-Project/
├── laravel/                # Laravel project
│   ├── Dockerfile          # Dockerfile for Laravel
│   └── .env                # Environment variables for Laravel
├── mysql/                  # MySQL data directory
├── nginx/
│   └── default.conf        # Nginx configuration
├── php/
│   └── php.ini             # PHP configuration
├── react/                  # React project
│   ├── Dockerfile          # Dockerfile for React
│   ├── README-REACT.MD     # React guide
│   ├── public/             # React application interface
│   ├── src/                # React source directory
│   │    ├── assets         # Images, fonts,...
│   │    ├── components     # Reusable components
│   │    ├── hooks          # Custom hooks
│   │    ├── pages          # Application pages
│   │    ├── services       # API, data fetching
│   │    ├── store          # Redux, context,...
│   │    └── utils          # Common helper functions
│   ├── App.tsx             # Root component of React
│   ├── main.tsx            # Application entry point
│   └── styles.css          # File CSS
├── dockerignore            # List of files to exclude from Docker build
├── .env                    # Common environment variables
├── .gitignore              # List of files to exclude from Git commit
├── docker-compose.yml      # Docker Compose configuration file
├── start-project.bat       # Script to start project (Windows)
└── start-project.sh        # Script to start project (Linux/Mac)
```

The source was set up by KhangNguyen — do not copy