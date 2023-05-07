import React, { useState, useEffect } from "react";
import { fetchPosts } from "../../api";
import Post from "./Post";
import Message from "./Message";
import EditPost from "./EditPost";
import AppBarWithSearch from "../helpers/AppBarWithSearch";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Button from "@material-ui/core/Button";
import Drawer from "@material-ui/core/Drawer";

const useStyles = makeStyles((theme) => ({
  postsWrapper: {
    display: "flex",
  },
  root: {
    maxWidth: "75%",
    margin: "auto",
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    verticalAlign: "bottom",
    height: 20,
    width: 20,
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: theme.spacing(1, 2),
  },
  link: {
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline",
    },
  },
}));

const ViewPosts = (props) => {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const classes = useStyles();
  const [state, setState] = useState({
    top: false,
  });
  const [messageState, setMessageState] = useState({
    top: false,
  });

  const { userToken, loggedIn, message, setMessage, username } = props;

  useEffect(() => {
    try {
      Promise.all([fetchPosts()]).then(([data]) => {
        setPosts(data.posts);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const toggleViewPost = (anchor, open) => (event) => {
    setState({ ...state, [anchor]: open });
  };

  const toggleMessageDrawer = (anchor, open) => (event) => {
    setMessageState({ ...messageState, [anchor]: open });
  };

  const postMatches = (post, text) => {
    const lowerCaseText = text.toLowerCase();
    const author = post.author.username.toLowerCase();
    const description = post.description.toLowerCase();
    const location = post.location.toLowerCase();
    const title = post.title.toLowerCase();
    if (
      author.includes(lowerCaseText) ||
      description.includes(lowerCaseText) ||
      location.includes(lowerCaseText) ||
      title.includes(lowerCaseText)
    ) {
      return true;
    } else {
      return false;
    }
  };

  const filteredPosts = posts.filter((post) => postMatches(post, searchTerm));
  const displayPosts = searchTerm ? filteredPosts : posts;

  return (
    <div>
      <AppBarWithSearch
        posts={posts}
        setPosts={setPosts}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        loggedIn={loggedIn}
        userToken={userToken}
      />
      <div className={classes.root}>
        {displayPosts.map((post, index) => {
          return (
            <Accordion key={index}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <div>{post.title}</div>
                <div>{post.description}</div>
              </AccordionSummary>
              <AccordionDetails>
                Price: {post.price}
                <br />
                Delivery: {post.willDeliver ? "Available" : "Not Available"}
                <br />
                Location: {post.location}
              </AccordionDetails>
              {loggedIn && username !== post.author.username ? (
                <>
                  <Button onClick={toggleMessageDrawer(post._id, true)}>
                    Send Message
                  </Button>
                  <Drawer
                    anchor={"top"}
                    open={messageState[post._id]}
                    onClose={toggleMessageDrawer(post._id, false)}
                  >
                    <Message
                      key={post._id}
                      userToken={userToken}
                      loggedIn={loggedIn}
                      message={message}
                      setMessage={setMessage}
                      postId={post._id}
                    />
                  </Drawer>
                </>
              ) : null}
              <Button onClick={toggleViewPost(post._id, true)}>
                View Post
              </Button>
              <Drawer
                anchor={"top"}
                open={state[post._id]}
                onClose={toggleViewPost(post._id, false)}
              >
                <div>
                  {username === post.author.username ? (
                    <EditPost
                      postId={post._id}
                      post={post}
                      posts={posts}
                      setPosts={setPosts}
                      loggedIn={loggedIn}
                      userToken={userToken}
                    />
                  ) : (
                    <Post
                      postId={post._id}
                      post={post}
                      setPosts={setPosts}
                      posts={posts}
                    />
                  )}
                </div>
              </Drawer>
            </Accordion>
          );
        })}
      </div>
    </div>
  );
};

export default ViewPosts;
