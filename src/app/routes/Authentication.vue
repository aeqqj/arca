<script setup lang="ts">
import Signin from "@modules/authentication/components/Signin.vue";
import Signup from "@modules/authentication/components/Signup.vue";
import Layout from "@modules/authentication/components/Layout.vue";
import { switchStore } from "@/modules/authentication/store/switchStore";

</script>

<template>
    <Layout>
        <Signin v-if="switchStore.isSignin" />
        <Signup v-else />
    </Layout>
</template>
