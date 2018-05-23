<?php

namespace CodeShopping\Http\Controllers\Api;

use CodeShopping\ProductInput;
use Illuminate\Http\Request;
use CodeShopping\Http\Controllers\Controller;
use CodeShopping\Models\Product;

class ProductInputController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        dd('aki');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, Product $product)
    {
        return ProductInput::create($request->all());
    }

    /**
     * Display the specified resource.
     *
     * @param  \CodeShopping\ProductInput  $productInput
     * @return \Illuminate\Http\Response
     */
    public function show(ProductInput $productInput)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \CodeShopping\ProductInput  $productInput
     * @return \Illuminate\Http\Response
     */
    public function edit(ProductInput $productInput)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \CodeShopping\ProductInput  $productInput
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, ProductInput $productInput)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \CodeShopping\ProductInput  $productInput
     * @return \Illuminate\Http\Response
     */
    public function destroy(ProductInput $productInput)
    {
        //
    }
}
