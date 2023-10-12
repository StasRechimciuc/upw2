import React,{ useState, useEffect }from 'react'
import { RiMenu2Fill } from 'react-icons/ri'
import SvgIcons  from '../assets/icons/SvgIcons'
import PngIcons from '../assets/icons/PngIcons'

const HamburgerMenu = () => {
    const [isMenuOpen,setIsMenuOpen] = useState(false)

    const handleMenuOpen = () => {
      setIsMenuOpen(!isMenuOpen)
      document.body.style.overflow = isMenuOpen ? 'auto' : 'hidden';
    }

  return (
    <div className={'hamburger'}>
    <div>
      <RiMenu2Fill className='hamburger-icon' onClick={() => handleMenuOpen()}/>
    </div>
    <ul className={`hamburger-list ${isMenuOpen ? 'open' : 'closed'}`}>
        <div className='elements-child hamburger-list__element' style={{ color: '#22C297' }}> <img src={PngIcons.Football} style={{ width: '24px', height: '24px' }} className="mr-4" />  Home</div>
        <div className='elements-child hamburger-list__element'> <SvgIcons.Favourite />  Favourites</div>
        <div className='elements-child hamburger-list__element'> <SvgIcons.Guess />  Guess</div>
        <div className='elements-child hamburger-list__element'> <SvgIcons.LeaderBoard /> LeaderBoard</div>
        <div className="hamburger-links">
          <div className='nav-search hamburger-list__element'> <SvgIcons.SearchIcon /></div>
          <div className='nav-download hamburger-list__element'><SvgIcons.DownloadIcon />Download App</div>
          <div className='nav-login hamburger-list__element'>Login</div>
        </div>
      </ul>
    </div>
  )
}
{/* <div> <img src={PngIcons.UK} /></div> */}

export default HamburgerMenu