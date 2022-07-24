const core = require("@actions/core");
const psi = require("psi");

const run = async () => {
  try {
    const url = core.getInput("url");
    const urls = core.getInput("urls");
    if (!url && !urls) {
      core.setFailed("Url or Urls is required to run Page Speed Insights.");
      return;
    }

    const key = core.getInput('key');

    const threshold = Number(core.getInput("threshold")) || 70;
    const strategy = core.getInput("strategy") || "mobile";
    // Output a formatted report to the terminal
    console.log(`Running Page Speed Insights for ${url}`);

    if (url && !urls) {
      const output = await psi.output(url, {
        ...(key ? {key} : undefined),
        ...(key ? undefined : {nokey: "true"}),
        strategy,
        format: "cli",
        threshold
      });
  
      core.setOutput("score", output);
    } else {
      const outputs = [];
      const urllist = urls.split(",");

      for (const url of urllist) {
        outputs.push(`### Summary of ${url}`);
        outputs.push(await psi.output(url, {
          ...(key ? {key} : undefined),
          ...(key ? undefined : {nokey: "true"}),
          strategy,
          format: "cli",
          threshold
        }));
        if (key) await sleep(1000 * 1);
        else await sleep(1000 * 30);
      }

      const output = outputs.join("\n");
      core.setOutput("score", output);
    }
  } catch (error) {
    core.setFailed(error.message);
  }
};

const sleep = msec => new Promise(resolve => setTimeout(resolve, msec));

run();
