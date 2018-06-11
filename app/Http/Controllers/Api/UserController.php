<?php

namespace CodeShopping\Http\Controllers\Api;

use CodeShopping\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Builder;
use CodeShopping\User;
use CodeShopping\Http\Resources\UserResource;
use CodeShopping\Http\Requests\UserRequest;

class UserController extends Controller
{
    public function index(Request $request)
    {
        $users = User::paginate(10);
        return UserResource::collection($users);
    }

    public function store(UserRequest $request)
    {
        $user = User::createCustom($request->all());
        return new UserResource($user);
    }

    public function show(User $user)
    {
        return new UserResource($user);
    }

    public function update(UserRequest $request, User $user)
    {
        //
    }

    public function destroy(User $user)
    {
        //
    }
}
