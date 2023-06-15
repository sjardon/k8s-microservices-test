const candlestickIntervalDesc = require('../constants/candlestick-interval-desc.constant');
const { CandlestickEntity } = require('../../candlesticks/entities/candlestick.entity');

const getIntervalUnitToCurrentValue = {
    'm': (date) => { return date.getMinutes() },
    'h': (date) => { return date.getHours() },
    // 'd': (date) => { return date.getDate() },
    // 'w': (date) => { return date.get },
    // 'M': (date) => { return date.get }
}

const setIntervalUnitToCurrentValue = {
    'm': (date, value) => { 
        date.setMinutes(value) 
        return date;
    },
    'h': (date, value) => { 
        date.setHours(value) 
        return date;
    },
    // 'd': (date) => { return date.getDate() },
    // 'w': (date) => { return date.get },
    // 'M': (date) => { return date.get }
}

class CandlesticksGeneratorService {

    generateFromOrderBook(candlestick, orderBook) {

        const { interval, symbol } = candlestick;

        let newCandlestick = new CandlestickEntity()
        newCandlestick.interval = interval;
        newCandlestick.symbol = symbol;
        
        newCandlestick.openTime = this.getOpentTime(interval);
        newCandlestick.closeTime = this.getCloseTime(interval);

        if (candlestick.openTime == newCandlestick.openTime) {
            newCandlestick = candlestick;
        }

        const [bid] = orderBook.bids[0];
        const [ask] = orderBook.asks[0];
        const currentPrice = (ask + bid) / 2;

        newCandlestick.open = this.getOpen(newCandlestick, currentPrice);
        newCandlestick.close = this.getClose(newCandlestick, currentPrice);
        newCandlestick.high = this.getHigh(newCandlestick, currentPrice);
        newCandlestick.low = this.getLow(newCandlestick, currentPrice);
        newCandlestick.volume = this.getVolume(newCandlestick, currentPrice);
        
        return newCandlestick;
    }

    getOpentTime(interval) {
        // Set the desired time zone
        const timeZone = 'America/Argentina/Buenos_Aires'; // Replace with your desired time zone

        // Set the trading hours for the specific market or exchange
        const tradingHours = {
            start: '00:00',
            end: '16:00',
        };

        // Set the candlestick timeframe in minutes
        const candlestickTimeframe = 60; // Replace with your desired timeframe

        // Get the current date and time in the desired time zone
        const currentDate = new Date().toLocaleString('en-US', { timeZone });

        // Extract the current date and time components
        const [date, time] = currentDate.split(', ');
        const [hours, minutes] = time.split(':');

        // Calculate the candlestick open time
        const tradingStartTime = new Date(`${date} ${tradingHours.start}`).getTime();
        const currentTime = new Date(`${date} ${hours}:${minutes}`).getTime();
        const timeDiff = currentTime - tradingStartTime;
        const candlestickOpenTime = Math.floor(timeDiff / (candlestickTimeframe * 60 * 1000)) * (candlestickTimeframe * 60 * 1000) + tradingStartTime;

        // Format the candlestick open time
        const formattedOpenTime = new Date(candlestickOpenTime).toISOString() //.toLocaleString('en-US', { timeZone });
        return formattedOpenTime;
    }
    
    getCloseTime(interval) {    // Set the desired time zone
        const timeZone = 'America/Argentina/Buenos_Aires'; // Replace with your desired time zone

        // Set the trading hours for the specific market or exchange
        const tradingHours = {
            start: '00:00',
            end: '16:00',
        };

        // Set the candlestick timeframe in minutes
        const candlestickTimeframe = 60; // Replace with your desired timeframe

        // Get the current date and time in the desired time zone
        const currentDate = new Date().toLocaleString('en-US', { timeZone });

        // Extract the current date and time components
        const [date, time] = currentDate.split(', ');
        const [hours, minutes] = time.split(':');

        // Calculate the candlestick open time
        const tradingStartTime = new Date(`${date} ${tradingHours.start}`).getTime();
        const currentTime = new Date(`${date} ${hours}:${minutes}`).getTime();
        const timeDiff = currentTime - tradingStartTime + candlestickTimeframe * 60 * 1000;
        const candlestickOpenTime = Math.floor(timeDiff / (candlestickTimeframe * 60 * 1000)) * (candlestickTimeframe * 60 * 1000) + tradingStartTime;

        // Format the candlestick open time
        const formattedOpenTime = new Date(candlestickOpenTime).toISOString() //.toLocaleString('en-US', { timeZone });
        return formattedOpenTime;
    }

    getOpen (candlestick, currentPrice) {
        return candlestick['open'] ? candlestick.open : currentPrice;
    }

    getClose (candlestick, currentPrice) {
        return currentPrice;
    }
    getHigh (candlestick, currentPrice) {
        if (!candlestick.high || candlestick.high < currentPrice) {
            return currentPrice;
        }

        return candlestick.high
    }
    getLow (candlestick, currentPrice) {
        if (!candlestick.low || candlestick.low > currentPrice) {
            return currentPrice;
        }

        return candlestick.low;
    }
    getVolume (candlestick, currentPrice) {
        return 1
    }
}

module.exports = new CandlesticksGeneratorService();


// function generateCandlestick(price) {
//     // new Date(year, monthIndex, day, hours, minutes, seconds)
// }

// function generateCandlestickBetween() {
    
// }