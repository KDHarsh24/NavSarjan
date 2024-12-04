import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { 
  MdOutlineMenu, 
  MdMenuOpen 
} from "react-icons/md";
import { 
  FaWheelchair, 
  FaLanguage, 
  FaBell, 
  FaVolumeUp, 
  FaFont 
} from "react-icons/fa";
import { TbLetterASmall } from 'react-icons/tb';
import { 
  Menu, 
  MenuItem, 
  Button, 
  Avatar 
} from '@mui/material';
import { Logout, RotateLeft } from '@mui/icons-material';

import logo from './Navsarjanlogo.png';
import SearchBox from "../SearchBox/SearchBox";
import TranslateComponent from "../../TranslateComponent";
import { MyContext } from "../../pages/Dashboard/Dashboard";

const DropMenu = ({ 
  data, 
  anchorEl, 
  handleClose, 
  open, 
  classname 
}) => {
  const renderNotificationHeader = () => 
    classname === 'notif' 
      ? <div style={{ width: '100%', fontSize: '16px', padding: '0px 5px 0px 15px' }}>
          {data.length} Messages
        </div> 
      : null;

  return (
    <Menu 
      anchorEl={anchorEl}
      className={classname}
      open={open}
      onClose={handleClose}
      onClick={handleClose}
      MenuListProps={{
        'aria-labelledby': 'long-button',
        'id': "long-menu"
      }}
      PaperProps={{ 
        elevation: 0, 
        sx: { 
          overflowY: 'scroll', 
          maxHeight: '50%',
          filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
          mt: 1.5,
          '& .MuiAvatar-root': { 
            width: 32, 
            height: 32, 
            ml: -0.5, 
            mr: 1 
          },
          '&::before': { 
            content: '""', 
            display: 'block', 
            position: 'absolute', 
            top: 0, 
            right: 14, 
            width: 10,
            height: 10, 
            bgcolor: 'background.paper',
            transform: 'translateY(-50%) rotate(45deg)',
            zIndex: 0 
          } 
        }
      }}
      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
    >
      {renderNotificationHeader()}
      {data.map((row, index) => {
        const IconComponent = row.icon || null;
        const headerComp = row.header ? (
          <div style={{ 
            maxHeight: '150px', 
            borderBottom: "1px solid rgba(0, 0, 0, 0.3)", 
            width: "100%" 
          }}>
            <h5 style={{
              color: 'blue', 
              fontSize: '12px', 
              padding: "1px", 
              textWrap: "wrap", 
              margin: '0px'
            }}>
              {row.header}
            </h5>
            <p style={{ margin: '0px', fontSize: '15px' }}>
              {row.write}
            </p>
          </div>
        ) : null;

        const backgroundColor = row.visited === 'false' ? '#0858f721' : 'white';

        return (
          <Link 
            key={index} 
            to={row.link} 
            style={{ color: '#292929', textDecoration: 'none' }}
          >
            <MenuItem 
              key={index} 
              style={{ backgroundColor }}
            >
              {IconComponent}
              {headerComp}
              {row.text}
            </MenuItem>
          </Link>
        );
      })}
    </Menu>
  );
};

const Header = ({ userdata }) => {
  const context = useContext(MyContext);

  const [accountAnchor, setAccountAnchor] = useState(null);
  const [notificationAnchor, setNotificationAnchor] = useState(null);
  const [accessibilityAnchor, setAccessibilityAnchor] = useState(null);

  const myAccountList = [
    { text: 'My account', icon: <Avatar/>, link: `profile/${userdata?.userid}` },
    { text: 'Reset Password', icon: <RotateLeft/>, link: 'profile/password' },
    { text: 'Logout', icon: <Logout/>, link: '/' }
  ];

  const myNotificationList = [
    { write: 'You have a message', header: 'Chirag', visited: 'false' },
    { write: 'Meeting Scheduled with Goldman Sachs', header: "Meeting Ahead" }
  ];

  const myAccessibilityList = [
    { icon: <FaVolumeUp/> },
    { icon: <FaFont/> },
    { icon: <TbLetterASmall/> }
  ];

  const handleMenuOpen = (setAnchor) => (event) => {
    setAnchor(event.currentTarget);
  };

  const handleMenuClose = (setAnchor) => () => {
    setAnchor(null);
  };

  return (
    <header className="d-flex align-items-center">
      <div className="container-fluid w-100">
        <div className="col d-flex align-items-center">
          {/* Logo Section */}
          <div className="col-sm-2 part1">
            <Link to='/dashboard' className="d-flex align-items-center headerlogo">
              <img src={logo} alt="NavSarjan Logo" />
            </Link>
          </div>

          {/* Menu Toggle and Search */}
          <div className="col-sm-3 d-flex align-items-center part2 pl-4">
            <Button 
              className="rounded-circle" 
              onClick={() => context.setisToggleSidebar(!context.isToggleSidebar)}
            >
              {context.isToggleSidebar ? <MdOutlineMenu/> : <MdMenuOpen/>}
            </Button>
            <SearchBox/>
          </div>

          {/* Action Buttons */}
          <div className="col-sm-7 d-flex align-items-center justify-content-end part3">
            {/* Accessibility Button */}
            <Button 
              className="rounded-circle mr-3" 
              onClick={handleMenuOpen(setAccessibilityAnchor)}
            >
              <FaWheelchair/>
            </Button>
            <DropMenu
              data={myAccessibilityList}
              anchorEl={accessibilityAnchor}
              handleClose={handleMenuClose(setAccessibilityAnchor)}
              open={Boolean(accessibilityAnchor)}
              classname="accessibility"
            />

            {/* Translation Button */}
            <Button className="rounded-circle mr-3">
              <TranslateComponent/>
              <FaLanguage className="langbtn"/>
            </Button>

            {/* Notifications Button */}
            <Button 
              className="rounded-circle mr-3" 
              onClick={handleMenuOpen(setNotificationAnchor)}
            >
              <FaBell/>
            </Button>
            <DropMenu
              data={myNotificationList}
              anchorEl={notificationAnchor}
              handleClose={handleMenuClose(setNotificationAnchor)}
              open={Boolean(notificationAnchor)}
              classname="notif"
            />

            {/* User Account Section */}
            <div className="myAccWrapper">
              <Button 
                className="myAcc d-flex align-items-center" 
                onClick={handleMenuOpen(setAccountAnchor)}
              >
                <div className="userImg">
                  <span className="rounded-circle">
                    <img 
                      src="https://mironcoder-hotash.netlify.app/images/avatar/01.webp" 
                      alt="Profile"
                    />
                  </span>
                </div>
                <div className="userInfo">
                  <h4>{userdata?.name}</h4>
                  <p>{userdata?.userid}</p>
                </div>
              </Button>
              <DropMenu
                data={myAccountList}
                anchorEl={accountAnchor}
                handleClose={handleMenuClose(setAccountAnchor)}
                open={Boolean(accountAnchor)}
                classname="account"
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;