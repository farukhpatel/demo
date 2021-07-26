import { useHistory } from "react-router-dom";
// import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowBackIosOutlinedIcon from '@material-ui/icons/ArrowBackIosOutlined';
import './Back.css'

function Back(){
    
    let history = useHistory();
    return(
        <div>
            <button className="buttonBack" onClick={() => history.goBack()}>
            <ArrowBackIosOutlinedIcon></ArrowBackIosOutlinedIcon>
            </button>
        </div>
    );
}
export default Back;