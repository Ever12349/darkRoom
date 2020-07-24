export const public_message_state = {
    public_message_num: 0
}

export const public_message_mutations = {
    add_public_message_num(state) {
        window.console.log(state)
        state.public_message.public_message_num++;
    },
    clean_public_message_num(state) {
        window.console.log(state)
        state.public_message.public_message_num = 0
    }
}