<script>
  import { onMount } from "svelte";
  import InputText from "./InputText.svelte";

  onMount(() => {
    console.log("PlanetCMS");
  });
</script>

<div class="h-screen flex">
  <div class="w-80 border-slate-300 border-r p-8">123</div>
  <div><input type="hidden" name="cms-test" value="Hello World" /></div>
</div>
