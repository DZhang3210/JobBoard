import { model, models, Schema } from "mongoose";

const jobSchema = new Schema({
    title : {type:String, required:true},
    remote : {type:String, required:true},
    type : {type:String, required:true},
    salary : {type:Number, required:true},
    country : {type:String, required:true},
    countryId: {type:Number, required:true},
    state : {type:String, required:true},
    stateId: {type:Number, required:true},
    city : {type:String, required:true},
    cityId: {type:Number, required:true},
    orgId: {type:String, required: true},
    jobIcon : {type:String},
    contactPhoto: {type:String},
    contactName: {type:String, required: true},
    contactPhone: {type:String, required: true},
    contactEmail: {type:String, required: true},
    description: {type:String, required: true}
}, {timestamps: true})

export const JobModel = models?.Job || model('Job', jobSchema)