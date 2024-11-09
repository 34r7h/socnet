<template>

    <h1><a @click="$router.back();"> <- </a> Account</h1>
    <div v-if="!$state.user">
        <button @click="handleLogin()">Login</button>
    </div>
    <div v-else>
        <pre style="text-align: left; overflow: scroll; max-width: 100vw;">{{ $state.user }}</pre>
    </div>
    <div>
        <h2>Spending</h2> 
        <h2>Earning</h2>
        <button v-if="$state.user" @click="$state.user = null" >Log out</button>
    </div>
</template>
<script setup>
import { getCurrentInstance, onMounted, ref } from 'vue';
const { $state} = getCurrentInstance().appContext.config.globalProperties;
const user = ref($state.user || {});
const handleLogin = async () => {
      $state.user = await $state.login();
      // Handle successful login (e.g., show file upload functionality)
    };
onMounted(async () => {
    console.log({user, $state});
});
</script>