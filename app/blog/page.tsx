import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts, formatDate } from "@/lib/blog";
import { Container, PageHeader } from "@/components/ui";

export const metadata: Metadata = {
  title: "Actualités et guides",
  description:
    "Guides FiveM Enhanced, conseils pour débuter le roleplay sur GTA 5 et actualités du serveur PandaRP.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Actualités et guides — PandaRP",
    description:
      "Guides FiveM Enhanced, conseils de roleplay et actualités du serveur.",
    url: "/blog",
  },
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <>
      <PageHeader
        eyebrow="Actualités et guides"
        title="Le journal du serveur"
        lead="Guides d'installation, conseils de roleplay et avancées du développement."
      />

      <Container>
        {posts.length === 0 ? (
          <p className="border-t border-ink pt-8 text-smoke">
            Les premiers articles arrivent bientôt.
          </p>
        ) : (
          <ul className="border-t border-ink">
            {posts.map((post) => (
              <li key={post.slug} className="border-b border-haze">
                <Link
                  href={`/blog/${post.slug}`}
                  className="group grid gap-3 py-8 lg:grid-cols-12 lg:gap-10"
                >
                  <div className="lg:col-span-3">
                    <p className="eyebrow text-smoke">{formatDate(post.date)}</p>
                    <p className="eyebrow mt-1 text-smoke">
                      {post.readingMinutes} min de lecture
                    </p>
                  </div>
                  <div className="lg:col-span-9">
                    <h2 className="display text-[clamp(1.5rem,3.5vw,2.25rem)] transition-colors group-hover:text-seal">
                      {post.title}
                    </h2>
                    <p className="mt-3 max-w-2xl leading-relaxed text-smoke">
                      {post.description}
                    </p>
                    {post.tags.length > 0 && (
                      <ul className="mt-4 flex flex-wrap gap-2">
                        {post.tags.map((tag) => (
                          <li
                            key={tag}
                            className="rounded-full border border-haze px-3 py-1 font-mono text-xs text-smoke"
                          >
                            {tag}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </Container>
    </>
  );
}
