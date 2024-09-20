"use client";
import {
	Command,
	CommandDialog,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import { ModeToggle } from "./mode-toggle";
import React, { useState, memo } from "react";
import Link from "next/link";
import { Flower, Github, Command as CommandIcon } from "lucide-react";
import type { Post } from "@/app/blog/utils";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation"

const NavBar = memo(({ post }: { post: Post[] }) => {
	
	const [open, setOpen] = useState<boolean>(false);

const router = useRouter()
	React.useEffect(() => {
		const down = (e: KeyboardEvent) => {
			if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || e.key === "/") {
				if (
					(e.target instanceof HTMLElement && e.target.isContentEditable) ||
					e.target instanceof HTMLInputElement ||
					e.target instanceof HTMLTextAreaElement ||
					e.target instanceof HTMLSelectElement
				) {
					return;
				}

				e.preventDefault();
				setOpen((open) => !open);
			}
		};

		document.addEventListener("keydown", down);
		return () => document.removeEventListener("keydown", down);
	}, []);

	const runCommand = React.useCallback((command: () => unknown) => {
		setOpen(false);
		command();
	}, []);

	return (
		<>
			<header className="w-full h-20      bg-transparent sticky z-50  top-0   backdrop-blur-sm container mx-auto ">
				<nav className="w-[95%] lg:container  h-20 flex items-center justify-between mx-auto   ">
					<div className="flex h-full w-52    items-center gap-x-2 ">  
					<Link href={"/"}>
						<div className="w-auto md:w-32 flex items-center h-full md:gap-x-2 ">
							{" "}
							<Flower className="w-8 h-8" />{" "}
							<h1 className="text-lg md:text-xl font-bold text-black dark:text-white ">
								Íris
							</h1>
						</div>
						 

					</Link>
					<Link className="font-semi-bold text-lg md:text-lg   " href={'/blog'}>Blog</Link>
					
					</div>

					<div className="w-auto  flex items-center h-full gap-x-2 justify-end z-40">
						{/* biome-ignore lint/a11y/useButtonType: <explanation> */}
						<div className="flex relative  w-auto">
							<Input
								className="cursor-pointer w-32 lg:w-56  h-8 z-40 dark:bg-black bg-white"
								onClick={() => setOpen(() => !open)}
								type="text"
								placeholder="Search by ...."
							/>
							<CommandIcon className="absolute w-4 h-4 right-4 mt-2 mr-2 text-zinc-400" />
							<span className="absolute text-xs  right-0 mt-[8.5px] mr-3 text-zinc-400">
								K
							</span>
						</div>

						<ModeToggle />
						<Button variant="outline" size="icon">
							<Link
								className="  flex items-center justify-center rounded-md  "
								href={"https://github.com/Ianmello10/iris"}
							>
								<Github />
							</Link>
						</Button>
					</div>
				</nav>
			</header>
			<Command>
				<CommandDialog open={open} onOpenChange={setOpen}>
					<CommandInput placeholder="Type a command or search..." />
					<CommandList>
						<CommandEmpty>No results found.</CommandEmpty>
						<CommandGroup heading="Suggestions" >
							{post.map((i) => (
								<CommandItem className="cursor-pointer"
								
								key={i.frontmatter.title}
								value={i.frontmatter.title}
								onSelect={() => {
								  runCommand(() => router.push(`/blog/${i.slug}` as string))
								}}  >
									<span>
										{" "}
										 {i.frontmatter.title} 
									</span>
								</CommandItem>
							))}
						</CommandGroup>
						<CommandSeparator />
					</CommandList>
				</CommandDialog>
			</Command>
		</>
	);
});
export default NavBar;
