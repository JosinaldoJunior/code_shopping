<?php

namespace CodeShopping;

use Illuminate\Database\Eloquent\Model;
use CodeShopping\Models\Product;
use Mnabialek\LaravelEloquentFilter\Traits\Filterable;

class ProductInput extends Model
{
    use Filterable;
    protected $fillable = ['amount', 'product_id'];
    
    //relacionamento many-to-one
    public function product()
    {
        return $this->belongsTo(Product::class)->withTrashed();
    }
    
}

//select * from product_inputs
//cada vez que eu acesso o relacionamento -------> o Eloquent Consulta ao banco de dados