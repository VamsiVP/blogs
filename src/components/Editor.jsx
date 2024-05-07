import React, { useState } from "react";
import { json, useNavigate } from "react-router-dom";

const Editor = ({blogDetails}) => {
  const [title, setTitle] = useState(blogDetails.title);
  const [body, setBody] = useState(blogDetails.body);
  const [author, setAuthor] = useState(blogDetails.author);
  const [id, setId] =useState(blogDetails.id)
  const [isPending, setisPending] = useState(false);

  let navigate = useNavigate();
  

  const submitted = (e) => {
    e.preventDefault();
    const details = { title, body, author, id };
    setisPending(true);
    fetch("http://localhost:8000/blogs/" + id, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(details),
    }).then(() => {
      console.log("Successfully submitted");
      setTimeout(() => {
        setisPending(false);
        navigate("/"); //This is used to navigate between the pages after submitting the form it will gies tio homePage.
      }, 1000);
    });
  };
  return (
    <div className="creatingBlog" style={{ marginTop: "7rem" }}>
      <div
        className="formMain"
        style={{ width: "600px", margin: "auto", border: "2px solid skyblue" }}
      >
        <form
          onSubmit={submitted}
          className="my-5"
          style={{ width: "400px", margin: "auto" }}
        >
          <div className="form-group mt-2">
            <label className="form-label">
              <b>Title</b>
            </label>
            <input
              className="form-control"
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="form-group mt-2">
            <label className="form-label">
              <b>Blogs body</b>
            </label>
            <textarea
              className="form-control"
              type="text"
              required
              value={body}
              onChange={(e) => setBody(e.target.value)}
            />
          </div>
          <div className="form-group mt-2">
            <label className="form-label">
              <b>Authors</b>
            </label>
            <input
              className="form-control"
              style={{ width: "200px", textAlign: "center" }}
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
          </div>
          <div className="mt-2">
            {!isPending && <input type="submit" className="btn btn-success" />}
            {isPending && (
              <button
                disabled
                className="btn "
                style={{ backgroundColor: "deeppink" }}
              >
                <span className="spinner-border spinner-border-sm text-white"></span>{" "}
                <span className="text-white">Submitting...</span>
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Editor;
