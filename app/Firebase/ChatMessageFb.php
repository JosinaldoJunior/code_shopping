<?php
declare(strict_types=1);

namespace CodeShopping\Firebase;

class ChatMessageFb
{
    use FirebaseSync;
    
    public function create(array $data) \\ chat_group, type, user, content
    {
        $type = $data['type'];
       
        switch($type){
            case 'audio':
            case 'image':
            case 'text':
        }
        
        //um código para iniciar no firebase
    }
}
