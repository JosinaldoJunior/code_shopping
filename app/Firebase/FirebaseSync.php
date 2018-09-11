<?php
declare(strict_types=1);

namespace CodeShopping\Firebase;

use Kreait\Firebase;
use Kreait\Firebase\Database;
use Kreait\Firebase\Database\Reference;

trait FirebaseSync 
{
    public static function bootFirebaseSync()
    {
        static::created(function($model){
            
        });
        
        static::updated(function($model){
            
        });
        
        static::deleted(function($model){
            
        });
    }
    
    protected function getModelReference() : Reference
    {
        $path = $this->getTable() . '/' . $this->getKey();
        return $this->getFirebaseDatabase()->getReference($path);
    }
    
    protected function getFirebaseDatabase() : Database
    {
        $firebase = app(Firebase::class);
        return $firebase->getDatabase();
    }
}

