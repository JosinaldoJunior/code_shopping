<?php

namespace CodeShopping\Http\Controllers\Api;

use CodeShopping\Http\Controllers\Controller;
use CodeShopping\Models\Product;
use Illuminate\Http\Request;
use CodeShopping\Http\Requests\ProductRequest;
use CodeShopping\Http\Resources\ProductResource;
use CodeShopping\Common\OnlyTrashed;
use CodeShopping\Http\Filters\ProductFilter;

class ProductController extends Controller
{
    use OnlyTrashed;
    
    public function index(Request $request)
    {
        $filter = app(ProductFilter::class);
        
        $query = Product::query();
        $query = $this->onlyTrashedIfRequested($request, $query);
        $filterQuery = $query->filtered($filter);
        #$products = $query->paginate();
        $products = $filter->hasFilterParameter() ? $filterQuery->get() : $filterQuery->paginate(10);
        
        return ProductResource::collection($products);
        #$products = Product::paginate(10);
        #return Product::all();
    }

    public function store(ProductRequest $request)
    {
        $product = Product::create($request->all());
        $product->refresh(); //Active
        
        return new ProductResource($product);
    }
    
    public function restore(Product $product)
    {
        $product->restore();
        
        return response()->json([], 204);
    }

    public function show(Product $product)
    {
        return new ProductResource($product);
    }

    public function update(ProductRequest $request, Product $product)
    {
        $product->fill($request->all());
        $product->save();
        
        return new ProductResource($product);
    }

    public function destroy(Product $product)
    {
        $product->delete();
        return response()->json([], 204);
    }
}
