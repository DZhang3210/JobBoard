'use server'
import mongoose from "mongoose"
import { JobModel } from "../../models/Job"
import { revalidatePath } from "next/cache"

export async function saveJobAction(data) {
    await mongoose.connect(process.env.MONGO_URI)
    // console.log(Object.fromEntries(data))
    const {id, ...jobData} = Object.fromEntries(data)
    const jobDoc = (id) ? (
        await JobModel.findByIdAndUpdate(id, jobData)
    ):(
        await JobModel.create(jobData)
    )

    if ('orgId' in jobData){
        // console.log("REVALIDATED")
        revalidatePath(`/jobs/${jobData?.orgId}`)
    }
    return JSON.parse(JSON.stringify(jobDoc))
}