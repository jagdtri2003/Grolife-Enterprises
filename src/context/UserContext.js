import { createContext,useState } from "react";

const Context = createContext();

const UserContext = ({children}) =>{
    const [user,setUser] = useState(null);

    return(
        <Context.Provider value={{user,setUser}}>
            {children}
        </Context.Provider>
    )

}


export  {Context,UserContext};