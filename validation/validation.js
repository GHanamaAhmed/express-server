const joi = require('joi');
const schemaValidateAboutMe = joi.object({
    text: joi.string()
})
const schemaValidateWorkExperience = joi.object({
    job: joi.string(),
    type: joi.string(),
    company: joi.string(),
    location: joi.string(),
    datebegin: joi.string(),
    dateEnd: joi.string()
})
const schemaValidateEducation = joi.object({
    specialization: joi.string(),
    type: joi.string(),
    school: joi.string(),
    location: joi.string(),
    datebegin: joi.string(),
    dateEnd: joi.string()
})
const schemaValidateTech=joi.object(
    {
        img:joi.any().required()
    }
)
module.exports = {
    schemaValidateAboutMe,
    schemaValidateWorkExperience,
    schemaValidateEducation,
    schemaValidateTech
}