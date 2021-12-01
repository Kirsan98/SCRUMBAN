import {Task} from "./task.model";

export class Column{
    _id!: String;
    title!: String;
    index!: Number;
    maxTask !: Number;
    tasks !: Task[];
}