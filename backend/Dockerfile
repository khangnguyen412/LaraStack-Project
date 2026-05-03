# The source was set up by KhangNguyen — do not copy :)
# Source được setup bởi KhangNguyen, cấm cop dưới mọi hình thức :)

# Use library php
FROM php:8.4-fpm

# Set working directory
WORKDIR /var/www/html

# Copy source code to container
COPY . .

# Install common extensions for PHP
RUN apt-get update && apt-get install -y libfreetype6-dev libjpeg-dev libpng-dev libzip-dev zip unzip git curl libonig-dev
RUN rm -rf /var/lib/apt/lists/* 
RUN docker-php-ext-configure gd --with-freetype --with-jpeg 
RUN docker-php-ext-install bcmath gd mysqli pdo pdo_mysql opcache zip mbstring

# Install xdebug for better error messages on local
RUN pecl install xdebug && docker-php-ext-enable xdebug

# Install Composer
RUN curl -sS https://getcomposer.org/installer  | php -- --install-dir=/usr/local/bin --filename=composer

# Create autoload file and optimize classmap
RUN composer install
RUN composer dump-autoload --optimize

CMD ["php-fpm"]