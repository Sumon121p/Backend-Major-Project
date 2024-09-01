const Listing = require("./../Service/ListService");

exports.addList = async (req, res) => {
  try {
    const { title, description, image, price, location, country } = req.body;

    if (!price || isNaN(price)) {
      return res.status(404).json({ err: "price need" });
    }
    const List = await Listing.addList(req.body);
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
    const List = await Listing.updateList(req.params.id, req.body);
    res.status(200).json(List);
  } catch (err) {
    throw err;
  }
};

exports.deleList = async (req, res) => {
  try {
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
    const list = await Listing.review(req.params.id, req.body);
    res.status(200).json({ list });
  } catch (err) {
    throw err;
  }
};

exports.reviewDelete = async (req, res) => {
  try {
    const list = await Listing.reviewDelete(req.params.Reviewid, req.params.Listid);
    res.status(200).json({list});
  } catch (err) {
    throw err;
  }
};
