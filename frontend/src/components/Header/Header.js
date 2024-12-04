import { Link } from "react-router-dom"
import React, { useContext, useState } from "react";
import logo from './Navsarjanlogo.png'
import { MdOutlineMenu, MdMenuOpen } from "react-icons/md";
import { FaWheelchair, FaLanguage, FaBell, FaVolumeUp, FaFont } from "react-icons/fa";
import {TbLetterASmall} from 'react-icons/tb'
import SearchBox from "../SearchBox/SearchBox";
import TranslateComponent from "../../TranslateComponent";
import {Menu, MenuItem, Button } from '@mui/material';
import { Logout, RotateLeft } from '@mui/icons-material';
import { Avatar } from "@mui/material";
import { MyContext } from "../../pages/Dashboard/Dashboard";



const dropMenuTop = (data, anchorEl, handleClick, handleClose, open, classname) => {
    let notificationPart = null;
    if (classname === 'notif')
    {
        notificationPart = React.createElement('div', {style: {width: '100%', fontSize: '16px', padding: '0px 5px 0px 15px'}}, data.length+" Messages")
    }
    return (
        <Menu anchorEl={anchorEl} className={classname}  open={open} MenuListProps={{
            'aria-labelledby': 'long-button',
            'id':"long-menu"
          }} onClose={handleClose} onClick={handleClose} PaperProps={{ elevation: 0, sx: { overflowY: 'scroll', maxHeight: '50%',filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))', mt: 1.5, '& .MuiAvatar-root': { width: 32,   height: 32, ml: -0.5, mr: 1,}, '&::before': { content: '""', display: 'block', position: 'absolute', top: 0, right: 14, width: 10,height: 10, bgcolor: 'background.paper',transform: 'translateY(-50%) rotate(45deg)',zIndex: 0, }, },}} transformOrigin={{ horizontal: 'right', vertical: 'top' }} anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}>
            {notificationPart}
            {data.map((row, index) => {
                let IconComponent = null;
                let headerComp = null;
                if ('icon' in row)
                    IconComponent = row.icon;
                if ('header' in row){
                    headerComp = React.createElement('div', {style: {maxHeight: '150px', borderBottom: "1px solid rgba(0, 0, 0, 0.3", width: "100%"}}, React.createElement('h5', {style:{color: 'blue', fontSize: '12px', padding: "1px", texWrap: "wrap", margin: '0px'}}, row.header), React.createElement('p', {style:{margin: '0px', fontSize: '15px'}}, row.write));
                }
                let col = 'white';
                if (row.visited === 'false'){
                    col = '#0858f721';
                }
                return(
                    <Link key={index} to={row.link} style={{color: '#292929', textDecoration: 'none'}}>
                        <MenuItem key={index} paperprops={{backgroundColor: col}}>
                            {IconComponent}
                            {headerComp}
                            {row.text}
                        </MenuItem>
                    </Link>
                );
            })}
        </Menu>
    );
}

const Header = ({userdata}) => {
    /*const myAccountlist = [ {text: 'My account', icon: <Avatar/>, link: `profile/${userdata.userid}`}, {text: 'Reset Password', icon: <RotateLeft/>, link: 'profile/password'}, {text: 'Logout', icon: <Logout/>, link: '/'}]
    const [accountAnchor, setaccountAnchor] = useState(null);
    const openAccount = Boolean(accountAnchor);
    const handleClickaccount = (event) => {
        setaccountAnchor(event.currentTarget);
    }
    const handleCloseaccount = () => {
        setaccountAnchor(null);
    }
    // Notifiaction Fetching Option
    const mynotificationlist = [ {write: 'You have a message', header: 'Chirag', visited: 'false'}, {write: 'Meeting Scheduled with Goldman Sachs', header: "Meeting Ahead"}, {write: 'you changed password today', header: "Accounts Change"}, {write: 'Meeting Scheduled with Goldman Sachs', header: "Meeting Ahead"}, {write: 'Meeting Scheduled with Goldman Sachs', header: "Meeting Ahead"} , {write: 'Meeting Scheduled with Goldman Sachs', header: "Meeting Ahead"}, {write: 'Meeting Scheduled with Goldman Sachs', header: "Meeting Ahead"}, {write: 'Meeting Scheduled with Goldman Sachs', header: "Meeting Ahead"}, {write: 'Meeting Scheduled with Goldman Sachs', header: "Meeting Ahead"}, {write: 'Meeting Scheduled with Goldman Sachs', header: "Meeting Ahead"}, {write: 'Meeting Scheduled with Goldman Sachs', header: "Meeting Ahead"}, {write: 'Meeting Scheduled with Goldman Sachs', header: "Meeting Ahead"}]
    const [notificationAnchor, setnotificationAnchor] = useState(null);
    const opennotif = Boolean(notificationAnchor);
    const handleClicknotif = (event) => {
        setnotificationAnchor(event.currentTarget);
    }
    const handleClosenotif = () => {
        setnotificationAnchor(null);
    }
    const myassecclist = [ {icon: <FaVolumeUp/>}, {icon: <FaFont/>}, {icon: <TbLetterASmall/>}]
    const [asseccAnchor, setasseccAnchor] = useState(null);
    const openassecc = Boolean(asseccAnchor);
    const handleClickassecc = (event) => {
        setasseccAnchor(event.currentTarget);
    }
    const handleCloseassecc = () => {
        setasseccAnchor(null);
    }
    
    const context = useContext(MyContext);
    return (
        <div>
            <header className="d-flex align-items-center">
                <div className="container-fluid w-100">
                    <div className="col d-flex align-items-center">
                        <div className="col-sm-2 part1">
                            <Link to={'/dashboard'} className="d-flex align-items-center headerlogo">
                                <img src={logo} alt="NavSarjan"/>
                            </Link>
                        </div>
                        <div className="col-sm-3 d-flex align-items-center part2 pl-4">
                            <Button className="rounded-circle" onClick={()=>context.setisToggleSidebar(!context.isToggleSidebar)}>
                            {
                                context.isToggleSidebar === false ? <MdMenuOpen/>: <MdOutlineMenu/>
                            }
                            </Button>
                            <SearchBox/>
                        </div>
                        <div className="col-sm-7 d-flex align-items-center justify-content-end part3">
                            <Button className="rounded-circle mr-3" onClick={handleClickassecc}><FaWheelchair/></Button>
                            {dropMenuTop(myassecclist, asseccAnchor, handleClickassecc, handleCloseassecc, openassecc)}
                            <Button className="rounded-circle mr-3"><TranslateComponent/><FaLanguage className="langbtn"/></Button>
                            <Button className="rounded-circle mr-3" onClick={handleClicknotif}><FaBell/></Button>
                            {dropMenuTop(mynotificationlist, notificationAnchor, handleClicknotif, handleClosenotif, opennotif, "notif")}
                            <div className="myAccWrapper">
                                <Button className="myAcc d-flex align-items-center" onClick={handleClickaccount}>
                                    <div className="userImg">
                                        <span className="rounded-circle">
                                            <img src="https://mironcoder-hotash.netlify.app/images/avatar/01.webp" alt="profileImage"/>
                                        </span>
                                    </div>
                                    <div className="userInfo">
                                        <h4>{userdata.name}</h4>
                                        <p>{userdata.userid}</p>
                                    </div>
                                </Button>
                                {dropMenuTop(myAccountlist, accountAnchor , handleClickaccount, handleCloseaccount, openAccount, "account")}
                            </div>
                        </div>
                    </div>

                </div>
            </header>
        </div>
    );*/

    return(
        <div>
            <h1>hello header</h1>
        </div>
    )
}
export default Header;