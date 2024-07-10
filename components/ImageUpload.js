'use client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button } from '@radix-ui/themes'
import axios from 'axios'
import React, { useRef } from 'react'


const ImageUpload = ({icon}) => {
    const fileInRef = useRef()
    async function upload (ev) {
        const input = ev.target
        // console.log(input)
        console.log(input.files)
        if(input.files.length > 0){
            const file = input.files[0]
            const data = new FormData;
            data.set('file', file)
            const response = await axios.post('/api/upload', data)
            console.log(response)
        }
    }
  return (
    <div>
        <div className='bg-gray-100 rounded-md size-24 inline-flex items-center content-center justify-center'>
            {/* <Star className='text-gray-400'/> */}
            <icon/>
            <FontAwesomeIcon icon = {icon} className='text-gray-400'/>
        </div>
        <div className='mt-2'>
            <input 
                onChange = {upload}
                ref = {fileInRef} 
                type = "file" 
                className='hidden'
            />
            <Button 
                type = "button"
                onClick = {()=> fileInRef.current?.click()}
                variant='soft'>
                Select File
            </Button>
        </div>
    </div>
  )
}

export default ImageUpload
