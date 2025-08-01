import mongoose from "mongoose";

// Creating Scheema.
const authSchema = new mongoose.Schema(
  {
    // userId: {
    //   type: String,
    //   // required: true,
    //   unique: true,
    // },
    fullName: {
      type: String,
      required: true,
    },
    dob: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    // avatar: {
    //   type: String, // For profile picture provided by Google.
    // },
    // provider: {
    //   type: String, // google or local
    //   enum: ["google", "local"],
    //   default: "local",
    // },
  },
  { timestamps: true }
);

// Export auth model.
export const authModel = mongoose.model("auth", authSchema);
