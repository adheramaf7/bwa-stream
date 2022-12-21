import Button from "@/Components/Button";
import Checkbox from "@/Components/Checkbox";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import Authenticated from "@/Layouts/Authenticated/Index";
import { Head, Link, useForm } from "@inertiajs/inertia-react";

export default function MovieCreate() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        category: "",
        video_url: "",
        thumbnail: "",
        rating: "",
        is_featured: false,
    });

    const onHandleChange = (event) => {
        if (event.target.type === "checkbox") {
            setData(event.target.name, event.target.checked);
            return;
        }
        if (event.target.type === "file") {
            setData(event.target.name, event.target.files[0]);
            return;
        }
        setData(event.target.name, event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();

        post(route("admin.movies.store"));
    };

    return (
        <>
            <Head title="Create Movie" />
            <Authenticated>
                <div className="flex justify-between align-bottom mb-5 pb-2 w-1/2 border-b-2 border-b-slate-400 ">
                    <h1 className="text-xl">Create Movie</h1>
                    <Link
                        href={route("admin.movies.index")}
                        className="text-sm text-gray-600"
                    >
                        Back
                    </Link>
                </div>
                <form onSubmit={submit}>
                    <div className="flex flex-col w-1/2">
                        <div className="mb-4">
                            <InputLabel value="Name" forInput="name" />
                            <TextInput
                                variant="primary-outline"
                                id="name"
                                name="name"
                                type="text"
                                value={data.name}
                                handleChange={onHandleChange}
                                isError={errors.name}
                            />
                            <InputError
                                message={errors.name}
                                className="mt-2"
                            />
                        </div>
                        <div className="mb-4">
                            <InputLabel value="Category" forInput="category" />
                            <TextInput
                                variant="primary-outline"
                                id="category"
                                name="category"
                                type="text"
                                value={data.category}
                                handleChange={onHandleChange}
                                isError={errors.category}
                            />
                            <InputError
                                message={errors.category}
                                className="mt-2"
                            />
                        </div>
                        <div className="mb-4">
                            <InputLabel
                                value="Video URL"
                                forInput="video_url"
                            />
                            <TextInput
                                variant="primary-outline"
                                id="video_url"
                                name="video_url"
                                type="text"
                                value={data.video_url}
                                handleChange={onHandleChange}
                                isError={errors.video_url}
                            />
                            <InputError
                                message={errors.video_url}
                                className="mt-2"
                            />
                        </div>
                        <div className="mb-4">
                            <InputLabel value="Rating" forInput="rating" />
                            <TextInput
                                variant="primary-outline"
                                id="rating"
                                name="rating"
                                type="number"
                                value={data.rating}
                                handleChange={onHandleChange}
                                isError={errors.rating}
                            />
                            <InputError
                                message={errors.rating}
                                className="mt-2"
                            />
                        </div>
                        <div className="mb-4">
                            <InputLabel
                                value="Thumbnail Image"
                                forInput="thumbnail"
                            />
                            <TextInput
                                variant="primary-outline"
                                id="thumbnail"
                                name="thumbnail"
                                type="file"
                                handleChange={onHandleChange}
                                isError={errors.thumbnail}
                            />
                            <InputError
                                message={errors.thumbnail}
                                className="mt-2"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="flex items-center">
                                <Checkbox
                                    name="is_featured"
                                    value={true}
                                    className="mr-3"
                                    handleChange={onHandleChange}
                                />{" "}
                                <span>Set as Featured Movie</span>
                            </label>
                        </div>
                        <div>
                            <Button type="submit" processing={processing}>
                                Save
                            </Button>
                        </div>
                    </div>
                </form>
            </Authenticated>
        </>
    );
}
