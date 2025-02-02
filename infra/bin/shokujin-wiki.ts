#!/usr/bin/env node
import * as dotenv from "dotenv";
import * as cdk from "aws-cdk-lib";
import { ShokujinWikiStack } from "../lib/shokujin-wiki-stack";

dotenv.config();

const app = new cdk.App();
new ShokujinWikiStack(app, "ShokujinWikiStack", {
  certificateArn: process.env.RESOURCE_CERTIFICATE_ARN as string,
});
