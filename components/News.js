function News(props) {
    return (
      <div>
        <ul>
          {props.news.map((item) => {
            return (
              <li>
                {item.id}:{item.title}:{item.content}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
  
  export default News;