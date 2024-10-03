const ListMOdel = require("./../Models/ListingModel");
const ReveiwModel = require("./../Models/ReviewModel");

exports.addList = async (data) => {
  const List = await ListMOdel(data);
  return await List.save();
};

exports.getList = async () => {
  return await ListMOdel.find();
};

exports.getListById = async (id) => {
  return await ListMOdel.findById(id)
    .populate({
      path: "reviews",
      select: "rating Comment createdAt owner",
      populate: {
        path: "owner",
        select: "username",
      },
    })
    .populate({
      path: "owner",
      select: "username",
    });
};

exports.updateList = async (id, data, Listimage) => {
  return await ListMOdel.findByIdAndUpdate(id, data, {
    runValidators: true,
    new: true,
  });
};

exports.deleList = async (id) => {
  return await ListMOdel.findByIdAndDelete(id);
};

exports.review = async (id, data, reveiwOwner) => {
  let Lists = await ListMOdel.findById(id);
  let newReview = new ReveiwModel(data);
  newReview.owner = reveiwOwner;
  await newReview.save();

  Lists.reviews.push(newReview);
  return await Lists.save();
};

exports.reviewDelete = async (Reviewid, Listid) => {
  let list = ListMOdel.findByIdAndUpdate(Listid, {
    $pull: { reviews: Reviewid },
  });
  await ReveiwModel.findByIdAndDelete(Reviewid);
  return await list;
};
