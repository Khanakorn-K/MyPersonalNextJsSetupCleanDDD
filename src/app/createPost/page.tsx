import CreatePostIndex from "@/features/createPost/CreatePostIndex";
import { Suspense } from "react";

const page = () => {
  return <Suspense fallback={<div>Loading...</div>}>
    <CreatePostIndex />
  </Suspense>
};

export default page;
