const router = require('koa-router')()
import { tokenFilter } from '../controller/filter/filter.js'

router.prefix('/users')

// router.get('/', function (ctx, next) {
//   ctx.body = 'this is a users response!'
// })

// router.get('/bar', function (ctx, next) {
//   ctx.body = 'this is a users/bar response'
// })


import { keep_user_online, getUserOnlineTotalNum } from '../controller/user/user_online.js'
import { checkUserNameLegality, register, userLoginin, getUserInfoByUserode } from '../controller/user/user.js'


router.get('/get_user_online_total_num', tokenFilter, getUserOnlineTotalNum)


router.post('/keep_user_online', keep_user_online)
router.post('/check_user_name_legality', tokenFilter, checkUserNameLegality)
router.post('/register', tokenFilter, register)
router.post('/user_login_in', tokenFilter, userLoginin)
router.post('/get_user_info', tokenFilter, getUserInfoByUserode)

module.exports = router
