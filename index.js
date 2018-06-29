var Tickers = require('./tickers.js');

setInterval(marketsDirector,30000);

function marketsDirector() {
    return Promise.resolve().then( () => {
        
        let poloniex = new marketPolonex();
        poloniex.builderTickers();
    
        let exmo = new marketExmo();
        exmo.builderTickers();
	
	let WEX = new marketWEX();
	WEX.builderTickers();
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

class marketWEX extends Tickers {
    constructor() { 
        let apiTicker = 'https://wex.nz/api/3/ticker/btc_usd';
        let tickerBuy = 'buy';
        let tickerSell = 'sell';
        let marketName = 'WEX';

        super(apiTicker, tickerBuy, tickerSell, marketName);

        this.urlInfo = 'https://wex.nz/api/3/info';        
    }    
    
    builderTickers() {
        this.getDataFromApi(this.urlInfo)

            .then( data => {
                this.formUrlApiTicker(data);
                this.getDataFromApi(this.apiTicker)

                    .then( data => {
                        let tickers = this.getTickersValue(data);
                        this.writeToDatabase(tickers);
                    });
            });   
    }

    formUrlApiTicker(data){
        let joinedTickers = this.joinGetTickers( this.getListKeyApiInfo(data) );
        this.apiTicker = this.addTickersTailToUrl(this.apiTicker, joinedTickers);
    }

    getListKeyApiInfo(data) {
        return Object.keys(data.pairs);
    }

    joinGetTickers(keys) {
        return keys.join('-');
    }

    addTickersTailToUrl(urlApi, tail){
        return urlApi = urlApi + tail +'?ignore_invalid=1';
    }
}
