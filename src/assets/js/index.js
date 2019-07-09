var app = {
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },
    // deviceready Event Handler
    // Bind any cordova events here. Common events are: 'pause', 'resume', etc.
    onDeviceReady: function() {
        window.cordova = cordova;
        window.cordova.DateTimePicker = cordova.DateTimePicker;
        window.open = cordova.InAppBrowser.open;
    }
};
console.log('events work! updated');
app.initialize();