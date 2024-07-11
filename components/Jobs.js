import React from 'react'
import JobRow from './JobRow'

const Jobs = ({header, jobs}) => {
  
  return (
    <div className='bg-slate-200 py-6 rounded-3xl'>
        <div className='container'>
            <h2 className='font-bold mb-4'>{header || 'Recent Jobs'}</h2>
            <div className='flex flex-col gap-4'>
              {!jobs?.length && (
                <div>
                  No Jobs Found
                </div>
              )}
              {jobs && jobs.map((job,i) => (
                <JobRow jobInfo = {job} key = {i}/>
              ))}
            </div>
        </div>
    </div>
  )
}

export default Jobs
