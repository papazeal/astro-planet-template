import { Octokit } from "@octokit/rest";

export const commitFiles = async (data = {}) => {
  // GitHub Authentication (use a GitHub token with repo access)
  const octokit = new Octokit({
    auth: import.meta.env.GITHUB_ACCESS_TOKEN,
  });

  const owner = import.meta.env.VERCEL_GIT_REPO_OWNER;
  const repo = import.meta.env.VERCEL_GIT_REPO_SLUG;
  const path = "content/data.json"; // File path in the repo
  const content = Buffer.from(data).toString("base64"); // Encode to base64
  const message = "update from planet";

  try {
    // Get the SHA of the existing file (if it exists)
    let sha;
    try {
      const { data } = await octokit.repos.getContent({ owner, repo, path });
      sha = data.sha; // If file exists, store its SHA
    } catch (error) {
      console.log("File does not exist, creating a new one...");
    }

    // Create or update the file
    const response = await octokit.repos.createOrUpdateFileContents({
      owner,
      repo,
      path,
      message,
      content,
      sha, // Include SHA if updating an existing file
    });

    console.log("✅ File committed:", response.data.commit.html_url);
  } catch (error) {
    console.error("❌ Error committing file:", error);
  }
};
