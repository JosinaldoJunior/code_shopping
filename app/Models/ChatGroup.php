<?php
declare(strict_types=1);
namespace CodeShopping;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Http\UploadedFile;

class ChatGroup extends Model
{
    use SoftDeletes;
    
    const BASE_PATH       = 'app/public';
    const DIR_CHAT_GROUPS       = 'chat_groups';
    const CHAT_GROUP_PHOTO_PATH = self::BASE_PATH . '/' . self::DIR_CHAT_GROUPS;
    
    protected $fillable = ['name', 'photo'];
    protected $dates = ['deleted_at'];
    
    public static function createWithPhoto(array $data) : ChatGroup
    {
        try {
            self::uploadPhoto($data['photo']);
            $data['photo'] = $data['photo']->hashName();
            \DB::beginTransaction();
            $chatGroup = self::create($data);
            \DB::commit();
        }catch (\Exception $e){
            //excluir a photo - roll back
            self::deleteFile($data['photo']);
            \DB::rollBack();
            throw $e;
        }
        
        return $chatGroup;
    }
    
    private static function uploadPhoto(UploadedFile $photo)
    {
        $dir = self::photoDir();
        $photo->store($dir, ['disk' => 'public']);
    }
    
    private static function deleteFile(UploadedFile $photo)
    {
        $path = self::photosPath();
        $filePath = "{$path}/{$photo->hashName()}";
        
        if(file_exists($filePath)){
            \File::delete($filePath);
        }
    }
    
    private function deletePhoto()
    {
        $dir = self::photoDir();
        \Storage::disk('public')->delete("{$dir}/{$this->photo}");
    }
    
    private static function photosPath()
    {
        $path = self::CHAT_GROUP_PHOTO_PATH;
        return storage_path($path);
    }
    
    private static function photoDir(){
        $dir = self::DIR_CHAT_GROUPS;
        return $dir;
    }
    
    public function getPhotoUrlAttribute(){
        $path = self::photoDir();
        return asset("storage/{$path}/{$this->photo}");
    }
    
}
