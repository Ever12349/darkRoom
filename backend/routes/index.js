const router = require('koa-router')()


router.get('/test',async function(ctx){
  ctx.body = {
    code:200,
    msg:'text_sucess'
  }
})

router.get('/test2',async function(ctx){
  ctx.body = {
    code:200,
    msg:'tex2_sucess'
  }
})


import {
  sendPublicMessage,
  getPublicMessage,
  getPublicMessageResponseByOrderId
} from '../controller/publicMessage/public_message.js'

import {
  tokenFilter,
  registerFilter
} from '../controller/filter/filter.js'

import {
  getMessageList
} from '../controller/chatting/chatting.js'

import {
  getFriendsList
} from '../controller/friends/friends.js'



//public_message


router.post('/api/sendPublicMessage',tokenFilter,sendPublicMessage)
router.post('/api/getPublicMessage',tokenFilter,getPublicMessage)
router.post('/api/getPublicMessageResponseByOrderId',tokenFilter,getPublicMessageResponseByOrderId);
router.post('/api/get_friends_list',tokenFilter,getFriendsList);
router.post('/api/get_message_list',tokenFilter,getMessageList)



import {
  friendsApplication
} from '../controller/friends/friends.js'

router.post('/api/friends_application',tokenFilter,registerFilter,friendsApplication);

module.exports = router
