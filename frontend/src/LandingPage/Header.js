
function Header(){
    return(
        <>
            <div className="py-3 text-black flex flex-wrap flex-row-reverse">
                <select className="mx-2">
                    <option>Select a language</option>
                    <option>Gujarati</option>
                    <option>English</option>
                </select>
                <h2 className="font-semibold text-2xl mx-3">Screen Reader Access</h2>
            </div>
        </>
    );
};

export default Header;