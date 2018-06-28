var Tickers = require('./tickers.js');

setInterval(marketsDirector,30000);

function marketsDirector() {
    return Promise.resolve().then( () => {
        
        let poloniex = new marketPolonex();
        poloniex.builderTickers();
    
        let exmo = new marketExmo();
        exmo.builderTickers();

    });
}

class marketExmo extends Tickers {
    constructor() {        
        let apiTicker = 'https://api.exmo.com/v1/ticker/';
        let tickerBuy = 'buy_price';
        let tickerSell ='sell_price';
        let marketName = 'exmo';

        super(apiTicker, tickerBuy, tickerSell, marketName);      
    }

    builderTickers() {
        this.getDataFromApi(this.apiTicker).then( data => {
            let tickers = this.getTickersValue(data);
            this.writeToDatabase(tickers);
        });    
    }
}


class marketPolonex extends Tickers {
    constructor() { 
        let apiTicker = 'https://poloniex.com/public?command=returnTicker';
        let tickerBuy = 'lowestAsk';
        let tickerSell ='highestBid';
        let marketName = 'poloniex';

        super(apiTicker, tickerBuy, tickerSell, marketName);      
    }

    builderTickers() {
        this.getDataFromApi(this.apiTicker).then( data => {
            let tickers = this.getTickersValue(data);
            this.writeToDatabase(tickers);
        });    
    }
}

