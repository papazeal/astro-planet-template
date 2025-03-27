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
  let mobileMenu = $state(true);
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

    toast.success(message, { id: "cms", duration: 3000 });
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
  <div class="h-screen md:flex antialiased">
    <div
      class="md:w-80 shrink-0 border-slate-200 border-r relative md:shadow-xl"
    >
      <div class="flex gap-3 shadow-lg px-6 py-3 items-center">
        <div class="w-6 h-6 bg-violet-800 rounded-full shrink-0"></div>
        <div class="overflow-ellipsis overflow-hidden">
          <div class="uppercase text-xs opacity-50 -mb-0.5 hidden">website</div>
          <a
            href={website}
            class=" whitespace-nowrap border-b border-dotted border-slate-500"
            >{website}</a
          >
        </div>

        <svg
          class="ml-auto md:hidden h-7 cursor-pointer hover:opacity-100 opacity-70"
          onclick={(mobileMenu = true)}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          ><path
            fill="currentColor"
            d="M4 18q-.425 0-.712-.288T3 17t.288-.712T4 16h16q.425 0 .713.288T21 17t-.288.713T20 18zm0-5q-.425 0-.712-.288T3 12t.288-.712T4 11h16q.425 0 .713.288T21 12t-.288.713T20 13zm0-5q-.425 0-.712-.288T3 7t.288-.712T4 6h16q.425 0 .713.288T21 7t-.288.713T20 8z"
          /></svg
        >
      </div>
      <div class="p-6 md:!block" class:hidden={!mobileMenu}>
        <div class="flex flex-wrap gap-2">
          {#each model as group}
            <button
              type="button"
              class="w-full text-left cursor-pointer py-1"
              class:md:font-semibold={selectedGroup === group.id}
              onclick={() => {
                selectedGroup = group.id;
                mobileMenu = false;
              }}
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
        <div class=" shrink-0 px-4 py-1.5 rounded border-slate-500 border">
          Sign Out
        </div>
        <input
          type="submit"
          value="Save "
          disabled={isSaving}
          class="w-full bg-gray-800 text-white px-4 py-1.5 rounded cursor-pointer disabled:opacity-50"
        />
      </div>
    </div>
    <div class="w-full md:!block" class:hidden={mobileMenu}>
      <div
        class="grid grid-cols-1 gap-14 py-8 px-6 md:px-12 w-full text-gray-700"
      >
        {#each model as group}
          <div
            class=" w-full grid grid-cols-1 gap-4"
            class:hidden={selectedGroup !== group.id}
          >
            <div class="text-xl">{group.title}</div>
            {#each group.fields as field}
              <div class="">
                <div class="mb-1">{field.title}</div>
                <input
                  type="text"
                  name={group.id + "-" + field.id}
                  value={data[group.id]?.[field.id] || ""}
                  class="border border-gray-400 px-2 py-1 rounded"
                />
              </div>
            {/each}
          </div>
        {/each}
      </div>
    </div>
  </div>
</form>
