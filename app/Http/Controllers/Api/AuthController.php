<?php

namespace CodeShopping\Http\Controllers\Api;

use Illuminate\Http\Request;
use CodeShopping\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use CodeShopping\Http\Resources\UserResource;

class AuthController extends Controller
{
    use AuthenticatesUsers;
            
    public function login(Request $request)
    {     
        $this->validateLogin($request);
        
        $credentials = $this->credentials($request);
        
        $token = \JWTAuth::attempt($credentials);
        
        return $token ? 
            ['token' => $token] : 
            response()->json([
                'error' => \Lang::get('auth.failed')
            ], 400);
    }
    
    public function logout()
    {
        \Auth::guard('api')->logout();
        return response()->json([], 404);
    }
    
    public function me()
    {
        $usuario = \Auth::guard('api')->user();
        return new UserResource($usuario);
    }
}
