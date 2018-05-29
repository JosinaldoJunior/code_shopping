<?php

namespace CodeShopping;

use Illuminate\Database\Eloquent\Model;
use CodeShopping\Models\Product;

class ProductInput extends Model
{
    
    protected $fillable = ['amount', 'product_id'];
    
    //relacionamento many-to-one
    public function product()
    {
        return $this->belongsTo(Product::class);
    }
    
}

//select * from product_inputs
//cada vez que eu acesso o relacionamento -------> o Eloquent Consulta ao banco de dados