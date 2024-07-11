import { WorkOS } from '@workos-inc/node'
import Jobs from '../../../components/Jobs'
import React from 'react'
import { JobModel } from '../../../models/Job'
import mongoose from 'mongoose'
import { getUser } from '@workos-inc/authkit-nextjs'

const page = async (props) => {
  const workos = new WorkOS(process.env.WORKOS_API_KEY)
  const org = await workos.organizations.getOrganization(props.params.orgId)
  const {user} = await getUser()
  await mongoose.connect(process.env.MONGO_URI)
  const jobDocs = JSON.parse(JSON.stringify(await JobModel.find({orgId: org.id})))
  let oms = null
  if(user) {
    oms = await workos.userManagement.listOrganizationMemberships({
      userId: user.id
    })   
  }
  for(const job of jobDocs){
    const org = await workos.organizations.getOrganization(job.orgId)
    job.orgName = org.name
    if (oms && oms.data.length > 0) {
      job.isAdmin = oms.data.find(om => om.organizationId === job.orgId)
    }
  }
  return (
    <section>
      <div className='container'>
        <h1 className='text-xl my-6'> {org.name} Jobs</h1>
      </div>
      <Jobs jobs = {jobDocs} header = {"Jobs posted by " + org.name}/>
    </section>
  )
}

export default page
