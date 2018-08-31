<?php

namespace CodeShopping\Http\Controllers\Api;

use Illuminate\Http\Request;
use CodeShopping\Http\Controllers\Controller;
use CodeShopping\Firebase\Auth as FirebaseAuth;
use CodeShopping\Http\Resources\UserResource;

class UserProfileController extends Controller
{
    public function update(Request $request)
    {
        $data = $request->all();
        if($request->has('token')){
            $token = $request->token;
            $data["phone_number"] = $this->getPhoneNumber($token);
        }
        
        if($request->has('remove_photo')){
            $data["photo"] = null;
            
        }
        
        $user = \Auth::guard('api')->user();
        $user->updateWithProfile($data);
        
        $resource = new UserResource($user);
        
        return [
            'user' => $resource->toArray($request),
            'token' => \Auth::guard('api')->login($user)
        ];
    }
    
    public function getPhoneNumber($token)
    {
        $firebaseAuth = app(FirebaseAuth::class);
        return $firebaseAuth->phoneNumber($token);
    }
}
