<?php

namespace CodeShopping\Models;

use Illuminate\Database\Eloquent\Model;
use Cviebrock\EloquentSluggable\Sluggable;
use Illuminate\Database\Eloquent\SoftDeletes;
use Mnabialek\LaravelEloquentFilter\Traits\Filterable;

class Product extends Model
{
    use Sluggable, SoftDeletes, Filterable;
    
    protected $dates = ['deleted_at'];
    protected $fillable = ['name', 'description', 'price', 'active'];
    
    public function sluggable(): array
    {
        return [
            'slug' => [
                'source' => 'name'
            ]
        ];
    }
    
    public function categories()
    {
        return $this->belongsToMany(Category::class);
    }
    
    //one to many
    public function photos(){
        return $this->hasMany(ProductPhoto::class);
    }
}
