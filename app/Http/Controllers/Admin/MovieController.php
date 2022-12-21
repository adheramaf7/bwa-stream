<?php

namespace App\Http\Controllers\Admin;

use App\Models\Movie;
use Illuminate\Support\Str;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;
use App\Http\Requests\Admin\Movie\StoreMovieRequest;
use App\Http\Requests\Admin\Movie\UpdateMovieRequest;
use Illuminate\Http\UploadedFile;

class MovieController extends Controller
{

    public function index()
    {
        $movies = Movie::all()->map(function ($movie) {
            $movie->thumbnail_url = Storage::exists($movie->thumbnail) ?  Storage::url($movie->thumbnail) : $movie->thumbnail;
            return $movie;
        });
        return inertia('Admin/Movie/Index', compact('movies'));
    }

    public function create()
    {
        return inertia('Admin/Movie/Create');
    }

    public function store(StoreMovieRequest $request)
    {
        $data = $request->validated();

        $data['thumbnail'] = Storage::put('public/thumbnails', $data['thumbnail']);
        $data['slug']      = Str::slug($data['name']);
        $movie = Movie::create($data);

        return redirect()->route('admin.movies.index')->with(['message' => 'Movie created successfully', 'type' => 'success']);
    }

    public function show(Movie $movie)
    {
        //
    }

    public function edit(Movie $movie)
    {
        $thumbnailUrl = Storage::exists($movie->thumbnail) ? Storage::url($movie->thumbnail) : $movie->thumbnail;
        return inertia('Admin/Movie/Edit', compact('movie', 'thumbnailUrl'));
    }

    public function update(UpdateMovieRequest $request, Movie $movie)
    {
        $data = $request->validated();

        if (isset($data['thumbnail'])) {
            $data['thumbnail'] = Storage::put('public/thumbnails', $data['thumbnail']);

            Storage::delete($movie->thumbnail);
        }
        $data['slug']      = Str::slug($data['name']);

        $movie->update($data);

        return redirect()->route('admin.movies.index')->with(['message' => 'Movie updated successfully', 'type' => 'success']);
    }

    public function destroy(Movie $movie)
    {
        $movie->delete();
        return redirect()->route('admin.movies.index')->with(['message' => 'Movie deleted successfully', 'type' => 'success']);
    }
}
