const BookMark = require("../models/bookmark.model");
const Job = require("../models/job.model");

module.exports = {
  /// CREATE BOOKMARK
  createBookMark: async (req, res) => {
      
      const jobID = req.body.job;
      
    try {
      const job = await Job.findById(jobID);
      
      if(!job){
        return res.status(404).json({error : 'Job not found'});
      }

      const newBookMark = new BookMark({job : jobID,userId : req.user.id});
      const savedBookMark = await newBookMark.save();
      const { __v, createdAt, updatedAt, ...newBookMarkInfo } = savedBookMark._doc;

      res.status(201).json(newBookMarkInfo);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  /// GET SPECIFIC BookMarks
  getBookMarks: async (req, res) => {
    try {
      const bookMark = await BookMark.find({ userId: req.user.id });
      res.status(200).json(bookMark);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  /// DELETE BookMark
  deleteBookMark: async (req, res) => {
    try {
      await BookMark.findByIdAndRemove(req.params.id);
      res.status(200).json("BookMark Successfully Deleted");
    } catch (error) {
      res.status(500).json(error);
    }
  },
};
