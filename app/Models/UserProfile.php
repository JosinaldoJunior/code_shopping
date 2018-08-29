<?php

namespace CodeShopping\Models;
use Illuminate\Database\Eloquent\Model;
use CodeShopping\User;
use Illuminate\Http\UploadedFile;

class UserProfile extends Model
{
    const BASE_PATH       = 'app/public';
    const DIR_USERS       = 'users';
    const DIR_USER_PHOTO  = self::DIR_USERS . '/photos';
    const USER_PHOTO_PATH = self::BASE_PATH . '/' . self::DIR_USER_PHOTO;
    
    protected $fillable = [ 'phone_number', 'photo' ];
    
    public static function photosPath(){
        $path = self::USER_PHOTO_PATH;
        return storage_path($path);
    }
    
    public static function photoDir(){
        $dir = self::DIR_USERS;
        return $dir;
    }
    
    public static function uploadPhoto(UploadedFile $photo = null){
        if(!$photo){
            return;
        }
        $dir = self::photoDir();
        $photo->store($dir, ['disk' => 'public']);
    }
    
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
