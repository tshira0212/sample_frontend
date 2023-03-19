import { GetStaticProps } from "next";
import News from "../../components/News";
import ToDo from "../../components/ToDo";
import useSWR from 'swr'
 
// swrはこういったfetcherが必要
const fetcher = (...args) => fetch(...args).then((res) => res.json())

export async function Blog() {
  const {posts,error} = useSWR('https://jsonplaceholder.typicode.com/posts/?_limit=10',fetcher)
    // データに応じた処理
    if (error) return <div>Error!:{error.status}</div>
    if (!posts) return <div>loading...</div>
  return (
    <ul>
      {posts.map((post) => (
        <li>{post.title}</li>
      ))}
    </ul>
  )
}

export default Blog

/*export default function FirstPost() {
    return <div><h1>Blog Page</h1><News news={news} />
    <ToDo></ToDo>
    </div>
  }*/