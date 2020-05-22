const core = require("@actions/core");
const github = require("@actions/github");

async function run() {
  try {
    const comment = core.getInput("comment");
    const github_token = core.getInput("GITHUB_TOKEN");

    const context = github.context;
    const owner = context.payload.repository.owner.login;
    const repo = context.payload.repository.name;
    const pull_number = context.payload.issue.number;
    const octokit = new github.GitHub(github_token);
    const { data: pullRequest } = await octokit.pulls.get({
      owner,
      repo,
      pull_number
    });
    const branchName = `${pullRequest.head.ref}-${pullRequest.number}-${context.sha}`;
    core.setOutput("test-head", branchName);
    core.setOutput("pr-head", pullRequest.head.ref);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
