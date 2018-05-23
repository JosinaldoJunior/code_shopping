<?php

namespace CodeShopping;

use Illuminate\Database\Eloquent\Model;
use CodeShopping\Models\Product;

class ProductInput extends Model
{
    
    protected $fillable = ['amount', 'product_id'];
    
    public function product()
    {
        return $this->belongsTo(Product::class);
    }
    
}
