import React from 'react'
import {
    getSignInUrl,
    getSignUpUrl,
    getUser,
    signOut,
  } from '@workos-inc/authkit-nextjs';
import { ArrowRight} from 'lucide-react';
import { WorkOS } from '@workos-inc/node';
import Link from 'next/link';

const NewListingPage = async () => {
    const workos = new WorkOS(process.env.WORKOS_API_KEY)
    const {user} = await getUser();
    if(!user){
        return(
            <div className='container'>You need to be logged in to post a job</div>
        )
    }
    const organizationMemberships = await workos.userManagement.listOrganizationMemberships({
    userId: user.id})
    const activeOrganizationMemberships = organizationMemberships.data.filter(om => om.status ==='active')
    const organizationNames = {}
    for (const activeMembership of activeOrganizationMemberships){
        const organization = await workos.organizations.getOrganization(activeMembership.organizationId)
        organizationNames[organization.id] = organization.name
    }

    return (
    <div className='container mt-4'>
        <div>
            {/* 
            <pre>
                {JSON.stringify(organizationNames)}
            </pre> */}
            <h2 className='text-lg'>Your companies</h2>
            <p className='text-gray-500 text-sm mb-2'>Select a company to create and add a job for</p>
            <div>
                <div className='border inline-block rounded-md'>
                {
                    Object.keys(organizationNames).map((orgId, i)=>(
                        <Link key = {i} href = {"/new-listing/"+orgId} className='py-2 px-4 flex gap-2 border-b'>
                            {organizationNames[orgId]}
                            <ArrowRight/>
                        </Link>
                    ))
                }
            </div>
            </div>
            {
                organizationMemberships.data.length === 0 && (
                    <div className='border border-blue-200 bg-blue-50 p-4 mb-2 rounded-md'>
                        No companies found assigned to your user
                    </div>
                )
            }
            <Link 
                className='inline-flex gap-2 items-center bg-gray-200 px-4 py-2 rounded-md mt-6'
                href = "/new-company">
                <span>Create a new company</span>
                <ArrowRight/>
            </Link>
        </div>
    </div>
  )
}

export default NewListingPage
