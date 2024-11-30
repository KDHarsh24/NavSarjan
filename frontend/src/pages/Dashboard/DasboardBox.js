const DashboardBox = (props, {valUser}) => {
    return (
    <div className="dashboardBox" style={{
        backgroundImage: `linear-gradient(to right, ${props.color?.[0]}, ${props.color?.[1]})`
    }}>
        <div className="dashboardBoxdescribe">
            {props.valUser.text}
            <div className="dashboardBoxval">
                {props.valUser.val}
            </div>
        </div>
        <div className="dashboardBoxlogo">
            {props.valUser.icon}
        </div>
    </div>
    );
}
export default DashboardBox;