/**
 * Created by Rusak Oleg on 08.03.2016.
 */

var req = require.context('./../app', true, /-test\.js$/);
req.keys().forEach(req);