<?php
declare(strict_types=1);

namespace CodeShopping\Firebase;

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
    
    private function getMessagesReference()
    {
        $path = "/chat_groups/{$this->chatGroup->id}/messages";
        return $this->getFirebaseDatabase()->getReference($path);
    }
    
    
}
