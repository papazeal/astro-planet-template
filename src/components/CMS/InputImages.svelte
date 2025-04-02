<script>
  let { value = $bindable(), ...props } = $props();
  let field = props.field;

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
            name: file.name,
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
  let dragGroup = field.id;
  let dragFrom = $state(null);
  let dragTo = $state(null);
  let dragToEl = null;
  let dragOverClass = "pl-10";
  function dragStart(e) {
    dragFrom = e.currentTarget.getAttribute("index");
    console.log("dragStart");
  }
  function dragEnter(e) {
    e.preventDefault();
    console.log(e.currentTarget.getAttribute("drag-group") + " / " + dragGroup);
    if (e.currentTarget.getAttribute("drag-group") != dragGroup) {
      return;
    }
    if (
      dragFrom == e.currentTarget.getAttribute("index") ||
      dragFrom == e.currentTarget.getAttribute("index") - 1
    )
      return;
    dragTo = e.currentTarget.getAttribute("index");
    dragToEl = e.currentTarget;
    e.currentTarget.classList.add(dragOverClass);
    console.log("dragEnter");
  }
  function dragOver(e) {
    e.preventDefault();
  }
  function dragLeave(e) {
    e.preventDefault();
    if (e.currentTarget.getAttribute("drag-group") != dragGroup) {
      return;
    }
    dragTo = null;
    dragToEl = null;
    e.currentTarget.classList.remove(dragOverClass);
    console.log("dragLeave");
  }
  function dragEnd(e) {
    if (dragFrom && dragTo) {
      if (dragFrom < dragTo) dragTo--;
      dragToEl.classList.remove(dragOverClass);
      let [item] = value.splice(dragFrom, 1);
      value.splice(dragTo, 0, item);
    }
  }
</script>

<div class="hidden">group {dragGroup} - from {dragFrom} - to {dragTo}</div>
<div class="flex gap-4 flex-wrap">
  {#if !value || value?.length < field.limit}
    <label
      class="px-5 h-16 bg-slate-200 rounded cursor-pointer inline-flex items-center justify-center text-slate-500 hover:bg-slate-300 text-center border border-slate-200"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-10" viewBox="0 0 256 256"
        ><path
          fill="currentColor"
          d="M208 34H48a14 14 0 0 0-14 14v160a14 14 0 0 0 14 14h160a14 14 0 0 0 14-14V48a14 14 0 0 0-14-14M46 208V48a2 2 0 0 1 2-2h160a2 2 0 0 1 2 2v82.2l-28.1-28.1a14 14 0 0 0-19.8 0L54.2 210H48a2 2 0 0 1-2-2m162 2H71.17l99.41-99.41a2 2 0 0 1 2.83 0L210 147.17V208a2 2 0 0 1-2 2M96 118a22 22 0 1 0-22-22a22 22 0 0 0 22 22m0-32a10 10 0 1 1-10 10a10 10 0 0 1 10-10"
        /></svg
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
  {#each value as item, index}
    <div
      class="relative cursor-grab inline-flex transition-all duration-200 ease-in-out"
      draggable="true"
      {index}
      drag-group={field.id}
      ondragstart={dragStart}
      ondragenter={dragEnter}
      ondragleave={dragLeave}
      ondragover={dragOver}
      ondragend={dragEnd}
    >
      <img
        src={item.src}
        alt="Image preview"
        class="h-16 border border-slate-200 rounded pointer-events-none"
      />
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
  <div
    class="w-16 h-16 !p-0"
    drag-group={field.id}
    index={value.length}
    ondragenter={dragEnter}
    ondragleave={dragLeave}
    ondragover={dragOver}
  ></div>
</div>
