'use server'

import mongoose from "mongoose"
import { JobModel } from "../../../models/Job"

export async function DELETE(req) {
    const url = new URL(req.url)
    const id = url.searchParams.get('id')
    await mongoose.connect(process.env.MONGO_URI)
    await JobModel.findByIdAndDelete(id)
    // console.log("HELLO")
    return Response.json(true)
}