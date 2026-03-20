import { useDispatch, useSelector } from "react-redux";
import { serverUrl } from "../main";
import { setUserData } from "../redux/userSlice";
import { useEffect} from "react";
import axios from "axios";

const getCurrentUser = ()=>{
    let dispatch = useDispatch();
    let {userData} = useSelector(state=> state.user)
    useEffect(()=>{
        const fetchUser = async ()=>{
            try{
                let result = await axios.get(`${serverUrl}/api/user/currentUser`, {withCredentials:true})
            
                dispatch(setUserData(result.data.user));
            }
            catch(err){
                console.log(err);
            }
        }
        fetchUser();
    }, [])
}

export default getCurrentUser;