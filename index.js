var Pubsub = /** @class */ (function () {
    function Pubsub() {
        this.eventList = {};
    }
    Pubsub.prototype.subscribe = function (event, eventListener) {
        var _this = this;
        if (!this.eventList[event]) {
            this.eventList[event] = [];
        }
        this.eventList[event].push(eventListener);
        return function () {
            _this.eventList[event] = _this.eventList[event].filter(function (listener) { return listener !== eventListener; });
        };
    };
    Pubsub.prototype.publish = function (event, data) {
        if (!this.eventList[event]) {
            return;
        }
        this.eventList[event].forEach(function (currEventListener) { return currEventListener(data); });
    };
    return Pubsub;
}());
var pubsub = new Pubsub();
var messTopicUnsubscribe1 = pubsub.subscribe("sendMessage", function f1(data) {
    console.log("Send message received in f", data);
});
var messTopicUnsubscribe2 = pubsub.subscribe("sendMessage", function g1(data) {
    console.log("send message received in g", data);
});
setInterval(function () {
    pubsub.publish("sendMessage", { messageContent: "Hello" });
}, 3000);
