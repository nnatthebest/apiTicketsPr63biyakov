var request = require('request');
var models = require('./models/index');

module.exports = class Tickers {
    constructor(apiTicker = '',  tickerBuy = '',
        tickerSell = '', marketName = '') {
      
        this.apiTicker = apiTicker;
        this.tickerBuy = tickerBuy;
        this.tickerSell = tickerSell;
        this.marketName = marketName;
    }

    getDataFromApi(apiUrl) {
        return new Promise( (resolve) => { 
            request(apiUrl,  (error, response, body) => {
                if (!error && response.statusCode == 200) {
                    resolve( JSON.parse(body) ); 
                }
            });
        });
    }

    getTickersValue(data) {
        let lines = [];
        const keysTickers = this.getListKey(data);
        const createdTime = this.getNowTime();

        for (let k of keysTickers) {
            let obj = data[k];
            
            let tickerBuy = obj[ this.tickerBuy ];
            let tickerSell = obj[ this.tickerSell ];

            lines.push( this.formTickersLine(this.marketName, k, tickerBuy, tickerSell, createdTime) );
        }
        return lines;
    }

    getListKey(data) {
        return Object.keys(data);
    }

    getNowTime() {
        let dateNow = new Date();
        return (dateNow.getTime()/1000);
    }

    formTickersLine(marketName, tickerPair, tickerBuy, tickerSell, createdTime){
    	return {
    		'marketName' : marketName, 
            'tickerPair' : tickerPair.toLowerCase(), 
            'tickerBuy' : tickerBuy, 
            'tickerSell' : tickerSell, 
            'createdTime': createdTime 
            }

    }

    writeToDatabase(buzcoins) {
        buzcoins ? '': console.error('Get value isn\'t empty');
        console.log(buzcoins[0]);
       
        for (let ticker of buzcoins) {
            models.buzcoin.create({
                marketname: ticker.marketName,
                tickerpair: ticker.tickerPair,
                tickerbuy: ticker.tickerBuy,
                tickersell: ticker.tickerSell,
                createdtime: ticker.createdTime 
            });  
             
        }
    }
};
