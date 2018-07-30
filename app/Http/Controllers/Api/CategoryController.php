<?php

namespace CodeShopping\Http\Controllers\Api;

use CodeShopping\Http\Controllers\Controller;
use CodeShopping\Models\Category;
use Illuminate\Http\Request;
use CodeShopping\Http\Requests\CategoryRequest;
use CodeShopping\Http\Resources\CategoryResource;
use CodeShopping\Http\Filters\CategoryFilter;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $filter = app(CategoryFilter::class);
        $filterQuery = Category::filtered($filter);
        
        $categories = $request->has('all') ? $filterQuery->get() : $filterQuery->paginate(5);
//         $categories = $filterQuery->get();
        
        return CategoryResource::collection($categories);
    }

    public function store(CategoryRequest $request)
    {
        $category = Category::create($request->all());
        $category->refresh();
        
        return new CategoryResource($category);
    }

    public function show(Category $category)
    {
        return new CategoryResource($category);
    }

    public function update(CategoryRequest $request, Category $category)
    {
        $category->fill($request->all());
        $category->save();
        
        return $category;
//         return response([], 204);
    }

    public function destroy(Category $category)
    {
        $category->delete();
        return response([], 204);
    }
}
