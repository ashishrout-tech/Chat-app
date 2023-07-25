const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const cors = require('cors');
const fs = require('fs');
const axios = require('axios')
const { auth } = require('express-oauth2-jwt-bearer');

const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
    cors: {
        origin: ['http://localhost:5173']
    }
});

app.use(express.json());
app.use(cors());


const jwtCheck = auth({
    audience: 'unique Identifier backend',
    issuerBaseURL: 'https://dev-njc2p3kptpkj5wpn.us.auth0.com/',
    tokenSigningAlg: 'RS256'
});


const extract = async (req, res, next) => {
    // console.log(req.headers);
    var token = req.headers.authorization.split(' ')[1];
    console.log(token);
    const response = await axios.get('https://dev-njc2p3kptpkj5wpn.us.auth0.com/userinfo', {
        headers: {
            authorization: `Bearer ${token}`
        }
    });
    const userinfo = response.data;
    req.user = userinfo.nickname;
    if (userinfo) next();

}



app.get('/room', jwtCheck, (req, res) => {
    var room = JSON.parse(fs.readFileSync('./room.json', 'utf-8'));
    res.status(200).json(room);
})

app.post('/room', (req, res) => {
    var room = JSON.parse(fs.readFileSync('./room.json', 'utf-8'))
    const name = (req.body.name);
    console.log(name);
    if (room.find((ele) => ele.name === name)) {
        res.status(400).json({ message: "Room already exists" })
    }
    else {
        const id = Math.floor(Math.random() * 1000000);
        room.push({ name, id });
        fs.writeFileSync("./room.json", JSON.stringify(room), "utf-8")
        res.status(200).json({ name, id });
    }
})

app.delete('/room', (req, res) => {
    var data = JSON.parse(fs.readFileSync('./file.json', 'utf-8'));
    var room = JSON.parse(fs.readFileSync('./room.json', 'utf-8'))
    if (room.find((ele) => ele.id == req.headers.id)) {
        const newArr = room.filter((ele) => ele.id != req.headers.id);
        const newData = {};
        for (let key in data) {
            if (key != req.headers.id) {
                newData[key] = [...data[key]];
            }
        }
        fs.writeFileSync("./file.json", JSON.stringify(newData), "utf-8")
        fs.writeFileSync("./room.json", JSON.stringify(newArr), "utf-8");
        res.status(200).json({ message: "Successfully deleted" });
    }

    else {
        res.status(400).json({ message: "Room doesn't exists" })
    }
})



io.on('connection', (socket) => {
    var data = JSON.parse(fs.readFileSync('./file.json', 'utf-8'));
    console.log('NEW!!!!!!')
    // console.log(socket.id);
    socket.on('send-message', (message, id) => {
        console.log(id);
        if (!data[`${id}`]) data[`${id}`] = [];
        if (!message) {
            if (data[`${id}`].length > 0) socket.emit('receive-message', data[`${id}`]);
        }
        console.log(message);

        if (message) data[`${id}`].push(message)
        fs.writeFileSync('./file.json', JSON.stringify(data), 'utf-8');
        if (message) socket.to(id).emit('receive-message', message)
    })

    socket.on('join-room', (id) => {
        console.log(id);
        socket.join(id);
    })
})



server.listen(3000, () => {
    console.log('listening on port 3000');
})