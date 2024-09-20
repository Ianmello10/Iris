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
		<div className=" w-full flex flex-col min-h-screen    container mx-auto ">
			
			<main className="w-full    ">
				<div className="px-2 flex lg:w-full md:px-0    flex-col-reverse mx-auto  items-center  justify-center   h-auto mt-28  ">
					<div className="lg:w-[50%] px-2 flex flex-col justify-center items-center">
						<h1 className="text-6xl font-extrabold mt-2">Íris </h1>
						<p className="text-sm lg:text-lg text-center mt-4">
						Íris is an open-source Markdown-based blog template built with Next.js and Shadcn UI. 
						It is designed to be simple and flexible, allowing you to build your own blog with ease and customization. 
						Turn your notes into a blog effortlessly.


						</p>
						 
					</div>
					<div className="hidden lg:flex flex-col   h-auto w-auto ">
					<Flower className="w-40 h-40 lg:w-80 lg:h-80" />
					</div>
				</div>

			 	
			</main>
		</div>
		</div>
  );
}
