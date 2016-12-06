"use strict";
var soap_1 = require("soap");
var Promise = require("bluebird");
var XMLElement_1 = require("xml-typescript/models/XMLElement");
var SOAPClient = (function () {
    function SOAPClient() {
    }
    SOAPClient.process = function (options, target, key) {
        var _this = this;
        var clientWrapper = target[key] = {};
        var createClientPromise = this.createClient(options);
        // create operation function proxies,
        // to hide creation
        options.operations.forEach(function (operation) {
            clientWrapper[operation] = function (args, operationOptions) {
                if (operationOptions === void 0) { operationOptions = {}; }
                return createClientPromise
                    .then(function (client) { return _this.callClientOperation(operation, client, args, operationOptions); });
            };
        });
    };
    SOAPClient.callClientOperation = function (operation, client, args, options) {
        return Promise.resolve()
            .then(function () {
            if (!client[operation])
                throw new Error("Unknown operation \"" + operation + "\"");
            return XMLElement_1.XMLElement.getSchemaAsync(args);
        })
            .then(function (_args) { return new Promise(function (resolve, reject) {
            client[operation](_args, function (err, data) {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(data);
            }, options, options.headers);
        }); });
    };
    SOAPClient.createClient = function (options) {
        options.wsdl_options = {
            cert: options.clientCert,
            key: options.clientKey,
            ignoreSchemaValidation: options.ignoreSchemaValidation
        };
        return new Promise(function (resolve, reject) {
            soap_1.createClient(options.wsdlPath + '?wsdl', options, function (err, client) {
                if (err) {
                    reject(err);
                    return;
                }
                client.setSecurity(new soap_1.ClientSSLSecurity(options.clientKey, options.clientCert, '', {}));
                resolve(client);
            });
        });
    };
    return SOAPClient;
}());
exports.SOAPClient = SOAPClient;
//# sourceMappingURL=SOAPClient.js.map