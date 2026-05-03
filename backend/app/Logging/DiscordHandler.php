<?php

namespace App\Logging;

use Monolog\Handler\AbstractProcessingHandler;
use Monolog\LogRecord;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class DiscordHandler extends AbstractProcessingHandler {
    protected $url;

    public function __construct($url, $level = \Monolog\Logger::DEBUG, $bubble = true) {
        $this->url = $url;
        parent::__construct($level, $bubble);
    }

    protected function write(LogRecord $record): void {
        // Get message from LogRecord object
        $message = $record->message;

        // Lấy level name (ví dụ: ERROR, WARNING, INFO,...)
        $levelName = $record['level_name']; 

        // If message is empty (just in case), get formatted message
        if (empty($message)) {
            $message = $record->formatted;
        }

        Http::post($this->url, ['content' => "🚀 [{$levelName}]: " . substr($message, 0, 1900)]); // Limit 2000 characters
    }
}
