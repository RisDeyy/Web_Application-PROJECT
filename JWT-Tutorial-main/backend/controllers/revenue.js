const revenueModel = require("../models/revenue.model");

const Revenue ={
getRevenue:async (req,res) =>{
    try{
const revenue = await revenueModel.find();
if(!revenue){
    return res.status(403).json("không tìm thấy doanh thu")
}
return res.status(200).json(revenue)
    }catch(err){
return res.status(500).json("server error")
    }
}

}
module.exports= Revenue ;