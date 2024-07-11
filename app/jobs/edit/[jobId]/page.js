import mongoose from 'mongoose'
import React from 'react'
import { JobModel } from '../../../../models/Job'
import { getUser } from '@workos-inc/authkit-nextjs'
import { WorkOS } from '@workos-inc/node'
import JobForm from '../../../../components/JobForm'

const EditJobPage = async (props) => {
  const jobId = props.params.jobId
  await mongoose.connect(process.env.MONGO_URI)
  const jobDoc = JSON.parse(JSON.stringify(await JobModel.findById(jobId)))
  if(!jobDoc){
    return 'Not found';
  }
  const {user} = await getUser()
  // console.log(user)
  if(!user){
    return 'You need to sign in'
  }
  const workos = new WorkOS(process.env.WORKOS_API_KEY)
  const oms = await workos.userManagement.listOrganizationMemberships({
    userId: user.id,
    organizationId:jobDoc.orgId
  })
  if (!oms.data.length === 0){
    return 'Access denied'
  }


  return (
    <div className='container'>
      <JobForm orgId = {jobDoc.orgId} jobDoc = {jobDoc}/>
    </div>
  )
}

export default EditJobPage
