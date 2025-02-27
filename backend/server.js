const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post("/calculate-metrics", (req, res) => {
    const { start, destination } = req.body;

    if (!start || !destination) {
        return res.status(400).json({ error: "Both locations are required" });
    }

    const lat1 = start.lat, lon1 = start.lng;
    const lat2 = destination.lat, lon2 = destination.lng;

    // Haversine formula for distance calculation
    const toRad = (deg) => (deg * Math.PI) / 180;
    const R = 6371;
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;

    // Dummy area calculation
    const area = Math.abs(lat1 - lat2) * Math.abs(lon1 - lon2);

    res.json({ area, distance });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
