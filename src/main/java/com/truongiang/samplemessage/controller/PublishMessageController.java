package com.truongiang.samplemessage.controller;

import com.truongiang.samplemessage.dto.PublishMessage;
import com.truongiang.samplemessage.dto.SubscribeMessage;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.annotation.SubscribeMapping;
import org.springframework.stereotype.Controller;

@Controller
public class PublishMessageController {


    @MessageMapping(value = "/hello")
    @SendTo(value = "/topic/message")
    public PublishMessage sendMessageToClient(SubscribeMessage messageTo) throws InterruptedException {

        //simulator asynchronously
        Thread.sleep(1000);
        PublishMessage messageSend = new PublishMessage("hello " + messageTo.getUsername());
        return messageSend;
    }
}
