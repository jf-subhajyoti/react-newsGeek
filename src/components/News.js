import axios from 'axios';
import React, { Component } from 'react'
import Loader from './Loader';
import NewsItem from './NewsItem';
import PropTypes from 'prop-types';

export class News extends Component {

  baseURL = 'https://newsapi.org/v2';
  heading = 'NewsGeeks - Top Headlines';
  totalResults = 0;
  // pageSize = 0;
  constructor(props) {
    super(props);
    this.state = {
      newsArticles: [],
      loading: true,
      page: 1,
    }
    // this.props.pageSize = props.pageSize;
  }

  componentDidMount() {
    this.getNewsData(1);
  }

  componentDidUpdate = () => {

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
    this.setState({loading: true})

    response.then(res => {
      this.totalResults = res.data.totalResults
      let data = JSON.parse(JSON.stringify(res.data.articles))
      this.setState({ newsArticles: data, loading: false });
    })
      .catch(err => {
        this.setState({loading: false})
        console.log(err)
      })
  }

  displayNewsItems() {
    return this.state.newsArticles.map(article => {
      return (
        <NewsItem key={article.url} article={article} />
      )
    })
  }
  render() {
    return (
      <div className='container my-3'>
        <h1 className='text-center'>{this.heading}</h1>
        {this.state.loading && <Loader />}
        {!this.state.loading && <div className='row'>
          {this.displayNewsItems()}
        </div>}
        <div className='container d-flex justify-content-between'>
          <button type="button" disabled={ this.state.page <= 1 } onClick={() => { this.changePageNo('dec', 1) }} className="btn btn-sm btn-dark">&larr; Previous</button>
          <button type="button" disabled={this.state.page >= Math.ceil(this.totalResults / this.props.pageSize)} onClick={() => { this.changePageNo('inc', 1) }} className="btn btn-sm btn-dark">Next &rarr;</button>
        </div>
      </div>
    )
  }

  changePageNo = (type, no) => {
    if (type === 'inc' && (this.state.page + no) <= Math.ceil(this.totalResults / this.props.pageSize)) {
      this.setState((prevState) => {
        return { page: prevState.page + no };
      });
      this.getNewsData(this.state.page + no);
    }
    else if(type === 'dec' && (this.state.page - no) > 0) {
      this.setState((prevState) => {
        return { page: prevState.page - no };
      });
      this.getNewsData(this.state.page - no);
    }
    else if (type === 'set' && no <= Math.ceil(this.totalResults / this.props.pageSize)) {
      this.setState(prevState => {
        return { page: no };
      });
      this.getNewsData(no);
    }
    setTimeout(() => {
      console.log(this.state.page);
    }, 0)
  }
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
