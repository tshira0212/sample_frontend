import {
	GetStaticProps,
	GetStaticPropsContext,
	InferGetStaticPropsType,
  } from "next";

type TestPageProps = InferGetStaticPropsType<typeof getStaticProps>;

const GetStaticPropsPage = (props:TestPageProps) => {
  const { id, name, email } = props;
  return (
		<>
			<h2>2.GetStaticProps</h2>
			<div>ID:{id}</div>
			<div>ユーザー名：{name}</div>
			<div>メールアドレス：{email}</div>
		</>
	)
}

export const getStaticProps: GetStaticProps = async ({
	params,
  }: GetStaticPropsContext) => {
	const res=await fetch("https://jsonplaceholder.typicode.com/users")
	const users=await res.json()
	const user = users[0]
	return {
	  props: {
		id: user.id,
		name: user.username,
		email: user.email,
	  },
	};
  };

export default GetStaticPropsPage