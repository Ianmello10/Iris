
import { getAllPosts } from "@/app/blog/utils";


export const baseUrl =  process.env.NODE_ENV === "development" ? "http://localhost:3000" : "https://iris-lake.vercel.app";

export default async function sitemap() {
    

    const allPosts = await getAllPosts();

   const posts = allPosts.posts.map((post) => ( {

        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: post.frontmatter.publishDate,
    }))

    const routes = ['','/blog'].map((route) => ({
         url: `${baseUrl}${route}`,
         lastModified: new Date().toISOString(),
    }))

    return [
        ...routes,
        ...posts
    ]
   
}
