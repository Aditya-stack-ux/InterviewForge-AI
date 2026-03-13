import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router";
import { ClipLoader } from "react-spinners";


const Protected = ({children}) => {
    const {loading, user} = useAuth()

    if(loading) {
    return(
        <main>
            <ClipLoader color="#f33939" size={40} />
        </main>
    )
}

    if(!user){
        return <Navigate to={"/login"}/>
    }

    return children
}

export default Protected
