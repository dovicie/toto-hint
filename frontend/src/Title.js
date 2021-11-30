import React from "react";

async function callApi() {
  const res = await fetch("http://127.0.0.1:8888/20340907");
  const hoge = await res.json();
  // console.log(hoge);
}

class Title extends React.Component {
  render() {
    callApi();
    return <h1>toto hint</h1>;
  }
}

export default Title;
