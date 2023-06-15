const { EventEmitter } = require('events');
const candlesticksStreamsService = require('../services/candlesticks-streams.service');
const candlesticksStreamsStatusEnum = require('../constants/candlestick-interval.enum.constant');
const candlesticksStreamsGeneratorEvent = new EventEmitter();
const { watchBinanceusdm } = require('../../../adapters/ccxt');

const candlesticks = {};

function generateCandlestick(price) {
    // new Date(year, monthIndex, day, hours, minutes, seconds)
}

function generateCandlestickBetween() {
    
}

candlesticksStreamsGeneratorEvent.on('run', async (candlesticksStream) => {
    const { id, symbol } = candlesticksStream;
    
    console.log(`Running event: [${id}]`);

    const status = candlesticksStreamsStatusEnum.RUNNING;

    candlesticksStreamsService.update(id, { status });

    while (true) {
        const orderBook = await watchBinanceusdm.watchOrderBook(symbol);
        const [bid] = orderBook.bids[0];
        const [ask] = orderBook.asks[0];
        console.log(Date.now(), (ask + bid) / 2);
    }
});


module.exports = candlesticksStreamsGeneratorEvent;