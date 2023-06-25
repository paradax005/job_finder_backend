const router = require("express").Router();
const bookMarkController = require("../controllers/bookmark.controller");

const { isAnAdmin,verifyAndAuthorization } = require("../middlewares/verify_token");

/// CREATE BOOKMARK
router.post("/", verifyAndAuthorization, bookMarkController.createBookMark);

/// GET SPECIFIC BOOKMARK
router.get("/:userId", bookMarkController.getBookMarks);

/// DELETE BOOKMARK
router.delete("/:id", isAnAdmin, bookMarkController.deleteBookMark);

module.exports = router;
