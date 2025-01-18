const express = require('express');
const path = require('path');
const client = require('prom-client');

const app = express();
const PORT = 3000;

// Initialize Prometheus registry
const register = new client.Registry();

// Define the metrics
const totalRequests = new client.Counter({
    name: 'total_requests',
    help: 'Total number of requests made to the POS system'
});

const totalSales = new client.Counter({
    name: 'total_sales',
    help: 'Total sales amount in the POS system (cumulative sales value)',
    labelNames: ['currency']
});

const totalSalesValue = new client.Counter({
    name: 'total_sales_value',
    help: 'Total value of sales in the POS system (total sales in USD)'
});

const itemsSold = new client.Counter({
    name: 'items_sold',
    help: 'Total number of items sold in the POS system'
});

const activeUsers = new client.Gauge({
    name: 'active_users',
    help: 'Number of active users currently using the POS system'
});

const httpRequestDuration = new client.Histogram({
    name: 'http_request_duration_seconds',
    help: 'Histogram of HTTP request durations in seconds',
    labelNames: ['method', 'route', 'status_code']
});

const errorCount = new client.Counter({
    name: 'error_count',
    help: 'Number of errors in the POS system',
    labelNames: ['type']
});

// Register metrics
register.registerMetric(totalRequests);
register.registerMetric(totalSales);
register.registerMetric(totalSalesValue);
register.registerMetric(itemsSold);
register.registerMetric(activeUsers);
register.registerMetric(httpRequestDuration);
register.registerMetric(errorCount);

// Set the default registry
client.collectDefaultMetrics({ register });

// Middleware to track active users
let users = 0;
app.use((req, res, next) => {
    users++;
    activeUsers.set(users);

    const end = httpRequestDuration.startTimer(); // Start timing the request
    res.on('finish', () => {
        end({ method: req.method, route: req.path, status_code: res.statusCode });
        users--;
        activeUsers.set(users);
    });

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
    res.set('Content-Type', register.contentType);
    res.end(await register.metrics());
});

// Endpoint to simulate sales transactions (for testing)
app.post('/sale', (req, res) => {
    const amount = Math.random() * 100; // Simulate a sale amount (between 0 and 100 USD)
    const items = Math.floor(Math.random() * 10) + 1; // Simulate items sold (between 1 and 10)

    totalSales.inc({ currency: 'USD' }, amount); // Increment the sales counter with the amount and currency label
    totalSalesValue.inc(amount); // Increment the total sales value counter
    itemsSold.inc(items); // Increment the items sold counter

    res.send(`Sale of $${amount.toFixed(2)} recorded with ${items} items.`);
});

// Endpoint to simulate errors
app.get('/error', (req, res) => {
    errorCount.inc({ type: 'server_error' }); // Increment the error counter
    res.status(500).send('An error occurred.');
});

// Start the server
app.listen(PORT, () => {
    console.log(`POS system running at http://localhost:${PORT}`);
});
