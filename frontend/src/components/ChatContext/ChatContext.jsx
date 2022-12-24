import { createContext, useReducer } from 'react';

export const ChatContext = createContext();

export const ChatContextProvider = ( { children } ) => {
    const init_state = {
        singleContact: {}
    };

    const chatReducer = ( state, action ) => {
        switch ( action.type ) {
            case "change":
                console.log( state );
                console.log( action.payload );
                return {
                    singleContact: action.payload
                };
            default:
                return state;
        }
    };

    const [ state, dispatch ] = useReducer( chatReducer, init_state );

    return (
        <ChatContext.Provider value={ { data: state, dispatch } }>
            { children }
        </ChatContext.Provider>
    );
}