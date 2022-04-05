const express = require("express");
const router = express.Router();
const hospital = require("./hospital");
const profile = require("./profile");
const login = require("./login");

router.use(hospital);
router.use(profile);
router.use(login);
module.exports = router;
