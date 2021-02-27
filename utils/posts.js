// import matter from "gray-matter";
// import fs from "fs";

const CONTENT_API_KEY = process.env.CONTENT_API_KEY;
const API_URL = process.env.API_URL;

// export function getPostsFolders() {
//   // Get all posts folders located in `content/posts`
//   const postsFolders = fs
//     .readdirSync(`${process.cwd()}/content/posts`)
//     .map((folderName) => ({
//       directory: folderName,
//       filename: `${folderName}.md`,
//     }));

//   return postsFolders;
// }

// // Get day in format: Month day, Year. e.g. April 19, 2020
// function getFormattedDate(date) {
//   const options = {
//     year: "numeric",
//     month: "short",
//     day: "numeric",
//     weekday: "long",
//   };
//   const formattedDate = date.toLocaleDateString("ko-KR", options);

//   return formattedDate;
// }

// export function getSortedPosts() {
//   const postFolders = getPostsFolders();

//   const posts = postFolders
//     .map(({ filename, directory }) => {
//       // Get raw content from file
//       const markdownWithMetadata = fs
//         .readFileSync(`content/posts/${directory}/${filename}`)
//         .toString();

//       // Parse markdown, get frontmatter data, excerpt and content.
//       const { data, excerpt, content } = matter(markdownWithMetadata);

//       const frontmatter = {
//         ...data,
//         date: getFormattedDate(data.date),
//       };

//       // Remove .md file extension from post name
//       const slug = filename.replace(".md", "");

//       return {
//         slug,
//         frontmatter,
//         excerpt,
//         content,
//       };
//     })
//     .sort(
//       (a, b) => new Date(b.frontmatter.date) - new Date(a.frontmatter.date)
//     );

//   return posts;
// }

// export function getPostsSlugs() {
//   const postFolders = getPostsFolders();

//   const paths = postFolders.map(({ filename }) => ({
//     params: {
//       slug: filename.replace(".md", ""),
//     },
//   }));

//   return paths;
// }

export function getPostBySlug(slug) {
  const posts = getSortedPosts();

  const postIndex = posts.findIndex(({ slug: postSlug }) => postSlug === slug);

  const { frontmatter, content, excerpt } = posts[postIndex];

  const previousPost = posts[postIndex + 1];
  const nextPost = posts[postIndex - 1];

  return { frontmatter, post: { content, excerpt }, previousPost, nextPost };
}

export async function getPostsByApi() {
  const res = await fetch(
    `${API_URL}/ghost/api/v3/content/posts/?key=${CONTENT_API_KEY}&fields=title,custom_excerpt,published_at,slug`
  ).then((r) => r.json());

  const posts = res.posts.map((post) => ({
    frontmatter: {
      title: post.title,
      description: post.custom_excerpt,
      date: post.published_at,
    },
    slug: post.slug,
  }));

  return posts;
}
