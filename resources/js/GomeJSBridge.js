(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["GomeJSBridge"] = factory();
	else
		root["GomeJSBridge"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module, global) {var require;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*
 * @Author: liuxiaocong 
 * @Date: 2017-07-22 17:49:47 
 * @Last Modified by: liuxiaocong
 * @Last Modified time: 2017-12-22 17:00:37
 */
// Platform: android+ios = unit

;(function () {
    var version = -1;
    //系统判断
    var system = {
        android: false,
        ios: false
    };
    if (window.navigator.userAgent.match(/android/i)) {
        system.android = true;
    } else if (window.navigator.userAgent.match(/iPhone|iPad/i)) {
        system.ios = true;
    }
    var AppPlatform = '';
    if (window.navigator.userAgent.match(/gomegj/i)) {
        AppPlatform = 'gomegj';
    } else {
        if (window.navigator.userAgent.match(/gome\/|gomplus\//)) {
            AppPlatform = 'gome';
        } else {
            AppPlatform = 'wap';
        }
    }

    if (window.GomeJSBridge) {
        module.exports = window.GomeJSBridge;
    }
    var reg = '';
    if (AppPlatform == 'gome') {
        reg = /gomeplus\/[iphone\/]{0,7}(\d*)|gome\/[iphone\/]{0,7}(\d*)/;
    } else if (AppPlatform == 'gomegj') {
        reg = /gomegj\/[iphone\/]{0,7}(\d*)/;
    }
    console.log(reg);
    if (navigator.userAgent.match(reg)) {
        version = navigator.userAgent.match(reg)[1];
    }
    console.log(version);
    if (window.cordova) {
        return;
    }
    if (AppPlatform == 'gome') {
        if (window.cordova || !version || version < 90) {
            return;
        }
    }
    var PLATFORM_VERSION_BUILD_LABEL = '1.0.0';
    // file: src/scripts/require.js
    var require, define;

    (function () {
        var modules = {},

        // Stack of moduleIds currently being built.
        requireStack = [],

        // Map of module ID -> index into requireStack of modules currently being built.
        inProgressModules = {},
            SEPARATOR = ".";

        function build(module) {
            var factory = module.factory,
                localRequire = function localRequire(id) {
                var resultantId = id;
                //Its a relative path, so lop off the last portion and add the id (minus "./")
                if (id.charAt(0) === ".") {
                    resultantId = module.id.slice(0, module.id.lastIndexOf(SEPARATOR)) + SEPARATOR + id.slice(2);
                }
                return require(resultantId);
            };
            module.exports = {};
            delete module.factory;
            factory(localRequire, module.exports, module);
            return module.exports;
        }

        require = function require(id) {
            if (!modules[id]) {
                throw "module " + id + " not found";
            } else if (id in inProgressModules) {
                var cycle = requireStack.slice(inProgressModules[id]).join('->') + '->' + id;
                throw "Cycle in require graph: " + cycle;
            }
            if (modules[id].factory) {
                try {
                    inProgressModules[id] = requireStack.length;
                    requireStack.push(id);
                    return build(modules[id]);
                } finally {
                    delete inProgressModules[id];
                    requireStack.pop();
                }
            }
            return modules[id].exports;
        };

        define = function define(id, factory) {
            if (modules[id]) {
                throw "module " + id + " already defined";
            }

            modules[id] = {
                id: id,
                factory: factory
            };
        };

        define.remove = function (id) {
            delete modules[id];
        };

        define.moduleMap = modules;
    })();

    //Export for use in node
    if (( false ? 'undefined' : _typeof(module)) === "object" && typeof require === "function") {
        module.exports.require = require;
        module.exports.define = define;
    }

    // file: src/cordova.js
    define("cordova", function (require, exports, module) {
        if (window.cordova && !(window.cordova instanceof HTMLElement)) {
            throw new Error("cordova already defined");
        }

        var channel = require('cordova/channel');
        var platform = require('cordova/platform');
        /**
         * Intercept calls to addEventListener + removeEventListener and handle deviceready,
         * resume, and pause events.
         */
        var m_document_addEventListener = document.addEventListener;
        var m_document_removeEventListener = document.removeEventListener;
        var m_window_addEventListener = window.addEventListener;
        var m_window_removeEventListener = window.removeEventListener;

        /**
         * Houses custom event handlers to intercept on document + window event listeners.
         */
        var documentEventHandlers = {},
            windowEventHandlers = {};

        document.addEventListener = function (evt, handler, capture) {
            var e = evt.toLowerCase();
            if (typeof documentEventHandlers[e] != 'undefined') {
                documentEventHandlers[e].subscribe(handler);
            } else {
                m_document_addEventListener.call(document, evt, handler, capture);
            }
        };

        window.addEventListener = function (evt, handler, capture) {
            var e = evt.toLowerCase();
            if (typeof windowEventHandlers[e] != 'undefined') {
                windowEventHandlers[e].subscribe(handler);
            } else {
                m_window_addEventListener.call(window, evt, handler, capture);
            }
        };

        document.removeEventListener = function (evt, handler, capture) {
            var e = evt.toLowerCase();
            // If unsubscribing from an event that is handled by a plugin
            if (typeof documentEventHandlers[e] != "undefined") {
                documentEventHandlers[e].unsubscribe(handler);
            } else {
                m_document_removeEventListener.call(document, evt, handler, capture);
            }
        };

        window.removeEventListener = function (evt, handler, capture) {
            var e = evt.toLowerCase();
            // If unsubscribing from an event that is handled by a plugin
            if (typeof windowEventHandlers[e] != "undefined") {
                windowEventHandlers[e].unsubscribe(handler);
            } else {
                m_window_removeEventListener.call(window, evt, handler, capture);
            }
        };

        function createEvent(type, data) {
            var event = document.createEvent('Events');
            event.initEvent(type, false, false);
            if (data) {
                for (var i in data) {
                    if (data.hasOwnProperty(i)) {
                        event[i] = data[i];
                    }
                }
            }
            return event;
        }

        var cordova = {
            define: define,
            require: require,
            version: PLATFORM_VERSION_BUILD_LABEL,
            platformVersion: PLATFORM_VERSION_BUILD_LABEL,
            platformId: platform.id,
            /**
             * Methods to add/remove your own addEventListener hijacking on document + window.
             */
            addWindowEventHandler: function addWindowEventHandler(event) {
                return windowEventHandlers[event] = channel.create(event);
            },
            addStickyDocumentEventHandler: function addStickyDocumentEventHandler(event) {
                return documentEventHandlers[event] = channel.createSticky(event);
            },
            addDocumentEventHandler: function addDocumentEventHandler(event) {
                return documentEventHandlers[event] = channel.create(event);
            },
            removeWindowEventHandler: function removeWindowEventHandler(event) {
                delete windowEventHandlers[event];
            },
            removeDocumentEventHandler: function removeDocumentEventHandler(event) {
                delete documentEventHandlers[event];
            },
            /**
             * Method to fire event from native code
             * bNoDetach is required for events which cause an exception which needs to be caught in native code
             */
            fireDocumentEvent: function fireDocumentEvent(type, data, bNoDetach) {
                var evt = createEvent(type, data);
                if (typeof documentEventHandlers[type] != 'undefined') {
                    if (bNoDetach) {
                        documentEventHandlers[type].fire(evt);
                    } else {
                        setTimeout(function () {
                            // Fire deviceready on listeners that were registered before cordova.js was loaded.
                            if (type == 'deviceready') {
                                document.dispatchEvent(evt);
                            }
                            documentEventHandlers[type].fire(evt);
                        }, 0);
                    }
                } else {
                    document.dispatchEvent(evt);
                }
            },
            fireWindowEvent: function fireWindowEvent(type, data) {
                var evt = createEvent(type, data);
                if (typeof windowEventHandlers[type] != 'undefined') {
                    setTimeout(function () {
                        windowEventHandlers[type].fire(evt);
                    }, 0);
                } else {
                    window.dispatchEvent(evt);
                }
            },

            /**
             * Plugin callback mechanism.
             */
            // Randomize the starting callbackId to avoid collisions after refreshing or navigating.
            // This way, it's very unlikely that any new callback would get the same callbackId as an old callback.
            callbackId: Math.floor(Math.random() * 2000000000),
            callbacks: {},
            callbackStatus: {
                NO_RESULT: 0,
                OK: 1,
                CLASS_NOT_FOUND_EXCEPTION: 2,
                ILLEGAL_ACCESS_EXCEPTION: 3,
                INSTANTIATION_EXCEPTION: 4,
                MALFORMED_URL_EXCEPTION: 5,
                IO_EXCEPTION: 6,
                INVALID_ACTION: 7,
                JSON_EXCEPTION: 8,
                ERROR: 9
            },

            /**
             * Called by native code when returning successful result from an action.
             */
            callbackSuccess: function callbackSuccess(callbackId, args) {
                cordova.callbackFromNative(callbackId, true, args.status, [args.message], args.keepCallback);
            },

            /**
             * Called by native code when returning error result from an action.
             */
            callbackError: function callbackError(callbackId, args) {
                // TODO: Deprecate callbackSuccess and callbackError in favour of callbackFromNative.
                // Derive success from status.
                cordova.callbackFromNative(callbackId, false, args.status, [args.message], args.keepCallback);
            },

            /**
             * Called by native code when returning the result from an action.
             */
            callbackFromNative: function callbackFromNative(callbackId, isSuccess, status, args, keepCallback) {
                try {
                    var callback = cordova.callbacks[callbackId];
                    if (callback) {
                        if (isSuccess && status == cordova.callbackStatus.OK) {
                            callback.success && callback.success.apply(null, args);
                        } else if (!isSuccess) {
                            callback.fail && callback.fail.apply(null, args);
                        }
                        /*
                        else
                            Note, this case is intentionally not caught.
                            this can happen if isSuccess is true, but callbackStatus is NO_RESULT
                            which is used to remove a callback from the list without calling the callbacks
                            typically keepCallback is false in this case
                        */
                        // Clear callback if not expecting any more results
                        if (!keepCallback) {
                            delete cordova.callbacks[callbackId];
                        }
                    }
                } catch (err) {
                    var msg = "Error in " + (isSuccess ? "Success" : "Error") + " callbackId: " + callbackId + " : " + err;
                    console && console.log && console.log(msg);
                    cordova.fireWindowEvent("cordovacallbackerror", {
                        'message': msg
                    });
                    throw err;
                }
            }
        };

        module.exports = cordova;
    });

    // file: /Users/steveng/repo/cordova/cordova-android/cordova-js-src/android/nativeapiprovider.js
    define("cordova/android/nativeapiprovider", function (require, exports, module) {

        /**
         * Exports the ExposedJsApi.java object if available, otherwise exports the PromptBasedNativeApi.
         */

        var nativeApi = window._cordovaNative || require('cordova/android/promptbasednativeapi');
        var currentApi = nativeApi;

        module.exports = {
            get: function get() {
                return currentApi;
            },
            setPreferPrompt: function setPreferPrompt(value) {
                currentApi = value ? require('cordova/android/promptbasednativeapi') : nativeApi;
            },
            // Used only by tests.
            set: function set(value) {
                currentApi = value;
            }
        };
    });

    // file: /Users/steveng/repo/cordova/cordova-android/cordova-js-src/android/promptbasednativeapi.js
    define("cordova/android/promptbasednativeapi", function (require, exports, module) {

        /**
         * Implements the API of ExposedJsApi.java, but uses prompt() to communicate.
         * This is used pre-JellyBean, where addJavascriptInterface() is disabled.
         */

        module.exports = {
            exec: function exec(bridgeSecret, service, action, callbackId, argsJson) {
                return prompt(argsJson, 'gap:' + JSON.stringify([bridgeSecret, service, action, callbackId]));
            },
            setNativeToJsBridgeMode: function setNativeToJsBridgeMode(bridgeSecret, value) {
                prompt(value, 'gap_bridge_mode:' + bridgeSecret);
            },
            retrieveJsMessages: function retrieveJsMessages(bridgeSecret, fromOnlineEvent) {
                return prompt(+fromOnlineEvent, 'gap_poll:' + bridgeSecret);
            }
        };
    });
    // file: src/common/base64.js
    define("cordova/base64", function (require, exports, module) {

        var base64 = exports;

        base64.fromArrayBuffer = function (arrayBuffer) {
            var array = new Uint8Array(arrayBuffer);
            return uint8ToBase64(array);
        };

        base64.toArrayBuffer = function (str) {
            if (window && window.Buffer) {
                var decodedStr = typeof atob != 'undefined' ? atob(str) : new window.Buffer(str, 'base64').toString('binary');
            } else {
                var decodedStr = typeof atob != 'undefined' ? atob(str) : new global.Buffer(str, 'base64').toString('binary');
            }
            var arrayBuffer = new ArrayBuffer(decodedStr.length);
            var array = new Uint8Array(arrayBuffer);
            for (var i = 0, len = decodedStr.length; i < len; i++) {
                array[i] = decodedStr.charCodeAt(i);
            }
            return arrayBuffer;
        };

        function uint8ToBase64(rawData) {
            var numBytes = rawData.byteLength;
            var output = "";
            var segment;
            var table = b64_12bitTable();
            for (var i = 0; i < numBytes - 2; i += 3) {
                segment = (rawData[i] << 16) + (rawData[i + 1] << 8) + rawData[i + 2];
                output += table[segment >> 12];
                output += table[segment & 0xfff];
            }
            if (numBytes - i == 2) {
                segment = (rawData[i] << 16) + (rawData[i + 1] << 8);
                output += table[segment >> 12];
                output += b64_6bit[(segment & 0xfff) >> 6];
                output += '=';
            } else if (numBytes - i == 1) {
                segment = rawData[i] << 16;
                output += table[segment >> 12];
                output += '==';
            }
            return output;
        }
    });
    // file: src/common/channel.js
    define("cordova/channel", function (require, exports, module) {

        var utils = require('cordova/utils'),
            nextGuid = 1;
        /**
         * Custom pub-sub "channel" that can have functions subscribed to it
         * This object is used to define and control firing of events for
         * cordova initialization, as well as for custom events thereafter.
         *
         * The order of events during page load and Cordova startup is as follows:
         *
         * onDOMContentLoaded*         Internal event that is received when the web page is loaded and parsed.
         * onNativeReady*              Internal event that indicates the Cordova native side is ready.
         * onCordovaReady*             Internal event fired when all Cordova JavaScript objects have been created.
         * onDeviceReady*              User event fired to indicate that Cordova is ready
         * onResume                    User event fired to indicate a start/resume lifecycle event
         * onPause                     User event fired to indicate a pause lifecycle event
         *
         * The events marked with an * are sticky. Once they have fired, they will stay in the fired state.
         * All listeners that subscribe after the event is fired will be executed right away.
         *
         * The only Cordova events that user code should register for are:
         *      deviceready           Cordova native code is initialized and Cordova APIs can be called from JavaScript
         *      pause                 App has moved to background
         *      resume                App has returned to foreground
         *
         * Listeners can be registered as:
         *      document.addEventListener("deviceready", myDeviceReadyListener, false);
         *      document.addEventListener("resume", myResumeListener, false);
         *      document.addEventListener("pause", myPauseListener, false);
         *
         * The DOM lifecycle events should be used for saving and restoring state
         *      window.onload
         *      window.onunload
         *
         */

        /**
         * Channel
         * @constructor
         * @param type  String the channel name
         */

        var Channel = function Channel(type, sticky) {
            this.type = type;
            // Map of guid -> function. 
            this.handlers = {};
            // 0 = Non-sticky, 1 = Sticky non-fired, 2 = Sticky fired.
            this.state = sticky ? 1 : 0;
            // Used in sticky mode to remember args passed to fire().
            this.fireArgs = null;
            // Used by onHasSubscribersChange to know if there are any listeners.
            this.numHandlers = 0;
            // Function that is called when the first listener is subscribed, or when
            // the last listener is unsubscribed.
            this.onHasSubscribersChange = null;
        },
            channel = {
            /**
             * Calls the provided function only after all of the channels specified
             * have been fired. All channels must be sticky channels.
             */
            join: function join(h, c) {
                var len = c.length,
                    i = len,
                    f = function f() {
                    if (! --i) h();
                };
                for (var j = 0; j < len; j++) {
                    if (c[j].state === 0) {
                        throw Error('Can only use join with sticky channels.');
                    }
                    c[j].subscribe(f);
                }
                if (!len) h();
            },
            create: function create(type) {
                return channel[type] = new Channel(type, false);
            },
            createSticky: function createSticky(type) {
                return channel[type] = new Channel(type, true);
            },

            /**
             * cordova Channels that must fire before "deviceready" is fired.
             */
            deviceReadyChannelsArray: [],
            deviceReadyChannelsMap: {},

            /**
             * Indicate that a feature needs to be initialized before it is ready to be used.
             * This holds up Cordova's "deviceready" event until the feature has been initialized
             * and Cordova.initComplete(feature) is called.
             *
             * @param feature {String}     The unique feature name
             */
            waitForInitialization: function waitForInitialization(feature) {
                if (feature) {
                    var c = channel[feature] || this.createSticky(feature);
                    this.deviceReadyChannelsMap[feature] = c;
                    this.deviceReadyChannelsArray.push(c);
                }
            }
        };

        function forceFunction(f) {
            if (typeof f != 'function') throw "Function required as first argument!";
        }

        /**
         * Subscribes the given function to the channel. Any time that
         * Channel.fire is called so too will the function.
         * Optionally specify an execution context for the function
         * and a guid that can be used to stop subscribing to the channel.
         * Returns the guid.
         */
        Channel.prototype.subscribe = function (f, c) {
            // need a function to call
            forceFunction(f);
            if (this.state == 2) {
                f.apply(c || this, this.fireArgs);
                return;
            }

            var func = f,
                guid = f.observer_guid;
            if ((typeof c === 'undefined' ? 'undefined' : _typeof(c)) == "object") {
                func = utils.close(c, f);
            }

            if (!guid) {
                // first time any channel has seen this subscriber
                guid = '' + nextGuid++;
            }
            func.observer_guid = guid;
            f.observer_guid = guid;

            // Don't add the same handler more than once.
            if (!this.handlers[guid]) {
                this.handlers[guid] = func;
                this.numHandlers++;
                if (this.numHandlers == 1) {
                    this.onHasSubscribersChange && this.onHasSubscribersChange();
                }
            }
        };

        /**
         * Unsubscribes the function with the given guid from the channel.
         */
        Channel.prototype.unsubscribe = function (f) {
            // need a function to unsubscribe
            forceFunction(f);

            var guid = f.observer_guid,
                handler = this.handlers[guid];
            if (handler) {
                delete this.handlers[guid];
                this.numHandlers--;
                if (this.numHandlers === 0) {
                    this.onHasSubscribersChange && this.onHasSubscribersChange();
                }
            }
        };

        /**
         * Calls all functions subscribed to this channel.
         */
        Channel.prototype.fire = function (e) {
            var fail = false,
                fireArgs = Array.prototype.slice.call(arguments);
            // Apply stickiness.
            if (this.state == 1) {
                this.state = 2;
                this.fireArgs = fireArgs;
            }
            if (this.numHandlers) {
                // Copy the values first so that it is safe to modify it from within
                // callbacks.
                var toCall = [];
                for (var item in this.handlers) {
                    toCall.push(this.handlers[item]);
                }
                for (var i = 0; i < toCall.length; ++i) {
                    toCall[i].apply(this, fireArgs);
                }
                if (this.state == 2 && this.numHandlers) {
                    this.numHandlers = 0;
                    this.handlers = {};
                    this.onHasSubscribersChange && this.onHasSubscribersChange();
                }
            }
        };

        // defining them here so they are ready super fast!
        // DOM event that is received when the web page is loaded and parsed.
        channel.createSticky('onDOMContentLoaded');

        // Event to indicate the Cordova native side is ready.
        channel.createSticky('onNativeReady');

        // Event to indicate that all Cordova JavaScript objects have been created
        // and it's time to run plugin constructors.
        channel.createSticky('onCordovaReady');

        // Event to indicate that Cordova is ready
        channel.createSticky('onDeviceReady');

        // Event to indicate a resume lifecycle event
        channel.create('onResume');

        // Event to indicate a pause lifecycle event
        channel.create('onPause');

        channel.create('onCallback');

        // Channels that must fire before "deviceready" is fired.
        channel.waitForInitialization('onCordovaReady');
        channel.waitForInitialization('onDOMContentLoaded');

        module.exports = channel;
    });

    // file: /Users/steveng/repo/cordova/cordova-android/cordova-js-src/exec.js
    define("cordova/exec", function (require, exports, module) {
        var platform = require('cordova/platform');
        if (platform.id == 'android') {
            module.exports = require('cordova/moudleANDExec');
        } else {
            module.exports = require('cordova/moudleIOSExec');
        }
    });
    define("cordova/moudleANDExec", function (require, exports, module) {
        /**
         * Execute a cordova command.  It is up to the native side whether this action
         * is synchronous or asynchronous.  The native side can return:
         *      Synchronous: PluginResult object as a JSON string
         *      Asynchronous: Empty string ""
         * If async, the native side will cordova.callbackSuccess or cordova.callbackError,
         * depending upon the result of the action.
         *
         * @param {Function} success    The success callback
         * @param {Function} fail       The fail callback
         * @param {String} service      The name of the service to use
         * @param {String} action       Action to be run in cordova
         * @param {String[]} [args]     Zero or more arguments to pass to the method
         */
        var cordova = require('cordova'),
            nativeApiProvider = require('cordova/android/nativeapiprovider'),
            utils = require('cordova/utils'),
            base64 = require('cordova/base64'),
            channel = require('cordova/channel'),
            jsToNativeModes = {
            PROMPT: 0,
            JS_OBJECT: 1
        },
            nativeToJsModes = {
            // Polls for messages using the JS->Native bridge.
            POLLING: 0,
            // For LOAD_URL to be viable, it would need to have a work-around for
            // the bug where the soft-keyboard gets dismissed when a message is sent.
            LOAD_URL: 1,
            // For the ONLINE_EVENT to be viable, it would need to intercept all event
            // listeners (both through addEventListener and window.ononline) as well
            // as set the navigator property itself.
            ONLINE_EVENT: 2
        },
            jsToNativeBridgeMode,

        // Set lazily.
        nativeToJsBridgeMode = nativeToJsModes.ONLINE_EVENT,
            pollEnabled = false,
            bridgeSecret = -1;

        var messagesFromNative = [];
        var isProcessing = false;
        var resolvedPromise = typeof Promise == 'undefined' ? null : Promise.resolve();
        var nextTick = resolvedPromise ? function (fn) {
            resolvedPromise.then(fn);
        } : function (fn) {
            setTimeout(fn);
        };

        function androidExec(success, fail, service, action, args) {
            if (bridgeSecret < 0) {
                // If we ever catch this firing, we'll need to queue up exec()s
                // and fire them once we get a secret. For now, I don't think
                // it's possible for exec() to be called since plugins are parsed but
                // not run until until after onNativeReady.
                throw new Error('exec() called without bridgeSecret');
            }
            // Set default bridge modes if they have not already been set.
            // By default, we use the failsafe, since addJavascriptInterface breaks too often
            if (jsToNativeBridgeMode === undefined) {
                androidExec.setJsToNativeBridgeMode(jsToNativeModes.JS_OBJECT);
            }

            var callbackId = service + cordova.callbackId++,
                argsJson = JSON.stringify(args);

            if (success || fail) {
                cordova.callbacks[callbackId] = {
                    success: success,
                    fail: fail
                };
            }

            var msgs = nativeApiProvider.get().exec(bridgeSecret, service, action, callbackId, argsJson);
            // If argsJson was received by Java as null, try again with the PROMPT bridge mode.
            // This happens in rare circumstances, such as when certain Unicode characters are passed over the bridge on a Galaxy S2.  See CB-2666.
            if (jsToNativeBridgeMode == jsToNativeModes.JS_OBJECT && msgs === "@Null arguments.") {
                androidExec.setJsToNativeBridgeMode(jsToNativeModes.PROMPT); //0
                androidExec(success, fail, service, action, args);
                androidExec.setJsToNativeBridgeMode(jsToNativeModes.JS_OBJECT); //1
            } else if (msgs) {
                messagesFromNative.push(msgs);
                // Always process async to avoid exceptions messing up stack.
                nextTick(processMessages);
            }
        }

        androidExec.init = function () {
            if (AppPlatform != 'wap') {
                bridgeSecret = +prompt('', 'gap_init:' + nativeToJsBridgeMode);
            }
            channel.onNativeReady.fire();
        };

        function pollOnceFromOnlineEvent() {
            pollOnce(true);
        }
        document.addEventListener('visibilitychange', function () {
            pollOnce(true);
        });
        function pollOnce(opt_fromOnlineEvent) {
            if (bridgeSecret < 0) {
                // This can happen when the NativeToJsMessageQueue resets the online state on page transitions.
                // We know there's nothing to retrieve, so no need to poll.
                return;
            }
            var msgs = nativeApiProvider.get().retrieveJsMessages(bridgeSecret, !!opt_fromOnlineEvent);
            if (msgs) {
                messagesFromNative.push(msgs);
                // Process sync since we know we're already top-of-stack.
                processMessages();
            }
        }

        function pollingTimerFunc() {
            if (pollEnabled) {
                pollOnce();
                setTimeout(pollingTimerFunc, 50);
            }
        }
        function hookOnlineApis() {
            function proxyEvent(e) {
                cordova.fireWindowEvent(e.type);
            }
            // The network module takes care of firing online and offline events.
            // It currently fires them only on document though, so we bridge them
            // to window here (while first listening for exec()-releated online/offline
            // events).
            window.addEventListener('online', pollOnceFromOnlineEvent, false);
            window.addEventListener('offline', pollOnceFromOnlineEvent, false);
            cordova.addWindowEventHandler('online');
            cordova.addWindowEventHandler('offline');
            document.addEventListener('online', proxyEvent, false);
            document.addEventListener('offline', proxyEvent, false);
        }

        hookOnlineApis();
        androidExec.jsToNativeModes = jsToNativeModes;
        androidExec.nativeToJsModes = nativeToJsModes;

        androidExec.setJsToNativeBridgeMode = function (mode) {
            if (mode == jsToNativeModes.JS_OBJECT && !window._cordovaNative) {
                mode = jsToNativeModes.PROMPT;
            }
            nativeApiProvider.setPreferPrompt(mode == jsToNativeModes.PROMPT);
            jsToNativeBridgeMode = mode;
        };

        androidExec.setNativeToJsBridgeMode = function (mode) {
            if (mode == nativeToJsBridgeMode) {
                return;
            }
            if (nativeToJsBridgeMode == nativeToJsModes.POLLING) {
                pollEnabled = false;
            }

            nativeToJsBridgeMode = mode;
            // Tell the native side to switch modes.
            // Otherwise, it will be set by androidExec.init()
            if (bridgeSecret >= 0) {
                nativeApiProvider.get().setNativeToJsBridgeMode(bridgeSecret, mode);
            }

            if (mode == nativeToJsModes.POLLING) {
                pollEnabled = true;
                setTimeout(pollingTimerFunc, 1);
            }
        };

        function buildPayload(payload, message) {
            var payloadKind = message.charAt(0);
            if (payloadKind == 's') {
                payload.push(message.slice(1));
            } else if (payloadKind == 't') {
                payload.push(true);
            } else if (payloadKind == 'f') {
                payload.push(false);
            } else if (payloadKind == 'N') {
                payload.push(null);
            } else if (payloadKind == 'n') {
                payload.push(+message.slice(1));
            } else if (payloadKind == 'A') {
                var data = message.slice(1);
                payload.push(base64.toArrayBuffer(data));
            } else if (payloadKind == 'S') {
                payload.push(window.atob(message.slice(1)));
            } else if (payloadKind == 'M') {
                var multipartMessages = message.slice(1);
                while (multipartMessages !== "") {
                    var spaceIdx = multipartMessages.indexOf(' ');
                    var msgLen = +multipartMessages.slice(0, spaceIdx);
                    var multipartMessage = multipartMessages.substr(spaceIdx + 1, msgLen);
                    multipartMessages = multipartMessages.slice(spaceIdx + msgLen + 1);
                    buildPayload(payload, multipartMessage);
                }
            } else {
                payload.push(JSON.parse(message));
            }
        }

        // Processes a single message, as encoded by NativeToJsMessageQueue.java.
        function processMessage(message) {
            var firstChar = message.charAt(0);
            if (firstChar == 'J') {
                // This is deprecated on the .java side. It doesn't work with CSP enabled.
                eval(message.slice(1));
            } else if (firstChar == 'S' || firstChar == 'F') {
                var success = firstChar == 'S';
                var keepCallback = message.charAt(1) == '1';
                var spaceIdx = message.indexOf(' ', 2);
                var status = +message.slice(2, spaceIdx);
                var nextSpaceIdx = message.indexOf(' ', spaceIdx + 1);
                var callbackId = message.slice(spaceIdx + 1, nextSpaceIdx);
                var payloadMessage = message.slice(nextSpaceIdx + 1);
                var payload = [];
                buildPayload(payload, payloadMessage);
                cordova.callbackFromNative(callbackId, success, status, payload, keepCallback);
            } else {
                console.log("processMessage failed: invalid message: " + JSON.stringify(message));
            }
        }

        function processMessages() {
            // Check for the reentrant case.
            if (isProcessing) {
                return;
            }
            if (messagesFromNative.length === 0) {
                return;
            }
            isProcessing = true;
            try {
                var msg = popMessageFromQueue();
                // The Java side can send a * message to indicate that it
                // still has messages waiting to be retrieved.
                if (msg == '*' && messagesFromNative.length === 0) {
                    nextTick(pollOnce);
                    return;
                }
                processMessage(msg);
            } finally {
                isProcessing = false;
                if (messagesFromNative.length > 0) {
                    nextTick(processMessages);
                }
            }
        }

        function popMessageFromQueue() {
            var messageBatch = messagesFromNative.shift();
            if (messageBatch == '*') {
                return '*';
            }

            var spaceIdx = messageBatch.indexOf(' ');
            var msgLen = +messageBatch.slice(0, spaceIdx);
            var message = messageBatch.substr(spaceIdx + 1, msgLen);
            messageBatch = messageBatch.slice(spaceIdx + msgLen + 1);
            if (messageBatch) {
                messagesFromNative.unshift(messageBatch);
            }
            return message;
        }

        module.exports = androidExec;
    });
    define("cordova/moudleIOSExec", function (require, exports, module) {
        /**
          * Creates a gap bridge iframe used to notify the native code about queued
          * commands.
          */
        var cordova = require('cordova'),
            channel = require('cordova/channel'),
            utils = require('cordova/utils'),
            base64 = require('cordova/base64'),

        // XHR mode does not work on iOS 4.2.
        // XHR mode's main advantage is working around a bug in -webkit-scroll, which
        // doesn't exist only on iOS 5.x devices.
        // IFRAME_NAV is the fastest.
        // IFRAME_HASH could be made to enable synchronous bridge calls if we wanted this feature.
        jsToNativeModes = {
            IFRAME_NAV: 0, // Default. Uses a new iframe for each poke.
            // XHR bridge appears to be flaky sometimes: CB-3900, CB-3359, CB-5457, CB-4970, CB-4998, CB-5134
            XHR_NO_PAYLOAD: 1, // About the same speed as IFRAME_NAV. Performance not about the same as IFRAME_NAV, but more variable.
            XHR_WITH_PAYLOAD: 2, // Flakey, and not as performant
            XHR_OPTIONAL_PAYLOAD: 3, // Flakey, and not as performant
            IFRAME_HASH_NO_PAYLOAD: 4, // Not fully baked. A bit faster than IFRAME_NAV, but risks jank since poke happens synchronously.
            IFRAME_HASH_WITH_PAYLOAD: 5, // Slower than no payload. Maybe since it has to be URI encoded / decoded.
            WK_WEBVIEW_BINDING: 6 // Only way that works for WKWebView :)
        },
            bridgeMode,
            execIframe,
            execHashIframe,
            hashToggle = 1,
            execXhr,
            requestCount = 0,
            vcHeaderValue = null,
            commandQueue = [],
            // Contains pending JS->Native messages.
        isInContextOfEvalJs = 0,
            failSafeTimerId = 0;
        function shouldBundleCommandJson() {
            if (bridgeMode === jsToNativeModes.XHR_WITH_PAYLOAD) {
                return true;
            }
            if (bridgeMode === jsToNativeModes.XHR_OPTIONAL_PAYLOAD) {
                var payloadLength = 0;
                for (var i = 0; i < commandQueue.length; ++i) {
                    payloadLength += commandQueue[i].length;
                }
                // The value here was determined using the benchmark within CordovaLibApp on an iPad 3.
                return payloadLength < 4500;
            }
            return false;
        }

        function massageArgsJsToNative(args) {
            if (!args || utils.typeName(args) != 'Array') {
                return args;
            }
            var ret = [];
            args.forEach(function (arg, i) {
                if (utils.typeName(arg) == 'ArrayBuffer') {
                    ret.push({
                        'CDVType': 'ArrayBuffer',
                        'data': base64.fromArrayBuffer(arg)
                    });
                } else {
                    ret.push(arg);
                }
            });
            return ret;
        }

        function massageMessageNativeToJs(message) {
            if (message.CDVType == 'ArrayBuffer') {
                var stringToArrayBuffer = function stringToArrayBuffer(str) {
                    var ret = new Uint8Array(str.length);
                    for (var i = 0; i < str.length; i++) {
                        ret[i] = str.charCodeAt(i);
                    }
                    return ret.buffer;
                };
                var base64ToArrayBuffer = function base64ToArrayBuffer(b64) {
                    return stringToArrayBuffer(atob(b64));
                };
                message = base64ToArrayBuffer(message.data);
            }
            return message;
        }

        function convertMessageToArgsNativeToJs(message) {
            var args = [];
            if (!message || !message.hasOwnProperty('CDVType')) {
                args.push(message);
            } else if (message.CDVType == 'MultiPart') {
                message.messages.forEach(function (e) {
                    args.push(massageMessageNativeToJs(e));
                });
            } else {
                args.push(massageMessageNativeToJs(message));
            }
            return args;
        }

        function iOSExec() {
            if (bridgeMode === undefined) {
                bridgeMode = jsToNativeModes.IFRAME_NAV;
            }

            if (window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.cordova && window.webkit.messageHandlers.cordova.postMessage) {
                bridgeMode = jsToNativeModes.WK_WEBVIEW_BINDING;
            }

            var successCallback, failCallback, service, action, actionArgs, splitCommand;
            var callbackId = null;
            if (typeof arguments[0] !== "string") {
                // FORMAT ONE
                successCallback = arguments[0];
                failCallback = arguments[1];
                service = arguments[2];
                action = arguments[3];
                actionArgs = arguments[4];

                // Since we need to maintain backwards compatibility, we have to pass
                // an invalid callbackId even if no callback was provided since plugins
                // will be expecting it. The Cordova.exec() implementation allocates
                // an invalid callbackId and passes it even if no callbacks were given.
                callbackId = 'INVALID';
            } else {
                // FORMAT TWO, REMOVED
                try {
                    splitCommand = arguments[0].split(".");
                    action = splitCommand.pop();
                    service = splitCommand.join(".");
                    actionArgs = Array.prototype.splice.call(arguments, 1);

                    console.log('The old format of this exec call has been removed (deprecated since 2.1). Change to: ' + "cordova.exec(null, null, \"" + service + "\", \"" + action + "\"," + JSON.stringify(actionArgs) + ");");
                    return;
                } catch (e) {}
            }

            // If actionArgs is not provided, default to an empty array
            actionArgs = actionArgs || [];

            // Register the callbacks and add the callbackId to the positional
            // arguments if given.
            if (successCallback || failCallback) {
                callbackId = service + cordova.callbackId++;
                cordova.callbacks[callbackId] = { success: successCallback, fail: failCallback };
            }

            actionArgs = massageArgsJsToNative(actionArgs);

            var command = [callbackId, service, action, actionArgs];

            // Stringify and queue the command. We stringify to command now to
            // effectively clone the command arguments in case they are mutated before
            // the command is executed.
            commandQueue.push(JSON.stringify(command));

            if (bridgeMode === jsToNativeModes.WK_WEBVIEW_BINDING) {
                window.webkit.messageHandlers.cordova.postMessage(command);
            } else {
                // If we're in the context of a stringByEvaluatingJavaScriptFromString call,
                // then the queue will be flushed when it returns; no need for a poke.
                // Also, if there is already a command in the queue, then we've already
                // poked the native side, so there is no reason to do so again.
                if (!isInContextOfEvalJs && commandQueue.length == 1) {
                    pokeNative();
                }
            }
        }

        function pokeNative() {
            switch (bridgeMode) {
                case jsToNativeModes.XHR_NO_PAYLOAD:
                case jsToNativeModes.XHR_WITH_PAYLOAD:
                case jsToNativeModes.XHR_OPTIONAL_PAYLOAD:
                    pokeNativeViaXhr();
                    break;
                default:
                    // iframe-based.
                    pokeNativeViaIframe();
            }
        }

        function pokeNativeViaXhr() {
            // This prevents sending an XHR when there is already one being sent.
            // This should happen only in rare circumstances (refer to unit tests).
            if (execXhr && execXhr.readyState != 4) {
                execXhr = null;
            }
            // Re-using the XHR improves exec() performance by about 10%.
            execXhr = execXhr || new XMLHttpRequest();
            // Changing this to a GET will make the XHR reach the URIProtocol on 4.2.
            // For some reason it still doesn't work though...
            // Add a timestamp to the query param to prevent caching.
            execXhr.open('HEAD', "/!gap_exec?" + +new Date(), true);
            if (!vcHeaderValue) {
                //old 20170907 LXC  vcHeaderValue = /.*\((.*)\)$/.exec(navigator.userAgent)[1];
                vcHeaderValue = /.*\((.*)\)/.exec(navigator.userAgent)[1];
            }
            execXhr.setRequestHeader('vc', vcHeaderValue);
            execXhr.setRequestHeader('rc', ++requestCount);
            if (shouldBundleCommandJson()) {
                execXhr.setRequestHeader('cmds', iOSExec.nativeFetchMessages());
            }
            execXhr.send(null);
        }

        //ceshi start
        function pokeNativeViaIframe() {
            // CB-5488 - Don't attempt to create iframe before document.body is available.
            if (!document.body) {
                setTimeout(pokeNativeViaIframe);
                return;
            }
            if (bridgeMode === jsToNativeModes.IFRAME_HASH_NO_PAYLOAD || bridgeMode === jsToNativeModes.IFRAME_HASH_WITH_PAYLOAD) {
                // TODO: This bridge mode doesn't properly support being removed from the DOM (CB-7735)
                if (!execHashIframe) {
                    execHashIframe = document.createElement('iframe');
                    execHashIframe.style.display = 'none';
                    document.body.appendChild(execHashIframe);
                    // Hash changes don't work on about:blank, so switch it to file:///.
                    execHashIframe.contentWindow.history.replaceState(null, null, 'file:///#');
                }
                // The delegate method is called only when the hash changes, so toggle it back and forth.
                hashToggle = hashToggle ^ 3;
                var hashValue = '%0' + hashToggle;
                if (bridgeMode === jsToNativeModes.IFRAME_HASH_WITH_PAYLOAD) {
                    hashValue += iOSExec.nativeFetchMessages();
                }
                execHashIframe.contentWindow.location.hash = hashValue;
            } else {
                // Check if they've removed it from the DOM, and put it back if so.
                if (execIframe && execIframe.contentWindow) {
                    execIframe.contentWindow.location = 'gap://ready';
                } else {
                    execIframe = document.createElement('iframe');
                    execIframe.style.display = 'none';
                    execIframe.src = 'gap://ready';
                    document.body.appendChild(execIframe);
                }
                // Use a timer to protect against iframe being unloaded during the poke (CB-7735).
                // This makes the bridge ~ 7% slower, but works around the poke getting lost
                // when the iframe is removed from the DOM.
                // An onunload listener could be used in the case where the iframe has just been
                // created, but since unload events fire only once, it doesn't work in the normal
                // case of iframe reuse (where unload will have already fired due to the attempted
                // navigation of the page).
                failSafeTimerId = setTimeout(function () {
                    if (commandQueue.length) {
                        pokeNative();
                    }
                }, 50); // Making this > 0 improves performance (marginally) in the normal case (where it doesn't fire).
            }
        }
        //ceshi end

        iOSExec.jsToNativeModes = jsToNativeModes;

        iOSExec.nativeFetchMessages = function () {
            // Stop listing for window detatch once native side confirms poke.
            if (failSafeTimerId) {
                clearTimeout(failSafeTimerId);
                failSafeTimerId = 0;
            }
            // Each entry in commandQueue is a JSON string already.
            if (!commandQueue.length) {
                return '';
            }
            var json = '[' + commandQueue.join(',') + ']';
            commandQueue.length = 0;
            return json;
        };

        iOSExec.nativeCallback = function (callbackId, status, message, keepCallback) {
            return iOSExec.nativeEvalAndFetch(function () {
                var success = status === 0 || status === 1;
                var args = convertMessageToArgsNativeToJs(message);
                cordova.callbackFromNative(callbackId, success, status, args, keepCallback);
            });
        };

        iOSExec.nativeEvalAndFetch = function (func) {
            // This shouldn't be nested, but better to be safe.
            isInContextOfEvalJs++;
            try {
                func();
                return iOSExec.nativeFetchMessages();
            } finally {
                isInContextOfEvalJs--;
            }
        };

        module.exports = iOSExec;
    });

    // file: src/common/init.js
    define("cordova/init", function (require, exports, module) {

        var channel = require('cordova/channel');
        var cordova = require('cordova');
        var platform = require('cordova/platform');
        var utils = require('cordova/utils');

        var platformInitChannelsArray = [channel.onNativeReady];

        function logUnfiredChannels(arr) {
            for (var i = 0; i < arr.length; ++i) {
                if (arr[i].state != 2) {
                    console.log('Channel not fired: ' + arr[i].type);
                }
            }
        }

        window.setTimeout(function () {
            if (channel.onDeviceReady.state != 2) {
                console.log('deviceready has not fired after 5 seconds.');
                logUnfiredChannels(platformInitChannelsArray);
                logUnfiredChannels(channel.deviceReadyChannelsArray);
            }
        }, 5000);

        // Register pause, resume and deviceready channels as events on document.
        channel.onPause = cordova.addDocumentEventHandler('pause');
        channel.onResume = cordova.addDocumentEventHandler('resume');
        channel.onBack = cordova.addDocumentEventHandler('back');
        channel.onCallback = cordova.addDocumentEventHandler('callback');
        channel.onActivated = cordova.addDocumentEventHandler('activated');
        channel.onDeviceReady = cordova.addStickyDocumentEventHandler('deviceready');

        // Listen for DOMContentLoaded and notify our channel subscribers.
        if (document.readyState == 'complete' || document.readyState == 'interactive') {
            channel.onDOMContentLoaded.fire();
        } else {
            document.addEventListener('DOMContentLoaded', function () {
                channel.onDOMContentLoaded.fire();
            }, false);
        }

        // _nativeReady is global variable that the native side can set
        // to signify that the native code is ready. It is a global since
        // it may be called before any cordova JS is ready.
        if (window._nativeReady) {
            channel.onNativeReady.fire();
        }

        // Call the platform-specific initialization.
        platform.bootstrap && platform.bootstrap();
        /**
         * Create all cordova objects once native side is ready.
         */
        channel.join(function () {

            // Fire event to notify that all objects are created
            channel.onCordovaReady.fire();

            // Fire onDeviceReady event once page has fully loaded, all
            // constructors have run and cordova info has been received from native
            // side.
            channel.join(function () {
                require('cordova').fireDocumentEvent('deviceready');
            }, channel.deviceReadyChannelsArray);
        }, platformInitChannelsArray);
    });
    define("cordova/platform", function (require, exports, module) {
        var system = '';
        if (window.navigator.userAgent.match(/android/i)) {
            system = 'android';
        } else if (window.navigator.userAgent.match(/iPhone|iPad/i)) {
            system = 'ios';
        }
        module.exports = {
            id: system,
            bootstrap: function bootstrap() {
                var channel = require('cordova/channel'),
                    cordova = require('cordova'),
                    exec = require('cordova/exec');
                var APP_PLUGIN_NAME = "CoreAndroid";
                if (system == 'android') {
                    exec.init();
                    channel.onCordovaReady.subscribe(function () {
                        if (AppPlatform != 'wap') {
                            exec(onMessageFromNative, null, APP_PLUGIN_NAME, 'messageChannel', []);
                            exec(null, null, APP_PLUGIN_NAME, "show", []);
                        }
                    });
                } else {
                    require('cordova/channel').onNativeReady.fire();
                }
            }
        };
        function onMessageFromNative(msg) {
            var cordova = require('cordova');
            var action = msg.action;

            switch (action) {
                // Button events
                case 'backbutton':
                case 'menubutton':
                case 'searchbutton':
                // App life cycle events
                case 'pause':
                case 'resume':
                // Volume events
                case 'volumedownbutton':
                case 'volumeupbutton':
                case 'back':
                case 'callback':
                    cordova.fireDocumentEvent(action, msg.data);
                    break;
                default:
                    throw new Error('Unknown event action ' + action);
            }
        }
    });
    // file: src/common/utils.js
    define("cordova/utils", function (require, exports, module) {

        var utils = exports;
        utils.typeName = function (val) {
            return Object.prototype.toString.call(val).slice(8, -1);
        };
        /**
         * Returns a wrapped version of the function
         */
        utils.close = function (context, func, params) {
            return function () {
                var args = params || arguments;
                return func.apply(context, args);
            };
        };
    });
    define('cordova/Bridge', function (require, exports, module) {
        var exec = require('cordova/exec');
        cordova.exec = exec;
        var Bridge = {};
        function cb(cb, params) {
            params = params || '';
            if (!!cb) {
                cb(params);
            }
        }
        function matchUrl(url) {
            if (url && url.match(/^\/\/[\s\S]/)) {
                url = location.protocol + url;
            }
            return url;
        }
        Bridge = {
            appVersion: version,
            isLogin: function isLogin(ok, fail) {
                exec(ok, fail, "Login", "isLogin", []);
            },
            spLogin: function spLogin(ok, fail, param) {
                var isNeedRefreshParam = { isNeedRefresh: 'Y' };
                if (!param || param && param.refresh == true) {
                    if (system.android) {
                        exec(function (data) {
                            if (data.isLogined == 'Y') {
                                window.location.href = window.location.href;
                            }
                        }, fail, "Login", "showLoginView", []);
                    } else {
                        if (version < 101) {
                            exec(function (data) {
                                if (data.isLogined == 'Y') {
                                    window.location.href = window.location.href;
                                }
                            }, fail, "Login", "showLoginView", []);
                        } else {
                            exec(ok, fail, "Login", "showLoginView", [isNeedRefreshParam]);
                        }
                    }
                } else {
                    exec(ok, fail, "Login", "showLoginView", []);
                }
            },
            login: function login(ok, fail, param) {
                // {isNeedRefresh:'Y'}
                /*var isNeedRefreshParam = {isNeedRefresh:'Y'}
                Bridge.isLogin(function(data){
                    if(data && data.isLogined == 'Y'){
                        cb(ok,data)
                    }else{
                        if(!param || (param && param.refresh == true)){
                            if(system.android) {
                                exec(function(data){
                                    if(data.isLogined == 'Y'){
                                        window.location.href = window.location.href
                                    }
                                },fail, "Login", "showLoginView", []) 
                            }else{
                                if(version < 101){
                                    exec(function(data){
                                        if(data.isLogined == 'Y'){
                                            window.location.href = window.location.href
                                        }
                                    },fail, "Login", "showLoginView", []) 
                                }else{
                                    exec(ok, fail, "Login", "showLoginView", [isNeedRefreshParam])
                                } 
                            }
                        }else{
                            exec(ok, fail, "Login", "showLoginView", []) 
                        }
                        
                    }
                },function(err){
                    cb(fail,err)
                })*/
                var isNeedRefreshParam = { isNeedRefresh: 'Y' };
                if (!param || param && param.refresh == true) {
                    if (system.android) {
                        exec(function (data) {
                            if (data.isLogined == 'Y') {
                                window.location.href = window.location.href;
                            } else {
                                exec(null, null, "Route", "close", []);
                            }
                        }, fail, "Login", "showLoginView", []);
                    } else {
                        if (version < 101) {
                            exec(function (data) {
                                if (data.isLogined == 'Y') {
                                    window.location.href = window.location.href;
                                } else {
                                    exec(null, null, "Route", "close", []);
                                }
                            }, fail, "Login", "showLoginView", []);
                        } else {
                            exec(ok, fail, "Login", "showLoginView", [isNeedRefreshParam]);
                        }
                    }
                } else {
                    exec(ok, fail, "Login", "showLoginView", []);
                }
            },
            getUserInfo: function getUserInfo(ok, fail) {
                exec(ok, fail, "Login", "getUserInfo", []);
            },
            toast: function toast(ok, fail, args) {
                exec(ok, fail, "View", "toast", [args]);
            },
            callShareComp: function callShareComp(ok, fail, args) {
                if (args && !args.platform) {
                    args.platform = ['WeiBo', 'Wechat', 'WechatMoments', 'QQ', 'QZone', 'GomeMyFriends', 'GomeMoments', 'CopyLink'];
                }
                exec(ok, fail, "Share", "showNativeShareComponent", [args]);
            },
            fetch: function fetch(ok, fail, args) {
                if (args && args.type) {
                    args.method = args.method ? args.method : args.type;
                }
                exec(ok, fail, "Network", "sendRequest", [args]);
            },
            popWindow: function popWindow() {
                exec(null, null, "Route", "close", []);
            },
            pushWindow: function pushWindow(ok, fail, args) {
                if (args && args.match(/^\/\/[\s\S]/)) {
                    args = location.protocol + args;
                }
                exec(ok, fail, "Route", "open", [args]);
            },
            setHeadBar: function setHeadBar(ok, fail, args) {
                if (!args.title) {
                    args.title = document.title || 'Y';
                }
                if (!args.titleColor) {
                    args.titleColor = '333333';
                }
                if (!args.bgColor) {
                    args.bgColor = 'ffffff';
                }
                if (args.menus && args.menus.rightMenus) {
                    args.menus.rightMenus.forEach(function (item) {
                        if (item.type == 'share') {
                            if (!item.shareInfo.platform) {
                                item.shareInfo.platform = ['WeiBo', 'Wechat', 'WechatMoments', 'QQ', 'QZone', 'GomeMyFriends', 'GomeMoments', 'CopyLink'];
                            }
                        }
                    });
                }
                exec(ok, fail, "View", "initTitleBar", [args]);
            },
            getLocation: function getLocation(ok, fail) {
                exec(ok, fail, "Location", "getInfo", []);
            },
            getDeviceId: function getDeviceId(ok, fail) {
                exec(ok, fail, "Device", "getInfo", []);
            },
            // add
            showLoadingView: function showLoadingView(ok, fail, args) {
                exec(ok, fail, "View", "showLoading", [args]);
            },
            hideLoadingView: function hideLoadingView(ok, fail) {
                exec(ok, fail, "View", "hideLoading", []);
            },
            showErrorView: function showErrorView(ok, fail, args) {
                exec(ok, fail, "View", "showErrorView", [args]);
            },
            hideErrorView: function hideErrorView(ok, fail) {
                exec(ok, fail, "View", "hideErrorView", []);
            },
            getCMSKey: function getCMSKey(ok, fail) {
                exec(ok, fail, "Business", "getCMSKey", []);
            },
            finance: {
                encryptData: function encryptData(ok, fail, args) {
                    args.type = args.type ? args.type : '1';
                    exec(ok, fail, "Business", "getFinaceEncryptDecryptData", [args]);
                },
                decryptData: function decryptData(ok, fail, args) {
                    args.type = args.type ? args.type : '2';
                    exec(ok, fail, "Business", "getFinaceEncryptDecryptData", [args]);
                },
                //20170916 baitiao
                callFacePlusComp: function callFacePlusComp(ok, fail, args) {
                    exec(ok, fail, "Business", "openFaceCheckView", [args]);
                }
            },
            kefu: {
                init: function init(ok, fail, args) {
                    exec(ok, fail, "CustomerService", "initService", [args]);
                },
                open: function open(ok, fail, args) {
                    exec(ok, fail, "CustomerService", "openService", [args]);
                }
            },
            ready: function ready(ok, fail) {
                // document.addEventListener('deviceready',ok,false)
                var isShowCloseMenu = 'N';
                if (window.history.length > 2 || document.referrer !== '') {
                    isShowCloseMenu = "Y";
                } else {
                    isShowCloseMenu = "N";
                }
                var param = {
                    title: document.title || '',
                    titleColor: '333333',
                    bgColor: 'ffffff',
                    menus: {
                        isShowCloseMenu: isShowCloseMenu,
                        rightMenus: []
                    }
                };

                document.addEventListener('deviceready', function () {
                    Bridge.setHeadBar(ok, fail, param);
                });
                document.addEventListener('back', function () {
                    Bridge.setHeadBar(ok, fail, param);
                });
            },
            onActive: function onActive(ok) {
                document.addEventListener('resume', ok, false);
            },
            onPause: function onPause(ok) {
                document.addEventListener('pause', ok, false);
            },
            finishSendMsg: function finishSendMsg(ok, fail, args) {
                exec(ok, fail, "Business", "finishSendGetCouponResult", [args]);
            },
            saveStoreInfo: function saveStoreInfo(ok, fail, args) {
                exec(ok, fail, "Business", "saveStoreInfo", [args]);
            },
            //20170916 baitiao
            callContactComp: function callContactComp(ok, fail) {
                exec(ok, fail, 'Contacts', 'chooseContacts', []);
            },
            callPhotoComp: function callPhotoComp(ok, fail) {
                exec(ok, fail, "Picture", "showPictureComponent", []);
            },
            callUploadAddressContactsComp: function callUploadAddressContactsComp(ok, fail, args) {
                exec(ok, fail, "Business", "uploadAddressContacts", [args]);
            },
            //app version 101 之后不支持
            onShopCartRefresh: function onShopCartRefresh(ok, fail) {
                exec(ok, fail || null, 'ShoppingCart', 'refreshShoppingCart', []);
            },
            updateShopCart: function updateShopCart(ok, fail) {
                exec(ok, fail || null, 'ShoppingCart', 'refreshShoppingCart', []);
            },
            getNetworkType: function getNetworkType(ok, fail) {
                exec(ok || null, fail || null, "Network", "getStatus", []);
            },
            callTelephoneComp: function callTelephoneComp(ok, fail, args) {
                exec(ok || null, fail || null, "Device", "call", [args]);
            },
            onBackFromLastPage: function onBackFromLastPage(ok) {
                document.addEventListener('back', ok, false);
            },
            /* 以下接口客户端版本 103以上支持 */
            savePicture: function savePicture(ok, fail, args) {
                //支持格式 jpg.png.gif.pdf.bmp
                // 不支持双协议，不支持相对路径和base64压缩图片
                exec(ok || null, fail || null, "Picture", "save", [matchUrl(args)]);
            },
            showHeadBar: function showHeadBar(ok, fail) {
                exec(ok || null, fail || null, "View", "showTitleBar", []);
            },
            hideHeadBar: function hideHeadBar(ok, fail) {
                exec(ok || null, fail || null, "View", "hideTitleBar", []);
            },
            callCashierComp: function callCashierComp(ok, fail, args) {
                exec(ok || null, fail || null, 'Pay', 'openCashier', [args]);
            },
            business: {
                downloadElectronInvoice: function downloadElectronInvoice(ok, fail, args) {
                    exec(ok || null, fail || null, "Business", "downloadElectronInvoice", [args]);
                },
                openPayResultPage: function openPayResultPage(ok, fail, args) {
                    exec(ok || null, fail || null, "Pay", "openPayResultPage", [args]);
                }
            },
            onCallback: function onCallback(ok) {
                document.addEventListener('callback', ok || null);
            },
            //为国美管家接口提供接口
            callGJPayComp: function callGJPayComp(ok, fail, args) {
                exec(ok || null, fail || null, "GJPay", "pay", [args]);
            },
            // just for gomegj 国美管家
            plugin: {
                extend: function extend(ok, fail, className, functionName, args) {
                    exec(ok || null, fail || null, className, functionName, [args]);
                }
            }
            // Bridge.ready(null,null)
        };module.exports = Bridge;
    });

    window.cordova = require('cordova');
    // file: src/scripts/bootstrap.js
    require('cordova/init');
    module.exports = require('cordova/Bridge');
})();
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)(module), __webpack_require__(2)))

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (module) {
	if (!module.webpackPolyfill) {
		module.deprecate = function () {};
		module.paths = [];
		// module.parent = undefined by default
		if (!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function get() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function get() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var g;

// This works in non-strict mode
g = function () {
	return this;
}();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1, eval)("this");
} catch (e) {
	// This works if the window reference is available
	if ((typeof window === "undefined" ? "undefined" : _typeof(window)) === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;

/***/ })
/******/ ]);
});
//# sourceMappingURL=GomeJSBridge.js.map