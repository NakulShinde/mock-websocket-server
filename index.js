const express = require('express')
const WebSocketServer = require('ws').Server

const app = express()
const port = 4000
const wsPort =40510

wss = new WebSocketServer({
	port: wsPort
})

wss.on('connection', function(ws) {
	ws.on('message', function(message) {
		console.log('received: %s', message)
	})
	ws.on('error', function(err) {
		console.log('Found error: ' + err);
	});

	ws.on('close', function() {
		console.log('connection closed.');
	});

	setInterval(
		() => {
			var status = ['NEW', 'POSTPONED', 'RESOLVED'];
			var priority = ['0', '1', '2', '3', '4'];
			var rStatus = status[(Math.random() * status.length) | 0]
			var rPriority = priority[(Math.random() * priority.length) | 0]

			var dd = new Date();
			var str = [dd.getMinutes()+1, ':', dd.getSeconds()+1].join('');
			var obj = {
				"uuid": "3a86d1c6-74ae-44d4-8ecc-a54f3cdb2730",
				"createdat": dd.getTime(),
				"updatedat": 1541485094394,
				"duedate": dd.getTime() + 123000,
				"resolvedat": null,
				"postponedat": 1542176294394,
				"postponedtime": null,
				"title": "Mock data title " + str,
				"description": "Mock data description. Enjoy! " + str,
				"priority": rPriority,
				"status": rStatus
			}
			try {
				ws.send(JSON.stringify(obj));
			} catch (e) {
				console.log("Sync error: " + e);
				ws.close();
			}
		},
		2000
	)
});

wss.on('error', function error(err) {
	console.log('Error: ' + err.code);
});

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/ws.html');
})

// app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`));