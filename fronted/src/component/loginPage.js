
import '../styles/loginPage.css';
import { useNavigate } from 'react-router-dom';

function Login({user})
{
    const navigate=useNavigate();
    const handleClick=(e)=>
    {
        //navigate to home page
        e.preventDefault();
        navigate('/home');
    }
    
    return (
        <>
            <section>
                    <form>
                        <label>Enter Your Name</label>
                        <input type="text" onChange={(e)=>{user(e.target.value)}}/>
                        <button onClick={handleClick}>Login</button>
                    </form>
            </section>
        </>
    );
}

export default Login;