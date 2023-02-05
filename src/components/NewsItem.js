import React from 'react'

const NewsItem = (props) => {
  let { author, urlToImage, title, description, url, publishedAt } = props.article;
  return (
    author &&
    <div className='col-md-3 my-2'>
      <div className="card" style={{ "width": "18rem" }}>
        <img src={urlToImage} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{title.slice(0, 45)}...</h5>
          <p className="card-text">{description ? `${description.slice(0, 88)}...` : ''}</p>
          <a href={url} className="btn btn-dark btn-sm">Read more</a>
          <p className="card-text"><small className="tsext-muted">Author: {author}</small></p>
        </div>
        <div className="card-footer">
          <small className="text-muted">Published At: {publishedAt.split('T')[0]}</small>
        </div>
      </div>
    </div>
  );
}

export default NewsItem
