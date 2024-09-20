import NavBar from "@/components/custom/nav-bar";
import { PostComponent } from "@/components/custom/post-component";
import { getAllPosts } from "./utils";

export default async function Blog() {
    const { posts } = await getAllPosts();

    return (
        <div className="min-h-screen">
            <NavBar post={posts} />

            <PostComponent post={posts} />
        </div>
    );
}