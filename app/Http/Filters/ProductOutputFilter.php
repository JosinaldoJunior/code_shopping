<?php

namespace CodeShopping\Http\Filters;

use Mnabialek\LaravelEloquentFilter\Filters\SimpleQueryFilter;
use PhpParser\Builder;


class ProductOutputFilter extends SimpleQueryFilter //ProductOutput
{
    protected $simpleFilters = ['search']; // nome do produto
    protected $simpleSorts = ['id', 'product_name', 'created_at'];
    
    protected function applySearch($value)
    {
        $this->query->where('name', 'LIKE', "%$value%");
    }
    
    protected function applySortProductName($order)
    {
        $this->query->orderBy('name', $order);
    }
    
    protected function applySortCreatedAt($order)
    {
        $this->query->orderBy('product_outputs.created_at', $order);
    }
    
    /**
     * @param Builder $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function apply($query)
    {
        $query = $query->select('product_outputs.*')
                       ->join('products', 'products.id', '=', 'product_outputs.product_id');
        return parent::apply($query);
    }
}