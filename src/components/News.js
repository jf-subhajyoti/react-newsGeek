import axios from 'axios';
import React, { Component } from 'react'
import Loader from './Loader';
import NewsItem from './NewsItem';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';

export class News extends Component {

  baseURL = 'https://newsapi.org/v2';
  heading = 'NewsGeeks - Top Headlines';
  // pageSize = 0;
  constructor(props) {
    super(props);
    this.state = {
      newsArticles: [],
      loading: true,
      page: 1,
      totalResults: 0,
    }
    // this.props.pageSize = props.pageSize;
  }

  componentDidMount() {
    let params = {
      country: this.props.country,
      apiKey: '2515553322f640d09259ccf732bbcb0c',
      page: this.state.page,
      pageSize: this.props.pageSize,
      category: this.props.category,
    }

    const response = axios.get(`${this.baseURL}/top-headlines`, {
      params
    });
    // this.setState({loading: true})

    response.then(res => {
      let data = JSON.parse(JSON.stringify(res.data.articles))
      this.setState({ newsArticles: data, loading: false, totalResults: res.data.totalResults });
    })
      .catch(err => {
        this.setState({ loading: false })
        console.log(err)
      })
  }

  getNewsData(pageNo) {
    let params = {
      country: this.props.country,
      apiKey: '2515553322f640d09259ccf732bbcb0c',
      page: this.state.page,
      pageSize: this.props.pageSize,
      category: this.props.category,
    }

    const response = axios.get(`${this.baseURL}/top-headlines`, {
      params
    });
    // this.setState({loading: true})

    response.then(res => {
      let data = JSON.parse(JSON.stringify(res.data.articles))
      this.setState({ newsArticles: this.state.newsArticles.concat(data), loading: false, totalResults: res.data.totalResults });
    })
      .catch(err => {
        this.setState({ loading: false })
        console.log(err)
      })
  };

  fetchData = () => {
    this.setState((prevState) => {
      return { page: prevState.page + 1 };
    });
    setTimeout(() => {
      this.getNewsData();
    }, 0);
  }

  render() {
    return (
      <>
        <h1 className='text-center'>{this.heading}</h1>
        {this.state.loading && <Loader />}
        <InfiniteScroll
          dataLength={this.state.newsArticles.length} //This is important field to render the next data
          next={this.fetchData}
          hasMore={this.state.newsArticles.length !== this.state.totalResults}
          loader={<Loader />}
        >
          <div className='container'>

          </div>
          <div className='row'>
            {this.state.newsArticles.map(article => {
              return (
                <NewsItem key={article.url} article={article} />
              )
            })}
          </div>
        </InfiniteScroll>
        {/* <div className='container d-flex justify-content-between'>
          <button type="button" disabled={ this.state.page <= 1 } onClick={() => { this.changePageNo('dec', 1) }} className="btn btn-sm btn-dark">&larr; Previous</button>
          <button type="button" disabled={this.state.page >= Math.ceil(this.totalResults / this.props.pageSize)} onClick={() => { this.changePageNo('inc', 1) }} className="btn btn-sm btn-dark">Next &rarr;</button>
        </div> */}
      </>
    )
  }

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
