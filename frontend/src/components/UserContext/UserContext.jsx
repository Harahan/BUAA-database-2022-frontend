import { createContext, useReducer } from 'react';

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
    const init_state = {
        status: false,
        info: {
            code: null,
            id: null,
            username: null,
            email: null,
            avatar: null,
            date_joined: null
        }
    };

    const userReducer = (state, action) => {
        switch (action.type) {
            case "login":
                return {
                    status: true,
                    info: action.info
                };
            case "render":
                return {
                    status: action.status,
                    info: action.info
                };
            default:
                return state;
        }
    };

    const [state, dispatch] = useReducer(userReducer, init_state);

    return (
        <UserContext.Provider value={{ data: state, dispatch }}>
            {children}
        </UserContext.Provider>
    );
}