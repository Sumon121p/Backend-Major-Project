const Listing = require("./../Service/ListService");

exports.addList = async (req, res) => {
  try {
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
    try{
        const List = await Listing.getListById(req.params.id);
        res.status(200).json(List);
    }catch(err){
        throw err;
    }
}

exports.updateList = async (req, res) => {
  try{
    const List = await Listing.updateList(req.params.id, req.body);
    res.status(200).json(List);
  }catch(err){
    throw err;
  }
}

exports.deleList = async (req, res) => {
  try{
    const List = await Listing.deleList(req.params.id);
    res.status(200).json(List);
  }catch(err){
    throw err;
  }
}
