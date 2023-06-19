const aboutRouter = require('express').Router();
const Joi = require('joi');
const { ModuleAboutMe, ModuleWorkExperience, ModuleEducation } = require('../dataBase/dataBase');
const { schemaValidateAboutMe, schemaValidateWorkExperience, schemaValidateEducation } = require('../validation/validation');
aboutRouter.get('/', async (req, res) => {
    const aboutMe = await ModuleAboutMe.find({})
    const workExperience = await ModuleWorkExperience.find({})
    const education = await ModuleEducation.find({})
    res.json({ aboutMe, workExperience, education }).status(200)
});
aboutRouter.put('/aboutMe', async (req, res) => {
    const { error } = schemaValidateAboutMe.validate(req.body)
    if (error) {
        res.status(400).json({ error })
    } else {
        const aboutMe = req.body;
        const aboutMeData = await ModuleAboutMe.find({})
        if (aboutMeData.length === 0) {
            const aboutMeData = new ModuleAboutMe({ aboutMe })
            await aboutMeData.save()
            res.json({ aboutMe: aboutMeData.text }).status(200)
        } else {
            await ModuleAboutMe.updateOne({}, { $set: { text: aboutMe.text } }).then(() => {
                res.json({ aboutMe }).status(200)
            }).catch((err) => {
                res.status(400).json({ err })
            })
        }
    }
});
aboutRouter.post('/workExperience', async (req, res) => {
    const { error } = schemaValidateWorkExperience.validate(req.body?.workExperience)
    if (error) {
        res.status(400).json({ error })
    } else {
        const { workExperience } = req.body;
        console.log(workExperience);
        let newWorkExperience = new ModuleWorkExperience(workExperience)
        newWorkExperience.save().then(() => {
            res.json({ workExperience: newWorkExperience }).status(200)
        }).catch((err) => {
            res.status(400).json({ err })
        })
    }
});
aboutRouter.delete('/workExperience', async (req, res) => {
    const { id } = req.body;
    if (id == null) {
        res.status(400).send("Id not exists!")
    } else {
        await ModuleWorkExperience.findByIdAndDelete(id).then(() => {
            res.json({ id }).status(200)
        }).catch((err) => {
            res.status(400).json({ err })
        })
    }
})
aboutRouter.put('/workExperience', async (req, res) => {
    const { error } = schemaValidateWorkExperience.validate(req.body?.workExperience)
    if (error) {
        res.status(400).json({ error })
    } else {
        if (req.body?.id == null) {
            res.end("id not exsist!").status(400)
        } else {
            const { workExperience, id } = req.body;
            const workExperienceData = await ModuleWorkExperience.findById(id)
            if (workExperienceData == null) {
                res.end("work not exsist").status(400)

            } else {
                await ModuleWorkExperience.findByIdAndUpdate(id, workExperience).then(async () => {
                    res.json({ workExperience }).status(200)
                }).catch((err) => {
                    res.status(400).json({ err })
                })
            }
        }
    }
});
aboutRouter.post("/education", async (req, res) => {
    const { error } = schemaValidateEducation.validate(req.body?.education)
    if (error) {
        res.status(400).json({ error })
    } else {
        const { education } = req.body;
        const newEducation = new ModuleEducation(education)
        newEducation.save().then(response => {
            res.status(200).json({ education: newEducation })
        }).catch(err => {
            res.status(400).json({ err })
        }
        )
    }
})
aboutRouter.delete('/education', async (req, res) => {
    const { id } = req.body;
    if (id == null) {
        res.status(400).send("Id not exists!")
    } else {
        await ModuleEducation.findByIdAndDelete(id).then(() => {
            res.json({ id }).status(200)
        }).catch((err) => {
            res.status(400).json({ err })
        })
    }
})
aboutRouter.put('/education', async (req, res) => {
    const { error } = schemaValidateEducation.validate(req.body?.education)
    if (error) {
        res.status(400).json({ error })
    } if (req.body?.id == null) {
        res.end("id not exsist").status(400)
    } else {
        const { education, id } = req.body;
        const educationData = await ModuleEducation.findById(id)
        if (educationData == null) {
            res.end("Education not exsist").status(400)
        } else {
            await ModuleEducation.findByIdAndUpdate(id, education).then(() => {
                res.json({ education }).status(200)
            }).catch((err) => {
                res.status(400).json({ err })
            })
        }
    }
});

module.exports = { aboutRouter };
