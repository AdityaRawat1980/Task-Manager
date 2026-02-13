import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },

    description: {
      type: String,
      trim: true
    },

    status: {
      type: String,
      enum: ["pending", "completed"],
      default: "pending"
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserAuth",
      required: true
    }
  },
  {
    timestamps: true
  }
);

const taskModel = mongoose.model("Task", taskSchema);
export default taskModel;