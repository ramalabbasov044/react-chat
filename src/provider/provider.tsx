import { createContext , useContext , useState } from 'react'

export const globalContext = createContext()


// eslint-disable-next-line react-refresh/only-export-components
export const useGlobalStore = () => {
    const value = useContext(globalContext)
    return value
}

// eslint-disable-next-line react/prop-types
const Provider = ({ children }) => {
    // eslint-disable-next-line no-unused-vars
    const [userData,setUserData] = useState([])
    const Component = globalContext.Provider
    
    const values = {
        userData,
        setUserData,
    }


    return (
        <Component value={values}>
            {
                children
            }
        </Component>
    )
}

export default Provider