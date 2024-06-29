const express = require('express');
const router = express.Router();
const {addList, getList, getListById, updateList, deleList} = require("./../Controller/ListingController");


router.post("/", addList);
router.get("/", getList);
router.get("/:id", getListById);
router.put("/:id", updateList);
router.delete("/:id", deleList);

module.exports = router;