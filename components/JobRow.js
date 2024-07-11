import { Heart } from 'lucide-react'
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import TimeAgo from './TimeAgo'
import Link from 'next/link'
const JobRow = async ({jobInfo}) => {
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
                    // src = "https://upload.wikimedia.org/wikipedia/commons/7/71/Spotify.png" 
                    src = {jobInfo.jobIcon}
                    alt = "logo"
                />
            </div>
            <div className='grow sm:flex'>
                <div className='grow'>
                    <div className='text-gray-500 text-sm'>{jobInfo.orgName}</div>
                    <div className='font-bold text-lg mb-1'>{jobInfo.title}</div>
                    <div className='text-gray-500 text-sm capitalize'>
                        {jobInfo.remote} &middot; {jobInfo.state}, {jobInfo.country} &middot; {jobInfo.type}-time{' '}
                        {jobInfo.isAdmin && (
                            <>
                            {' '}&middot;{' '}
                            <Link href={`/jobs/edit/${jobInfo._id}`}>
                                Edit
                            </Link>
                            {' '}&middot;{' '}
                            <Link href= {`/jobs/delete/${jobInfo._id}`}>
                                Delete
                            </Link>
                            </>
                        )}
                    </div>
                </div>
                {
                    jobInfo.createdAt && (
                        <div className='content-end text-gray-500 text-sm'>
                            <TimeAgo createdAt={jobInfo.createdAt}/>
                        </div>
                    )
                }
                
            </div>
        </div>
    </div>
  )
}

export default JobRow
