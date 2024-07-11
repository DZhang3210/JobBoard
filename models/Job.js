'use server'
import { WorkOS } from "@workos-inc/node";
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

export async function addOrgAndUserData(jobDocs, user){
  let oms = null
  const workos = new WorkOS(process.env.WORKOS_API_KEY);
  if(user) {
    oms = await workos.userManagement.listOrganizationMemberships({
      userId: user?.id
    })   
  }
  for(const job of jobDocs){
    const org = await workos.organizations.getOrganization(job.orgId)
    job.orgName = org.name
    if (oms && oms.data.length > 0) {
      job.isAdmin = oms.data.find(om => om.organizationId === job.orgId)
    }
  }
  return jobDocs
}

export const JobModel = models?.Job || model('Job', jobSchema)