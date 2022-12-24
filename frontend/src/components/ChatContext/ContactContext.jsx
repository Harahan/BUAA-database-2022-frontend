import { createContext, useReducer } from 'react';
import axios from 'axios';
export const ContactContext = createContext();

export const ContactContextProvider = ( { children } ) => {

    const init_state = {
        allChat: []
    };

    const chatReducer = ( state, action ) => {
        switch ( action.type ) {
            case "change":
                console.log( state );
                console.log( action.payload );
                return {
                    allChat: action.payload
                };
            default:
                return state;
        }
    };

    const [ state, dispatch ] = useReducer( chatReducer, init_state );

    return (
        <ContactContext.Provider value={ { data: state, dispatch } }>
            { children }
        </ContactContext.Provider>
    );
}