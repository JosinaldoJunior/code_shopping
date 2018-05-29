<?php

namespace CodeShopping\Providers;

use Illuminate\Support\ServiceProvider;
use CodeShopping\ProductInput;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        \Schema::defaultStringLength(191);
        ProductInput::created(function($input){
            $product = $input->product;
            $product->stock += $input->amount;
            $product->save();
            
            //outras possibilidades
            //observes
            //event eloquent
        });
    }

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }
}
