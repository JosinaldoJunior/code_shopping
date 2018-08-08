<?php

namespace CodeShopping\Http\Filters;

use Mnabialek\LaravelEloquentFilter\Filters\SimpleQueryFilter;
use PhpParser\Builder;


class ProductInputFilter extends SimpleQueryFilter //ProductInput
{
    protected $simpleFilters = ['search']; // nome do produto
    protected $simpleSorts = ['id', 'products.name', 'created_at'];
    
    protected function applySearch($value){
        $this->query->where('name', 'LIKE', "%$value%");
    }
    
    /**
     * @param Builder $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function apply($query)
    {
        $query = $query->select('product_inputs.*')
                       ->join('products', 'products.id', '=', 'product_inputs.product_id');
        return parent::apply($query);
    }
}