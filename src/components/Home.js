import React from "react";

const styles = {
  position: "absolute",
  top: 0,
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  width: "100vw",
  height: "100vh",
  textAlign: "center",
  paddingLeft: "100px",
  paddingRight: "100px",
};

const Home = ({ username, loggedIn }) => {
  return (
    <div style={styles}>
      <div>
        <h1>Welcome to Stranger's things</h1>
        {loggedIn ? <h2>You are logged in as {username}</h2> : null}
      </div>
    </div>
  );
};

export default Home;
