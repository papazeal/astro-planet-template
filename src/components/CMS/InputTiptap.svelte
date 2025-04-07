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
      icon: `<svg class="w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 12h12M6 20V4m12 16V4"/></svg>`,
      action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
    },

    {
      name: "bulletList",
      icon: `<svg class="w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12h.01M3 18h.01M3 6h.01M8 12h13M8 18h13M8 6h13"/></svg>`,
      action: () => editor.chain().focus().toggleBulletList().run(),
    },
    {
      name: "orderedList",
      icon: `<svg class="w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 12h11m-11 6h11M10 6h11M4 10h2M4 6h1v4m1 8H4c0-1 2-2 2-3s-1-1.5-2-1"/></svg>`,
      action: () => editor.chain().focus().toggleOrderedList().run(),
    },
    {
      name: "blockquote",
      icon: `<svg class="w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/><path d="M8 12a2 2 0 0 0 2-2V8H8m6 4a2 2 0 0 0 2-2V8h-2"/></g></svg>`,
      action: () => editor.chain().focus().toggleBlockquote().run(),
    },
    {
      name: "codeBlock",
      icon: `<svg class="w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m18 16l4-4l-4-4M6 8l-4 4l4 4m8.5-12l-5 16"/></svg>`,
      action: () => editor.chain().focus().toggleCodeBlock().run(),
    },
    {
      name: "bold",
      icon: `<svg class="w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M6 12h9a4 4 0 0 1 0 8H7a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h7a4 4 0 0 1 0 8"/></svg>`,
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

<div class=" border border-gray-300 rounded overflow-hidden">
  {#if editor}
    <div class="flex px-2 py-2 gap-2 shadow-lg">
      {#each bt as button}
        <button
          type="button"
          onclick={button.action}
          class={"w-7 h-7 rounded-lg  flex items-center justify-center cursor-pointer hover:bg-gray-100  " +
            (editor.isActive(button.name) ? "!bg-gray-600 text-white" : "")}
        >
          {@html button.icon}
        </button>
      {/each}
    </div>
  {/if}
  <div bind:this={element} class="p-6 overflow-auto pb-12 max-h-[65vh]" />
</div>

<style>
  :global {
    .tiptap {
      display: flex;
      flex-direction: column;
      gap: 24px;
      outline: none;
      min-height: 30vh;

      h1,
      h2 {
        font-size: 2rem;
        margin-top: 2.5rem;
        &:first-child {
          margin-top: 0;
        }
      }
      h2 {
        font-size: 1.5rem;
      }
      code {
        color: white;
        background: #333;
        padding: 20px;
        border-radius: 4px;
        display: block;
      }
      blockquote {
        background: #f5f5f5;
        padding: 20px;
        border-radius: 4px;
        font-style: italic;
      }
      ul,
      ol {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
        counter-reset: item;
        li {
          position: relative;
          padding-left: 24px;
        }
      }
      ul li:before {
        content: "•";
        position: absolute;
        left: 2px;
        top: -2px;
      }
      ol li:before {
        content: counter(item) ". ";
        counter-increment: item;
        position: absolute;
        left: 2px;
        top: 0px;
      }
    }
  }
</style>
