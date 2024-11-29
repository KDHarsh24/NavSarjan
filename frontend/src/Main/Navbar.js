import logo from "./logo.jpg";

function Navbar(){
    return(
        <>
         <div className="flex start-0 p-3 ">
            <div className="w-1/12">
                 <img src={logo} alt="logo image"/>
            </div>
         </div>
        </>
    );
};

export default Navbar;