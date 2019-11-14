
import {
    verifyJwtToken
} from '../../util'

export async function tokenFilter(ctx, next) {
    try {
        const token = ctx.request.header.authorization.split(' ')[1];
        console.log(token,'tokenFilter')
        if(token){
            const data = verifyJwtToken(token);
            ctx.header.common_data = {
                user_code:data.user_code,
                user_status:data.user_status,
            }
            console.log(data,'verify')
        }
        await next();
    } catch (e) {
        console.log(e)
        ctx.body = {
            code: 500,
            msg: 'error'

        }
    }
}

export async function registerFilter(ctx,next){//是否注册的判断
    try {
        const commonData = ctx.header.common_data;
        const user_code = commonData.user_code,
            user_status = commonData.user_status;
        if(!!user_status){
            await next();
        }else{
            ctx.response.status = 401;
            ctx.body = {
                code:401,
                msg:'no register'
            }
        }

    } catch (error) {
        ctx.body = {
            code:500,
            msg:'error'
        }
    }
}
