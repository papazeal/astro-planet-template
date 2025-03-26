<script>
  import { onMount } from "svelte";
  import InputText from "./InputText.svelte";
  let props = $props();
  let model = props.model;
  onMount(() => {
    console.log("PlanetCMS");
  });
</script>

<div class="h-screen flex">
  <div class="w-80 border-slate-300 border-r p-8">
    <div class="flex flex-wrap gap-2">
      {#each model as group}
        <div class="w-full">{group.title}</div>
      {/each}
    </div>
  </div>
  <div class="w-full">
    <div class="grid grid-cols-1 gap-4 p-8 w-full">
      {#each model as group}
        <div class="bg-green-50 w-full">
          {#each group.fields as field}
            <div class="">
              {field.title}
              <input
                type="text"
                name={group.id + "-" + field.id}
                value={""}
                class="border border-gray-800 px-2 py-1 rounded"
              />
            </div>
          {/each}
        </div>
      {/each}
    </div>
  </div>
</div>
