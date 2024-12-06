import CountUp from 'react-countup';

function Countup(){
    return(
        <>
            <div className='grid md:grid-cols-4 sm:grid-cols-2 text-center px-20 '>
                <div className=''>
                    <h2 className='text-6xl font-bold text-[#262626]'> 
                        <CountUp start={0} end={745} >%</CountUp>
                    </h2>
                    <p className='py-2 text-[#595959] font-medium'>success</p>
                </div>
                <div>
                    <h2 className='text-6xl font-bold text-[#262626]'> 
                        <CountUp start={0} end={955} >%</CountUp>
                    </h2>
                    <p className='py-2 text-[#595959] font-medium'>success</p>
                </div>
                <div>
                    <h2 className='text-6xl font-bold text-[#262626]'> 
                        <CountUp start={0} end={405} >%</CountUp>
                    </h2>
                    <p className='py-2 text-[#595959] font-medium'>success</p>
                </div>
                <div>
                    <h2 className='text-6xl font-bold text-[#262626]'> 
                        <CountUp start={0} end={305} >%</CountUp>
                    </h2>
                    <p className='py-2 text-[#595959] font-medium'>success</p>
                </div>
            </div>
        </>
    );
};

export default Countup;