import React, { Component } from "react";
import "./App.css";
import Amplify, { Storage, API, graphqlOperation } from "aws-amplify";
import aws_exports from "./aws-exports";
import { withAuthenticator, S3Album } from "aws-amplify-react";
import ListTodosBox from "./components/listTodosBox";
import { listTodos } from "./graphql/queries";
import ListUsers from "./components/UserContainer";
import ImageUpload from "./components/ImageUpload";

Amplify.configure(aws_exports);
Storage.configure({ level: "private" });

class App extends Component {
  render() {
    return (
      <div className="App">
        <S3Album level="private" path="" />
        <ListTodosBox />
        <ImageUpload />
      </div>
    );
  }
}

export default withAuthenticator(App, true);
