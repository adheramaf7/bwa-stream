<?php

namespace App\Http\Controllers;

use App\Models\Movie;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class DashboardController extends Controller
{


    public function index()
    {
        $addThumbnailUrlCallback = function ($movie) {
            $movie->thumbnail_url = Storage::exists($movie->thumbnail) ?  Storage::url($movie->thumbnail) : $movie->thumbnail;
            return $movie;
        };
        $featuredMovies = Movie::where('is_featured', true)->get()->map($addThumbnailUrlCallback);
        $movies = Movie::all()->map($addThumbnailUrlCallback);

        return inertia('Dashboard/Index', compact('featuredMovies', 'movies'));
    }
}
