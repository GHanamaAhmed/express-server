const express = require("express")
const cors = require("cors")
const helmet = require("helmet")
const bodyParser = require("body-parser")
const { default: mongoose } = require("mongoose")
const app = express()
const port = process.env.PORT || 3000
const url = "mongodb://127.0.0.1:27017/portfolio"
const {aboutRouter} = require("./router/about")
const { techRouter } = require("./router/technologie")
app.use(bodyParser.urlencoded({limit: '50mb', extended: true, parameterLimit: 1000000}))
app.use(cors())
app.use(helmet())
app.use("/about", aboutRouter)
app.use("/tech",techRouter)
const connectdb = async () => {
    try {
        await mongoose.connect(url)
        console.log("Connected to local database");
    } catch (err) {
        try {
            await mongoose.connect(process.env.MONGODB_URL)
            console.log("Connected to remote database");
        } catch (error) {
            console.log("Error connecting to database");
        }

    }
}
connectdb().then(() => {
    app.listen(port, () => {
        console.log(`Server running on port ${port}`)
    })
})