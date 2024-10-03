const Listing = require("./../Service/ListService");
const ListModel = require("./../Models/ListingModel");

exports.addList = async (req, res) => {
  try {
    const { title, description, image, price, location, country } = req.body;
    const url = req.file.path;
    const filename = req.file.filename;
    if (!price || isNaN(price)) {
      return res.status(404).json({ err: "price need" });
    }
    const List = await Listing.addList(req.body);
    List.image = { url, filename };
    List.owner = req.user._id;
    await List.save();
    res.status(200).json(List);
  } catch (err) {
    throw err;
  }
};

exports.getList = async (req, res) => {
  try {
    const List = await Listing.getList();
    res.status(200).json(List);
  } catch (err) {
    throw err;
  }
};

exports.getListById = async (req, res) => {
  try {
    const List = await Listing.getListById(req.params.id);
    res.status(200).json(List);
  } catch (err) {
    throw err;
  }
};

exports.updateList = async (req, res) => {
  try {
    const ownerList = await ListModel.findById({ _id: req.params.id });
    if (!ownerList.owner.equals(req.user._id)) {
      return res.status(400).json({ err: "You don't have permission to edit" });
    }
    const List = await Listing.updateList(req.params.id, req.body);
    if (req.file) {
      const url = req.file.path;
      const filename = req.file.filename;
      List.image = { url, filename };
      await List.save();
    }
    res.status(200).json(List);
  } catch (err) { 
    throw err;
  }
};

exports.deleList = async (req, res) => {
  try {
    const ownerList = await ListModel.findById({ _id: req.params.id });
    if (!ownerList.owner.equals(req.user._id)) {
      return res
        .status(400)
        .json({ err: "You don't have permission to delete" });
    }
    const List = await Listing.deleList(req.params.id);
    res.status(200).json(List);
  } catch (err) {
    throw err;
  }
};

exports.reveiw = async (req, res) => {
  try {
    const { rating, Comment } = req.body;
    if (!rating || rating == 0 || rating > 5) {
      return res.status(404).json({ err: "Give me rating 1 to 5" });
    }
    if (!Comment) {
      return res.status(404).json({ err: "Give me Comment" });
    }
    const reveiwOwner = req.user._id;
    const list = await Listing.review(req.params.id, req.body, reveiwOwner);
    await list.save();
    res.status(200).json({ list });
  } catch (err) {
    throw err;
  }
};

exports.reviewDelete = async (req, res) => {
  try {
    const list = await Listing.reviewDelete(
      req.params.Reviewid,
      req.params.Listid
    );
    res.status(200).json({ list });
  } catch (err) {
    throw err;
  }
};
