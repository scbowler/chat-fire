import types from './types';
import { db } from '../firebase';

export const createChatRoom = roomDetails => async dispatch => {
    const botMessage = {
        message: `Welcome to ${roomDetails.title}`,
        name: 'Chat-Bot'
    };

    const logKey = db.ref('/chat-logs').push().key;

    roomDetails.chatId = logKey;
    const roomRef = await db.ref('/chat-rooms').push(roomDetails);

    await db.ref(`/chat-logs/${logKey}`).push(botMessage);

    return roomRef.key;
}

export const getMessages = (chatId) => dispatch => {
    const dbRef = db.ref(`/chat-logs/${chatId}`);

    dbRef.on('value', (snapshot) => {
        dispatch({
            type: types.GET_CHAT_MESSAGES,
            messages: snapshot.val()
        });
    });

    return dbRef;
}

export const getRoomInfo = roomId => dispatch => {
    const dbRef = db.ref(`/chat-rooms/${roomId}`);

    dbRef.on('value', snapshot => {
        dispatch({
            type: types.GET_ROOM_INFORMATION,
            roomInfo: snapshot.val()
        });
    });

    return dbRef;
}

export const getRoomList = () => dispatch => {
    const dbRef = db.ref('/chat-rooms');

    dbRef.on('value', snapshot => {
        dispatch({
            type: types.GET_ROOM_LIST,
            roomList: snapshot.val()
        });
    });
}

export const sendMessage = (chatId, message) => dispatch => {

    const newMessage = {
        message,
        name: 'Stu'
    }

    db.ref(`/chat-logs/${chatId}`).push(newMessage);
}
