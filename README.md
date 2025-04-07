# Astro Template with Built-in CMS

![planet template](https://bucket.papazeal.com/planet-template.jpg "Planet Template")

This is an Astro template with a **built-in CMS** that stores data on **Cloudflare R2**. It provides an easy-to-use content management system while keeping your website fast and efficient.

Demo: https://planet.papazeal.com

## Tech Stack

- **Astro Framework**
- **Cloudflare R2 Storage** for JSON data and images storage
- **Clerk** for Authentication
- **Svelte** for CMS
- **Vercel** as Deployment Platform

## Installation

```sh
npm create astro@latest -- --template papazeal/astro-planet-template
```

OR

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fpapazeal%2Fastro-planet-template&env=PROJECT_ID,PUBLIC_CLERK_PUBLISHABLE_KEY,CLERK_SECRET_KEY,ADMIN_EMAILS,R2_ENDPOINT,R2_ACCESS_KEY_ID,R2_SECRET_ACCESS_KEY,R2_BUCKET,R2_CUSTOM_DOMAIN&demo-title=Planet%20Template&demo-description=An%20Astro%20Template%20with%20Buit-in%20CMS&demo-url=https%3A%2F%2Fplanet.papazeal.com%2F&demo-image=https%3A%2F%2Fbucket.papazeal.com%2Fplanet-template.jpg)

## Environment Variables

Create a `.env` file and add your Clerk and Cloudflare R2 credentials:

```env
# must be unique for each site
# example: my_website_com
PROJECT_ID=

# Auth
# https://clerk.com/
PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

# admin emails
# leave blank to allow everyone
# use , separate
ADMIN_EMAILS=

# Cloudflare R2
# https://www.cloudflare.com/developer-platform/products/r2/
R2_ENDPOINT=
R2_ACCESS_KEY_ID=
R2_SECRET_ACCESS_KEY=
R2_BUCKET=
R2_CUSTOM_DOMAIN=
```

## Model

Edit `src/model.json` to config available fields in CMS

```json
{
  "groups": [
    {
      "title": "Settings",
      "id": "settings",
      "fields": [
        {
          "title": "Title",
          "id": "title",
          "type": "text"
        },
        {
          "title": "Description",
          "id": "description",
          "type": "textarea"
        },
        {
          "title": "Logo",
          "id": "logo",
          "type": "images",
          "limit": 1
        },
        {
          "title": "Slides",
          "id": "slides",
          "type": "images",
          "limit": 3
        },
        {
          "title": "Language",
          "id": "language",
          "type": "select",
          "options": [
            { "value": "en", "label": "EN" },
            { "value": "cn", "label": "CN" },
            { "value": "th", "label": "TH" }
          ]
        },
        {
          "title": "Allow SEO Bot",
          "id": "seo",
          "type": "checkbox"
        },
        {
          "title": "Theme",
          "id": "theme",
          "type": "radio",
          "options": [
            { "value": "light", "label": "Light" },
            { "value": "dark", "label": "Dark" },
            { "value": "auto", "label": "Auto" }
          ]
        }
      ]
    },
    {
      "title": "Post",
      "id": "post",
      "collection": true,
      "key": "title",
      "fields": [
        {
          "title": "Title",
          "id": "title",
          "type": "text",
          "value": ""
        },
        {
          "title": "Content",
          "id": "content",
          "type": "editor",
          "value": ""
        }
      ]
    }
  ]
}
```
