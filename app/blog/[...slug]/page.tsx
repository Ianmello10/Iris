import Image from "next/image";
import { getAllPosts, type Post } from "@/app/blog/utils";
import NavBar from "@/components/custom/nav-bar";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import validator from "validator";
import { baseUrl } from "@/app/sitemap";

export async function generateMetadata({
	params,
}: { params: { slug: string } }): Promise<Metadata> {
	const validateSlug = validator.isAlphanumeric(
		params.slug.toString().replace(/[_-]/g, ""),
	);

	if (!validateSlug) {
		throw new Error("The post is not valid");
	}

	const post = (await getAllPosts()).posts.find(
		(post) => post.slug === params.slug.toString(),
	) as Post;
	// if data not found
	if (!post) {
		notFound();
	}

	const ogImage = post.frontmatter.img
		? post.frontmatter.img
		: `${baseUrl}/og?title=${encodeURIComponent(post.frontmatter.title)}`;

	return {
		title: post.frontmatter.title,
		description: post.frontmatter.description,
		openGraph: {
			title: post.frontmatter.title,
			description: post.frontmatter.description,
			type: "article",
			url: `${baseUrl}/blog/${post.slug}`,
			images: [
				{
					url: ogImage,
					width: 1200,
					height: 630,
				},
			],
		},
		twitter: {
			title: post.frontmatter.title,
			description: post.frontmatter.description,
			card: "summary_large_image",
			images: [ogImage],
		},
	};
}

export default async function blogPage({
	params,
}: { params: { slug: string } }) {
	const validateSlug = validator.isAlphanumeric(
		params.slug.toString().replace(/[_-]/g, ""),
	);

	if (!validateSlug) {
		throw new Error("The post is not valid");
	}

	const post = (await getAllPosts()).posts.find(
		(post) => post.slug === params.slug.toString(),
	) as Post;

	const posts = await getAllPosts();

	if (!post) {
		notFound();
	}

	return (
		<div className="w-full min-h-screen">
			<NavBar post={posts.posts} />

			<article className="w-[90%] mx-auto prose dark:prose-invert relative max-w-3xl 	 text-wrap box-content mt-4">
				<div className="h-auto  mb-8">
					<Image
						className="w-full mt-10"
						alt="teððð"
						width={500}
						height={500}
						src={post.frontmatter.img}
					/>
					<div className="flex flex-col    -mt-4">
						<span className="block text-md font-bold">
							Author: {post?.frontmatter.author}
						</span>
						<span className="block text-sm">
							{" "}
							Published on{" "}
							{new Date(post.frontmatter.publishDate).toDateString()}
						</span>
					</div>
				</div>
				{post.content}
			</article>
		</div>
	);
}
