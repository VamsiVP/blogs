import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useFetch from "./useFetch";
import Editor from "./Editor";

const BlogDetails = () => {
  const [update, setUpdate] = useState(false);
  const [editable, setEdit] = useState(false);
  const { id } = useParams();
  const {
    data: blog,
    err,
    isPending,
  } = useFetch("http://localhost:8000/blogs/" + id);

  const navigate = useNavigate();

  const deleteBlog = () => {
    fetch("http://localhost:8000/blogs/" + blog.id, {
      method: "DELETE",
    }).then(() => {
      console.log(blog.id);
      navigate("/");
    });
  };

  const edit = () => {
    setEdit(true);
  };

  const UpdateBlog = () => {
    // fetch("http://localhost:8000/blogs/" + blog.id, {
    //   method: "PUT",
    //   body: JSON.stringify(),
    // })
    //   .then(() => {
    //     console.log("Working correctly");
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  };

  // function updateItem(id, updatedItem) {
  //   return fetch(`${baseUrl}/${id}`, {
  //     method: "PUT",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(updatedItem),
  //   }).then((response) => response.json());
  // }

  return (
    <div className="blodDetails">
      {/* {console.log(blog)} */}
      {editable ? (
        <>
          <Editor blogDetails={blog} />
        </>
      ) : (
        <>
          {isPending && <div>Loading...</div>}
          {err && <div>{err}</div>}
          <article className="pt-5">
            <h3
              className="p-2 px-3 py-3 text-white text-center m-auto tlt mt-5"
              style={{
                backgroundColor: "blueviolet",
                width: "fit-content",
                borderRadius: "10px",
                fontWeight: "bolder",
              }}
            >
              {blog.title}
            </h3>
            <div className="card mt-4 me-4">
              <div className="card-body px-4">
                <h4 className="px-4 py-2 my-3 mb-4 authr">
                  Author {blog.author}
                </h4>
                <p>{blog.body}</p>
                <button className="btn btn-danger me-3" onClick={deleteBlog}>
                  Delete
                </button>
                <button className="btn btn-success" onClick={edit}>
                  Edit
                </button>
              </div>
            </div>
          </article>
        </>
      )}
    </div>
  );
};

export default BlogDetails;
