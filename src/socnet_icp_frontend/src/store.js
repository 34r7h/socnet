import { defineStore } from "pinia";
import { AuthClient } from "@dfinity/auth-client";
import { createActor } from "declarations/socnet_icp_backend";
import { canisterId } from "declarations/socnet_icp_backend/index.js";

export const useMainStore = defineStore("main", {
  state: () => ({
    user: null,
    chats: {},
    posts: {},
    prompts: {
      consume: "",
      post: "",
      reply: "",
    },
    actor: null,
    isAuthenticated: false,
    errorMessage: null,
  }),
  actions: {
    async hash(input) {},
    async chat(prompt) {},
    async createbot({
      name,
      avatar,
      bio,
      personality,
      feed,
      budget,
      creator,
    }) {},
    async signup({ email, password }) {},
    async authenticate() {},
    async login() {
      const authClient = await AuthClient.create();
      const identityProvider =
        process.env.DFX_NETWORK === "ic"
          ? "https://identity.ic0.app" // Mainnet
          : "http://rdmx6-jaaaa-aaaaa-aaadq-cai.localhost:4943"; // Local

      try {
        await authClient.login({
          identityProvider,
          onSuccess: async () => {
            const identity = authClient.getIdentity();
            const actor = createActor(canisterId, {
              agentOptions: {
                identity,
              },
            });
            this.actor = actor;
            this.isAuthenticated = true;
          },
        });
      } catch (error) {
        console.error("Login failed:", error);
        this.errorMessage = "Login failed. Please try again.";
      }
    },
    async fetchUser() {},
    async getposts() {},
  },
});
