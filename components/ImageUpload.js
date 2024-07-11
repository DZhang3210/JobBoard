'use client'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button } from '@radix-ui/themes'
import axios from 'axios'
import Image from 'next/image'
import React, { useRef, useState } from 'react'


const ImageUpload = ({name,icon, defaultValue}) => {
    const fileInRef = useRef()
    const [url, setUrl] = useState(defaultValue)
    const [isUploading, setIsUploading] = useState(false)
    const [isImageLoading, setIsImageLoading] = useState(false)

    async function upload (ev) {
        const input = ev.target
        // console.log(input)
        // console.log(input.files)
        if(input.files.length > 0){
            setIsUploading(true)
            const file = input.files[0]
            const data = new FormData;
            data.set('file', file)
            const response = await axios.post('/api/upload', data)
            // console.log(response)
            if(response.data.url) {
                setUrl(response.data.url)
                setIsUploading(false)
                setIsImageLoading(true)
            }
        }
    }
  return (
    <div>
        <div className='bg-gray-100 rounded-md size-24 inline-flex items-center content-center justify-center'>
            {/* <Star className='text-gray-400'/> */}
            {/* <icon/> */}
            {(isUploading || isImageLoading) && (
                <FontAwesomeIcon icon = {faSpinner}
                className='text-gray-400 animate-spin'
                />
            )}
            {(!isUploading && url) && (
                <Image src = {url} alt = {"uploaded image"} width = {1024} height = {1024} 
                onLoad = {()=> setIsImageLoading(false)}
                className = "w-auto h-auto max-w-24 max-h-24"
            />)}
            {(!isUploading && !url) && (
                <FontAwesomeIcon icon = {icon} className='text-gray-400'/>
            )}
        </div>
        <input type = "hidden" value = {url} name = {name}/>
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
