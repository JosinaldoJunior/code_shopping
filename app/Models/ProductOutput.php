<?php

namespace CodeShopping\Models;

use Illuminate\Database\Eloquent\Model;

class ProductOutput extends Model
{
    protected $fillable = ['amount', 'product_id'];
    
    //relacionamento many-to-one
    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
