// Import using ES modules syntax
import { S3, PutObjectCommand } from "@aws-sdk/client-s3";

export const writeToR2 = async (
  fileName,
  contentType,
  content,
  cache = true
) => {
  // Configure the S3 client to use Cloudflare R2
  const s3 = new S3({
    endpoint: import.meta.env.R2_ENDPOINT,
    region: "auto", // R2 doesn't use regions like AWS, 'auto' is typically used
    credentials: {
      accessKeyId: import.meta.env.R2_ACCESS_KEY_ID,
      secretAccessKey: import.meta.env.R2_SECRET_ACCESS_KEY,
    },
  });

  const command = new PutObjectCommand({
    Bucket: import.meta.env.R2_BUCKET,
    Key: import.meta.env.PROJECT_ID + "/" + fileName,
    Body: content,
    ContentType: contentType, // Set appropriate content type
    ACL: "public-read",
    CacheControl: cache ? "" : "no-cache",
  });

  try {
    const response = await s3.send(command);
    console.log("Upload successful:", response);
    return `${import.meta.env.R2_CUSTOM_DOMAIN}/${
      import.meta.env.PROJECT_ID
    }/${fileName}`;
  } catch (error) {
    console.error("Upload failed:", error.message);
  }
};
