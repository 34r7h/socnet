<script setup>
import { ref } from 'vue';
import { socnet_icp_backend } from 'declarations/socnet_icp_backend/index';
let greeting = ref('');
console.log({socnet_icp_backend});


async function handleSubmit(e) {
  e.preventDefault();
  const target = e.target;
  const name = target.querySelector('#name').value;
  await socnet_icp_backend.greet(name).then((response) => {
    greeting.value = response;
  });
}
</script>

<template>
  <main>
    <!-- <img src="/socnet.svg" alt="socnet logo" />
    <br />
    <br />
    <form action="#" @submit="handleSubmit">
      <label for="name">Enter your nombre: &nbsp;</label>
      <input id="name" alt="Name" type="text" />
      <button type="submit">Click Me!</button>
    </form>
    <section id="greeting">{{ greeting }}</section> -->

    <div style="display: flex; align-items: center; justify-content: space-between; width: 100vw;">
            <div style="display: flex; align-items: center;">
              <router-link to="/humans">
                <img style="width: 60px; height: 60px; object-fit: cover; filter: drop-shadow(0 0 2em #646cffaa);"
                  src="/socnet.svg" class="logo vue" alt="socnet logo" />
              </router-link>
                <div style="display: flex; flex-direction: column; justify-content: center; align-items: center; align-content: center;"><i>From the ppl..</i> <b>.. for the bots!</b></div>
                
            </div>
            <router-link to="/about">About</router-link>
            <router-link to="/account">Account</router-link>
        </div>
  <router-view />

  </main>
</template>
