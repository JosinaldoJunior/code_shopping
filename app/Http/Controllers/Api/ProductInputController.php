<?php

namespace CodeShopping\Http\Controllers\Api;

use CodeShopping\ProductInput;
use Illuminate\Http\Request;
use CodeShopping\Http\Controllers\Controller;
use CodeShopping\Models\Product;
use CodeShopping\Http\Resources\ProductInputResource;
use CodeShopping\Http\Requests\ProductInputRequest;

class ProductInputController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $inputs = ProductInput::with('product')->paginate(); // eager loading | lazy loading
        return ProductInputResource::collection($inputs);
    }

    public function store(ProductInputRequest $request)
    {
        $input   = ProductInput::create($request->all());

        return new ProductInputResource($input);
    }

    public function show(ProductInput $input)
    {
        return new ProductInputResource($input);
    }
}
