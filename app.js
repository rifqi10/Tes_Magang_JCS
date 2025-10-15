import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

// route utama
app.get("/", async (req, res) => {
    try {
        const response = await fetch("https://randomuser.me/api/");
        const data = await response.json();
        const user = data.results[0];
        res.render("profilePage", { user });
    } catch (error) {
        console.error("Error saat ambil data:", error);
        res.send("Terjadi kesalahan saat mengambil data user!");
    }
});


app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
