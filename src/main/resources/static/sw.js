/**
 * Service worker file.
 *
 * NOTE: This file MUST be located in the root.
 */

'use strict';

console.log('Started', self);

self.addEventListener('install', function (event) {
    self.skipWaiting();
    console.log('Installed', event);
});

self.addEventListener('activate', function (event) {
    console.log('Activated', event);
});

self.addEventListener('push', function (event) {
    console.log('Push message', event);

    var data = event.data.text();
    console.log('Push data: ' + data);

    if (isJson(data)) {
        var title = data.title;
        var message = data.message;
    } else {
        var title = 'Push Message';
        var message = data;
    }

    return self.registration.showNotification(title, {
        body: 'Hello'
    });
});

var isJson = function (str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}
