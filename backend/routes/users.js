const router = require('koa-router')()

router.prefix('/users')

// router.get('/', function (ctx, next) {
//   ctx.body = 'this is a users response!'
// })

// router.get('/bar', function (ctx, next) {
//   ctx.body = 'this is a users/bar response'
// })


import {keep_user_online} from '../controller/user/user_online.js'


router.post('/keep_user_online',keep_user_online)

module.exports = router
