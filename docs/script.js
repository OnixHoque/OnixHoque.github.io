  function createBreadcrumb(slug, maxTitleLength = 50, slugTitle='') {
    const urlPath = window.location.pathname;

    if (new RegExp(`^\/${slug}\/(?!index\\.html$|$)`).test(urlPath)) {
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

      let final_slugTitle = slugTitle == '' ? slug.charAt(0).toUpperCase() + slug.slice(1) : slugTitle;

      breadcrumbDiv.innerHTML = `
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="/">Home</a></li>
            <li class="breadcrumb-item"><a href="/${slug}">${final_slugTitle}</a></li>
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

// New function for category notice
function createCategoryNotice(holder) {
    // Match the listing page: exactly /holder or /holder/ or /holder/index.html
    const pathRegex = new RegExp(`^/${holder}(?:/|/index\\.html)?$`);
    if (pathRegex.test(window.location.pathname)) {
      const hash = window.location.hash;

      document.getElementById('category-notice')?.remove();

      if (hash.startsWith('#category=')) {
        const catEncoded = hash.substring(10); // everything after '#category='
        const cat = decodeURIComponent(catEncoded).trim();

        if (cat) {
          // Create the notice paragraph
          const noticeP = document.createElement('p');
          noticeP.id = 'category-notice';
          noticeP.classList.add('category-notice');
          noticeP.innerHTML = `Showing <strong>${cat}</strong> related entries only — <a href="/${holder}">see all</a>`;

          // Insert below the title block (or wherever makes sense in your layout)
          const titleBlock = document.querySelector('#title-block-header');
          if (titleBlock && titleBlock.parentNode) {
            titleBlock.parentNode.insertBefore(noticeP, titleBlock.nextSibling);
          } else {
            // Fallback: insert after the main content or at the top of the page
            const main = document.querySelector('main') || document.body;
            main.insertBefore(noticeP, main.firstChild);
          }
        }
      }
    }
  }

document.addEventListener("DOMContentLoaded", function() {

  // Call the function with your slug and optional title length limit
  const charLimit = 50;
  createBreadcrumb('blog', charLimit);
  createBreadcrumb('research', charLimit);
  createBreadcrumb('leetgpu', charLimit, 'LeetGPU');
  
  createCategoryNotice('blog');
  createCategoryNotice('news');
  createCategoryNotice('software');
  let currentUrl = window.location.href;
  setInterval(function() {
    if (window.location.href !== currentUrl) {
      currentUrl = window.location.href;
      createCategoryNotice('blog');
      createCategoryNotice('news');
      createCategoryNotice('software');
    }
  }, 100);
});