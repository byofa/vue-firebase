<template>
  <section class="section">
    <div class="columns is-vcentered">
      <div class="column is-one-fifth">
        <div v-if="error" class="error">{{ error.message }}</div>
        <form @submit.prevent="pressed">
          <div class="field">
            <div class="control">
              <input
                class="input"
                type="email"
                v-model="email"
                placeholder="email"
              />
            </div>
          </div>
          <div class="field">
            <div class="control">
              <input
                class="input"
                type="password"
                v-model="password"
                placeholder="password"
              />
            </div>
          </div>
          <div class="field">
            <div class="control">
              <button class="button" type="submit">Login</button>
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
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export default {
  name: "Login",
  methods: {
    async pressed() {
      console.log(this.email);
      const auth = getAuth();
      signInWithEmailAndPassword(auth, this.email, this.password)
        .then((userCredential) => {
          this.$store.commit("userLoggin", userCredential);
          this.$router.push("/upload");
        })
        .catch((err) => {
          console.log("Error Login : " + err);
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
  // components: {
  //   Field,
  //   Input
  // }
};
</script>
