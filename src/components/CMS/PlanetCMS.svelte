<script>
  import toast, { Toaster } from "svelte-french-toast";
  import { onMount } from "svelte";
  import InputText from "./InputText.svelte";
  let props = $props();
  let model = props.model;
  let data = props.data;
  let user = props.user;
  let website = props.website;
  let isSaving = $state(false);
  let selectedGroup = $state(model[0].id);
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
  <div class="shadow-md py-3 px-8 flex gap-8 hidden">
    <div class="hidden">
      <div class=" uppercase opacity-50 text-xs -mb-0.5">Website</div>
      <div>{website}</div>
    </div>
    <div class="">
      <div class=" uppercase opacity-50 text-xs -mb-0.5">User</div>
      <div>{user}</div>
    </div>
    <div></div>
  </div>
  <div class="h-screen md:flex">
    <div
      class="md:w-100 border-slate-200 border-r relative shadow-xl overflow-hidden"
    >
      <div class="flex gap-4 shadow px-6 py-4">
        <div class="w-10 h-10 bg-slate-400 rounded-full shrink-0"></div>
        <div class="overflow-ellipsis overflow-hidden">
          <div class="uppercase text-sm opacity-50 -mb-0.5">website</div>
          <a href={website} class=" border-b border-dotted border-slate-500"
            >{website}dfdsafdasfdasf</a
          >
        </div>
      </div>
      <div class="p-6 px-0 hidden md:block">
        <div class="grid grid-cols-1">
          {#each model as group}
            <button
              type="button"
              class="w-full text-left cursor-pointer px-6 py-1"
              class:text-violet-700={selectedGroup === group.id}
              onclick={(selectedGroup = group.id)}
            >
              {group.title}
            </button>
          {/each}
        </div>
        <div class="mt-12 hidden">
          <div class="text-sm uppercase opacity-50 -mb-0.5">user</div>
          <div>{user}</div>
        </div>
      </div>
      <div
        class="fixed flex md:absolute bottom-0 left-0 w-full p-4 shadow-lg border-t border-slate-300 gap-4 z-20 bg-white"
      >
        <div class=" shrink-0 px-4 py-1 rounded border-slate-500 border">
          Sign Out
        </div>
        <input
          type="submit"
          value="Save "
          disabled={isSaving}
          class="w-full bg-gray-800 text-white px-4 py-1 rounded cursor-pointer disabled:opacity-50"
        />
      </div>
    </div>
    <div class="w-full">
      <div
        class="grid grid-cols-1 gap-14 py-8 px-6 md:px-12 w-full text-gray-700"
      >
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
