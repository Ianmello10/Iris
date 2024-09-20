"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";

import { useCallback, useEffect, useState } from "react";
import type { Post } from "@/app/blog/utils";
export function PostComponent({ post }: { post: Post[] }) {
	const [posts, setPosts] = useState<Post[]>(post);

	const [loading, setLoading] = useState<boolean>(false);

	const [visiblePosts, setVisiblePosts] = useState<number>(3);

	const handleLoadMore = () => {
		setLoading(true);

		setTimeout(() => {
			setVisiblePosts(visiblePosts + 3);
			setLoading(false);
		}, 600);
	};

	useEffect(() => {
		setPosts(post);
	}, [post]);

	return (
		<div className="container mx-auto p-4  ">
			<article className="grid-rows-2   gap-4   mt-10 w-[90%] lg:w-1/2 mx-auto ">
				<h2 className="text-3xl font-bold mb-4">Latest posts 🌱</h2>

				{posts
					.slice()
					.slice(0, visiblePosts)
					.map((post) => (
						<Link href={`/blog/${post.slug}`} key={post.slug}>
							<Card className="w-full  bg-neutral rounded-md  h-auto shadow-sm transition-all hover:shadow-md mt-2 py-0 ">
								<CardHeader className=" ">
									<CardTitle className=" ">{post.frontmatter.title}</CardTitle>

									<CardDescription className="text-md">
										{post.frontmatter.description}
									</CardDescription>
								</CardHeader>

								{/* biome-ignore lint/a11y/useButtonType: <explanation> */}
							</Card>
						</Link>
					))}
			</article>
			<div className="w-full flex justify-center mt-14">
				{visiblePosts < posts.length && (
					<Button type="button" onClick={handleLoadMore}>
						{loading ? "Loading..." : "Load More"}
					</Button>
				)}
			</div>
		</div>
	);
}
