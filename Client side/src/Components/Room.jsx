import { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography } from '@mui/material';
import { ColorButton } from './BootstrapInput';
import AddIcon from '@mui/icons-material/AddCircleRounded';
import Button from '@mui/material/Button';
import { useAuth0 } from "@auth0/auth0-react";
import Loading from '../../public/loading.svg'

function Room() {
    const [totalRoom, setTotalRoom] = useState("");
    const { getAccessTokenSilently, isLoading } = useAuth0();

    useEffect(() => {
        async function fetch() {
            try {
                const token = await getAccessTokenSilently();
                localStorage.setItem('token', token);
                var response = await axios.get('http://localhost:3000/room', {
                    headers: {
                        authorization: `Bearer ${token}`
                    }
                });
                console.log(response.data);
                setTotalRoom(response.data);
            } catch (error) {
                console.log(error.message);
            }
        }
        fetch();
    }, [])

    function onPress() {
        var roomName = prompt("Enter the name of room");
        async function fetch() {
            var response = await axios.post('http://localhost:3000/room', {
                name: `${roomName}`
            },
            )
            setTotalRoom([...totalRoom, response.data]);
        }
        fetch();
    }

    if (!totalRoom) {
        if (isLoading) {
            return <div style={{ display: "flex", justifyContent: "center" }}>
                <img src={Loading} alt="Loading..." />
            </div>
        }
        return <div>
            Login to access
        </div>
    }

    return (
        <>
            <div style={{ display: "flex", justifyContent: "center" }}>
                <div style={{
                    // border: "2px solid red",
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: "10vh",
                    maxWidth: "70vw"
                }}>
                    {totalRoom.map((room) => {
                        if (!room.name || room.name == "null") return;
                        return <ColorButton onClick={() => { window.location = `/room/${room.id}` }}
                            sx={{
                                // backgroundColor: "grey",
                                height: "15vh",
                                width: 150,
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                paddingBottom: 2,
                                boxSizing: "border-box",
                                flexDirection: "column",
                                margin: 2,
                                marginBottom: 5,

                            }}>
                            <Typography variant='h4'>{room.name}</Typography>
                            <Typography variant=''>Id: {room.id}</Typography>
                        </ColorButton>
                    })}
                    <div style={{
                        // border: "2px solid red",
                        height: "15vh",
                        width: 150,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        paddingBottom: 2,
                        boxSizing: "border-box",
                        margin: 2,
                        marginBottom: 25,
                    }}>
                        <Button onClick={() => onPress()} sx={{ fontSize: 20, }} variant='contained' startIcon={<AddIcon />}>
                            Add
                        </Button>
                    </div>
                </div>
            </div>
        </>
    )

}
export default Room