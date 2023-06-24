const Job = require("../models/job.model");

module.exports = {
  /// CREATE JOB
  createJob: async (req, res) => {
    const newJob = new Job(req.body);

    try {
      const savedJob = await newJob.save();
      const { __v, createdAt, updatedAt, ...jobData } = savedJob._doc;

      res.status(201).json(jobData);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  /// UPDATE JOB
  updateJob: async (req, res) => {
    try {
      const updatedJob = await Job.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );

      const { __v, createdAt, updatedAt, ...updatedJobInfo } = updatedJob._doc;

      res.status(200).json(updatedJobInfo);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  /// GET SPECIFIC JOB
  getJob: async (req, res) => {
    try {
      const job = await Job.findById(req.params.id);
      res.status(200).json(job);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  /// GET ALL JOBS
  getAllJobs: async (req, res) => {
    try {
      const jobs = await Job.find();
      res.status(200).json(jobs);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  /// DELETE JOB
  deleteJob: async (req, res) => {
    try {
      await Job.findByIdAndRemove(req.params.id);
      res.status(200).json("Job Successfully Deleted");
    } catch (error) {
      res.status(500).json(error);
    }
  },
  searchJob: async (req, res) => {
    try {
      const results = await Job.aggregate([
        {
          $search: {
            index: "jobs",
            text: {
              query: req.params.key,
              path: {
                wildcard: "*",
              },
            },
          },
        },
      ]);

      res.status(200).json(results);
    } catch (error) {
      res.status(500).json(error);
    }
  },
};
