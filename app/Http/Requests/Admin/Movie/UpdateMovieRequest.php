<?php

namespace App\Http\Requests\Admin\Movie;

use Illuminate\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateMovieRequest extends FormRequest
{


    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return $this->user()->hasRole('Admin');
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'name'        => ['required', Rule::unique('movies', 'name')->ignore($this->route('movie')->id)],
            'category'    => ['required'],
            'video_url'   => ['required', 'url',],
            'rating'      => ['required', 'numeric', 'min:0', 'max:5'],
            'thumbnail'   => ['nullable', 'image',],
            'is_featured' => ['required', 'boolean',],
        ];
    }
}
