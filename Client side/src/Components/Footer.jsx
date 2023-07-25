import { useState } from 'react'
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import BootstrapInput from './BootstrapInput';
import Chip from '@mui/material/Chip';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';


function Footer(props) {
    const { onPress } = props;

    const [text, setText] = useState("");

    function onPresss(id) {
        async function deletee() {
            let response = await axios.delete("http://localhost:3000/room", {
                headers: {
                    "id": id,
                    'Content-Type': 'application/json'
                }
            })
            console.log(response.data);
            window.location = '/';
        }
        deletee();
    }

    return <Grid sx={{ position: "fixed", top: "80vh" }} container justifyContent={"center"}>

        <Grid item xs={8.2} sm={8.8} lg={9.3} >
            <div style={{
                display: "flex",
                justifyContent: "space-between",
                // border: "2px solid black",
                width: "71.5vw",
            }}>
                <Grid item >
                    <InputLabel sx={{
                        marginTop: 3,
                        // width: "90vw",
                        // border: "2px solid red",
                        width: "fit-content",
                    }}>
                        Enter your message
                    </InputLabel>
                </Grid>
                <Grid sx={{ display: "flex", justifyContent: "flex-end" }} item >
                    <Chip
                        label="Delete"
                        color='success'
                        onClick={() => onPresss(props.id)}
                        onDelete={() => onPresss(props.id)}
                        deleteIcon={<DeleteIcon />}
                        variant="outlined"
                        style={{
                            padding: 1,
                            marginTop: 20,
                        }}
                    />
                </Grid>
            </div>
        </Grid>

        <Grid item xs={1} sm={1.2} lg={1.2}></Grid>

        <Grid item xs={9.3} sm={9} lg={9.5}>
            <BootstrapInput
                multiline
                maxRows={2}
                columns={4}
                onChange={(e) => setText(e.target.value)}
            />
        </Grid>

        <Grid item xs={3} sm={1} lg={1}>
            <Button onClick={text ? () => onPress(text) : null} color='error' sx={{
                marginTop: 1,
                marginBottom: 1
            }} variant="contained" endIcon={<SendIcon />}>
                Send
            </Button>
        </Grid>

    </Grid>
}
export default Footer;