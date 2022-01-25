<template>
  <section class="section">
    <div class="columns is-vcentered">
      <div class="column is-one-fifth">
        <div v-if="error" class="error">{{ error.message }}</div>
        <form @submit.prevent="pressed">
          <div class="file">
            <label class="file-label">
              <input
                class="file-input"
                required
                type="file"
                v-on:change="getFile"
              />
              <span class="file-cta">
                <span class="file-icon">
                  <icon :icon="['fas', 'upload']"></icon>
                </span>
                <span class="file-label"> Choose a file… </span>
              </span>
              <span v-if="file != null" class="file-name">
                {{ nameFile }}
              </span>
            </label>
          </div>
          <div class="field">
            <button class="button" type="submit">Upload</button>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>
<script>
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";

export default {
  name: "Upload",
  methods: {
    getFile(event) {
      const files = event.target.files;
      if (files.length === 1) {
        this.file = files[0];
        this.nameFile = files[0].name;
      } else {
        alert("You can upload 1 file per Upload.");
      }
    },
    pressed() {
      const storage = getStorage();
      const date = new Date();
      const formatDate =
        date.getDate().toString() +
        date.getMonth() +
        1 +
        date.getFullYear().toString() +
        date.getHours().toString() +
        date.getMinutes().toString() +
        date.getSeconds().toString();
      const filename = formatDate + "." + this.file.name.split(".").pop();
      const fullPath =
        this.$store.state.user.email.split("@").shift() + "/" + filename;
      const storageRef = ref(storage, fullPath);
      uploadBytes(storageRef, this.file).then(async () => {
        const documentName =
          this.$store.state.user.email.split("@").shift() + formatDate;
        await setDoc(doc(this.$db, "files", documentName), {
          originalName: this.file.name,
          storageName: filename,
          userEmail: this.$store.state.user.email,
        });
        alert(this.file.name + " uploaded succesfully !");
      });
    },
  },
  data() {
    return {
      nameFile: "",
      file: null,
      error: "",
    };
  },
};
</script>
