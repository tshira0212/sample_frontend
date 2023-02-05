import News from "../../components/News";

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


export default function FirstPost() {
    return <div><h1>Blog Page</h1><News news={news} /></div>
  }