const Joi = require("joi");
const hospital = require("../models/hospital");
const hospitalForm = require("../models/hospitalForm");
exports.findHospital = async (req, res) => {
  try {
    const HospitalFind = await hospital.find();
    res.status(200).json(HospitalFind);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.findOne = async (req, res) => {
  try {
    const HospitalFind = await hospital.findById(req.params.id);
    res.status(200).json(HospitalFind);
  } catch (err) {
    res.status(500).json(err);
  }
};
exports.addHospital = async (req, res) => {
  const { body } = req;
  const hospitalSchema = Joi.object()
    .keys({
      hospitalName: Joi.string().required(),
      hospitalLocation: Joi.string().required(),
      latitude: Joi.number().required(),
      longitude: Joi.number().required(),
      alldoctors: Joi.number().required(),
      allbeds: Joi.number().required(),
      ambulances: Joi.number().required(),
    })
    .required();
  let result = hospitalSchema.validate(body);
  if (result.error) {
    res.send("Please enter a valid details");
  } else {
    try {
      const hospitalDetails = new hospital({
        hospitalName: req.body.hospitalName,
        hospitalLocation: req.body.hospitalLocation,
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        alldoctors: req.body.alldoctors,
        allbeds: req.body.allbeds,
        ambulances: req.body.ambulances,
      });
      await hospitalDetails.save();
      res.status(201).send("Hospital registered sucessfully");
    } catch (err) {
      res.status(500).send("An error ocurred");
    }
  }
};
exports.hospitalForm = async (req, res) => {
  const { body } = req;
  const hospitalFormSchema = Joi.object().keys({
    patientName: Joi.string().required(),
    familyMember: Joi.string().required(),
    dob: Joi.date().less("now").greater("01-01-1920").required(),
    gender: Joi.string().valid("Male", "Female", "Other").required(),
    fatherHusbandName: Joi.string().required(),
    address: Joi.string().required(),
    phone: Joi.string()
      .regex(/^[6-9]{1}[0-9]{9}$/)
      .required(),
    email: Joi.string().email().required(),
    nationality: Joi.string().required(),
    religion: Joi.string().required(),
    monthlyIncome: Joi.number().required(),
    occupation: Joi.string().required(),
    altPhone: Joi.string()
      .regex(/^[6-9]{1}[0-9]{9}$/)
      .required(),
    doctorName: Joi.string().required(),
    policyNumber: Joi.string().required(),
    employerName: Joi.string().required(),
    employerId: Joi.string().required(),
  });
  let result = hospitalFormSchema.validate(body);
  if (result.error) {
    res.send("Please enter a valid details");
  } else {
    try {
      const addHospitalForm = new hospitalForm({
        patientName: req.body.patientName,
        familyMember: req.body.familyMember,
        dob: req.body.dob,
        gender: req.body.gender,
        fatherHusbandName: req.body.fatherHusbandName,
        address: req.body.address,
        phone: req.body.phone,
        email: req.body.email,
        nationality: req.body.nationality,
        religion: req.body.religion,
        monthlyIncome: req.body.monthlyIncome,
        occupation: req.body.occupation,
        altPhone: req.body.altPhone,
        doctorName: req.body.doctorName,
        policyNumber: req.body.policyNumber,
        employerName: req.body.employerName,
        employerId: req.body.employerId,
      });
      await addHospitalForm.save();
      res.send({ status: "Registered sucessful" });
    } catch (e) {
      res.send("An error occurred");
    }
  }
};
