import Hero from "../components/Hero";
import Jobs from "../components/Jobs";
import Image from "next/image";
import {
  getSignInUrl,
  getSignUpUrl,
  getUser,
  signOut,
} from '@workos-inc/authkit-nextjs';
import mongoose from "mongoose";
import { addOrgAndUserData, JobModel } from "../models/Job";

export default async function Home() {
  const {user} = await getUser()
  await mongoose.connect(process.env.MONGO_URI)
  let jobDocs = JSON.parse(JSON.stringify(await JobModel.find({},{},{limit:5, sort:'-createdAt'})))
  jobDocs = await addOrgAndUserData(jobDocs, user)

  return (
    <div>
      <Hero/>
      <Jobs jobs = {jobDocs}/>
    </div>
  );
}
