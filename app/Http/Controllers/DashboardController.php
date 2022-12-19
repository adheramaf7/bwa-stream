<?php

namespace App\Http\Controllers;

use App\Models\Movie;
use Illuminate\Http\Request;

class DashboardController extends Controller
{


    public function index()
    {
        $featuredMovies = Movie::where('is_featured', true)->get();
        $movies = Movie::all();

        return inertia('Dashboard/Index', compact('featuredMovies', 'movies'));
    }
}
