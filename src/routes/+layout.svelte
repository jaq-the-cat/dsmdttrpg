<script lang="ts">
  import { FirebaseApp } from "sveltefire";
  import { initializeApp } from "firebase/app";
  import { getFirestore } from "firebase/firestore";
  import { getAuth } from "firebase/auth";
  import { setContext } from "svelte";
  import { db } from "$lib/db";

  const firebaseConfig = {
    apiKey: "AIzaSyDyDRKb1jBN_RezKt9aQkT0RigtLLHA1QM",
    authDomain: "flesh-and-oil.firebaseapp.com",
    projectId: "flesh-and-oil",
    storageBucket: "flesh-and-oil.firebasestorage.app",
    messagingSenderId: "235579855348",
    appId: "1:235579855348:web:4bad8fec111bf31cef29a1",
  };

  const app = initializeApp(firebaseConfig);
  const firestore = getFirestore(app);
  const auth = getAuth(app);

  db.firestore = firestore;
</script>

<FirebaseApp {auth} {firestore}>
  <slot />
</FirebaseApp>

<style lang="scss">
  :global(*) {
    font-family: "Courier New", Courier, monospace;
  }

  :global(.separator) {
    border: 0;
    height: 0;
    margin: 0;
    padding: 0;
    display: block;
    height: 15px;
  }

  :global(main) {
    :global(h2) {
      margin: 0 0 10px 0;
    }

    :global(ul) {
      margin: 0;
      padding: 0;
      min-height: 100px;
      list-style-type: none;
    }

    > :global(div) {
      padding: 20px;
      border: 1px solid #9fe644;
      box-shadow: 2px 2px 4px 0 #9fe644;
    }
  }
</style>
