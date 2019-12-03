let baseUrl = "";
window.console.log(process.env.NODE_ENV,'process.env.NODE_ENV')
switch (process.env.NODE_ENV) {
    case 'dev':
        baseUrl = "http://localhost:3000"  //开发环境url
        break
    case 'serve':
        baseUrl = "http://localhost:8089/"   //生产环境url
        break
}

export default baseUrl
