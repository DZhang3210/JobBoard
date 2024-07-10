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

const JobForm = () => {
    const [countryid, setCountryid] = useState(0);
    const [stateid, setstateid] = useState(0);
  return (
    <form 
        action = ""
        className='container mt-6 flex flex-col gap-4'
    >
        <h3>Job Title</h3>
        <TextField.Root placeholder='Job title' />
        <div className='flex'>
            <div className='w-1/3'>
                <h3>Job Icon</h3>
                <ImageUpload icon = {faStar}/>
            </div>
            <div className='grow'>
                <h3>Contact Person</h3>
                <div className='flex grow gap-2'>
                    <ImageUpload icon = {faUser}/>
                    <div className='grow flex flex-col gap-2'>
                        <TextField.Root placeholder='John Doe' type = "text">
                            <TextField.Slot>
                                <CircleUser className='size-4'/>
                            </TextField.Slot>
                        </TextField.Root>
                        <TextField.Root placeholder='Phone' type= "tel">
                            <TextField.Slot>
                                <Phone className='size-4'/>
                            </TextField.Slot>
                        </TextField.Root>
                        <TextField.Root placeholder='Email' type = "email">
                            <TextField.Slot>
                                <Mail className='size-4'/>
                            </TextField.Slot>
                        </TextField.Root>
                    </div>
                </div>
            </div>
        </div>
        <div className='grid grid-cols-3 gap-6'>
            <div>
                Remote?
                <RadioGroup.Root defaultValue="hybrid" name="example">
                    <RadioGroup.Item value="onsite">On-Site</RadioGroup.Item>
                    <RadioGroup.Item value="hybrid">Hybrid-Remote</RadioGroup.Item>
                    <RadioGroup.Item value="remote">Fully Remote</RadioGroup.Item>
                </RadioGroup.Root>
            </div>
            <div>
                Full time?
                <RadioGroup.Root defaultValue="full" name="example">
                    <RadioGroup.Item value="project">Project</RadioGroup.Item>
                    <RadioGroup.Item value="part">Part-Time</RadioGroup.Item>
                    <RadioGroup.Item value="full">Full-Time</RadioGroup.Item>
                </RadioGroup.Root>
            </div>
            <div>
                Salary (per year)
                <TextField.Root>
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
            <div className='flex gap-4 *:grow'>
                <CountrySelect
                    onChange={(e) => {
                    setCountryid(e.id);
                    }}
                    placeHolder="Select Country"
                />
                <StateSelect
                    countryid={countryid}
                    onChange={(e) => {
                    setstateid(e.id);
                    }}
                    placeHolder="Select State"
                />
                <CitySelect
                    countryid={countryid}
                    stateid={stateid}
                    onChange={(e) => {
                    console.log(e);
                    }}
                    placeHolder="Select City"
                />
            </div>
        </div>
        <TextArea placeholder='job description' resize = "vertical"/>
        <div className='flex justify-center'>
            <Button size = "4">
                <span className='px-16'>Save </span>
            </Button>
        </div>
    </form>
  )
}

export default JobForm
