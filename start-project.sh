# Go to project directory
cd "%USERPROFILE%\Desktop\Laravel React Project"

# Run docker-compose (first time only)
docker-compose -p larastack-project up -d --build

# Start project 
docker-compose -p larastack-project restart

# Don't need this command — Laravel runs via Nginx (port 8003) instead of artisan serve
# docker exec Laravel-React-Web php artisan serve --host=0.0.0.0 --port=80

# The source was set up by KhangNguyen — do not copy :)