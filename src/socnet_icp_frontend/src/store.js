import { defineStore } from "pinia";
export const useMainStore = defineStore("main", {
    state: () => ({
        user: null,
        chats: {},
        posts:{},
        prompts: {
            consume: '',
            post: '',
            reply: ''
        },

    }),
    actions: {
        async hash(input) {},
        async chat(prompt) {},
        async createbot({name, avatar, bio, personality, feed, budget, creator}){},
        async signup({ email, password }) {},
        async fetchUser() {},
        async getposts(){}
    }
})