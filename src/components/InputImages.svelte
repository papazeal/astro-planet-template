<script>
  let { value = $bindable(), ...props } = $props();
  let field = props.field;

  if (value === undefined) value = [];

  // https://stackoverflow.com/questions/15960508/javascript-async-readasdataurl-multiple-files
  // const arrayOfBase64 = await fileListToBase64(yourFileList)
  async function fileListToBase64(fileList) {
    // create function which return resolved promise
    // with data:base64 string
    function getBase64(file) {
      const reader = new FileReader();
      return new Promise((resolve) => {
        reader.onload = (ev) => {
          resolve({
            // name: file.name,
            type: file.type,
            size: file.size,
            src: ev.target.result,
          });
        };
        reader.readAsDataURL(file);
      });
    }
    // here will be array of promisified functions
    const promises = [];

    // loop through fileList with for loop
    for (let i = 0; i < fileList.length; i++) {
      promises.push(getBase64(fileList[i]));
    }

    // array with base64 strings
    return await Promise.all(promises);
  }

  async function handleFile(event, limit = 10) {
    const files = event.target.files;
    let result = await fileListToBase64(files);
    value = value.concat(result);
    value = value.splice(0, limit);
  }

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

<div class="flex gap-5 flex-wrap">
  {#each value as item, index}
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div
      class="active:cursor-grabbing relative cursor-grab inline-flex border-1 border-gray-300 rounded bg-gray-100"
      class:!bg-blue-400={dragFrom == index}
      draggable="true"
      {index}
      drag-group={field.id}
      ondragstart={dragStart}
      ondragover={dragOver}
      ondragend={dragEnd}
    >
      <!-- svelte-ignore a11y_img_redundant_alt -->
      <img
        src={item.src}
        alt="Image preview"
        class="h-16 w-20 object-cover pointer-events-none rounded"
        class:opacity-40={dragFrom == index}
      />
      <!-- svelte-ignore a11y_consider_explicit_label -->
      <button
        type="button"
        class="text-white bg-slate-700 border-white border-2 hover:bg-slate-800 cursor-pointer w-6 h-6 rounded-full flex items-center justify-center absolute -top-1.5 -right-1.5"
        onclick={() => value.splice(index, 1)}
        ><svg
          class="h-4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 256 256"
        >
          <path
            fill="currentColor"
            d="M205.66 194.34a8 8 0 0 1-11.32 11.32L128 139.31l-66.34 66.35a8 8 0 0 1-11.32-11.32L116.69 128L50.34 61.66a8 8 0 0 1 11.32-11.32L128 116.69l66.34-66.35a8 8 0 0 1 11.32 11.32L139.31 128Z"
          />
        </svg></button
      >
    </div>
  {/each}
  {#if !value || value?.length < field.limit}
    <label
      class=" h-16 w-20 bg-gray-200 rounded cursor-pointer inline-flex items-center justify-center text-slate-500 hover:bg-slate-300 text-center border-1 box-content border-slate-200"
    >
      <svg class="h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
        ><g
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="1.5"
          ><rect width="18" height="18" x="3" y="3" rx="2" ry="2" /><circle
            cx="9"
            cy="9"
            r="2"
          /><path d="m21 15l-3.086-3.086a2 2 0 0 0-2.828 0L6 21" /></g
        ></svg
      >
      <input
        type="file"
        onchange={(e) => handleFile(e, field.limit)}
        accept="image/*"
        class="hidden"
        multiple={field.limit > 1}
      /></label
    >
  {/if}
</div>
