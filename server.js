import express from "express";
import qr from "qr-image";
import cors from "cors";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app=express();
const port=8001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', express.static('.'));

app.post("/",(req,res)=>{
    const { url } = req.body;
    if(!url){
        return res.status(400).json({error:'URL is required'});
    }
    let num=Math.floor(Math.random() * 100000);
    const fileName = `qr${num}.png`;
    const filePath = `${fileName}`;
    const qr_svg = qr.image(url);
    const writeStream = fs.createWriteStream(filePath);
    qr_svg.pipe(writeStream);
    
    writeStream.on('finish', () => {
        return res.json({ file:`/${fileName}`}); 
    });
    writeStream.on('error', (err) => {
        console.error(err);
        return res.status(500).json({error:'failed' });
    });
})

app.get("/download/:filename", (req, res) => {
    const filename = req.params.filename;
    const filePath = path.join(__dirname, filename);
    res.download(filePath, (err) => {
        if (err) {
            console.error("Download error:", err);
            res.status(500).send("Download failed");
        }
    });
});

app.listen(port,()=>{
    console.log(`server is listining on ${port}`);
})