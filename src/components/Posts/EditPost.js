import React, { useState } from "react";
import { fetchEditPost, fetchDelete, fetchPosts } from "../../api";
import swal from "sweetalert";

const EditPost = (props) => {
  const { postId, post, setPosts, loggedIn, userToken } = props;
  const [title, setTitle] = useState(post.title);
  const [description, setDescription] = useState(post.description);
  const [price, setPrice] = useState(post.price);
  const [location, setLocation] = useState(post.location);
  const [deliver, setDeliver] = useState(post.willDeliver);

  async function handleSave(e) {
    e.preventDefault();

    try {
      await fetchEditPost(
        postId,
        userToken,
        title,
        description,
        price,
        location,
        deliver
      );
      swal("Sucessfully Edited Post");
      try {
        Promise.all([fetchPosts()]).then(([data]) => {
          setPosts(data.posts);
        });
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      console.error(error);
      swal("Failed to Edit Post");
    }
  }

  async function handleDelete(e) {
    e.preventDefault();
    try {
      await fetchDelete(postId, userToken);
      swal("Post Deleted");
      try {
        Promise.all([fetchPosts()]).then(([data]) => {
          setPosts(data.posts);
        });
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      console.error(error);
      swal("Failed");
    }
  }
  return (
    loggedIn && (
      <div className="misc-style">
        <h2>Edit Post</h2>
        <form>
          <label>
            Title
            <input
              type="text"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>
          <label>
            Description
            <input
              type="text"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>
          <label>
            Price
            <input
              type="text"
              name="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </label>
          <label>
            Location
            <input
              type="text"
              name="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </label>
          <label>
            <input
              type="checkbox"
              name="deliver"
              value={deliver}
              onChange={(e) => setDeliver(e.target.value.trim())}
            />
            <span>Willing to Deliver?</span>
          </label>
          <div>
            <button onClick={handleSave}>Save</button>
            <span>
              <button onClick={handleDelete}>Delete</button>
            </span>
          </div>
        </form>
      </div>
    )
  );
};

export default EditPost;
