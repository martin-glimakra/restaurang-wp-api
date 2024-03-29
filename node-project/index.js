const express = require('express')
const app = express()
const port = 4000
var cors = require('cors')
const bodyParser = require('body-parser')
const WooCommerceRestApi = require("@woocommerce/woocommerce-rest-api").default;

const api = new WooCommerceRestApi({
    url: "https://www.xn--webbutvecklare-glimkra-65b.se/",
    consumerKey: "ck_dd9a4857d77b339996d0ab2bcda0873bffc8d196",
    consumerSecret: "cs_a89be7b92db9e21b1ea3bbf841e91a043d5bb2f5",
    version: "wc/v3"
  });


app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())



let data = {
  payment_method: "bacs",
  payment_method_title: "Direct Bank Transfer",
  set_paid: true,
  billing: {
    first_name: "John",
    last_name: "Doe",
    address_1: "969 Market",
    address_2: "",
    city: "San Francisco",
    state: "CA",
    postcode: "94103",
    country: "US",
    email: "john.doe@example.com",
    phone: "(555) 555-5555"
  },
  shipping: {
    first_name: "John",
    last_name: "Doe",
    address_1: "969 Market",
    address_2: "",
    city: "San Francisco",
    state: "CA",
    postcode: "94103",
    country: "US"
  },
  line_items: [
    {
      product_id: 93,
      quantity: 2
    },
    {
      product_id: 22,
      variation_id: 23,
      quantity: 1
    }
  ],
  shipping_lines: [
    {
      method_id: "flat_rate",
      method_title: "Flat Rate",
      total: "10.00"
    }
  ]
};

app.post('/post', (req, res) => {
  console.log(req.body.name)
  data.billing.first_name = req.body.name
  api.post("orders", data)
  .then((response) => {
    console.log(response.data);
  })
  .catch((error) => {
    console.log(error.response.data);
  });
})




app.get('/', (req, res) => {
//   res.send('Hello World!')
  api.get("products", {
    per_page: 20, // 20 products per page
  })
    .then((response) => {
      // Successful request
    //   console.log("Response Status:", response.status);
    //   console.log("Response Headers:", response.headers);
    //   console.log("Response Data:", response.data);
    //   console.log("Total of pages:", response.headers['x-wp-totalpages']);
    //   console.log("Total of items:", response.headers['x-wp-total']);
      res.json(response.data)
    //   res.json({hello: response.data[0]})
    // res.json({hello: response.headers})
    // res.json({hello: response.headers})

    })
    .catch((error) => {
      // Invalid request, for 4xx and 5xx statuses
    //   console.log("Response Status:", error.response.status);
    //   console.log("Response Headers:", error.response.headers);
    //   console.log("Response Data:", error.response.data);
    console.log('catch', error);
    })
    .finally(() => {
      // Always executed.
    });
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})




// // List products
// api.get("products", {
//   per_page: 20, // 20 products per page
// })
//   .then((response) => {
//     // Successful request
//     console.log("Response Status:", response.status);
//     console.log("Response Headers:", response.headers);
//     console.log("Response Data:", response.data);
//     console.log("Total of pages:", response.headers['x-wp-totalpages']);
//     console.log("Total of items:", response.headers['x-wp-total']);
//   })
//   .catch((error) => {
//     // Invalid request, for 4xx and 5xx statuses
//     console.log("Response Status:", error.response.status);
//     console.log("Response Headers:", error.response.headers);
//     console.log("Response Data:", error.response.data);
//   })
//   .finally(() => {
//     // Always executed.
//   });

// // Create a product
// api.post("products", {
//   name: "Premium Quality", // See more in https://woocommerce.github.io/woocommerce-rest-api-docs/#product-properties
//   type: "simple",
//   regular_price: "21.99",
// })
//   .then((response) => {
//     // Successful request
//     console.log("Response Status:", response.status);
//     console.log("Response Headers:", response.headers);
//     console.log("Response Data:", response.data);
//   })
//   .catch((error) => {
//     // Invalid request, for 4xx and 5xx statuses
//     console.log("Response Status:", error.response.status);
//     console.log("Response Headers:", error.response.headers);
//     console.log("Response Data:", error.response.data);
//   })
//   .finally(() => {
//     // Always executed.
//   });

// // Edit a product
// api.put("products/1", {
//   sale_price: "11.99", // See more in https://woocommerce.github.io/woocommerce-rest-api-docs/#product-properties
// })
//   .then((response) => {
//     // Successful request
//     console.log("Response Status:", response.status);
//     console.log("Response Headers:", response.headers);
//     console.log("Response Data:", response.data);
//   })
//   .catch((error) => {
//     // Invalid request, for 4xx and 5xx statuses
//     console.log("Response Status:", error.response.status);
//     console.log("Response Headers:", error.response.headers);
//     console.log("Response Data:", error.response.data);
//   })
//   .finally(() => {
//     // Always executed.
//   });

// // Delete a product
// api.delete("products/1", {
//   force: true, // Forces to delete instead of move to the Trash
// })
//   .then((response) => {
//     // Successful request
//     console.log("Response Status:", response.status);
//     console.log("Response Headers:", response.headers);
//     console.log("Response Data:", response.data);
//   })
//   .catch((error) => {
//     // Invalid request, for 4xx and 5xx statuses
//     console.log("Response Status:", error.response.status);
//     console.log("Response Headers:", error.response.headers);
//     console.log("Response Data:", error.response.data);
//   })
//   .finally(() => {
//     // Always executed.
//   });

