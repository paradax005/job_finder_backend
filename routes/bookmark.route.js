const router = require("express").Router();
const bookMarkController = require("../controllers/bookmark.controller");

const { verifyToken } = require("../middlewares/verify_token");

/// CREATE BOOKMARK
router.post("/", verifyToken, bookMarkController.createBookMark);

/// GET SPECIFIC BOOKMARK
router.get("/", verifyToken, bookMarkController.getBookMarks);

/// DELETE BOOKMARK
router.delete("/:id", verifyToken, bookMarkController.deleteBookMark);

module.exports = router;
