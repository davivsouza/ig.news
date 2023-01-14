import { createClient } from '../../services/prismic'
import { GetStaticProps } from 'next'
import { RichText } from 'prismic-dom'
import Head from 'next/head'
import styles from './styles.module.scss'
import Link from 'next/link'

type Post = {
  slug: string
  title: string
  excerpt: string
  updatedAt: string
}

interface PostPops {
  posts: Post[]
}

export default function Posts({ posts }: PostPops) {
  return (
    <>
      <Head>
        <title>
          Ignews | Posts
        </title>
      </Head>
      <main className={styles.container}>
        <div className={styles.posts} >
          {posts.map(post => (
            <Link href={`/posts/${post.slug}`} key={post.slug}>
              <time>{post.updatedAt}</time>
              <strong>{post.title}</strong>
              <p>{post.excerpt}</p>
            </Link>
          ))}
        </div>
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const client = createClient()

  const response = await client.getAllByType('post')

  const posts = response.map(post => {
    return {
      slug: post.uid,
      title: RichText.asText(post.data.title),
      excerpt: post.data.content.find((content: { type: string, }) => content.type === 'paragraph')?.text ?? "",
      updatedAt: new Date().toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      })
    }
  })
  // console.log(JSON.stringify(response, null, 2));

  return {
    props: {
      posts
    },
  }


}