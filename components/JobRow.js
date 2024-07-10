import { Heart } from 'lucide-react'
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'

const JobRow = () => {
  return (
    <div className='bg-white p-4 rounded-lg shadow-sm md:flex relative'>
        <div className='absolute top-4 right-4 cursor-pointercc'>
            <Heart className='size-6 text-gray-500'/>
            {/* <FontAwesomeIcon className = "size-6 text-gray-500" icon={faHeart}/> */}
        </div>
        <div className='flex gap-4 grow'>
            <div className=' content-center'>
                <img 
                    className='size-12'
                    src = "https://upload.wikimedia.org/wikipedia/commons/7/71/Spotify.png" 
                    alt = "logo"
                />
            </div>
            <div className='grow sm:flex'>
                <div className='grow'>
                    <div className='text-gray-500 text-sm'>Spotify</div>
                    <div className='font-bold text-lg mb-1'>Product Designer</div>
                    <div className='text-gray-500 text-sm'>
                        Remote &middot; New York, US &middot; Full-Time
                    </div>
                </div>
                <div className='content-end text-gray-500 text-sm'>
                    2 weeks ago
                </div>
            </div>
        </div>
    </div>
  )
}

export default JobRow
