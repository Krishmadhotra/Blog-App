import { Footer } from 'flowbite-react';
import React from 'react'
import {Link} from "react-router-dom"
import {BsFacebook,BsTwitter,BsInstagram,BsGithub,BsDribbble} from "react-icons/bs"
const FooterComp = () => {
  return (
     <Footer container className="border border-t-8 border-teal-500">
        <div className="w-full max-w-7xl mx-auto">
            <div className="grid  w-full justify-between sm:flex md:grid-cols-1">
                <div className="mt-5">
                <Link to="/" className='self-center whitespace-nowrap text-lg sm:text-xl font-semibold dark:text-white'>
                <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>Krish's </span>
            Blog
            </Link>
        </div>
        <div className="grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3 sm:gap-6">
           <div>
            <Footer.Title title="About" />
            <Footer.LinkGroup col>
                <Footer.Link href="https://github.com/Krishmadhotra" target="_blank"
                rel="noopener noreferrer">Exciting Projects</Footer.Link>
                <Footer.Link href="/home"
                target="_blank"
                rel="noopener noreferrer">
                    Krish's Blog
                </Footer.Link>
            </Footer.LinkGroup>
            </div> 
            <div>
               <Footer.Title title="Follow Me"/>
               <Footer.LinkGroup col>
                <Footer.Link
                href="https://github.com/krishMadhotra" 
                target="_blsnk"
                rel="noopener noreferrer">GitHub</Footer.Link>
                <Footer.Link href="#">Discord</Footer.Link>
               </Footer.LinkGroup>
             </div>
             <div>
             <Footer.Title title="LEGAL" />
             <Footer.LinkGroup col>
                <Footer.Link href="#">Privacy Policy</Footer.Link>
                <Footer.Link href="#">Terms &  Conditions</Footer.Link>
             </Footer.LinkGroup>
            </div>
        </div>
    </div>
    <Footer.Divider />
    <div className="w-full sm:flex sm:items-center sm:justify-between">
        <Footer.Copyright href="#" by="krish's blog" year={new Date().getFullYear()}
        />
        <div className="flex gap-6 sm:mt-0 mt-4 sm:justify-center">
            <Footer.Icon href="#" icon={BsFacebook} />
            <Footer.Icon href="https://www.instagram.com/krish_madhotra" icon={BsInstagram} />
            <Footer.Icon href="http://www.twitter.com/krishmadhotra" icon={BsTwitter} />
            <Footer.Icon href="http://github.com/krishmadhotra" icon={BsGithub} />
            <Footer.Icon href="#" icon={BsDribbble} />
         </div>
    </div>
    
</div>
</Footer>
  )
}

export default FooterComp;