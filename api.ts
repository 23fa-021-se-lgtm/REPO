
import express, { Request, Response } from "express";
import cors from "cors";

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(cors());
app.use(express.json());

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  emoji: string;
};

const products: Product[] = [
  {
    id: 1,
    name: "Rose Romance",
    description: "12 premium red roses",
    price: 35,
    emoji: "🌹",
  },
  {
    id: 2,
    name: "Spring Tulips",
    description: "Beautiful colorful tulips",
    price: 29,
    emoji: "🌷",
  },
  {
    id: 3,
    name: "Lovely Bouquet",
    description: "Mixed seasonal flowers",
    price: 45,
    emoji: "💐",
  },
  {
    id: 4,
    name: "Sunny Day",
    description: "Bright yellow sunflowers",
    price: 32,
    emoji: "🌻",
  },
];

const subscribers = new Set<string>();

app.get("/", (_req: Request, res: Response) => {
  res.json({
    message: "Bloom & Petal API is running 🌸",
    endpoints: ["/api/products", "/api/products/:id", "/api/subscribe"],
  });
});

app.get("/api/products", (_req: Request, res: Response) => {
  res.json(products);
});

app.get("/api/products/:id", (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const product = products.find((item) => item.id === id);

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  res.json(product);
});

app.post("/api/subscribe", (req: Request, res: Response) => {
  const email = String(req.body?.email ?? "").trim();

  if (!email || !email.includes("@")) {
    return res.status(400).json({
      message: "Please enter a valid email address.",
    });
  }

  subscribers.add(email.toLowerCase());

  res.status(201).json({
    message: "Thank you for subscribing! 🌷",
  });
});

app.listen(PORT, () => {
  console.log(`Bloom & Petal API running at http://localhost:${PORT}`);
});
