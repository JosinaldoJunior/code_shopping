<?php

namespace CodeShopping\Http\Controllers\Api;

use CodeShopping\Http\Controllers\Controller;
use Illuminate\Http\Request;
use CodeShopping\Models\User;
use CodeShopping\Http\Resources\UserResource;
use CodeShopping\Http\Requests\UserRequest;
use CodeShopping\Common\OnlyTrashed;
use CodeShopping\Events\UserCreatedEvent;
use CodeShopping\Http\Filters\UserFilter;

class UserController extends Controller
{
    use OnlyTrashed;
    
    public function index(Request $request)
    {
        
        $filter = app(UserFilter::class);
        
        $query = User::query();
        $query = $this->onlyTrashedIfRequested($request, $query);
        $filterQuery = $query->filtered($filter);

        $users = $filter->hasFilterParameter() ? $filterQuery->get() : $filterQuery->paginate(10);
        
        return UserResource::collection($users);
    }

    public function store(UserRequest $request)
    {
        $user = User::create($request->all());
        event(new UserCreatedEvent($user));
        return new UserResource($user);
    }

    public function show(User $user)
    {
        return new UserResource($user);
    }

    public function update(UserRequest $request, User $user)
    {
        $user->fill($request->all());
        $user->save();
        
        return new UserResource($user);
    }

    public function destroy(User $user)
    {
        $user->delete();
        return response()->json([], 204);
    }
}
