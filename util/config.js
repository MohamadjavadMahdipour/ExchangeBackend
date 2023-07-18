module.exports={
    PORT:`${process.env.PORT||"80"}`,
    SOCKETPATH:"/api/socket",
    ORIGIN:`${process.env.ORIGIN||"*"}`
}