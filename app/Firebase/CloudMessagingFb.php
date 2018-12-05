<?php
namespace CodeShopping\Firebase;


use sngrl\PhpFirebaseCloudMessaging\Client;
use sngrl\PhpFirebaseCloudMessaging\Message;
use sngrl\PhpFirebaseCloudMessaging\Recipient\Device;
use sngrl\PhpFirebaseCloudMessaging\Notification;

class CloudMessagingFb
{
    private $title;
    private $body;
    private $tokens;
    
    public function send()
    {
        $client = new Client();
        $client->setApiKey(env('FB_SERVER_KEY'));
        
        $message = new Message();
        
        foreach ($this->tokens as $token){
            $message->addRecipient(new Device($token));
        }
        
        $message->setNotification(
            new Notification($this->title, $this->body)
        );
        
        $client->send($message);
    }
    
    public function setTitle($title)
    {
        $this->title = $title;
        return $this;
    }
    
    public function setBody($body)
    {
        $this->body = $body;
        return $this;
    }
    
    public function setTokens(array $tokens)
    {
        $this->tokens = $tokens;
        return $this;
    }
}
