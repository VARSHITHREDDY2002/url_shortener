import mongoose from 'mongoose'
const { Schema,model } =mongoose;
const UrlSchema=new Schema({
   urlId:{
    type:String,
    required:true
   },
   originalId:{
     type:String,
     required:true
   },
   shortenurl:{
    type:String,
    required:true
   },
   clicks:{
    type:Number,
    required:true,
    default:0
   }
});

const Url=model('Url',UrlSchema);
export default Url;