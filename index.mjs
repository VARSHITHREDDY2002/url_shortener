import  express  from "express";
import { nanoid } from "nanoid";
import { mongoose } from "mongoose";
import Url from "/mnt/c/Users/DELL/Desktop/url_shortner/models/url.mjs";

const app=express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const PORT=3000;
const BASE='http//localhost:3000';


mongoose.connect("mongodb+srv://kanchireddyvarshithreddy:sZAyq4D2fVRYiLjf@cluster0.uvy6zyx.mongodb.net/shortner?retryWrites=true&w=majority&appName=Cluster0")
        .then(()=>{
            console.log("connected to database");
        })
        .catch((err)=>{
            console.log(err);
            console.log("error occur while connected to database");
        });



app.post('/shortUrl',async function(req,res){
    console.log(req.body);
    const { originalUrl }=req.body;
    console.log(originalUrl);
    const urlid=nanoid();
    const shortUrl=`${BASE}${urlid}`;
    console.log(shortUrl);
    try
    {
        const checkUrl=await Url.findOne({originalId:originalUrl});
        if(checkUrl)
        {
          res.json(checkUrl);
        }
        else
        {
            const newUrl=await Url.create({
                urlId:urlid,
                shortenurl:shortUrl,
                originalId:originalUrl
            });
            console.log(newUrl);
            res.json(newUrl);
        }
    }
    catch(err)
    {
        console.log(err);
    }
})

app.get('/api/:urlId',async function(req,res)
{
    console.log(req.params);
    const checkUrl=await Url.findOne({urlId:req.params.urlId});
    if(checkUrl)
    {
         res.redirect(checkUrl.originalId);
    }
    else
    {
        console.log("shortened url not found");
    }

})


app.listen(PORT,function(req,res){
    console.log(`server is started at ${PORT}`);
})