import Button from "@/Components/Button";
import Authenticated from "@/Layouts/Authenticated/Index";
import { Link } from "@inertiajs/inertia-react";

export default function Dashboard() {
    return (
        <Authenticated>
            <h1 className="text-xl">Welcome Back,</h1>
            <Link href={route("admin.movies.index")}>
                <Button>Movies</Button>
            </Link>
        </Authenticated>
    );
}
