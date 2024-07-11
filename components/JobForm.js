"use client"

import React, { useState } from 'react'
import '@radix-ui/themes/styles.css';
import { Button, RadioGroup, TextArea, TextField } from '@radix-ui/themes';
import {
    CitySelect,
    CountrySelect,
    StateSelect,
    LanguageSelect,
  } from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";
import {CircleUser, Mail, Phone, Smartphone } from 'lucide-react';

import ImageUpload from './ImageUpload';
import { faStar, faUser } from '@fortawesome/free-solid-svg-icons';
import  {saveJobAction} from '../app/actions/jobActions'
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

const JobForm = ({orgId, jobDoc}) => {
    console.log(jobDoc)
    const [countryId, setCountryid] = useState(jobDoc?.countryId || 0);
    const [stateId, setstateid] = useState(jobDoc?.stateId || 0);
    const [cityId, setCityId] = useState(jobDoc?.cityId || 0)
    const [countryName, setCountryName] = useState(jobDoc?.country || '');
    const [stateName, setstateName] = useState(jobDoc?.state || '');
    const [cityName, setCityName] = useState(jobDoc?.city || '')

    async function saveJob(data){ 
        if(jobDoc){
            data.set('id', jobDoc._id)
        }
        data.set('country', countryName)
        data.set('state', stateName)
        data.set('city', cityName)
        data.set('countryId',countryId)
        data.set('stateId',stateId)
        data.set('cityId', cityId)
        data.set('orgId', orgId)
        // console.log('THIS IS DATA:',data.entries)
        const jobD = await saveJobAction(data)
        redirect(`/jobs/${jobD.orgId}`)
    }
  return (
    <form 
        action = {saveJob}
        className='container mt-6 flex flex-col gap-4'
    >
        <h3>Job Title</h3>
        <TextField.Root name = "title" placeholder='Job title' defaultValue={jobDoc?.title || ''}/>
        <div className='flex flex-col md:flex-row'>
            <div className='w-1/3'>
                <h3>Job Icon</h3>
                <ImageUpload name = "jobIcon" icon = {faStar} defaultValue = {jobDoc?.jobIcon || ''}/>
            </div>
            <div className='grow'>
                <h3>Contact Person</h3>
                <div className='flex flex-col md:flex-row grow gap-2'>
                    <ImageUpload name = "contactPhoto" icon = {faUser} defaultValue = {jobDoc?.contactPhoto || ''}/>
                    <div className='grow flex flex-col gap-2'>
                        <TextField.Root placeholder='John Doe' type = "text" name ="contactName" defaultValue={jobDoc?.contactName || ''}>
                            <TextField.Slot>
                                <CircleUser className='size-4'/>
                            </TextField.Slot>
                        </TextField.Root>
                        <TextField.Root placeholder='Phone' type= "tel" name = "contactPhone" 
                        defaultValue={jobDoc?.contactPhone || ''}>
                            <TextField.Slot>
                                <Phone className='size-4'/>
                            </TextField.Slot>
                        </TextField.Root>
                        <TextField.Root placeholder='Email' type = "email" name = "contactEmail"
                        defaultValue={jobDoc?.contactEmail || ''}>
                            <TextField.Slot>
                                <Mail className='size-4'/>
                            </TextField.Slot>
                        </TextField.Root>
                    </div>
                </div>
            </div>
        </div>
        <div className='grid md:grid-cols-3 gap-6'>
            <div>
                Remote?
                <RadioGroup.Root defaultValue={jobDoc?.remote || 'hybrid'} name="remote">
                    <RadioGroup.Item value="onsite">On-Site</RadioGroup.Item>
                    <RadioGroup.Item value="hybrid">Hybrid-Remote</RadioGroup.Item>
                    <RadioGroup.Item value="remote">Fully Remote</RadioGroup.Item>
                </RadioGroup.Root>
            </div>
            <div>
                Full time?
                <RadioGroup.Root defaultValue={jobDoc?.type || 'full'} name="type">
                    <RadioGroup.Item value="project">Project</RadioGroup.Item>
                    <RadioGroup.Item value="part">Part-Time</RadioGroup.Item>
                    <RadioGroup.Item value="full">Full-Time</RadioGroup.Item>
                </RadioGroup.Root>
            </div>
            <div>
                Salary (per year)
                <TextField.Root name = "salary" defaultValue={jobDoc?.salary || ''}>
                    <TextField.Slot>
                        $
                    </TextField.Slot>
                    <TextField.Slot>
                        k/year
                    </TextField.Slot>
                </TextField.Root>
            </div>
        </div>
        <div>
            Location
            <div className='flex flex-col md:flex-row gap-4 *:grow'>
                <CountrySelect
                    defaultValue = {countryId ?  {id:countryId, name:countryName}:0}
                    value = {countryName}
                    onChange={(e) => {
                    setCountryid(e.id);
                    setCountryName(e.name)
                    }}
                    placeHolder="Select Country"
                />
                <StateSelect
                    defaultValue = {stateId ?  {id:stateId, name:stateName}:0}
                    countryid={countryId}
                    onChange={(e) => {
                    setstateid(e.id);
                    setstateName(e.name)
                    }}
                    placeHolder="Select State"
                />
                <CitySelect
                    defaultValue = {cityId ?  {id:cityId, name:cityName}:0}
                    countryid={countryId}
                    stateid={stateId}
                    onChange={(e) => {
                    setCityId(e.id);
                    setCityName(e.name)
                    }}
                    placeHolder="Select City"
                />
            </div>
        </div>
        <TextArea placeholder='job description' resize = "vertical" name = "description"
        defaultValue={jobDoc?.description || ''}/>
        <div className='flex justify-center'>
            <Button type = "submit" size = "4">
                <span className='px-16'>Save </span>
            </Button>
        </div>
    </form>
  )
}

export default JobForm
