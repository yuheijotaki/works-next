import Head from 'next/head'
import Link from 'next/link'
import { getPosts, getPostBySlug } from '@/lib/newt'
import type { Post } from '@/types/post'
import Posts from '@/components/posts'
import nl2br from 'react-nl2br'
import styles from '@/styles/Home.module.scss'

// export default function Home({ posts }: { posts: Post[] }) {
export default function Post({ post, posts }: { post: Post, posts: Post[] }) {
  return (
    <>
      <Head>
        <title>{post.title}</title>
        <meta name="description" content="投稿詳細ページです" />
      </Head>
      <main className={styles.main}>
        <h1>{post.title}</h1>
        <p>{nl2br(post.titleCustom)}</p>
        <p>{post.slug}</p>
        <p>{post.date}</p>
        <p>{post.url}</p>
        <p>{post.categories.map((object: { name: string }) => object.name).join(', ')}</p>
        <p>{nl2br(post.credit)}</p>
        <p>{post.colorBackground}</p>
        <p>{post.colorText}</p>
        <p>{post.colorCustom}</p>
        <p>{post.archive
          ? 'archive true'
          : 'archive false'
        }</p>
        <p>{post.notAvailable
          ? 'notAvailable true'
          : 'notAvailable false'
        }</p>
        <p>{post.thumbnail.src}</p>
        <ul>
          <li>{post.images.map((object: { src: string }) => object.src)}</li>
        </ul>
      </main>

      <Posts posts={ posts }></Posts>
      <p><Link href={'/'}>Back to Index</Link></p>
    </>
  )
}

export const getStaticPaths = async () => {
  const posts = await getPosts()
  return {
    paths: posts.map((post) => ({
      params: {
        slug: post.slug,
      },
    })),
    fallback: false,
  }
}

export const getStaticProps = async ({
  params,
}: {
  params: { slug: string }
}) => {
  const { slug } = params
  const post = await getPostBySlug(slug)
  const posts = await getPosts()
  return {
    props: {
      post,
      posts,
    },
  }
}
