import moment from "moment";
import { IJob } from "./interfaces/IJob";
import { IProcessedJob } from "./interfaces/IProcessedJob";
import JSONJobs from "./json/jobs.json";

export class GenerateArrayJobs {
  private createProcessedJobs(arrayJobs: IJob[]): IProcessedJob[] {
    const processedJobs: IProcessedJob[] = arrayJobs.map((job) => ({
      ...job,
      "Data Máxima de conclusão": new Date(job["Data Máxima de conclusão"]),
      "Tempo estimado": parseInt(job["Tempo estimado"]),
    }));
    return processedJobs;
  }

  private formatedJobObjectToString(job: IProcessedJob): IJob {
    const date = new Date(job["Data Máxima de conclusão"]);
    const stringDate = moment(date).format("YYYY-MM-DD HH:mm:ss");
    const stringHours = `${job["Tempo estimado"]} horas`;
    const newJob = {
      ...job,
      "Data Máxima de conclusão": stringDate,
      "Tempo estimado": stringHours,
    };
    return newJob;
  }

  private sortJobs(processedJobs: IProcessedJob[]): IProcessedJob[] {
    processedJobs.sort(
      (a, b) =>
        a["Data Máxima de conclusão"].getTime() -
        b["Data Máxima de conclusão"].getTime()
    );
    return processedJobs;
  }

  public planJobs(arrayJobs: IJob[]): IJob[][] {
    const groups: IProcessedJob[][] = [[]];
    const processedJobs = this.createProcessedJobs(arrayJobs);
    this.sortJobs(processedJobs);

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

    const jobGroupsFormatted: IJob[][] = groups.map((group) =>
      group.map(this.formatedJobObjectToString)
    );

    return jobGroupsFormatted;
  }
}

const generateArrayJobs = new GenerateArrayJobs(); // Instancia a classe;

const response = generateArrayJobs.planJobs(JSONJobs); // Executa o método planJobs passando o JSON como parâmetro;
console.log(response); // Exibe o resultado no console (F12);
