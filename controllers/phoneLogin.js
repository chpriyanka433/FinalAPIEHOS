const axios = require("axios");
const userdb = require("../models/userProfile.js");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
//////////////////////////////////////phone login///////////////////////////
exports.phoneLogin = (req, res) => {
  const { body } = req;
  const blogSchema = Joi.object()
    .keys({
      phone: Joi.string()
        .regex(/^[6-9]{1}[0-9]{9}$/)
        .required(),
    })
    .required();
  let result = blogSchema.validate(body);
  if (result.error) {
    res.send("Please enter a valid number");
  } else {
    axios
      .get(
        "https://2factor.in/API/V1/c7573668-cfde-11ea-9fa5-0200cd936042/SMS/" +
          req.body.phone +
          "/AUTOGEN"
      )
      .then(function (response) {
        res.send(response.data);
      })
      .catch((er) => {
        res.send({ Status: "Error" });
      });
  }
};

//////////////////////////////////verifyOTP/////////////////////////////////
exports.verifyOTP = (req, res) => {
  const { body } = req;
  const otpSchema = Joi.object()
    .keys({
      details: Joi.string().required(),
      otp: Joi.number().max(999999).required(),
      phone: Joi.string()
        .regex(/^[6-9]{1}[0-9]{9}$/)
        .required(),
    })
    .required();
  let result = otpSchema.validate(body);
  if (result.error) {
    res.send("Please enter a valid details");
  } else {
    axios
      .get(
        "https://2factor.in/API/V1/c7573668-cfde-11ea-9fa5-0200cd936042/SMS/VERIFY/" +
          req.body.details +
          "/" +
          req.body.otp
      )
      .then(function (response) {
        if (response.data.Details === "OTP Matched") {
          const token = jwt.sign({ userPhone: req.body.phone }, "123456", {
            expiresIn: "24h",
          });
          response.data.token = token;
          res.status(200);
          res.send(response.data);
        }
      })
      .catch((er) => {
        res.send({ Status: "Error", Details: "Invalid OTP" });
      });
  }
};
/////////////////////////////////create profile//////////////////
exports.createProfile = async (req, res) => {
  const { body } = req;
  const profileSchema = Joi.object()
    .keys({
      fullName: Joi.string().required(),
      dateOfBirth: Joi.date().less("now").greater("01-01-1920").required(),
      gender: Joi.string().valid("Male", "Female", "Other").required(),
      email: Joi.string().email().required(),
    })
    .required();
  let result = profileSchema.validate(body);
  if (result.error) {
    res.send("Please enter a valid details");
  } else {
    try {
      const phoneExist = await userdb.findOne({ phone: req.user.userPhone });
      if (!phoneExist) {
        const createUser = new userdb({
          fullName: req.body.fullName,
          dateOfBirth: req.body.dateOfBirth,
          phone: req.user.userPhone,
          gender: req.body.gender,
          email: req.body.email,
        });
        await createUser.save();
        res.send({ status: "Registered sucessfully" });
      } else {
        res.send({ status: "Profile already created" });
      }
    } catch (e) {
      res.send("An error occurred");
    }
  }
};
/////////////////////////////Show Profile/////////////////////////////////////
exports.showProfile = async (req, res) => {
  const phoneExist = await userdb.findOne({ phone: req.user.userPhone });
  if (!phoneExist) {
    res.send("No data found");
  } else {
    res.send(phoneExist);
  }
};

//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyUGhvbmUiOiI5NDEwNDkxOTM0IiwiaWF0IjoxNjQ4ODE4NTA2LCJleHAiOjE2NDg5MDQ5MDZ9.Gjo1Q60biHU4yx-VLh7fGzKAmNIUwqsbPf03dA-ONus
