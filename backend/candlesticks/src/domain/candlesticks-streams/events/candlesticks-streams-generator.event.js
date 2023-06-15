const { EventEmitter } = require('events');
const candlesticksStreamsService = require('../services/candlesticks-streams.service');
const candlesticksStreamsStatusEnum = require('../constants/candlestick-stream-status.enum.constant');
const candlesticksStreamsGeneratorEvent = new EventEmitter();
const candlesticksGeneratorService = require('../../candlesticks/services/candlesticks-generator.service')
const { watchBinanceusdm } = require('../../../adapters/ccxt');
const { CandlestickEntity } = require('../../candlesticks/entities/candlestick.entity');

const generatedCandlesticks = new Map();

const getKey = (symbol, interval) => {
    return `${symbol}-${interval}`;
}

candlesticksStreamsGeneratorEvent.on('run', async (candlesticksStream) => {
    const { id, symbol, interval } = candlesticksStream;
    
    console.log(`Running event: [${id}]`);
    
    const status = candlesticksStreamsStatusEnum.RUNNING;
    candlesticksStreamsService.update(id, { status });
    
    const key = getKey(symbol, interval);

    const initCandlestick = new CandlestickEntity();
    initCandlestick.symbol = symbol;
    initCandlestick.interval = interval;
    generatedCandlesticks.set(key, initCandlestick);

    while (true) {
        const orderBook = await watchBinanceusdm.watchOrderBook(symbol);
        const candlestick = generatedCandlesticks.get(key);
        const updatedCandlestick = candlesticksGeneratorService.generateFromOrderBook(candlestick, orderBook);
        // console.log(updatedCandlestick);
        console.log(generatedCandlesticks);
        generatedCandlesticks.set(key, updatedCandlestick);
    }
});


module.exports = candlesticksStreamsGeneratorEvent;