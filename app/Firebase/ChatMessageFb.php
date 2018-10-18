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
        $newReference = $reference->push([
            'type'       => $data['type'],
            'content'    => $data['content'],
            'created_at' => ['.sv' => 'timestamp'],
            'user_id'    => $data['firebase_uid']
        ]);
        
        $this->setLastMessage($newReference->getKey());
        $this->chatGroup->updateInFb();
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
    
    private function setLastMessage($messageUid)
    {
        $path = "{$this->getChatGroupsMessagesReference()}/last_message_id";
        $reference = $this->getFirebaseDatabase()->getReference($path);
        $reference->set($messageUid);
    }
    
    private function getMessagesReference()
    {
        $path = "{$this->getChatGroupsMessagesReference()}/messages";
        return $this->getFirebaseDatabase()->getReference($path);
    }
    
    private function getChatGroupsMessagesReference()
    {
        return "/chat_groups_messages/{$this->chatGroup->id}";
    }
    
    
}
