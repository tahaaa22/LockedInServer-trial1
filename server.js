const express = require("express");
const axios = require("axios");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const app = express();
const port = 3000;

// Swagger setup
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Simple Node.js API",
      version: "1.0.0",
      description: "A simple API that makes a GET request",
    },
  },
  apis: ["./server.js"],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

/**
 * @swagger
 * /fetch:
 *   get:
 *     summary: Fetch data from an external API
 *     description: Makes a GET request to a public API and returns the response.
 *     responses:
 *       200:
 *         description: Successful response
 *       500:
 *         description: Internal Server Error
 */
app.get("/fetch", async (req, res) => {
  try {
    const response = await axios.get("https://jsonplaceholder.typicode.com/posts/1");
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
  console.log(`Swagger UI available at http://localhost:${port}/api-docs`);
});
