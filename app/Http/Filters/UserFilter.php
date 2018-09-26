<?php

namespace CodeShopping\Http\Filters;

use Mnabialek\LaravelEloquentFilter\Filters\SimpleQueryFilter;
use CodeShopping\Models\User;


class UserFilter extends SimpleQueryFilter
{
    protected $simpleFilters = ['search', 'role'];
    protected $simpleSorts = ['id', 'name', 'email', 'created_at'];
    
    protected function applySearch($value){
        $this->query->where('name', 'LIKE', "%$value%")
                    ->orWhere('email', 'LIKE', "%$value%");
    }
    
    protected function apllyRole($value)
    {
        $role = $value == 'customer' ? User::ROLE_CUSTOMER : User::ROLE_SELLER;
        $this->query->where('role', $role);
    }
    
    public function hasFilterParameter()
    {
        $contains = $this->parser->getFilters()->contains(function ($filter){
            return $filter->getField() === 'search' && !empty($filter->getValue());
        });
            
        return $contains;
    }
}