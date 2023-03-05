import useSWR from 'swr'
 
// swrはこういったfetcherが必要
const fetcher = (...args) => fetch(...args).then((res) => res.json())

function App() {
  // useStateを利用する感覚で記述
  const { data, error } = useSWR('https://jsonplaceholder.typicode.com/todos/', fetcher)

  // データに応じた処理
  if (error) return <div>Error!:{error.status}</div>
  if (!data) return <div>loading...</div>

  console.log('data', error)

  return (
    <div className="App">
      success!!
      <br />
      <ul>
          {data.map((item) => {
            return (
              <li>
                {item.id}:{item.title}
              </li>
            );
          })}
        </ul>
    </div>
  )
}

export default App