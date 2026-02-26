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
│   ├── Dockerfile          # File cấu hình Docker cho Laravel
│   └── .env                # Biến môi trường của Laravel
├── mysql/                  # Thư mục chứa dữ liệu MySQL
├── nginx/
│   └── default.conf        # Cấu hình Nginx
├── php/
│   └── php.ini             # Cấu hình PHP
├── react/                  # React project
│   ├── Dockerfile          # File cấu hình Docker cho React
│   ├── README-REACT.MD     # Hướng dẫn về React
│   ├── public/             # Show giao diện lên web
│   ├── src/                # Thư mục nguồn của React
│   │    ├── assets         # Hình ảnh, font,...
│   │    ├── components     # Các component tái sử dụng
│   │    ├── hooks          # Custom hooks
│   │    ├── pages          # Các trang (page) ứng dụng
│   │    ├── services       # API, fetch dữ liệu
│   │    ├── store          # Redux, context,...
│   │    └── utils          # Hàm hỗ trợ chung
│   ├── App.tsx             # Component gốc của React
│   ├── main.tsx            # Điểm khởi đầu ứng dụng
│   └── styles.css          # File CSS
├── dockerignore            # Danh sách file không cần build Docker
├── .env                    # Biến môi trường chung
├── .gitignore              # Danh sách file không commit lên Git
├── docker-compose.yml      # Tệp cấu hình Docker Compose
├── start-project.bat       # Script bắt đầu dự án (Windows)
└── start-project.sh        # Script bắt đầu dự án (Linux/Mac)
```

The source was set up by KhangNguyen — do not copy