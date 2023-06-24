const router = require("express").Router();
const bookMarkController = require("../controllers/bookmark.controller");

const { isAnAdmin } = require("../middlewares/verify_token");

/// CREATE BOOKMARK
router.post("/", isAnAdmin, bookMarkController.createBookMark);

/// GET SPECIFIC BOOKMARK
router.get("/:userId", bookMarkController.getBookMarks);

/// DELETE BOOKMARK
router.delete("/:id", isAnAdmin, bookMarkController.deleteBookMark);

module.exports = router;
