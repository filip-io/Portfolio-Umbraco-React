# ​​Dynamic Portfolio v3

## Intro

This project is a refactored version of my portfolio site.
It now serves as the **frontend** and consumes content from **Umbraco’s Headless CMS** via the **Umbraco Content Delivery API**.

---

<!-- Tech Stack Banner -->
<p align="center">
<img src="/github_repo_assets/react.webp" alt="React Logo" width="20%"><img src="/github_repo_assets/dotnet.webp" alt="Umbraco Logo" width="20%"><img src="/github_repo_assets/umbraco.webp" alt="Umbraco Logo" width="20%">
</p>

---

## ​🌐 Live Demo

🔗 [Portfolio Website](https://filip-io.github.io/Portfolio-Umbraco-React/)

---

## 🛠️ Tech Stack  

### Frontend  
- **Framework:** [React 18](https://react.dev/)  
- **Build Tool:** [Vite](https://vitejs.dev/)  
- **Routing:** [React Router v6](https://reactrouter.com/)  
- **Styling / Icons:** [Devicon](https://devicon.dev/)  
- **Deployment:** [GitHub Pages](https://pages.github.com/)  

### Backend  
- **Platform:** [ASP.NET Core (.NET 9)](https://dotnet.microsoft.com/)  
- **CMS:** [Umbraco CMS 16](https://umbraco.com/)  
- **Headless API:** Umbraco Content Delivery API  
- **Storage:** Azure Blob Storage (for media + ImageSharp caching)  
- **Configuration:**  
  - Wide-open **CORS** for local development  
  - Restricted **CORS** for production (only GitHub Pages origin)  
- **Packages:**  
  - `Umbraco.Cms` (core CMS)  
  - `Umbraco.StorageProviders.AzureBlob` (media storage)  
  - `Umbraco.StorageProviders.AzureBlob.ImageSharp` (image cache)  
  - `uSync` (configuration & content sync)  

---


## 🐣 Easter Egg Clues 🐇  

- Click on the author of the portfolio.  
- Type the name of *The One* on the **Home** screen.