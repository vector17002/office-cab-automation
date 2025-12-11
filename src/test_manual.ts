
import { parseCabSMS } from "./smsParser";

const sampleSMS = "Roster 08:30, 11-Dec-2025. Expected Pick Time:08:30. Vehicle DL1RT8858. Driver John Doe (9876543210).";

console.log("--- Test Case 1: Normal Subtraction ---");
const result1 = parseCabSMS(sampleSMS, "00:45");
console.log("Pick Time (08:30):", result1?.pickTime);
console.log("Expected (07:45):", result1?.pickTime === "07:45" ? "PASS" : "FAIL");

console.log("\n--- Test Case 2: No Alarm Time Provided ---");
const result2 = parseCabSMS(sampleSMS);
console.log("Pick Time (08:30):", result2?.pickTime);
console.log("Expected (08:30):", result2?.pickTime === "08:30" ? "PASS" : "FAIL");

console.log("\n--- Test Case 3: Day Wrap Around ---");
// Pick time 00:15, alarm 00:30 -> Should be 23:45 previous day
const smsWrap = "Roster 00:15, 11-Dec-2025. Expected Pick Time:00:15. Vehicle DL1RT... Driver...";
const result3 = parseCabSMS(smsWrap, "00:30");
console.log("Pick Time (00:15):", result3?.pickTime);
console.log("Expected (23:45):", result3?.pickTime === "23:45" ? "PASS" : "FAIL");
