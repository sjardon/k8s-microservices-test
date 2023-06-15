const cron = require('node-cron');
const candlesticksStreamsService = require('../services/candlesticks-streams.service');
const candlesticksStreamsStatusEnum = require('../constants/candlestick-stream-status.enum.constant')
const candlesticksStreamsGeneratorEvent = require('../events/candlesticks-streams-generator.event')

cron.schedule('* * * * *', async () => {
  console.log(`Running cron`);
  const candlesticksStreams = await candlesticksStreamsService.getAllByStatus(candlesticksStreamsStatusEnum.TO_START);
  candlesticksStreams.forEach((candlesticksStream) => {
    console.log(`Starting stream [${candlesticksStream.id}]`);
    candlesticksStreamsGeneratorEvent.emit('run', candlesticksStream);
  });
});