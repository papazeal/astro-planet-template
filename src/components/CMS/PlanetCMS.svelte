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

    toast.success(message, { id: "cms", duration: 3000 });
    isSaving = false;
  }
</script>

<Toaster />
<form method="POST" onsubmit={submit}>
  <div class="shadow-md">
    <div class="py-4 px-6 flex gap-8">
      <div class="flex gap-2 overflow-hidden items-center">
        <svg
          class="h-6 shrink-0"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 256 256"
          ><path
            fill="currentColor"
            d="M128 26a102 102 0 1 0 102 102A102.12 102.12 0 0 0 128 26m0 12a89.53 89.53 0 0 1 50 15.2V74a2 2 0 0 1-.48 1.31L155.35 101a2 2 0 0 1-1.25.68L122.63 106a2 2 0 0 1-1.44-.36l-.24-.16l-19.7-12.89a14 14 0 0 0-19.71 3.64l-21 31.3a13.94 13.94 0 0 0-2.36 7.71L58 171.45a2 2 0 0 1-.9 1.66l-5 3.27A90 90 0 0 1 128 38M59.28 186.05l4.43-2.9A14 14 0 0 0 70 171.52l.21-36.23a2.05 2.05 0 0 1 .33-1.1l21-31.3a2 2 0 0 1 1.31-.86a2 2 0 0 1 1.52.35l.24.16l19.7 12.89a13.93 13.93 0 0 0 10 2.44l31.47-4.26a14 14 0 0 0 8.73-4.74l22.17-25.76A14 14 0 0 0 190 74V62.82a89.91 89.91 0 0 1 22.68 95.67l-18.4-16.82a14 14 0 0 0-14.82-2.6L149 151.73a14.11 14.11 0 0 0-8.48 10.89l-2.38 16.19a14 14 0 0 0 10.3 15.58L169.9 200a2.1 2.1 0 0 1 .91.53l4.18 4.18a89.86 89.86 0 0 1-115.71-18.66m125.62 11.63l-5.59-5.61a14 14 0 0 0-6.36-3.65l-21.46-5.63a2 2 0 0 1-1.47-2.23l2.39-16.19a2 2 0 0 1 1.21-1.56l30.45-12.66a2 2 0 0 1 2.12.37l21.36 19.54a90.8 90.8 0 0 1-22.65 27.62"
          /></svg
        >
        <a
          class="whitespace-nowrap overflow-ellipsis overflow-hidden"
          href={website}>{website.replace(/(^\w+:|^)\/\//, "")}</a
        >
      </div>
      <div class="hidden md:flex gap-2 items-center">
        <svg
          class="h-6"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 256 256"
          ><path
            fill="currentColor"
            d="M128 26a102 102 0 1 0 102 102A102.12 102.12 0 0 0 128 26M71.44 198a66 66 0 0 1 113.12 0a89.8 89.8 0 0 1-113.12 0M94 120a34 34 0 1 1 34 34a34 34 0 0 1-34-34m99.51 69.64a77.53 77.53 0 0 0-40-31.38a46 46 0 1 0-51 0a77.53 77.53 0 0 0-40 31.38a90 90 0 1 1 131 0"
          /></svg
        >
        <div>{user}</div>
      </div>
      <div class="ml-auto">
        <div
          class="fixed flex md:relative md:p-0 md:border-0 md:shadow-none bottom-0 left-0 w-full p-4 shadow-xl border-t border-slate-300 gap-4 z-20 bg-white"
        >
          <a
            href="/signout"
            class=" shrink-0 px-4 py-1.5 md:py-1 rounded border-slate-500 border"
          >
            Sign Out
          </a>
          <input
            type="submit"
            value="Save Changes"
            disabled={isSaving}
            class="w-full bg-gray-800 text-white px-4 py-1.5 md:py-1 rounded cursor-pointer disabled:opacity-50"
          />
        </div>
      </div>
    </div>
    <div class="px-6 flex gap-1 overflow-x-auto scrollbar-hide">
      {#each model as group}
        <button
          type="button"
          class=" cursor-pointer py-1.5 px-2 border-b-2 border-transparent -mb-[1px]"
          class:border-violet-600={selectedGroup === group.id}
          onclick={() => {
            selectedGroup = group.id;
          }}
        >
          {group.title}
        </button>
      {/each}
    </div>
  </div>

  <div class="">
    <div class="">
      <div class="grid grid-cols-1 gap-14 py-8 px-8 w-full text-gray-700">
        {#each model as group}
          <div
            class=" w-full grid grid-cols-1 gap-6"
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
                  class="border border-gray-400 px-3 py-1.5 rounded w-100 max-w-full"
                />
              </div>
            {/each}
          </div>
        {/each}
      </div>
    </div>
  </div>
</form>

<style>
  /* Hide scrollbar for Chrome, Safari and Opera */
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }

  /* Hide scrollbar for IE, Edge and Firefox */
  .scrollbar-hide {
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
  }
</style>
