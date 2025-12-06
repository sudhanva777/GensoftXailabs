import { notFound } from "next/navigation";
import Link from "next/link";
import { Calendar, ArrowLeft, Tag } from "lucide-react";
import { getPostBySlug, getAllPosts } from "@/lib/blog";
import { RadialGlowBackground } from "@/components/SVGBackgrounds";
import { remark } from "remark";
import html from "remark-html";

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);
  if (!post) {
    return {
      title: "Post Not Found",
    };
  }
  return {
    title: `${post.title} | Apex Tech Innovation Blog`,
    description: post.excerpt,
  };
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const processedContent = await remark().use(html).process(post.content);
  const contentHtml = processedContent.toString();

  return (
    <div className="bg-[#F8FAFC]">
      {/* Hero Section */}
      <section className="section-padding bg-[#F8FAFC] relative overflow-hidden">
        <RadialGlowBackground />
        <div className="container-custom relative z-10">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-[#4F46E5] mb-6 transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Back to Blog</span>
          </Link>
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-sm font-semibold text-[#4F46E5] bg-[#EEF2FF] px-3 py-1 rounded-full flex items-center gap-1"
                >
                  <Tag size={14} />
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 mb-6">
              {post.title}
            </h1>
            <div className="flex items-center gap-4 text-gray-600">
              <Calendar size={20} />
              <span>{new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <article className="section-padding bg-[#F8FAFC]">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-3xl border border-gray-100 shadow-lg p-8 md:p-12 prose prose-lg max-w-none">
              <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
            </div>

            <div className="mt-12 text-center">
              <Link href="/blog" className="btn-primary inline-block">
                Back to All Posts
              </Link>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}

