import { Flower } from "lucide-react";
import Link from "next/link";

export default function Footer() {
	return (
		<footer className="w-full  mx-auto h-20 flex items-center justify-between border-t-[0.2px] border-[#242424] mt-14 ">
			<div className=" w-[90%] lg:container mx-auto flex items-center justify-between">
				<Link href={"/"}>
					<div className="w-32 flex items-center h-full gap-x-2 ">
						{" "}
						<Flower className="w-8 h-8" />{" "}
						<h1 className="text-2x font-bold text-black dark:text-white flex">
							Íris
						</h1>
					</div>
				</Link>
				<h4 className="text-md text-extrabold">By Ianmello © 2024</h4>
			</div>
		</footer>
	);
}