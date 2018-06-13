<?php

namespace CodeShopping\Listeners;

use CodeShopping\Events\UserCreatedEvent;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

class SendEmailToDefinedPassword
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  UserCreatedEvent  $event
     * @return void
     */
    public function handle(UserCreatedEvent $event)
    {
        //enviar e-mail
        $user  = $event->getUser();
        $token = \Password::broker()->createToken($user);
        
        $user->sendPasswordResetNotification($token);
        //$user->notify(Notification($token));
    }
}
