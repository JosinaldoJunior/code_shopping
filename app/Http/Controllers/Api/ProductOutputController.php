<?php

namespace CodeShopping\Http\Controllers\Api;

use CodeShopping\Models\ProductOutput;
use Illuminate\Http\Request;
use CodeShopping\Http\Resources\ProductOutputResource;
use CodeShopping\Http\Controllers\Controller;
use CodeShopping\Http\Resources\ProductInputResource;

class ProductOutputController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $outputs = ProductOutput::with('product')->paginate(); // eager loading | lazy loading
        return ProductOutputResource::collection($outputs);
    }

    public function store(Request $request)
    {
        //
    }

    public function show(ProductOutput $output)
    {
        return new ProductOutputResource($output);
    }

}
