# mock-websocket-server

- Steps To install:

# #npm install
# #node index.js
- Visit http://localhost:4000 in browser 
- Open browser console
- You can see console updating every 2sec.

Code to Connect from client

<code>
  
    <script>
    var ws = new WebSocket('ws://localhost:40510');
    
    ws.onopen = function () {
        console.log('websocket is connected ...')
        ws.send('connected')
    }
    
    ws.onmessage = function (ev) {
        console.log(ev);
    }
    </script>

</code>
