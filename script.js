document.addEventListener("DOMContentLoaded", function() {
  function createBreadcrumb(slug, maxTitleLength = 50) {
    const urlPath = window.location.pathname;

    if (new RegExp(`^\/${slug}\/(?!$)`).test(urlPath)) {
      // Find the <h1> element with the class "title"
      const titleElement = document.querySelector("#title-block-header .quarto-title h1.title");

      // Get the title from the <h1> element
      let pageTitle = titleElement ? titleElement.textContent : document.title;

      // Truncate the title if it's too long
      if (pageTitle.length > maxTitleLength) {
        pageTitle = pageTitle.substring(0, maxTitleLength) + '...';
      }

      // Create the breadcrumb HTML
      const breadcrumbDiv = document.createElement("div");
      breadcrumbDiv.id = "breadcrumb-container";
      breadcrumbDiv.classList.add("breadcrumb-container");  // Optional: Add a class for styling

      breadcrumbDiv.innerHTML = `
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="/">Home</a></li>
            <li class="breadcrumb-item"><a href="/${slug}">${slug.charAt(0).toUpperCase() + slug.slice(1)}</a></li>
            <li class="breadcrumb-item active" aria-current="page">${pageTitle}</li>
          </ol>
        </nav>
      `;

      // Find the header block where we want to insert the breadcrumb (above the h1 title)
      const titleBlockHeader = document.querySelector("#title-block-header .quarto-title");

      if (titleBlockHeader) {
        // Insert the breadcrumb above the title
        titleBlockHeader.insertBefore(breadcrumbDiv, titleBlockHeader.firstChild);
      }
    }
  }

  // Call the function with your slug and optional title length limit
  const charLimit = 50;
  createBreadcrumb('blog', charLimit);
  // You can call it with other slugs and title length as needed
  createBreadcrumb('research', charLimit);
});