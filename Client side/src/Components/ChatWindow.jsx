import { useEffect, useRef, useState } from 'react'
import io from 'socket.io-client';
import { Paper } from '@mui/material';
import Chatbox from './Chatbox';
import Footer from './Footer';
import { useAuth0 } from '@auth0/auth0-react';
import Loading from '../../public/loading.svg'

function ChatWindow(props) {
    const [chat, setChat] = useState([]);
    const [socket, setSocket] = useState(null);
    const [counter, setCounter] = useState(0);

    const { user, isLoading } = useAuth0();

    useEffect(() => {
        const newSocket = io('http://localhost:3000');
        newSocket.on('connect', () => {
            console.log('connected to server');
        })
        setSocket(newSocket)

        return () => {
            newSocket.close();
        }

    }, [])

    if (socket) {
        if (counter === 0) {
            socket.emit('join-room', props.id)
            setCounter(counter + 1);
        }
        if (counter === 1) {
            socket.emit('send-message', null, props.id);
            setCounter(counter + 1);
        }
        socket.on('receive-message', (obj) => {
            if (obj.length) setChat([...obj])
            else setChat([...chat, obj])
        })
    }

    function onPress(text) {
        const obj = { message: text, user: (user.given_name ? user.given_name : user.nickname) }
        setChat([...chat, obj]);
        socket.emit('send-message', obj, props.id);
    }

    const scrollablePaper = useRef(null);

    useEffect(() => {
        function scrollToBottom() {
            scrollablePaper.current.scrollTop = scrollablePaper.current.scrollHeight;
        }
        !isLoading && scrollToBottom();

    }, [chat])

    const scrollbarStyle = {
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
        '::-webkit-scrollbar': {
            width: '0em',
        },
        '::-webkit-scrollbar-thumb': {
            backgroundColor: 'transparent',
        },
    };

    if (isLoading) {
        return <div style={{ display: "flex", justifyContent: "center" }}>
            <img src={Loading} alt="Loading..." />
        </div>
    }

    return !isLoading && <>
        <div style={{
            display: "flex",
            justifyContent: "center",
            marginTop: 10
        }}>
            <Paper
                ref={scrollablePaper}
                elevation={10}
                sx={{
                    ...scrollbarStyle
                }}
                style={{
                    boxSizing: "border-box",
                    width: "90vw",
                    height: "70vh",
                    overflow: "auto",
                    position: "fixed",

                }}>
                {chat.map((ele) => {
                    return <Chatbox obj={ele} user={(user.given_name ? user.given_name : user.nickname)} />
                })}
            </Paper>
        </div>
        <Footer onPress={onPress} id={props.id}></Footer>
    </>

}
export default ChatWindow;