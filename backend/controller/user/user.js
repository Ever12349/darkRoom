import {
    checkUserName
} from '../../util'


export async function checkUserNameLegality(ctx, next) {//检查用户名是否合法
    try {
        const reqData = ctx.request.body,
            user_name = reqData.user_name;
        const is_leagl = await checkUserName(user_name);
        ctx.body = {
            code:200,
            is_legal:is_leagl
        }
    } catch (e) {
        console.log(e);
        ctx.body = {
            code: 500,
            msg: 'error'
        }
    }
}