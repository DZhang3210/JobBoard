import React from 'react'
import {
    getSignInUrl,
    getSignUpUrl,
    getUser,
    signOut,
  } from '@workos-inc/authkit-nextjs';
import { ArrowRight } from 'lucide-react';
import { WorkOS } from '@workos-inc/node';
import {createCompany} from '../actions/workosActions'

const NewCompanyPage = async () => {
    const workos = new WorkOS(process.env.WORKOS_API_KEY)
    const {user} = await getUser();
    if(!user){
        return(
            <div className='container'>You need to be logged in to post a job</div>
        )
    }
    async function handleNewCompanyFormSubmit(data) {
        'use server';
        if (user) {
            await createCompany(data.get('newCompanyName'), user.id);
        }
        }
  return (
    <div>
      <div className='container'>
            <h2 className='text-lg'>Create a new company</h2>
            <p className='text-gray-500 text-sm mb-2'>To create a job listing you first need to register a company</p>
            <form 
                className='flex gap-2'
                action = {handleNewCompanyFormSubmit}
            >
                <input 
                    className='p-2 border border-gray-400 rounded-md'
                    type = 'text' 
                    placeholder='company name'
                    name = "newCompanyName"
                />
                <button type= "submit" className='flex gap-2 items-center bg-gray-200 px-4 py-2 rounded-md'>
                    Create a company 
                    <ArrowRight className = "h-6" />
                </button>
            </form>
      </div>
    </div>
  )
}

export default NewCompanyPage
