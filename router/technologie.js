const express = require("express")
const techRouter = express.Router()
const { TechStack } = require("../dataBase/dataBase")
const { schemaValidateTech } = require("../validation/validation")
const fs = require("fs")
const path = require("path")
const fileUpload = require("express-fileupload")
techRouter.get("/", async (req, res) => {
    const tech = await TechStack.find({})
    res.json(
        {
            res: true,
            data: tech.map(e => e.img) || []
        }
    ).status(200)
})
techRouter.get("/defaultPath", (req, res) => {
    let images = fs.readdirSync(path.resolve(__dirname, "../data/tech/default"))
    res.json({
        res: true,
        data: images.map(e => "http://localhost:3000/tech/img/default/" + e)
    }).status(200)
})
techRouter.get("/img/:path/:name", (req, res) => {
    const pathImg = req.params.path
    const name = req.params.name
    if (!name || !pathImg) {
        res.json(
            {
                res: true,
                mes: "Parameter is required!"
            }
        )
    } else {
        let imagePath = path.resolve(__dirname, `../data/tech/${pathImg}/${name}`)
        fs.readFile(imagePath, (err, data) => {
            if (err) {
                res.json({
                    res: false,
                    mes: "file Not found!"
                }).status(400)
            } else {
                res.sendFile(imagePath)
            }
        })
    }
})
techRouter.post("/addTech", fileUpload(), async (req, res) => {
    const { error } = schemaValidateTech.validate(req.files)
    console.log("start");
    if (error) {
        res.json(
            {
                res: false,
                mes: error.message
            }
        ).status(400)
    } else {
        const img = req.files.img
        let pathFile = path.resolve(__dirname, "../data/tech")
        const dimg = new TechStack({
            img: pathFile
        })
        pathFile = pathFile + `/${dimg.id}`
        fs.mkdirSync(pathFile)
        pathFile = pathFile + `/${img.name}/`
        img.mv(pathFile, async (err) => {
            if (err) {
                res.json({ res: false, mes: err }).status(404)
            } else {
                pathFile = `http://localhost:3000/tech/img/${dimg.id}/${img.name}`
                dimg.set({ img: pathFile })
                await dimg.save()
                res.json({ res: true, data: pathFile }).status(200)
            }
        })
    }
})
techRouter.post("/addTechdefault", async (req, res) => {
    console.log(req.body);
    const { error } = schemaValidateTech.validate(req.body)
    if (error) {
        res.json(
            {
                res: false,
                mes: error.message
            }
        ).status(400)
    } else {
        const img = req.body.img
        const dimg = new TechStack({
            img: img
        })
        await dimg.save()
        res.json({ res: true, data: img }).status(200)
    }
})
techRouter.delete("/removeSkil", async (req, res) => {
    const img = req.body?.img
    if (!img) {
        res.json({ res: false, mes: "img is require" }).status(400)
    } else {
        let pathImg = path.resolve(__dirname, `../data/tech${img.split("img")[1]}`)
        fs.readFile(pathImg, async (err, data) => {
            if (err) {
                res.json({ res: false, mes: "file not ound" }).status(400)
            } else {
                if (img.includes("default")) {
                    await TechStack.deleteOne({ img: img })
                    res.json({ res: true }).status(200)
                } else {
                    let imgInDataBase = await TechStack.findOneAndDelete({ img: img })
                    fs.rm(path.resolve(__dirname, `../data/tech/${imgInDataBase.id}`), { force: true,recursive:true }, (err) => {
                        if (err) {
                            res.json({ res: false, mes: err.message }).status(500);
                        } else {
                            res.json({ res: true }).status(200);
                        }
                    });
                }
            }
        })
    }
})
module.exports = {
    techRouter
}