const router = require("express").Router();
const jobController = require("../controllers/job.controller");

const { isAnAdmin } = require("../middlewares/verify_token");

/// CREATE JOB
router.post("/", isAnAdmin, jobController.createJob);

/// GET ALL JOBS
router.get("/", jobController.getAllJobs);

/// GET SPECIFIC JOB
router.get("/:id", jobController.getJob);

/// UPDATE JOB
router.put("/:id", isAnAdmin, jobController.updateJob);

/// DELETE JOB
router.delete("/:id", isAnAdmin, jobController.deleteJob);

/// SEARCH JOB
router.get("/search/:key", jobController.searchJob);

module.exports = router;
