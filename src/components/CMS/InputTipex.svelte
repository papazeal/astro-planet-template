<script>
  import { onMount, onDestroy } from "svelte";
  import { Tipex } from "@friendofsvelte/tipex";
  let { value = $bindable(), ...props } = $props();

  onMount(() => {});
</script>

<Tipex
  body={value}
  controls
  !floating
  !focal
  class="border border-slate-400 rounded p-4"
  onupdate={(e) => {
    // value = JSON.stringify(e);
    console.log("update", e);
    value = e.editor.getHTML();
  }}
>
  {#snippet head(tipex)}
    head
  {/snippet}
  {#snippet controlComponent(tipex)}
    CustomControl
  {/snippet}
  {#snippet foot(tipex)}
    foot
  {/snippet}
  {#snippet utilities(tipex)}
    utilities
  {/snippet}
</Tipex>

<style>
  :global {
    .tipex-utilities {
      display: none;
    }
    .tipex-editor {
      p,
      h1,
      h2 {
        margin: 10px 0;
      }
    }
  }
</style>
