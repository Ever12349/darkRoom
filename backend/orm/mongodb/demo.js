const mongoose = require('../../config/mongodb')

const randomName = require('random-name');


(function () {


    const user_name = mongoose.model('user_name', new mongoose.Schema({
        id: {
            type: Number
        },
        user_name: {
            type: String
        }
    }), 'user_name_info')

    const user_code = mongoose.model('user_code', new mongoose.Schema({
        id: {
            type: Number
        },
        user_code: {
            type: Number
        }
    }), 'user_code_info')

    const collect_user_name = [], obj_user_name = {};
    // for(let i = 0;i<1000000;i++){
    //     const frist_name = randomName
    // }
    const max_length = 100000
    while (collect_user_name.length <= max_length) {
        const frist_name = randomName.first(),
            last_name = randomName.last();
        const user_name = `${frist_name}-${last_name}`
        if (!obj_user_name[user_name]) {
            const index = collect_user_name.length;
            collect_user_name[index] = {
                id: index,
                user_name: user_name
            }
            obj_user_name[user_name] = true;
        }
    }

    function getRandomUserCode() {
        const max = 999999999999, min = 100000000000
        const randomCode = parseInt(Math.random() * (max - min) + min);
        return randomCode
    }

    const collect_user_code = [], obj_user_code = {};

    while (collect_user_code.length <= max_length) {
        const user_code = getRandomUserCode();
        // console.log(user_code)
        if (!obj_user_code[user_code]) {
            const index = collect_user_code.length;
            collect_user_code[index] = {
                id: index,
                user_code: user_code
            }
            obj_user_code[user_code] = true;
        }
    }


    // console.log(collect_user_name,collect_user_code)

    // const findUserName = await user_name

    (async function () {
        const findName = JSON.parse(JSON.stringify(await user_name.findOne()));
        const findCode = JSON.parse(JSON.stringify(await user_code.findOne()));
        // console.log(findName, findCode)
        if (!(findName || findCode)) {
            // console.log('eeeeeeeeee',collect_user_code)
            user_name.insertMany(collect_user_name, (err) => {
                if (err) {
                    console.log(err)
                    return
                }
                console.log('user_name_success')
            });
            user_code.insertMany(collect_user_code, err => {
                if (err) {
                    console.log(err)
                    return
                }
                console.log('user_code_success')

            });
        }
    })()


})()
