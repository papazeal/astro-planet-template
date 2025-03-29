<script>
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
      class="border border-gray-400 px-3 py-1.5 rounded w-100 max-w-full"
    />
  {/if}

  {#if field.type == "textarea"}
    <textarea
      class="border border-gray-400 px-3 py-1.5 rounded w-100 max-w-full"
      bind:value
    ></textarea>
  {/if}

  {#if field.type == "select"}
    <select
      class="border border-gray-400 px-3 py-1.5 rounded w-80 max-w-full"
      bind:value
    >
      {#each field.options as option}
        <option value={option.value}>{option.label}</option>
      {/each}
    </select>
  {/if}

  {#if field.type == "checkbox"}
    <input type="checkbox" bind:checked={value} />
  {/if}

  {#if field.type == "radio"}
    {#each field.options as option}
      <label class="py-1 block"
        ><input
          type="radio"
          value={option.value}
          bind:group={value}
          class="mr-2"
        />
        {option.label}</label
      >
    {/each}
  {/if}

  {#if field.type == "image"}
    <input type="file" accept="image/*" />
  {/if}
</div>
