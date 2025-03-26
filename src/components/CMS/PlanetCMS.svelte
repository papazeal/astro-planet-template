<script>
  import { onMount } from "svelte";
  import InputText from "./InputText.svelte";
  let props = $props();
  let model = props.model;
  let data = props.data;
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
    <div class="grid grid-cols-1 gap-8 p-8 w-full">
      {#each model as group}
        <div class="bg-green-50 w-full">
          {#each group.fields as field}
            <label class="">
              <div>{field.title}</div>
              <input
                type="text"
                name={group.id + "-" + field.id}
                value={data[group.id][field.id] || ""}
                class="border border-gray-500 px-2 py-1 rounded"
              />
            </label>
          {/each}
        </div>
      {/each}
    </div>
  </div>
</div>
