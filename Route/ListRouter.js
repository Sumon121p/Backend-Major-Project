const express = require('express');
const router = express.Router();
const {addList, getList, getListById, updateList, deleList, reveiw, reviewDelete} = require("./../Controller/ListingController");


router.post("/", addList);
router.get("/", getList);
router.get("/:id", getListById);
router.put("/:id", updateList);
router.delete("/:id", deleList);
router.post("/listing/:id/review", reveiw);
router.delete("/:Listid/review/:Reviewid", reviewDelete);

module.exports = router;