import { getAllPosts } from "./blog/utils";
import { Flower } from "lucide-react";
import { PostComponent } from "@/components/custom/post-component";
import NavBar from "@/components/custom/nav-bar";

export const metadata = {
	title: 'Irís - Blog',
	description: 'Irís is a lightweight and fast markdown-based open source blogging template',
  }
export default async function Home() {

const { posts } = await getAllPosts();
  
  return (
  	<div className="w-full min-h-screen"> 
		<NavBar post={posts} />
		<div className=" w-full flex flex-col min-h-screen gap-y-10  mt-12  container mx-auto ">
			
			<main className="w-full lg:mt-12   ">
				<div className="flex lg:w-full flex-col lg:flex-row mx-auto justify-between items-center   ">
					<div className="lg:w-[50%] px-2 flex flex-col  ">
						<h1 className="text-6xl font-extrabold">Íris </h1>
						<p className="text-sm lg:text-xl mt-1 ">
						 Íris is an open-source markdown-based blog template built with Next.js and Shadcnui.Íris is designed to be simple and flexible it alow 
						 you to build your own blog with ease and customization, your rss feed is also supported for easy sharing of your posts.
						 Turn your notes into a blog.
						</p>
						<div>

 
						</div>
					</div>
					<div className="hidden lg:flex flex-col   h-auto w-auto ">
					<Flower className="w-40 h-40 lg:w-80 lg:h-80" />
					</div>
				</div>

				<div className="w-full flex flex-col mt-24 mb-24">
					 
                   {
					posts.length === 0 ? <p className="text-center font-bold text-lg">No posts yet</p> :
					<PostComponent post={posts} />
				   }
					 
				</div>
			</main>
		</div>
		</div>
  );
}
