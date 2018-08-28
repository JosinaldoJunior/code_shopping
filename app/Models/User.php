<?php

namespace CodeShopping;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\SoftDeletes;
use Tymon\JWTAuth\Contracts\JWTSubject;
use Mnabialek\LaravelEloquentFilter\Traits\Filterable;
use CodeShopping\Models\UserProfile;

class User extends Authenticatable implements JWTSubject
{
    use Notifiable, SoftDeletes, Filterable;
    
    const ROLE_SELLER = 1;
    const ROLE_CUSTOMER = 2;

    protected $dates = ['deleted_at'];
    
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 
        'email', 
        'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];
    
    public function fill(array $attributes)
    {
        !isset($attributes['password']) ? : $attributes['password'] = bcrypt($attributes['password']);
        return parent::fill($attributes);
    }
    
    public function getJWTIdentifier()
    {
        return $this->id;
    }
    
    public function getJWTCustomClaims()
    {
        return [
            'email' => $this->email,
            'name' => $this->name
        ];
    }
    
    public function profile(){
        return $this->hasOne(UserProfile::class)->withDefault();
    }
}

//Designer Patter - NUll Pattern 
