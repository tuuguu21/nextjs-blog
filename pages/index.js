import Link from "next/link";

import { Layout, Bio, SEO } from "@components/common";
import { getSortedPosts, getPostsByApi } from "@utils/posts";

export default function Home({ posts }) {
  return (
    <Layout>
      <SEO title="모든 게시물" />
      <Bio className="my-14" />
      {posts.map(({ frontmatter: { title, description, date }, slug }) => (
        <article key={slug}>
          <header className="mb-2">
            <h2 className="mb-2">
              <Link href={"/post/[slug]"} as={`/post/${slug}`}>
                <a className="text-4xl font-bold text-yellow-600 font-display">
                  {title}
                </a>
              </Link>
            </h2>
            <span className="text-sm">
              {new Date(date).toLocaleString("ko-KR")}
            </span>
          </header>
          <section>
            <p className="mb-8 text-lg">{description}</p>
          </section>
        </article>
      ))}
    </Layout>
  );
}

export async function getStaticProps() {
  const posts = await getPostsByApi();

  return {
    props: {
      posts,
    },
    revalidate: 300,
  };
}
