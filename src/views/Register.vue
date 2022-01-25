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
                type="text"
                v-model="firstname"
                placeholder="firstname"
              />
            </div>
          </div>
          <div class="field">
            <div class="control">
              <input
                class="input"
                type="text"
                v-model="lastname"
                placeholder="lastname"
              />
            </div>
          </div>
          <div class="field">
            <div class="control">
              <input
                class="input"
                type="text"
                v-model="username"
                placeholder="username"
              />
            </div>
          </div>
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
              <input
                class="input"
                type="tel"
                v-model="number"
                placeholder="number"
              />
            </div>
          </div>
          <div class="field">
            <div class="control">
              <button class="button" type="submit">Register</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

export default {
  name: "Register",
  methods: {
    async pressed() {
      console.log(this.email);
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, this.email, this.password)
        .then(() => {
          this.$router.push({ name: "Upload" });
        })
        .catch((err) => {
          console.log("Error Register : " + err);
        });
      await setDoc(doc(this.$db, "users", this.username), {
        firstname: this.firstname,
        lastname: this.lastname,
        username: this.username,
        email: this.email,
        password: this.password,
        number: this.number,
      });
    },
  },
  data() {
    return {
      firstname: "",
      lastname: "",
      username: "",
      email: "",
      password: "",
      number: "",
      error: "",
    };
  },
};
</script>
