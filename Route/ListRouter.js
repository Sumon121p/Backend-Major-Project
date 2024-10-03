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
const { storage } = require("../cloudconfig");
const upload = multer({ storage });

router.post("/", isLoggedin, upload.single("image"), addList);
router.get("/", getList);
router.get("/:id", isLoggedin, getListById);
router.put("/:id", isLoggedin, upload.single("image"), updateList);
router.delete("/:id", isLoggedin, deleList);
router.post("/listing/:id/review", isLoggedin, reveiw);
router.delete("/:Listid/review/:Reviewid", isLoggedin, reviewDelete);

module.exports = router;
