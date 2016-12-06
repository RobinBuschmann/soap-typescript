"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var utils_1 = require("../../utils");
var soap = require('soap');
var WSDLBinding_1 = require("./WSDLBinding");
var WSDLService_1 = require("./WSDLService");
var WSDLPortType_1 = require("./WSDLPortType");
var WSDLMessage_1 = require("./WSDLMessage");
var XSDSchema_1 = require("./XSDSchema");
var XSDElement_1 = require("./XSDElement");
var XSDComplexType_1 = require("./XSDComplexType");
var WSDLOperation_1 = require("./WSDLOperation");
var XMLAttribute_1 = require("xml-typescript/annotations/XMLAttribute");
var XMLChild_1 = require("xml-typescript/annotations/XMLChild");
var WSDLDefinitions = (function () {
    function WSDLDefinitions() {
        this.soap = utils_1.SOAP_URL;
        this.xsd = utils_1.XSD_URL;
        this.wsdl = utils_1.WSDL_URL;
        this.hasMessage = {};
        this.schema = new XSDSchema_1.XSDSchema();
        this.portType = new WSDLPortType_1.WSDLPortType();
        this.binding = new WSDLBinding_1.WSDLBinding();
        this.messages = [];
    }
    WSDLDefinitions.processService = function (targetClass, options) {
        var definitions = this.getWSDLDefinitions(targetClass);
        definitions.servicePath = options.path;
        definitions.targetNamespace = options.targetNamespace || soap['CURRENT_URL_PLACEHOLDER'];
        definitions.tns = definitions.targetNamespace;
        definitions.name = options.serviceName;
        definitions.schema.setTargetNamespace(definitions.targetNamespace);
        definitions.portType.setName(options.portName + utils_1.PORT_TYPE_SUFFIX);
        definitions.binding.setName(options.serviceName + utils_1.BINDING_SUFFIX);
        definitions.binding.setType(definitions.portType.nsName);
        definitions.service = new WSDLService_1.WSDLService({
            name: options.serviceName,
            port: {
                binding: definitions.binding.nsName,
                name: options.portName,
                address: { location: definitions.targetNamespace }
            }
        });
    };
    WSDLDefinitions.processOperation = function (target, key, requestDataType, responseDataType) {
        var targetClass = target.constructor;
        var definitions = this.getWSDLDefinitions(targetClass);
        var requestComplexType = XSDComplexType_1.XSDComplexType.getXSDComplexType(requestDataType, false);
        var requestElement = XSDElement_1.XSDElement.createElement({ name: key }, requestComplexType, requestDataType);
        definitions.schema.addElement(requestElement);
        var requestPartName = key;
        var requestMessage = new WSDLMessage_1.WSDLMessage({
            name: key + utils_1.MESSAGE_SUFFIX,
            part: { name: requestPartName, element: requestElement.nsName }
        });
        definitions.addMessage(requestMessage);
        var responseComplexType = XSDComplexType_1.XSDComplexType.getXSDComplexType(responseDataType, false);
        var responseElement = XSDElement_1.XSDElement.createElement({ name: responseComplexType.name }, responseComplexType, responseDataType);
        definitions.schema.addElement(responseElement);
        var responsePartName = responseComplexType.name;
        var responseMessage = new WSDLMessage_1.WSDLMessage({
            name: responseComplexType.name + utils_1.MESSAGE_SUFFIX,
            part: { name: responsePartName, element: responseElement.nsName }
        });
        definitions.addMessage(responseMessage);
        definitions.portType.addOperation(new WSDLOperation_1.WSDLOperation({
            name: key,
            input: { message: requestMessage.nsName },
            output: { message: responseMessage.nsName }
        }));
        definitions.binding.addOperation(new WSDLOperation_1.WSDLOperation({
            name: key,
            soapOperation: true,
            input: { body: { parts: requestPartName } },
            output: { body: { parts: responsePartName } }
        }));
    };
    WSDLDefinitions.getWSDLDefinitions = function (targetClass, createIfNotExist) {
        if (createIfNotExist === void 0) { createIfNotExist = true; }
        var REFLECT_KEY = 'wsdl:definitions';
        var definitions = Reflect.getMetadata(REFLECT_KEY, targetClass);
        if (!definitions && createIfNotExist) {
            definitions = new WSDLDefinitions();
            Reflect.defineMetadata(REFLECT_KEY, definitions, targetClass);
        }
        return definitions;
    };
    WSDLDefinitions.prototype.getServiceName = function () {
        return this.service.name;
    };
    WSDLDefinitions.prototype.getPortName = function () {
        return this.service.port.name;
    };
    WSDLDefinitions.prototype.getServicePath = function () {
        return this.servicePath;
    };
    WSDLDefinitions.prototype.addMessage = function (message) {
        if (!this.hasMessage[message.name]) {
            this.messages.push(message);
            this.hasMessage[message.name] = true;
        }
    };
    __decorate([
        XMLAttribute_1.XMLAttribute({ namespace: utils_1.XMLNS_NS }), 
        __metadata('design:type', String)
    ], WSDLDefinitions.prototype, "soap", void 0);
    __decorate([
        XMLAttribute_1.XMLAttribute({ namespace: utils_1.XMLNS_NS }), 
        __metadata('design:type', String)
    ], WSDLDefinitions.prototype, "xsd", void 0);
    __decorate([
        XMLAttribute_1.XMLAttribute({ namespace: utils_1.XMLNS_NS }), 
        __metadata('design:type', String)
    ], WSDLDefinitions.prototype, "wsdl", void 0);
    __decorate([
        XMLAttribute_1.XMLAttribute, 
        __metadata('design:type', String)
    ], WSDLDefinitions.prototype, "name", void 0);
    __decorate([
        XMLAttribute_1.XMLAttribute, 
        __metadata('design:type', String)
    ], WSDLDefinitions.prototype, "targetNamespace", void 0);
    __decorate([
        XMLAttribute_1.XMLAttribute({ namespace: utils_1.XMLNS_NS }), 
        __metadata('design:type', String)
    ], WSDLDefinitions.prototype, "tns", void 0);
    __decorate([
        XMLChild_1.XMLChild({
            namespace: utils_1.XSD_NS,
            implicitStructure: 'wsdl:types.$'
        }), 
        __metadata('design:type', XSDSchema_1.XSDSchema)
    ], WSDLDefinitions.prototype, "schema", void 0);
    __decorate([
        XMLChild_1.XMLChild({
            name: 'message',
            namespace: utils_1.WSDL_NS,
        }), 
        __metadata('design:type', Array)
    ], WSDLDefinitions.prototype, "messages", void 0);
    __decorate([
        XMLChild_1.XMLChild({ namespace: utils_1.WSDL_NS }), 
        __metadata('design:type', WSDLPortType_1.WSDLPortType)
    ], WSDLDefinitions.prototype, "portType", void 0);
    __decorate([
        XMLChild_1.XMLChild({ namespace: utils_1.WSDL_NS }), 
        __metadata('design:type', WSDLBinding_1.WSDLBinding)
    ], WSDLDefinitions.prototype, "binding", void 0);
    __decorate([
        XMLChild_1.XMLChild({ namespace: utils_1.WSDL_NS }), 
        __metadata('design:type', WSDLService_1.WSDLService)
    ], WSDLDefinitions.prototype, "service", void 0);
    return WSDLDefinitions;
}());
exports.WSDLDefinitions = WSDLDefinitions;
//# sourceMappingURL=WSDLDefinitions.js.map