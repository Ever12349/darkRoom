


export async function keep_user_online(ctx,next){
    try{
        const reqData = ctx.request.body,
        user_code = reqData.user_code;

        console.log(reqData)
        
        ctx.body = {
            code:200,
            msg:'success'
        }
    }catch(e){
        ctx.body = {
            code:500,
            msg:'error'
        }
    }

}