
import {
    getrecordByUserCode
} from './util.js'

import {
    getUserInfo
} from '../../util/index.js'

import {
    redisSet,redisGet
} from '../../util/redis_operation.js'


export async function getMessageList(ctx,next){
    try {
        const reqData = ctx.request.body,
            user_code = parseInt(reqData.user_code),
            pageNo = parseInt(reqData.pageNo||1),
            pageSize = parseInt(reqData.pageSize||20);
        console.log(reqData);
        let result_list;
        const redis_key = `message_list!${user_code}!message_list`;
        if(pageNo === 1){
            let record_list = await getrecordByUserCode(user_code);

            result_list = record_list.slice((pageNo-1)*pageSize,pageNo*pageSize);

            redisSet(redis_key,JSON.stringify(record_list))
        }else{

            let record_list = JSON.parse(await redisGet(redis_key));

            result_list = record_list.slice((pageNo-1)*pageSize,pageNo*pageSize);

        }
        
        let user_code_list = new Set();
        
        result_list.forEach((item)=>{
            user_code_list.add(item.user_code);
            user_code_list.add(item.to_user_code);
        })

        let user_info = await getUserInfo([...user_code_list])
        ctx.body = {
            code:200,
            list:result_list,
            user_info,
        }

    } catch (error) {
        console.log(error);
        ctx.body = {
            code:500,
            msg:'error'
        }
    }
}