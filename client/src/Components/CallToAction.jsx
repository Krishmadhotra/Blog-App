import { Button } from 'flowbite-react'
import React from 'react'

const CallToAction = () => {
  return (
    <div className='flex flex-fol sm:flex-row p-3 border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl'>
        <div className='flex-1 justify-center flex flex-col'>
            <h2 className='text-2xl'>Want to gain more information about JavaScript</h2>
            <p className='text-gray-500 my-2'>Check these Projects</p>
            <Button gradientDuoTone='purpleToPink' className='rounded-tl-xl rounded-bl-none'>
                <a href="http://www.github.com/krishmadhotra" target='_blank' rel="noopener noreferrer" >Click here</a>            </Button>
        </div>
        <div className='p-7 flex-1'>
            <img src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.bairesdev.com%2Fblog%2Fwhat-is-javascript-used-for%2F&psig=AOvVaw2IQuDx4N-oMyJsSQIrs7XU&ust=1721554570225000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCMi02NaotYcDFQAAAAAdAAAAABAE" />
        </div>
    </div>
  )
}

export default CallToAction