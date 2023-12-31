"use client";
import Feed from "@/components/Feed";
export const revalidate = 0
const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        Discover & Share
        <br className="max-md:hidden" />
        <span className="orange_gradient"> AI-Powered Prompts</span>
      </h1>
      <p className="desc text-center">
        Promtopia is an open-source AI prompting tool for modern world to
        Discover and Share AI prompts for creative writing.
      </p>

      {/* Feed */}
      <Feed />
    </section>
  );
};

export default Home;
