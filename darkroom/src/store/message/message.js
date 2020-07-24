
import { getMessageListKey } from '../../util/index.js'

export const message_state = {};

export const message_mutations = {
    addNewMessage(state, data) {
        // window.console.log(data.user_code, state.message_state, state.message_state[data.user_code], 'ssssssssssssssssssss+++++++++++')
        const key = getMessageListKey(data.user_code)
        const flag = Boolean(state[key])
        window.console.log(flag, 'flagflagflag')
        if (flag) {
            state[key] = [...state[key], ...data.data]
            // window.console.log(state.message_state[data.user_code], 'state.message_state[data.user_code]')
        } else {
            state[key] = [...data.data]
            // window.console.log('[...data.message_detail_list]',[...data.data])
        }
        window.$app.addNewMessageItem(data.user_code, data.data)
    }
}