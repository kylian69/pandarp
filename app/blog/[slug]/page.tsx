import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllPosts, getPost, getPostSlugs, formatDate } from "@/lib/blog";
import { site, absoluteUrl } from "@/lib/site";
import JoinButton from "@/components/JoinButton";
import { Container, Eyebrow, JsonLd } from "@/components/ui";

type Props = { params: Promise<{ slug: string }> };

/** Pré-génère tous les articles au build : rien à rendre à la volée. */
export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: "Article introuvable" };

  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      url: `/blog/${post.slug}`,
      publishedTime: post.date,
      modifiedTime: post.updated ?? post.date,
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const others = getAllPosts()
    .filter((p) => p.slug !== post.slug)
    .slice(0, 2);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: post.title,
          description: post.description,
          inLanguage: "fr-FR",
          datePublished: post.date,
          dateModified: post.updated ?? post.date,
          author: { "@type": "Organization", name: site.name, url: site.url },
          publisher: { "@type": "Organization", name: site.name, url: site.url },
          mainEntityOfPage: absoluteUrl(`/blog/${post.slug}`),
          keywords: post.tags.join(", "),
        }}
      />

      <Container className="pt-14 sm:pt-20">
        <Link
          href="/blog"
          className="eyebrow text-smoke transition-colors hover:text-volt"
        >
          ← Tous les articles
        </Link>

        <article className="mt-8">
          <header className="border-b border-ink pb-10">
            <Eyebrow>
              {formatDate(post.date)} · {post.readingMinutes} min de lecture
            </Eyebrow>
            <h1 className="display mt-4 max-w-4xl text-[clamp(2.25rem,7vw,4.5rem)]">
              {post.title}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-smoke">
              {post.description}
            </p>
          </header>

          <div
            className="prose-fr mt-12"
            dangerouslySetInnerHTML={{ __html: post.html }}
          />
        </article>

        <div className="patch mt-20 px-7 py-12 sm:px-14 sm:py-16">
          <h2 className="display text-[clamp(1.75rem,5vw,2.75rem)] max-w-2xl">
            Le serveur est ouvert à tous
          </h2>
          <p className="mt-5 max-w-xl text-paper/65">
            PandaRP est un serveur GTA 5 RP francophone sur FiveM Enhanced, sans
            whitelist. Vous vous connectez et vous jouez.
          </p>
          <div className="mt-8">
            <JoinButton />
          </div>
        </div>

        {others.length > 0 && (
          <section className="mt-20">
            <Eyebrow>À lire ensuite</Eyebrow>
            <ul className="mt-8 grid gap-8 sm:grid-cols-2">
              {others.map((other) => (
                <li key={other.slug} className="border-t border-ink pt-5">
                  <p className="eyebrow text-smoke">{formatDate(other.date)}</p>
                  <h3 className="mt-3 text-lg font-semibold leading-snug">
                    <Link
                      href={`/blog/${other.slug}`}
                      className="transition-colors hover:text-volt"
                    >
                      {other.title}
                    </Link>
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-smoke">
                    {other.description}
                  </p>
                </li>
              ))}
            </ul>
          </section>
        )}
      </Container>
    </>
  );
}
