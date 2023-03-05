import { GetStaticProps } from "next";
import News from "../../components/News";
import ToDo from "../../components/ToDo";

const news = [
  {
    id: "1",
    title: "test1",
    content: "texttext1",
  },
  {
    id: "2",
    title: "test2",
    content: "texttext2",
  },
];

export async function getStaticProps() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts/?_limit=10')
  const posts = await res.json()
  return {
    props:{posts},
  }
}

function Blog({ posts }) {
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