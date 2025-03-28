<script>
  let props = $props();
  let field = props.field;
  let group = props.group;
  let value = props.value;
</script>

<div class="">
  <div class="mb-2">
    <div>{field.title}</div>
    <div class="text-sm opacity-70">{field.description}</div>
  </div>

  {#if field.type == "text"}
    <input
      type="text"
      name={group.id + "-" + field.id}
      value={value || ""}
      class="border border-gray-400 px-3 py-1.5 rounded w-100 max-w-full"
    />
  {/if}

  {#if field.type == "textarea"}
    <textarea
      name={group.id + "-" + field.id}
      class="border border-gray-400 px-3 py-1.5 rounded w-100 max-w-full"
      >{value || ""}</textarea
    >
  {/if}

  {#if field.type == "select"}
    <select
      class="border border-gray-400 px-3 py-1.5 rounded w-80 max-w-full"
      name={group.id + "-" + field.id}
    >
      {#each field.options as option}
        <option value={option.value} selected={value == option.value}
          >{option.label}</option
        >
      {/each}
    </select>
  {/if}

  {#if field.type == "checkbox"}
    <input
      type="checkbox"
      name={group.id + "-" + field.id}
      checked={value == "on"}
    />
  {/if}

  {#if field.type == "radio"}
    {#each field.options as option}
      <label class="py-1 block"
        ><input
          type="radio"
          name={group.id + "-" + field.id}
          value={option.value}
          class="mr-2"
          checked={value == option.value}
        />
        {option.label}</label
      >
    {/each}
  {/if}

  {#if field.type == "image"}
    <input type="file" name={group.id + "-" + field.id} accept="image/*" />
  {/if}
</div>
