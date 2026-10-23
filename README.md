# C60 · Capstones: From App to Engineering Team

Runs a local capstone evidence gate combining task, revision, artifact hash, tests, build, and review. It does not launch a remote engineering team. Each run starts from a fresh local seed. The run journal stores results, not production workflow state.

## Concepts students will learn

- Coordinator and worker roles have explicit contracts
- Completion needs independently checked artifacts
- Acceptance is not merge or deployment

## Configure and run

Use Node.js 24 or later. In PowerShell, from this repository's folder:

```powershell
node --version
npm ci
Copy-Item .env.example .env
notepad .env
```

No API key is required for the local experiment. Optional live commentary requires your own API key, agent ID and environment ID. It explains the local result; it does not activate the integration discussed in the lesson.

For the optional live path, set your API key, then run npm run setup if you do not already have resource IDs. The script creates the environment before a text-only agent, saves each ID immediately, and reuses IDs already configured. It uses CLAUDE_MODEL or the source default; choose a model available to your account. An uncertain network failure may have created a resource: inspect your account before retrying.

```powershell
npm start
```

Open `http://127.0.0.1:3060`. Navigation leads to `/guide.html#learning`, `/guide.html#run-guide`, `/architecture.html`, and the application lab. If you change `PORT`, use the configured port. Keep the terminal running; stop with Ctrl+C. `npm run dev` also starts the web application.

Select the first scenario, inspect its editable fields, press Run experiment, and compare the outcome and evidence with the table above. Select another scenario to investigate the boundary condition.

## Create your .env file

Copy `.env.example` to `.env` and enter your own values. Do not commit the real file. Restart the server after editing it. The example contains safe placeholders; optional settings may be left blank to use source defaults. Resource IDs and keys stay on the server.

```dotenv
ANTHROPIC_API_KEY=your_api_key
CLAUDE_MANAGED_AGENT_ID=your_agent_id
CLAUDE_MANAGED_ENVIRONMENT_ID=your_environment_id
PORT=3060
```

## How the application was developed

The browser collects inputs; the Node host validates requests; the lesson implementation produces observable evidence. The architecture page walks through the real source with numbered steps, prerequisite configuration, source filenames and code excerpts.

### Lesson implementation

[src/lesson.ts](https://github.com/luiscoco/Udemy-claude-managed-agents-lesson-c60-app/blob/main/src/lesson.ts)

```typescript
  async run(input) {

const actualHash=hash(text(input,"artifact")),claimedHash=hash(text(input,"claimedArtifact")),complete=flag(input,"allChecksComplete");
const accepted=complete&&actualHash===claimedHash&&number(input,"testExit")===0&&number(input,"buildExit")===0&&flag(input,"reviewApproved");
return report(!complete?"incomplete":accepted?"passed":"rejected",accepted?"Evidence accepted for the next authorized host gate":"Capstone acceptance requirements are not satisfied",{accepted,taskId:"capstone-demo",revision:"reviewed-head",actualHash,claimedHash,checks:{tests:number(input,"testExit"),build:number(input,"buildExit"),review:flag(input,"reviewApproved"),complete},merged:false,deployed:false},["Freeze task and revision bindings","Read actual artifact bytes","Bind independent tests and build to the same bytes","Require review and full check coverage","Keep merge and deployment as separate authorized operations"]);

  }
};
```

Read the architecture page for the remaining source excerpts and explanations, including input handling and optional provider behavior. The diagram describes this application, rather than implying that an external integration has been implemented.

## Validation

```powershell
npm test
python scripts/verify-walkthrough.py
```

The source hash check detects when walkthrough excerpts need refreshing. Browser verification covers page navigation, readable text, mobile layout, dark mode, diagram and image routes. Local scenarios and live provider calls are recorded separately in the workspace verification report; local success is not evidence of a live provider operation.

## Repository contents

Application sources, student web pages, safe configuration example and documentation images are included. `node_modules`, `presentation`, `output`, `reviewed`, `v3`, `teaching-material`, build output, local journals, credentials and local resource files are ignored. Existing teaching videos and presentations remain in the original workspace.
