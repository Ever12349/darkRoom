

import {
    get_id
} from '../../socket/socket_global'


export async function keep_user_online(ctx,next){
    try{
        const reqData = ctx.request.body,
        user_code = reqData.user_code;

        console.log(reqData)
        get_id();
        ctx.body = {
            code:200,
            msg:'success'
        }
    }catch(e){
        console.log(e)
        ctx.body = {
            code:500,
            msg:'error'
        }
    }

}