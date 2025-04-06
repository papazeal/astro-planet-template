<script>
  let {
    value = $bindable(),
    selectedRecord = $bindable(),
    ...props
  } = $props();

  // drag & drop
  let dragGroup = null;
  let dragFrom = $state(null);
  let dragTo = $state(null);
  function dragStart(e) {
    console.log("dragStart");
    dragFrom = e.currentTarget.getAttribute("index");
    dragGroup = e.currentTarget.getAttribute("drag-group");
    e.dataTransfer.effectAllowed = "move";
    e.currentTarget.classList.add("!cursor-grabbing");
  }
  function dragOver(e) {
    e.preventDefault();

    if (e.currentTarget.getAttribute("drag-group") != dragGroup) {
      return;
    }

    if (dragFrom != e.currentTarget.getAttribute("index")) {
      console.log("dragOver", e.currentTarget.getAttribute("index"));

      dragTo = e.currentTarget.getAttribute("index");

      let [item] = value.splice(dragFrom, 1);
      value.splice(dragTo, 0, item);
      dragFrom = dragTo;
    }
  }
  function dragEnd(e) {
    console.log("dragEnd");
    dragFrom = null;
    e.currentTarget.classList.remove("!cursor-grabbing");
  }
</script>

{#if Array.isArray(value) && value.length > 0}
  <div
    class="grid grid-cols-1 shadow border-1 border-slate-300 rounded relative overflow-hidden"
  >
    {#each value as record, index}
      <!-- svelte-ignore a11y_no_static_element_interactions -->
      <div
        class="border-b border-slate-200 flex gap-1 cursor-pointer items-center bg-white"
        class:!bg-blue-50={dragFrom == index}
        draggable="true"
        {index}
        drag-group={value.id}
        ondragstart={dragStart}
        ondragover={dragOver}
        ondragend={dragEnd}
      >
        <div
          class="py-2 cursor-grab px-1.5 text-slate-400 hover:text-slate-500 active:cursor-grabbing"
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
        <!-- svelte-ignore a11y_click_events_have_key_events -->
        <div
          onclick={() => {
            selectedRecord = record;
          }}
          class=" w-full py-2"
        >
          {record["title"] || "untitled"}
        </div>

        <!-- svelte-ignore a11y_click_events_have_key_events -->
        <div
          class="ml-auto px-2 text-slate-300 cursor-pointer h-5 hover:text-slate-500"
          aria-label="Remove item"
          onclick={() => {
            value.splice(index, 1);
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
        </div>
      </div>
    {/each}
  </div>
{/if}
