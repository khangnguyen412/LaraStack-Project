# Set Up Discord Logging

## 1. Create a Discord Webhook
- Go to your Discord server settings.
- Create a new channel or select an existing one where you want to receive logs.
- Go to settings of the channel.
- At navigate, choose integrations, go to the "Webhooks" section.
- Click "Create Webhook".
- Name your webhook (e.g., "Laravel Logs").
- Copy the webhook URL. This will be used in the next step.

## 2. Set Up Environment Variable
- Open your Laravel project.
- Navigate to the `.env` file.
- Add the following line, replacing `YOUR_DISCORD_WEBHOOK_URL` with the webhook URL you copied earlier:
```
LOG_DISCORD_WEBHOOK_URL=YOUR_DISCORD_WEBHOOK_URL = https://discord.com/api/webhooks/...
```

## 3. Configure Laravel to Use Discord Webhook
- Open your Laravel project.
- Navigate to the `config/logging.php` file.
- Find the `channels` array.
- Add a new channel configuration for Discord:
```
'discord'    => [
    'driver'   => 'custom',
    'via'      => \App\Logging\DiscordLogger::class,
    'url'      => env('LOG_DISCORD_WEBHOOK_URL'),
    'username' => 'Laravel Log',
    'level'    => 'debug',
],
```

## 4. Create Discord Logger and DiscordHandler Class
- Create a new file named `DiscordLogger.php` in the `app/Logging` directory.
- Create a new file named `DiscordHandler.php` in the `app/Logging` directory.
