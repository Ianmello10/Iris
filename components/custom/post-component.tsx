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
			<h2 className="text-5xl font-bold mb-4">Latest posts</h2>

			<div className="grid grid-cols-1 gap-4  md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 mt-10 ">
				{posts
					.slice()
					.slice(0, visiblePosts)
					.map((post) => (
						<Card
							className="   rounded-lg bg-background shadow-sm transition-all hover:shadow-md mt-2 "
							key={post.slug}
						>
							<CardHeader className="w-full ">
								<Image
									className="h  rounded-sm object-cover"
									alt={post.frontmatter.title}
									width={600}
									height={400}
									src={post.frontmatter.img}
								/>
								<CardTitle className="py-2">{post.frontmatter.title}</CardTitle>
								<CardDescription className="text-md">
									{post.frontmatter.description}
								</CardDescription>
								<CardDescription>
									{(new Date(post.frontmatter.publishDate).toDateString())}
								</CardDescription>
							</CardHeader>

							{/* biome-ignore lint/a11y/useButtonType: <explanation> */}
							<CardFooter className="flex justify-between">
								<Button>
									<Link href={`/blog/${post.slug}`}> View More</Link>{" "}
								</Button>
							</CardFooter>
						</Card>
					))}
			</div>
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
