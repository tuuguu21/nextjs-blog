import React, { useState } from "react";
import Link from "next/link";

import { Layout, Bio, SEO } from "@components/common";
import { getSortedPosts, getPostsByApi } from "@utils/posts";

import Posts from "../components/common/Posts/Posts";
import Paginate from "../components/common/Posts/Paginate";

export default function Home({ posts }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (number) => setCurrentPage(number);

  return (
    <Layout>
      <SEO title="모든 게시물" />
      <Bio className="my-14" />
      <Posts posts={currentPosts} />
      <Paginate
        postPerPage={postsPerPage}
        totalPosts={posts.length}
        paginate={paginate}
      />
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
