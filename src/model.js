export const model = [
  {
    title: "Settings",
    id: "settings",
    fields: [
      {
        title: "Title",
        id: "title",
        type: "text",
      },
      {
        title: "Description",
        id: "description",
        type: "textarea",
      },
      {
        title: "Logo",
        id: "logo",
        type: "images",
        limit: 1,
      },
      {
        title: "Slides",
        id: "slides",
        type: "images",
        limit: 3,
      },
      {
        title: "Language",
        id: "language",
        type: "select",
        options: [
          { value: "en", label: "EN" },
          { value: "cn", label: "CN" },
          { value: "th", label: "TH" },
        ],
      },
      {
        title: "Allow SEO Bot",
        id: "seo",
        type: "checkbox",
      },
      {
        title: "Theme",
        id: "theme",
        type: "radio",
        options: [
          { value: "light", label: "Light" },
          { value: "dark", label: "Dark" },
          { value: "auto", label: "Auto" },
        ],
      },
    ],
  },
  {
    title: "Post",
    id: "post",
    collection: true,
    key: "title",
    fields: [
      {
        title: "Title",
        id: "title",
        type: "text",
        value: "",
      },
      {
        title: "Content",
        id: "content",
        type: "editor",
        value: "",
      },
    ],
  },
];
