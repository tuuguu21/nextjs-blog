import Link from "next/link";
import ReactMarkdown from "react-markdown/with-html";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import style from "react-syntax-highlighter/dist/cjs/styles/prism/dracula";

import { Layout, Image, SEO, Bio } from "@components/common";
import { getPostBySlug, getPostsSlugs } from "@utils/posts";
import { useRouter } from "next/router";

const CONTENT_API_KEY = process.env.CONTENT_API_KEY;
const API_URL = process.env.API_URL;

export default function Post({ post, frontmatter, nextPost, previousPost }) {
  console.log(frontmatter);
  const router = useRouter();
  if (router.isFallback) return <Layout></Layout>;
  return (
    <Layout>
      <SEO
        title={frontmatter.title}
        description={frontmatter.description || post.excerpt}
      />

      <article>
        <header className="mb-8">
          <h2 className="mb-2 text-6xl font-black leading-none font-display">
            {frontmatter.title}
          </h2>
          <p className="text-sm">
            {new Date(frontmatter.date).toLocaleString("ko-KR")}
          </p>
        </header>
        <ReactMarkdown
          className="mb-4 prose lg:prose-lg dark:prose-dark"
          escapeHtml={false}
          source={post.content}
          renderers={{ code: CodeBlock, image: MarkdownImage }}
        />
        <hr className="mt-4" />
        <footer>
          <Bio className="mt-8 mb-16" />
        </footer>
      </article>

      <nav className="flex flex-wrap justify-between mb-10">
        {previousPost ? (
          <Link href={"/post/[slug]"} as={`/post/${previousPost.slug}`}>
            <a className="text-lg font-bold">
              ← {previousPost.frontmatter.title}
            </a>
          </Link>
        ) : (
          <div />
        )}
        {nextPost ? (
          <Link href={"/post/[slug]"} as={`/post/${nextPost.slug}`}>
            <a className="text-lg font-bold">{nextPost.frontmatter.title} →</a>
          </Link>
        ) : (
          <div />
        )}
      </nav>
    </Layout>
  );
}

export async function getStaticPaths() {
  // const paths = getPostsSlugs();

  return {
    paths: [],
    fallback: true,
  };
}

export async function getStaticProps({ params: { slug } }) {
  // const postData = getPostBySlug(slug);
  const postData = await getPost(slug);

  if (!postData.previousPost) {
    postData.previousPost = null;
  }

  if (!postData.nextPost) {
    postData.nextPost = null;
  }
  return { props: postData, revalidate: 10 };
}

async function getPost(slug) {
  try {
    const res = await fetch(
      `${API_URL}/ghost/api/v3/content/posts/slug/${slug}?key=${CONTENT_API_KEY}&fields=title,slug,html,feature_image,published_at,custom_excerpt`
    ).then((r) => r.json());
    const { posts } = res;
    const data = {
      post: {
        excerpt: posts[0].custom_excerpt,
        content: posts[0].html,
      },
      frontmatter: {
        title: posts[0].title,
        description: posts[0].custom_excerpt,
        date: posts[0].published_at,
      },
    };
    return data;
  } catch (error) {
    return error.message[0];
  }
}

const CodeBlock = ({ language, value }) => {
  return (
    <SyntaxHighlighter style={style} language={language}>
      {value}
    </SyntaxHighlighter>
  );
};

const MarkdownImage = ({ alt, src }) => (
  <Image
    alt={alt}
    src={require(`../../content/assets/${src}`)}
    webpSrc={require(`../../content/assets/${src}?webp`)}
    previewSrc={require(`../../content/assets/${src}?lqip`)}
    className="w-full"
  />
);
