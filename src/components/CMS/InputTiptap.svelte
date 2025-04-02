<script>
  import { onMount, onDestroy } from "svelte";
  import { Editor } from "@tiptap/core";
  import StarterKit from "@tiptap/starter-kit";

  let { value = $bindable(), ...props } = $props();

  let element;
  let editor;

  onMount(() => {
    editor = new Editor({
      element: element,
      editorProps: {
        attributes: {
          class:
            "prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl min-h-40 focus:outline-none",
        },
      },
      extensions: [StarterKit],
      content: value,
      onTransaction: () => {
        // force re-render so `editor.isActive` works as expected
        editor = editor;
      },
      onUpdate: ({ editor }) => {
        value = editor.getHTML(); // Sync changes
      },
    });
  });

  onDestroy(() => {
    if (editor) {
      editor.destroy();
    }
  });
</script>

{#if editor}
  <button
    type="button"
    onclick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
    class:active={editor.isActive("heading", { level: 1 })}
  >
    H1
  </button>
  <button
    type="button"
    onclick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
    class:active={editor.isActive("heading", { level: 2 })}
  >
    H2
  </button>
  <button
    type="button"
    onclick={() => editor.chain().focus().setParagraph().run()}
    class:active={editor.isActive("paragraph")}
  >
    P
  </button>
{/if}

<div
  bind:this={element}
  class="p-4 border-gray-400 rounded border outline-none"
></div>

<style>
  button.active {
    background: black;
    color: white;
  }
</style>
