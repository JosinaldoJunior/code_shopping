<?php

namespace CodeShopping\Listeners;

use CodeShopping\Events\ChatMessageSent;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use CodeShopping\Models\UserProfile;
use CodeShopping\Models\User;


class SendPushChatGroupMembers
{
    private $event;
    
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
     * @param  ChatMessageSent  $event
     * @return void
     */
    public function handle(ChatMessageSent $event)
    {
        $this->event = $event;
        $this->getTokens();
    }
    
    private function getTokens() : array
    {
        //tokens dos vendedores
        //tokens dos clientes que fazem parte do grupo
        $membersTokens = $this->getMembersTokens();
        $sellersTokens = $this->getSellersTokens();
        
        return array_merge($membersTokens, $sellersTokens);
    }
    
    private function getMembersTokens() : array
    {
        $chatGroup = $this->event->getChatGroup();
        $from = $this->event->getFrom();
        
        $users = $chatGroup->users()->whereHas('profile', function($query) use($from){
            $query->whereNotNull('device_token')
                  ->whereNotIn('id', [$from->profile->id]);
        })->get();
        
        $membersTokensCollection = $users->map(function($user){
            return $user->profile->devide_token;
        });
        
        return $membersTokensCollection->toArray();
    }
    
    private function getSellersTokens() : array
    {
        $from = $this->event->getFrom();
        $sellersTokensCollection = UserProfile::whereNotNull('device_token')
            ->whereNotIn('id', [$from->profile->id])
            ->whereHas('user', function($query){
                $query->where('role', User::ROLE_SELLER)
            })
            ->get()
            ->pluck('device_token');
            
        return $sellersTokensCollection->toArray();
    }
}
