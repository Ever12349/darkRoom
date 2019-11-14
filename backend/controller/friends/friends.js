const uuidv1 = require('uuid/v1')


import {
    redisHashSet,
    redisHashGet
} from '../../util/redis_operation';
import {
    setRecordByUserCode,
    getMessageRecordByUserCode,
    getFriendsListByUserCode,
    setNewFriend
} from './uitl.js'
import moment from 'moment'

import FriendsInfoModel from '../../orm/mongodb/friends_info_model.js'

export async function friendsApplication(){//好友申请
    try {
        const reqData = ctx.request.body,
            user_code = reqData.user_code,
            to_user_code = reqData.to_user_code;

        const content = `${user_code}&&${to_user_code}##${moment()}@@application`;

        await setRecordByUserCode(to_user_code,content)


        ctx.body = {
            code:200,
            msg:'success'
        }





        //后续socket操作



    } catch (error) {
        console.log(error);
        ctx.body = {
            code:500,
            msg:error
        }
        
    }
}


export async function agreeFriendsApplication(ctx,next){
    try {
        const reqData = ctx.request.body,
            user_code = reqData.user_code,
            to_user_code = reqData.to_user_code;

            //user_code同意to_user_code的好友申请

        
            const model = new FriendsInfoModel({
                order_id:uuid(),
                user_code:to_user_code,
                to_user_code:user_code,
                create_time:moment().utcOffset("+08:00").format('YYYY-MM-DD HH:mm:ss')
            })
            model.save();

            ctx.body = {
                code:200,
                msg:'success'
            }

            const content = `${user_code}&&${to_user_code}##${moment()}@@agreeApplication`;

            await setRecordByUserCode(to_user_code,user_code,content);


            await setNewFriend(user_code,to_user_code)

            //发送socket



    } catch (error) {
        console.log(error);
        ctx.body = {
            code:500,
            msg:'error'
        }
    }
}

export async function getFriendsList(ctx,next){
    try {
        const reqData = ctx.request.body,
            user_code = reqData.user_code;

        const record_list = await getFriendsListByUserCode(usercode);

        
    } catch (error) {
        
    }
}
