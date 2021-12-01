import {Task} from "./task.model";

export class Column{
    _id!: String;
    title!: String;
    index!: Date;
    maxTask !: Number;
    tasks !: Task[];
}