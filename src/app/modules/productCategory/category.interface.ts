import { Schema } from "mongoose";

export interface ICategory {
    name: string;
    parent?: Schema.Types.ObjectId;
    children: Schema.Types.ObjectId[];
}  