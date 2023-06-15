const { Router } = require('express');
const candlesticksStreamsService = require('../services/candlesticks-streams.service');

const route = Router();

route.get('/', async (req, res) => {
  try {
      const candlesticksStreams = await candlesticksStreamsService.getAll();
      return res.status(201).json(candlesticksStreams);
    } catch (e) {
      return next(e);
    }
});

route.post('/', async (req, res) => {
  try {
      const candlestickStream = await candlesticksStreamsService.create(req.body);
      return res.status(201).json(candlestickStream);
    } catch (e) {
      return next(e);
    }
});

route.patch('/:id', async (req, res) => {
  try {
      const { id } = req.params;
      const candlestickStream = await candlesticksStreamsService.update(id, req.body);
      return res.status(201).json(candlestickStream);
    } catch (e) {
      return next(e);
    }
});

route.delete('/:id', async (req, res, next) => {
  try {
      const { id } = req.params;
      const candlestickStream = await candlesticksStreamsService.delete(id);
      return res.status(201).json(candlestickStream);
    } catch (e) {
      return next(e);
    }
});


module.exports = route;