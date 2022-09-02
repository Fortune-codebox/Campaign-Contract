import React, { Fragment, useState } from 'react';
import {Menu} from 'semantic-ui-react';
import {Link} from '../routes';
import {HiMenuAlt4} from 'react-icons/hi';
import {AiOutlineClose} from 'react-icons/ai';

const NavbarItem = ({title, classProps}) => {
  
  return(
    <li className={`mx-4 cursor-pointer ${classProps}`}>
      {title}
    </li>
  )
}


const Header = () => {
  const [toggle, setToggle] = useState(false)

  return (
      <nav className="w-full flex md:justify-center justify-between items-center p-4" >
          {/* Logo */}
          <div className="md:flex-[0.5] flex-inital justify-center items-center">
              <img src="#" alt="logo" className="w-32 cursor-pointer" />

          </div>
        {/* Large Screens */}
          <ul className="text-white md:flex hidden list-none flex-row justify-between items-center flex-initial">
            {["Market", "Exchange", "Tutorials", "Wallets"].map((item, i) => (
                  <NavbarItem key={i} classProps="my-2 text-lg" title={item} />
            ))}
            <li className="bg-[#2952e3] py-2 px-7 mx-4 rounded-full cursor-pointer hover:bg-[#2546bd]">
              Login
            </li>
          </ul>

         {/* Mobile */}
          <div className="flex-relative ">
              {toggle ? 
                  <AiOutlineClose fontSize={28} className="text-white md:hidden cursor-pointer" onClick={() => setToggle(false)} /> : 
                  <HiMenuAlt4 fontSize={28} className="text-white md:hidden cursor-pointer" onClick={() => setToggle(true)} />}
              {toggle && (
                <ul
                  className="z-10 fixed top-0 -right-2 p-3 w-[70vw] h-screen shadow-2xl md:hidden list-none 
                  flex flex-col justify-start items-end rounded-md blue-glassmorphism text-white animate-slide-in"
                >
                  <li className="text-xl w-full my-2 ">
                      <AiOutlineClose onClick={() => setToggle(false)} />
                  </li>
                  {["Market", "Exchange", "Tutorials", "Wallets"].map((item, i) => (
                  <NavbarItem key={i} classProps="my-2 text-lg" title={item} />
                    ))}
                </ul>
              )}
          
          </div>

        

         {/* <Menu>
      
          <Link route="/">
            <a className="item">FutureCoin</a>
          </Link>

          <Menu.Menu position="right">
          <Link route="/">
            <a className="item">Campaigns</a>
          </Link>
          <Link route="/campaigns/new">
            <a className="item">+</a>
          </Link>
          </Menu.Menu>

      </Menu> */}

    </nav>
    
  )
}

export default Header
