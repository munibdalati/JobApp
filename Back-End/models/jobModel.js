const mongoose = require("mongoose");

// Define the JobApp schema as you've already done

const JobsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  deadline: {
    type: Date,
    required: true,
  },
  applications: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Application", // Reference to the Application model
    },
  ],
});

JobsSchema.statics.addApp = async function (title, description, deadline) {
  const job = await this.create({
    title,
    description,
    deadline,
  });

  return job;
};

const Jobs = mongoose.model("Jobs", JobsSchema);

module.exports = Jobs;
