export const user_info_state = {}

export const user_info_mutations = {
    addNewUserInfo(state,user_info_obj){
        state.user_info_state = {
            ...state.user_info_state,
            ...user_info_obj
        }
        window.console.log('提交成功',state.user_info_state)
    }
}