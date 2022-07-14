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
    const output = await psi(url, {
      ...(key ? {key} : undefined),
      ...(key ? undefined : {nokey: "true"}),
      strategy,
      format: "cli",
      threshold
    });

    const performance = output.data.lighthouseResult.categories.performance;
    core.setOutput("score", JSON.stringify(performance.score));
    const coreWebVitals = getCoreWebVitals(performance.auditRefs);
    setCoreWebVitals(coreWebVitals);
  } catch (error) {
    core.setFailed(error.message);
    core.setOutput("message", String(error.score));
  }
};

const getCoreWebVitals = (refs) => {
  return refs.reduce((acc, ref, _) => {
    if (coreWebVitalsTypes.includes(ref.acronym))
      acc[ref.acronym] = ref.weight;
  }, {});
}

const setCoreWebVitals = (coreWebVitals) => {
  for (const type of coreWebVitalsTypes) 
      core.setOutput(type.toLowerCase(), JSON.stringify(coreWebVitals[type]));
}

run();
