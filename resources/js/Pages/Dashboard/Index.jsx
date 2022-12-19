import "flickity/css/flickity.css";

import Authenticated from "@/Layouts/Authenticated/Index";
import { Head } from "@inertiajs/inertia-react";
import Flickity from "react-flickity-component";
import FeaturedMovie from "@/Components/FeaturedMovie";
import MovieCard from "@/Components/MovieCard";

export default function Dashboard(props) {
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
                        {[1, 2, 3, 4, 5].map((a) => (
                            <FeaturedMovie
                                key={a}
                                slug="the-minion"
                                name="The Minion"
                                category="Comedy"
                                thumbnail="images/featured-2.png"
                                rating={4.5}
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
                        {[1, 2, 3, 4, 5, 6, 7].map((a) => (
                            <MovieCard
                                slug="meong-golden"
                                name="Meong Golden"
                                category="Comedy"
                                thumbnail="images/browse-1.png"
                                key={a}
                            />
                        ))}
                    </Flickity>
                </div>
                {/* END: BROWSE */}
            </Authenticated>
        </>
    );
}
