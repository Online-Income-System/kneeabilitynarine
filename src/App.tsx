import React from "react";
import type { RouteRecord } from "vite-react-ssg";
import Layout from "./Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import { BLOG_POSTS } from "./data/blog";

export const routes: RouteRecord[] = [
  {
    path: "/",
    element: <Layout />,
    entry: "src/Layout.tsx",
    children: [
      { index: true, Component: Home },
      { path: "about", Component: About },
      { path: "services", Component: Services },
      { path: "contact", Component: Contact },
      { path: "blog", Component: Blog },
      {
        path: "blog/:slug",
        Component: BlogPost,
        entry: "src/pages/BlogPost.tsx",
        getStaticPaths: () => BLOG_POSTS.map((p) => `blog/${p.slug}`),
      },
    ],
  },
];

export default routes;
