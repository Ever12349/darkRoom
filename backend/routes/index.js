const router = require('koa-router')()


router.get('/test', async function (ctx) {
  ctx.body = {
    code: 200,
    msg: 'text_sucess'
  }
})

router.get('/test2', async function (ctx) {
  ctx.body = {
    code: 200,
    msg: 'tex2_sucess'
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
  getMessageList, sendMessage, getMessageListToSomeOne
} from '../controller/chatting/chatting.js'


router.post('/api/send_message', tokenFilter, registerFilter, sendMessage)
// import {
//   getFriendsList
// } from '../controller/friends/friends.js'



//public_message


router.post('/api/sendPublicMessage', tokenFilter, sendPublicMessage)
router.post('/api/getPublicMessage', tokenFilter, getPublicMessage)
router.post('/api/getPublicMessageResponseByOrderId', tokenFilter, getPublicMessageResponseByOrderId);
router.post('/api/get_message_list', tokenFilter, getMessageList)
router.post('/api/get_message_list_to_some_one', tokenFilter, registerFilter, getMessageListToSomeOne)



import {
  friendsApplication, agreeFriendsApplication, getFriendsList
} from '../controller/friends/friends.js'

router.post('/api/friends_application', tokenFilter, registerFilter, friendsApplication);
router.post('/api/agree_friends_application', tokenFilter, registerFilter, agreeFriendsApplication);
router.post('/api/get_friends_list', tokenFilter, registerFilter, getFriendsList)

module.exports = router
