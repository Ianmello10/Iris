import path from "node:path";
import { cwd } from "node:process";
import fs from "node:fs";
import { compileMDX } from "next-mdx-remote/rsc";
import type { JSXElementConstructor, ReactElement } from "react";
import { promises as fsPromises } from "node:fs";

// cwd return the current directory and the target directory

interface PostFrontmatter {
	title: string;
	author: string;
	publishDate: string;
	description: string;
	img: string;
	category: string;
}

export interface Post {
	frontmatter: PostFrontmatter;
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	content: ReactElement<any, string | JSXElementConstructor<any>>;
	slug: string;
}

export interface PostsResponse {
	posts: Post[];
}

// get the content from the directory
const postsContent: string = path.join(cwd(), "/app/blog/posts");

export async function getPostBySlug(slug: string): Promise<Post> {
	const post: string = `${slug}.mdx`;

	const pathName: string = path.join(postsContent, post);

	if (!fs.existsSync(pathName)) {
		throw new Error("Post not found");
	}

	const postContent: string = await fsPromises.readFile(pathName, "utf-8");

	const { frontmatter, content } = await compileMDX<PostFrontmatter>({
		source: postContent,
		options: { parseFrontmatter: true },
	});
	return {
		frontmatter,
		content,
		slug: path.parse(post).name,
	};
}

export async function getAllPosts(): Promise<PostsResponse> {
	const files = await fsPromises.readdir(postsContent);

	const posts = await Promise.all(
		files.map(async (file) => {
			return getPostBySlug(path.parse(file).name);
		}),
	);

	const latestsPosts: Post[] = posts
		.map((post) => post)
		.sort(
			(a, b) =>
				new Date(b.frontmatter.publishDate).getTime() -
				new Date(a.frontmatter.publishDate).getTime(),
		);

	return {
		posts: latestsPosts,
	};
}

export async function getAllPostsSlug() {
	const files = await fsPromises.readdir(postsContent);
	const postSlugs = files.map((file) => ({ slug: path.parse(file).name }));

	return postSlugs;
}
