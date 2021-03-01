import Link from "next/link";
import React from "react";

const Posts = ({ posts }) => {
  return (
    <>
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
    </>
  );
};

export default Posts;
