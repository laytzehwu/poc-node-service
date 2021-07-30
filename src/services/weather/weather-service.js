
const https = require('https');
const logger = require('../logger');

const apiKey = '7fac81b2676df4ebf79dabd8759a9ce7';
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather';

class WeatherService {

    static BASE_PATH = '/weather';

    getSubPath(path) {
        return path.replace(WeatherService.BASE_PATH, '');
    }

    callApi(place) {
        return new Promise((resolve, reject) => {
            const url = `${baseUrl}?q=${place}&&appid=${apiKey}`;
            https.get(url, (apiRes) => {
                apiRes.on('data', (d) => {
                    resolve({
                        'apiRes': apiRes,
                        'data': d + ""
                    });
                });
            })
            .on('error', (err) => {
              // Check if retry is needed
              if (req.reusedSocket && err.code === 'ECONNRESET') {
                currentService.handleGet(req, res);
              } else {
                reject(err);
              }
            });
        });
    }

    async handleGet(req, res) {
        const [empty, place] = this.getSubPath(req.url).split('/');
        try {
            const { apiRes, data } = await this.callApi(place);
            res.writeHead(apiRes.statusCode);
            res.write(data);
            res.end();
        } catch(err) {
            logger.log(`error ${err}`);
            res.writeHead(400);
            res.write(JSON.stringify(err));
            res.end();
        }
    }

    handleRequest(req, res) {
        switch(req.method) {
            case 'GET':
                this.handleGet(req, res);
                break;
            default:
                res.writeHead(404);
                res.end();
                break;
        }
    }
}

module.exports = WeatherService;
