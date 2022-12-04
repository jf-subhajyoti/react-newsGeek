import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {
    let { author, urlToImage, title, description, url, publishedAt } = this.props.article;
    return (
      author &&
      <div className="card" style={{ "width": "18rem" }}>
        <img src={urlToImage} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}</p>
          <a href={url} className="btn btn-primary btn-sm">For more Details</a>
          <p className="card-text"><small className="text-muted">Author: {author}</small></p>
        </div>
        <div className="card-footer">
          <small className="text-muted">Published At: {publishedAt.split('T')[0]}</small>
        </div>
      </div>
    )
  }
}

export default NewsItem
