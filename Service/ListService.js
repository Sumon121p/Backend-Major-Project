const ListMOdel = require("./../Models/ListingModel");

exports.addList = async (data) => {
     const List = await ListMOdel(data);
     return await List.save();
};

exports.getList = async () =>{
    return await ListMOdel.find();
}

exports.getListById = async (id) => {
    return await ListMOdel.findById(id);
}

exports.updateList = async (id, data) => {
    return await ListMOdel.findByIdAndUpdate(id, data, {runValidators: true, new:true});
}

exports.deleList = async (id) => {
    return await ListMOdel.findByIdAndDelete(id);
}