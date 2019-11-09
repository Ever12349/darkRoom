const router = require('koa-router')()

// router.get('/', async (ctx, next) => {
//   await ctx.render('index', {
//     title: 'Hello Koa 2!'
//   })
// })

// router.get('/string', async (ctx, next) => {
//   ctx.body = 'koa2 string'
// })

// router.get('/json', async (ctx, next) => {
//   ctx.body = {
//     title: 'koa2 json'
//   }
// })

import {
  sendPublicMessage,
  getPublicMessage
} from '../controller/publicMessage/public_message.js'




//public_message


router.post('/api/sendPublicMessage',sendPublicMessage)
router.post('/api/getPublicMessage',getPublicMessage)

module.exports = router
