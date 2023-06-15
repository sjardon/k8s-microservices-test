const { Router } = require('express');
const candlesticksStreamsRoutes = require('../../domain/candlesticks-streams/routes/candlesticks-streams.route')

const route = Router();

route.use('/candlesticks-streams', candlesticksStreamsRoutes);

module.exports = route;