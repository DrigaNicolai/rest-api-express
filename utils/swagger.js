const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "REST API Express Docs",
      version: "0.1",
      description: 'API documentation using Swagger and Express',
    },
    servers: [
      {
        url: "http://localhost:3001",
        description: "Local development"
      }
    ],
    tags: [
      { name: "Auth" },
      { name: "Warning Types" },
      { name: "Tags" },
      { name: "Posts" }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: []
      }
    ]
  },
  apis: ["./api/routes/*.js", "./database/models/*.js", "./api/schemas/*.yaml"],
}

const swaggerSpec = swaggerJSDoc(options);

const swaggerDocs = (app) => {
  app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec, { swaggerOptions: { defaultModelsExpandDepth: -1 } }))

  app.get("/api/docs", (req, res) => {
    res.send(`
      <script>
        document.addEventListener("DOMContentLoaded", function() {
          var schemasBlock = document.querySelector(".opblock-tag[data-tag-id='#/Schemas']");
          if (schemasBlock) {
            schemasBlock.style.display = "none";
          }
        });
      </script>
    `);
  });
}

module.exports = swaggerDocs;
