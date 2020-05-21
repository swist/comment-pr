const core = require("@actions/core");
const github = require("@actions/github");

async function run() {
  try {
    const comment = core.getInput("comment");
    const github_token = core.getInput("GITHUB_TOKEN");

    const context = github.context;
    if (context.issue.pull_request == null) {
      core.setFailed("No issue request found.");
      return;
    }
    const issue_number = context.payload.issue.number;

    const octokit = new github.GitHub(github_token);
    const new_comment = octokit.issues.createComment({
      ...context.repo,
      issue_number: issue_number,
      body: comment
    });
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
