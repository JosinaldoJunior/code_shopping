<?php
namespace CodeShopping\Firebase;


use sngrl\PhpFirebaseCloudMessaging\Client;
use sngrl\PhpFirebaseCloudMessaging\Message;
use sngrl\PhpFirebaseCloudMessaging\Recipient\Device;
use sngrl\PhpFirebaseCloudMessaging\Notification;

class CloudMessagingFb
{
    public function send()
    {
        $client = new Client();
        $client->setApiKey(env('FB_SERVER_KEY'));
        
        $message = new Message();
        $message->addRecipient(new Device(''));
        
        $message
            ->setNotification(new Notification('Menssagem do PHP', 'Enviando primeira msg PHP'));
        
        $client->send($message);
    }
    
}
