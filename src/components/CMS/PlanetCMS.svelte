<script>
  import toast, { Toaster } from "svelte-french-toast";
  import { onMount } from "svelte";
  import PlanetField from "./PlanetField.svelte";
  let props = $props();
  let model = props.model;
  let data = props.data;
  let user = props.user;
  let website = props.website;
  let isSaving = $state(false);
  let selectedGroup = $state(model[0]);
  let selectedRecord = $state(null);
  let formData = $state(data);

  onMount(() => {
    // toast.success("It works!");
  });

  async function submit(e) {
    isSaving = true;
    e.preventDefault();
    toast.loading("Saving...", { id: "cms" });
    // const formData = new FormData(e.currentTarget);
    const response = await fetch("", {
      method: "POST",
      type: "application/json",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const { message } = await response.json();

    toast.success(message, { id: "cms", duration: 3000 });
    isSaving = false;
  }
</script>

<Toaster />
<form method="POST" onsubmit={submit} class="antialias">
  <div class="shadow">
    <div class="py-4 px-5 md:px-6 flex gap-8">
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
          class="fixed flex md:relative md:p-0 md:border-0 md:shadow-none bottom-0 left-0 w-full p-4 px-6 shadow-xl border-slate-100 gap-4 z-20 bg-white"
        >
          <div
            class="absolute top-0 left-0 w-full h-10 shadow-lg -scale-y-100 pointer-events-none md:hidden"
          ></div>
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
    <div class="px-5 md:px-6 flex gap-1 overflow-x-auto scrollbar-hide">
      {#each model as group}
        <button
          type="button"
          class=" cursor-pointer py-1.5 px-2 border-b-2 border-transparent"
          class:border-violet-600={selectedGroup.id === group.id}
          onclick={() => {
            selectedGroup = group;
            selectedRecord = null;
          }}
        >
          {group.title}
        </button>
      {/each}
    </div>
  </div>

  <div class="grid grid-cols-1">
    <div class="py-8 px-6 md:px-8 text-gray-700 pb-40 md:pb-8 max-w-3xl">
      <!-- title -->
      <div class="mb-10">
        <div class="flex gap-4 items-center">
          <div>
            <div class="text-xl uppercase">{selectedGroup.title}</div>
            {#if selectedRecord}
              <div class="flex gap-2">
                <button
                  type="button"
                  class="cursor-pointer border-b border-dotted border-slate-300"
                  onclick={() => (selectedRecord = nll)}
                  >All {selectedGroup.title}</button
                >
                <div>></div>
                <div>Record</div>
              </div>
            {/if}
          </div>

          {#if selectedGroup.collection && !selectedRecord}
            <button
              type="button"
              class="border px-2 rounded cursor-pointer"
              onclick={() => {
                if (!formData[selectedGroup.id]) {
                  formData[selectedGroup.id] = [];
                }
                formData[selectedGroup.id].push({});
              }}>New Post</button
            >
          {/if}
        </div>
      </div>

      {#if selectedGroup.collection}
        {#if !selectedRecord}
          <div
            class="grid grid-cols-1 shadow-lg border-1 border-slate-300 rounded"
          >
            {#each formData[selectedGroup.id] as record, index}
              <div
                class=" py-2 border-b border-slate-200 flex gap-1 cursor-pointer hover:bg-slate-100 items-center"
                onclick={() => {
                  selectedRecord = record;
                }}
                draggable="true"
                role="listitem"
                ondragend={(e) => console.log(e)}
              >
                <div
                  class=" cursor-grab px-1.5 text-slate-400 hover:text-slate-500"
                >
                  <svg
                    class="h-6"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    ><path
                      fill="currentColor"
                      fill-rule="evenodd"
                      d="M5.5 4.75a.75.75 0 1 1 1.5 0a.75.75 0 0 1-1.5 0m3.5 0a.75.75 0 1 1 1.5 0a.75.75 0 0 1-1.5 0M5.5 7.995a.75.75 0 1 1 1.5 0a.75.75 0 0 1-1.5 0m3.5 0a.75.75 0 1 1 1.5 0a.75.75 0 0 1-1.5 0M5.5 11.25a.75.75 0 1 1 1.5 0a.75.75 0 0 1-1.5 0m3.5 0a.75.75 0 1 1 1.5 0a.75.75 0 0 1-1.5 0"
                      clip-rule="evenodd"
                    /></svg
                  >
                </div>
                <div>{record["title"] || "item #" + (index + 1)}</div>

                <button
                  class="ml-auto px-2 text-slate-300 cursor-pointer h-5 hover:text-slate-500"
                  aria-label="Remove item"
                  onclick={() => {
                    formData[selectedGroup.id].splice(index, 1);
                  }}
                >
                  <svg
                    class="h-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 256 256"
                  >
                    <path
                      fill="currentColor"
                      d="M205.66 194.34a8 8 0 0 1-11.32 11.32L128 139.31l-66.34 66.35a8 8 0 0 1-11.32-11.32L116.69 128L50.34 61.66a8 8 0 0 1 11.32-11.32L128 116.69l66.34-66.35a8 8 0 0 1 11.32 11.32L139.31 128Z"
                    />
                  </svg>
                </button>
              </div>
            {/each}
          </div>
        {/if}

        {#if selectedRecord}
          <div class="w-full grid grid-cols-1 gap-8">
            {#each selectedGroup.fields as field}
              <PlanetField {field} bind:value={selectedRecord[field.id]} />
            {/each}
          </div>
        {/if}
      {/if}

      {#if !selectedGroup.collection}<div
          class=" w-full grid grid-cols-1 gap-8"
        >
          {#each selectedGroup.fields as field}
            <PlanetField
              {field}
              bind:value={formData[selectedGroup.id][field.id]}
            />
          {/each}
        </div>
      {/if}
    </div>
    <div>
      <pre>{JSON.stringify(formData, null, "  ")}</pre>
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
