'use client';
import React from 'react'
import Nav from '../components/Nav'
import Link from 'next/link';

const page = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [blogsPerPage] = useState(5);
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <div>
        <Nav/>
        {/* {currentBlogs.map(blog => (
        <div key={blog._id.$oid}>
          <h2>{blog.title}</h2>
          <p>{blog.caption}</p>
          <p>{blog.body.type}</p>
        </div>
      ))} */}

{currentBlogs.map((blog) =><div key={blog._id.$oid}>
          <h2>{blog.title}</h2>
          <p>{blog.caption}</p>
          <p>{blog.body.type}</p>
          {/* Render other blog details as needed */}
        </div>)}

      {/* Pagination */}
      <ul>
        {Array.from({ length: Math.ceil(blogs.length / blogsPerPage) }, (_, i) => (
          <li key={i}>
            <Link href={`/?page=${i + 1}`}>
              <a onClick={() => paginate(i + 1)}>{i + 1}</a>
            </Link>
          </li>
        ))}
      </ul>
      this is upsc page
    </div>
  )
}

export async function getServerSideProps(context) {
  const res = await fetch(`http://localhost:5000/api/posts`);
  const blogs = await res.json();

  return {
    props: {
      blogs,
    },
  };
}

export default page
