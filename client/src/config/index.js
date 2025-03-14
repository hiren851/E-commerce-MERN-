export const registerFormControls = [
    {
        name : 'userName',
        label : "User Name",
        placeholder : 'Enter your use name',
        componentType: "input",
        type : "text",
    },
    {
        name : 'email',
        label : "Email",
        placeholder : 'Enter your email',
        componentType: "input",
        type : "email",
    },
    {
        name : 'password',
        label : "Password",
        placeholder : 'Enter your password',
        componentType: "input",
        type : "password",
    }
]

export const loginFormControls = [
    {
        name : 'email',
        label : "Email",
        placeholder : 'Enter your email',
        componentType: "input",
        type : "email",
    },
    {
        name : 'password',
        label : "Password",
        placeholder : 'Enter your password',
        componentType: "input",
        type : "password",
    }
]



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
      placeholder: 'Select Category  ',
      options: [
        { id: "men", label: "Men" },
        { id: "women", label: "Women" },
        { id: "kids", label: "Kids" },
        { id: "accessories", label: "Accessories" },
        { id: "footwear", label: "Footwear" },
        { id: "mobile", label: "Mobile Phones" },
      ],
    },
    {
      label: "Brand",
      name: "brand",
      componentType: "select",
      placeholder: 'Select Brand',
      options: [
        { id: "nike", label: "Nike" },
        { id: "adidas", label: "Adidas" },
        { id: "puma", label: "Puma" },
        { id: "levi", label: "Levi's" },
        { id: "zara", label: "Zara" },
        { id: "h&m", label: "H&M" },
        { id: "samsung", label: "Samsung" },
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



  export const shoppingViewHeaderMenuItems = [
    {
      id: 'home',
      label : 'Home',
      path : '/shop/home'
    },
    {
      id: 'product',
      label : 'Product',
      path : '/shop/listing'
    },
    
    {
      id: 'men',
      label : 'Men',
      path : '/shop/listing'
    },
    {
      id: 'women',
      label : 'Women',
      path : '/shop/listing'
    },
    {
      id: 'kids',
      label : 'Kids',
      path : '/shop/listing'
    },
    // {
    //   id: 'watch',
    //   label : 'Watch',
    //   path : '/shop/listing'
    // },
    {
      id: 'footwear',
      label : 'Footwear',
      path : '/shop/listing'
    },
    {
      id: 'accessories',
      label : 'Accessories',
      path : '/shop/listing'
    },
    {
      id: 'mobile',
      label : 'Mobile Phones',
      path : '/shop/listing'
    },
    {
      id: 'search',
      label : 'Search',
      path : '/shop/search'
    },
  ]

  export const categoryOptionsMap = {
    men: "Men",
    women: "Women",
    kids: "Kids",
    accessories: "Accessories",
    footwear: "Footwear",
    mobile: "Mobile",
  };
  
  export const brandOptionsMap = {
    nike: "Nike",
    adidas: "Adidas",
    puma: "Puma",
    levi: "Levi",
    zara: "Zara",
    "h&m": "H&M",
    mobile: "H&M",
  };
  
  export const filterOptions = {
    category: [
      { id: "men", label: "Men" },
      { id: "women", label: "Women" },
      { id: "kids", label: "Kids" },
      { id: "accessories", label: "Accessories" },
      { id: "footwear", label: "Footwear" },
      { id: "mobile", label: "Mobile" },
    ],
    brand: [
      { id: "nike", label: "Nike" },
      { id: "adidas", label: "Adidas" },
      { id: "puma", label: "Puma" },
      { id: "levi", label: "Levi's" },
      { id: "zara", label: "Zara" },
      { id: "h&m", label: "H&M" },
      { id: "samsung", label: "Samsung" },
    ],
  };
  
  export const sortOptions = [
    { id: "price-lowtohigh", label: "Price: Low to High" },
    { id: "price-hightolow", label: "Price: High to Low" },
    { id: "title-atoz", label: "Title: A to Z" },
    { id: "title-ztoa", label: "Title: Z to A" },
  ];

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
      label: "State",
      name: "state",
      componentType: "input",
      type: "text",
      placeholder: "Enter your state",
    },
    {
      label: "Country",
      name: "country",
      componentType: "input",
      type: "text",
      placeholder: "Enter your country",
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