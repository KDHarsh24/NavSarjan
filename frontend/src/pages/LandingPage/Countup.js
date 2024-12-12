import CountUp from 'react-countup';
import Startup from './Images/Startup.png';
import Founding from './Images/Founding.png';
import help from './Images/help.png';
import presentation from './Images/presentation.png';

function Countup(){
    return(
            <div className='grid md:grid-cols-4 sm:grid-cols-2 text-center px-20 '>
                <div>
                    <div className='flex flex-wrap text-center'>
                        <img src={Startup} alt="startup img" className='w-15 h-20'/>
                        <h2 className='text-6xl font-bold text-[#262626]'> 
                            <CountUp start={0} end={745} suffix='+' ></CountUp>
                        </h2>
                    </div>
                    <p className='py-2 text-[#595959] font-medium'>GRASSROOT STARTUPS</p>
                </div>

                <div>
                    <div className='flex flex-wrap text-center'>
                        <img src={presentation} alt="startup img" className='w-15 h-20'/>
                        <h2 className='text-6xl font-bold text-[#262626]'> 
                            <CountUp start={0} end={345} suffix='+'></CountUp>
                        </h2>
                    </div>
                    <p className='py-2 text-[#595959] font-medium'>INCUBATORS</p>
                </div>

                <div>
                    <div>
                        <div className='flex flex-wrap text-center'>
                        <img src={help} alt="startup img" className='w-15 h-20'/>
                        <h2 className='text-6xl font-bold text-[#262626]'> 
                            <CountUp start={0} end={200} suffix='+'></CountUp>
                        </h2>
                        </div>
                    </div>
                    <p className='py-2 text-[#595959] font-medium'>MENTORS</p>
                </div>
 
                <div>
                    <div className='flex flex-wrap text-center '>
                        <img src={Founding} alt="Founding img" className='w-15 h-20'/>
                        <h2 className='text-6xl font-bold text-[#262626]'> 
                        <CountUp start={0} end={305} suffix='+'></CountUp>
                        </h2>
                    </div>
                    <p className='py-2 text-[#595959] font-medium'>INVESTORS</p>
                </div>

            </div>

    );
};

export default Countup;