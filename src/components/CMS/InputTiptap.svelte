<script lang="ts">
  import StarterKit from "@tiptap/starter-kit";
  import { Editor } from "@tiptap/core";
  import { onMount } from "svelte";
  let { value = $bindable(), ...props } = $props();

  let element: Element | undefined = $state();
  let editor: Editor | undefined = $state();

  let bt = [
    {
      name: "heading",
      icon: "H",
      action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
    },
    {
      name: "paragraph",
      icon: "P",
      action: () => editor.chain().focus().setParagraph().run(),
    },
    {
      name: "bulletList",
      icon: "L",
      action: () => editor.chain().focus().toggleBulletList().run(),
    },
    {
      name: "bold",
      icon: "B",
      action: () => editor.chain().focus().toggleBold().run(),
    },
  ];

  onMount(() => {
    editor = new Editor({
      element: element,
      content: value,
      extensions: [StarterKit.configure({ history: false })],
      onCreate: () => {
        console.log("onCreate");
      },
      onTransaction: ({ editor: newEditor }) => {
        // force re-render so `editor.isActive` works as expected
        editor = undefined;
        editor = newEditor;
      },
      onUpdate: ({ editor }) => {
        value = editor.getHTML();
      },
    });
  });
</script>

<div class=" border border-slate-400 rounded overflow-hidden">
  {#if editor}
    <div
      class="flex bg-slate-1100 px-4 py-2 gap-2 shadow-lg border-b border-slate-300"
    >
      {#each bt as button}
        <button
          type="button"
          onclick={button.action}
          class={"w-8 h-8 rounded-lg py-1 block cursor-pointer hover:bg-slate-100  " +
            (editor.isActive(button.name) ? "!bg-slate-600 text-white" : "")}
        >
          {button.icon}
        </button>
      {/each}
    </div>
  {/if}
  <div bind:this={element} class="p-4 py-6" />
</div>

<style>
  :global {
    .tiptap {
      display: flex;
      flex-direction: column;
      gap: 20px;
      outline: none;
      min-height: 30vh;

      h1 {
        font-size: 2rem;
      }
      h2 {
        font-size: 1.5rem;
      }
    }
  }
</style>
