import axios from 'axios';
import React, { useState, useEffect } from 'react'
import Loader from './Loader';
import NewsItem from './NewsItem';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';

import './News.css';

const News = (props) => {

  let baseURL = 'https://newsapi.org/v2', heading = 'NewsGeeks - Top Headlines';

  const [newsArticles, setNewsArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [totalResults, setTotalResults] = useState(true);

  useEffect(() => {
    setPage(1);
    let params = {
      country: props.country,
      apiKey: '2515553322f640d09259ccf732bbcb0c',
      page: page,
      pageSize: props.pageSize,
      category: props.category,
    };

    const response = axios.get(`${baseURL}/top-headlines`, {
      params
    });
    // this.setState({loading: true})

    response.then(res => {
      let articles = JSON.parse(JSON.stringify(res.data.articles));
      setNewsArticles((prevState) => articles);
      setLoading(false);
      setPage(2);
      setTotalResults(res.data.totalResults);
    })
      .catch(err => {
        setLoading(false);
        console.log(err)
      })
  }, []);

  // componentDidMount() {
  //   let params = {
  //     country: this.props.country,
  //     apiKey: '2515553322f640d09259ccf732bbcb0c',
  //     page: this.state.page,
  //     pageSize: this.props.pageSize,
  //     category: this.props.category,
  //   }

  //   const response = axios.get(`${this.baseURL}/top-headlines`, {
  //     params
  //   });
  //   // this.setState({loading: true})

  //   response.then(res => {
  //     let data = JSON.parse(JSON.stringify(res.data.articles))
  //     this.setState({ newsArticles: data, loading: false, totalResults: res.data.totalResults });
  //   })
  //     .catch(err => {
  //       this.setState({ loading: false })
  //       console.log(err)
  //     })
  // }

  const getNewsData = () => {
    let params = {
      country: props.country,
      apiKey: '2515553322f640d09259ccf732bbcb0c',
      page: page,
      pageSize: props.pageSize,
      category: props.category,
    };

    const response = axios.get(`${baseURL}/top-headlines`, {
      params
    });
    // this.setState({loading: true})

    response.then(res => {
      let articles = JSON.parse(JSON.stringify(res.data.articles));
      setNewsArticles((prevState) => prevState.concat(articles));
      setLoading(false);
      setPage(prevState => prevState + 1);
      setTotalResults(res.data.totalResults);
    })
      .catch(err => {
        setLoading(false);
        console.log(err)
      })
  };

  // let fetchData = () => {
  //   // setPage(prevState => prevState + 1);
  //   setTimeout(() => {
  //     getNewsData();
  //   }, 0);
  // }

  return (
    <>
      <h1 className='text-center primary_heading'>{heading}</h1>
      {/* {loading && <Loader />} */}
      <InfiniteScroll
        dataLength={newsArticles.length} //This is important field to render the next data
        next={getNewsData}
        hasMore={newsArticles.length !== totalResults}
        loader={<Loader />}
      >
        <div className='container'>
          <div className='row'>
            {newsArticles.map(article => {
              return (
                <NewsItem key={article.url} article={article} />
              )
            })}
          </div>
        </div>
      </InfiniteScroll>
      {/* <div className='container d-flex justify-content-between'>
        <button type="button" disabled={ this.state.page <= 1 } onClick={() => { this.changePageNo('dec', 1) }} className="btn btn-sm btn-dark">&larr; Previous</button>
        <button type="button" disabled={this.state.page >= Math.ceil(this.totalResults / this.props.pageSize)} onClick={() => { this.changePageNo('inc', 1) }} className="btn btn-sm btn-dark">Next &rarr;</button>
      </div> */}
    </>
  );

  // changePageNo = (type, no) => {
  //   if (type === 'inc' && (this.state.page + no) <= Math.ceil(this.totalResults / this.props.pageSize)) {
  //     this.setState((prevState) => {
  //       return { page: prevState.page + no };
  //     });
  //     this.getNewsData(this.state.page + no);
  //   }
  //   else if(type === 'dec' && (this.state.page - no) > 0) {
  //     this.setState((prevState) => {
  //       return { page: prevState.page - no };
  //     });
  //     this.getNewsData(this.state.page - no);
  //   }
  //   else if (type === 'set' && no <= Math.ceil(this.totalResults / this.props.pageSize)) {
  //     this.setState(prevState => {
  //       return { page: no };
  //     });
  //     this.getNewsData(no);
  //   }
  //   setTimeout(() => {
  //     console.log(this.state.page);
  //   }, 0)
  // }
}

News.propTypes = {
  category: PropTypes.string,
  pageSize: PropTypes.number,
  country: PropTypes.string,
}

News.defaultProps = {
  category: 'general',
  pageSize: 15,
  country: "in",
}

export default News
