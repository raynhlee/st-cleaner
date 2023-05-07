import React from "react";

const Post = (props) => {
  const { postProps } = props;
  const { title, description, price, location, deliver } = postProps;

  return (
    <div className="misc-style">
      <h2>Post</h2>
      <form>
        <label>
          Title
          <input type="text" name="title" value={title} readOnly={!!title} />
        </label>
        <label>
          Description
          <input
            type="text"
            name="description"
            value={description}
            readOnly={!!description}
          />
        </label>
        <label>
          Price
          <input type="text" name="price" value={price} readOnly={!!price} />
        </label>
        <label>
          Location
          <input
            type="text"
            name="location"
            value={location}
            readOnly={!!location}
          />
        </label>
        <label>
          <input
            type="checkbox"
            name="deliver"
            checked={deliver}
            value={deliver ? true : false}
            disabled={!!deliver}
          />
          <span>Willing to Deliver?</span>
        </label>
      </form>
    </div>
  );
};

export default Post;
