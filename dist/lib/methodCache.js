"use strict";
/**
 * @module methodCache
 * Manages results cache for calls to server (via LRU cache)
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lru_cache_1 = __importDefault(require("lru-cache"));
const log_1 = require("./log");
exports.results = new Map();
exports.defaults = {
    max: 100,
    maxAge: 300 * 1000
};
/**
 * Set the instance to call methods on, with cached results.
 * @param instanceToUse Instance of a class
 */
function use(instanceToUse) {
    exports.instance = instanceToUse;
}
exports.use = use;
/**
 * Setup a cache for a method call.
 * @param method Method name, for index of cached results
 * @param options.max Maximum size of cache
 * @param options.maxAge Maximum age of cache
 */
function create(method, options = {}) {
    options = Object.assign(exports.defaults, options);
    exports.results.set(method, new lru_cache_1.default(options));
    return exports.results.get(method);
}
exports.create = create;
/**
 * Get results of a prior method call or call and cache.
 * @param method Method name, to call on instance in use
 * @param key Key to pass to method call and save results against
 */
function call(method, key) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!exports.results.has(method))
            create(method); // create as needed
        const methodCache = exports.results.get(method);
        if (methodCache.has(key)) {
            log_1.logger.debug(`[cache] Returning cached ${method}(${key})`);
            // return from cache if key has been used on method before
            return methodCache.get(key);
        }
        // call and cache for next time, returning results
        log_1.logger.debug(`[${method}] Caching new results of ${method}(${key})`);
        const result = yield Promise.resolve(exports.instance.call(method, key));
        methodCache.set(key, result);
        return result;
    });
}
exports.call = call;
/**
 * Proxy for checking if method has been cached.
 * Cache may exist from manual creation, or prior call.
 * @param method Method name for cache to get
 */
function has(method) {
    return exports.results.has(method);
}
exports.has = has;
/**
 * Get results of a prior method call.
 * @param method Method name for cache to get
 * @param key Key for method result set to return
 */
function get(method, key) {
    if (exports.results.has(method))
        return exports.results.get(method).get(key);
}
exports.get = get;
/**
 * Reset a cached method call's results (all or only for given key).
 * @param method Method name for cache to clear
 * @param key Key for method result set to clear
 */
function reset(method, key) {
    if (exports.results.has(method)) {
        if (key)
            return exports.results.get(method).del(key);
        else
            return exports.results.get(method).reset();
    }
}
exports.reset = reset;
/** Reset cached results for all methods. */
function resetAll() {
    exports.results.forEach((cache) => cache.reset());
}
exports.resetAll = resetAll;
//# sourceMappingURL=methodCache.js.map