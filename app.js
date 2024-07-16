import express from "express";

const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res, next) => {
    res.status(200).render("home", {
        spec: {}
    });
});

app.post("/", (req, res, next) => {

    const spec = {
        chassis: req.body.chassis,
        motherboard: req.body.motherboard,
        islc: req.body.islc,
        cooling_cabling: req.body["cooling_cabling"],
        cpu: req.body.cpu,
        gpu: req.body.gpu,
        ram: req.body.ram,
        ssd: req.body.ssd
    };

    return res.status(200).render("home", {
        spec
    });

});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});