"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/components/language-provider"
import { posts } from "@/lib/blog-data"

export default function BlogPage() {
  const { t } = useLanguage()
  return (
    <main className="min-h-screen flex flex-col">
      <Header />

      <section className="py-12 md:py-24 bg-gradient-to-b from-green-500 to-green-400">
        <div className="container text-center">
          <h1 className="text-4xl font-bold text-white">Blog</h1>
          <p className="text-white/90 mt-3 max-w-2xl mx-auto">
            Insights on building fast, practical solutions across web, AI, and product.
          </p>
        </div>
      </section>

      <section className="py-12 md:py-24">
        <div className="container">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Card key={post.slug} className="overflow-hidden border-2 hover:border-green-500 transition-colors">
                {/* Use standard img for external placeholders to avoid domain config */}
                <div className="aspect-[16/9] w-full bg-muted">
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
                <CardHeader>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>{new Date(post.date).toLocaleDateString()}</span>
                    <span>{post.author}</span>
                  </div>
                  <CardTitle className="mt-2 text-2xl">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </CardTitle>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="px-2 py-0.5">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{post.excerpt}</p>
                  <div className="mt-4">
                    <Button asChild variant="outline" className="hover:text-green-500 hover:border-green-500">
                      <Link href={`/blog/${post.slug}`}>{t("blog.readmore")}</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}


