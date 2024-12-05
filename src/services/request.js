"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.request = void 0;
var baseUrl = import.meta.env.VITE_API_URL;
exports.request = {
    get: function (path, params, options) {
        var paramFilter = params ? new URLSearchParams(params) : undefined;
        return fetch("".concat(baseUrl).concat(path).concat(paramFilter ? "?".concat(paramFilter.toString()) : ""), options);
    },
    post: function (path, data, options) {
        return fetch("".concat(baseUrl).concat(path), __assign({ method: "POST", headers: {
                "Content-Type": "application/json",
            }, body: JSON.stringify(data) }, options));
    },
    put: function (path, data, options) {
        return fetch("".concat(baseUrl).concat(path), __assign({ method: "PUT", headers: {
                "Content-Type": "application/json",
            }, body: JSON.stringify(data) }, options));
    },
    delete: function (path, params, options) {
        var paramFilter = params ? new URLSearchParams(params) : undefined;
        return fetch("".concat(baseUrl).concat(path).concat(paramFilter ? "?".concat(paramFilter.toString()) : ""), __assign({ method: "DELETE" }, options));
    },
};
