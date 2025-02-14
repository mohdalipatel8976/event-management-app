const express = require("express");
const { connectMongoDB } = require("./config/db-config");
const cookieParser = require("cookie-parser");
const app = express();
require("dotenv").config();

connectMongoDB();

app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/users", require("./routes/users-route"));
app.use("/api/events", require("./routes/events-route"));
app.use("/api/stripe_client_secret", require("./routes/stripe_client_secret")); 
app.use("/api/orders", require("./routes/orders-route"));
app.use("/api/bookings", require("./routes/bookings-route"));


const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Node+Express Server is running on port ${port}`);
});
