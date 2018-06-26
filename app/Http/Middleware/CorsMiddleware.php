<?php

namespace CodeShopping\Http\Middleware;

use Closure;

class CorsMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        if($request->is('api/*'))/*&& $request->method() == 'OPTIONS')*/{
            #header('Access-Control-Allow-Origin: *'); //Libera para todas as origens
            header('Access-Control-Allow-Origin: http://localhost:4200');
            header('Access-Control-Allow-Headers: Content-Type');
        }
        
        return $next($request);
    }
}
