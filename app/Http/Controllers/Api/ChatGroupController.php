<?php

namespace CodeShopping\Http\Controllers\Api;

use CodeShopping\ChatGroup;
use Illuminate\Http\Request;
use CodeShopping\Http\Controllers\Controller;
use CodeShopping\Http\Resources\ChatGroupResource;
use CodeShopping\Http\Requests\ChatGroupCreateRequest;
use CodeShopping\Http\Requests\ChatGroupUpdateRequest;

class ChatGroupController extends Controller
{
    public function index()
    {
        $chat_groups = ChatGroup::withCount('users')->paginate();
        return ChatGroupResource::collection($chat_groups);
    }

    public function store(ChatGroupCreateRequest $request)
    {
        $chatGroup = ChatGroup::createWithPhoto($request->all());
        return new ChatGroupResource($chatGroup);
    }

    public function show(ChatGroup $chat_group)
    {
        return new ChatGroupResource($chat_group);
    }

    public function update(ChatGroupUpdateRequest $request, ChatGroup $chat_group)
    {
        $chat_group->updateWithPhoto($request->all());
        return new ChatGroupResource($chat_group);
    }

    public function destroy(ChatGroup $chat_group)
    {
        $chat_group->delete();
        
        return response()->json([], 204);
    }
}
