<?php

namespace CodeShopping\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ProductPhotoResource extends JsonResource
{
    private $isCollection;
    
    public function __construct($resource, $isCollection = false)
    {
        parent::__construct($resource);
        $this->isCollection = $isCollection;
    }

    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        $data = [
            'id' => $this->id,
            'photo_url' => $this->photo_url, //accessors and mutators - Laravel
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
        
        if(!$this->isCollection){
            $data['product'] = new ProductResource($this->product);
        }
        
        return $data;
    }
}
