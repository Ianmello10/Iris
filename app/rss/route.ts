import { getAllPosts } from "@/app/blog/utils";
import { baseUrl } from "../sitemap";

function validateXml(unsafe: string) {
	return unsafe.replace(/[<>&'"]/g, (char) => {
		switch (char) {
			case "<":
				return "&lt;";
			case ">":
				return "&gt;";
			case "&":
				return "&amp;";
			case "'":
				return "&apos;";
			case '"':
				return "&quot;";
			default:
				return char;
		}
	});
}

export async function GET() {
	const allPosts = await getAllPosts();

	const xmlItems = allPosts.posts
		.map(
			(post) => `
        <item>
          <title>${validateXml(post.frontmatter.title)}</title>
          <link>${baseUrl}/blog/${post.slug}</link>
          <description>${validateXml(post.frontmatter.description) || ""}</description>
          <pubDate>${
						post.frontmatter.publishDate
							? new Date(post.frontmatter.publishDate).toUTCString()
							: new Date().toUTCString()
					}</pubDate>
        </item>`,
		)
		.join("\n");

	const rssFeed = `<?xml version="1.0" encoding="UTF-8" ?>
    <rss version="2.0">
      <channel>
          <title>My Portfolio</title>
          <link>${baseUrl}</link>
          <description>This is my portfolio RSS feed</description>
          ${xmlItems}
      </channel>
    </rss>`;

	return new Response(rssFeed, {
		headers: {
			"Content-Type": "text/xml",
		},
	});
}
