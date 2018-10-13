<?php
declare(strict_types=1);
namespace CodeShopping\Models;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\SoftDeletes;
use Tymon\JWTAuth\Contracts\JWTSubject;
use Mnabialek\LaravelEloquentFilter\Traits\Filterable;
use CodeShopping\Firebase\FirebaseSync;
use CodeShopping\Models\UserProfile;

class User extends Authenticatable implements JWTSubject
{
    use Notifiable, SoftDeletes, Filterable, FirebaseSync;
    
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
    
    public static function createCustomer(array $data) : User
    {
        try {
            UserProfile::uploadPhoto($data['photo']);
            \DB::beginTransaction();
            $user = self::createCustomerUser($data);
            UserProfile::saveProfile($user, $data);
            \DB::commit();
        }catch (\Exception $e){
            //excluir a photo - roll back
            UserProfile::deleteFile($data['photo']);
            \DB::rollBack();
            throw $e;
        }
        
        return $user;
    }
    
    public static function createCustomerUser($data) : User 
    {
        $data['password'] = bcrypt(str_random(16));
        $user = User::create($data);
        $user->role = user::ROLE_CUSTOMER;
        $user->save();
        
        return $user;
    }
    
    public function updateWithProfile(array $data) : User
    {
        try {
            
            if(isset($data['photo'])){
                UserProfile::uploadPhoto($data['photo']);
            }
            
            \DB::beginTransaction();
            $this->fill($data);
            $this->save();
            UserProfile::saveProfile($this, $data);
            \DB::commit();
        }catch (\Exception $e){
            //excluir a photo - roll back
            if(isset($data['photo'])){
                UserProfile::deleteFile($data['photo']);
            }
            \DB::rollBack();
            throw $e;
        }
        
        return $this;
    }

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
            'email'   => $this->email,
            'name'    => $this->name,
            'profile' => [
                'has_photo'    => $this->profile->photo ? true : false,
                'photo_url'    => $this->profile->photo_url,
                'phone_number' => $this->profile->phone_number,
                'firebase_uid' => $this->profile->firebase_uid
            ]
        ];
    }
    
    public function profile()
    {
        return $this->hasOne(UserProfile::class)->withDefault();
    }
    
    protected function syncFbCreate()
    {
        $this->syncFbSetCustom();
    }
    
    protected function syncFbUpdate()
    {
        $this->syncFbSetCustom();
    }
    
    protected function syncFbRemove()
    {
        $this->syncFbSetCustom();
    }
    
    public function syncFbSetCustom()
    {
        $this->profile->refresh();
        
        if($this->profile->firebase_uid){
            $database = $this->getFirebaseDatabase();
            $path = 'users/' . $this->profile->firebase_uid;
            $reference = $database->getReference($path);
            $reference->set([
                'name'       => $this->name,
                'role'       => $this->role,
                'photo_url'  => $this->profile->photo_url_base,
                'deleted_at' => $this->deleted_at
            ]);
        }
    }
}

//Designer Patter - NUll Pattern 
