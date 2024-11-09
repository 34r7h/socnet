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
    async hash(input) {
      const encoder = new TextEncoder();
      const data = encoder.encode(input);
      const hashBuffer = await crypto.subtle.digest("SHA-256", data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");
      return hashHex;
    },
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
      console.log("logging in through ICP");
      const authClient = await AuthClient.create();
      const identityProvider =
        process.env.DFX_NETWORK === "ic"
          ? "https://identity.ic0.app" // Mainnet
          : "http://ctiya-peaaa-aaaaa-qaaja-cai.localhost:4943"; // Local

      try {
        console.log({ authClient });
        await authClient.login({
          identityProvider,
          onSuccess: async () => {
            console.log("successful login");
            const identity = authClient.getIdentity();
            const actor = createActor(canisterId, {
              agentOptions: {
                identity,
              },
            });
            this.actor = actor;
            this.isAuthenticated = true;
            let principal = identity.getPrincipal();
            this.user = principal.toHex();
            // console.log({ identity, actor, }, this.user.toHex())
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
