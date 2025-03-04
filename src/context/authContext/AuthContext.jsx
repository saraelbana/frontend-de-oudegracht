import {createContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

export const AuthContext = createContext({});

function AuthContextProvider({children}) {
    const [logedinUserData, setLogedinUserData] = useState(null);
    const navigate = useNavigate();

    function logout() {
        localStorage.clear();
        setLogedinUserData(null);
        navigate("/");

    }
    function login(userData){
        setLogedinUserData(userData);

    }
    useEffect(() => {
        if (logedinUserData) {
            console.log("Logged in");
        }
    }, [logedinUserData]);

    const data = {
        user: logedinUserData,
        loginHandler: login,
        logoutHandler: logout
    }
    return (
        <AuthContext.Provider value={data}>
            {children}
        </AuthContext.Provider>
    );
}
export default AuthContextProvider;