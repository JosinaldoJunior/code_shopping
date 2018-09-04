<?php

use Faker\Generator as Faker;

$factory->define(CodeShopping\ChatGroup::class, function (Faker $faker) {
    return [
        'name' => $faker->country
    ];
});
