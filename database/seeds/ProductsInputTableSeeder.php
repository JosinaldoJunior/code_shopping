<?php

use Illuminate\Database\Seeder;
use CodeShopping\ProductInput;

class ProductsInputTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(ProductInput::class, 5)->create();
    }
}
