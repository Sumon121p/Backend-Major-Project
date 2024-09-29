const express = require("express");
const router = express.Router();
const {
  addList,
  getList,
  getListById,
  updateList,
  deleList,
  reveiw,
  reviewDelete,
} = require("./../Controller/ListingController");
const { isLoggedin } = require("../Midleware/Auth");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

router.post("/", isLoggedin, upload.single("imgLink"), addList);
router.get("/", getList);
router.get("/:id", isLoggedin, getListById);
router.put("/:id", isLoggedin, updateList);
router.delete("/:id", isLoggedin, deleList);
router.post("/listing/:id/review", isLoggedin, reveiw);
router.delete("/:Listid/review/:Reviewid", isLoggedin, reviewDelete);

module.exports = router;
