import axios from 'axios';
import React, { Component } from 'react'
import NewsItem from './NewsItem'

export class News extends Component {

  baseURL = 'https://newsapi.org/v2';
  constructor() {
    super();
    this.state = {
      newsArticles: []
    }
    
  }

  componentDidMount() {
    const response = axios.get(`${this.baseURL}/top-headlines`, {
      params: {
        country: 'us',
        apiKey: '2515553322f640d09259ccf732bbcb0c'
      }
    });

    response.then(res => {
      let data = JSON.parse(JSON.stringify(res.data.articles))
      this.setState({ newsArticles: data });
    })
      .catch(err => {
        console.log(err)
      })
  }

  displayNewsItems() {
    return this.state.newsArticles.map(article => {
      return (
        <div key={article.url} className='col-md-4'>
          <NewsItem article={article} />
        </div>
      )
    })
  }
  render() {
    return (
      <div className='container my-3'>
        <div className='row'>
          {this.displayNewsItems()}
        </div>
      </div>
    )
  }
}

export default News
