import { text, number, flag, list, object, hash, report, unique, safePath, type Lesson, type Input } from "./core";

// A focused local experiment derived from this lesson’s reviewed presentation.
export const lesson: Lesson = {
  number: 60,
  title: "Capstones: From App to Engineering Team",
  description: "This capstone brings the course together in two connected projects. First, build a full-stack assistant whose browser receives useful agent updates through an authorized host.",
  concepts: ["Coordinator and worker roles have explicit contracts", "Completion needs independently checked artifacts", "Acceptance is not merge or deployment"],
  scope: "Runs a local capstone evidence gate combining task, revision, artifact hash, tests, build, and review. It does not launch a remote engineering team. Each run starts from a fresh local seed. The run journal stores results, not production workflow state.",
  cases: [{"id": "0", "label": "Accept complete matching evidence", "input": {"artifact": "candidate-v1", "claimedArtifact": "candidate-v1", "testExit": 0, "buildExit": 0, "reviewApproved": true, "allChecksComplete": true}, "expected": "passed", "checks": {"accepted": true}}, {"id": "1", "label": "Reject an artifact mismatch", "input": {"artifact": "candidate-v1", "claimedArtifact": "candidate-v2", "testExit": 0, "buildExit": 0, "reviewApproved": true, "allChecksComplete": true}, "expected": "rejected", "checks": {"accepted": false}}, {"id": "2", "label": "Reject incomplete verification", "input": {"artifact": "candidate-v1", "claimedArtifact": "candidate-v1", "testExit": 0, "buildExit": 0, "reviewApproved": true, "allChecksComplete": false}, "expected": "incomplete", "checks": {"accepted": false}}],
  async run(input) {

const actualHash=hash(text(input,"artifact")),claimedHash=hash(text(input,"claimedArtifact")),complete=flag(input,"allChecksComplete");
const accepted=complete&&actualHash===claimedHash&&number(input,"testExit")===0&&number(input,"buildExit")===0&&flag(input,"reviewApproved");
return report(!complete?"incomplete":accepted?"passed":"rejected",accepted?"Evidence accepted for the next authorized host gate":"Capstone acceptance requirements are not satisfied",{accepted,taskId:"capstone-demo",revision:"reviewed-head",actualHash,claimedHash,checks:{tests:number(input,"testExit"),build:number(input,"buildExit"),review:flag(input,"reviewApproved"),complete},merged:false,deployed:false},["Freeze task and revision bindings","Read actual artifact bytes","Bind independent tests and build to the same bytes","Require review and full check coverage","Keep merge and deployment as separate authorized operations"]);

  }
};
