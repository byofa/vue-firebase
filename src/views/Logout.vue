<template>
  <section class="section">
    <div class="columns is-vcentered">
      <div class="column is-one-fifth">
        <div v-if="error" class="error">{{ error.message }}</div>
        <form @submit.prevent="pressed">
          <div class="field">
            <div class="control">
              <button class="button" type="submit">Logout</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
// import Field from '@/components/Field.vue';
// import Input from '@/components/Input.vue';
import { getAuth, signOut } from "firebase/auth";

export default {
  name: "Register",
  methods: {
    pressed() {
      console.log(this.email);
      const auth = getAuth();
      signOut(auth)
        .then(() => {
          this.$store.commit("userLoggin", null);
          this.$router.push("/");
        })
        .catch((error) => {
          console.log("Error Logout  : " + error);
        });
    },
  },
  data() {
    return {
      email: "",
      password: "",
      error: "",
    };
  },
  // components: { Field, Input }
};
</script>
