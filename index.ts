class Pubsub {

    private eventList: { [key: string] : Array<(data: any) => void>} = {};

    subscribe(event: string, eventListener: (data: any) => void): () => void {

        if(!this.eventList[event]) {
            this.eventList[event] = [];
        }

        this.eventList[event].push(eventListener);

        return () => {
            this.eventList[event] = this.eventList[event].filter(listener => listener !== eventListener);

        }
    }

    publish(event: string,  data: any): void {
        if(!this.eventList[event]) {
            return;
        }

        this.eventList[event].forEach((currEventListener) => currEventListener(data));
    }
}

const pubsub  = new Pubsub();

const messTopicUnsubscribe1 = pubsub.subscribe("sendMessage", function f1(data) {
    console.log("Send message received in f", data);
});
const messTopicUnsubscribe2 = pubsub.subscribe("sendMessage", function g1(data) {
    console.log("send message received in g", data);
});

setInterval(() => {
    pubsub.publish("sendMessage", {messageContent: "Hello"});
}, 3000);

