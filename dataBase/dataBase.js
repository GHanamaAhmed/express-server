const mongoose = require("mongoose");

const ModuleAboutMe = mongoose.model(
  "aboutMe",
  new mongoose.Schema({
    text: {
      type: String,
    },
  })
);
const ModuleWorkExperience = mongoose.model(
  "workExperience",
  new mongoose.Schema({
    job: {
      type: String,
    },
    type: {
      type: String,
    },
    company: {
      type: String,
    },
    location: {
      type: String,
    },
    datebegin: {
      type: String,
    },
    dateEnd: {
      type: String,
    },
  })
);
const ModuleEducation = mongoose.model(
  "education",
  new mongoose.Schema({
    specialization: {
      type: String,
    },
    type: {
      type: String,
    },
    school: {
      type: String,
    },
    location: {
      type: String,
    },
    datebegin: {
      type: String,
    },
    dateEnd: {
      type: String,
    },
  })
);
const TechStack = mongoose.model(
  "tech",
  new mongoose.Schema({
    img: {
      type: String,
      required: true,
    },
  })
);
module.exports = {
  ModuleAboutMe,
  ModuleWorkExperience,
  ModuleEducation,
  TechStack,
};
