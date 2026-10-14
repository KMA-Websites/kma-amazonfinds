/* =========================================================
   GOODGEAR GERMANY
   Global navigation + product search + filters
   ========================================================= */


/* =========================================================
   PRODUCT DATABASE
   ========================================================= */

const products = [

  {
    id: 1,
    category: "Tech & Gadgets",
    name: "Alex Tech Self-Locking Cable Sleeve",
    image:
      "https://m.media-amazon.com/images/I/71t6eXtVD6L._AC_SL1500_.jpg",
    description:
      "A self-locking braided sleeve for bundling and protecting cables, helping keep desk, PC and other cable setups more organised.",
    bestFor:
      "Cable management and tidier setups",
    status:
      "Personally tested — reviewed for practicality",
    productUrl:
      "https://link.amazon/B08qyJWbA",
    linkLabel: "View on Amazon",
    affiliate: true
  },

  {
    id: 2,
    category: "Tech & Gadgets",
    name: "Oksdown Reusable Cable Ties",
    image:
      "https://m.media-amazon.com/images/I/71kG9E4mpFL._AC_SL1401_.jpg",
    description:
      "Reusable nylon hook-and-loop cable ties for keeping USB, HDMI, Ethernet and other cables organised without cutting them.",
    bestFor:
      "Cable management, desks, PCs and home offices",
    status:
      "Personally tested — reviewed for practicality",
    productUrl:
      "https://link.amazon/B0gNC5eVQ",
    linkLabel: "View on Amazon",
    affiliate: true
  },

    {
    id: 4,
    category: "Tech & Gadgets",
    name: "Self-Adhesive Adjustable Cable Clips",
    image:
      "https://m.media-amazon.com/images/I/618DGvMBPOL._AC_SL1100_.jpg",
    description:
        "Self-adhesive adjustable cable clips for keeping charging cables, USB leads and other wires neatly organised at desks, workspaces and around the home.",
    bestFor:
        "Cable management and keeping loose wires organised",
    status:
        "Personally tested — reviewed for practicality",
    productUrl:
        "https://link.amazon/B03m8fOYW",
    linkLabel: "View on Amazon",
    affiliate: true
  },

  {
  id: 5,
  category: "Tech & Gadgets",
  name: "ARCTIC W1-3D Gas Spring Monitor Wall Mount",
  image: "https://www.arctic.de/media/97/c7/fb/1688120676/W13D_G00_new.png",
  description:
    "A gas-spring monitor wall mount designed to free up desk space while giving you flexible monitor positioning, with smooth rotation, swiveling and tilting.",
  bestFor:
    "Better monitor positioning and saving desk space",
  status:
    "Personally tested — reviewed for usability",
  productUrl:
    "https://www.arctic.de/en/W1-3D/AEMNT00032A",
  linkLabel: "View on ARCTIC",
  affiliate: false
  },

  {
    id: 6,
    category: "Tech & Gadgets",
    name: "Quntis Curved Monitor Lamp 51 cm RGB Backlight",
    image:
      "https://m.media-amazon.com/images/I/81Gx2h9WJAL._AC_SL1500_.jpg",
    description:
        "A monitor light bar for adding practical lighting to your desk setup without taking up extra desk space.",
    bestFor:
        "Reducing distracting glare and improving desk lighting for studying & gaming",
    status:
        "Personally tested — reviewed for practicality",
    productUrl:
        "https://link.amazon/B0gM5ZSpn",
    linkLabel: "View on Amazon",
    affiliate: true
  },
];


/* =========================================================
   GLOBAL ELEMENTS
   ========================================================= */

const headerSearch =
  document.getElementById("headerSearch");

const menuToggle =
  document.getElementById("menuToggle");

const mainNav =
  document.getElementById("mainNav");


/* =========================================================
   MOBILE MENU
   ========================================================= */

if (menuToggle && mainNav) {

  menuToggle.addEventListener(
    "click",
    () => {

      mainNav.classList.toggle("open");

    }
  );


  mainNav
    .querySelectorAll("a")
    .forEach(link => {

      link.addEventListener(
        "click",
        () => {
          mainNav.classList.remove("open");
        }
      );

    });

}


/* =========================================================
   HEADER SEARCH
   ========================================================= */

if (headerSearch) {

  headerSearch.addEventListener(
    "keydown",
    event => {

      if (event.key !== "Enter") {
        return;
      }

      const query =
        headerSearch.value.trim();


      if (!query) {
        return;
      }


      /*
       * If we're already on the homepage,
       * use the local product search.
       */

      const productSearch =
        document.getElementById("productSearch");


      if (productSearch) {

        productSearch.value = query;

        productSearch.dispatchEvent(
          new Event("input")
        );

        const productsSection =
          document.getElementById("products");

        if (productsSection) {

          productsSection.scrollIntoView({
            behavior: "smooth"
          });

        }

        return;
      }


      /*
       * Otherwise take the visitor
       * back to the product catalogue.
       */

      window.location.href =
        `index.html?search=${encodeURIComponent(query)}#products`;

    }
  );

}


/* =========================================================
   PRODUCT PAGE ELEMENTS
   ========================================================= */

const productGrid =
  document.getElementById("productGrid");

const productSearch =
  document.getElementById("productSearch");

const clearSearch =
  document.getElementById("clearSearch");

const resetSearch =
  document.getElementById("resetSearch");

const searchStatus =
  document.getElementById("searchStatus");

const noResults =
  document.getElementById("noResults");

const filters =
  document.querySelectorAll(".filter");


/*
 * If we're not on the homepage,
 * there is nothing else to initialise.
 */

