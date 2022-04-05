const { model, Schema } = require("mongoose");

const hospitalForm = new Schema({
  patientName: {
    type: String,
    required: true,
  },
  familyMember: {
    type: String,
    required: true,
  },
  dob: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  fatherHusbandName: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  nationality: {
    type: String,
    required: true,
  },
  religion: {
    type: String,
    required: true,
  },
  monthlyIncome: {
    type: Number,
    required: true,
  },
  occupation: {
    type: String,
    required: true,
  },
  altPhone: {
    type: String,
    required: true,
  },
  doctorName: {
    type: String,
    required: true,
  },
  policyNumber: {
    type: String,
    required: true,
  },
  employerName: {
    type: String,
    required: true,
  },
  employerId: {
    type: String,
    required: true,
  },
});

module.exports = model("hospitalForm", hospitalForm);
