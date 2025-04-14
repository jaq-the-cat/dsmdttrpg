<script lang="ts">
  import "./global.scss";
  import { FirebaseApp } from "sveltefire";
  import { initializeApp } from "firebase/app";
  import { getFirestore } from "firebase/firestore";
  import { getAuth } from "firebase/auth";
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

<svelte:head>
  <title>Murder Drones: Flesh and Oil</title>
</svelte:head>

<header>
  <a data-sveltekit-reload class="buttonStyle" href="/"
    >Character Sheet Creator</a
  >
  <a data-sveltekit-reload class="buttonStyle" href="/rulebook">Rulebook</a>
</header>

<FirebaseApp {auth} {firestore}>
  <slot />
</FirebaseApp>

<style>
  header {
    display: flex;
    justify-content: center;
    column-gap: 20px;
    width: 100%;
    padding: 10px;
    padding-top: 0;
    margin-bottom: 10px;

    a {
      padding: 10px;
      text-decoration: none;
      font-size: 1.2rem;
    }
  }
</style>
