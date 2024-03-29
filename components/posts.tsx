import Link from 'next/link'
import { getPosts } from '@/lib/newt'
import type { Post } from '@/types/post'
import styles from '@/styles/components/Posts.module.scss'

export default function Posts({
    posts,
    current,
    filter
  }: {
    posts: Post[],
    current: string,
    filter: string,
  }) {
  let detectCurrent = (post: Post) => {
    if (current === post.slug) {
      return (
        <span className={`${styles['anchor']} ${styles['is-text']}`}>
          <p className={styles['image']}>
            <img
              src={post.thumbnail.src}
              width={post.thumbnail.width}
              height={post.thumbnail.height}
              alt={post.title}
              // quality={60}
              // priority={true}
              // unoptimized
            />
          </p>
          <section className="content">
            <h2 className={styles['title']}>{post.title}</h2>
            <div className={styles['meta']}>
              <p className={styles['date']}>{post.date}</p>
              <p className={styles['category']}>{post.categories.map((object: { name: string }) => object.name).join(', ')}</p>
            </div>
          </section>
        </span>
      )
    } else {
      return (
        <Link href={`/post/${post.slug}`} className={`${styles['anchor']} ${styles['is-link']}`}>
          <p className={styles['image']}>
            <img
              src={post.thumbnail.src}
              width={post.thumbnail.width}
              height={post.thumbnail.height}
              alt={post.title}
              // quality={60}
              // priority={true}
              // unoptimized
            />
          </p>
          <section className="content">
            <h2 className={styles['title']}>{post.title}</h2>
            <div className={styles['meta']}>
              <p className={styles['date']}>{post.date}</p>
              <p className={styles['category']}>{post.categories.map((object: { name: string }) => object.name).join(', ')}</p>
            </div>
          </section>
        </Link>
      )
    }
  }

  let filterPosts = posts.filter(function (post) {
    let isShow = false
    post.categories.map((thisCategory) => {
      if (filter === thisCategory.name) isShow = true
    })
    if (filter === 'Front-end') isShow = true
    return isShow
  })

  return (
    <>
      <ul className={styles['posts']}>
        {filterPosts.map((post) => {
          return (
            <li key={post._id} className={styles['posts__item']}>
              {detectCurrent(post)}
            </li>
          )
        })}
      </ul>
    </>
  )
}

export const getStaticProps = async () => {
  const posts = await getPosts()
  return {
    props: {
      posts,
    },
  }
}
