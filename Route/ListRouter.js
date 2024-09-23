const express = require('express');
const router = express.Router();
const {addList, getList, getListById, updateList, deleList, reveiw, reviewDelete} = require("./../Controller/ListingController");
const { isLoggedin } = require('../Midleware/Auth');


router.post("/", isLoggedin, addList);
router.get("/", getList);
router.get("/:id",isLoggedin, getListById);
router.put("/:id",isLoggedin, updateList);
router.delete("/:id", deleList);
router.post("/listing/:id/review", reveiw);
router.delete("/:Listid/review/:Reviewid", reviewDelete);

module.exports = router;