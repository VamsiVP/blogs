import React from 'react';
import { Link } from "react-router-dom";

const Blog = ({blog}) => {

  return (
    <div className='Container blog my-5' style={{ marginTop: "13rem"}}>
      <div className="container ps-5 py-4">
        <Link to={`/blogs/${blog.id}`} style={{textDecoration: 'none'}} >
          <h4 className='text-success'>{blog.title}</h4>
          <p>Written by {blog.author}</p>
        </Link>
        </div>
    </div>
  )
}

export default Blog