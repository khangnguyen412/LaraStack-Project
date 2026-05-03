<?php

namespace App\Logging;

use Monolog\Logger;

class DiscordLogger {
    public function __invoke(array $config) {
        $logger = new Logger('discord');

        // Call DiscordHandler class
        $logger->pushHandler(new DiscordHandler($config['url']));

        return $logger;
    }
}
