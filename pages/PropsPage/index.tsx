import News from "../../components/News"
import {
	GetStaticProps,
	GetStaticPropsContext,
	InferGetStaticPropsType,
  } from "next";

type TestPageProps = InferGetStaticPropsType<typeof getStaticProps>;

type Post = {
	id: number;
	title: string;
	body: string;
  };
  
  type Props = {
	posts: Post[];
  };

const PropsPage = ({posts}:Props) => {
	return (
		<>
			<header>
				<h2>3.PropsPage</h2>
			</header>
			<News news={posts}/>
		</>
	)
}

export const getStaticProps: GetStaticProps = async ({
	params,
  }: GetStaticPropsContext) => {
	const res=await fetch("https://jsonplaceholder.typicode.com/posts")
	const posts=await res.json()
	return {
		props: {posts}
	  };
};
  

export default PropsPage