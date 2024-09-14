import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema(
  {
    title: {
      required: true,
      type: String,
    },
    description: {
      required: true,
      type: String,
    },
    address: {
      required: true,
      type: String,
    },
    area: {
      required: false,
      type: Number,
    },
    furnished: {
      required: false,
      type: Boolean,
    },
    bureau: {
      required: false,
      type: Boolean,
    },
    parking: {
      required: false,
      type: Boolean,
    },
    specificity: {
      required: true,
      type: String,
    },
    imgUrl: {
      type: Array,
      required: true,
    },
    userRef: {
      type: String,
      required: true,
    },
    etat: {
      type: String,
      enum: ['en cours', 'terminee',"future"],

    },
  },
  { timestamps: true }
);

const Projects = mongoose.model("Project", ProjectSchema);

export default Projects;
