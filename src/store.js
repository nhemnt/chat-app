import React from 'react';
import io from 'socket.io-client';
import { Names } from './data';

export const CTX = React.createContext();
const intialState = {
    College: [
        {
            from: 'Hitesh', msg: 'How are you bro?'
        },
        {
            from: 'Karan', msg: 'Yoo man.'
        },
        {
            from: 'Virender', msg: 'Dudee..!'
        }
    ],
    School: [
        {
            from: 'Himanshu', msg: 'How are you bro?'
        },
        {
            from: 'Anshul', msg: 'Yoo man.'
        },
        {
            from: 'Rahul', msg: 'Dudee..!'
        }
    ]
}
function reducer(state, action) {
    const { from, msg, topic } = action.payload;
    switch (action.type) {
        case 'RECEIVE_MESSAGE':
            return {
                ...state,
                [topic]: [
                    ...state[topic],
                    { from, msg }
                    ]
                }
        default:
            return state
    }
}

let socket;

function sendChatAction( value) {
    socket.emit('chat message', value);
}

export default function Store(props) { 
    const [allChats, dispatch] = React.useReducer(reducer, intialState);

    if (!socket) {
        socket = io(':3001');
        socket.on('chat message', (msg) => { 
            console.log({ msg })
            dispatch({
                payload: msg,
                type: 'RECEIVE_MESSAGE'
            })
        })
    }
    const user = Names[Math.floor(Math.random()*Names.length)];
   
    return (
        
        <CTX.Provider value={{allChats, sendChatAction, user}}>
            {props.children}
        </CTX.Provider>
    )
}