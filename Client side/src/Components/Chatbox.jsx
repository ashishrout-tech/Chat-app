import Paper from '@mui/material/Paper';
function Chatbox(props) {
    const { obj, user } = props;

    if (obj.user == user) {
        return (
            <>
                <div style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "flex-end",
                    margin: 35,
                    flexDirection: "column"
                    // border: "2px solid green",

                }}>
                    <Paper
                        elevation={5}
                        sx={{
                            maxWidth: { xs: 150, sm: 300, md: 500 },
                            padding: 0.3,
                            marginBottom: 0.1,
                            paddingBottom: 0,
                            marginRight: 0.2
                        }}
                    >
                        me
                    </Paper>
                    <Paper elevation={20}
                        sx={{
                            maxWidth: { xs: 150, sm: 300, md: 500 },
                        }}
                        style={{
                            // border: "2px solid green", 
                            whiteSpace: 'pre-wrap',
                            fontSize: "2.6vh",
                            padding: 6,
                            backgroundColor: "lightgreen",

                            rows: "4",
                            overflow: "auto",
                            wordWrap: "break-word",
                            // whiteSpace: "normal"
                        }}>
                        {obj.message}
                    </Paper>
                </div>
            </>
        )
    }

    return (
        <>
            <div style={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "flex-start",
                margin: 35,
                flexDirection: "column"
                // border: "2px solid green", 
            }}>
                <Paper
                    elevation={5}
                    sx={{
                        maxWidth: { xs: 150, sm: 300, md: 500 },
                        padding: 0.3,
                        marginBottom: 0.1,
                        paddingBottom: 0,
                        marginLeft: 0.2
                    }}
                >
                    {obj.user}
                </Paper>
                <Paper elevation={20}
                    sx={{
                        maxWidth: { xs: 150, sm: 300, md: 500 }
                    }} style={{
                        // border: "2px solid green", 
                        whiteSpace: 'pre-wrap',
                        fontSize: "2.6vh",
                        padding: 6,
                        backgroundColor: "#e76f51",

                        rows: "4",
                        overflow: "auto",
                        wordWrap: "break-word",
                    }}>
                    {obj.message}
                </Paper>
            </div>
        </>
    )
}
export default Chatbox;
