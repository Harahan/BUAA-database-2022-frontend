import { createContext, useReducer } from 'react';

export const ChatContext = createContext();

export const ChatContextProvider = ( { children } ) => {
    const init_state = {
        singleContact: {
            username: "1111",
            latest: "fuck",
            avatar: "//images.weserv.nl/?url=https://upload-images.jianshu.io/upload_images/5809200-a99419bb94924e6d.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",
        }
    };

    const chatReducer = ( state, action ) => {
        switch ( action.type ) {
            case "change":
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