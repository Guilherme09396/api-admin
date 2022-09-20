const express = require("express")
const app = express()
const router = require("./routes/routes")
const cors = require("cors");
 

app.use(cors())
// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }))
// parse application/json
app.use(express.json())

app.use("/",router);

const port = 3000;
app.listen(port,() => {
    console.log("Servidor rodando na porta: " + port)
});
