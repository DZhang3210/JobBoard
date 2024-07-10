import React from 'react'

const Hero = () => {
  return (
    <section className='container my-16'>
        <h1 className='text-4xl font-bold text-center'>
            Find your next <br/> dream job
        </h1>
        {/* <p className='text-center text-gray-600 max-w-lg mx-auto mt-2'>
            Voluptate exercitation deserunt consequat culpa qui in sint fugiat consectetur culpa do ea.
        </p> */}
        <form className='flex gap-2 mt-4 max-w-xl mx-auto'>
            <input 
                type = "search" 
                className='border border-gray-400 w-full py-2 px-3 rounded-md' 
                placeholder = "Search phrase..."
            />
            <button className='bg-blue-600 text-white py-2 px-4 rounded-md'>
                Search
            </button>
        </form>
    </section>
  )
}

export default Hero
