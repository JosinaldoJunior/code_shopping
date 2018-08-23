<?php 

declare(strict_types=1);
namespace Codeshopping\Firebase;

use Kreait\Firebase\Auth\UserRecord;
use Kreait\Firebase;

class Auth
{
    private $firebase;
    
    public function __construct(Firebase $firebase){
        $this->firebase = $firebase;
    }
    
    public function user($token) : UserRecord {
        $verifieldIdToken = $this->firebase->getAuth()->verifyIdToken($token);
        $uid = $verifieldIdToken->getClaim('sub');
        return $this->firebase->getAuth()->getUser($uid);
        
    }
    
    public function phoneNumber($token) : String {
        $user = $this->user($token);
        return $user->phoneNumber;
    }
}