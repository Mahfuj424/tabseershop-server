import mongoose, { Schema, Document } from "mongoose";

interface ICategory extends Document {
  name: string;
  parent?: Schema.Types.ObjectId;
  children: Schema.Types.ObjectId[];
}

const CategorySchema = new Schema<ICategory>(
  {
    name: { type: String, required: true },
    parent: { type: Schema.Types.ObjectId, ref: "Category", default: null },
    children: [{ type: Schema.Types.ObjectId, ref: "Category" }],
  },
  { timestamps: true }
);

const Category = mongoose.model<ICategory>("Category", CategorySchema);
export default Category;
