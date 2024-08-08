const express = require("express");
const router = express.Router();
const {
  newChapter,
  getChapters,
  getChapter,
  deleteChapter,
  editChapter,
} = require("../controllers/chapterController");

const requireAuth = require("../middleware/requireAuth");

router.use(requireAuth);

router.get("/", getChapters);

router.get("/:id", getChapter);

router.post("/", newChapter);

router.patch("/:id", editChapter);

router.delete("/:id", deleteChapter);

module.exports = router;
