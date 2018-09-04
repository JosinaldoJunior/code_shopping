<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Collection;
use CodeShopping\ChatGroup;
use Illuminate\Http\UploadedFile;

class ChatGroupsTableSeeder extends Seeder
{
    private $allFakerPhotos;
    private $fakerPhotosPath = 'app/faker/chat_groups';
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $this->allFakerPhotos = $this->getFakerPhotos();
        $this->deleteAllPhotosInChatGroupsPath();
        $self = $this;
        factory(ChatGroup::class, 10)
            ->make()
            ->each(function($group) use($self){
                ChatGroup::createWithPhoto([
                    'name' => $group->name,
                    'photo' => $self->getUploadedFile()
                ]);
        });
    }
    
    private function getUploadedFile(){
        $photoFile = $this->allFakerPhotos->random();
        $uploadFile = new UploadedFile(
                                $photoFile->getRealPath(),
                                str_random(16) . '.' . $photoFile->getExtension()
                        );
        
        return $uploadFile;
    }
    
    private function getFakerPhotos() : Collection 
    {
        $path = storage_path($this->fakerPhotosPath);
        return collect(\File::allFiles($path));
    }
    
    private function deleteAllPhotosInChatGroupsPath()
    {
        $path = ChatGroup::CHAT_GROUP_PHOTO_PATH;
        \File::deleteDirectory(storage_path($path), true);
    }
}
