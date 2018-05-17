<?php

namespace CodeShopping\Http\Controllers\Api;

use Illuminate\Http\Request;
use CodeShopping\Http\Controllers\Controller;
use CodeShopping\Models\Product;

class ProductCategoryController extends Controller
{
    public function index(Product $product)
    {
        return $product->categories;
    }

    public function store(Request $request, Product $product)
    {
        //
    }

    public function destroy($id)
    {
        //
    }
}
