export const user_info_state = {
    total_user_online_num: 0,
}

export const user_info_mutations = {
    addNewUserInfo(state, user_info_obj) {
        state.user_info_state = {
            ...state.user_info_state,
            ...user_info_obj
        }
        window.console.log('提交成功', state.user_info_state)
    },
    setNewUserOnlineNum(state, num) {
        window.console.log(state.user_info, 'sssssssssssssssss============kkkkkkkkkkkkk')
        state.user_info.total_user_online_num = num;
    }
}