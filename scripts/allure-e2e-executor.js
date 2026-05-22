const fs = require("fs");

fs.mkdirSync("allure-results",  { recursive: true });

fs.writeFileSync("allure-results/executor.json",
    JSON.stringify({
        name: "GitHub Actions",
        type: "e2e",
        buildOrder: Number(process.env.GITHUB_RUN_NUMBER),
        buildName: `Build #${process.env.GITHUB_RUN_NUMBER}`,
        buildUrl: `https://github.com/${process.env.GITHUB_REPOSITORY}/actions/runs/${process.env.GITHUB_RUN_ID}`,
        reportUrl: `https://github.com/${process.env.GITHUB_REPOSITORY_OWNER}/cypress-e2-juicestore`,

    }, null, 2));

console.log("executor.json criado");