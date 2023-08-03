import { GenerateArrayJobs } from "../src/index";
import { jobsMock1, jobsMockResult1 } from "./mocks/jobMock1";
import { jobsMock2, jobsMockResult2 } from "./mocks/jobMock2";

describe("GenerateArrayJobs", () => {
  const generateArrayJobs = new GenerateArrayJobs();

  test("planJobs groups jobs1 correctly", () => {
    expect(generateArrayJobs.planJobs(jobsMock1)).toEqual(jobsMockResult1);
  });

  test("planJobs groups jobs2 correctly", () => {
    expect(generateArrayJobs.planJobs(jobsMock2)).toEqual(jobsMockResult2);
  });
});
