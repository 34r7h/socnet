import { defineStore } from "pinia";
import { AuthClient } from "@dfinity/auth-client";
import { createActor } from "declarations/socnet_icp_backend";
import { canisterId } from "declarations/socnet_icp_backend/index.js";
import { socnet_icp_backend } from "declarations/socnet_icp_backend/index";

export const useMainStore = defineStore("main", {
  state: () => ({
    agents: {},
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
    welcome: "",
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
    async chat(prompt) {
        console.log({prompt});
        
      // console.log(await socnet_icp_backend.send_http_post_request())
      try {
        let response = await socnet_icp_backend.send_http_post_request(JSON.stringify({prompt, model: 'dolphin-llama3'}));
        console.log({response});
        if (await response.includes('. See more info of the request sent at: https://')) {
            response = await response.slice(0, await response.indexOf('. See more info of the request sent at: https://'))
        }
        const data = JSON.parse(response);
        console.log("Chats", data);
        this.chats[await this.hash(prompt)] = data.response
          .split("\n")
          .slice(0, -1)
          .map((x) => (console.log(x), JSON.parse(x).response || ""))
          .join("");
        return data;
      } catch (error) {
        console.error("Error during chat:", error);
      }
      //   try {
      //     const response = await fetch(
      //       "http://" + "localhost" + ":" + 3000 + "/api/chat",
      //       {
      //         method: "POST",
      //         headers: {
      //           "Content-Type": "application/json",
      //         },
      //         body: JSON.stringify({ prompt, model: "dolphin-llama3" }),
      //       }
      //     );

      //     const data = await response.json();
      //     console.log("Chats", data);
      //     this.chats[await this.hash(prompt)] = data.response
      //       .split("\n")
      //       .slice(0, -1)
      //       .map((x) => (console.log(x), JSON.parse(x).response || ""))
      //       .join("");
      //     return data;
      //   } catch (error) {
      //     console.error("Error during chat:", error);
      //   }
    },
    async createbot({ name, avatar, bio, personality, feed, budget }) {
      console.log(
        "creating bot",
        {
          name,
          avatar,
          bio,
          personality,
          feed,
          budget,
        },
        this.user
      );

      const encoder = new TextEncoder();
      const content = JSON.stringify({
        name,
        avatar,
        bio,
        personality,
        feed,
        creator: this.user,
      });
      const hashid = this.hash(content);

      socnet_icp_backend.uploadFileChunk(
        await hashid,
        encoder.encode(content),
        0,
        "agent"
      );
    },
    async signup({ email, password }) {},
    async authenticate() {},
    async login() {
      const authClient = await AuthClient.create();
      const identityProvider =
        process.env.DFX_NETWORK === "ic"
          ? "https://identity.ic0.app" // Mainnet
          : "http://ctiya-peaaa-aaaaa-qaaja-cai.localhost:4943"; // Local

      console.log(
        "logging in through ICP",
        await socnet_icp_backend.send_http_post_request()
      );
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
    async getfiles() {
      const files = await socnet_icp_backend.getFiles();
      console.log({ files });
      files.map(async (x) => {
        console.log("checking file", x);
        let file = [];
        let chunkcount = await socnet_icp_backend.getTotalChunks(x.name);
        for (var i = 0; i < chunkcount; i++) {
          var chunk = await socnet_icp_backend.getFileChunk(x.name, i);
          console.log({ chunk });
          file.push(...chunk.flat());
        }
        if (x.fileType == "agent") {
          this.agents[x.name] = JSON.parse(
            new TextDecoder().decode(new Uint8Array(file[0]))
          );
        }
        console.log(
          { file },
          new TextDecoder().decode(new Uint8Array(file[0]))
        );
      });
    },
  },
});
