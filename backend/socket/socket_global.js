
let socket_io,io

function setSocketIoGlobal(){
    if(global.socket_server){
        socket_io = global.socket_server;
        return false;
    }else{
        setTimeout(() => {
            setSocketIoGlobal()
        }, 50);
    }
}

setSocketIoGlobal()

export default io = socket_io;

export function get_id(){
    try{
        console.log(socket_io.sockets.sockets,'sssssssssssssss')
    }catch(e){

    }
    
    // console.log(global.socket_server)
}