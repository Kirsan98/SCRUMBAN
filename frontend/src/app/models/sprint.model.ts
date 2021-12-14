import { Column } from "./column.model";

export class Sprint {
    _id!: string;
    title!: string;
    start_at!: Date;
    end_at!: Date;
    columns!: Column[];
    planningDaily!: string;
    sprintRetrospective!: string;
    isTerminado!: Boolean;
  }