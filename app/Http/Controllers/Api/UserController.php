<?php

namespace CodeShopping\Http\Controllers\Api;

use CodeShopping\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Builder;
use CodeShopping\User;

class UserController extends Controller
{
    public function index(Request $request)
    {
        $users = User::paginate(10);
        return $users;
    }

    public function store(Request $request)
    {
        //
    }

    public function show(User $user)
    {
        return $user;
    }

    public function update(Request $request, User $user)
    {
        //
    }

    public function destroy(User $user)
    {
        //
    }
    
    private function onlyTrashedIfRequested(Request $request, Builder $query)
    {
        //
    }
}
