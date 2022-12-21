import "flickity/css/flickity.css";

import Authenticated from "@/Layouts/Authenticated/Index";
import { Head } from "@inertiajs/inertia-react";
import Flickity from "react-flickity-component";
import FeaturedMovie from "@/Components/FeaturedMovie";
import MovieCard from "@/Components/MovieCard";

export default function Dashboard({ auth, featuredMovies, movies }) {
    const flickityConfig = {
        cellAlign: "left",
        contain: true,
        groupCells: 1,
        wrapAround: false,
        pageDots: false,
        prevNextButtons: false,
        draggable: ">1",
    };

    return (
        <>
            <Head title="Dashboard" />
            <Authenticated>
                {/* START: FEATURED */}
                <div className="mb-6">
                    <div className="font-semibold text-[22px] text-black mb-4">
                        Featured Movies
                    </div>
                    <Flickity className="gap-[30px]" options={flickityConfig}>
                        {featuredMovies.map((movie) => (
                            <FeaturedMovie
                                key={"featured-movie-" + movie.id}
                                slug={movie.slug}
                                name={movie.name}
                                category={movie.category}
                                thumbnail={movie.thumbnail_url}
                                rating={movie.rating}
                            />
                        ))}
                    </Flickity>
                </div>
                {/* END: FEATURED */}

                {/* START: BROWSE */}
                <div>
                    <div className="font-semibold text-[22px] text-black mb-4">
                        Browse
                    </div>
                    <Flickity options={flickityConfig}>
                        {movies.map((movie) => (
                            <MovieCard
                                slug={movie.slug}
                                name={movie.name}
                                category={movie.category}
                                thumbnail={movie.thumbnail_url}
                                key={"movie-" + movie.id}
                            />
                        ))}
                    </Flickity>
                </div>
                {/* END: BROWSE */}
            </Authenticated>
        </>
    );
}
