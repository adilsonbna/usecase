const express = require('express');
const path = require('path');
const client = require('prom-client');
const winston = require('winston');

const app = express();
const PORT = 3000;

// Configure Winston logger
const logger = winston.createLogger({
    level: 'info', // Logging level (info, error, warn, etc.)
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json() // Log output in JSON format
    ),
    transports: [
        new winston.transports.Console(), // Log to console
        new winston.transports.File({ filename: 'logs/app.log' }) // Log to file
    ]
});

// Initialize Prometheus registry
const register = new client.Registry();

// Define the metrics
const totalRequests = new client.Counter({
    name: 'total_requests',
    help: 'Total number of requests made to the POS system'
});

const totalSales = new client.Counter({
    name: 'total_sales',
    help: 'Total number of sales transactions in the POS system',
    labelNames: ['currency']
});

const totalSalesValue = new client.Counter({
    name: 'total_sales_value',
    help: 'Total monetary value of sales in the POS system (in USD)',
});

const itemsSold = new client.Counter({
    name: 'items_sold',
    help: 'Total number of items sold in the POS system'
});

// Register metrics
register.registerMetric(totalRequests);
register.registerMetric(totalSales);
register.registerMetric(totalSalesValue);
register.registerMetric(itemsSold);

// Middleware to log requests and count them
app.use((req, res, next) => {
    logger.info(`Request: ${req.method} ${req.url}`);
    totalRequests.inc(); // Increment the request counter
    next();
});

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Set views folder and template engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

// Serve the homepage
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// Expose /metrics endpoint for Prometheus
app.get('/metrics', async (req, res) => {
    logger.info('Metrics endpoint accessed');
    res.set('Content-Type', register.contentType);
    res.end(await register.metrics());
});

// Endpoint to simulate sales transactions
app.post('/sale', (req, res) => {
    const amount = Math.random() * 100; // Simulate a random sale amount (between 0 and 100 USD)
    const items = Math.floor(Math.random() * 5) + 1; // Simulate a random number of items sold (1 to 5)

    totalSales.inc({ currency: 'USD' }, 1); // Increment the sales counter by 1
    totalSalesValue.inc(amount); // Increment the total sales value counter
    itemsSold.inc(items); // Increment the items sold counter

    logger.info(`Sale recorded: $${amount.toFixed(2)} for ${items} items`);
    res.send(`Sale recorded: $${amount.toFixed(2)} for ${items} items.`);
});

// Start the server
app.listen(PORT, () => {
    logger.info(`POS system running at http://localhost:${PORT}`);
});
