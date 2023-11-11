const stompClient = new StompJs.Client({

    brokerURL: 'ws://localhost:8080/chat'
});

stompClient.onConnect = (frame) => {

    showConversation(true);
    console.log(frame);
    stompClient.subscribe("/topic/message", (message) => {

        greetingMessage(JSON.parse(message.body).content);

    });

};

stompClient.onStompError = (error) => {

    console.error("Stomp error:" + error);

};

stompClient.onWebSocketError = (frame) => {

    console.error("WebSocket error:" + frame.headers["message"]);
    console.error("WebSocket error:" + frame.body);

};

showConversation = (connect) => {

    $("#connect").prop("disabled", connect);
    $("#disconnect").prop("disabled", !connect);

    if (connect) {

        $("#conversation").show();
    } else {

        $("#conversation").hide();
    }

    $("#greetings").html("");

}


connect = () => {

    stompClient.activate();
    console.log("connect");

};


disconnect = () => {

    stompClient.deactivate();
    console.log("disconnect");
    showConversation(false);

};

function sendName() {

    stompClient.publish({

        destination: "/app/hello",
        body: JSON.stringify({"username" : $("#name").val()})
    });

};

greetingMessage = (message) => {

    $("#greetings").append("<tr><td>" + message + "</td></tr>");

};

$(function (){

    $("form").on("submit", function (event) {

        event.preventDefault();

    })

    $("#connect").on("click", () => connect());
    $("#disconnect").on("click", () => disconnect());
    $("#send").on("click", () => sendName());

});