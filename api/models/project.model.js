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
      required: true,
      type: Number,
    },
    furnished: {
      required: true,
      type: Boolean,
    },
    bureau: {
      required: true,
      type: Boolean,
    },
    parking: {
      required: true,
      type: Boolean,
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
