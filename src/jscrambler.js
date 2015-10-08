import Q from 'q';
import JScramblerClient from './client';
import config from './config';
import {createApplication} from './mutations';
import {getApplication} from './queries';

const debug = !!process.env.DEBUG;

export default
/** @lends jScramblerFacade */
{
  Client: JScramblerClient,
  config: config,
  createApplication (client, data) {
    const deferred = Q.defer();
    client.post('/', createApplication(data), responseHandler(deferred));
    return deferred.promise;
  },
  getApplication (client, applicationId) {
    const deferred = Q.defer();
    debug && console.log('Getting info', applicationId);
    client.get('/', getApplication(applicationId), responseHandler(deferred));
    return deferred.promise;
  }
};

function responseHandler (deferred) {
  return (err, res) => {
    const body = res.body;
    try {
      if (err) deferred.reject(err);
      else if (res.statusCode >= 400) {
        if (Buffer.isBuffer(body)) {
          deferred.reject(JSON.parse(body));
        } else {
          deferred.reject(body);
        }
      } else {
        if (Buffer.isBuffer(body)) {
          deferred.resolve(JSON.parse(body));
        } else {
          deferred.resolve(body);
        }
      }
    } catch (ex) {
      deferred.reject(body);
    }
  };
}
