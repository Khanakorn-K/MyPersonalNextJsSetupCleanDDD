import PostIndex from "@/features/post/PostIndex";
import React, { Suspense } from "react";

const Page = () => {
  return <Suspense fallback={<div>Loading post...</div>}>
    <PostIndex />
  </Suspense>
};

export default Page;
