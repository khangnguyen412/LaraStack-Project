<?php
namespace App\OpenApi;

use OpenApi\Attributes as OA;

#[OA\Info(
    version: '1.0.0',
    title: 'CMS Project API',
    description: "    
    ⚠️ Authorization Guide:
    1. Use API **Login** to get Access Token.
    2. Click on **[Authorize]** button.
    3. Paste the token into the field.
    4. If you receive **401**, it means you haven't logged in or the token has expired.
    5. If you receive **403**, it means you don't have permission to access.

    *Note: 
    - If you haven't logged in but the system still run the API (due to browser saving cookie), try again with anonymous.
    - The System verify the token through cookie.
    "
)]
#[OA\Server(url: 'http://localhost:8000', description: 'API Server')]
#[OA\SecurityScheme(securityScheme: 'bearerAuth', type: 'http', scheme: 'bearer', bearerFormat: 'JWT')]
final class Bootstrap {
}