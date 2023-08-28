const revenue = require("../controllers/revenue");
const router = require("express").Router();

router.get("/revenue", revenue.getRevenue);
module.exports = router;