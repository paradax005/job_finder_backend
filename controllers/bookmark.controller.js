const BookMark = require("../models/bookmark.model");

module.exports = {
  /// CREATE BOOKMARK
  createBookMark: async (req, res) => {
    const newBookMark = new BookMark(req.body);

    try {
      const savedBookMark = await newBookMark.save();
      const { __v, createdAt, updatedAt, ...bookMarkData } = savedBookMark._doc;

      res.status(201).json(bookMarkData);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  /// GET SPECIFIC BookMarks
  getBookMarks: async (req, res) => {
    try {
      const bookMark = await BookMark.findById({ userId: req.params.userId });
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
