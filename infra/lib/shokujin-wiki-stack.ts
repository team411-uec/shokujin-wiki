import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as s3 from "aws-cdk-lib/aws-s3";
import * as cloudfront from "aws-cdk-lib/aws-cloudfront";
import * as cloudfront_origins from "aws-cdk-lib/aws-cloudfront-origins";
import * as certificatemanager from "aws-cdk-lib/aws-certificatemanager";

interface ShokujinWikiStackProps extends cdk.StackProps {
  certificateArn: string;
}

export class ShokujinWikiStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: ShokujinWikiStackProps) {
    super(scope, id, props);

    const certificate = certificatemanager.Certificate.fromCertificateArn(
      this,
      "ResourceCertificate",
      props.certificateArn,
    );

    const bucket = new s3.Bucket(this, "ResourceBucket", {
      bucketName: `shokujin-wiki-resources-${this.account}`,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
      cors: [
        {
          allowedMethods: [s3.HttpMethods.POST],
          allowedOrigins: ["*"],
        },
      ],
    });

    new cloudfront.Distribution(this, "Distribution", {
      defaultBehavior: {
        origin:
          cloudfront_origins.S3BucketOrigin.withOriginAccessControl(bucket),
        viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        cachePolicy: cloudfront.CachePolicy.CACHING_OPTIMIZED,
      },
      certificate: certificate,
      domainNames: ["s3.shokujin.com"],
    });
  }
}
