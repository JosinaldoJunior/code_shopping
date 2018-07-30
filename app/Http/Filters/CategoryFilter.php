<?php

namespace CodeShopping\Http\Filters;

use Mnabialek\LaravelEloquentFilter\Filters\SimpleQueryFilter;


class CategoryFilter extends SimpleQueryFilter
{
//     protected $simpleFilters = ['id', 'name'];
    protected $simpleFilters = ['search'];
    protected $simpleSorts = ['id', 'name', 'created_at'];
    
    protected function applySearch($value){
        $this->query->where('name', 'LIKE', "%$value%");
//                     ->orWhere('description', 'LIKE', "%$value%");
    }
    
//     protected function applyInterval($value){// 2018-10-02|2018-12-02

//     }
}