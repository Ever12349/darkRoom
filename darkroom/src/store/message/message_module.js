import Vue from 'vue'

export const message_record_key = (user_code) => {
    return `message_record_${user_code}`
}

export default {
    state: {
        message_resord_list: []
    },
    mutations: {
        messageRecordInit(state, record_list) {//往列表中注入数据
            // state.message_resord_list = [...record_list]

            state.message_resord_list = record_list.map((item) => {
                const my_user_code = parseInt(localStorage.user_code);
                const to_user_code = my_user_code === parseInt(item.user_code) ? item.to_user_code : item.user_code;
                Vue.set(state, message_record_key(to_user_code), item)
                return parseInt(to_user_code);
            })

            window.console.log(state.message_resord_list, state, 'state.message_resord_list')

        },

        messageRecordChange(state, data) {//列表元素内容更改
            window.console.log(data, 'messageRecordChange')
            let index = state.message_resord_list.indexOf(parseInt(data.user_code));
            if (index >= 0) {
                let state_key = message_record_key(data.user_code), record = data.record;
                window.console.log(state_key, state[state_key], record, '{{{{{{{{{{{{{[')
                let state_target = state[state_key];
                state_target.unread_num = state_target.unread_num + 1;
                state_target.message = record.message;
                state_target.create_time = record.create_time;
                state_target.order_id = record.order_id;
                // [...state[state_key]].forEach(key => {
                //     state[state_key][key] = record[key]
                // })

                let item_list = state.message_resord_list.splice(index, 1);

                Vue.nextTick(() => {
                    state.message_resord_list.unshift(...item_list)
                })

            } else {
                const user_code = parseInt(data.user_code), record = data.record;
                state.message_resord_list.unshift(user_code);
                Vue.set(state, message_record_key(user_code), record)
            }
        },

        messageRecordUnreadNumClean(state, user_code) {//未读数据清零；
            window.console.log(state, 'state messageRecordUnreadNumClean')
            state[message_record_key(user_code)].unread_num = 0;

        }
    }
}