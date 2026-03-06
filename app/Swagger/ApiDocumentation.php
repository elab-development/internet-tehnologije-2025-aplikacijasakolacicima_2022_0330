<?php

namespace App\Swagger;

/**
 * @OA\Info(
 *     title="Aplikacija sa Kolačićima – Rent-a-Car API",
 *     version="1.0.0",
 *     description="REST API za rent-a-car aplikaciju. Koristi Laravel session-based cookie autentifikaciju."
 * )
 *
 * @OA\Server(
 *     url="/api",
 *     description="API server"
 * )
 *
 * @OA\SecurityScheme(
 *     securityScheme="cookieAuth",
 *     type="apiKey",
 *     in="cookie",
 *     name="laravel_session",
 *     description="Laravel session cookie (automatski se šalje iz browsera nakon login-a)"
 * )
 *
 * @OA\SecurityScheme(
 *     securityScheme="csrfToken",
 *     type="apiKey",
 *     in="header",
 *     name="X-XSRF-TOKEN",
 *     description="CSRF zaštita – obavezno za POST, PUT, PATCH, DELETE zahteve"
 * )
 *
 * @OA\PathItem(path="/")
 */
class ApiDocumentation
{
}
