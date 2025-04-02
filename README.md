# Astro CMS Template

This is an Astro template with a **built-in CMS** that stores data on **Cloudflare R2**. It provides an easy-to-use content management system while keeping your website fast and efficient.

## 🚀 Features

- **Astro Framework** for ultra-fast performance
- **Built-in CMS** for managing content effortlessly
- **Cloudflare R2 Storage** for scalable and cost-effective media storage
- **Markdown & JSON Support** for flexible content management
- **Serverless & Edge-Optimized** for speed and reliability

## 📦 Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/papazeal/astro-planet-template.git
   cd astro-planet-template
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file and add your Cloudflare R2 credentials:
   ```env
   R2_ACCESS_KEY=your-access-key
   R2_SECRET_KEY=your-secret-key
   R2_BUCKET_NAME=your-bucket-name
   R2_ENDPOINT=https://your-account-id.r2.cloudflarestorage.com
   ```

## 📝 Usage

### Running the Development Server

```sh
npm run dev
```

This starts the Astro dev server with live reload.

### Deploying the Site

To build and deploy:

```sh
npm run build
npm run deploy
```

Ensure your deployment service supports **Astro with R2**.

## 🛠️ CMS Configuration

- Content is managed through JSON/Markdown files stored in **Cloudflare R2**.
- You can extend the CMS by modifying the `/cms` directory.
- File uploads are handled via API routes.

## 🔗 Resources

- [Astro Documentation](https://docs.astro.build/)
- [Cloudflare R2](https://developers.cloudflare.com/r2/)
- [GitHub Repository](https://github.com/papazeal/astro-planet-template)

## 📄 License

This project is licensed under the MIT License.

---

### Need Help?

Feel free to open an issue or contribute to the repository!

# Astro Starter Kit: Basics

```sh
npm create astro@latest -- --template basics
```

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/withastro/astro/tree/latest/examples/basics)
[![Open with CodeSandbox](https://assets.codesandbox.io/github/button-edit-lime.svg)](https://codesandbox.io/p/sandbox/github/withastro/astro/tree/latest/examples/basics)
[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/withastro/astro?devcontainer_path=.devcontainer/basics/devcontainer.json)

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

![just-the-basics](https://github.com/withastro/astro/assets/2244813/a0a5533c-a856-4198-8470-2d67b1d7c554)

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
│   └── favicon.svg
├── src/
│   ├── layouts/
│   │   └── Layout.astro
│   └── pages/
│       └── index.astro
└── package.json
```

To learn more about the folder structure of an Astro project, refer to [our guide on project structure](https://docs.astro.build/en/basics/project-structure/).

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).
