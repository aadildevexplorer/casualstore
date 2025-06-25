// for register

export const registerFormControls = [
  {
    name: "userName",
    label: "User Name",
    placeholder: "Enter Your user Name",
    componentType: "input",
    type: "text",
  },

  {
    name: "email",
    label: "Email",
    placeholder: "Enter You Email",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter Your Password",
    componentType: "input",
    type: "password",
  },
];

// for login

export const loginFormControls = [
  {
    name: "email",
    label: "Email",
    placeholder: "Enter You Email",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter Your Password",
    componentType: "input",
    type: "password",
  },
];

// new products

export const addProductFormElements = [
  {
    label: "Title",
    name: "title",
    componentType: "input",
    type: "text",
    placeholder: "Enter product title",
  },
  {
    label: "Description",
    name: "description",
    componentType: "textarea",
    placeholder: "Enter product description",
  },
  {
    label: "Category",
    name: "category",
    componentType: "select",
    options: [
      { id: "men", label: "Men" },
      { id: "women", label: "Women" },
      { id: "kids", label: "Kids" },
      { id: "accessories", label: "Accessories" },
      { id: "footwear", label: "Footwear" },
    ],
  },
  {
    label: "Brand",
    name: "brand",
    componentType: "select",
    options: [
      // for men cloth
      { id: "nike", label: "Nike" },
      { id: "adidas", label: "Adidas" },
      { id: "puma", label: "Puma" },
      { id: "levis", label: "Levi's" },
      { id: "hm", label: "H&M" },
      { id: "jackjones", label: "Jack & Jones" },
      { id: "uspa", label: "U.S. Polo Assn." },
      { id: "peterengland", label: "Peter England" },
      { id: "vanheusen", label: "Van Heusen" },
      { id: "raymond", label: "Raymond" },
      { id: "allen_solly", label: "Allen Solly" },

      // for watch
      { id: "rolex", label: "Rolex" },
      { id: "fossil", label: "Fossil" },
      { id: "titan", label: "Titan" },
      { id: "casio", label: "Casio" },
      { id: "seiko", label: "Seiko" },
      { id: "citizen", label: "Citizen" },
      { id: "tommyhilfiger", label: "Tommy Hilfiger" },
      { id: "timex", label: "Timex" },
      { id: "tagheuer", label: "Tag Heuer" },
      { id: "danielwellington", label: "Daniel Wellington" },

      // for shoes
      { id: "reebok", label: "Reebok" },
      { id: "skechers", label: "Skechers" },
      { id: "newbalance", label: "New Balance" },
      { id: "underarmour", label: "Under Armour" },
      { id: "woodland", label: "Woodland" },
      { id: "bata", label: "Bata" },
      { id: "redtape", label: "Red Tape" },

      // for women cloth
      { id: "zara", label: "Zara" },
      { id: "hm", label: "H&M" },
      { id: "mango", label: "Mango" },
      { id: "forever21", label: "Forever 21" },
      { id: "biba", label: "Biba" },
      { id: "w", label: "W for Woman" },
      { id: "globaldesi", label: "Global Desi" },
      { id: "fabindia", label: "FabIndia" },
      { id: "nykaa", label: "Nykaa Fashion" },
      { id: "libas", label: "Libas" },
    ],
  },
  {
    label: "Price",
    name: "price",
    componentType: "input",
    type: "number",
    placeholder: "Enter product price",
  },
  {
    label: "Sale Price",
    name: "salePrice",
    componentType: "input",
    type: "number",
    placeholder: "Enter sale price (optional)",
  },
  {
    label: "Total Stock",
    name: "totalStock",
    componentType: "input",
    type: "number",
    placeholder: "Enter total stock",
  },
];

// for shopping view

export const ShoppingViewHeaderMenuItems = [
  {
    id: "home",
    label: "Home",
    path: "/shop/home",
  },

  {
    id: "products",
    label: "Products",
    path: "/shop/listing",
  },
  {
    id: "men",
    label: "Men",
    path: "/shop/listing",
  },

  {
    id: "women",
    label: "Women",
    path: "/shop/listing",
  },

  {
    id: "kids",
    label: "Kids",
    path: "/shop/listing",
  },

  {
    id: "footwear",
    label: "Footwear",
    path: "/shop/listing",
  },

  {
    id: "accessories",
    label: "Accessories",
    path: "/shop/listing",
  },

  {
    id: "search",
    label: "Search",
    path: "/shop/search",
  },
];

// for filter

export const categoryOptionsMap = {
  men: "Men",
  women: "Women",
  kids: "Kids",
  accessories: "Accessories",
  footwear: "Footwear",
};

