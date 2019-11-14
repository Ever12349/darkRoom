const router = require('koa-router')()

import {
  sendPublicMessage,
  getPublicMessage,
  getPublicMessageResponseByOrderId
} from '../controller/publicMessage/public_message.js'

import {
  tokenFilter,
  registerFilter
} from '../controller/filter/filter.js'



//public_message


router.post('/api/sendPublicMessage',tokenFilter,sendPublicMessage)
router.post('/api/getPublicMessage',tokenFilter,getPublicMessage)
router.post('/api/getPublicMessageResponseByOrderId',tokenFilter,getPublicMessageResponseByOrderId);



import {
  friendsApplication
} from '../controller/friends/friends.js'

router.post('/api/friends_application',tokenFilter,registerFilter,friendsApplication);

module.exports = router
