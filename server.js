const express = require("express");
const app = express();
const port = 3010;

// Data parsing:
const { filterPatients } = require("./filterPatients");

// Routes:
app.get("/", (request, response) => response.send("Hello from Express server"));
app.get("/patients", (request, response) => {
	// lol I basically revert to url.
	// request.query => {key: value} | object.entries => [[key, value]] | map => 'key=value'
    const params = Object.entries(request.query).map(([key, value]) => `${key}=${value}`);
    response.send(filterPatients(...params));
});
app.listen(port, () => console.log(`Listening on ${port}`));
