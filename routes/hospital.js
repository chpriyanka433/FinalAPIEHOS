const express = require("express");
const router = express.Router();
const {
  addHospital,
  findHospital,
  findOne,
  hospitalForm,
} = require("../controllers/hospital");

router.post("/addHospital", addHospital);
router.get("/findHospital", findHospital);
router.get("/findHospitalOne/:id", findOne);
router.post("/hospitalForm", hospitalForm);
module.exports = router;
