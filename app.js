const express = require("express");
const app = express();
const logger = require("morgan");

// Routes
const authRoutes = require('./routes/auth');
const clientsRoutes = require('./routes/clients');
const commandesRoutes = require('./routes/commandes');
const pricingsRoutes = require('./routes/pricings');
const employeesRoutes = require('./routes/employees');
const transportTypesRoutes = require('./routes/transportTypes');
const packageTypesRoutes = require('./routes/packageTypes');
const measureUnitRoutes = require('./routes/measureUnits');
const countryRoutes = require('./routes/countries');
const dashboardRoutes = require('./routes/dashboard');
const productsRoutes = require('./routes/products');
const usersRoutes = require('./routes/users');
const permissionsRoute = require('./routes/permissions');
const jobRoute = require('./routes/jobs');
const blogRoute = require('./routes/blogs')

app.use(logger('[:date[web]] ":method :url" :status :res[content-length]'));

app.use('/auth', authRoutes);
app.use('/clients', clientsRoutes);
app.use('/commandes', commandesRoutes);
app.use('/pricings', pricingsRoutes);
app.use('/employees', employeesRoutes);
app.use('/transportTypes', transportTypesRoutes);
app.use('/packageTypes', packageTypesRoutes);
app.use('/measureUnits', measureUnitRoutes);
app.use('/countries', countryRoutes);
app.use('/dashboard', dashboardRoutes);
app.use('/products', productsRoutes);
app.use('/permissions', permissionsRoute);
app.use('/users', usersRoutes);
app.use('/blogs', blogRoute);
app.use('/jobs', jobRoute);

app.get('/', (req, res) => {
    res.send('Hello NODE API');
});

app.get('/blog', (req, res) => {
    res.send('Hello Blog');
});

module.exports = app;