export const brandOptionsMap = {
  // men clothing
  nike: "Nike",
  adidas: "Adidas",
  puma: "Puma",
  levis: "Levi's",
  zara: "Zara",
  "h&m": "H&M",
  jackjones: "Jack & Jones",
  uspa: "U.S. Polo Assn.",
  tommyhilfiger: "Tommy Hilfiger",
  peterengland: "Peter England",
  vanheusen: "Van Heusen",
  raymond: "Raymond",
  allen_solly: "Allen Solly",

  // watches
  rolex: "Rolex",
  fossil: "Fossil",
  titan: "Titan",
  casio: "Casio",
  seiko: "Seiko",
  citizen: "Citizen",
  timex: "Timex",
  tagheuer: "Tag Heuer",
  danielwellington: "Daniel Wellington",

  // shoes
  reebok: "Reebok",
  skechers: "Skechers",
  newbalance: "New Balance",
  underarmour: "Under Armour",
  woodland: "Woodland",
  bata: "Bata",
  redtape: "Red Tape",

  // women clothing
  mango: "Mango",
  forever21: "Forever 21",
  biba: "Biba",
  w: "W for Woman",
  globaldesi: "Global Desi",
  fabindia: "FabIndia",
  nykaa: "Nykaa Fashion",
  libas: "Libas",
};

export const filterOptions = {
  category: [
    { id: "men", label: "Men" },
    { id: "women", label: "Women" },
    { id: "kids", label: "Kids" },
    { id: "accessories", label: "Accessories" },
    { id: "footwear", label: "Footwear" },
  ],
  brand: [
    // for men cloth
    { id: "nike", label: "Nike" },
    { id: "adidas", label: "Adidas" },
    { id: "puma", label: "Puma" },
    { id: "levis", label: "Levi's" },
    { id: "zara", label: "Zara" },
    { id: "hm", label: "H&M" },
    { id: "jackjones", label: "Jack & Jones" },
    { id: "uspa", label: "U.S. Polo Assn." },
    { id: "peterengland", label: "Peter England" },
    { id: "vanheusen", label: "Van Heusen" },
    { id: "raymond", label: "Raymond" },
    { id: "allen_solly", label: "Allen Solly" },

    // for watch
    { id: "rolex", label: "Rolex" },
    { id: "fossil", label: "Fossil" },
    { id: "titan", label: "Titan" },
    { id: "casio", label: "Casio" },
    { id: "seiko", label: "Seiko" },
    { id: "citizen", label: "Citizen" },
    { id: "tommyhilfiger", label: "Tommy Hilfiger" },
    { id: "timex", label: "Timex" },
    { id: "tagheuer", label: "Tag Heuer" },
    { id: "danielwellington", label: "Daniel Wellington" },

    // for shoes
    { id: "puma", label: "Puma" },
    { id: "reebok", label: "Reebok" },
    { id: "skechers", label: "Skechers" },
    { id: "newbalance", label: "New Balance" },
    { id: "underarmour", label: "Under Armour" },
    { id: "woodland", label: "Woodland" },
    { id: "bata", label: "Bata" },
    { id: "redtape", label: "Red Tape" },

    // for women cloth
    { id: "zara", label: "Zara" },
    { id: "mango", label: "Mango" },
    { id: "forever21", label: "Forever 21" },
    { id: "biba", label: "Biba" },
    { id: "w", label: "W for Woman" },
    { id: "globaldesi", label: "Global Desi" },
    { id: "fabindia", label: "FabIndia" },
    { id: "nykaa", label: "Nykaa Fashion" },
    { id: "libas", label: "Libas" },
  ],
};

export const sortOptions = [
  { id: "price-lowtohigh", label: "Price: Low to High" },
  { id: "price-hightolow", label: "Price: High to Low" },
  { id: "title-atoz", label: "Title: A to Z" },
  { id: "title-ztoa", label: "Title: Z to A" },
];

// for address

export const addressFormControls = [
  {
    label: "Address",
    name: "address",
    componentType: "input",
    type: "text",
    placeholder: "Enter your address",
  },
  {
    label: "City",
    name: "city",
    componentType: "input",
    type: "text",
    placeholder: "Enter your city",
  },
  {
    label: "Pincode",
    name: "pincode",
    componentType: "input",
    type: "text",
    placeholder: "Enter your pincode",
  },
  {
    label: "Phone",
    name: "phone",
    componentType: "input",
    type: "text",
    placeholder: "Enter your phone number",
  },
  {
    label: "Notes",
    name: "notes",
    componentType: "textarea",
    placeholder: "Enter any additional notes",
  },
];
