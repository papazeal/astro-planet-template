import { Octokit } from "@octokit/rest";

export const commitFiles = async (data = {}) => {
  // GitHub Authentication (use a GitHub token with repo access)
  const octokit = new Octokit({
    auth: import.meta.env.GITHUB_ACCESS_TOKEN,
  });

  const owner = "papazeal"; // Replace with repo owner
  const repo = "dummy"; // Replace with repo name
  const path = "test/data/data.json"; // File path in the repo
  const branch = "master"; // Target branch
  const content = Buffer.from(JSON.stringify(data)).toString("base64"); // Encode to base64
  const message = "Added example.txt";

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
      branch,
      sha, // Include SHA if updating an existing file
    });

    console.log("✅ File committed:", response.data.commit.html_url);
  } catch (error) {
    console.error("❌ Error committing file:", error);
  }
};
