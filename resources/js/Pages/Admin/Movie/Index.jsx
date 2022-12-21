import Alert from "@/Components/Alert";
import Button from "@/Components/Button";
import Authenticated from "@/Layouts/Authenticated/Index";
import { Inertia } from "@inertiajs/inertia";
import { Head, Link } from "@inertiajs/inertia-react";

export default function MovieIndex({ flashMessage, movies }) {
    const deleteMovie = (id) => {
        const url = route("admin.movies.destroy", id);

        console.log(url);

        if (confirm("Are you sure to delete this movie?")) {
            Inertia.delete(url);
        }
    };
    return (
        <>
            <Head title="Movie List" />
            <Authenticated>
                {flashMessage.message && (
                    <Alert type={flashMessage.type} className="mb-4">
                        {flashMessage.message}
                    </Alert>
                )}
                <div className="flex">
                    <div className="flex-grow">
                        <h1 className="text-xl mb-4">Movie List</h1>
                    </div>
                    <div className="w-1/6">
                        <Link href={route("admin.movies.create")}>
                            <Button>Create</Button>
                        </Link>
                    </div>
                </div>
                <table className="table-fixed w-full mt-6 text-center">
                    <thead>
                        <tr className="p-3">
                            <th>#</th>
                            <th>Thumbnail</th>
                            <th>Name</th>
                            <th>Rating</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {movies.map((movie, index) => {
                            return (
                                <tr key={movie.id}>
                                    <td>{index + 1}</td>
                                    <td>
                                        <img
                                            src={movie.thumbnail_url}
                                            className="w-32 rounded-md"
                                        />
                                    </td>
                                    <td>{movie.name}</td>
                                    <td>{movie.category}</td>
                                    <td>{movie.rating.toFixed(1)}</td>
                                    <td>
                                        <div className="flex">
                                            <Link
                                                as="button"
                                                href={route(
                                                    "admin.movies.edit",
                                                    movie.id
                                                )}
                                                className="mr-3 text-blue-600"
                                            >
                                                Edit
                                            </Link>
                                            <button
                                                type="button"
                                                onClick={(e) =>
                                                    deleteMovie(movie.id)
                                                }
                                                className="text-red-600"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </Authenticated>
        </>
    );
}
