import { Head, Link } from "@inertiajs/inertia-react";
import ReactPlayer from "react-player";

export default function MovieDetail({ movie }) {
    return (
        <>
            <Head title="Detail Movie" />
            <section
                class="w-screen h-screen relative watching-page font-poppins bg-form-bg"
                id="stream"
            >
                <div className="pt-[100px]">
                    <ReactPlayer
                        url={movie.video_url}
                        controls
                        width="100%"
                        height="850px"
                    ></ReactPlayer>
                </div>

                {/* <video-js
                    id="stream-video"
                    class="overflow-hidden h-screen w-screen"
                >
                    <source
                        src="https://d33kv075lir7n3.cloudfront.net/Details+Screen+Part+Final.mp4"
                        type="video/mp4"
                    />
                    <p class="vjs-no-js text-twmdark">
                        To view this video please enable JavaScript, and
                        consider upgrading to a web browser that
                        <a
                            href="https://videojs.com/html5-video-support/"
                            target="_blank"
                        >
                            supports HTML5 video
                        </a>
                    </p>
                </video-js> */}

                <div class="absolute top-5 left-5 z-20">
                    <Link href={route("dashboard")}>
                        <img
                            src="/icons/ic_arrow-left.svg"
                            class="transition-all btn-back w-[46px]"
                            alt="stream"
                        />
                    </Link>
                </div>

                <div class="absolute title-video top-7 left-1/2 -translate-x-1/2 max-w-[310px] md:max-w-[620px] text-center">
                    <span class="font-medium text-2xl transition-all text-white drop-shadow-md select-none">
                        {movie.name}
                    </span>
                </div>
            </section>
        </>
    );
}
