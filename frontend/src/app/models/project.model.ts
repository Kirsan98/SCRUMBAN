import {Sprint} from "./sprint.model";

export class Project{
    _id!: string;
    title!: string;
    created_at!: Date;
    sprints !: Sprint[];
}