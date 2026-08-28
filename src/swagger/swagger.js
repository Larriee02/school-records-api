import swaggerJSDoc from "swagger-jsdoc"
import schemas from "./schemas/index.js";

const options = {
    definition: {
        openapi: "3.0.3",

        info: {
            title: "School Record Management API",
            version: "1.0.0",
            description:
                "REST API for managing students, teachers, classes, subjects, attendance and academic results."
         },

        servers: [
            {
                url: "http://localhost:3000",
                description: "Local development"
            },
            {
                url: "https://school-records-api-production.up.railway.app",
                description: "Production server"
            }
        ],

        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT"
                }
            },

            schemas
        },
        
        security: [
            {
                bearerAuth: []
            }
        ]
    },

    apis: ["./src/routes/*.js"]
}

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;