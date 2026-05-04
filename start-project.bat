@REM Go to project directory
cd "%USERPROFILE%\Desktop\Laravel React Project"

@REM Run docker-compose (first time only)
@REM docker-compose -p larastack-project up -d --build

@REM Start project 
docker-compose -p larastack-project restart

@REM The source was set up by KhangNguyen — do not copy :)