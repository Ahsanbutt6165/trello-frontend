import mongoose from "mongoose";
import { Task } from "./TaskModel.js";
const BoardSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    tasks: [Task.schema],
    createdAt: {
      type: Date,
      default: Date.now,
    },
    Creater: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

export const Board = mongoose.model("Board", BoardSchema);
