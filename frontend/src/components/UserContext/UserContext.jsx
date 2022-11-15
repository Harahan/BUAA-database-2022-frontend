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
            date_joined: null,
            question: null,
            answer: null,
            last_name: null,
            first_name: null,
            age: null,
            country: null,
            tot_like: null,
            tot_dislike: null
        }
    };

    const userReducer = (state, action) => {
        let oldState = {...state};
        switch (action.type) {
            case "login":
                oldState = {
                    ...oldState,
                    status: true,
                    info: action.info
                }
                return oldState;
            case "render":
                oldState = {
                    ...oldState,
                    status: action.status,
                    info: action.info
                }
                return oldState;
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