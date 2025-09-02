"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { posts } from "@/lib/blog-data"
import { notFound } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/components/language-provider"

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const { t } = useLanguage()
  const post = posts.find((p) => p.slug === params.slug)
  if (!post) return notFound()

  return (
    <main className="min-h-screen flex flex-col">
      <Header />

      <article className="py-10 md:py-16">
        <div className="container max-w-3xl">
          <div className="mb-6">
            <Button asChild variant="outline" className="hover:text-green-500 hover:border-green-500">
              <Link href="/blog">← {t("blog.back")}</Link>
            </Button>
          </div>
          <h1 className="text-4xl font-bold mb-3">{post.title}</h1>
          <p className="text-muted-foreground mb-6">
            {new Date(post.date).toLocaleDateString()} • {post.author}
          </p>
          <div className="mb-8">
            <img src={post.imageUrl} alt={post.title} className="w-full h-auto rounded-md" />
          </div>
          <div className="prose prose-neutral dark:prose-invert max-w-none">
            {post.content?.map((para, idx) => (
              <p key={idx}>{para}</p>
            ))}
          </div>
        </div>
      </article>

      <Footer />
    </main>
  )
}


