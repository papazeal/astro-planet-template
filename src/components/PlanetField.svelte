<script>
  import InputImages from "./InputImages.svelte";
  import InputTiptap from "./InputTiptap.svelte";

  let { value = $bindable(), ...props } = $props();
  let field = props.field;
</script>

<div class="">
  <div class="mb-2">
    <div>{field.title}</div>
    <div class="text-sm opacity-70">{field.description}</div>
  </div>

  {#if field.type == "text"}
    <input
      type="text"
      bind:value
      class="border border-gray-300 px-3 py-1.5 rounded w-full max-w-full"
    />
  {/if}

  {#if field.type == "textarea"}
    <textarea
      class="border border-gray-300 px-3 py-1.5 rounded w-full max-w-full"
      rows="4"
      bind:value
    ></textarea>
  {/if}

  {#if field.type == "select"}
    <div class="relative border border-gray-300 rounded">
      <select
        class=" outline-0 w-full appearance-none px-3 py-1.5 cursor-pointer"
        bind:value
      >
        {#each field.options as option}
          <option value={option.value}>{option.label}</option>
        {/each}
      </select>
      <svg
        class=" absolute right-2 top-2 h-5 pointer-events-none text-gray-400"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        ><path
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="m7 15l5 5l5-5M7 9l5-5l5 5"
        /></svg
      >
    </div>
  {/if}

  <!-- checkbox -->
  {#if field.type == "checkbox"}
    <label
      class="w-12 h-5 bg-slate-100 block rounded-full cursor-pointer border border-slate-200"
      class:bg-slate-600={value}
    >
      <div
        class="w-5 h-5 rounded-full bg-white shadow-lg border-slate-300 border scale-120"
        class:ml-auto={value}
      ></div>
      <input type="checkbox" bind:checked={value} class="hidden" /></label
    >
  {/if}

  <!-- radio -->
  {#if field.type == "radio"}
    {#each field.options as option}
      <label class="py-1 block"
        ><input
          type="radio"
          value={option.value}
          bind:group={value}
          class="mr-2"
        />
        {option.label}
      </label>
    {/each}
  {/if}

  <!-- image -->
  {#if field.type == "images"}
    <InputImages {field} bind:value />
  {/if}

  <!-- editor -->
  {#if field.type == "editor"}
    <InputTiptap {field} bind:value />
  {/if}
</div>
