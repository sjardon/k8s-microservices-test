const { postgres } = require('../../../common/database');
const CandlestickStream = require('../entities/candlestick-stream.entity');

class CandlesticksStreamsService {
    
    candlestickStreamRepository;

    constructor() {
        this.candlestickStreamRepository = postgres.getRepository(CandlestickStream);
    }

    async getAll() {
        try {
            return await this.candlestickStreamRepository.find()
        } catch (error) {
            throw new Error('Get all CandlestickStream error');
        }
    }

    async getAllByStatus(status) {
        try {
            return await this.candlestickStreamRepository.findBy({ status });
        } catch (error) {
            throw new Error('Get all by status CandlestickStream error');
        }
    }

    async create(candlesticksStream) {
        try {
            const candlestickStream = this.candlestickStreamRepository.create(candlesticksStream);
            return await this.candlestickStreamRepository.save(candlestickStream);
        } catch (error) {
            throw new Error('Create CandlestickStream error');
        }
    }
    
    async update(id, candlesticksStream) {
        try {
            const candlestickStream = this.candlestickStreamRepository.create({ id, ...candlesticksStream });
            return await this.candlestickStreamRepository.save(candlestickStream);
        } catch (error) {
            console.log(error);
            throw new Error('Update CandlestickStream error');
        }
    }
    
    async delete(id) {
        try {
            return await this.candlestickStreamRepository.delete(id);
        } catch (error) {
            console.log(error);
            throw new Error('Delete CandlestickStream error');
        }
    }
}

module.exports = new CandlesticksStreamsService();