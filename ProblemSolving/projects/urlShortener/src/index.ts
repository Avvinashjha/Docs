import express, {Request, Response} from "express";
import { UrlService } from "./services/urlService";

const app = express();

const port = process.env.PORT || 5050;

// Middle ware
app.use(express.json());

app.get("/tiny", async (req: Request, res: Response) => {
  const url = req.query.url;

  // Validate query param
  if (!url || typeof url !== "string") {
    return res.status(400).json({ error: "Missing or invalid ?url parameter" });
  }

  try {
    const code = await UrlService.shortUrl(url); // now returns short code
    const shortUrl = `${req.protocol}://${req.get("host")}/tiny/${code}`;
    return res.json({ shortUrl });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/tiny/:code", async (req: Request, res: Response) => {
  const code = req.params.code;

  const actualUrl = await UrlService.getActualUrl(code);

  if (!actualUrl) {
    return res.status(404).send("Short URL not found");
  }

  return res.redirect(302, actualUrl);
});


app.listen(port, ()=>{
    console.log(`App is running on http://localhost:${port}`);
    
})

