const router = require('koa-router')()
import {tokenFilter} from '../controller/filter/filter.js'

router.prefix('/users')

// router.get('/', function (ctx, next) {
//   ctx.body = 'this is a users response!'
// })

// router.get('/bar', function (ctx, next) {
//   ctx.body = 'this is a users/bar response'
// })


import {keep_user_online} from '../controller/user/user_online.js'
import {checkUserNameLegality} from '../controller/user/user.js'


router.post('/keep_user_online',keep_user_online)
router.post('/check_user_name_legality',tokenFilter,checkUserNameLegality)

module.exports = router
