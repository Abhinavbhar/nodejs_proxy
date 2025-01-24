// Import of net module
import net from "net" 
import connectDB from "./Db/mongo.js";
import ip from "./MiddleWare/ip.js";
import updateBandwidth from "./MiddleWare/updateBandwidth.js";
const server = net.createServer();
const client = await connectDB();
const users = new Map()




server.on("connection", (clientToProxySocket) => {
    //console.log("Client connected to proxy");
        const valid =ip(clientToProxySocket.remoteAddress)
        if(!valid){
            clientToProxySocket.end()
            return
        }
    
    if(!users.has(clientToProxySocket.remoteAddress)){
       
        users.set(clientToProxySocket.remoteAddress,0)
    }
    clientToProxySocket.once("data", (data) => {

        let isTLSConnection = data.toString().indexOf("CONNECT") !== -1;
        let serverPort = 80;
        let serverAddress;
        if (isTLSConnection) {
            serverPort = 443;
            serverAddress = data
                .toString()
                .split("CONNECT")[1]
                .split(" ")[1]
                .split(":")[0];
        } else {
            serverAddress = data.toString().split("Host: ")[1].split("\r\n")[0];
        }
        console.log(serverAddress);

        // Creating a connection from proxy to destination server
        let proxyToServerSocket = net.createConnection(
            {
                host: serverAddress,
                port: serverPort,
            },
            () => {
              //  console.log("Proxy to server set up");
            }
        );


        if (isTLSConnection) {
            clientToProxySocket.write("HTTP/1.1 200 OK\r\n\r\n");
        } else {
            proxyToServerSocket.write(data);
        }
        
        console.log("client rec",clientToProxySocket.bytesRead)
        console.log("client sen",clientToProxySocket.bytesWritten)
        let bandwidth = clientToProxySocket.bytesRead+clientToProxySocket.bytesWritten
        let CurrentBandwidth =users.get(clientToProxySocket.remoteAddress)
        let updated = CurrentBandwidth+bandwidth
        if(updated>5000){
            updateBandwidth(clientToProxySocket.remoteAddress,updated,client)
            users.set(clientToProxySocket.remoteAddress,0)
            updated=0;
        }
        users.set(clientToProxySocket.remoteAddress,updated)
        console.log(users)
        
        clientToProxySocket.pipe(proxyToServerSocket);
        proxyToServerSocket.pipe(clientToProxySocket);

        proxyToServerSocket.on("error", (err) => {
            console.log("Proxy to server error");
            proxyToServerSocket.end()
            console.log(err);
        });

        clientToProxySocket.on("error", (err) => {
            console.log("Client to proxy error");
            clientToProxySocket.end()
            console.log(err)
        });
    });
});

server.on("error", (err) => {
    
    console.log("Some internal server error occurred");
    console.log(err);
});

server.on("close", () => {
    
    console.log("Client disconnected");
});

server.listen(
    {
        host: "0.0.0.0",
        port: 8080,
    },
    () => {
        console.log("Server listening on 0.0.0.0:8080");
    }
);