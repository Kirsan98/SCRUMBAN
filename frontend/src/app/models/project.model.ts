import {Sprint} from "./sprint.model";
import {Task} from "./task.model";

export class Project{
    _id!: string;
    title!: string;
    created_at!: Date;
    sprints !: Sprint[];
    tasks !: Task[];
    _members!: String[];
}