import DashboardBox from "./DasboardBox";
import { userData } from "../Login/Login";

const DashboardContent = () => {
    const investor = [{text: 'Startups With', val: '4', color: ['#1da256', '#48d483']}, {text: 'People Connected', val: '9', color: ['#c012e2', '#eb64fe']}, {text: 'Capital Owns', val: 'Rs1cr', color: ['#2c78ef', '#60aff5']}, {text: 'With NavSarjan', val: '20', color: ['#e1950e', '#f3cd29']}];
    const user = [{text: 'Projects', val: '4'}, {text: 'People Connected', val: '9'}, {text: 'Company', val: 'Rs1cr'}, {text: 'With NavSarjan', val: '20'}];
    let valUser = user;
    if (userData.type === 'investor')
        valUser = investor
    return(
        <div className="right-content w-100">
            <div className="row dashboardBoxWrapperRow">
                <div className="col-md-8">
                    <div className="dashboardBoxWrapper d-flex">
                        {valUser.map((row, index) => {
                            return(
                                <DashboardBox valUser={row} color={row.color} key={index}/>);
                            })}
                    </div>
                </div>
                <div className="col-md-4 pl-0">
                    <div className="box">
                    </div>
                </div>
            </div>
        </div>

    );
}
export default DashboardContent;