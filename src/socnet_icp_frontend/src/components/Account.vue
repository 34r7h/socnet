<template>

    <h1><a @click="$router.back();"> <- </a> Account</h1>
    <div v-if="!$state.user">
        <div v-for="x in ['email', 'password']">
            <input :type="x" :placeholder="x" type="text" v-model="user[x]">
        </div>
        <button @click="$state.signup(user); user = {}">Authenticate</button>
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
onMounted(async () => {
    console.log({user, $state});
});
</script>