if (productGrid) {

  let activeFilter = "all";
  let activeSearch = "";


  /* =======================================================
     RENDER
  ======================================================= */

  function renderProducts() {

    const query =
      activeSearch
        .trim()
        .toLowerCase();


    const filtered =
      products.filter(product => {

        const matchesCategory =
          activeFilter === "all" ||
          product.category === activeFilter;


        const searchableText = [
          product.name,
          product.category,
          product.description,
          product.bestFor
        ]
          .join(" ")
          .toLowerCase();


        const matchesSearch =
          !query ||
          searchableText.includes(query);


        return (
          matchesCategory &&
          matchesSearch
        );

      });


    productGrid.innerHTML = "";


    filtered.forEach(product => {

      const card =
        document.createElement("article");

      card.className =
        "product-card";


      card.innerHTML = `

        <div class="product-image">
          <img src="${product.image}" alt="${product.name}">
        </div>

        <div class="product-content">

          <div class="product-category">
            ${escapeHTML(product.category)}
          </div>

          <h3>
            ${escapeHTML(product.name)}
          </h3>

          <p class="product-card-description">
            ${escapeHTML(product.description)}
          </p>

          <div class="best-for">
            <strong>Best for:</strong>
            ${escapeHTML(product.bestFor)}
          </div>

          <div class="product-footer">

            <span class="research-status">
              ${escapeHTML(product.status)}
            </span>

           ${product.productUrl ? `
            <a
                href="${product.productUrl}"
                class="amazon-button"
                target="_blank"
                rel="noopener noreferrer"
            >
                ${product.linkLabel || "View product"}
            </a>
            ` : ""}

          </div>

          ${product.affiliate ? `
            <div class="affiliate-mini">
                Affiliate link
            </div>
            ` : ""}

        </div>

      `;


      productGrid.appendChild(card);

    });


    updateSearchStatus(
      filtered.length,
      query
    );

  }


  /* =======================================================
     SEARCH STATUS
  ======================================================= */

  function updateSearchStatus(
    count,
    query
  ) {

    if (!searchStatus) {
      return;
    }


    if (
      !query &&
      activeFilter === "all"
    ) {

      searchStatus.textContent =
        `Showing all ${products.length} products`;

      if (noResults) {
        noResults.classList.remove("visible");
      }

      return;
    }


    if (count === 0) {

      searchStatus.textContent =
        "No products match your search";

      if (noResults) {
        noResults.classList.add("visible");
      }

      return;
    }


    if (noResults) {
      noResults.classList.remove("visible");
    }


    let text =
      `Showing ${count} product`;

    if (count !== 1) {
      text += "s";
    }


    if (activeFilter !== "all") {

      text +=
        ` in ${activeFilter}`;

    }


    if (query) {

      text +=
        ` matching “${query}”`;

    }


    searchStatus.textContent =
      text;

  }


  /* =======================================================
     SEARCH FUNCTION
  ======================================================= */

  function performSearch(value) {

    activeSearch =
      value;

    if (productSearch) {

      productSearch.value =
        value;

    }

    if (headerSearch) {

      headerSearch.value =
        value;

    }

    renderProducts();

  }


  /* =======================================================
     PRODUCT SEARCH INPUT
  ======================================================= */

  if (productSearch) {

    productSearch.addEventListener(
      "input",
      event => {

        performSearch(
          event.target.value
        );

      }
    );

  }


  /* =======================================================
     CLEAR SEARCH
  ======================================================= */

  if (clearSearch) {

    clearSearch.addEventListener(
      "click",
      () => {

        performSearch("");

        productSearch.focus();

      }
    );

  }


  /* =======================================================
     RESET
  ======================================================= */

  if (resetSearch) {

    resetSearch.addEventListener(
      "click",
      () => {

        activeFilter =
          "all";

        filters.forEach(filter => {

          filter.classList.remove(
            "active"
          );

        });


        const allFilter =
          document.querySelector(
            '.filter[data-filter="all"]'
          );


        if (allFilter) {

          allFilter.classList.add(
            "active"
          );

        }


        performSearch("");

      }
    );

  }


  /* =======================================================
     FILTER BUTTONS
  ======================================================= */

  filters.forEach(filter => {

    filter.addEventListener(
      "click",
      () => {

        filters.forEach(item => {

          item.classList.remove(
            "active"
          );

        });


        filter.classList.add(
          "active"
        );


        activeFilter =
          filter.dataset.filter;


        renderProducts();

      }
    );

  });


  /* =======================================================
     URL PARAMETERS
  ======================================================= */

  const params =
    new URLSearchParams(
      window.location.search
    );


  const urlSearch =
    params.get("search");

  const urlCategory =
    params.get("category");


  if (urlSearch) {

    performSearch(
      urlSearch
    );

  }


  if (urlCategory) {

    const matchingFilter =
      document.querySelector(
        `.filter[data-filter="${CSS.escape(urlCategory)}"]`
      );


    if (matchingFilter) {

      filters.forEach(filter => {

        filter.classList.remove(
          "active"
        );

      });


      matchingFilter.classList.add(
        "active"
      );


      activeFilter =
        urlCategory;


      renderProducts();

    }

  }


  /* =======================================================
     INITIAL RENDER
  ======================================================= */

  renderProducts();

}


/* =========================================================
   HTML ESCAPING
========================================================= */

function escapeHTML(value) {

  return String(value)
    .replaceAll(
      "&",
      "&amp;"
    )
    .replaceAll(
      "<",
      "&lt;"
    )
    .replaceAll(
      ">",
      "&gt;"
    )
    .replaceAll(
      '"',
      "&quot;"
    )
    .replaceAll(
      "'",
      "&#039;"
    );

}