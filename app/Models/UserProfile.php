<?php

namespace CodeShopping\Models;
use Illuminate\Database\Eloquent\Model;
use CodeShopping\User;

class UserProfile extends Model
{
    protected $fillable = [ 'phone_number', 'photo' ];
    
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
