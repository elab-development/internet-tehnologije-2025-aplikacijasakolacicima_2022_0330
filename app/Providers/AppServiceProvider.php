<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Doctrine\DBAL\Types\Type;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        // Registruj enum tip za Doctrine
        if (!Type::hasType('enum')) {
        Type::addType('enum', 'Doctrine\DBAL\Types\StringType');
    }
    
    // Mapiraj MySQL enum na string
    try {
     $platform = \DB::getDoctrineConnection()->getDatabasePlatform();
     $platform->registerDoctrineTypeMapping('enum', 'string');
     } catch (\Exception $e) {
            // Zbog ignorisanja greske tokom Docker build-a, jer se baza jos nije pokrenula
        }

    }
}
