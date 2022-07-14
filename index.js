const core = require("@actions/core");
const psi = require("psi");

const coreWebVitalsTypes = ["FCP", "TTI", "SI", "TBT", "LCP", "CLS", "FMP"];

const run = async () => {
  try {
    const url = core.getInput("url");
    if (!url) {
      core.setFailed("Url is required to run Page Speed Insights.");
      return;
    }

    const key = core.getInput('key');

    const threshold = Number(core.getInput("threshold")) || 70;
    const strategy = core.getInput("strategy") || "mobile";
    // Output a formatted report to the terminal
    console.log(`Running Page Speed Insights for ${url}`);

    const output = await psi.output(url, {
      ...(key ? {key} : undefined),
      ...(key ? undefined : {nokey: "true"}),
      strategy,
      format: "cli",
      threshold
    });


    core.setOutput("score", output);
  } catch (error) {
    core.setFailed(error.message);
  }
};

const getCoreWebVitals = (refs) => {
  return refs.reduce((acc, ref, _) => {
    console.log(ref);
    console.log(acc);
    if (coreWebVitalsTypes.includes(ref.acronym))
      acc[ref.acronym] = ref.weight;
    return acc;
  }, {});
}

const setCoreWebVitals = (coreWebVitals) => {
  for (const type of coreWebVitalsTypes) 
      core.setOutput(type.toLowerCase(), JSON.stringify(coreWebVitals[type]));
}

run();
