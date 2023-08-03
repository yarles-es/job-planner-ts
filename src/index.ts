import { IJob } from "./interfaces/IJob";
import { IProcessedJob } from "./interfaces/IProcessedJob";
import JSONJobs from "./json/jobs.json";

export class GenerateArrayJobs {
  public planJobs(jobs: IJob[]): IProcessedJob[][] {
    const processedJobs: IProcessedJob[] = jobs.map((job) => ({
      ...job,
      "Data Máxima de conclusão": new Date(job["Data Máxima de conclusão"]),
      "Tempo estimado": parseInt(job["Tempo estimado"]),
    }));

    processedJobs.sort(
      (a, b) =>
        a["Data Máxima de conclusão"].getTime() -
        b["Data Máxima de conclusão"].getTime()
    );

    const groups: IProcessedJob[][] = [[]];
    for (const job of processedJobs) {
      const currentGroup = groups[groups.length - 1];
      const currentGroupTime = currentGroup.reduce(
        (hours, currentJob) => hours + currentJob["Tempo estimado"],
        0
      );
      if (currentGroupTime + job["Tempo estimado"] > 8) {
        groups.push([job]);
      } else {
        currentGroup.push(job);
      }
    }

    return groups;
  }
}

const generateArrayJobs = new GenerateArrayJobs();
const jobs = generateArrayJobs.planJobs(JSONJobs);
console.log(jobs);