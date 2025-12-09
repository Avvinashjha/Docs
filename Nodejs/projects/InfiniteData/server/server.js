import express from "express";
import fs from "fs";
import cors from "cors";

const app = express();
const PORT = 5050;

// Enable cors
app.use(cors())

// Read and parse the JSON data
const rawData = fs.readFileSync("MOCK_DATA.json", "utf8");
const data = JSON.parse(rawData);

app.get("/data", (req, res) => {
    try {
        // Get query parameters (not params - params are for route parameters like /data/:id)
        const limit = parseInt(req.query.limit) || 10; // default to 10 items per page
        const offset = parseInt(req.query.offset) || 0; // default to start from beginning
        
        // Validate parameters
        if (limit < 1 || offset < 0) {
            return res.status(400).json({
                error: "Invalid parameters: limit must be >= 1 and offset must be >= 0"
            });
        }

        // Calculate pagination
        const startIndex = offset;
        const endIndex = Math.min(offset + limit, data.length);
        
        // Get paginated data
        const paginatedData = data.slice(startIndex, endIndex);
        
        // Return response with pagination info
        res.json({
            data: paginatedData,
            pagination: {
                total: data.length,
                limit: limit,
                offset: offset,
                hasNext: endIndex < data.length,
                hasPrev: offset > 0,
                nextOffset: endIndex < data.length ? endIndex : null,
                prevOffset: offset > 0 ? Math.max(0, offset - limit) : null
            }
        });
        
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});