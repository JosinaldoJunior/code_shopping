<?php
namespace CodeShopping\Firebase;

use CodeShopping\Models\ChatGroup;
use Illuminate\Http\UploadedFile;

class ChatMessageFb
{
    use FirebaseSync;
    
    private $chatGroup;
    
    public function create(array $data) //chat_group, type, user, content
    {
        $this->chatGroup =  $data['chat_group'];
        $type = $data['type'];
       
        switch($type){
            case 'audio':
            case 'image':
                $this->upload($data['content']);
                $uploadFile = $data['content'];
                $fileUrl = $this->groupFilesDir() . '/' . $this->buildFileName($uploadFile);
                $data['content'] = $fileUrl;
        }
        
        $reference = $this->getMessagesReference();
        $reference->push([
            'type'       => $data['type'],
            'content'    => $data['content'],
            'created_at' => ['.sv' => 'timestamp'],
            'user_id'    => $data['firebase_uid']
        ]);
        
        //um código para iniciar no firebase
    }
    
    private function upload(UploadedFile $file)
    {
        $file->storeAs($this->groupFilesDir(), $this->buildFileName($file), ['disk' => 'public']);
    }
    
    private function buildFileName(UploadedFile $file)
    {
        switch ($file->getMimeType()){
            case 'audio/x-hx-aac-adts':
                return "{$file->hashName()}aac";
            default:
                return $file->hashName();
        }
    }
    
    private function groupFilesDir()
    {
        return ChatGroup::DIR_CHAT_GROUPS . '/' . $this->chatGroup->id . '/messages_files';
    }
    
    public function deleteMessages(ChatGroup $chatGroup)
    {
        $this->chatGroup = $chatGroup;
        $this->getMessagesReference()->remove();
    }
    
    private function getMessagesReference()
    {
        $path = "/chat_groups_messages/{$this->chatGroup->id}/messages";
        return $this->getFirebaseDatabase()->getReference($path);
    }
    
    
}
