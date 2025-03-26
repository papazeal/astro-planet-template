<script>
  import toast, { Toaster } from "svelte-french-toast";
  import { onMount } from "svelte";
  import InputText from "./InputText.svelte";
  let props = $props();
  let model = props.model;
  let data = props.data;
  let user = props.user;
  let host = props.host;
  let isSaving = $state(false);
  onMount(() => {
    // toast.success("It works!");
  });

  async function submit(e) {
    isSaving = true;
    e.preventDefault();
    toast.loading("Saving...", { id: "cms" });
    const formData = new FormData(e.currentTarget);
    const response = await fetch("", {
      method: "POST",
      body: formData,
    });
    const { message } = await response.json();

    toast.success(message, { id: "cms" });
    isSaving = false;
  }
</script>

<Toaster />
<form method="POST" onsubmit={submit}>
  <div class="h-screen flex">
    <div class="w-90 border-slate-300 border-r p-8">
      <div class="flex flex-wrap gap-2">
        {#each model as group}
          <div class="w-full">{group.title}</div>
        {/each}
      </div>
      <input
        type="submit"
        disabled={isSaving}
        class="mt-10 bg-gray-800 text-white px-4 py-1 rounded cursor-pointer disabled:opacity-50"
      />
    </div>
    <div class="w-full">
      <div class="grid grid-cols-1 gap-14 p-8 px-12 w-full text-gray-700">
        {#each model as group}
          <div class=" w-full grid grid-cols-1 gap-4">
            <div class="text-lg">{group.title}</div>
            {#each group.fields as field}
              <label class="">
                <div class="mb-1">{field.title}</div>
                <input
                  type="text"
                  name={group.id + "-" + field.id}
                  value={data[group.id]?.[field.id] || ""}
                  class="border border-gray-400 px-2 py-1 rounded"
                />
              </label>
            {/each}
          </div>
        {/each}
      </div>
    </div>
  </div>
</form>
