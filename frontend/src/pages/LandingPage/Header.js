// import Satyemevimage from "./Images/satyamev_jayate.png";
import TranslateComponent from "../../TranslateComponent";
import { Button } from "@mui/material";
import { FaLanguage } from "react-icons/fa";
function Header(){
    return( 
        <>
            <div className="py-1 bg-white text-black flex flex-wrap flex-row-reverse">
            
                <div className="flex flex-wrap flex-row-reverse">
                
                <Button className="rounded-circle mr-4"><TranslateComponent/><FaLanguage className="langbtn"/></Button>
                
                <h2 className="font-semibold text-2xl mx-3">Screen Reader Access</h2>
                </div>
            </div>
        </>
    );
};

export default Header;