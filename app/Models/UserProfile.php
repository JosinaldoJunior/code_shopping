<?php

namespace CodeShopping\Models;
use Illuminate\Database\Eloquent\Model;
use CodeShopping\User;

class UserProfile extends Model
{
    protected $fillable = [
        'phone_number'
    ];
    
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
