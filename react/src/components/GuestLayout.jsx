import { Navigate, Outlet } from "react-router-dom"
import { useStateContext } from "../contexts/ContextProvider"


function GuestLayout(){
    const {user, token} = useStateContext();

    if(token) {
        return <Navigate to="/"></Navigate>
    }

    return(
        <>
            <Outlet/>
        </>
    )
}
export default GuestLayout