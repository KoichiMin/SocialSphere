import {  createContext, useState } from "react";


export const stateContext = createContext();



export const StateContextProvider = ({ children}) =>{
    const [load, setLoad] =useState(true)
    return(
        <stateContext.Provider value={{load, setLoad}}>
            {children}
        </stateContext.Provider>
    )
}