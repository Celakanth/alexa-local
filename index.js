'use strict';
//const Alexa = require('ask-sdk-core');
//use 'ask-sdk' //if standard SDK module is installed
////////////////////////////////
// Code for the handlers here //
////////////////////////////////
// exports.handler = Alexa.SkillBuilders.custom()
//      .addRequestHandlers(LaunchRequestHandler,
//                          HelloWorldIntentHandler,
//                          HelpIntentHandler,
//                          CancelAndStopIntentHandler,
//                          SessionEndedRequestHandler)
//      .lambda();

const Alexa = require('ask-sdk-v1adapter')

let skill;

exports.handler = function(event, context, callback) {
    const alexa = Alexa.handler(event, context);
    alexa.registerHandlers(handlers);
    alexa.registerV2Handlers(HelpIntentHandler); // New API functions for registering v2 request handlers
    alexa.execute();
};

const handlers = {
    'LaunchRequest': function () {
        console.log(this)
        this.response.reprompt('hello there').speak('Welcome!')
        //this.response.speak('Welcome to the Alexa Skills Kit, you can say hello!').reprompt('Is this ok ');
        this.emit(':responseReady');
    },
    'HelloWorldIntent': function () {
        this.emit('SayHello');
    },
    'CreateTaskIntent': function () {

    },
    'SayHello': function () {
        this.response.speak('Hello World!');
        this.emit(':responseReady');
    },
    'AMAZON.CancelIntent': function () {
        this.response.speak('Goodbye!');
        this.emit(':responseReady');
    },
    'AMAZON.StopIntent': function () {
    this.response.speak('See you later!');
    this.emit(':responseReady');
    }
};



const HelpIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speechText = 'You can say hello to me!';
return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .withSimpleCard('Hello World', speechText)
            .getResponse();
    }
};



