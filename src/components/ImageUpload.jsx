import React, { Component } from "react";
import Amplify from "aws-amplify";
import aws_exports from "../aws-exports";
import { withAuthenticator, S3Album } from "aws-amplify-react";

Amplify.configure(aws_exports);
Amplify.Logger.LOG_LEVEL = "DEBUG";

class ImageUpload extends Component {
  render() {
    return <S3Album path="videos/" picker />;
  }
}

export default ImageUpload;
