
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
var app = (function () {
    'use strict';

    function noop$3() { }
    const identity$4 = x => x;
    function add_location(element, file, line, column, char) {
        element.__svelte_meta = {
            loc: { file, line, column, char }
        };
    }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }
    let src_url_equal_anchor;
    function src_url_equal(element_src, url) {
        if (!src_url_equal_anchor) {
            src_url_equal_anchor = document.createElement('a');
        }
        src_url_equal_anchor.href = url;
        return element_src === src_url_equal_anchor.href;
    }
    function is_empty(obj) {
        return Object.keys(obj).length === 0;
    }
    function validate_store(store, name) {
        if (store != null && typeof store.subscribe !== 'function') {
            throw new Error(`'${name}' is not a store with a 'subscribe' method`);
        }
    }
    function subscribe(store, ...callbacks) {
        if (store == null) {
            return noop$3;
        }
        const unsub = store.subscribe(...callbacks);
        return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
    }
    function get_store_value(store) {
        let value;
        subscribe(store, _ => value = _)();
        return value;
    }
    function component_subscribe(component, store, callback) {
        component.$$.on_destroy.push(subscribe(store, callback));
    }
    function set_store_value(store, ret, value) {
        store.set(value);
        return ret;
    }
    function append(target, node) {
        target.appendChild(node);
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        node.parentNode.removeChild(node);
    }
    function destroy_each(iterations, detaching) {
        for (let i = 0; i < iterations.length; i += 1) {
            if (iterations[i])
                iterations[i].d(detaching);
        }
    }
    function element(name) {
        return document.createElement(name);
    }
    function svg_element(name) {
        return document.createElementNS('http://www.w3.org/2000/svg', name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function empty$1() {
        return text('');
    }
    function listen(node, event, handler, options) {
        node.addEventListener(event, handler, options);
        return () => node.removeEventListener(event, handler, options);
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else if (node.getAttribute(attribute) !== value)
            node.setAttribute(attribute, value);
    }
    function time_ranges_to_array(ranges) {
        const array = [];
        for (let i = 0; i < ranges.length; i += 1) {
            array.push({ start: ranges.start(i), end: ranges.end(i) });
        }
        return array;
    }
    function children$1(element) {
        return Array.from(element.childNodes);
    }
    function set_input_value(input, value) {
        input.value = value == null ? '' : value;
    }
    function set_style(node, key, value, important) {
        node.style.setProperty(key, value, important ? 'important' : '');
    }
    function select_option(select, value) {
        for (let i = 0; i < select.options.length; i += 1) {
            const option = select.options[i];
            if (option.__value === value) {
                option.selected = true;
                return;
            }
        }
        select.selectedIndex = -1; // no option should be selected
    }
    function select_value(select) {
        const selected_option = select.querySelector(':checked') || select.options[0];
        return selected_option && selected_option.__value;
    }
    function toggle_class(element, name, toggle) {
        element.classList[toggle ? 'add' : 'remove'](name);
    }
    function custom_event(type, detail, bubbles = false) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, bubbles, false, detail);
        return e;
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }
    function get_current_component() {
        if (!current_component)
            throw new Error('Function called outside component initialization');
        return current_component;
    }
    function onMount(fn) {
        get_current_component().$$.on_mount.push(fn);
    }
    function afterUpdate(fn) {
        get_current_component().$$.after_update.push(fn);
    }

    const dirty_components = [];
    const binding_callbacks = [];
    const render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    let flushing = false;
    const seen_callbacks = new Set();
    function flush() {
        if (flushing)
            return;
        flushing = true;
        do {
            // first, call beforeUpdate functions
            // and update components
            for (let i = 0; i < dirty_components.length; i += 1) {
                const component = dirty_components[i];
                set_current_component(component);
                update(component.$$);
            }
            set_current_component(null);
            dirty_components.length = 0;
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                    callback();
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
        flushing = false;
        seen_callbacks.clear();
    }
    function update($$) {
        if ($$.fragment !== null) {
            $$.update();
            run_all($$.before_update);
            const dirty = $$.dirty;
            $$.dirty = [-1];
            $$.fragment && $$.fragment.p($$.ctx, dirty);
            $$.after_update.forEach(add_render_callback);
        }
    }
    const outroing = new Set();
    let outros;
    function group_outros() {
        outros = {
            r: 0,
            c: [],
            p: outros // parent group
        };
    }
    function check_outros() {
        if (!outros.r) {
            run_all(outros.c);
        }
        outros = outros.p;
    }
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function transition_out(block, local, detach, callback) {
        if (block && block.o) {
            if (outroing.has(block))
                return;
            outroing.add(block);
            outros.c.push(() => {
                outroing.delete(block);
                if (callback) {
                    if (detach)
                        block.d(1);
                    callback();
                }
            });
            block.o(local);
        }
    }

    const globals = (typeof window !== 'undefined'
        ? window
        : typeof globalThis !== 'undefined'
            ? globalThis
            : global);
    function create_component(block) {
        block && block.c();
    }
    function mount_component(component, target, anchor, customElement) {
        const { fragment, on_mount, on_destroy, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
        if (!customElement) {
            // onMount happens before the initial afterUpdate
            add_render_callback(() => {
                const new_on_destroy = on_mount.map(run).filter(is_function);
                if (on_destroy) {
                    on_destroy.push(...new_on_destroy);
                }
                else {
                    // Edge case - component was destroyed immediately,
                    // most likely as a result of a binding initialising
                    run_all(new_on_destroy);
                }
                component.$$.on_mount = [];
            });
        }
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        const $$ = component.$$;
        if ($$.fragment !== null) {
            run_all($$.on_destroy);
            $$.fragment && $$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            $$.on_destroy = $$.fragment = null;
            $$.ctx = [];
        }
    }
    function make_dirty(component, i) {
        if (component.$$.dirty[0] === -1) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty.fill(0);
        }
        component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
    }
    function init$1(component, options, instance, create_fragment, not_equal, props, append_styles, dirty = [-1]) {
        const parent_component = current_component;
        set_current_component(component);
        const $$ = component.$$ = {
            fragment: null,
            ctx: null,
            // state
            props,
            update: noop$3,
            not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            on_disconnect: [],
            before_update: [],
            after_update: [],
            context: new Map(options.context || (parent_component ? parent_component.$$.context : [])),
            // everything else
            callbacks: blank_object(),
            dirty,
            skip_bound: false,
            root: options.target || parent_component.$$.root
        };
        append_styles && append_styles($$.root);
        let ready = false;
        $$.ctx = instance
            ? instance(component, options.props || {}, (i, ret, ...rest) => {
                const value = rest.length ? rest[0] : ret;
                if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                    if (!$$.skip_bound && $$.bound[i])
                        $$.bound[i](value);
                    if (ready)
                        make_dirty(component, i);
                }
                return ret;
            })
            : [];
        $$.update();
        ready = true;
        run_all($$.before_update);
        // `false` as a special case of no DOM component
        $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
        if (options.target) {
            if (options.hydrate) {
                const nodes = children$1(options.target);
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.l(nodes);
                nodes.forEach(detach);
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor, options.customElement);
            flush();
        }
        set_current_component(parent_component);
    }
    /**
     * Base class for Svelte components. Used when dev=false.
     */
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop$3;
        }
        $on(type, callback) {
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set($$props) {
            if (this.$$set && !is_empty($$props)) {
                this.$$.skip_bound = true;
                this.$$set($$props);
                this.$$.skip_bound = false;
            }
        }
    }

    function dispatch_dev(type, detail) {
        document.dispatchEvent(custom_event(type, Object.assign({ version: '3.44.0' }, detail), true));
    }
    function append_dev(target, node) {
        dispatch_dev('SvelteDOMInsert', { target, node });
        append(target, node);
    }
    function insert_dev(target, node, anchor) {
        dispatch_dev('SvelteDOMInsert', { target, node, anchor });
        insert(target, node, anchor);
    }
    function detach_dev(node) {
        dispatch_dev('SvelteDOMRemove', { node });
        detach(node);
    }
    function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation) {
        const modifiers = options === true ? ['capture'] : options ? Array.from(Object.keys(options)) : [];
        if (has_prevent_default)
            modifiers.push('preventDefault');
        if (has_stop_propagation)
            modifiers.push('stopPropagation');
        dispatch_dev('SvelteDOMAddEventListener', { node, event, handler, modifiers });
        const dispose = listen(node, event, handler, options);
        return () => {
            dispatch_dev('SvelteDOMRemoveEventListener', { node, event, handler, modifiers });
            dispose();
        };
    }
    function attr_dev(node, attribute, value) {
        attr(node, attribute, value);
        if (value == null)
            dispatch_dev('SvelteDOMRemoveAttribute', { node, attribute });
        else
            dispatch_dev('SvelteDOMSetAttribute', { node, attribute, value });
    }
    function set_data_dev(text, data) {
        data = '' + data;
        if (text.wholeText === data)
            return;
        dispatch_dev('SvelteDOMSetData', { node: text, data });
        text.data = data;
    }
    function validate_each_argument(arg) {
        if (typeof arg !== 'string' && !(arg && typeof arg === 'object' && 'length' in arg)) {
            let msg = '{#each} only iterates over array-like objects.';
            if (typeof Symbol === 'function' && arg && Symbol.iterator in arg) {
                msg += ' You can use a spread to convert this iterable into an array.';
            }
            throw new Error(msg);
        }
    }
    function validate_slots(name, slot, keys) {
        for (const slot_key of Object.keys(slot)) {
            if (!~keys.indexOf(slot_key)) {
                console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
            }
        }
    }
    /**
     * Base class for Svelte components with some minor dev-enhancements. Used when dev=true.
     */
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error("'target' is a required option");
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn('Component was already destroyed'); // eslint-disable-line no-console
            };
        }
        $capture_state() { }
        $inject_state() { }
    }

    const subscriber_queue = [];
    /**
     * Creates a `Readable` store that allows reading by subscription.
     * @param value initial value
     * @param {StartStopNotifier}start start and stop notifications for subscriptions
     */
    function readable(value, start) {
        return {
            subscribe: writable(value, start).subscribe
        };
    }
    /**
     * Create a `Writable` store that allows both updating and reading by subscription.
     * @param {*=}value initial value
     * @param {StartStopNotifier=}start start and stop notifications for subscriptions
     */
    function writable(value, start = noop$3) {
        let stop;
        const subscribers = new Set();
        function set(new_value) {
            if (safe_not_equal(value, new_value)) {
                value = new_value;
                if (stop) { // store is ready
                    const run_queue = !subscriber_queue.length;
                    for (const subscriber of subscribers) {
                        subscriber[1]();
                        subscriber_queue.push(subscriber, value);
                    }
                    if (run_queue) {
                        for (let i = 0; i < subscriber_queue.length; i += 2) {
                            subscriber_queue[i][0](subscriber_queue[i + 1]);
                        }
                        subscriber_queue.length = 0;
                    }
                }
            }
        }
        function update(fn) {
            set(fn(value));
        }
        function subscribe(run, invalidate = noop$3) {
            const subscriber = [run, invalidate];
            subscribers.add(subscriber);
            if (subscribers.size === 1) {
                stop = start(set) || noop$3;
            }
            run(value);
            return () => {
                subscribers.delete(subscriber);
                if (subscribers.size === 0) {
                    stop();
                    stop = null;
                }
            };
        }
        return { set, update, subscribe };
    }

    let pageState = writable('gallery');
    let selectedImage = writable(null);
    let gazerRecordingTraining = writable([]);
    let gazerRecordingArt = writable([]);

    let gazerInitVideoDone = writable(false);
    let calibrationPct = writable(null);
    let calibrationCutoff = readable(10);
    let stateIndex = writable(0);
    let loadingInd = writable(true);

    let artworkID = writable('mehretuUntitled');
    let sessionID = writable(null);

    let screenWidth = writable(null);
    let screenHeight = writable(null);

    var screenSize = () => {
      const windowW = window.innerWidth,
        windowH = window.innerHeight,
        screens = {
          mobile: windowW < 640,
          sm: windowW >= 640 && windowW < 768,
          md: windowW >= 768 && windowW < 1024,
          lg: windowW >= 1024 && windowW < 1100,
          medLg: windowW >= 1100 && windowW < 1280,
          xl: windowW >= 1280 && windowW < 1536,
          '2xl': windowW >= 1536,
        },
        screenSize = Object.keys(screens).filter((val) => screens[val])[0];

      return {
        windowW: windowW,
        windowH: windowH,
        screens: screens,
        screenSize: screenSize,
      };
    };

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */

    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

    function __values(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m) return m.call(o);
        if (o && typeof o.length === "number") return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }

    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    }

    function __spreadArray(to, from, pack) {
        if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
            if (ar || !(i in from)) {
                if (!ar) ar = Array.prototype.slice.call(from, 0, i);
                ar[i] = from[i];
            }
        }
        return to.concat(ar || Array.prototype.slice.call(from));
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * @fileoverview Firebase constants.  Some of these (@defines) can be overridden at compile-time.
     */
    const CONSTANTS = {
        /**
         * @define {boolean} Whether this is the client Node.js SDK.
         */
        NODE_CLIENT: false,
        /**
         * @define {boolean} Whether this is the Admin Node.js SDK.
         */
        NODE_ADMIN: false,
        /**
         * Firebase SDK Version
         */
        SDK_VERSION: '${JSCORE_VERSION}'
    };

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * Throws an error if the provided assertion is falsy
     */
    const assert = function (assertion, message) {
        if (!assertion) {
            throw assertionError(message);
        }
    };
    /**
     * Returns an Error object suitable for throwing.
     */
    const assertionError = function (message) {
        return new Error('Firebase Database (' +
            CONSTANTS.SDK_VERSION +
            ') INTERNAL ASSERT FAILED: ' +
            message);
    };

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    const stringToByteArray$1 = function (str) {
        // TODO(user): Use native implementations if/when available
        const out = [];
        let p = 0;
        for (let i = 0; i < str.length; i++) {
            let c = str.charCodeAt(i);
            if (c < 128) {
                out[p++] = c;
            }
            else if (c < 2048) {
                out[p++] = (c >> 6) | 192;
                out[p++] = (c & 63) | 128;
            }
            else if ((c & 0xfc00) === 0xd800 &&
                i + 1 < str.length &&
                (str.charCodeAt(i + 1) & 0xfc00) === 0xdc00) {
                // Surrogate Pair
                c = 0x10000 + ((c & 0x03ff) << 10) + (str.charCodeAt(++i) & 0x03ff);
                out[p++] = (c >> 18) | 240;
                out[p++] = ((c >> 12) & 63) | 128;
                out[p++] = ((c >> 6) & 63) | 128;
                out[p++] = (c & 63) | 128;
            }
            else {
                out[p++] = (c >> 12) | 224;
                out[p++] = ((c >> 6) & 63) | 128;
                out[p++] = (c & 63) | 128;
            }
        }
        return out;
    };
    /**
     * Turns an array of numbers into the string given by the concatenation of the
     * characters to which the numbers correspond.
     * @param bytes Array of numbers representing characters.
     * @return Stringification of the array.
     */
    const byteArrayToString = function (bytes) {
        // TODO(user): Use native implementations if/when available
        const out = [];
        let pos = 0, c = 0;
        while (pos < bytes.length) {
            const c1 = bytes[pos++];
            if (c1 < 128) {
                out[c++] = String.fromCharCode(c1);
            }
            else if (c1 > 191 && c1 < 224) {
                const c2 = bytes[pos++];
                out[c++] = String.fromCharCode(((c1 & 31) << 6) | (c2 & 63));
            }
            else if (c1 > 239 && c1 < 365) {
                // Surrogate Pair
                const c2 = bytes[pos++];
                const c3 = bytes[pos++];
                const c4 = bytes[pos++];
                const u = (((c1 & 7) << 18) | ((c2 & 63) << 12) | ((c3 & 63) << 6) | (c4 & 63)) -
                    0x10000;
                out[c++] = String.fromCharCode(0xd800 + (u >> 10));
                out[c++] = String.fromCharCode(0xdc00 + (u & 1023));
            }
            else {
                const c2 = bytes[pos++];
                const c3 = bytes[pos++];
                out[c++] = String.fromCharCode(((c1 & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
            }
        }
        return out.join('');
    };
    // We define it as an object literal instead of a class because a class compiled down to es5 can't
    // be treeshaked. https://github.com/rollup/rollup/issues/1691
    // Static lookup maps, lazily populated by init_()
    const base64 = {
        /**
         * Maps bytes to characters.
         */
        byteToCharMap_: null,
        /**
         * Maps characters to bytes.
         */
        charToByteMap_: null,
        /**
         * Maps bytes to websafe characters.
         * @private
         */
        byteToCharMapWebSafe_: null,
        /**
         * Maps websafe characters to bytes.
         * @private
         */
        charToByteMapWebSafe_: null,
        /**
         * Our default alphabet, shared between
         * ENCODED_VALS and ENCODED_VALS_WEBSAFE
         */
        ENCODED_VALS_BASE: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' + 'abcdefghijklmnopqrstuvwxyz' + '0123456789',
        /**
         * Our default alphabet. Value 64 (=) is special; it means "nothing."
         */
        get ENCODED_VALS() {
            return this.ENCODED_VALS_BASE + '+/=';
        },
        /**
         * Our websafe alphabet.
         */
        get ENCODED_VALS_WEBSAFE() {
            return this.ENCODED_VALS_BASE + '-_.';
        },
        /**
         * Whether this browser supports the atob and btoa functions. This extension
         * started at Mozilla but is now implemented by many browsers. We use the
         * ASSUME_* variables to avoid pulling in the full useragent detection library
         * but still allowing the standard per-browser compilations.
         *
         */
        HAS_NATIVE_SUPPORT: typeof atob === 'function',
        /**
         * Base64-encode an array of bytes.
         *
         * @param input An array of bytes (numbers with
         *     value in [0, 255]) to encode.
         * @param webSafe Boolean indicating we should use the
         *     alternative alphabet.
         * @return The base64 encoded string.
         */
        encodeByteArray(input, webSafe) {
            if (!Array.isArray(input)) {
                throw Error('encodeByteArray takes an array as a parameter');
            }
            this.init_();
            const byteToCharMap = webSafe
                ? this.byteToCharMapWebSafe_
                : this.byteToCharMap_;
            const output = [];
            for (let i = 0; i < input.length; i += 3) {
                const byte1 = input[i];
                const haveByte2 = i + 1 < input.length;
                const byte2 = haveByte2 ? input[i + 1] : 0;
                const haveByte3 = i + 2 < input.length;
                const byte3 = haveByte3 ? input[i + 2] : 0;
                const outByte1 = byte1 >> 2;
                const outByte2 = ((byte1 & 0x03) << 4) | (byte2 >> 4);
                let outByte3 = ((byte2 & 0x0f) << 2) | (byte3 >> 6);
                let outByte4 = byte3 & 0x3f;
                if (!haveByte3) {
                    outByte4 = 64;
                    if (!haveByte2) {
                        outByte3 = 64;
                    }
                }
                output.push(byteToCharMap[outByte1], byteToCharMap[outByte2], byteToCharMap[outByte3], byteToCharMap[outByte4]);
            }
            return output.join('');
        },
        /**
         * Base64-encode a string.
         *
         * @param input A string to encode.
         * @param webSafe If true, we should use the
         *     alternative alphabet.
         * @return The base64 encoded string.
         */
        encodeString(input, webSafe) {
            // Shortcut for Mozilla browsers that implement
            // a native base64 encoder in the form of "btoa/atob"
            if (this.HAS_NATIVE_SUPPORT && !webSafe) {
                return btoa(input);
            }
            return this.encodeByteArray(stringToByteArray$1(input), webSafe);
        },
        /**
         * Base64-decode a string.
         *
         * @param input to decode.
         * @param webSafe True if we should use the
         *     alternative alphabet.
         * @return string representing the decoded value.
         */
        decodeString(input, webSafe) {
            // Shortcut for Mozilla browsers that implement
            // a native base64 encoder in the form of "btoa/atob"
            if (this.HAS_NATIVE_SUPPORT && !webSafe) {
                return atob(input);
            }
            return byteArrayToString(this.decodeStringToByteArray(input, webSafe));
        },
        /**
         * Base64-decode a string.
         *
         * In base-64 decoding, groups of four characters are converted into three
         * bytes.  If the encoder did not apply padding, the input length may not
         * be a multiple of 4.
         *
         * In this case, the last group will have fewer than 4 characters, and
         * padding will be inferred.  If the group has one or two characters, it decodes
         * to one byte.  If the group has three characters, it decodes to two bytes.
         *
         * @param input Input to decode.
         * @param webSafe True if we should use the web-safe alphabet.
         * @return bytes representing the decoded value.
         */
        decodeStringToByteArray(input, webSafe) {
            this.init_();
            const charToByteMap = webSafe
                ? this.charToByteMapWebSafe_
                : this.charToByteMap_;
            const output = [];
            for (let i = 0; i < input.length;) {
                const byte1 = charToByteMap[input.charAt(i++)];
                const haveByte2 = i < input.length;
                const byte2 = haveByte2 ? charToByteMap[input.charAt(i)] : 0;
                ++i;
                const haveByte3 = i < input.length;
                const byte3 = haveByte3 ? charToByteMap[input.charAt(i)] : 64;
                ++i;
                const haveByte4 = i < input.length;
                const byte4 = haveByte4 ? charToByteMap[input.charAt(i)] : 64;
                ++i;
                if (byte1 == null || byte2 == null || byte3 == null || byte4 == null) {
                    throw Error();
                }
                const outByte1 = (byte1 << 2) | (byte2 >> 4);
                output.push(outByte1);
                if (byte3 !== 64) {
                    const outByte2 = ((byte2 << 4) & 0xf0) | (byte3 >> 2);
                    output.push(outByte2);
                    if (byte4 !== 64) {
                        const outByte3 = ((byte3 << 6) & 0xc0) | byte4;
                        output.push(outByte3);
                    }
                }
            }
            return output;
        },
        /**
         * Lazy static initialization function. Called before
         * accessing any of the static map variables.
         * @private
         */
        init_() {
            if (!this.byteToCharMap_) {
                this.byteToCharMap_ = {};
                this.charToByteMap_ = {};
                this.byteToCharMapWebSafe_ = {};
                this.charToByteMapWebSafe_ = {};
                // We want quick mappings back and forth, so we precompute two maps.
                for (let i = 0; i < this.ENCODED_VALS.length; i++) {
                    this.byteToCharMap_[i] = this.ENCODED_VALS.charAt(i);
                    this.charToByteMap_[this.byteToCharMap_[i]] = i;
                    this.byteToCharMapWebSafe_[i] = this.ENCODED_VALS_WEBSAFE.charAt(i);
                    this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[i]] = i;
                    // Be forgiving when decoding and correctly decode both encodings.
                    if (i >= this.ENCODED_VALS_BASE.length) {
                        this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(i)] = i;
                        this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(i)] = i;
                    }
                }
            }
        }
    };
    /**
     * URL-safe base64 encoding
     */
    const base64Encode = function (str) {
        const utf8Bytes = stringToByteArray$1(str);
        return base64.encodeByteArray(utf8Bytes, true);
    };
    /**
     * URL-safe base64 decoding
     *
     * NOTE: DO NOT use the global atob() function - it does NOT support the
     * base64Url variant encoding.
     *
     * @param str To be decoded
     * @return Decoded result, if possible
     */
    const base64Decode = function (str) {
        try {
            return base64.decodeString(str, true);
        }
        catch (e) {
            console.error('base64Decode failed: ', e);
        }
        return null;
    };

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * Do a deep-copy of basic JavaScript Objects or Arrays.
     */
    function deepCopy(value) {
        return deepExtend(undefined, value);
    }
    /**
     * Copy properties from source to target (recursively allows extension
     * of Objects and Arrays).  Scalar values in the target are over-written.
     * If target is undefined, an object of the appropriate type will be created
     * (and returned).
     *
     * We recursively copy all child properties of plain Objects in the source- so
     * that namespace- like dictionaries are merged.
     *
     * Note that the target can be a function, in which case the properties in
     * the source Object are copied onto it as static properties of the Function.
     *
     * Note: we don't merge __proto__ to prevent prototype pollution
     */
    function deepExtend(target, source) {
        if (!(source instanceof Object)) {
            return source;
        }
        switch (source.constructor) {
            case Date:
                // Treat Dates like scalars; if the target date object had any child
                // properties - they will be lost!
                const dateValue = source;
                return new Date(dateValue.getTime());
            case Object:
                if (target === undefined) {
                    target = {};
                }
                break;
            case Array:
                // Always copy the array source and overwrite the target.
                target = [];
                break;
            default:
                // Not a plain Object - treat it as a scalar.
                return source;
        }
        for (const prop in source) {
            // use isValidKey to guard against prototype pollution. See https://snyk.io/vuln/SNYK-JS-LODASH-450202
            if (!source.hasOwnProperty(prop) || !isValidKey$1(prop)) {
                continue;
            }
            target[prop] = deepExtend(target[prop], source[prop]);
        }
        return target;
    }
    function isValidKey$1(key) {
        return key !== '__proto__';
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    class Deferred {
        constructor() {
            this.reject = () => { };
            this.resolve = () => { };
            this.promise = new Promise((resolve, reject) => {
                this.resolve = resolve;
                this.reject = reject;
            });
        }
        /**
         * Our API internals are not promiseified and cannot because our callback APIs have subtle expectations around
         * invoking promises inline, which Promises are forbidden to do. This method accepts an optional node-style callback
         * and returns a node-style callback which will resolve or reject the Deferred's promise.
         */
        wrapCallback(callback) {
            return (error, value) => {
                if (error) {
                    this.reject(error);
                }
                else {
                    this.resolve(value);
                }
                if (typeof callback === 'function') {
                    // Attaching noop handler just in case developer wasn't expecting
                    // promises
                    this.promise.catch(() => { });
                    // Some of our callbacks don't expect a value and our own tests
                    // assert that the parameter length is 1
                    if (callback.length === 1) {
                        callback(error);
                    }
                    else {
                        callback(error, value);
                    }
                }
            };
        }
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * Returns navigator.userAgent string or '' if it's not defined.
     * @return user agent string
     */
    function getUA() {
        if (typeof navigator !== 'undefined' &&
            typeof navigator['userAgent'] === 'string') {
            return navigator['userAgent'];
        }
        else {
            return '';
        }
    }
    /**
     * Detect Cordova / PhoneGap / Ionic frameworks on a mobile device.
     *
     * Deliberately does not rely on checking `file://` URLs (as this fails PhoneGap
     * in the Ripple emulator) nor Cordova `onDeviceReady`, which would normally
     * wait for a callback.
     */
    function isMobileCordova() {
        return (typeof window !== 'undefined' &&
            // @ts-ignore Setting up an broadly applicable index signature for Window
            // just to deal with this case would probably be a bad idea.
            !!(window['cordova'] || window['phonegap'] || window['PhoneGap']) &&
            /ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(getUA()));
    }
    /**
     * Detect React Native.
     *
     * @return true if ReactNative environment is detected.
     */
    function isReactNative() {
        return (typeof navigator === 'object' && navigator['product'] === 'ReactNative');
    }
    /**
     * Detect whether the current SDK build is the Node version.
     *
     * @return true if it's the Node SDK build.
     */
    function isNodeSdk() {
        return CONSTANTS.NODE_ADMIN === true;
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * @fileoverview Standardized Firebase Error.
     *
     * Usage:
     *
     *   // Typescript string literals for type-safe codes
     *   type Err =
     *     'unknown' |
     *     'object-not-found'
     *     ;
     *
     *   // Closure enum for type-safe error codes
     *   // at-enum {string}
     *   var Err = {
     *     UNKNOWN: 'unknown',
     *     OBJECT_NOT_FOUND: 'object-not-found',
     *   }
     *
     *   let errors: Map<Err, string> = {
     *     'generic-error': "Unknown error",
     *     'file-not-found': "Could not find file: {$file}",
     *   };
     *
     *   // Type-safe function - must pass a valid error code as param.
     *   let error = new ErrorFactory<Err>('service', 'Service', errors);
     *
     *   ...
     *   throw error.create(Err.GENERIC);
     *   ...
     *   throw error.create(Err.FILE_NOT_FOUND, {'file': fileName});
     *   ...
     *   // Service: Could not file file: foo.txt (service/file-not-found).
     *
     *   catch (e) {
     *     assert(e.message === "Could not find file: foo.txt.");
     *     if (e.code === 'service/file-not-found') {
     *       console.log("Could not read file: " + e['file']);
     *     }
     *   }
     */
    const ERROR_NAME = 'FirebaseError';
    // Based on code from:
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error#Custom_Error_Types
    class FirebaseError extends Error {
        constructor(code, message, customData) {
            super(message);
            this.code = code;
            this.customData = customData;
            this.name = ERROR_NAME;
            // Fix For ES5
            // https://github.com/Microsoft/TypeScript-wiki/blob/master/Breaking-Changes.md#extending-built-ins-like-error-array-and-map-may-no-longer-work
            Object.setPrototypeOf(this, FirebaseError.prototype);
            // Maintains proper stack trace for where our error was thrown.
            // Only available on V8.
            if (Error.captureStackTrace) {
                Error.captureStackTrace(this, ErrorFactory.prototype.create);
            }
        }
    }
    class ErrorFactory {
        constructor(service, serviceName, errors) {
            this.service = service;
            this.serviceName = serviceName;
            this.errors = errors;
        }
        create(code, ...data) {
            const customData = data[0] || {};
            const fullCode = `${this.service}/${code}`;
            const template = this.errors[code];
            const message = template ? replaceTemplate(template, customData) : 'Error';
            // Service Name: Error message (service/code).
            const fullMessage = `${this.serviceName}: ${message} (${fullCode}).`;
            const error = new FirebaseError(fullCode, fullMessage, customData);
            return error;
        }
    }
    function replaceTemplate(template, data) {
        return template.replace(PATTERN, (_, key) => {
            const value = data[key];
            return value != null ? String(value) : `<${key}?>`;
        });
    }
    const PATTERN = /\{\$([^}]+)}/g;

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * Evaluates a JSON string into a javascript object.
     *
     * @param {string} str A string containing JSON.
     * @return {*} The javascript object representing the specified JSON.
     */
    function jsonEval(str) {
        return JSON.parse(str);
    }
    /**
     * Returns JSON representing a javascript object.
     * @param {*} data Javascript object to be stringified.
     * @return {string} The JSON contents of the object.
     */
    function stringify(data) {
        return JSON.stringify(data);
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * Decodes a Firebase auth. token into constituent parts.
     *
     * Notes:
     * - May return with invalid / incomplete claims if there's no native base64 decoding support.
     * - Doesn't check if the token is actually valid.
     */
    const decode = function (token) {
        let header = {}, claims = {}, data = {}, signature = '';
        try {
            const parts = token.split('.');
            header = jsonEval(base64Decode(parts[0]) || '');
            claims = jsonEval(base64Decode(parts[1]) || '');
            signature = parts[2];
            data = claims['d'] || {};
            delete claims['d'];
        }
        catch (e) { }
        return {
            header,
            claims,
            data,
            signature
        };
    };
    /**
     * Decodes a Firebase auth. token and checks the validity of its format. Expects a valid issued-at time.
     *
     * Notes:
     * - May return a false negative if there's no native base64 decoding support.
     * - Doesn't check if the token is actually valid.
     */
    const isValidFormat = function (token) {
        const decoded = decode(token), claims = decoded.claims;
        return !!claims && typeof claims === 'object' && claims.hasOwnProperty('iat');
    };
    /**
     * Attempts to peer into an auth token and determine if it's an admin auth token by looking at the claims portion.
     *
     * Notes:
     * - May return a false negative if there's no native base64 decoding support.
     * - Doesn't check if the token is actually valid.
     */
    const isAdmin = function (token) {
        const claims = decode(token).claims;
        return typeof claims === 'object' && claims['admin'] === true;
    };

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    function contains$1(obj, key) {
        return Object.prototype.hasOwnProperty.call(obj, key);
    }
    function safeGet(obj, key) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            return obj[key];
        }
        else {
            return undefined;
        }
    }
    function isEmpty(obj) {
        for (const key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                return false;
            }
        }
        return true;
    }
    function map$1(obj, fn, contextObj) {
        const res = {};
        for (const key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                res[key] = fn.call(contextObj, obj[key], key, obj);
            }
        }
        return res;
    }
    /**
     * Deep equal two objects. Support Arrays and Objects.
     */
    function deepEqual(a, b) {
        if (a === b) {
            return true;
        }
        const aKeys = Object.keys(a);
        const bKeys = Object.keys(b);
        for (const k of aKeys) {
            if (!bKeys.includes(k)) {
                return false;
            }
            const aProp = a[k];
            const bProp = b[k];
            if (isObject(aProp) && isObject(bProp)) {
                if (!deepEqual(aProp, bProp)) {
                    return false;
                }
            }
            else if (aProp !== bProp) {
                return false;
            }
        }
        for (const k of bKeys) {
            if (!aKeys.includes(k)) {
                return false;
            }
        }
        return true;
    }
    function isObject(thing) {
        return thing !== null && typeof thing === 'object';
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * Returns a querystring-formatted string (e.g. &arg=val&arg2=val2) from a
     * params object (e.g. {arg: 'val', arg2: 'val2'})
     * Note: You must prepend it with ? when adding it to a URL.
     */
    function querystring(querystringParams) {
        const params = [];
        for (const [key, value] of Object.entries(querystringParams)) {
            if (Array.isArray(value)) {
                value.forEach(arrayVal => {
                    params.push(encodeURIComponent(key) + '=' + encodeURIComponent(arrayVal));
                });
            }
            else {
                params.push(encodeURIComponent(key) + '=' + encodeURIComponent(value));
            }
        }
        return params.length ? '&' + params.join('&') : '';
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * @fileoverview SHA-1 cryptographic hash.
     * Variable names follow the notation in FIPS PUB 180-3:
     * http://csrc.nist.gov/publications/fips/fips180-3/fips180-3_final.pdf.
     *
     * Usage:
     *   var sha1 = new sha1();
     *   sha1.update(bytes);
     *   var hash = sha1.digest();
     *
     * Performance:
     *   Chrome 23:   ~400 Mbit/s
     *   Firefox 16:  ~250 Mbit/s
     *
     */
    /**
     * SHA-1 cryptographic hash constructor.
     *
     * The properties declared here are discussed in the above algorithm document.
     * @constructor
     * @final
     * @struct
     */
    class Sha1 {
        constructor() {
            /**
             * Holds the previous values of accumulated variables a-e in the compress_
             * function.
             * @private
             */
            this.chain_ = [];
            /**
             * A buffer holding the partially computed hash result.
             * @private
             */
            this.buf_ = [];
            /**
             * An array of 80 bytes, each a part of the message to be hashed.  Referred to
             * as the message schedule in the docs.
             * @private
             */
            this.W_ = [];
            /**
             * Contains data needed to pad messages less than 64 bytes.
             * @private
             */
            this.pad_ = [];
            /**
             * @private {number}
             */
            this.inbuf_ = 0;
            /**
             * @private {number}
             */
            this.total_ = 0;
            this.blockSize = 512 / 8;
            this.pad_[0] = 128;
            for (let i = 1; i < this.blockSize; ++i) {
                this.pad_[i] = 0;
            }
            this.reset();
        }
        reset() {
            this.chain_[0] = 0x67452301;
            this.chain_[1] = 0xefcdab89;
            this.chain_[2] = 0x98badcfe;
            this.chain_[3] = 0x10325476;
            this.chain_[4] = 0xc3d2e1f0;
            this.inbuf_ = 0;
            this.total_ = 0;
        }
        /**
         * Internal compress helper function.
         * @param buf Block to compress.
         * @param offset Offset of the block in the buffer.
         * @private
         */
        compress_(buf, offset) {
            if (!offset) {
                offset = 0;
            }
            const W = this.W_;
            // get 16 big endian words
            if (typeof buf === 'string') {
                for (let i = 0; i < 16; i++) {
                    // TODO(user): [bug 8140122] Recent versions of Safari for Mac OS and iOS
                    // have a bug that turns the post-increment ++ operator into pre-increment
                    // during JIT compilation.  We have code that depends heavily on SHA-1 for
                    // correctness and which is affected by this bug, so I've removed all uses
                    // of post-increment ++ in which the result value is used.  We can revert
                    // this change once the Safari bug
                    // (https://bugs.webkit.org/show_bug.cgi?id=109036) has been fixed and
                    // most clients have been updated.
                    W[i] =
                        (buf.charCodeAt(offset) << 24) |
                            (buf.charCodeAt(offset + 1) << 16) |
                            (buf.charCodeAt(offset + 2) << 8) |
                            buf.charCodeAt(offset + 3);
                    offset += 4;
                }
            }
            else {
                for (let i = 0; i < 16; i++) {
                    W[i] =
                        (buf[offset] << 24) |
                            (buf[offset + 1] << 16) |
                            (buf[offset + 2] << 8) |
                            buf[offset + 3];
                    offset += 4;
                }
            }
            // expand to 80 words
            for (let i = 16; i < 80; i++) {
                const t = W[i - 3] ^ W[i - 8] ^ W[i - 14] ^ W[i - 16];
                W[i] = ((t << 1) | (t >>> 31)) & 0xffffffff;
            }
            let a = this.chain_[0];
            let b = this.chain_[1];
            let c = this.chain_[2];
            let d = this.chain_[3];
            let e = this.chain_[4];
            let f, k;
            // TODO(user): Try to unroll this loop to speed up the computation.
            for (let i = 0; i < 80; i++) {
                if (i < 40) {
                    if (i < 20) {
                        f = d ^ (b & (c ^ d));
                        k = 0x5a827999;
                    }
                    else {
                        f = b ^ c ^ d;
                        k = 0x6ed9eba1;
                    }
                }
                else {
                    if (i < 60) {
                        f = (b & c) | (d & (b | c));
                        k = 0x8f1bbcdc;
                    }
                    else {
                        f = b ^ c ^ d;
                        k = 0xca62c1d6;
                    }
                }
                const t = (((a << 5) | (a >>> 27)) + f + e + k + W[i]) & 0xffffffff;
                e = d;
                d = c;
                c = ((b << 30) | (b >>> 2)) & 0xffffffff;
                b = a;
                a = t;
            }
            this.chain_[0] = (this.chain_[0] + a) & 0xffffffff;
            this.chain_[1] = (this.chain_[1] + b) & 0xffffffff;
            this.chain_[2] = (this.chain_[2] + c) & 0xffffffff;
            this.chain_[3] = (this.chain_[3] + d) & 0xffffffff;
            this.chain_[4] = (this.chain_[4] + e) & 0xffffffff;
        }
        update(bytes, length) {
            // TODO(johnlenz): tighten the function signature and remove this check
            if (bytes == null) {
                return;
            }
            if (length === undefined) {
                length = bytes.length;
            }
            const lengthMinusBlock = length - this.blockSize;
            let n = 0;
            // Using local instead of member variables gives ~5% speedup on Firefox 16.
            const buf = this.buf_;
            let inbuf = this.inbuf_;
            // The outer while loop should execute at most twice.
            while (n < length) {
                // When we have no data in the block to top up, we can directly process the
                // input buffer (assuming it contains sufficient data). This gives ~25%
                // speedup on Chrome 23 and ~15% speedup on Firefox 16, but requires that
                // the data is provided in large chunks (or in multiples of 64 bytes).
                if (inbuf === 0) {
                    while (n <= lengthMinusBlock) {
                        this.compress_(bytes, n);
                        n += this.blockSize;
                    }
                }
                if (typeof bytes === 'string') {
                    while (n < length) {
                        buf[inbuf] = bytes.charCodeAt(n);
                        ++inbuf;
                        ++n;
                        if (inbuf === this.blockSize) {
                            this.compress_(buf);
                            inbuf = 0;
                            // Jump to the outer loop so we use the full-block optimization.
                            break;
                        }
                    }
                }
                else {
                    while (n < length) {
                        buf[inbuf] = bytes[n];
                        ++inbuf;
                        ++n;
                        if (inbuf === this.blockSize) {
                            this.compress_(buf);
                            inbuf = 0;
                            // Jump to the outer loop so we use the full-block optimization.
                            break;
                        }
                    }
                }
            }
            this.inbuf_ = inbuf;
            this.total_ += length;
        }
        /** @override */
        digest() {
            const digest = [];
            let totalBits = this.total_ * 8;
            // Add pad 0x80 0x00*.
            if (this.inbuf_ < 56) {
                this.update(this.pad_, 56 - this.inbuf_);
            }
            else {
                this.update(this.pad_, this.blockSize - (this.inbuf_ - 56));
            }
            // Add # bits.
            for (let i = this.blockSize - 1; i >= 56; i--) {
                this.buf_[i] = totalBits & 255;
                totalBits /= 256; // Don't use bit-shifting here!
            }
            this.compress_(this.buf_);
            let n = 0;
            for (let i = 0; i < 5; i++) {
                for (let j = 24; j >= 0; j -= 8) {
                    digest[n] = (this.chain_[i] >> j) & 255;
                    ++n;
                }
            }
            return digest;
        }
    }
    /**
     * Generates a string to prefix an error message about failed argument validation
     *
     * @param fnName The function name
     * @param argName The name of the argument
     * @return The prefix to add to the error thrown for validation.
     */
    function errorPrefix(fnName, argName) {
        return `${fnName} failed: ${argName} argument `;
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    // Code originally came from goog.crypt.stringToUtf8ByteArray, but for some reason they
    // automatically replaced '\r\n' with '\n', and they didn't handle surrogate pairs,
    // so it's been modified.
    // Note that not all Unicode characters appear as single characters in JavaScript strings.
    // fromCharCode returns the UTF-16 encoding of a character - so some Unicode characters
    // use 2 characters in Javascript.  All 4-byte UTF-8 characters begin with a first
    // character in the range 0xD800 - 0xDBFF (the first character of a so-called surrogate
    // pair).
    // See http://www.ecma-international.org/ecma-262/5.1/#sec-15.1.3
    /**
     * @param {string} str
     * @return {Array}
     */
    const stringToByteArray = function (str) {
        const out = [];
        let p = 0;
        for (let i = 0; i < str.length; i++) {
            let c = str.charCodeAt(i);
            // Is this the lead surrogate in a surrogate pair?
            if (c >= 0xd800 && c <= 0xdbff) {
                const high = c - 0xd800; // the high 10 bits.
                i++;
                assert(i < str.length, 'Surrogate pair missing trail surrogate.');
                const low = str.charCodeAt(i) - 0xdc00; // the low 10 bits.
                c = 0x10000 + (high << 10) + low;
            }
            if (c < 128) {
                out[p++] = c;
            }
            else if (c < 2048) {
                out[p++] = (c >> 6) | 192;
                out[p++] = (c & 63) | 128;
            }
            else if (c < 65536) {
                out[p++] = (c >> 12) | 224;
                out[p++] = ((c >> 6) & 63) | 128;
                out[p++] = (c & 63) | 128;
            }
            else {
                out[p++] = (c >> 18) | 240;
                out[p++] = ((c >> 12) & 63) | 128;
                out[p++] = ((c >> 6) & 63) | 128;
                out[p++] = (c & 63) | 128;
            }
        }
        return out;
    };
    /**
     * Calculate length without actually converting; useful for doing cheaper validation.
     * @param {string} str
     * @return {number}
     */
    const stringLength = function (str) {
        let p = 0;
        for (let i = 0; i < str.length; i++) {
            const c = str.charCodeAt(i);
            if (c < 128) {
                p++;
            }
            else if (c < 2048) {
                p += 2;
            }
            else if (c >= 0xd800 && c <= 0xdbff) {
                // Lead surrogate of a surrogate pair.  The pair together will take 4 bytes to represent.
                p += 4;
                i++; // skip trail surrogate.
            }
            else {
                p += 3;
            }
        }
        return p;
    };

    /**
     * @license
     * Copyright 2021 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    function getModularInstance(service) {
        if (service && service._delegate) {
            return service._delegate;
        }
        else {
            return service;
        }
    }

    /**
     * Component for service name T, e.g. `auth`, `auth-internal`
     */
    var Component = /** @class */ (function () {
        /**
         *
         * @param name The public service name, e.g. app, auth, firestore, database
         * @param instanceFactory Service factory responsible for creating the public interface
         * @param type whether the service provided by the component is public or private
         */
        function Component(name, instanceFactory, type) {
            this.name = name;
            this.instanceFactory = instanceFactory;
            this.type = type;
            this.multipleInstances = false;
            /**
             * Properties to be added to the service namespace
             */
            this.serviceProps = {};
            this.instantiationMode = "LAZY" /* LAZY */;
            this.onInstanceCreated = null;
        }
        Component.prototype.setInstantiationMode = function (mode) {
            this.instantiationMode = mode;
            return this;
        };
        Component.prototype.setMultipleInstances = function (multipleInstances) {
            this.multipleInstances = multipleInstances;
            return this;
        };
        Component.prototype.setServiceProps = function (props) {
            this.serviceProps = props;
            return this;
        };
        Component.prototype.setInstanceCreatedCallback = function (callback) {
            this.onInstanceCreated = callback;
            return this;
        };
        return Component;
    }());

    /**
     * @license
     * Copyright 2019 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    var DEFAULT_ENTRY_NAME$1 = '[DEFAULT]';

    /**
     * @license
     * Copyright 2019 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * Provider for instance for service name T, e.g. 'auth', 'auth-internal'
     * NameServiceMapping[T] is an alias for the type of the instance
     */
    var Provider = /** @class */ (function () {
        function Provider(name, container) {
            this.name = name;
            this.container = container;
            this.component = null;
            this.instances = new Map();
            this.instancesDeferred = new Map();
            this.instancesOptions = new Map();
            this.onInitCallbacks = new Map();
        }
        /**
         * @param identifier A provider can provide mulitple instances of a service
         * if this.component.multipleInstances is true.
         */
        Provider.prototype.get = function (identifier) {
            // if multipleInstances is not supported, use the default name
            var normalizedIdentifier = this.normalizeInstanceIdentifier(identifier);
            if (!this.instancesDeferred.has(normalizedIdentifier)) {
                var deferred = new Deferred();
                this.instancesDeferred.set(normalizedIdentifier, deferred);
                if (this.isInitialized(normalizedIdentifier) ||
                    this.shouldAutoInitialize()) {
                    // initialize the service if it can be auto-initialized
                    try {
                        var instance = this.getOrInitializeService({
                            instanceIdentifier: normalizedIdentifier
                        });
                        if (instance) {
                            deferred.resolve(instance);
                        }
                    }
                    catch (e) {
                        // when the instance factory throws an exception during get(), it should not cause
                        // a fatal error. We just return the unresolved promise in this case.
                    }
                }
            }
            return this.instancesDeferred.get(normalizedIdentifier).promise;
        };
        Provider.prototype.getImmediate = function (options) {
            var _a;
            // if multipleInstances is not supported, use the default name
            var normalizedIdentifier = this.normalizeInstanceIdentifier(options === null || options === void 0 ? void 0 : options.identifier);
            var optional = (_a = options === null || options === void 0 ? void 0 : options.optional) !== null && _a !== void 0 ? _a : false;
            if (this.isInitialized(normalizedIdentifier) ||
                this.shouldAutoInitialize()) {
                try {
                    return this.getOrInitializeService({
                        instanceIdentifier: normalizedIdentifier
                    });
                }
                catch (e) {
                    if (optional) {
                        return null;
                    }
                    else {
                        throw e;
                    }
                }
            }
            else {
                // In case a component is not initialized and should/can not be auto-initialized at the moment, return null if the optional flag is set, or throw
                if (optional) {
                    return null;
                }
                else {
                    throw Error("Service " + this.name + " is not available");
                }
            }
        };
        Provider.prototype.getComponent = function () {
            return this.component;
        };
        Provider.prototype.setComponent = function (component) {
            var e_1, _a;
            if (component.name !== this.name) {
                throw Error("Mismatching Component " + component.name + " for Provider " + this.name + ".");
            }
            if (this.component) {
                throw Error("Component for " + this.name + " has already been provided");
            }
            this.component = component;
            // return early without attempting to initialize the component if the component requires explicit initialization (calling `Provider.initialize()`)
            if (!this.shouldAutoInitialize()) {
                return;
            }
            // if the service is eager, initialize the default instance
            if (isComponentEager(component)) {
                try {
                    this.getOrInitializeService({ instanceIdentifier: DEFAULT_ENTRY_NAME$1 });
                }
                catch (e) {
                    // when the instance factory for an eager Component throws an exception during the eager
                    // initialization, it should not cause a fatal error.
                    // TODO: Investigate if we need to make it configurable, because some component may want to cause
                    // a fatal error in this case?
                }
            }
            try {
                // Create service instances for the pending promises and resolve them
                // NOTE: if this.multipleInstances is false, only the default instance will be created
                // and all promises with resolve with it regardless of the identifier.
                for (var _b = __values(this.instancesDeferred.entries()), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var _d = __read(_c.value, 2), instanceIdentifier = _d[0], instanceDeferred = _d[1];
                    var normalizedIdentifier = this.normalizeInstanceIdentifier(instanceIdentifier);
                    try {
                        // `getOrInitializeService()` should always return a valid instance since a component is guaranteed. use ! to make typescript happy.
                        var instance = this.getOrInitializeService({
                            instanceIdentifier: normalizedIdentifier
                        });
                        instanceDeferred.resolve(instance);
                    }
                    catch (e) {
                        // when the instance factory throws an exception, it should not cause
                        // a fatal error. We just leave the promise unresolved.
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
        };
        Provider.prototype.clearInstance = function (identifier) {
            if (identifier === void 0) { identifier = DEFAULT_ENTRY_NAME$1; }
            this.instancesDeferred.delete(identifier);
            this.instancesOptions.delete(identifier);
            this.instances.delete(identifier);
        };
        // app.delete() will call this method on every provider to delete the services
        // TODO: should we mark the provider as deleted?
        Provider.prototype.delete = function () {
            return __awaiter(this, void 0, void 0, function () {
                var services;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            services = Array.from(this.instances.values());
                            return [4 /*yield*/, Promise.all(__spreadArray(__spreadArray([], __read(services
                                    .filter(function (service) { return 'INTERNAL' in service; }) // legacy services
                                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                    .map(function (service) { return service.INTERNAL.delete(); }))), __read(services
                                    .filter(function (service) { return '_delete' in service; }) // modularized services
                                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                    .map(function (service) { return service._delete(); }))))];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        Provider.prototype.isComponentSet = function () {
            return this.component != null;
        };
        Provider.prototype.isInitialized = function (identifier) {
            if (identifier === void 0) { identifier = DEFAULT_ENTRY_NAME$1; }
            return this.instances.has(identifier);
        };
        Provider.prototype.getOptions = function (identifier) {
            if (identifier === void 0) { identifier = DEFAULT_ENTRY_NAME$1; }
            return this.instancesOptions.get(identifier) || {};
        };
        Provider.prototype.initialize = function (opts) {
            var e_2, _a;
            if (opts === void 0) { opts = {}; }
            var _b = opts.options, options = _b === void 0 ? {} : _b;
            var normalizedIdentifier = this.normalizeInstanceIdentifier(opts.instanceIdentifier);
            if (this.isInitialized(normalizedIdentifier)) {
                throw Error(this.name + "(" + normalizedIdentifier + ") has already been initialized");
            }
            if (!this.isComponentSet()) {
                throw Error("Component " + this.name + " has not been registered yet");
            }
            var instance = this.getOrInitializeService({
                instanceIdentifier: normalizedIdentifier,
                options: options
            });
            try {
                // resolve any pending promise waiting for the service instance
                for (var _c = __values(this.instancesDeferred.entries()), _d = _c.next(); !_d.done; _d = _c.next()) {
                    var _e = __read(_d.value, 2), instanceIdentifier = _e[0], instanceDeferred = _e[1];
                    var normalizedDeferredIdentifier = this.normalizeInstanceIdentifier(instanceIdentifier);
                    if (normalizedIdentifier === normalizedDeferredIdentifier) {
                        instanceDeferred.resolve(instance);
                    }
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                }
                finally { if (e_2) throw e_2.error; }
            }
            return instance;
        };
        /**
         *
         * @param callback - a function that will be invoked  after the provider has been initialized by calling provider.initialize().
         * The function is invoked SYNCHRONOUSLY, so it should not execute any longrunning tasks in order to not block the program.
         *
         * @param identifier An optional instance identifier
         * @returns a function to unregister the callback
         */
        Provider.prototype.onInit = function (callback, identifier) {
            var _a;
            var normalizedIdentifier = this.normalizeInstanceIdentifier(identifier);
            var existingCallbacks = (_a = this.onInitCallbacks.get(normalizedIdentifier)) !== null && _a !== void 0 ? _a : new Set();
            existingCallbacks.add(callback);
            this.onInitCallbacks.set(normalizedIdentifier, existingCallbacks);
            var existingInstance = this.instances.get(normalizedIdentifier);
            if (existingInstance) {
                callback(existingInstance, normalizedIdentifier);
            }
            return function () {
                existingCallbacks.delete(callback);
            };
        };
        /**
         * Invoke onInit callbacks synchronously
         * @param instance the service instance`
         */
        Provider.prototype.invokeOnInitCallbacks = function (instance, identifier) {
            var e_3, _a;
            var callbacks = this.onInitCallbacks.get(identifier);
            if (!callbacks) {
                return;
            }
            try {
                for (var callbacks_1 = __values(callbacks), callbacks_1_1 = callbacks_1.next(); !callbacks_1_1.done; callbacks_1_1 = callbacks_1.next()) {
                    var callback = callbacks_1_1.value;
                    try {
                        callback(instance, identifier);
                    }
                    catch (_b) {
                        // ignore errors in the onInit callback
                    }
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (callbacks_1_1 && !callbacks_1_1.done && (_a = callbacks_1.return)) _a.call(callbacks_1);
                }
                finally { if (e_3) throw e_3.error; }
            }
        };
        Provider.prototype.getOrInitializeService = function (_a) {
            var instanceIdentifier = _a.instanceIdentifier, _b = _a.options, options = _b === void 0 ? {} : _b;
            var instance = this.instances.get(instanceIdentifier);
            if (!instance && this.component) {
                instance = this.component.instanceFactory(this.container, {
                    instanceIdentifier: normalizeIdentifierForFactory(instanceIdentifier),
                    options: options
                });
                this.instances.set(instanceIdentifier, instance);
                this.instancesOptions.set(instanceIdentifier, options);
                /**
                 * Invoke onInit listeners.
                 * Note this.component.onInstanceCreated is different, which is used by the component creator,
                 * while onInit listeners are registered by consumers of the provider.
                 */
                this.invokeOnInitCallbacks(instance, instanceIdentifier);
                /**
                 * Order is important
                 * onInstanceCreated() should be called after this.instances.set(instanceIdentifier, instance); which
                 * makes `isInitialized()` return true.
                 */
                if (this.component.onInstanceCreated) {
                    try {
                        this.component.onInstanceCreated(this.container, instanceIdentifier, instance);
                    }
                    catch (_c) {
                        // ignore errors in the onInstanceCreatedCallback
                    }
                }
            }
            return instance || null;
        };
        Provider.prototype.normalizeInstanceIdentifier = function (identifier) {
            if (identifier === void 0) { identifier = DEFAULT_ENTRY_NAME$1; }
            if (this.component) {
                return this.component.multipleInstances ? identifier : DEFAULT_ENTRY_NAME$1;
            }
            else {
                return identifier; // assume multiple instances are supported before the component is provided.
            }
        };
        Provider.prototype.shouldAutoInitialize = function () {
            return (!!this.component &&
                this.component.instantiationMode !== "EXPLICIT" /* EXPLICIT */);
        };
        return Provider;
    }());
    // undefined should be passed to the service factory for the default instance
    function normalizeIdentifierForFactory(identifier) {
        return identifier === DEFAULT_ENTRY_NAME$1 ? undefined : identifier;
    }
    function isComponentEager(component) {
        return component.instantiationMode === "EAGER" /* EAGER */;
    }

    /**
     * @license
     * Copyright 2019 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * ComponentContainer that provides Providers for service name T, e.g. `auth`, `auth-internal`
     */
    var ComponentContainer = /** @class */ (function () {
        function ComponentContainer(name) {
            this.name = name;
            this.providers = new Map();
        }
        /**
         *
         * @param component Component being added
         * @param overwrite When a component with the same name has already been registered,
         * if overwrite is true: overwrite the existing component with the new component and create a new
         * provider with the new component. It can be useful in tests where you want to use different mocks
         * for different tests.
         * if overwrite is false: throw an exception
         */
        ComponentContainer.prototype.addComponent = function (component) {
            var provider = this.getProvider(component.name);
            if (provider.isComponentSet()) {
                throw new Error("Component " + component.name + " has already been registered with " + this.name);
            }
            provider.setComponent(component);
        };
        ComponentContainer.prototype.addOrOverwriteComponent = function (component) {
            var provider = this.getProvider(component.name);
            if (provider.isComponentSet()) {
                // delete the existing provider from the container, so we can register the new component
                this.providers.delete(component.name);
            }
            this.addComponent(component);
        };
        /**
         * getProvider provides a type safe interface where it can only be called with a field name
         * present in NameServiceMapping interface.
         *
         * Firebase SDKs providing services should extend NameServiceMapping interface to register
         * themselves.
         */
        ComponentContainer.prototype.getProvider = function (name) {
            if (this.providers.has(name)) {
                return this.providers.get(name);
            }
            // create a Provider for a service that hasn't registered with Firebase
            var provider = new Provider(name, this);
            this.providers.set(name, provider);
            return provider;
        };
        ComponentContainer.prototype.getProviders = function () {
            return Array.from(this.providers.values());
        };
        return ComponentContainer;
    }());

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * The JS SDK supports 5 log levels and also allows a user the ability to
     * silence the logs altogether.
     *
     * The order is a follows:
     * DEBUG < VERBOSE < INFO < WARN < ERROR
     *
     * All of the log types above the current log level will be captured (i.e. if
     * you set the log level to `INFO`, errors will still be logged, but `DEBUG` and
     * `VERBOSE` logs will not)
     */
    var LogLevel;
    (function (LogLevel) {
        LogLevel[LogLevel["DEBUG"] = 0] = "DEBUG";
        LogLevel[LogLevel["VERBOSE"] = 1] = "VERBOSE";
        LogLevel[LogLevel["INFO"] = 2] = "INFO";
        LogLevel[LogLevel["WARN"] = 3] = "WARN";
        LogLevel[LogLevel["ERROR"] = 4] = "ERROR";
        LogLevel[LogLevel["SILENT"] = 5] = "SILENT";
    })(LogLevel || (LogLevel = {}));
    const levelStringToEnum = {
        'debug': LogLevel.DEBUG,
        'verbose': LogLevel.VERBOSE,
        'info': LogLevel.INFO,
        'warn': LogLevel.WARN,
        'error': LogLevel.ERROR,
        'silent': LogLevel.SILENT
    };
    /**
     * The default log level
     */
    const defaultLogLevel = LogLevel.INFO;
    /**
     * By default, `console.debug` is not displayed in the developer console (in
     * chrome). To avoid forcing users to have to opt-in to these logs twice
     * (i.e. once for firebase, and once in the console), we are sending `DEBUG`
     * logs to the `console.log` function.
     */
    const ConsoleMethod = {
        [LogLevel.DEBUG]: 'log',
        [LogLevel.VERBOSE]: 'log',
        [LogLevel.INFO]: 'info',
        [LogLevel.WARN]: 'warn',
        [LogLevel.ERROR]: 'error'
    };
    /**
     * The default log handler will forward DEBUG, VERBOSE, INFO, WARN, and ERROR
     * messages on to their corresponding console counterparts (if the log method
     * is supported by the current log level)
     */
    const defaultLogHandler = (instance, logType, ...args) => {
        if (logType < instance.logLevel) {
            return;
        }
        const now = new Date().toISOString();
        const method = ConsoleMethod[logType];
        if (method) {
            console[method](`[${now}]  ${instance.name}:`, ...args);
        }
        else {
            throw new Error(`Attempted to log a message with an invalid logType (value: ${logType})`);
        }
    };
    class Logger {
        /**
         * Gives you an instance of a Logger to capture messages according to
         * Firebase's logging scheme.
         *
         * @param name The name that the logs will be associated with
         */
        constructor(name) {
            this.name = name;
            /**
             * The log level of the given Logger instance.
             */
            this._logLevel = defaultLogLevel;
            /**
             * The main (internal) log handler for the Logger instance.
             * Can be set to a new function in internal package code but not by user.
             */
            this._logHandler = defaultLogHandler;
            /**
             * The optional, additional, user-defined log handler for the Logger instance.
             */
            this._userLogHandler = null;
        }
        get logLevel() {
            return this._logLevel;
        }
        set logLevel(val) {
            if (!(val in LogLevel)) {
                throw new TypeError(`Invalid value "${val}" assigned to \`logLevel\``);
            }
            this._logLevel = val;
        }
        // Workaround for setter/getter having to be the same type.
        setLogLevel(val) {
            this._logLevel = typeof val === 'string' ? levelStringToEnum[val] : val;
        }
        get logHandler() {
            return this._logHandler;
        }
        set logHandler(val) {
            if (typeof val !== 'function') {
                throw new TypeError('Value assigned to `logHandler` must be a function');
            }
            this._logHandler = val;
        }
        get userLogHandler() {
            return this._userLogHandler;
        }
        set userLogHandler(val) {
            this._userLogHandler = val;
        }
        /**
         * The functions below are all based on the `console` interface
         */
        debug(...args) {
            this._userLogHandler && this._userLogHandler(this, LogLevel.DEBUG, ...args);
            this._logHandler(this, LogLevel.DEBUG, ...args);
        }
        log(...args) {
            this._userLogHandler &&
                this._userLogHandler(this, LogLevel.VERBOSE, ...args);
            this._logHandler(this, LogLevel.VERBOSE, ...args);
        }
        info(...args) {
            this._userLogHandler && this._userLogHandler(this, LogLevel.INFO, ...args);
            this._logHandler(this, LogLevel.INFO, ...args);
        }
        warn(...args) {
            this._userLogHandler && this._userLogHandler(this, LogLevel.WARN, ...args);
            this._logHandler(this, LogLevel.WARN, ...args);
        }
        error(...args) {
            this._userLogHandler && this._userLogHandler(this, LogLevel.ERROR, ...args);
            this._logHandler(this, LogLevel.ERROR, ...args);
        }
    }

    /**
     * @license
     * Copyright 2019 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    class PlatformLoggerServiceImpl {
        constructor(container) {
            this.container = container;
        }
        // In initial implementation, this will be called by installations on
        // auth token refresh, and installations will send this string.
        getPlatformInfoString() {
            const providers = this.container.getProviders();
            // Loop through providers and get library/version pairs from any that are
            // version components.
            return providers
                .map(provider => {
                if (isVersionServiceProvider(provider)) {
                    const service = provider.getImmediate();
                    return `${service.library}/${service.version}`;
                }
                else {
                    return null;
                }
            })
                .filter(logString => logString)
                .join(' ');
        }
    }
    /**
     *
     * @param provider check if this provider provides a VersionService
     *
     * NOTE: Using Provider<'app-version'> is a hack to indicate that the provider
     * provides VersionService. The provider is not necessarily a 'app-version'
     * provider.
     */
    function isVersionServiceProvider(provider) {
        const component = provider.getComponent();
        return (component === null || component === void 0 ? void 0 : component.type) === "VERSION" /* VERSION */;
    }

    const name$o = "@firebase/app";
    const version$1$1 = "0.7.4";

    /**
     * @license
     * Copyright 2019 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    const logger$1 = new Logger('@firebase/app');

    const name$n = "@firebase/app-compat";

    const name$m = "@firebase/analytics-compat";

    const name$l = "@firebase/analytics";

    const name$k = "@firebase/app-check-compat";

    const name$j = "@firebase/app-check";

    const name$i = "@firebase/auth";

    const name$h = "@firebase/auth-compat";

    const name$g = "@firebase/database";

    const name$f = "@firebase/database-compat";

    const name$e = "@firebase/functions";

    const name$d = "@firebase/functions-compat";

    const name$c = "@firebase/installations";

    const name$b = "@firebase/installations-compat";

    const name$a = "@firebase/messaging";

    const name$9 = "@firebase/messaging-compat";

    const name$8 = "@firebase/performance";

    const name$7 = "@firebase/performance-compat";

    const name$6 = "@firebase/remote-config";

    const name$5 = "@firebase/remote-config-compat";

    const name$4 = "@firebase/storage";

    const name$3 = "@firebase/storage-compat";

    const name$2$1 = "@firebase/firestore";

    const name$1$1 = "@firebase/firestore-compat";

    const name$p = "firebase";
    const version$3 = "9.1.3";

    /**
     * @license
     * Copyright 2019 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * The default app name
     *
     * @internal
     */
    const DEFAULT_ENTRY_NAME = '[DEFAULT]';
    const PLATFORM_LOG_STRING = {
        [name$o]: 'fire-core',
        [name$n]: 'fire-core-compat',
        [name$l]: 'fire-analytics',
        [name$m]: 'fire-analytics-compat',
        [name$j]: 'fire-app-check',
        [name$k]: 'fire-app-check-compat',
        [name$i]: 'fire-auth',
        [name$h]: 'fire-auth-compat',
        [name$g]: 'fire-rtdb',
        [name$f]: 'fire-rtdb-compat',
        [name$e]: 'fire-fn',
        [name$d]: 'fire-fn-compat',
        [name$c]: 'fire-iid',
        [name$b]: 'fire-iid-compat',
        [name$a]: 'fire-fcm',
        [name$9]: 'fire-fcm-compat',
        [name$8]: 'fire-perf',
        [name$7]: 'fire-perf-compat',
        [name$6]: 'fire-rc',
        [name$5]: 'fire-rc-compat',
        [name$4]: 'fire-gcs',
        [name$3]: 'fire-gcs-compat',
        [name$2$1]: 'fire-fst',
        [name$1$1]: 'fire-fst-compat',
        'fire-js': 'fire-js',
        [name$p]: 'fire-js-all'
    };

    /**
     * @license
     * Copyright 2019 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * @internal
     */
    const _apps = new Map();
    /**
     * Registered components.
     *
     * @internal
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const _components = new Map();
    /**
     * @param component - the component being added to this app's container
     *
     * @internal
     */
    function _addComponent(app, component) {
        try {
            app.container.addComponent(component);
        }
        catch (e) {
            logger$1.debug(`Component ${component.name} failed to register with FirebaseApp ${app.name}`, e);
        }
    }
    /**
     *
     * @param component - the component to register
     * @returns whether or not the component is registered successfully
     *
     * @internal
     */
    function _registerComponent(component) {
        const componentName = component.name;
        if (_components.has(componentName)) {
            logger$1.debug(`There were multiple attempts to register component ${componentName}.`);
            return false;
        }
        _components.set(componentName, component);
        // add the component to existing app instances
        for (const app of _apps.values()) {
            _addComponent(app, component);
        }
        return true;
    }
    /**
     *
     * @param app - FirebaseApp instance
     * @param name - service name
     *
     * @returns the provider for the service with the matching name
     *
     * @internal
     */
    function _getProvider(app, name) {
        return app.container.getProvider(name);
    }

    /**
     * @license
     * Copyright 2019 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    const ERRORS = {
        ["no-app" /* NO_APP */]: "No Firebase App '{$appName}' has been created - " +
            'call Firebase App.initializeApp()',
        ["bad-app-name" /* BAD_APP_NAME */]: "Illegal App name: '{$appName}",
        ["duplicate-app" /* DUPLICATE_APP */]: "Firebase App named '{$appName}' already exists with different options or config",
        ["app-deleted" /* APP_DELETED */]: "Firebase App named '{$appName}' already deleted",
        ["invalid-app-argument" /* INVALID_APP_ARGUMENT */]: 'firebase.{$appName}() takes either no argument or a ' +
            'Firebase App instance.',
        ["invalid-log-argument" /* INVALID_LOG_ARGUMENT */]: 'First argument to `onLog` must be null or a function.'
    };
    const ERROR_FACTORY = new ErrorFactory('app', 'Firebase', ERRORS);

    /**
     * @license
     * Copyright 2019 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    class FirebaseAppImpl {
        constructor(options, config, container) {
            this._isDeleted = false;
            this._options = Object.assign({}, options);
            this._config = Object.assign({}, config);
            this._name = config.name;
            this._automaticDataCollectionEnabled =
                config.automaticDataCollectionEnabled;
            this._container = container;
            this.container.addComponent(new Component('app', () => this, "PUBLIC" /* PUBLIC */));
        }
        get automaticDataCollectionEnabled() {
            this.checkDestroyed();
            return this._automaticDataCollectionEnabled;
        }
        set automaticDataCollectionEnabled(val) {
            this.checkDestroyed();
            this._automaticDataCollectionEnabled = val;
        }
        get name() {
            this.checkDestroyed();
            return this._name;
        }
        get options() {
            this.checkDestroyed();
            return this._options;
        }
        get config() {
            this.checkDestroyed();
            return this._config;
        }
        get container() {
            return this._container;
        }
        get isDeleted() {
            return this._isDeleted;
        }
        set isDeleted(val) {
            this._isDeleted = val;
        }
        /**
         * This function will throw an Error if the App has already been deleted -
         * use before performing API actions on the App.
         */
        checkDestroyed() {
            if (this.isDeleted) {
                throw ERROR_FACTORY.create("app-deleted" /* APP_DELETED */, { appName: this._name });
            }
        }
    }

    /**
     * @license
     * Copyright 2019 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * The current SDK version.
     *
     * @public
     */
    const SDK_VERSION$1 = version$3;
    function initializeApp(options, rawConfig = {}) {
        if (typeof rawConfig !== 'object') {
            const name = rawConfig;
            rawConfig = { name };
        }
        const config = Object.assign({ name: DEFAULT_ENTRY_NAME, automaticDataCollectionEnabled: false }, rawConfig);
        const name = config.name;
        if (typeof name !== 'string' || !name) {
            throw ERROR_FACTORY.create("bad-app-name" /* BAD_APP_NAME */, {
                appName: String(name)
            });
        }
        const existingApp = _apps.get(name);
        if (existingApp) {
            // return the existing app if options and config deep equal the ones in the existing app.
            if (deepEqual(options, existingApp.options) &&
                deepEqual(config, existingApp.config)) {
                return existingApp;
            }
            else {
                throw ERROR_FACTORY.create("duplicate-app" /* DUPLICATE_APP */, { appName: name });
            }
        }
        const container = new ComponentContainer(name);
        for (const component of _components.values()) {
            container.addComponent(component);
        }
        const newApp = new FirebaseAppImpl(options, config, container);
        _apps.set(name, newApp);
        return newApp;
    }
    /**
     * Retrieves a {@link @firebase/app#FirebaseApp} instance.
     *
     * When called with no arguments, the default app is returned. When an app name
     * is provided, the app corresponding to that name is returned.
     *
     * An exception is thrown if the app being retrieved has not yet been
     * initialized.
     *
     * @example
     * ```javascript
     * // Return the default app
     * const app = getApp();
     * ```
     *
     * @example
     * ```javascript
     * // Return a named app
     * const otherApp = getApp("otherApp");
     * ```
     *
     * @param name - Optional name of the app to return. If no name is
     *   provided, the default is `"[DEFAULT]"`.
     *
     * @returns The app corresponding to the provided app name.
     *   If no app name is provided, the default app is returned.
     *
     * @public
     */
    function getApp(name = DEFAULT_ENTRY_NAME) {
        const app = _apps.get(name);
        if (!app) {
            throw ERROR_FACTORY.create("no-app" /* NO_APP */, { appName: name });
        }
        return app;
    }
    /**
     * Registers a library's name and version for platform logging purposes.
     * @param library - Name of 1p or 3p library (e.g. firestore, angularfire)
     * @param version - Current version of that library.
     * @param variant - Bundle variant, e.g., node, rn, etc.
     *
     * @public
     */
    function registerVersion(libraryKeyOrName, version, variant) {
        var _a;
        // TODO: We can use this check to whitelist strings when/if we set up
        // a good whitelist system.
        let library = (_a = PLATFORM_LOG_STRING[libraryKeyOrName]) !== null && _a !== void 0 ? _a : libraryKeyOrName;
        if (variant) {
            library += `-${variant}`;
        }
        const libraryMismatch = library.match(/\s|\//);
        const versionMismatch = version.match(/\s|\//);
        if (libraryMismatch || versionMismatch) {
            const warning = [
                `Unable to register library "${library}" with version "${version}":`
            ];
            if (libraryMismatch) {
                warning.push(`library name "${library}" contains illegal characters (whitespace or "/")`);
            }
            if (libraryMismatch && versionMismatch) {
                warning.push('and');
            }
            if (versionMismatch) {
                warning.push(`version name "${version}" contains illegal characters (whitespace or "/")`);
            }
            logger$1.warn(warning.join(' '));
            return;
        }
        _registerComponent(new Component(`${library}-version`, () => ({ library, version }), "VERSION" /* VERSION */));
    }

    /**
     * @license
     * Copyright 2019 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    function registerCoreComponents(variant) {
        _registerComponent(new Component('platform-logger', container => new PlatformLoggerServiceImpl(container), "PRIVATE" /* PRIVATE */));
        // Register `app` package.
        registerVersion(name$o, version$1$1, variant);
        // BUILD_TARGET will be replaced by values like esm5, esm2017, cjs5, etc during the compilation
        registerVersion(name$o, version$1$1, 'esm2017');
        // Register platform SDK identifier (no version).
        registerVersion('fire-js', '');
    }

    /**
     * Firebase App
     *
     * @remarks This package coordinates the communication between the different Firebase components
     * @packageDocumentation
     */
    registerCoreComponents('');

    var name$2 = "firebase";
    var version$2 = "9.1.3";

    /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    registerVersion(name$2, version$2, 'app');

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * Error codes for requests made by the the XhrIo wrapper.
     */
    var ErrorCode;
    (function (ErrorCode) {
        ErrorCode[ErrorCode["NO_ERROR"] = 0] = "NO_ERROR";
        ErrorCode[ErrorCode["NETWORK_ERROR"] = 1] = "NETWORK_ERROR";
        ErrorCode[ErrorCode["ABORT"] = 2] = "ABORT";
    })(ErrorCode || (ErrorCode = {}));

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * @fileoverview Constants used in the Firebase Storage library.
     */
    /**
     * Domain name for firebase storage.
     */
    const DEFAULT_HOST = 'firebasestorage.googleapis.com';
    /**
     * The key in Firebase config json for the storage bucket.
     */
    const CONFIG_STORAGE_BUCKET_KEY = 'storageBucket';
    /**
     * 2 minutes
     *
     * The timeout for all operations except upload.
     */
    const DEFAULT_MAX_OPERATION_RETRY_TIME = 2 * 60 * 1000;
    /**
     * 10 minutes
     *
     * The timeout for upload.
     */
    const DEFAULT_MAX_UPLOAD_RETRY_TIME = 10 * 60 * 1000;

    /**
     * An error returned by the Firebase Storage SDK.
     * @public
     */
    class StorageError extends FirebaseError {
        /**
         * @param code - A StorageErrorCode string to be prefixed with 'storage/' and
         *  added to the end of the message.
         * @param message  - Error message.
         */
        constructor(code, message) {
            super(prependCode(code), `Firebase Storage: ${message} (${prependCode(code)})`);
            /**
             * Stores custom error data unque to StorageError.
             */
            this.customData = { serverResponse: null };
            this._baseMessage = this.message;
            // Without this, `instanceof StorageError`, in tests for example,
            // returns false.
            Object.setPrototypeOf(this, StorageError.prototype);
        }
        /**
         * Compares a StorageErrorCode against this error's code, filtering out the prefix.
         */
        _codeEquals(code) {
            return prependCode(code) === this.code;
        }
        /**
         * Optional response message that was added by the server.
         */
        get serverResponse() {
            return this.customData.serverResponse;
        }
        set serverResponse(serverResponse) {
            this.customData.serverResponse = serverResponse;
            if (this.customData.serverResponse) {
                this.message = `${this._baseMessage}\n${this.customData.serverResponse}`;
            }
            else {
                this.message = this._baseMessage;
            }
        }
    }
    function prependCode(code) {
        return 'storage/' + code;
    }
    function unknown() {
        const message = 'An unknown error occurred, please check the error payload for ' +
            'server response.';
        return new StorageError("unknown" /* UNKNOWN */, message);
    }
    function quotaExceeded(bucket) {
        return new StorageError("quota-exceeded" /* QUOTA_EXCEEDED */, "Quota for bucket '" +
            bucket +
            "' exceeded, please view quota on " +
            'https://firebase.google.com/pricing/.');
    }
    function unauthenticated() {
        const message = 'User is not authenticated, please authenticate using Firebase ' +
            'Authentication and try again.';
        return new StorageError("unauthenticated" /* UNAUTHENTICATED */, message);
    }
    function unauthorizedApp() {
        return new StorageError("unauthorized-app" /* UNAUTHORIZED_APP */, 'This app does not have permission to access Firebase Storage on this project.');
    }
    function unauthorized(path) {
        return new StorageError("unauthorized" /* UNAUTHORIZED */, "User does not have permission to access '" + path + "'.");
    }
    function retryLimitExceeded() {
        return new StorageError("retry-limit-exceeded" /* RETRY_LIMIT_EXCEEDED */, 'Max retry time for operation exceeded, please try again.');
    }
    function canceled() {
        return new StorageError("canceled" /* CANCELED */, 'User canceled the upload/download.');
    }
    function invalidUrl(url) {
        return new StorageError("invalid-url" /* INVALID_URL */, "Invalid URL '" + url + "'.");
    }
    function invalidDefaultBucket(bucket) {
        return new StorageError("invalid-default-bucket" /* INVALID_DEFAULT_BUCKET */, "Invalid default bucket '" + bucket + "'.");
    }
    function noDefaultBucket() {
        return new StorageError("no-default-bucket" /* NO_DEFAULT_BUCKET */, 'No default bucket ' +
            "found. Did you set the '" +
            CONFIG_STORAGE_BUCKET_KEY +
            "' property when initializing the app?");
    }
    function cannotSliceBlob() {
        return new StorageError("cannot-slice-blob" /* CANNOT_SLICE_BLOB */, 'Cannot slice blob for upload. Please retry the upload.');
    }
    /**
     * @internal
     */
    function invalidArgument(message) {
        return new StorageError("invalid-argument" /* INVALID_ARGUMENT */, message);
    }
    function appDeleted() {
        return new StorageError("app-deleted" /* APP_DELETED */, 'The Firebase app was deleted.');
    }
    /**
     * @param name - The name of the operation that was invalid.
     *
     * @internal
     */
    function invalidRootOperation(name) {
        return new StorageError("invalid-root-operation" /* INVALID_ROOT_OPERATION */, "The operation '" +
            name +
            "' cannot be performed on a root reference, create a non-root " +
            "reference using child, such as .child('file.png').");
    }
    /**
     * @param format - The format that was not valid.
     * @param message - A message describing the format violation.
     */
    function invalidFormat(format, message) {
        return new StorageError("invalid-format" /* INVALID_FORMAT */, "String does not match format '" + format + "': " + message);
    }
    /**
     * @param message - A message describing the internal error.
     */
    function internalError(message) {
        throw new StorageError("internal-error" /* INTERNAL_ERROR */, 'Internal error: ' + message);
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * Network layer for browsers. We use this instead of goog.net.XhrIo because
     * goog.net.XhrIo is hyuuuuge and doesn't work in React Native on Android.
     */
    class XhrConnection {
        constructor() {
            this.sent_ = false;
            this.xhr_ = new XMLHttpRequest();
            this.errorCode_ = ErrorCode.NO_ERROR;
            this.sendPromise_ = new Promise(resolve => {
                this.xhr_.addEventListener('abort', () => {
                    this.errorCode_ = ErrorCode.ABORT;
                    resolve();
                });
                this.xhr_.addEventListener('error', () => {
                    this.errorCode_ = ErrorCode.NETWORK_ERROR;
                    resolve();
                });
                this.xhr_.addEventListener('load', () => {
                    resolve();
                });
            });
        }
        send(url, method, body, headers) {
            if (this.sent_) {
                throw internalError('cannot .send() more than once');
            }
            this.sent_ = true;
            this.xhr_.open(method, url, true);
            if (headers !== undefined) {
                for (const key in headers) {
                    if (headers.hasOwnProperty(key)) {
                        this.xhr_.setRequestHeader(key, headers[key].toString());
                    }
                }
            }
            if (body !== undefined) {
                this.xhr_.send(body);
            }
            else {
                this.xhr_.send();
            }
            return this.sendPromise_;
        }
        getErrorCode() {
            if (!this.sent_) {
                throw internalError('cannot .getErrorCode() before sending');
            }
            return this.errorCode_;
        }
        getStatus() {
            if (!this.sent_) {
                throw internalError('cannot .getStatus() before sending');
            }
            try {
                return this.xhr_.status;
            }
            catch (e) {
                return -1;
            }
        }
        getResponseText() {
            if (!this.sent_) {
                throw internalError('cannot .getResponseText() before sending');
            }
            return this.xhr_.responseText;
        }
        /** Aborts the request. */
        abort() {
            this.xhr_.abort();
        }
        getResponseHeader(header) {
            return this.xhr_.getResponseHeader(header);
        }
        addUploadProgressListener(listener) {
            if (this.xhr_.upload != null) {
                this.xhr_.upload.addEventListener('progress', listener);
            }
        }
        removeUploadProgressListener(listener) {
            if (this.xhr_.upload != null) {
                this.xhr_.upload.removeEventListener('progress', listener);
            }
        }
    }
    function newConnection() {
        return new XhrConnection();
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * Factory-like class for creating XhrIo instances.
     */
    class ConnectionPool {
        createConnection() {
            return newConnection();
        }
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * Firebase Storage location data.
     *
     * @internal
     */
    class Location {
        constructor(bucket, path) {
            this.bucket = bucket;
            this.path_ = path;
        }
        get path() {
            return this.path_;
        }
        get isRoot() {
            return this.path.length === 0;
        }
        fullServerUrl() {
            const encode = encodeURIComponent;
            return '/b/' + encode(this.bucket) + '/o/' + encode(this.path);
        }
        bucketOnlyServerUrl() {
            const encode = encodeURIComponent;
            return '/b/' + encode(this.bucket) + '/o';
        }
        static makeFromBucketSpec(bucketString, host) {
            let bucketLocation;
            try {
                bucketLocation = Location.makeFromUrl(bucketString, host);
            }
            catch (e) {
                // Not valid URL, use as-is. This lets you put bare bucket names in
                // config.
                return new Location(bucketString, '');
            }
            if (bucketLocation.path === '') {
                return bucketLocation;
            }
            else {
                throw invalidDefaultBucket(bucketString);
            }
        }
        static makeFromUrl(url, host) {
            let location = null;
            const bucketDomain = '([A-Za-z0-9.\\-_]+)';
            function gsModify(loc) {
                if (loc.path.charAt(loc.path.length - 1) === '/') {
                    loc.path_ = loc.path_.slice(0, -1);
                }
            }
            const gsPath = '(/(.*))?$';
            const gsRegex = new RegExp('^gs://' + bucketDomain + gsPath, 'i');
            const gsIndices = { bucket: 1, path: 3 };
            function httpModify(loc) {
                loc.path_ = decodeURIComponent(loc.path);
            }
            const version = 'v[A-Za-z0-9_]+';
            const firebaseStorageHost = host.replace(/[.]/g, '\\.');
            const firebaseStoragePath = '(/([^?#]*).*)?$';
            const firebaseStorageRegExp = new RegExp(`^https?://${firebaseStorageHost}/${version}/b/${bucketDomain}/o${firebaseStoragePath}`, 'i');
            const firebaseStorageIndices = { bucket: 1, path: 3 };
            const cloudStorageHost = host === DEFAULT_HOST
                ? '(?:storage.googleapis.com|storage.cloud.google.com)'
                : host;
            const cloudStoragePath = '([^?#]*)';
            const cloudStorageRegExp = new RegExp(`^https?://${cloudStorageHost}/${bucketDomain}/${cloudStoragePath}`, 'i');
            const cloudStorageIndices = { bucket: 1, path: 2 };
            const groups = [
                { regex: gsRegex, indices: gsIndices, postModify: gsModify },
                {
                    regex: firebaseStorageRegExp,
                    indices: firebaseStorageIndices,
                    postModify: httpModify
                },
                {
                    regex: cloudStorageRegExp,
                    indices: cloudStorageIndices,
                    postModify: httpModify
                }
            ];
            for (let i = 0; i < groups.length; i++) {
                const group = groups[i];
                const captures = group.regex.exec(url);
                if (captures) {
                    const bucketValue = captures[group.indices.bucket];
                    let pathValue = captures[group.indices.path];
                    if (!pathValue) {
                        pathValue = '';
                    }
                    location = new Location(bucketValue, pathValue);
                    group.postModify(location);
                    break;
                }
            }
            if (location == null) {
                throw invalidUrl(url);
            }
            return location;
        }
    }

    /**
     * A request whose promise always fails.
     */
    class FailRequest {
        constructor(error) {
            this.promise_ = Promise.reject(error);
        }
        /** @inheritDoc */
        getPromise() {
            return this.promise_;
        }
        /** @inheritDoc */
        cancel(_appDelete = false) { }
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * @param f May be invoked
     *     before the function returns.
     * @param callback Get all the arguments passed to the function
     *     passed to f, including the initial boolean.
     */
    function start$1(f, 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    callback, timeout) {
        // TODO(andysoto): make this code cleaner (probably refactor into an actual
        // type instead of a bunch of functions with state shared in the closure)
        let waitSeconds = 1;
        // Would type this as "number" but that doesn't work for Node so ¯\_(ツ)_/¯
        // TODO: find a way to exclude Node type definition for storage because storage only works in browser
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let timeoutId = null;
        let hitTimeout = false;
        let cancelState = 0;
        function canceled() {
            return cancelState === 2;
        }
        let triggeredCallback = false;
        function triggerCallback(...args) {
            if (!triggeredCallback) {
                triggeredCallback = true;
                callback.apply(null, args);
            }
        }
        function callWithDelay(millis) {
            timeoutId = setTimeout(() => {
                timeoutId = null;
                f(handler, canceled());
            }, millis);
        }
        function handler(success, ...args) {
            if (triggeredCallback) {
                return;
            }
            if (success) {
                triggerCallback.call(null, success, ...args);
                return;
            }
            const mustStop = canceled() || hitTimeout;
            if (mustStop) {
                triggerCallback.call(null, success, ...args);
                return;
            }
            if (waitSeconds < 64) {
                /* TODO(andysoto): don't back off so quickly if we know we're offline. */
                waitSeconds *= 2;
            }
            let waitMillis;
            if (cancelState === 1) {
                cancelState = 2;
                waitMillis = 0;
            }
            else {
                waitMillis = (waitSeconds + Math.random()) * 1000;
            }
            callWithDelay(waitMillis);
        }
        let stopped = false;
        function stop(wasTimeout) {
            if (stopped) {
                return;
            }
            stopped = true;
            if (triggeredCallback) {
                return;
            }
            if (timeoutId !== null) {
                if (!wasTimeout) {
                    cancelState = 2;
                }
                clearTimeout(timeoutId);
                callWithDelay(0);
            }
            else {
                if (!wasTimeout) {
                    cancelState = 1;
                }
            }
        }
        callWithDelay(0);
        setTimeout(() => {
            hitTimeout = true;
            stop(true);
        }, timeout);
        return stop;
    }
    /**
     * Stops the retry loop from repeating.
     * If the function is currently "in between" retries, it is invoked immediately
     * with the second parameter as "true". Otherwise, it will be invoked once more
     * after the current invocation finishes iff the current invocation would have
     * triggered another retry.
     */
    function stop(id) {
        id(false);
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    function isJustDef(p) {
        return p !== void 0;
    }
    function isNonArrayObject(p) {
        return typeof p === 'object' && !Array.isArray(p);
    }
    function isString(p) {
        return typeof p === 'string' || p instanceof String;
    }
    function isNativeBlob(p) {
        return isNativeBlobDefined() && p instanceof Blob;
    }
    function isNativeBlobDefined() {
        return typeof Blob !== 'undefined';
    }
    function validateNumber(argument, minValue, maxValue, value) {
        if (value < minValue) {
            throw invalidArgument(`Invalid value for '${argument}'. Expected ${minValue} or greater.`);
        }
        if (value > maxValue) {
            throw invalidArgument(`Invalid value for '${argument}'. Expected ${maxValue} or less.`);
        }
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    function makeUrl(urlPart, host, protocol) {
        let origin = host;
        if (protocol == null) {
            origin = `https://${host}`;
        }
        return `${protocol}://${origin}/v0${urlPart}`;
    }
    function makeQueryString(params) {
        const encode = encodeURIComponent;
        let queryPart = '?';
        for (const key in params) {
            if (params.hasOwnProperty(key)) {
                const nextPart = encode(key) + '=' + encode(params[key]);
                queryPart = queryPart + nextPart + '&';
            }
        }
        // Chop off the extra '&' or '?' on the end
        queryPart = queryPart.slice(0, -1);
        return queryPart;
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    class NetworkRequest {
        constructor(url_, method_, headers_, body_, successCodes_, additionalRetryCodes_, callback_, errorCallback_, timeout_, progressCallback_, pool_) {
            this.url_ = url_;
            this.method_ = method_;
            this.headers_ = headers_;
            this.body_ = body_;
            this.successCodes_ = successCodes_;
            this.additionalRetryCodes_ = additionalRetryCodes_;
            this.callback_ = callback_;
            this.errorCallback_ = errorCallback_;
            this.timeout_ = timeout_;
            this.progressCallback_ = progressCallback_;
            this.pool_ = pool_;
            this.pendingConnection_ = null;
            this.backoffId_ = null;
            this.canceled_ = false;
            this.appDelete_ = false;
            this.promise_ = new Promise((resolve, reject) => {
                this.resolve_ = resolve;
                this.reject_ = reject;
                this.start_();
            });
        }
        /**
         * Actually starts the retry loop.
         */
        start_() {
            const doTheRequest = (backoffCallback, canceled) => {
                if (canceled) {
                    backoffCallback(false, new RequestEndStatus(false, null, true));
                    return;
                }
                const connection = this.pool_.createConnection();
                this.pendingConnection_ = connection;
                const progressListener = progressEvent => {
                    const loaded = progressEvent.loaded;
                    const total = progressEvent.lengthComputable
                        ? progressEvent.total
                        : -1;
                    if (this.progressCallback_ !== null) {
                        this.progressCallback_(loaded, total);
                    }
                };
                if (this.progressCallback_ !== null) {
                    connection.addUploadProgressListener(progressListener);
                }
                // connection.send() never rejects, so we don't need to have a error handler or use catch on the returned promise.
                // eslint-disable-next-line @typescript-eslint/no-floating-promises
                connection
                    .send(this.url_, this.method_, this.body_, this.headers_)
                    .then(() => {
                    if (this.progressCallback_ !== null) {
                        connection.removeUploadProgressListener(progressListener);
                    }
                    this.pendingConnection_ = null;
                    const hitServer = connection.getErrorCode() === ErrorCode.NO_ERROR;
                    const status = connection.getStatus();
                    if (!hitServer || this.isRetryStatusCode_(status)) {
                        const wasCanceled = connection.getErrorCode() === ErrorCode.ABORT;
                        backoffCallback(false, new RequestEndStatus(false, null, wasCanceled));
                        return;
                    }
                    const successCode = this.successCodes_.indexOf(status) !== -1;
                    backoffCallback(true, new RequestEndStatus(successCode, connection));
                });
            };
            /**
             * @param requestWentThrough - True if the request eventually went
             *     through, false if it hit the retry limit or was canceled.
             */
            const backoffDone = (requestWentThrough, status) => {
                const resolve = this.resolve_;
                const reject = this.reject_;
                const connection = status.connection;
                if (status.wasSuccessCode) {
                    try {
                        const result = this.callback_(connection, connection.getResponseText());
                        if (isJustDef(result)) {
                            resolve(result);
                        }
                        else {
                            resolve();
                        }
                    }
                    catch (e) {
                        reject(e);
                    }
                }
                else {
                    if (connection !== null) {
                        const err = unknown();
                        err.serverResponse = connection.getResponseText();
                        if (this.errorCallback_) {
                            reject(this.errorCallback_(connection, err));
                        }
                        else {
                            reject(err);
                        }
                    }
                    else {
                        if (status.canceled) {
                            const err = this.appDelete_ ? appDeleted() : canceled();
                            reject(err);
                        }
                        else {
                            const err = retryLimitExceeded();
                            reject(err);
                        }
                    }
                }
            };
            if (this.canceled_) {
                backoffDone(false, new RequestEndStatus(false, null, true));
            }
            else {
                this.backoffId_ = start$1(doTheRequest, backoffDone, this.timeout_);
            }
        }
        /** @inheritDoc */
        getPromise() {
            return this.promise_;
        }
        /** @inheritDoc */
        cancel(appDelete) {
            this.canceled_ = true;
            this.appDelete_ = appDelete || false;
            if (this.backoffId_ !== null) {
                stop(this.backoffId_);
            }
            if (this.pendingConnection_ !== null) {
                this.pendingConnection_.abort();
            }
        }
        isRetryStatusCode_(status) {
            // The codes for which to retry came from this page:
            // https://cloud.google.com/storage/docs/exponential-backoff
            const isFiveHundredCode = status >= 500 && status < 600;
            const extraRetryCodes = [
                // Request Timeout: web server didn't receive full request in time.
                408,
                // Too Many Requests: you're getting rate-limited, basically.
                429
            ];
            const isExtraRetryCode = extraRetryCodes.indexOf(status) !== -1;
            const isRequestSpecificRetryCode = this.additionalRetryCodes_.indexOf(status) !== -1;
            return isFiveHundredCode || isExtraRetryCode || isRequestSpecificRetryCode;
        }
    }
    /**
     * A collection of information about the result of a network request.
     * @param opt_canceled - Defaults to false.
     */
    class RequestEndStatus {
        constructor(wasSuccessCode, connection, canceled) {
            this.wasSuccessCode = wasSuccessCode;
            this.connection = connection;
            this.canceled = !!canceled;
        }
    }
    function addAuthHeader_(headers, authToken) {
        if (authToken !== null && authToken.length > 0) {
            headers['Authorization'] = 'Firebase ' + authToken;
        }
    }
    function addVersionHeader_(headers, firebaseVersion) {
        headers['X-Firebase-Storage-Version'] =
            'webjs/' + (firebaseVersion !== null && firebaseVersion !== void 0 ? firebaseVersion : 'AppManager');
    }
    function addGmpidHeader_(headers, appId) {
        if (appId) {
            headers['X-Firebase-GMPID'] = appId;
        }
    }
    function addAppCheckHeader_(headers, appCheckToken) {
        if (appCheckToken !== null) {
            headers['X-Firebase-AppCheck'] = appCheckToken;
        }
    }
    function makeRequest(requestInfo, appId, authToken, appCheckToken, pool, firebaseVersion) {
        const queryPart = makeQueryString(requestInfo.urlParams);
        const url = requestInfo.url + queryPart;
        const headers = Object.assign({}, requestInfo.headers);
        addGmpidHeader_(headers, appId);
        addAuthHeader_(headers, authToken);
        addVersionHeader_(headers, firebaseVersion);
        addAppCheckHeader_(headers, appCheckToken);
        return new NetworkRequest(url, requestInfo.method, headers, requestInfo.body, requestInfo.successCodes, requestInfo.additionalRetryCodes, requestInfo.handler, requestInfo.errorHandler, requestInfo.timeout, requestInfo.progressCallback, pool);
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    function getBlobBuilder() {
        if (typeof BlobBuilder !== 'undefined') {
            return BlobBuilder;
        }
        else if (typeof WebKitBlobBuilder !== 'undefined') {
            return WebKitBlobBuilder;
        }
        else {
            return undefined;
        }
    }
    /**
     * Concatenates one or more values together and converts them to a Blob.
     *
     * @param args The values that will make up the resulting blob.
     * @return The blob.
     */
    function getBlob(...args) {
        const BlobBuilder = getBlobBuilder();
        if (BlobBuilder !== undefined) {
            const bb = new BlobBuilder();
            for (let i = 0; i < args.length; i++) {
                bb.append(args[i]);
            }
            return bb.getBlob();
        }
        else {
            if (isNativeBlobDefined()) {
                return new Blob(args);
            }
            else {
                throw new StorageError("unsupported-environment" /* UNSUPPORTED_ENVIRONMENT */, "This browser doesn't seem to support creating Blobs");
            }
        }
    }
    /**
     * Slices the blob. The returned blob contains data from the start byte
     * (inclusive) till the end byte (exclusive). Negative indices cannot be used.
     *
     * @param blob The blob to be sliced.
     * @param start Index of the starting byte.
     * @param end Index of the ending byte.
     * @return The blob slice or null if not supported.
     */
    function sliceBlob(blob, start, end) {
        if (blob.webkitSlice) {
            return blob.webkitSlice(start, end);
        }
        else if (blob.mozSlice) {
            return blob.mozSlice(start, end);
        }
        else if (blob.slice) {
            return blob.slice(start, end);
        }
        return null;
    }

    /**
     * @license
     * Copyright 2021 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /** Converts a Base64 encoded string to a binary string. */
    function decodeBase64(encoded) {
        return atob(encoded);
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * An enumeration of the possible string formats for upload.
     * @public
     */
    const StringFormat = {
        /**
         * Indicates the string should be interpreted "raw", that is, as normal text.
         * The string will be interpreted as UTF-16, then uploaded as a UTF-8 byte
         * sequence.
         * Example: The string 'Hello! \\ud83d\\ude0a' becomes the byte sequence
         * 48 65 6c 6c 6f 21 20 f0 9f 98 8a
         */
        RAW: 'raw',
        /**
         * Indicates the string should be interpreted as base64-encoded data.
         * Padding characters (trailing '='s) are optional.
         * Example: The string 'rWmO++E6t7/rlw==' becomes the byte sequence
         * ad 69 8e fb e1 3a b7 bf eb 97
         */
        BASE64: 'base64',
        /**
         * Indicates the string should be interpreted as base64url-encoded data.
         * Padding characters (trailing '='s) are optional.
         * Example: The string 'rWmO--E6t7_rlw==' becomes the byte sequence
         * ad 69 8e fb e1 3a b7 bf eb 97
         */
        BASE64URL: 'base64url',
        /**
         * Indicates the string is a data URL, such as one obtained from
         * canvas.toDataURL().
         * Example: the string 'data:application/octet-stream;base64,aaaa'
         * becomes the byte sequence
         * 69 a6 9a
         * (the content-type "application/octet-stream" is also applied, but can
         * be overridden in the metadata object).
         */
        DATA_URL: 'data_url'
    };
    class StringData {
        constructor(data, contentType) {
            this.data = data;
            this.contentType = contentType || null;
        }
    }
    /**
     * @internal
     */
    function dataFromString(format, stringData) {
        switch (format) {
            case StringFormat.RAW:
                return new StringData(utf8Bytes_(stringData));
            case StringFormat.BASE64:
            case StringFormat.BASE64URL:
                return new StringData(base64Bytes_(format, stringData));
            case StringFormat.DATA_URL:
                return new StringData(dataURLBytes_(stringData), dataURLContentType_(stringData));
            // do nothing
        }
        // assert(false);
        throw unknown();
    }
    function utf8Bytes_(value) {
        const b = [];
        for (let i = 0; i < value.length; i++) {
            let c = value.charCodeAt(i);
            if (c <= 127) {
                b.push(c);
            }
            else {
                if (c <= 2047) {
                    b.push(192 | (c >> 6), 128 | (c & 63));
                }
                else {
                    if ((c & 64512) === 55296) {
                        // The start of a surrogate pair.
                        const valid = i < value.length - 1 && (value.charCodeAt(i + 1) & 64512) === 56320;
                        if (!valid) {
                            // The second surrogate wasn't there.
                            b.push(239, 191, 189);
                        }
                        else {
                            const hi = c;
                            const lo = value.charCodeAt(++i);
                            c = 65536 | ((hi & 1023) << 10) | (lo & 1023);
                            b.push(240 | (c >> 18), 128 | ((c >> 12) & 63), 128 | ((c >> 6) & 63), 128 | (c & 63));
                        }
                    }
                    else {
                        if ((c & 64512) === 56320) {
                            // Invalid low surrogate.
                            b.push(239, 191, 189);
                        }
                        else {
                            b.push(224 | (c >> 12), 128 | ((c >> 6) & 63), 128 | (c & 63));
                        }
                    }
                }
            }
        }
        return new Uint8Array(b);
    }
    function percentEncodedBytes_(value) {
        let decoded;
        try {
            decoded = decodeURIComponent(value);
        }
        catch (e) {
            throw invalidFormat(StringFormat.DATA_URL, 'Malformed data URL.');
        }
        return utf8Bytes_(decoded);
    }
    function base64Bytes_(format, value) {
        switch (format) {
            case StringFormat.BASE64: {
                const hasMinus = value.indexOf('-') !== -1;
                const hasUnder = value.indexOf('_') !== -1;
                if (hasMinus || hasUnder) {
                    const invalidChar = hasMinus ? '-' : '_';
                    throw invalidFormat(format, "Invalid character '" +
                        invalidChar +
                        "' found: is it base64url encoded?");
                }
                break;
            }
            case StringFormat.BASE64URL: {
                const hasPlus = value.indexOf('+') !== -1;
                const hasSlash = value.indexOf('/') !== -1;
                if (hasPlus || hasSlash) {
                    const invalidChar = hasPlus ? '+' : '/';
                    throw invalidFormat(format, "Invalid character '" + invalidChar + "' found: is it base64 encoded?");
                }
                value = value.replace(/-/g, '+').replace(/_/g, '/');
                break;
            }
            // do nothing
        }
        let bytes;
        try {
            bytes = decodeBase64(value);
        }
        catch (e) {
            throw invalidFormat(format, 'Invalid character found');
        }
        const array = new Uint8Array(bytes.length);
        for (let i = 0; i < bytes.length; i++) {
            array[i] = bytes.charCodeAt(i);
        }
        return array;
    }
    class DataURLParts {
        constructor(dataURL) {
            this.base64 = false;
            this.contentType = null;
            const matches = dataURL.match(/^data:([^,]+)?,/);
            if (matches === null) {
                throw invalidFormat(StringFormat.DATA_URL, "Must be formatted 'data:[<mediatype>][;base64],<data>");
            }
            const middle = matches[1] || null;
            if (middle != null) {
                this.base64 = endsWith(middle, ';base64');
                this.contentType = this.base64
                    ? middle.substring(0, middle.length - ';base64'.length)
                    : middle;
            }
            this.rest = dataURL.substring(dataURL.indexOf(',') + 1);
        }
    }
    function dataURLBytes_(dataUrl) {
        const parts = new DataURLParts(dataUrl);
        if (parts.base64) {
            return base64Bytes_(StringFormat.BASE64, parts.rest);
        }
        else {
            return percentEncodedBytes_(parts.rest);
        }
    }
    function dataURLContentType_(dataUrl) {
        const parts = new DataURLParts(dataUrl);
        return parts.contentType;
    }
    function endsWith(s, end) {
        const longEnough = s.length >= end.length;
        if (!longEnough) {
            return false;
        }
        return s.substring(s.length - end.length) === end;
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * @param opt_elideCopy - If true, doesn't copy mutable input data
     *     (e.g. Uint8Arrays). Pass true only if you know the objects will not be
     *     modified after this blob's construction.
     *
     * @internal
     */
    class FbsBlob {
        constructor(data, elideCopy) {
            let size = 0;
            let blobType = '';
            if (isNativeBlob(data)) {
                this.data_ = data;
                size = data.size;
                blobType = data.type;
            }
            else if (data instanceof ArrayBuffer) {
                if (elideCopy) {
                    this.data_ = new Uint8Array(data);
                }
                else {
                    this.data_ = new Uint8Array(data.byteLength);
                    this.data_.set(new Uint8Array(data));
                }
                size = this.data_.length;
            }
            else if (data instanceof Uint8Array) {
                if (elideCopy) {
                    this.data_ = data;
                }
                else {
                    this.data_ = new Uint8Array(data.length);
                    this.data_.set(data);
                }
                size = data.length;
            }
            this.size_ = size;
            this.type_ = blobType;
        }
        size() {
            return this.size_;
        }
        type() {
            return this.type_;
        }
        slice(startByte, endByte) {
            if (isNativeBlob(this.data_)) {
                const realBlob = this.data_;
                const sliced = sliceBlob(realBlob, startByte, endByte);
                if (sliced === null) {
                    return null;
                }
                return new FbsBlob(sliced);
            }
            else {
                const slice = new Uint8Array(this.data_.buffer, startByte, endByte - startByte);
                return new FbsBlob(slice, true);
            }
        }
        static getBlob(...args) {
            if (isNativeBlobDefined()) {
                const blobby = args.map((val) => {
                    if (val instanceof FbsBlob) {
                        return val.data_;
                    }
                    else {
                        return val;
                    }
                });
                return new FbsBlob(getBlob.apply(null, blobby));
            }
            else {
                const uint8Arrays = args.map((val) => {
                    if (isString(val)) {
                        return dataFromString(StringFormat.RAW, val).data;
                    }
                    else {
                        // Blobs don't exist, so this has to be a Uint8Array.
                        return val.data_;
                    }
                });
                let finalLength = 0;
                uint8Arrays.forEach((array) => {
                    finalLength += array.byteLength;
                });
                const merged = new Uint8Array(finalLength);
                let index = 0;
                uint8Arrays.forEach((array) => {
                    for (let i = 0; i < array.length; i++) {
                        merged[index++] = array[i];
                    }
                });
                return new FbsBlob(merged, true);
            }
        }
        uploadData() {
            return this.data_;
        }
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * Returns the Object resulting from parsing the given JSON, or null if the
     * given string does not represent a JSON object.
     */
    function jsonObjectOrNull(s) {
        let obj;
        try {
            obj = JSON.parse(s);
        }
        catch (e) {
            return null;
        }
        if (isNonArrayObject(obj)) {
            return obj;
        }
        else {
            return null;
        }
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * @fileoverview Contains helper methods for manipulating paths.
     */
    /**
     * @return Null if the path is already at the root.
     */
    function parent(path) {
        if (path.length === 0) {
            return null;
        }
        const index = path.lastIndexOf('/');
        if (index === -1) {
            return '';
        }
        const newPath = path.slice(0, index);
        return newPath;
    }
    function child$1(path, childPath) {
        const canonicalChildPath = childPath
            .split('/')
            .filter(component => component.length > 0)
            .join('/');
        if (path.length === 0) {
            return canonicalChildPath;
        }
        else {
            return path + '/' + canonicalChildPath;
        }
    }
    /**
     * Returns the last component of a path.
     * '/foo/bar' -> 'bar'
     * '/foo/bar/baz/' -> 'baz/'
     * '/a' -> 'a'
     */
    function lastComponent(path) {
        const index = path.lastIndexOf('/', path.length - 2);
        if (index === -1) {
            return path;
        }
        else {
            return path.slice(index + 1);
        }
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    function noXform_(metadata, value) {
        return value;
    }
    class Mapping {
        constructor(server, local, writable, xform) {
            this.server = server;
            this.local = local || server;
            this.writable = !!writable;
            this.xform = xform || noXform_;
        }
    }
    let mappings_ = null;
    function xformPath(fullPath) {
        if (!isString(fullPath) || fullPath.length < 2) {
            return fullPath;
        }
        else {
            return lastComponent(fullPath);
        }
    }
    function getMappings() {
        if (mappings_) {
            return mappings_;
        }
        const mappings = [];
        mappings.push(new Mapping('bucket'));
        mappings.push(new Mapping('generation'));
        mappings.push(new Mapping('metageneration'));
        mappings.push(new Mapping('name', 'fullPath', true));
        function mappingsXformPath(_metadata, fullPath) {
            return xformPath(fullPath);
        }
        const nameMapping = new Mapping('name');
        nameMapping.xform = mappingsXformPath;
        mappings.push(nameMapping);
        /**
         * Coerces the second param to a number, if it is defined.
         */
        function xformSize(_metadata, size) {
            if (size !== undefined) {
                return Number(size);
            }
            else {
                return size;
            }
        }
        const sizeMapping = new Mapping('size');
        sizeMapping.xform = xformSize;
        mappings.push(sizeMapping);
        mappings.push(new Mapping('timeCreated'));
        mappings.push(new Mapping('updated'));
        mappings.push(new Mapping('md5Hash', null, true));
        mappings.push(new Mapping('cacheControl', null, true));
        mappings.push(new Mapping('contentDisposition', null, true));
        mappings.push(new Mapping('contentEncoding', null, true));
        mappings.push(new Mapping('contentLanguage', null, true));
        mappings.push(new Mapping('contentType', null, true));
        mappings.push(new Mapping('metadata', 'customMetadata', true));
        mappings_ = mappings;
        return mappings_;
    }
    function addRef(metadata, service) {
        function generateRef() {
            const bucket = metadata['bucket'];
            const path = metadata['fullPath'];
            const loc = new Location(bucket, path);
            return service._makeStorageReference(loc);
        }
        Object.defineProperty(metadata, 'ref', { get: generateRef });
    }
    function fromResource(service, resource, mappings) {
        const metadata = {};
        metadata['type'] = 'file';
        const len = mappings.length;
        for (let i = 0; i < len; i++) {
            const mapping = mappings[i];
            metadata[mapping.local] = mapping.xform(metadata, resource[mapping.server]);
        }
        addRef(metadata, service);
        return metadata;
    }
    function fromResourceString(service, resourceString, mappings) {
        const obj = jsonObjectOrNull(resourceString);
        if (obj === null) {
            return null;
        }
        const resource = obj;
        return fromResource(service, resource, mappings);
    }
    function toResourceString(metadata, mappings) {
        const resource = {};
        const len = mappings.length;
        for (let i = 0; i < len; i++) {
            const mapping = mappings[i];
            if (mapping.writable) {
                resource[mapping.server] = metadata[mapping.local];
            }
        }
        return JSON.stringify(resource);
    }

    class RequestInfo {
        constructor(url, method, 
        /**
         * Returns the value with which to resolve the request's promise. Only called
         * if the request is successful. Throw from this function to reject the
         * returned Request's promise with the thrown error.
         * Note: The XhrIo passed to this function may be reused after this callback
         * returns. Do not keep a reference to it in any way.
         */
        handler, timeout) {
            this.url = url;
            this.method = method;
            this.handler = handler;
            this.timeout = timeout;
            this.urlParams = {};
            this.headers = {};
            this.body = null;
            this.errorHandler = null;
            /**
             * Called with the current number of bytes uploaded and total size (-1 if not
             * computable) of the request body (i.e. used to report upload progress).
             */
            this.progressCallback = null;
            this.successCodes = [200];
            this.additionalRetryCodes = [];
        }
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * Throws the UNKNOWN StorageError if cndn is false.
     */
    function handlerCheck(cndn) {
        if (!cndn) {
            throw unknown();
        }
    }
    function metadataHandler(service, mappings) {
        function handler(xhr, text) {
            const metadata = fromResourceString(service, text, mappings);
            handlerCheck(metadata !== null);
            return metadata;
        }
        return handler;
    }
    function sharedErrorHandler(location) {
        function errorHandler(xhr, err) {
            let newErr;
            if (xhr.getStatus() === 401) {
                if (
                // This exact message string is the only consistent part of the
                // server's error response that identifies it as an App Check error.
                xhr.getResponseText().includes('Firebase App Check token is invalid')) {
                    newErr = unauthorizedApp();
                }
                else {
                    newErr = unauthenticated();
                }
            }
            else {
                if (xhr.getStatus() === 402) {
                    newErr = quotaExceeded(location.bucket);
                }
                else {
                    if (xhr.getStatus() === 403) {
                        newErr = unauthorized(location.path);
                    }
                    else {
                        newErr = err;
                    }
                }
            }
            newErr.serverResponse = err.serverResponse;
            return newErr;
        }
        return errorHandler;
    }
    function determineContentType_(metadata, blob) {
        return ((metadata && metadata['contentType']) ||
            (blob && blob.type()) ||
            'application/octet-stream');
    }
    function metadataForUpload_(location, blob, metadata) {
        const metadataClone = Object.assign({}, metadata);
        metadataClone['fullPath'] = location.path;
        metadataClone['size'] = blob.size();
        if (!metadataClone['contentType']) {
            metadataClone['contentType'] = determineContentType_(null, blob);
        }
        return metadataClone;
    }
    /**
     * Prepare RequestInfo for uploads as Content-Type: multipart.
     */
    function multipartUpload(service, location, mappings, blob, metadata) {
        const urlPart = location.bucketOnlyServerUrl();
        const headers = {
            'X-Goog-Upload-Protocol': 'multipart'
        };
        function genBoundary() {
            let str = '';
            for (let i = 0; i < 2; i++) {
                str = str + Math.random().toString().slice(2);
            }
            return str;
        }
        const boundary = genBoundary();
        headers['Content-Type'] = 'multipart/related; boundary=' + boundary;
        const metadata_ = metadataForUpload_(location, blob, metadata);
        const metadataString = toResourceString(metadata_, mappings);
        const preBlobPart = '--' +
            boundary +
            '\r\n' +
            'Content-Type: application/json; charset=utf-8\r\n\r\n' +
            metadataString +
            '\r\n--' +
            boundary +
            '\r\n' +
            'Content-Type: ' +
            metadata_['contentType'] +
            '\r\n\r\n';
        const postBlobPart = '\r\n--' + boundary + '--';
        const body = FbsBlob.getBlob(preBlobPart, blob, postBlobPart);
        if (body === null) {
            throw cannotSliceBlob();
        }
        const urlParams = { name: metadata_['fullPath'] };
        const url = makeUrl(urlPart, service.host, service._protocol);
        const method = 'POST';
        const timeout = service.maxUploadRetryTime;
        const requestInfo = new RequestInfo(url, method, metadataHandler(service, mappings), timeout);
        requestInfo.urlParams = urlParams;
        requestInfo.headers = headers;
        requestInfo.body = body.uploadData();
        requestInfo.errorHandler = sharedErrorHandler(location);
        return requestInfo;
    }

    /**
     * @license
     * Copyright 2019 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * Provides methods to interact with a bucket in the Firebase Storage service.
     * @internal
     * @param _location - An fbs.location, or the URL at
     *     which to base this object, in one of the following forms:
     *         gs://<bucket>/<object-path>
     *         http[s]://firebasestorage.googleapis.com/
     *                     <api-version>/b/<bucket>/o/<object-path>
     *     Any query or fragment strings will be ignored in the http[s]
     *     format. If no value is passed, the storage object will use a URL based on
     *     the project ID of the base firebase.App instance.
     */
    class Reference {
        constructor(_service, location) {
            this._service = _service;
            if (location instanceof Location) {
                this._location = location;
            }
            else {
                this._location = Location.makeFromUrl(location, _service.host);
            }
        }
        /**
         * Returns the URL for the bucket and path this object references,
         *     in the form gs://<bucket>/<object-path>
         * @override
         */
        toString() {
            return 'gs://' + this._location.bucket + '/' + this._location.path;
        }
        _newRef(service, location) {
            return new Reference(service, location);
        }
        /**
         * A reference to the root of this object's bucket.
         */
        get root() {
            const location = new Location(this._location.bucket, '');
            return this._newRef(this._service, location);
        }
        /**
         * The name of the bucket containing this reference's object.
         */
        get bucket() {
            return this._location.bucket;
        }
        /**
         * The full path of this object.
         */
        get fullPath() {
            return this._location.path;
        }
        /**
         * The short name of this object, which is the last component of the full path.
         * For example, if fullPath is 'full/path/image.png', name is 'image.png'.
         */
        get name() {
            return lastComponent(this._location.path);
        }
        /**
         * The `StorageService` instance this `StorageReference` is associated with.
         */
        get storage() {
            return this._service;
        }
        /**
         * A `StorageReference` pointing to the parent location of this `StorageReference`, or null if
         * this reference is the root.
         */
        get parent() {
            const newPath = parent(this._location.path);
            if (newPath === null) {
                return null;
            }
            const location = new Location(this._location.bucket, newPath);
            return new Reference(this._service, location);
        }
        /**
         * Utility function to throw an error in methods that do not accept a root reference.
         */
        _throwIfRoot(name) {
            if (this._location.path === '') {
                throw invalidRootOperation(name);
            }
        }
    }
    /**
     * Uploads data to this object's location.
     * The upload is not resumable.
     *
     * @param ref - StorageReference where data should be uploaded.
     * @param data - The data to upload.
     * @param metadata - Metadata for the newly uploaded data.
     * @returns A Promise containing an UploadResult
     */
    function uploadBytes$1(ref, data, metadata) {
        ref._throwIfRoot('uploadBytes');
        const requestInfo = multipartUpload(ref.storage, ref._location, getMappings(), new FbsBlob(data, true), metadata);
        return ref.storage
            .makeRequestWithTokens(requestInfo)
            .then(request => request.getPromise())
            .then(finalMetadata => {
            return {
                metadata: finalMetadata,
                ref
            };
        });
    }
    /**
     * Returns reference for object obtained by appending `childPath` to `ref`.
     *
     * @param ref - StorageReference to get child of.
     * @param childPath - Child path from provided ref.
     * @returns A reference to the object obtained by
     * appending childPath, removing any duplicate, beginning, or trailing
     * slashes.
     *
     */
    function _getChild$1(ref, childPath) {
        const newPath = child$1(ref._location.path, childPath);
        const location = new Location(ref._location.bucket, newPath);
        return new Reference(ref.storage, location);
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    function isUrl(path) {
        return /^[A-Za-z]+:\/\//.test(path);
    }
    /**
     * Returns a firebaseStorage.Reference for the given url.
     */
    function refFromURL(service, url) {
        return new Reference(service, url);
    }
    /**
     * Returns a firebaseStorage.Reference for the given path in the default
     * bucket.
     */
    function refFromPath(ref, path) {
        if (ref instanceof FirebaseStorageImpl) {
            const service = ref;
            if (service._bucket == null) {
                throw noDefaultBucket();
            }
            const reference = new Reference(service, service._bucket);
            if (path != null) {
                return refFromPath(reference, path);
            }
            else {
                return reference;
            }
        }
        else {
            // ref is a Reference
            if (path !== undefined) {
                return _getChild$1(ref, path);
            }
            else {
                return ref;
            }
        }
    }
    function ref$1(serviceOrRef, pathOrUrl) {
        if (pathOrUrl && isUrl(pathOrUrl)) {
            if (serviceOrRef instanceof FirebaseStorageImpl) {
                return refFromURL(serviceOrRef, pathOrUrl);
            }
            else {
                throw invalidArgument('To use ref(service, url), the first argument must be a Storage instance.');
            }
        }
        else {
            return refFromPath(serviceOrRef, pathOrUrl);
        }
    }
    function extractBucket(host, config) {
        const bucketString = config === null || config === void 0 ? void 0 : config[CONFIG_STORAGE_BUCKET_KEY];
        if (bucketString == null) {
            return null;
        }
        return Location.makeFromBucketSpec(bucketString, host);
    }
    /**
     * A service that provides Firebase Storage Reference instances.
     * @param opt_url - gs:// url to a custom Storage Bucket
     *
     * @internal
     */
    class FirebaseStorageImpl {
        constructor(
        /**
         * FirebaseApp associated with this StorageService instance.
         */
        app, _authProvider, 
        /**
         * @internal
         */
        _appCheckProvider, 
        /**
         * @internal
         */
        _pool, _url, _firebaseVersion) {
            this.app = app;
            this._authProvider = _authProvider;
            this._appCheckProvider = _appCheckProvider;
            this._pool = _pool;
            this._url = _url;
            this._firebaseVersion = _firebaseVersion;
            this._bucket = null;
            /**
             * This string can be in the formats:
             * - host
             * - host:port
             */
            this._host = DEFAULT_HOST;
            this._protocol = 'https';
            this._appId = null;
            this._deleted = false;
            this._maxOperationRetryTime = DEFAULT_MAX_OPERATION_RETRY_TIME;
            this._maxUploadRetryTime = DEFAULT_MAX_UPLOAD_RETRY_TIME;
            this._requests = new Set();
            if (_url != null) {
                this._bucket = Location.makeFromBucketSpec(_url, this._host);
            }
            else {
                this._bucket = extractBucket(this._host, this.app.options);
            }
        }
        /**
         * The host string for this service, in the form of `host` or
         * `host:port`.
         */
        get host() {
            return this._host;
        }
        set host(host) {
            this._host = host;
            if (this._url != null) {
                this._bucket = Location.makeFromBucketSpec(this._url, host);
            }
            else {
                this._bucket = extractBucket(host, this.app.options);
            }
        }
        /**
         * The maximum time to retry uploads in milliseconds.
         */
        get maxUploadRetryTime() {
            return this._maxUploadRetryTime;
        }
        set maxUploadRetryTime(time) {
            validateNumber('time', 
            /* minValue=*/ 0, 
            /* maxValue= */ Number.POSITIVE_INFINITY, time);
            this._maxUploadRetryTime = time;
        }
        /**
         * The maximum time to retry operations other than uploads or downloads in
         * milliseconds.
         */
        get maxOperationRetryTime() {
            return this._maxOperationRetryTime;
        }
        set maxOperationRetryTime(time) {
            validateNumber('time', 
            /* minValue=*/ 0, 
            /* maxValue= */ Number.POSITIVE_INFINITY, time);
            this._maxOperationRetryTime = time;
        }
        async _getAuthToken() {
            if (this._overrideAuthToken) {
                return this._overrideAuthToken;
            }
            const auth = this._authProvider.getImmediate({ optional: true });
            if (auth) {
                const tokenData = await auth.getToken();
                if (tokenData !== null) {
                    return tokenData.accessToken;
                }
            }
            return null;
        }
        async _getAppCheckToken() {
            const appCheck = this._appCheckProvider.getImmediate({ optional: true });
            if (appCheck) {
                const result = await appCheck.getToken();
                // TODO: What do we want to do if there is an error getting the token?
                // Context: appCheck.getToken() will never throw even if an error happened. In the error case, a dummy token will be
                // returned along with an error field describing the error. In general, we shouldn't care about the error condition and just use
                // the token (actual or dummy) to send requests.
                return result.token;
            }
            return null;
        }
        /**
         * Stop running requests and prevent more from being created.
         */
        _delete() {
            if (!this._deleted) {
                this._deleted = true;
                this._requests.forEach(request => request.cancel());
                this._requests.clear();
            }
            return Promise.resolve();
        }
        /**
         * Returns a new firebaseStorage.Reference object referencing this StorageService
         * at the given Location.
         */
        _makeStorageReference(loc) {
            return new Reference(this, loc);
        }
        /**
         * @param requestInfo - HTTP RequestInfo object
         * @param authToken - Firebase auth token
         */
        _makeRequest(requestInfo, authToken, appCheckToken) {
            if (!this._deleted) {
                const request = makeRequest(requestInfo, this._appId, authToken, appCheckToken, this._pool, this._firebaseVersion);
                this._requests.add(request);
                // Request removes itself from set when complete.
                request.getPromise().then(() => this._requests.delete(request), () => this._requests.delete(request));
                return request;
            }
            else {
                return new FailRequest(appDeleted());
            }
        }
        async makeRequestWithTokens(requestInfo) {
            const [authToken, appCheckToken] = await Promise.all([
                this._getAuthToken(),
                this._getAppCheckToken()
            ]);
            return this._makeRequest(requestInfo, authToken, appCheckToken);
        }
    }

    const name$1 = "@firebase/storage";
    const version$1 = "0.8.4";

    /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * Type constant for Firebase Storage.
     */
    const STORAGE_TYPE = 'storage';

    /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * Uploads data to this object's location.
     * The upload is not resumable.
     * @public
     * @param ref - {@link StorageReference} where data should be uploaded.
     * @param data - The data to upload.
     * @param metadata - Metadata for the data to upload.
     * @returns A Promise containing an UploadResult
     */
    function uploadBytes(ref, data, metadata) {
        ref = getModularInstance(ref);
        return uploadBytes$1(ref, data, metadata);
    }
    function ref$2(serviceOrRef, pathOrUrl) {
        serviceOrRef = getModularInstance(serviceOrRef);
        return ref$1(serviceOrRef, pathOrUrl);
    }
    /**
     * Gets a {@link FirebaseStorage} instance for the given Firebase app.
     * @public
     * @param app - Firebase app to get {@link FirebaseStorage} instance for.
     * @param bucketUrl - The gs:// url to your Firebase Storage Bucket.
     * If not passed, uses the app's default Storage Bucket.
     * @returns A {@link FirebaseStorage} instance.
     */
    function getStorage(app = getApp(), bucketUrl) {
        app = getModularInstance(app);
        const storageProvider = _getProvider(app, STORAGE_TYPE);
        const storageInstance = storageProvider.getImmediate({
            identifier: bucketUrl
        });
        return storageInstance;
    }

    /**
     * Cloud Storage for Firebase
     *
     * @packageDocumentation
     */
    function factory(container, { instanceIdentifier: url }) {
        const app = container.getProvider('app').getImmediate();
        const authProvider = container.getProvider('auth-internal');
        const appCheckProvider = container.getProvider('app-check-internal');
        return new FirebaseStorageImpl(app, authProvider, appCheckProvider, new ConnectionPool(), url, SDK_VERSION$1);
    }
    function registerStorage() {
        _registerComponent(new Component(STORAGE_TYPE, factory, "PUBLIC" /* PUBLIC */).setMultipleInstances(true));
        //RUNTIME_ENV will be replaced during the compilation to "node" for nodejs and an empty string for browser
        registerVersion(name$1, version$1, '');
        // BUILD_TARGET will be replaced by values like esm5, esm2017, cjs5, etc during the compilation
        registerVersion(name$1, version$1, 'esm2017');
    }
    registerStorage();

    const name = "@firebase/database";
    const version = "0.12.2";

    /**
     * @license
     * Copyright 2019 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /** The semver (www.semver.org) version of the SDK. */
    let SDK_VERSION = '';
    /**
     * SDK_VERSION should be set before any database instance is created
     * @internal
     */
    function setSDKVersion(version) {
        SDK_VERSION = version;
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * Wraps a DOM Storage object and:
     * - automatically encode objects as JSON strings before storing them to allow us to store arbitrary types.
     * - prefixes names with "firebase:" to avoid collisions with app data.
     *
     * We automatically (see storage.js) create two such wrappers, one for sessionStorage,
     * and one for localStorage.
     *
     */
    class DOMStorageWrapper {
        /**
         * @param domStorage_ - The underlying storage object (e.g. localStorage or sessionStorage)
         */
        constructor(domStorage_) {
            this.domStorage_ = domStorage_;
            // Use a prefix to avoid collisions with other stuff saved by the app.
            this.prefix_ = 'firebase:';
        }
        /**
         * @param key - The key to save the value under
         * @param value - The value being stored, or null to remove the key.
         */
        set(key, value) {
            if (value == null) {
                this.domStorage_.removeItem(this.prefixedName_(key));
            }
            else {
                this.domStorage_.setItem(this.prefixedName_(key), stringify(value));
            }
        }
        /**
         * @returns The value that was stored under this key, or null
         */
        get(key) {
            const storedVal = this.domStorage_.getItem(this.prefixedName_(key));
            if (storedVal == null) {
                return null;
            }
            else {
                return jsonEval(storedVal);
            }
        }
        remove(key) {
            this.domStorage_.removeItem(this.prefixedName_(key));
        }
        prefixedName_(name) {
            return this.prefix_ + name;
        }
        toString() {
            return this.domStorage_.toString();
        }
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * An in-memory storage implementation that matches the API of DOMStorageWrapper
     * (TODO: create interface for both to implement).
     */
    class MemoryStorage {
        constructor() {
            this.cache_ = {};
            this.isInMemoryStorage = true;
        }
        set(key, value) {
            if (value == null) {
                delete this.cache_[key];
            }
            else {
                this.cache_[key] = value;
            }
        }
        get(key) {
            if (contains$1(this.cache_, key)) {
                return this.cache_[key];
            }
            return null;
        }
        remove(key) {
            delete this.cache_[key];
        }
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * Helper to create a DOMStorageWrapper or else fall back to MemoryStorage.
     * TODO: Once MemoryStorage and DOMStorageWrapper have a shared interface this method annotation should change
     * to reflect this type
     *
     * @param domStorageName - Name of the underlying storage object
     *   (e.g. 'localStorage' or 'sessionStorage').
     * @returns Turning off type information until a common interface is defined.
     */
    const createStoragefor = function (domStorageName) {
        try {
            // NOTE: just accessing "localStorage" or "window['localStorage']" may throw a security exception,
            // so it must be inside the try/catch.
            if (typeof window !== 'undefined' &&
                typeof window[domStorageName] !== 'undefined') {
                // Need to test cache. Just because it's here doesn't mean it works
                const domStorage = window[domStorageName];
                domStorage.setItem('firebase:sentinel', 'cache');
                domStorage.removeItem('firebase:sentinel');
                return new DOMStorageWrapper(domStorage);
            }
        }
        catch (e) { }
        // Failed to create wrapper.  Just return in-memory storage.
        // TODO: log?
        return new MemoryStorage();
    };
    /** A storage object that lasts across sessions */
    const PersistentStorage = createStoragefor('localStorage');
    /** A storage object that only lasts one session */
    const SessionStorage = createStoragefor('sessionStorage');

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    const logClient = new Logger('@firebase/database');
    /**
     * Returns a locally-unique ID (generated by just incrementing up from 0 each time its called).
     */
    const LUIDGenerator = (function () {
        let id = 1;
        return function () {
            return id++;
        };
    })();
    /**
     * Sha1 hash of the input string
     * @param str - The string to hash
     * @returns {!string} The resulting hash
     */
    const sha1 = function (str) {
        const utf8Bytes = stringToByteArray(str);
        const sha1 = new Sha1();
        sha1.update(utf8Bytes);
        const sha1Bytes = sha1.digest();
        return base64.encodeByteArray(sha1Bytes);
    };
    const buildLogMessage_ = function (...varArgs) {
        let message = '';
        for (let i = 0; i < varArgs.length; i++) {
            const arg = varArgs[i];
            if (Array.isArray(arg) ||
                (arg &&
                    typeof arg === 'object' &&
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    typeof arg.length === 'number')) {
                message += buildLogMessage_.apply(null, arg);
            }
            else if (typeof arg === 'object') {
                message += stringify(arg);
            }
            else {
                message += arg;
            }
            message += ' ';
        }
        return message;
    };
    /**
     * Use this for all debug messages in Firebase.
     */
    let logger = null;
    /**
     * Flag to check for log availability on first log message
     */
    let firstLog_ = true;
    /**
     * The implementation of Firebase.enableLogging (defined here to break dependencies)
     * @param logger_ - A flag to turn on logging, or a custom logger
     * @param persistent - Whether or not to persist logging settings across refreshes
     */
    const enableLogging$1 = function (logger_, persistent) {
        assert(!persistent || logger_ === true || logger_ === false, "Can't turn on custom loggers persistently.");
        if (logger_ === true) {
            logClient.logLevel = LogLevel.VERBOSE;
            logger = logClient.log.bind(logClient);
            if (persistent) {
                SessionStorage.set('logging_enabled', true);
            }
        }
        else if (typeof logger_ === 'function') {
            logger = logger_;
        }
        else {
            logger = null;
            SessionStorage.remove('logging_enabled');
        }
    };
    const log = function (...varArgs) {
        if (firstLog_ === true) {
            firstLog_ = false;
            if (logger === null && SessionStorage.get('logging_enabled') === true) {
                enableLogging$1(true);
            }
        }
        if (logger) {
            const message = buildLogMessage_.apply(null, varArgs);
            logger(message);
        }
    };
    const logWrapper = function (prefix) {
        return function (...varArgs) {
            log(prefix, ...varArgs);
        };
    };
    const error = function (...varArgs) {
        const message = 'FIREBASE INTERNAL ERROR: ' + buildLogMessage_(...varArgs);
        logClient.error(message);
    };
    const fatal = function (...varArgs) {
        const message = `FIREBASE FATAL ERROR: ${buildLogMessage_(...varArgs)}`;
        logClient.error(message);
        throw new Error(message);
    };
    const warn = function (...varArgs) {
        const message = 'FIREBASE WARNING: ' + buildLogMessage_(...varArgs);
        logClient.warn(message);
    };
    /**
     * Logs a warning if the containing page uses https. Called when a call to new Firebase
     * does not use https.
     */
    const warnIfPageIsSecure = function () {
        // Be very careful accessing browser globals. Who knows what may or may not exist.
        if (typeof window !== 'undefined' &&
            window.location &&
            window.location.protocol &&
            window.location.protocol.indexOf('https:') !== -1) {
            warn('Insecure Firebase access from a secure page. ' +
                'Please use https in calls to new Firebase().');
        }
    };
    /**
     * Returns true if data is NaN, or +/- Infinity.
     */
    const isInvalidJSONNumber = function (data) {
        return (typeof data === 'number' &&
            (data !== data || // NaN
                data === Number.POSITIVE_INFINITY ||
                data === Number.NEGATIVE_INFINITY));
    };
    const executeWhenDOMReady = function (fn) {
        if (document.readyState === 'complete') {
            fn();
        }
        else {
            // Modeled after jQuery. Try DOMContentLoaded and onreadystatechange (which
            // fire before onload), but fall back to onload.
            let called = false;
            const wrappedFn = function () {
                if (!document.body) {
                    setTimeout(wrappedFn, Math.floor(10));
                    return;
                }
                if (!called) {
                    called = true;
                    fn();
                }
            };
            if (document.addEventListener) {
                document.addEventListener('DOMContentLoaded', wrappedFn, false);
                // fallback to onload.
                window.addEventListener('load', wrappedFn, false);
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            }
            else if (document.attachEvent) {
                // IE.
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                document.attachEvent('onreadystatechange', () => {
                    if (document.readyState === 'complete') {
                        wrappedFn();
                    }
                });
                // fallback to onload.
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                window.attachEvent('onload', wrappedFn);
                // jQuery has an extra hack for IE that we could employ (based on
                // http://javascript.nwbox.com/IEContentLoaded/) But it looks really old.
                // I'm hoping we don't need it.
            }
        }
    };
    /**
     * Minimum key name. Invalid for actual data, used as a marker to sort before any valid names
     */
    const MIN_NAME = '[MIN_NAME]';
    /**
     * Maximum key name. Invalid for actual data, used as a marker to sort above any valid names
     */
    const MAX_NAME = '[MAX_NAME]';
    /**
     * Compares valid Firebase key names, plus min and max name
     */
    const nameCompare = function (a, b) {
        if (a === b) {
            return 0;
        }
        else if (a === MIN_NAME || b === MAX_NAME) {
            return -1;
        }
        else if (b === MIN_NAME || a === MAX_NAME) {
            return 1;
        }
        else {
            const aAsInt = tryParseInt(a), bAsInt = tryParseInt(b);
            if (aAsInt !== null) {
                if (bAsInt !== null) {
                    return aAsInt - bAsInt === 0 ? a.length - b.length : aAsInt - bAsInt;
                }
                else {
                    return -1;
                }
            }
            else if (bAsInt !== null) {
                return 1;
            }
            else {
                return a < b ? -1 : 1;
            }
        }
    };
    /**
     * @returns {!number} comparison result.
     */
    const stringCompare = function (a, b) {
        if (a === b) {
            return 0;
        }
        else if (a < b) {
            return -1;
        }
        else {
            return 1;
        }
    };
    const requireKey = function (key, obj) {
        if (obj && key in obj) {
            return obj[key];
        }
        else {
            throw new Error('Missing required key (' + key + ') in object: ' + stringify(obj));
        }
    };
    const ObjectToUniqueKey = function (obj) {
        if (typeof obj !== 'object' || obj === null) {
            return stringify(obj);
        }
        const keys = [];
        // eslint-disable-next-line guard-for-in
        for (const k in obj) {
            keys.push(k);
        }
        // Export as json, but with the keys sorted.
        keys.sort();
        let key = '{';
        for (let i = 0; i < keys.length; i++) {
            if (i !== 0) {
                key += ',';
            }
            key += stringify(keys[i]);
            key += ':';
            key += ObjectToUniqueKey(obj[keys[i]]);
        }
        key += '}';
        return key;
    };
    /**
     * Splits a string into a number of smaller segments of maximum size
     * @param str - The string
     * @param segsize - The maximum number of chars in the string.
     * @returns The string, split into appropriately-sized chunks
     */
    const splitStringBySize = function (str, segsize) {
        const len = str.length;
        if (len <= segsize) {
            return [str];
        }
        const dataSegs = [];
        for (let c = 0; c < len; c += segsize) {
            if (c + segsize > len) {
                dataSegs.push(str.substring(c, len));
            }
            else {
                dataSegs.push(str.substring(c, c + segsize));
            }
        }
        return dataSegs;
    };
    /**
     * Apply a function to each (key, value) pair in an object or
     * apply a function to each (index, value) pair in an array
     * @param obj - The object or array to iterate over
     * @param fn - The function to apply
     */
    function each(obj, fn) {
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                fn(key, obj[key]);
            }
        }
    }
    /**
     * Borrowed from http://hg.secondlife.com/llsd/src/tip/js/typedarray.js (MIT License)
     * I made one modification at the end and removed the NaN / Infinity
     * handling (since it seemed broken [caused an overflow] and we don't need it).  See MJL comments.
     * @param v - A double
     *
     */
    const doubleToIEEE754String = function (v) {
        assert(!isInvalidJSONNumber(v), 'Invalid JSON number'); // MJL
        const ebits = 11, fbits = 52;
        const bias = (1 << (ebits - 1)) - 1;
        let s, e, f, ln, i;
        // Compute sign, exponent, fraction
        // Skip NaN / Infinity handling --MJL.
        if (v === 0) {
            e = 0;
            f = 0;
            s = 1 / v === -Infinity ? 1 : 0;
        }
        else {
            s = v < 0;
            v = Math.abs(v);
            if (v >= Math.pow(2, 1 - bias)) {
                // Normalized
                ln = Math.min(Math.floor(Math.log(v) / Math.LN2), bias);
                e = ln + bias;
                f = Math.round(v * Math.pow(2, fbits - ln) - Math.pow(2, fbits));
            }
            else {
                // Denormalized
                e = 0;
                f = Math.round(v / Math.pow(2, 1 - bias - fbits));
            }
        }
        // Pack sign, exponent, fraction
        const bits = [];
        for (i = fbits; i; i -= 1) {
            bits.push(f % 2 ? 1 : 0);
            f = Math.floor(f / 2);
        }
        for (i = ebits; i; i -= 1) {
            bits.push(e % 2 ? 1 : 0);
            e = Math.floor(e / 2);
        }
        bits.push(s ? 1 : 0);
        bits.reverse();
        const str = bits.join('');
        // Return the data as a hex string. --MJL
        let hexByteString = '';
        for (i = 0; i < 64; i += 8) {
            let hexByte = parseInt(str.substr(i, 8), 2).toString(16);
            if (hexByte.length === 1) {
                hexByte = '0' + hexByte;
            }
            hexByteString = hexByteString + hexByte;
        }
        return hexByteString.toLowerCase();
    };
    /**
     * Used to detect if we're in a Chrome content script (which executes in an
     * isolated environment where long-polling doesn't work).
     */
    const isChromeExtensionContentScript = function () {
        return !!(typeof window === 'object' &&
            window['chrome'] &&
            window['chrome']['extension'] &&
            !/^chrome/.test(window.location.href));
    };
    /**
     * Used to detect if we're in a Windows 8 Store app.
     */
    const isWindowsStoreApp = function () {
        // Check for the presence of a couple WinRT globals
        return typeof Windows === 'object' && typeof Windows.UI === 'object';
    };
    /**
     * Converts a server error code to a Javascript Error
     */
    function errorForServerCode(code, query) {
        let reason = 'Unknown Error';
        if (code === 'too_big') {
            reason =
                'The data requested exceeds the maximum size ' +
                    'that can be accessed with a single request.';
        }
        else if (code === 'permission_denied') {
            reason = "Client doesn't have permission to access the desired data.";
        }
        else if (code === 'unavailable') {
            reason = 'The service is unavailable';
        }
        const error = new Error(code + ' at ' + query._path.toString() + ': ' + reason);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        error.code = code.toUpperCase();
        return error;
    }
    /**
     * Used to test for integer-looking strings
     */
    const INTEGER_REGEXP_ = new RegExp('^-?(0*)\\d{1,10}$');
    /**
     * For use in keys, the minimum possible 32-bit integer.
     */
    const INTEGER_32_MIN = -2147483648;
    /**
     * For use in kyes, the maximum possible 32-bit integer.
     */
    const INTEGER_32_MAX = 2147483647;
    /**
     * If the string contains a 32-bit integer, return it.  Else return null.
     */
    const tryParseInt = function (str) {
        if (INTEGER_REGEXP_.test(str)) {
            const intVal = Number(str);
            if (intVal >= INTEGER_32_MIN && intVal <= INTEGER_32_MAX) {
                return intVal;
            }
        }
        return null;
    };
    /**
     * Helper to run some code but catch any exceptions and re-throw them later.
     * Useful for preventing user callbacks from breaking internal code.
     *
     * Re-throwing the exception from a setTimeout is a little evil, but it's very
     * convenient (we don't have to try to figure out when is a safe point to
     * re-throw it), and the behavior seems reasonable:
     *
     * * If you aren't pausing on exceptions, you get an error in the console with
     *   the correct stack trace.
     * * If you're pausing on all exceptions, the debugger will pause on your
     *   exception and then again when we rethrow it.
     * * If you're only pausing on uncaught exceptions, the debugger will only pause
     *   on us re-throwing it.
     *
     * @param fn - The code to guard.
     */
    const exceptionGuard = function (fn) {
        try {
            fn();
        }
        catch (e) {
            // Re-throw exception when it's safe.
            setTimeout(() => {
                // It used to be that "throw e" would result in a good console error with
                // relevant context, but as of Chrome 39, you just get the firebase.js
                // file/line number where we re-throw it, which is useless. So we log
                // e.stack explicitly.
                const stack = e.stack || '';
                warn('Exception was thrown by user callback.', stack);
                throw e;
            }, Math.floor(0));
        }
    };
    /**
     * @returns {boolean} true if we think we're currently being crawled.
     */
    const beingCrawled = function () {
        const userAgent = (typeof window === 'object' &&
            window['navigator'] &&
            window['navigator']['userAgent']) ||
            '';
        // For now we whitelist the most popular crawlers.  We should refine this to be the set of crawlers we
        // believe to support JavaScript/AJAX rendering.
        // NOTE: Google Webmaster Tools doesn't really belong, but their "This is how a visitor to your website
        // would have seen the page" is flaky if we don't treat it as a crawler.
        return (userAgent.search(/googlebot|google webmaster tools|bingbot|yahoo! slurp|baiduspider|yandexbot|duckduckbot/i) >= 0);
    };
    /**
     * Same as setTimeout() except on Node.JS it will /not/ prevent the process from exiting.
     *
     * It is removed with clearTimeout() as normal.
     *
     * @param fn - Function to run.
     * @param time - Milliseconds to wait before running.
     * @returns The setTimeout() return value.
     */
    const setTimeoutNonBlocking = function (fn, time) {
        const timeout = setTimeout(fn, time);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if (typeof timeout === 'object' && timeout['unref']) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            timeout['unref']();
        }
        return timeout;
    };

    /**
     * @license
     * Copyright 2021 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * Abstraction around AppCheck's token fetching capabilities.
     */
    class AppCheckTokenProvider {
        constructor(appName_, appCheckProvider) {
            this.appName_ = appName_;
            this.appCheckProvider = appCheckProvider;
            this.appCheck = appCheckProvider === null || appCheckProvider === void 0 ? void 0 : appCheckProvider.getImmediate({ optional: true });
            if (!this.appCheck) {
                appCheckProvider === null || appCheckProvider === void 0 ? void 0 : appCheckProvider.get().then(appCheck => (this.appCheck = appCheck));
            }
        }
        getToken(forceRefresh) {
            if (!this.appCheck) {
                return new Promise((resolve, reject) => {
                    // Support delayed initialization of FirebaseAppCheck. This allows our
                    // customers to initialize the RTDB SDK before initializing Firebase
                    // AppCheck and ensures that all requests are authenticated if a token
                    // becomes available before the timoeout below expires.
                    setTimeout(() => {
                        if (this.appCheck) {
                            this.getToken(forceRefresh).then(resolve, reject);
                        }
                        else {
                            resolve(null);
                        }
                    }, 0);
                });
            }
            return this.appCheck.getToken(forceRefresh);
        }
        addTokenChangeListener(listener) {
            var _a;
            (_a = this.appCheckProvider) === null || _a === void 0 ? void 0 : _a.get().then(appCheck => appCheck.addTokenListener(listener));
        }
        notifyForInvalidToken() {
            warn(`Provided AppCheck credentials for the app named "${this.appName_}" ` +
                'are invalid. This usually indicates your app was not initialized correctly.');
        }
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * Abstraction around FirebaseApp's token fetching capabilities.
     */
    class FirebaseAuthTokenProvider {
        constructor(appName_, firebaseOptions_, authProvider_) {
            this.appName_ = appName_;
            this.firebaseOptions_ = firebaseOptions_;
            this.authProvider_ = authProvider_;
            this.auth_ = null;
            this.auth_ = authProvider_.getImmediate({ optional: true });
            if (!this.auth_) {
                authProvider_.onInit(auth => (this.auth_ = auth));
            }
        }
        getToken(forceRefresh) {
            if (!this.auth_) {
                return new Promise((resolve, reject) => {
                    // Support delayed initialization of FirebaseAuth. This allows our
                    // customers to initialize the RTDB SDK before initializing Firebase
                    // Auth and ensures that all requests are authenticated if a token
                    // becomes available before the timoeout below expires.
                    setTimeout(() => {
                        if (this.auth_) {
                            this.getToken(forceRefresh).then(resolve, reject);
                        }
                        else {
                            resolve(null);
                        }
                    }, 0);
                });
            }
            return this.auth_.getToken(forceRefresh).catch(error => {
                // TODO: Need to figure out all the cases this is raised and whether
                // this makes sense.
                if (error && error.code === 'auth/token-not-initialized') {
                    log('Got auth/token-not-initialized error.  Treating as null token.');
                    return null;
                }
                else {
                    return Promise.reject(error);
                }
            });
        }
        addTokenChangeListener(listener) {
            // TODO: We might want to wrap the listener and call it with no args to
            // avoid a leaky abstraction, but that makes removing the listener harder.
            if (this.auth_) {
                this.auth_.addAuthTokenListener(listener);
            }
            else {
                this.authProvider_
                    .get()
                    .then(auth => auth.addAuthTokenListener(listener));
            }
        }
        removeTokenChangeListener(listener) {
            this.authProvider_
                .get()
                .then(auth => auth.removeAuthTokenListener(listener));
        }
        notifyForInvalidToken() {
            let errorMessage = 'Provided authentication credentials for the app named "' +
                this.appName_ +
                '" are invalid. This usually indicates your app was not ' +
                'initialized correctly. ';
            if ('credential' in this.firebaseOptions_) {
                errorMessage +=
                    'Make sure the "credential" property provided to initializeApp() ' +
                        'is authorized to access the specified "databaseURL" and is from the correct ' +
                        'project.';
            }
            else if ('serviceAccount' in this.firebaseOptions_) {
                errorMessage +=
                    'Make sure the "serviceAccount" property provided to initializeApp() ' +
                        'is authorized to access the specified "databaseURL" and is from the correct ' +
                        'project.';
            }
            else {
                errorMessage +=
                    'Make sure the "apiKey" and "databaseURL" properties provided to ' +
                        'initializeApp() match the values provided for your app at ' +
                        'https://console.firebase.google.com/.';
            }
            warn(errorMessage);
        }
    }
    /* AuthTokenProvider that supplies a constant token. Used by Admin SDK or mockUserToken with emulators. */
    class EmulatorTokenProvider {
        constructor(accessToken) {
            this.accessToken = accessToken;
        }
        getToken(forceRefresh) {
            return Promise.resolve({
                accessToken: this.accessToken
            });
        }
        addTokenChangeListener(listener) {
            // Invoke the listener immediately to match the behavior in Firebase Auth
            // (see packages/auth/src/auth.js#L1807)
            listener(this.accessToken);
        }
        removeTokenChangeListener(listener) { }
        notifyForInvalidToken() { }
    }
    /** A string that is treated as an admin access token by the RTDB emulator. Used by Admin SDK. */
    EmulatorTokenProvider.OWNER = 'owner';

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    const PROTOCOL_VERSION = '5';
    const VERSION_PARAM = 'v';
    const TRANSPORT_SESSION_PARAM = 's';
    const REFERER_PARAM = 'r';
    const FORGE_REF = 'f';
    // Matches console.firebase.google.com, firebase-console-*.corp.google.com and
    // firebase.corp.google.com
    const FORGE_DOMAIN_RE = /(console\.firebase|firebase-console-\w+\.corp|firebase\.corp)\.google\.com/;
    const LAST_SESSION_PARAM = 'ls';
    const APPLICATION_ID_PARAM = 'p';
    const APP_CHECK_TOKEN_PARAM = 'ac';
    const WEBSOCKET = 'websocket';
    const LONG_POLLING = 'long_polling';

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * A class that holds metadata about a Repo object
     */
    class RepoInfo {
        /**
         * @param host - Hostname portion of the url for the repo
         * @param secure - Whether or not this repo is accessed over ssl
         * @param namespace - The namespace represented by the repo
         * @param webSocketOnly - Whether to prefer websockets over all other transports (used by Nest).
         * @param nodeAdmin - Whether this instance uses Admin SDK credentials
         * @param persistenceKey - Override the default session persistence storage key
         */
        constructor(host, secure, namespace, webSocketOnly, nodeAdmin = false, persistenceKey = '', includeNamespaceInQueryParams = false) {
            this.secure = secure;
            this.namespace = namespace;
            this.webSocketOnly = webSocketOnly;
            this.nodeAdmin = nodeAdmin;
            this.persistenceKey = persistenceKey;
            this.includeNamespaceInQueryParams = includeNamespaceInQueryParams;
            this._host = host.toLowerCase();
            this._domain = this._host.substr(this._host.indexOf('.') + 1);
            this.internalHost =
                PersistentStorage.get('host:' + host) || this._host;
        }
        isCacheableHost() {
            return this.internalHost.substr(0, 2) === 's-';
        }
        isCustomHost() {
            return (this._domain !== 'firebaseio.com' &&
                this._domain !== 'firebaseio-demo.com');
        }
        get host() {
            return this._host;
        }
        set host(newHost) {
            if (newHost !== this.internalHost) {
                this.internalHost = newHost;
                if (this.isCacheableHost()) {
                    PersistentStorage.set('host:' + this._host, this.internalHost);
                }
            }
        }
        toString() {
            let str = this.toURLString();
            if (this.persistenceKey) {
                str += '<' + this.persistenceKey + '>';
            }
            return str;
        }
        toURLString() {
            const protocol = this.secure ? 'https://' : 'http://';
            const query = this.includeNamespaceInQueryParams
                ? `?ns=${this.namespace}`
                : '';
            return `${protocol}${this.host}/${query}`;
        }
    }
    function repoInfoNeedsQueryParam(repoInfo) {
        return (repoInfo.host !== repoInfo.internalHost ||
            repoInfo.isCustomHost() ||
            repoInfo.includeNamespaceInQueryParams);
    }
    /**
     * Returns the websocket URL for this repo
     * @param repoInfo - RepoInfo object
     * @param type - of connection
     * @param params - list
     * @returns The URL for this repo
     */
    function repoInfoConnectionURL(repoInfo, type, params) {
        assert(typeof type === 'string', 'typeof type must == string');
        assert(typeof params === 'object', 'typeof params must == object');
        let connURL;
        if (type === WEBSOCKET) {
            connURL =
                (repoInfo.secure ? 'wss://' : 'ws://') + repoInfo.internalHost + '/.ws?';
        }
        else if (type === LONG_POLLING) {
            connURL =
                (repoInfo.secure ? 'https://' : 'http://') +
                    repoInfo.internalHost +
                    '/.lp?';
        }
        else {
            throw new Error('Unknown connection type: ' + type);
        }
        if (repoInfoNeedsQueryParam(repoInfo)) {
            params['ns'] = repoInfo.namespace;
        }
        const pairs = [];
        each(params, (key, value) => {
            pairs.push(key + '=' + value);
        });
        return connURL + pairs.join('&');
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * Tracks a collection of stats.
     */
    class StatsCollection {
        constructor() {
            this.counters_ = {};
        }
        incrementCounter(name, amount = 1) {
            if (!contains$1(this.counters_, name)) {
                this.counters_[name] = 0;
            }
            this.counters_[name] += amount;
        }
        get() {
            return deepCopy(this.counters_);
        }
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    const collections = {};
    const reporters = {};
    function statsManagerGetCollection(repoInfo) {
        const hashString = repoInfo.toString();
        if (!collections[hashString]) {
            collections[hashString] = new StatsCollection();
        }
        return collections[hashString];
    }
    function statsManagerGetOrCreateReporter(repoInfo, creatorFunction) {
        const hashString = repoInfo.toString();
        if (!reporters[hashString]) {
            reporters[hashString] = creatorFunction();
        }
        return reporters[hashString];
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * This class ensures the packets from the server arrive in order
     * This class takes data from the server and ensures it gets passed into the callbacks in order.
     */
    class PacketReceiver {
        /**
         * @param onMessage_
         */
        constructor(onMessage_) {
            this.onMessage_ = onMessage_;
            this.pendingResponses = [];
            this.currentResponseNum = 0;
            this.closeAfterResponse = -1;
            this.onClose = null;
        }
        closeAfter(responseNum, callback) {
            this.closeAfterResponse = responseNum;
            this.onClose = callback;
            if (this.closeAfterResponse < this.currentResponseNum) {
                this.onClose();
                this.onClose = null;
            }
        }
        /**
         * Each message from the server comes with a response number, and an array of data. The responseNumber
         * allows us to ensure that we process them in the right order, since we can't be guaranteed that all
         * browsers will respond in the same order as the requests we sent
         */
        handleResponse(requestNum, data) {
            this.pendingResponses[requestNum] = data;
            while (this.pendingResponses[this.currentResponseNum]) {
                const toProcess = this.pendingResponses[this.currentResponseNum];
                delete this.pendingResponses[this.currentResponseNum];
                for (let i = 0; i < toProcess.length; ++i) {
                    if (toProcess[i]) {
                        exceptionGuard(() => {
                            this.onMessage_(toProcess[i]);
                        });
                    }
                }
                if (this.currentResponseNum === this.closeAfterResponse) {
                    if (this.onClose) {
                        this.onClose();
                        this.onClose = null;
                    }
                    break;
                }
                this.currentResponseNum++;
            }
        }
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    // URL query parameters associated with longpolling
    const FIREBASE_LONGPOLL_START_PARAM = 'start';
    const FIREBASE_LONGPOLL_CLOSE_COMMAND = 'close';
    const FIREBASE_LONGPOLL_COMMAND_CB_NAME = 'pLPCommand';
    const FIREBASE_LONGPOLL_DATA_CB_NAME = 'pRTLPCB';
    const FIREBASE_LONGPOLL_ID_PARAM = 'id';
    const FIREBASE_LONGPOLL_PW_PARAM = 'pw';
    const FIREBASE_LONGPOLL_SERIAL_PARAM = 'ser';
    const FIREBASE_LONGPOLL_CALLBACK_ID_PARAM = 'cb';
    const FIREBASE_LONGPOLL_SEGMENT_NUM_PARAM = 'seg';
    const FIREBASE_LONGPOLL_SEGMENTS_IN_PACKET = 'ts';
    const FIREBASE_LONGPOLL_DATA_PARAM = 'd';
    const FIREBASE_LONGPOLL_DISCONN_FRAME_REQUEST_PARAM = 'dframe';
    //Data size constants.
    //TODO: Perf: the maximum length actually differs from browser to browser.
    // We should check what browser we're on and set accordingly.
    const MAX_URL_DATA_SIZE = 1870;
    const SEG_HEADER_SIZE = 30; //ie: &seg=8299234&ts=982389123&d=
    const MAX_PAYLOAD_SIZE = MAX_URL_DATA_SIZE - SEG_HEADER_SIZE;
    /**
     * Keepalive period
     * send a fresh request at minimum every 25 seconds. Opera has a maximum request
     * length of 30 seconds that we can't exceed.
     */
    const KEEPALIVE_REQUEST_INTERVAL = 25000;
    /**
     * How long to wait before aborting a long-polling connection attempt.
     */
    const LP_CONNECT_TIMEOUT = 30000;
    /**
     * This class manages a single long-polling connection.
     */
    class BrowserPollConnection {
        /**
         * @param connId An identifier for this connection, used for logging
         * @param repoInfo The info for the endpoint to send data to.
         * @param applicationId The Firebase App ID for this project.
         * @param appCheckToken The AppCheck token for this client.
         * @param authToken The AuthToken to use for this connection.
         * @param transportSessionId Optional transportSessionid if we are
         * reconnecting for an existing transport session
         * @param lastSessionId Optional lastSessionId if the PersistentConnection has
         * already created a connection previously
         */
        constructor(connId, repoInfo, applicationId, appCheckToken, authToken, transportSessionId, lastSessionId) {
            this.connId = connId;
            this.repoInfo = repoInfo;
            this.applicationId = applicationId;
            this.appCheckToken = appCheckToken;
            this.authToken = authToken;
            this.transportSessionId = transportSessionId;
            this.lastSessionId = lastSessionId;
            this.bytesSent = 0;
            this.bytesReceived = 0;
            this.everConnected_ = false;
            this.log_ = logWrapper(connId);
            this.stats_ = statsManagerGetCollection(repoInfo);
            this.urlFn = (params) => {
                // Always add the token if we have one.
                if (this.appCheckToken) {
                    params[APP_CHECK_TOKEN_PARAM] = this.appCheckToken;
                }
                return repoInfoConnectionURL(repoInfo, LONG_POLLING, params);
            };
        }
        /**
         * @param onMessage - Callback when messages arrive
         * @param onDisconnect - Callback with connection lost.
         */
        open(onMessage, onDisconnect) {
            this.curSegmentNum = 0;
            this.onDisconnect_ = onDisconnect;
            this.myPacketOrderer = new PacketReceiver(onMessage);
            this.isClosed_ = false;
            this.connectTimeoutTimer_ = setTimeout(() => {
                this.log_('Timed out trying to connect.');
                // Make sure we clear the host cache
                this.onClosed_();
                this.connectTimeoutTimer_ = null;
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            }, Math.floor(LP_CONNECT_TIMEOUT));
            // Ensure we delay the creation of the iframe until the DOM is loaded.
            executeWhenDOMReady(() => {
                if (this.isClosed_) {
                    return;
                }
                //Set up a callback that gets triggered once a connection is set up.
                this.scriptTagHolder = new FirebaseIFrameScriptHolder((...args) => {
                    const [command, arg1, arg2, arg3, arg4] = args;
                    this.incrementIncomingBytes_(args);
                    if (!this.scriptTagHolder) {
                        return; // we closed the connection.
                    }
                    if (this.connectTimeoutTimer_) {
                        clearTimeout(this.connectTimeoutTimer_);
                        this.connectTimeoutTimer_ = null;
                    }
                    this.everConnected_ = true;
                    if (command === FIREBASE_LONGPOLL_START_PARAM) {
                        this.id = arg1;
                        this.password = arg2;
                    }
                    else if (command === FIREBASE_LONGPOLL_CLOSE_COMMAND) {
                        // Don't clear the host cache. We got a response from the server, so we know it's reachable
                        if (arg1) {
                            // We aren't expecting any more data (other than what the server's already in the process of sending us
                            // through our already open polls), so don't send any more.
                            this.scriptTagHolder.sendNewPolls = false;
                            // arg1 in this case is the last response number sent by the server. We should try to receive
                            // all of the responses up to this one before closing
                            this.myPacketOrderer.closeAfter(arg1, () => {
                                this.onClosed_();
                            });
                        }
                        else {
                            this.onClosed_();
                        }
                    }
                    else {
                        throw new Error('Unrecognized command received: ' + command);
                    }
                }, (...args) => {
                    const [pN, data] = args;
                    this.incrementIncomingBytes_(args);
                    this.myPacketOrderer.handleResponse(pN, data);
                }, () => {
                    this.onClosed_();
                }, this.urlFn);
                //Send the initial request to connect. The serial number is simply to keep the browser from pulling previous results
                //from cache.
                const urlParams = {};
                urlParams[FIREBASE_LONGPOLL_START_PARAM] = 't';
                urlParams[FIREBASE_LONGPOLL_SERIAL_PARAM] = Math.floor(Math.random() * 100000000);
                if (this.scriptTagHolder.uniqueCallbackIdentifier) {
                    urlParams[FIREBASE_LONGPOLL_CALLBACK_ID_PARAM] =
                        this.scriptTagHolder.uniqueCallbackIdentifier;
                }
                urlParams[VERSION_PARAM] = PROTOCOL_VERSION;
                if (this.transportSessionId) {
                    urlParams[TRANSPORT_SESSION_PARAM] = this.transportSessionId;
                }
                if (this.lastSessionId) {
                    urlParams[LAST_SESSION_PARAM] = this.lastSessionId;
                }
                if (this.applicationId) {
                    urlParams[APPLICATION_ID_PARAM] = this.applicationId;
                }
                if (this.appCheckToken) {
                    urlParams[APP_CHECK_TOKEN_PARAM] = this.appCheckToken;
                }
                if (typeof location !== 'undefined' &&
                    location.hostname &&
                    FORGE_DOMAIN_RE.test(location.hostname)) {
                    urlParams[REFERER_PARAM] = FORGE_REF;
                }
                const connectURL = this.urlFn(urlParams);
                this.log_('Connecting via long-poll to ' + connectURL);
                this.scriptTagHolder.addTag(connectURL, () => {
                    /* do nothing */
                });
            });
        }
        /**
         * Call this when a handshake has completed successfully and we want to consider the connection established
         */
        start() {
            this.scriptTagHolder.startLongPoll(this.id, this.password);
            this.addDisconnectPingFrame(this.id, this.password);
        }
        /**
         * Forces long polling to be considered as a potential transport
         */
        static forceAllow() {
            BrowserPollConnection.forceAllow_ = true;
        }
        /**
         * Forces longpolling to not be considered as a potential transport
         */
        static forceDisallow() {
            BrowserPollConnection.forceDisallow_ = true;
        }
        // Static method, use string literal so it can be accessed in a generic way
        static isAvailable() {
            if (BrowserPollConnection.forceAllow_) {
                return true;
            }
            else {
                // NOTE: In React-Native there's normally no 'document', but if you debug a React-Native app in
                // the Chrome debugger, 'document' is defined, but document.createElement is null (2015/06/08).
                return (!BrowserPollConnection.forceDisallow_ &&
                    typeof document !== 'undefined' &&
                    document.createElement != null &&
                    !isChromeExtensionContentScript() &&
                    !isWindowsStoreApp());
            }
        }
        /**
         * No-op for polling
         */
        markConnectionHealthy() { }
        /**
         * Stops polling and cleans up the iframe
         */
        shutdown_() {
            this.isClosed_ = true;
            if (this.scriptTagHolder) {
                this.scriptTagHolder.close();
                this.scriptTagHolder = null;
            }
            //remove the disconnect frame, which will trigger an XHR call to the server to tell it we're leaving.
            if (this.myDisconnFrame) {
                document.body.removeChild(this.myDisconnFrame);
                this.myDisconnFrame = null;
            }
            if (this.connectTimeoutTimer_) {
                clearTimeout(this.connectTimeoutTimer_);
                this.connectTimeoutTimer_ = null;
            }
        }
        /**
         * Triggered when this transport is closed
         */
        onClosed_() {
            if (!this.isClosed_) {
                this.log_('Longpoll is closing itself');
                this.shutdown_();
                if (this.onDisconnect_) {
                    this.onDisconnect_(this.everConnected_);
                    this.onDisconnect_ = null;
                }
            }
        }
        /**
         * External-facing close handler. RealTime has requested we shut down. Kill our connection and tell the server
         * that we've left.
         */
        close() {
            if (!this.isClosed_) {
                this.log_('Longpoll is being closed.');
                this.shutdown_();
            }
        }
        /**
         * Send the JSON object down to the server. It will need to be stringified, base64 encoded, and then
         * broken into chunks (since URLs have a small maximum length).
         * @param data - The JSON data to transmit.
         */
        send(data) {
            const dataStr = stringify(data);
            this.bytesSent += dataStr.length;
            this.stats_.incrementCounter('bytes_sent', dataStr.length);
            //first, lets get the base64-encoded data
            const base64data = base64Encode(dataStr);
            //We can only fit a certain amount in each URL, so we need to split this request
            //up into multiple pieces if it doesn't fit in one request.
            const dataSegs = splitStringBySize(base64data, MAX_PAYLOAD_SIZE);
            //Enqueue each segment for transmission. We assign each chunk a sequential ID and a total number
            //of segments so that we can reassemble the packet on the server.
            for (let i = 0; i < dataSegs.length; i++) {
                this.scriptTagHolder.enqueueSegment(this.curSegmentNum, dataSegs.length, dataSegs[i]);
                this.curSegmentNum++;
            }
        }
        /**
         * This is how we notify the server that we're leaving.
         * We aren't able to send requests with DHTML on a window close event, but we can
         * trigger XHR requests in some browsers (everything but Opera basically).
         */
        addDisconnectPingFrame(id, pw) {
            this.myDisconnFrame = document.createElement('iframe');
            const urlParams = {};
            urlParams[FIREBASE_LONGPOLL_DISCONN_FRAME_REQUEST_PARAM] = 't';
            urlParams[FIREBASE_LONGPOLL_ID_PARAM] = id;
            urlParams[FIREBASE_LONGPOLL_PW_PARAM] = pw;
            this.myDisconnFrame.src = this.urlFn(urlParams);
            this.myDisconnFrame.style.display = 'none';
            document.body.appendChild(this.myDisconnFrame);
        }
        /**
         * Used to track the bytes received by this client
         */
        incrementIncomingBytes_(args) {
            // TODO: This is an annoying perf hit just to track the number of incoming bytes.  Maybe it should be opt-in.
            const bytesReceived = stringify(args).length;
            this.bytesReceived += bytesReceived;
            this.stats_.incrementCounter('bytes_received', bytesReceived);
        }
    }
    /*********************************************************************************************
     * A wrapper around an iframe that is used as a long-polling script holder.
     *********************************************************************************************/
    class FirebaseIFrameScriptHolder {
        /**
         * @param commandCB - The callback to be called when control commands are recevied from the server.
         * @param onMessageCB - The callback to be triggered when responses arrive from the server.
         * @param onDisconnect - The callback to be triggered when this tag holder is closed
         * @param urlFn - A function that provides the URL of the endpoint to send data to.
         */
        constructor(commandCB, onMessageCB, onDisconnect, urlFn) {
            this.onDisconnect = onDisconnect;
            this.urlFn = urlFn;
            //We maintain a count of all of the outstanding requests, because if we have too many active at once it can cause
            //problems in some browsers.
            this.outstandingRequests = new Set();
            //A queue of the pending segments waiting for transmission to the server.
            this.pendingSegs = [];
            //A serial number. We use this for two things:
            // 1) A way to ensure the browser doesn't cache responses to polls
            // 2) A way to make the server aware when long-polls arrive in a different order than we started them. The
            //    server needs to release both polls in this case or it will cause problems in Opera since Opera can only execute
            //    JSONP code in the order it was added to the iframe.
            this.currentSerial = Math.floor(Math.random() * 100000000);
            // This gets set to false when we're "closing down" the connection (e.g. we're switching transports but there's still
            // incoming data from the server that we're waiting for).
            this.sendNewPolls = true;
            {
                //Each script holder registers a couple of uniquely named callbacks with the window. These are called from the
                //iframes where we put the long-polling script tags. We have two callbacks:
                //   1) Command Callback - Triggered for control issues, like starting a connection.
                //   2) Message Callback - Triggered when new data arrives.
                this.uniqueCallbackIdentifier = LUIDGenerator();
                window[FIREBASE_LONGPOLL_COMMAND_CB_NAME + this.uniqueCallbackIdentifier] = commandCB;
                window[FIREBASE_LONGPOLL_DATA_CB_NAME + this.uniqueCallbackIdentifier] =
                    onMessageCB;
                //Create an iframe for us to add script tags to.
                this.myIFrame = FirebaseIFrameScriptHolder.createIFrame_();
                // Set the iframe's contents.
                let script = '';
                // if we set a javascript url, it's IE and we need to set the document domain. The javascript url is sufficient
                // for ie9, but ie8 needs to do it again in the document itself.
                if (this.myIFrame.src &&
                    this.myIFrame.src.substr(0, 'javascript:'.length) === 'javascript:') {
                    const currentDomain = document.domain;
                    script = '<script>document.domain="' + currentDomain + '";</script>';
                }
                const iframeContents = '<html><body>' + script + '</body></html>';
                try {
                    this.myIFrame.doc.open();
                    this.myIFrame.doc.write(iframeContents);
                    this.myIFrame.doc.close();
                }
                catch (e) {
                    log('frame writing exception');
                    if (e.stack) {
                        log(e.stack);
                    }
                    log(e);
                }
            }
        }
        /**
         * Each browser has its own funny way to handle iframes. Here we mush them all together into one object that I can
         * actually use.
         */
        static createIFrame_() {
            const iframe = document.createElement('iframe');
            iframe.style.display = 'none';
            // This is necessary in order to initialize the document inside the iframe
            if (document.body) {
                document.body.appendChild(iframe);
                try {
                    // If document.domain has been modified in IE, this will throw an error, and we need to set the
                    // domain of the iframe's document manually. We can do this via a javascript: url as the src attribute
                    // Also note that we must do this *after* the iframe has been appended to the page. Otherwise it doesn't work.
                    const a = iframe.contentWindow.document;
                    if (!a) {
                        // Apologies for the log-spam, I need to do something to keep closure from optimizing out the assignment above.
                        log('No IE domain setting required');
                    }
                }
                catch (e) {
                    const domain = document.domain;
                    iframe.src =
                        "javascript:void((function(){document.open();document.domain='" +
                            domain +
                            "';document.close();})())";
                }
            }
            else {
                // LongPollConnection attempts to delay initialization until the document is ready, so hopefully this
                // never gets hit.
                throw 'Document body has not initialized. Wait to initialize Firebase until after the document is ready.';
            }
            // Get the document of the iframe in a browser-specific way.
            if (iframe.contentDocument) {
                iframe.doc = iframe.contentDocument; // Firefox, Opera, Safari
            }
            else if (iframe.contentWindow) {
                iframe.doc = iframe.contentWindow.document; // Internet Explorer
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            }
            else if (iframe.document) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                iframe.doc = iframe.document; //others?
            }
            return iframe;
        }
        /**
         * Cancel all outstanding queries and remove the frame.
         */
        close() {
            //Mark this iframe as dead, so no new requests are sent.
            this.alive = false;
            if (this.myIFrame) {
                //We have to actually remove all of the html inside this iframe before removing it from the
                //window, or IE will continue loading and executing the script tags we've already added, which
                //can lead to some errors being thrown. Setting innerHTML seems to be the easiest way to do this.
                this.myIFrame.doc.body.innerHTML = '';
                setTimeout(() => {
                    if (this.myIFrame !== null) {
                        document.body.removeChild(this.myIFrame);
                        this.myIFrame = null;
                    }
                }, Math.floor(0));
            }
            // Protect from being called recursively.
            const onDisconnect = this.onDisconnect;
            if (onDisconnect) {
                this.onDisconnect = null;
                onDisconnect();
            }
        }
        /**
         * Actually start the long-polling session by adding the first script tag(s) to the iframe.
         * @param id - The ID of this connection
         * @param pw - The password for this connection
         */
        startLongPoll(id, pw) {
            this.myID = id;
            this.myPW = pw;
            this.alive = true;
            //send the initial request. If there are requests queued, make sure that we transmit as many as we are currently able to.
            while (this.newRequest_()) { }
        }
        /**
         * This is called any time someone might want a script tag to be added. It adds a script tag when there aren't
         * too many outstanding requests and we are still alive.
         *
         * If there are outstanding packet segments to send, it sends one. If there aren't, it sends a long-poll anyways if
         * needed.
         */
        newRequest_() {
            // We keep one outstanding request open all the time to receive data, but if we need to send data
            // (pendingSegs.length > 0) then we create a new request to send the data.  The server will automatically
            // close the old request.
            if (this.alive &&
                this.sendNewPolls &&
                this.outstandingRequests.size < (this.pendingSegs.length > 0 ? 2 : 1)) {
                //construct our url
                this.currentSerial++;
                const urlParams = {};
                urlParams[FIREBASE_LONGPOLL_ID_PARAM] = this.myID;
                urlParams[FIREBASE_LONGPOLL_PW_PARAM] = this.myPW;
                urlParams[FIREBASE_LONGPOLL_SERIAL_PARAM] = this.currentSerial;
                let theURL = this.urlFn(urlParams);
                //Now add as much data as we can.
                let curDataString = '';
                let i = 0;
                while (this.pendingSegs.length > 0) {
                    //first, lets see if the next segment will fit.
                    const nextSeg = this.pendingSegs[0];
                    if (nextSeg.d.length +
                        SEG_HEADER_SIZE +
                        curDataString.length <=
                        MAX_URL_DATA_SIZE) {
                        //great, the segment will fit. Lets append it.
                        const theSeg = this.pendingSegs.shift();
                        curDataString =
                            curDataString +
                                '&' +
                                FIREBASE_LONGPOLL_SEGMENT_NUM_PARAM +
                                i +
                                '=' +
                                theSeg.seg +
                                '&' +
                                FIREBASE_LONGPOLL_SEGMENTS_IN_PACKET +
                                i +
                                '=' +
                                theSeg.ts +
                                '&' +
                                FIREBASE_LONGPOLL_DATA_PARAM +
                                i +
                                '=' +
                                theSeg.d;
                        i++;
                    }
                    else {
                        break;
                    }
                }
                theURL = theURL + curDataString;
                this.addLongPollTag_(theURL, this.currentSerial);
                return true;
            }
            else {
                return false;
            }
        }
        /**
         * Queue a packet for transmission to the server.
         * @param segnum - A sequential id for this packet segment used for reassembly
         * @param totalsegs - The total number of segments in this packet
         * @param data - The data for this segment.
         */
        enqueueSegment(segnum, totalsegs, data) {
            //add this to the queue of segments to send.
            this.pendingSegs.push({ seg: segnum, ts: totalsegs, d: data });
            //send the data immediately if there isn't already data being transmitted, unless
            //startLongPoll hasn't been called yet.
            if (this.alive) {
                this.newRequest_();
            }
        }
        /**
         * Add a script tag for a regular long-poll request.
         * @param url - The URL of the script tag.
         * @param serial - The serial number of the request.
         */
        addLongPollTag_(url, serial) {
            //remember that we sent this request.
            this.outstandingRequests.add(serial);
            const doNewRequest = () => {
                this.outstandingRequests.delete(serial);
                this.newRequest_();
            };
            // If this request doesn't return on its own accord (by the server sending us some data), we'll
            // create a new one after the KEEPALIVE interval to make sure we always keep a fresh request open.
            const keepaliveTimeout = setTimeout(doNewRequest, Math.floor(KEEPALIVE_REQUEST_INTERVAL));
            const readyStateCB = () => {
                // Request completed.  Cancel the keepalive.
                clearTimeout(keepaliveTimeout);
                // Trigger a new request so we can continue receiving data.
                doNewRequest();
            };
            this.addTag(url, readyStateCB);
        }
        /**
         * Add an arbitrary script tag to the iframe.
         * @param url - The URL for the script tag source.
         * @param loadCB - A callback to be triggered once the script has loaded.
         */
        addTag(url, loadCB) {
            {
                setTimeout(() => {
                    try {
                        // if we're already closed, don't add this poll
                        if (!this.sendNewPolls) {
                            return;
                        }
                        const newScript = this.myIFrame.doc.createElement('script');
                        newScript.type = 'text/javascript';
                        newScript.async = true;
                        newScript.src = url;
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        newScript.onload = newScript.onreadystatechange =
                            function () {
                                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                const rstate = newScript.readyState;
                                if (!rstate || rstate === 'loaded' || rstate === 'complete') {
                                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                    newScript.onload = newScript.onreadystatechange = null;
                                    if (newScript.parentNode) {
                                        newScript.parentNode.removeChild(newScript);
                                    }
                                    loadCB();
                                }
                            };
                        newScript.onerror = () => {
                            log('Long-poll script failed to load: ' + url);
                            this.sendNewPolls = false;
                            this.close();
                        };
                        this.myIFrame.doc.body.appendChild(newScript);
                    }
                    catch (e) {
                        // TODO: we should make this error visible somehow
                    }
                }, Math.floor(1));
            }
        }
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    const WEBSOCKET_MAX_FRAME_SIZE = 16384;
    const WEBSOCKET_KEEPALIVE_INTERVAL = 45000;
    let WebSocketImpl = null;
    if (typeof MozWebSocket !== 'undefined') {
        WebSocketImpl = MozWebSocket;
    }
    else if (typeof WebSocket !== 'undefined') {
        WebSocketImpl = WebSocket;
    }
    /**
     * Create a new websocket connection with the given callbacks.
     */
    class WebSocketConnection {
        /**
         * @param connId identifier for this transport
         * @param repoInfo The info for the websocket endpoint.
         * @param applicationId The Firebase App ID for this project.
         * @param appCheckToken The App Check Token for this client.
         * @param authToken The Auth Token for this client.
         * @param transportSessionId Optional transportSessionId if this is connecting
         * to an existing transport session
         * @param lastSessionId Optional lastSessionId if there was a previous
         * connection
         */
        constructor(connId, repoInfo, applicationId, appCheckToken, authToken, transportSessionId, lastSessionId) {
            this.connId = connId;
            this.applicationId = applicationId;
            this.appCheckToken = appCheckToken;
            this.authToken = authToken;
            this.keepaliveTimer = null;
            this.frames = null;
            this.totalFrames = 0;
            this.bytesSent = 0;
            this.bytesReceived = 0;
            this.log_ = logWrapper(this.connId);
            this.stats_ = statsManagerGetCollection(repoInfo);
            this.connURL = WebSocketConnection.connectionURL_(repoInfo, transportSessionId, lastSessionId, appCheckToken);
            this.nodeAdmin = repoInfo.nodeAdmin;
        }
        /**
         * @param repoInfo - The info for the websocket endpoint.
         * @param transportSessionId - Optional transportSessionId if this is connecting to an existing transport
         *                                         session
         * @param lastSessionId - Optional lastSessionId if there was a previous connection
         * @returns connection url
         */
        static connectionURL_(repoInfo, transportSessionId, lastSessionId, appCheckToken) {
            const urlParams = {};
            urlParams[VERSION_PARAM] = PROTOCOL_VERSION;
            if (typeof location !== 'undefined' &&
                location.hostname &&
                FORGE_DOMAIN_RE.test(location.hostname)) {
                urlParams[REFERER_PARAM] = FORGE_REF;
            }
            if (transportSessionId) {
                urlParams[TRANSPORT_SESSION_PARAM] = transportSessionId;
            }
            if (lastSessionId) {
                urlParams[LAST_SESSION_PARAM] = lastSessionId;
            }
            if (appCheckToken) {
                urlParams[APP_CHECK_TOKEN_PARAM] = appCheckToken;
            }
            return repoInfoConnectionURL(repoInfo, WEBSOCKET, urlParams);
        }
        /**
         * @param onMessage - Callback when messages arrive
         * @param onDisconnect - Callback with connection lost.
         */
        open(onMessage, onDisconnect) {
            this.onDisconnect = onDisconnect;
            this.onMessage = onMessage;
            this.log_('Websocket connecting to ' + this.connURL);
            this.everConnected_ = false;
            // Assume failure until proven otherwise.
            PersistentStorage.set('previous_websocket_failure', true);
            try {
                if (isNodeSdk()) ;
                else {
                    const options = {
                        headers: {
                            'X-Firebase-GMPID': this.applicationId || '',
                            'X-Firebase-AppCheck': this.appCheckToken || ''
                        }
                    };
                    this.mySock = new WebSocketImpl(this.connURL, [], options);
                }
            }
            catch (e) {
                this.log_('Error instantiating WebSocket.');
                const error = e.message || e.data;
                if (error) {
                    this.log_(error);
                }
                this.onClosed_();
                return;
            }
            this.mySock.onopen = () => {
                this.log_('Websocket connected.');
                this.everConnected_ = true;
            };
            this.mySock.onclose = () => {
                this.log_('Websocket connection was disconnected.');
                this.mySock = null;
                this.onClosed_();
            };
            this.mySock.onmessage = m => {
                this.handleIncomingFrame(m);
            };
            this.mySock.onerror = e => {
                this.log_('WebSocket error.  Closing connection.');
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const error = e.message || e.data;
                if (error) {
                    this.log_(error);
                }
                this.onClosed_();
            };
        }
        /**
         * No-op for websockets, we don't need to do anything once the connection is confirmed as open
         */
        start() { }
        static forceDisallow() {
            WebSocketConnection.forceDisallow_ = true;
        }
        static isAvailable() {
            let isOldAndroid = false;
            if (typeof navigator !== 'undefined' && navigator.userAgent) {
                const oldAndroidRegex = /Android ([0-9]{0,}\.[0-9]{0,})/;
                const oldAndroidMatch = navigator.userAgent.match(oldAndroidRegex);
                if (oldAndroidMatch && oldAndroidMatch.length > 1) {
                    if (parseFloat(oldAndroidMatch[1]) < 4.4) {
                        isOldAndroid = true;
                    }
                }
            }
            return (!isOldAndroid &&
                WebSocketImpl !== null &&
                !WebSocketConnection.forceDisallow_);
        }
        /**
         * Returns true if we previously failed to connect with this transport.
         */
        static previouslyFailed() {
            // If our persistent storage is actually only in-memory storage,
            // we default to assuming that it previously failed to be safe.
            return (PersistentStorage.isInMemoryStorage ||
                PersistentStorage.get('previous_websocket_failure') === true);
        }
        markConnectionHealthy() {
            PersistentStorage.remove('previous_websocket_failure');
        }
        appendFrame_(data) {
            this.frames.push(data);
            if (this.frames.length === this.totalFrames) {
                const fullMess = this.frames.join('');
                this.frames = null;
                const jsonMess = jsonEval(fullMess);
                //handle the message
                this.onMessage(jsonMess);
            }
        }
        /**
         * @param frameCount - The number of frames we are expecting from the server
         */
        handleNewFrameCount_(frameCount) {
            this.totalFrames = frameCount;
            this.frames = [];
        }
        /**
         * Attempts to parse a frame count out of some text. If it can't, assumes a value of 1
         * @returns Any remaining data to be process, or null if there is none
         */
        extractFrameCount_(data) {
            assert(this.frames === null, 'We already have a frame buffer');
            // TODO: The server is only supposed to send up to 9999 frames (i.e. length <= 4), but that isn't being enforced
            // currently.  So allowing larger frame counts (length <= 6).  See https://app.asana.com/0/search/8688598998380/8237608042508
            if (data.length <= 6) {
                const frameCount = Number(data);
                if (!isNaN(frameCount)) {
                    this.handleNewFrameCount_(frameCount);
                    return null;
                }
            }
            this.handleNewFrameCount_(1);
            return data;
        }
        /**
         * Process a websocket frame that has arrived from the server.
         * @param mess - The frame data
         */
        handleIncomingFrame(mess) {
            if (this.mySock === null) {
                return; // Chrome apparently delivers incoming packets even after we .close() the connection sometimes.
            }
            const data = mess['data'];
            this.bytesReceived += data.length;
            this.stats_.incrementCounter('bytes_received', data.length);
            this.resetKeepAlive();
            if (this.frames !== null) {
                // we're buffering
                this.appendFrame_(data);
            }
            else {
                // try to parse out a frame count, otherwise, assume 1 and process it
                const remainingData = this.extractFrameCount_(data);
                if (remainingData !== null) {
                    this.appendFrame_(remainingData);
                }
            }
        }
        /**
         * Send a message to the server
         * @param data - The JSON object to transmit
         */
        send(data) {
            this.resetKeepAlive();
            const dataStr = stringify(data);
            this.bytesSent += dataStr.length;
            this.stats_.incrementCounter('bytes_sent', dataStr.length);
            //We can only fit a certain amount in each websocket frame, so we need to split this request
            //up into multiple pieces if it doesn't fit in one request.
            const dataSegs = splitStringBySize(dataStr, WEBSOCKET_MAX_FRAME_SIZE);
            //Send the length header
            if (dataSegs.length > 1) {
                this.sendString_(String(dataSegs.length));
            }
            //Send the actual data in segments.
            for (let i = 0; i < dataSegs.length; i++) {
                this.sendString_(dataSegs[i]);
            }
        }
        shutdown_() {
            this.isClosed_ = true;
            if (this.keepaliveTimer) {
                clearInterval(this.keepaliveTimer);
                this.keepaliveTimer = null;
            }
            if (this.mySock) {
                this.mySock.close();
                this.mySock = null;
            }
        }
        onClosed_() {
            if (!this.isClosed_) {
                this.log_('WebSocket is closing itself');
                this.shutdown_();
                // since this is an internal close, trigger the close listener
                if (this.onDisconnect) {
                    this.onDisconnect(this.everConnected_);
                    this.onDisconnect = null;
                }
            }
        }
        /**
         * External-facing close handler.
         * Close the websocket and kill the connection.
         */
        close() {
            if (!this.isClosed_) {
                this.log_('WebSocket is being closed');
                this.shutdown_();
            }
        }
        /**
         * Kill the current keepalive timer and start a new one, to ensure that it always fires N seconds after
         * the last activity.
         */
        resetKeepAlive() {
            clearInterval(this.keepaliveTimer);
            this.keepaliveTimer = setInterval(() => {
                //If there has been no websocket activity for a while, send a no-op
                if (this.mySock) {
                    this.sendString_('0');
                }
                this.resetKeepAlive();
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            }, Math.floor(WEBSOCKET_KEEPALIVE_INTERVAL));
        }
        /**
         * Send a string over the websocket.
         *
         * @param str - String to send.
         */
        sendString_(str) {
            // Firefox seems to sometimes throw exceptions (NS_ERROR_UNEXPECTED) from websocket .send()
            // calls for some unknown reason.  We treat these as an error and disconnect.
            // See https://app.asana.com/0/58926111402292/68021340250410
            try {
                this.mySock.send(str);
            }
            catch (e) {
                this.log_('Exception thrown from WebSocket.send():', e.message || e.data, 'Closing connection.');
                setTimeout(this.onClosed_.bind(this), 0);
            }
        }
    }
    /**
     * Number of response before we consider the connection "healthy."
     */
    WebSocketConnection.responsesRequiredToBeHealthy = 2;
    /**
     * Time to wait for the connection te become healthy before giving up.
     */
    WebSocketConnection.healthyTimeout = 30000;

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * Currently simplistic, this class manages what transport a Connection should use at various stages of its
     * lifecycle.
     *
     * It starts with longpolling in a browser, and httppolling on node. It then upgrades to websockets if
     * they are available.
     */
    class TransportManager {
        /**
         * @param repoInfo - Metadata around the namespace we're connecting to
         */
        constructor(repoInfo) {
            this.initTransports_(repoInfo);
        }
        static get ALL_TRANSPORTS() {
            return [BrowserPollConnection, WebSocketConnection];
        }
        initTransports_(repoInfo) {
            const isWebSocketsAvailable = WebSocketConnection && WebSocketConnection['isAvailable']();
            let isSkipPollConnection = isWebSocketsAvailable && !WebSocketConnection.previouslyFailed();
            if (repoInfo.webSocketOnly) {
                if (!isWebSocketsAvailable) {
                    warn("wss:// URL used, but browser isn't known to support websockets.  Trying anyway.");
                }
                isSkipPollConnection = true;
            }
            if (isSkipPollConnection) {
                this.transports_ = [WebSocketConnection];
            }
            else {
                const transports = (this.transports_ = []);
                for (const transport of TransportManager.ALL_TRANSPORTS) {
                    if (transport && transport['isAvailable']()) {
                        transports.push(transport);
                    }
                }
            }
        }
        /**
         * @returns The constructor for the initial transport to use
         */
        initialTransport() {
            if (this.transports_.length > 0) {
                return this.transports_[0];
            }
            else {
                throw new Error('No transports available');
            }
        }
        /**
         * @returns The constructor for the next transport, or null
         */
        upgradeTransport() {
            if (this.transports_.length > 1) {
                return this.transports_[1];
            }
            else {
                return null;
            }
        }
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    // Abort upgrade attempt if it takes longer than 60s.
    const UPGRADE_TIMEOUT = 60000;
    // For some transports (WebSockets), we need to "validate" the transport by exchanging a few requests and responses.
    // If we haven't sent enough requests within 5s, we'll start sending noop ping requests.
    const DELAY_BEFORE_SENDING_EXTRA_REQUESTS = 5000;
    // If the initial data sent triggers a lot of bandwidth (i.e. it's a large put or a listen for a large amount of data)
    // then we may not be able to exchange our ping/pong requests within the healthy timeout.  So if we reach the timeout
    // but we've sent/received enough bytes, we don't cancel the connection.
    const BYTES_SENT_HEALTHY_OVERRIDE = 10 * 1024;
    const BYTES_RECEIVED_HEALTHY_OVERRIDE = 100 * 1024;
    const MESSAGE_TYPE = 't';
    const MESSAGE_DATA = 'd';
    const CONTROL_SHUTDOWN = 's';
    const CONTROL_RESET = 'r';
    const CONTROL_ERROR = 'e';
    const CONTROL_PONG = 'o';
    const SWITCH_ACK = 'a';
    const END_TRANSMISSION = 'n';
    const PING = 'p';
    const SERVER_HELLO = 'h';
    /**
     * Creates a new real-time connection to the server using whichever method works
     * best in the current browser.
     */
    class Connection {
        /**
         * @param id - an id for this connection
         * @param repoInfo_ - the info for the endpoint to connect to
         * @param applicationId_ - the Firebase App ID for this project
         * @param appCheckToken_ - The App Check Token for this device.
         * @param authToken_ - The auth token for this session.
         * @param onMessage_ - the callback to be triggered when a server-push message arrives
         * @param onReady_ - the callback to be triggered when this connection is ready to send messages.
         * @param onDisconnect_ - the callback to be triggered when a connection was lost
         * @param onKill_ - the callback to be triggered when this connection has permanently shut down.
         * @param lastSessionId - last session id in persistent connection. is used to clean up old session in real-time server
         */
        constructor(id, repoInfo_, applicationId_, appCheckToken_, authToken_, onMessage_, onReady_, onDisconnect_, onKill_, lastSessionId) {
            this.id = id;
            this.repoInfo_ = repoInfo_;
            this.applicationId_ = applicationId_;
            this.appCheckToken_ = appCheckToken_;
            this.authToken_ = authToken_;
            this.onMessage_ = onMessage_;
            this.onReady_ = onReady_;
            this.onDisconnect_ = onDisconnect_;
            this.onKill_ = onKill_;
            this.lastSessionId = lastSessionId;
            this.connectionCount = 0;
            this.pendingDataMessages = [];
            this.state_ = 0 /* CONNECTING */;
            this.log_ = logWrapper('c:' + this.id + ':');
            this.transportManager_ = new TransportManager(repoInfo_);
            this.log_('Connection created');
            this.start_();
        }
        /**
         * Starts a connection attempt
         */
        start_() {
            const conn = this.transportManager_.initialTransport();
            this.conn_ = new conn(this.nextTransportId_(), this.repoInfo_, this.applicationId_, this.appCheckToken_, this.authToken_, null, this.lastSessionId);
            // For certain transports (WebSockets), we need to send and receive several messages back and forth before we
            // can consider the transport healthy.
            this.primaryResponsesRequired_ = conn['responsesRequiredToBeHealthy'] || 0;
            const onMessageReceived = this.connReceiver_(this.conn_);
            const onConnectionLost = this.disconnReceiver_(this.conn_);
            this.tx_ = this.conn_;
            this.rx_ = this.conn_;
            this.secondaryConn_ = null;
            this.isHealthy_ = false;
            /*
             * Firefox doesn't like when code from one iframe tries to create another iframe by way of the parent frame.
             * This can occur in the case of a redirect, i.e. we guessed wrong on what server to connect to and received a reset.
             * Somehow, setTimeout seems to make this ok. That doesn't make sense from a security perspective, since you should
             * still have the context of your originating frame.
             */
            setTimeout(() => {
                // this.conn_ gets set to null in some of the tests. Check to make sure it still exists before using it
                this.conn_ && this.conn_.open(onMessageReceived, onConnectionLost);
            }, Math.floor(0));
            const healthyTimeoutMS = conn['healthyTimeout'] || 0;
            if (healthyTimeoutMS > 0) {
                this.healthyTimeout_ = setTimeoutNonBlocking(() => {
                    this.healthyTimeout_ = null;
                    if (!this.isHealthy_) {
                        if (this.conn_ &&
                            this.conn_.bytesReceived > BYTES_RECEIVED_HEALTHY_OVERRIDE) {
                            this.log_('Connection exceeded healthy timeout but has received ' +
                                this.conn_.bytesReceived +
                                ' bytes.  Marking connection healthy.');
                            this.isHealthy_ = true;
                            this.conn_.markConnectionHealthy();
                        }
                        else if (this.conn_ &&
                            this.conn_.bytesSent > BYTES_SENT_HEALTHY_OVERRIDE) {
                            this.log_('Connection exceeded healthy timeout but has sent ' +
                                this.conn_.bytesSent +
                                ' bytes.  Leaving connection alive.');
                            // NOTE: We don't want to mark it healthy, since we have no guarantee that the bytes have made it to
                            // the server.
                        }
                        else {
                            this.log_('Closing unhealthy connection after timeout.');
                            this.close();
                        }
                    }
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                }, Math.floor(healthyTimeoutMS));
            }
        }
        nextTransportId_() {
            return 'c:' + this.id + ':' + this.connectionCount++;
        }
        disconnReceiver_(conn) {
            return everConnected => {
                if (conn === this.conn_) {
                    this.onConnectionLost_(everConnected);
                }
                else if (conn === this.secondaryConn_) {
                    this.log_('Secondary connection lost.');
                    this.onSecondaryConnectionLost_();
                }
                else {
                    this.log_('closing an old connection');
                }
            };
        }
        connReceiver_(conn) {
            return (message) => {
                if (this.state_ !== 2 /* DISCONNECTED */) {
                    if (conn === this.rx_) {
                        this.onPrimaryMessageReceived_(message);
                    }
                    else if (conn === this.secondaryConn_) {
                        this.onSecondaryMessageReceived_(message);
                    }
                    else {
                        this.log_('message on old connection');
                    }
                }
            };
        }
        /**
         * @param dataMsg - An arbitrary data message to be sent to the server
         */
        sendRequest(dataMsg) {
            // wrap in a data message envelope and send it on
            const msg = { t: 'd', d: dataMsg };
            this.sendData_(msg);
        }
        tryCleanupConnection() {
            if (this.tx_ === this.secondaryConn_ && this.rx_ === this.secondaryConn_) {
                this.log_('cleaning up and promoting a connection: ' + this.secondaryConn_.connId);
                this.conn_ = this.secondaryConn_;
                this.secondaryConn_ = null;
                // the server will shutdown the old connection
            }
        }
        onSecondaryControl_(controlData) {
            if (MESSAGE_TYPE in controlData) {
                const cmd = controlData[MESSAGE_TYPE];
                if (cmd === SWITCH_ACK) {
                    this.upgradeIfSecondaryHealthy_();
                }
                else if (cmd === CONTROL_RESET) {
                    // Most likely the session wasn't valid. Abandon the switch attempt
                    this.log_('Got a reset on secondary, closing it');
                    this.secondaryConn_.close();
                    // If we were already using this connection for something, than we need to fully close
                    if (this.tx_ === this.secondaryConn_ ||
                        this.rx_ === this.secondaryConn_) {
                        this.close();
                    }
                }
                else if (cmd === CONTROL_PONG) {
                    this.log_('got pong on secondary.');
                    this.secondaryResponsesRequired_--;
                    this.upgradeIfSecondaryHealthy_();
                }
            }
        }
        onSecondaryMessageReceived_(parsedData) {
            const layer = requireKey('t', parsedData);
            const data = requireKey('d', parsedData);
            if (layer === 'c') {
                this.onSecondaryControl_(data);
            }
            else if (layer === 'd') {
                // got a data message, but we're still second connection. Need to buffer it up
                this.pendingDataMessages.push(data);
            }
            else {
                throw new Error('Unknown protocol layer: ' + layer);
            }
        }
        upgradeIfSecondaryHealthy_() {
            if (this.secondaryResponsesRequired_ <= 0) {
                this.log_('Secondary connection is healthy.');
                this.isHealthy_ = true;
                this.secondaryConn_.markConnectionHealthy();
                this.proceedWithUpgrade_();
            }
            else {
                // Send a ping to make sure the connection is healthy.
                this.log_('sending ping on secondary.');
                this.secondaryConn_.send({ t: 'c', d: { t: PING, d: {} } });
            }
        }
        proceedWithUpgrade_() {
            // tell this connection to consider itself open
            this.secondaryConn_.start();
            // send ack
            this.log_('sending client ack on secondary');
            this.secondaryConn_.send({ t: 'c', d: { t: SWITCH_ACK, d: {} } });
            // send end packet on primary transport, switch to sending on this one
            // can receive on this one, buffer responses until end received on primary transport
            this.log_('Ending transmission on primary');
            this.conn_.send({ t: 'c', d: { t: END_TRANSMISSION, d: {} } });
            this.tx_ = this.secondaryConn_;
            this.tryCleanupConnection();
        }
        onPrimaryMessageReceived_(parsedData) {
            // Must refer to parsedData properties in quotes, so closure doesn't touch them.
            const layer = requireKey('t', parsedData);
            const data = requireKey('d', parsedData);
            if (layer === 'c') {
                this.onControl_(data);
            }
            else if (layer === 'd') {
                this.onDataMessage_(data);
            }
        }
        onDataMessage_(message) {
            this.onPrimaryResponse_();
            // We don't do anything with data messages, just kick them up a level
            this.onMessage_(message);
        }
        onPrimaryResponse_() {
            if (!this.isHealthy_) {
                this.primaryResponsesRequired_--;
                if (this.primaryResponsesRequired_ <= 0) {
                    this.log_('Primary connection is healthy.');
                    this.isHealthy_ = true;
                    this.conn_.markConnectionHealthy();
                }
            }
        }
        onControl_(controlData) {
            const cmd = requireKey(MESSAGE_TYPE, controlData);
            if (MESSAGE_DATA in controlData) {
                const payload = controlData[MESSAGE_DATA];
                if (cmd === SERVER_HELLO) {
                    this.onHandshake_(payload);
                }
                else if (cmd === END_TRANSMISSION) {
                    this.log_('recvd end transmission on primary');
                    this.rx_ = this.secondaryConn_;
                    for (let i = 0; i < this.pendingDataMessages.length; ++i) {
                        this.onDataMessage_(this.pendingDataMessages[i]);
                    }
                    this.pendingDataMessages = [];
                    this.tryCleanupConnection();
                }
                else if (cmd === CONTROL_SHUTDOWN) {
                    // This was previously the 'onKill' callback passed to the lower-level connection
                    // payload in this case is the reason for the shutdown. Generally a human-readable error
                    this.onConnectionShutdown_(payload);
                }
                else if (cmd === CONTROL_RESET) {
                    // payload in this case is the host we should contact
                    this.onReset_(payload);
                }
                else if (cmd === CONTROL_ERROR) {
                    error('Server Error: ' + payload);
                }
                else if (cmd === CONTROL_PONG) {
                    this.log_('got pong on primary.');
                    this.onPrimaryResponse_();
                    this.sendPingOnPrimaryIfNecessary_();
                }
                else {
                    error('Unknown control packet command: ' + cmd);
                }
            }
        }
        /**
         * @param handshake - The handshake data returned from the server
         */
        onHandshake_(handshake) {
            const timestamp = handshake.ts;
            const version = handshake.v;
            const host = handshake.h;
            this.sessionId = handshake.s;
            this.repoInfo_.host = host;
            // if we've already closed the connection, then don't bother trying to progress further
            if (this.state_ === 0 /* CONNECTING */) {
                this.conn_.start();
                this.onConnectionEstablished_(this.conn_, timestamp);
                if (PROTOCOL_VERSION !== version) {
                    warn('Protocol version mismatch detected');
                }
                // TODO: do we want to upgrade? when? maybe a delay?
                this.tryStartUpgrade_();
            }
        }
        tryStartUpgrade_() {
            const conn = this.transportManager_.upgradeTransport();
            if (conn) {
                this.startUpgrade_(conn);
            }
        }
        startUpgrade_(conn) {
            this.secondaryConn_ = new conn(this.nextTransportId_(), this.repoInfo_, this.applicationId_, this.appCheckToken_, this.authToken_, this.sessionId);
            // For certain transports (WebSockets), we need to send and receive several messages back and forth before we
            // can consider the transport healthy.
            this.secondaryResponsesRequired_ =
                conn['responsesRequiredToBeHealthy'] || 0;
            const onMessage = this.connReceiver_(this.secondaryConn_);
            const onDisconnect = this.disconnReceiver_(this.secondaryConn_);
            this.secondaryConn_.open(onMessage, onDisconnect);
            // If we haven't successfully upgraded after UPGRADE_TIMEOUT, give up and kill the secondary.
            setTimeoutNonBlocking(() => {
                if (this.secondaryConn_) {
                    this.log_('Timed out trying to upgrade.');
                    this.secondaryConn_.close();
                }
            }, Math.floor(UPGRADE_TIMEOUT));
        }
        onReset_(host) {
            this.log_('Reset packet received.  New host: ' + host);
            this.repoInfo_.host = host;
            // TODO: if we're already "connected", we need to trigger a disconnect at the next layer up.
            // We don't currently support resets after the connection has already been established
            if (this.state_ === 1 /* CONNECTED */) {
                this.close();
            }
            else {
                // Close whatever connections we have open and start again.
                this.closeConnections_();
                this.start_();
            }
        }
        onConnectionEstablished_(conn, timestamp) {
            this.log_('Realtime connection established.');
            this.conn_ = conn;
            this.state_ = 1 /* CONNECTED */;
            if (this.onReady_) {
                this.onReady_(timestamp, this.sessionId);
                this.onReady_ = null;
            }
            // If after 5 seconds we haven't sent enough requests to the server to get the connection healthy,
            // send some pings.
            if (this.primaryResponsesRequired_ === 0) {
                this.log_('Primary connection is healthy.');
                this.isHealthy_ = true;
            }
            else {
                setTimeoutNonBlocking(() => {
                    this.sendPingOnPrimaryIfNecessary_();
                }, Math.floor(DELAY_BEFORE_SENDING_EXTRA_REQUESTS));
            }
        }
        sendPingOnPrimaryIfNecessary_() {
            // If the connection isn't considered healthy yet, we'll send a noop ping packet request.
            if (!this.isHealthy_ && this.state_ === 1 /* CONNECTED */) {
                this.log_('sending ping on primary.');
                this.sendData_({ t: 'c', d: { t: PING, d: {} } });
            }
        }
        onSecondaryConnectionLost_() {
            const conn = this.secondaryConn_;
            this.secondaryConn_ = null;
            if (this.tx_ === conn || this.rx_ === conn) {
                // we are relying on this connection already in some capacity. Therefore, a failure is real
                this.close();
            }
        }
        /**
         * @param everConnected - Whether or not the connection ever reached a server. Used to determine if
         * we should flush the host cache
         */
        onConnectionLost_(everConnected) {
            this.conn_ = null;
            // NOTE: IF you're seeing a Firefox error for this line, I think it might be because it's getting
            // called on window close and RealtimeState.CONNECTING is no longer defined.  Just a guess.
            if (!everConnected && this.state_ === 0 /* CONNECTING */) {
                this.log_('Realtime connection failed.');
                // Since we failed to connect at all, clear any cached entry for this namespace in case the machine went away
                if (this.repoInfo_.isCacheableHost()) {
                    PersistentStorage.remove('host:' + this.repoInfo_.host);
                    // reset the internal host to what we would show the user, i.e. <ns>.firebaseio.com
                    this.repoInfo_.internalHost = this.repoInfo_.host;
                }
            }
            else if (this.state_ === 1 /* CONNECTED */) {
                this.log_('Realtime connection lost.');
            }
            this.close();
        }
        onConnectionShutdown_(reason) {
            this.log_('Connection shutdown command received. Shutting down...');
            if (this.onKill_) {
                this.onKill_(reason);
                this.onKill_ = null;
            }
            // We intentionally don't want to fire onDisconnect (kill is a different case),
            // so clear the callback.
            this.onDisconnect_ = null;
            this.close();
        }
        sendData_(data) {
            if (this.state_ !== 1 /* CONNECTED */) {
                throw 'Connection is not connected';
            }
            else {
                this.tx_.send(data);
            }
        }
        /**
         * Cleans up this connection, calling the appropriate callbacks
         */
        close() {
            if (this.state_ !== 2 /* DISCONNECTED */) {
                this.log_('Closing realtime connection.');
                this.state_ = 2 /* DISCONNECTED */;
                this.closeConnections_();
                if (this.onDisconnect_) {
                    this.onDisconnect_();
                    this.onDisconnect_ = null;
                }
            }
        }
        closeConnections_() {
            this.log_('Shutting down all connections');
            if (this.conn_) {
                this.conn_.close();
                this.conn_ = null;
            }
            if (this.secondaryConn_) {
                this.secondaryConn_.close();
                this.secondaryConn_ = null;
            }
            if (this.healthyTimeout_) {
                clearTimeout(this.healthyTimeout_);
                this.healthyTimeout_ = null;
            }
        }
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * Interface defining the set of actions that can be performed against the Firebase server
     * (basically corresponds to our wire protocol).
     *
     * @interface
     */
    class ServerActions {
        put(pathString, data, onComplete, hash) { }
        merge(pathString, data, onComplete, hash) { }
        /**
         * Refreshes the auth token for the current connection.
         * @param token - The authentication token
         */
        refreshAuthToken(token) { }
        /**
         * Refreshes the app check token for the current connection.
         * @param token The app check token
         */
        refreshAppCheckToken(token) { }
        onDisconnectPut(pathString, data, onComplete) { }
        onDisconnectMerge(pathString, data, onComplete) { }
        onDisconnectCancel(pathString, onComplete) { }
        reportStats(stats) { }
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * Base class to be used if you want to emit events. Call the constructor with
     * the set of allowed event names.
     */
    class EventEmitter {
        constructor(allowedEvents_) {
            this.allowedEvents_ = allowedEvents_;
            this.listeners_ = {};
            assert(Array.isArray(allowedEvents_) && allowedEvents_.length > 0, 'Requires a non-empty array');
        }
        /**
         * To be called by derived classes to trigger events.
         */
        trigger(eventType, ...varArgs) {
            if (Array.isArray(this.listeners_[eventType])) {
                // Clone the list, since callbacks could add/remove listeners.
                const listeners = [...this.listeners_[eventType]];
                for (let i = 0; i < listeners.length; i++) {
                    listeners[i].callback.apply(listeners[i].context, varArgs);
                }
            }
        }
        on(eventType, callback, context) {
            this.validateEventType_(eventType);
            this.listeners_[eventType] = this.listeners_[eventType] || [];
            this.listeners_[eventType].push({ callback, context });
            const eventData = this.getInitialEvent(eventType);
            if (eventData) {
                callback.apply(context, eventData);
            }
        }
        off(eventType, callback, context) {
            this.validateEventType_(eventType);
            const listeners = this.listeners_[eventType] || [];
            for (let i = 0; i < listeners.length; i++) {
                if (listeners[i].callback === callback &&
                    (!context || context === listeners[i].context)) {
                    listeners.splice(i, 1);
                    return;
                }
            }
        }
        validateEventType_(eventType) {
            assert(this.allowedEvents_.find(et => {
                return et === eventType;
            }), 'Unknown event: ' + eventType);
        }
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * Monitors online state (as reported by window.online/offline events).
     *
     * The expectation is that this could have many false positives (thinks we are online
     * when we're not), but no false negatives.  So we can safely use it to determine when
     * we definitely cannot reach the internet.
     */
    class OnlineMonitor extends EventEmitter {
        constructor() {
            super(['online']);
            this.online_ = true;
            // We've had repeated complaints that Cordova apps can get stuck "offline", e.g.
            // https://forum.ionicframework.com/t/firebase-connection-is-lost-and-never-come-back/43810
            // It would seem that the 'online' event does not always fire consistently. So we disable it
            // for Cordova.
            if (typeof window !== 'undefined' &&
                typeof window.addEventListener !== 'undefined' &&
                !isMobileCordova()) {
                window.addEventListener('online', () => {
                    if (!this.online_) {
                        this.online_ = true;
                        this.trigger('online', true);
                    }
                }, false);
                window.addEventListener('offline', () => {
                    if (this.online_) {
                        this.online_ = false;
                        this.trigger('online', false);
                    }
                }, false);
            }
        }
        static getInstance() {
            return new OnlineMonitor();
        }
        getInitialEvent(eventType) {
            assert(eventType === 'online', 'Unknown event type: ' + eventType);
            return [this.online_];
        }
        currentlyOnline() {
            return this.online_;
        }
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /** Maximum key depth. */
    const MAX_PATH_DEPTH = 32;
    /** Maximum number of (UTF8) bytes in a Firebase path. */
    const MAX_PATH_LENGTH_BYTES = 768;
    /**
     * An immutable object representing a parsed path.  It's immutable so that you
     * can pass them around to other functions without worrying about them changing
     * it.
     */
    class Path {
        /**
         * @param pathOrString - Path string to parse, or another path, or the raw
         * tokens array
         */
        constructor(pathOrString, pieceNum) {
            if (pieceNum === void 0) {
                this.pieces_ = pathOrString.split('/');
                // Remove empty pieces.
                let copyTo = 0;
                for (let i = 0; i < this.pieces_.length; i++) {
                    if (this.pieces_[i].length > 0) {
                        this.pieces_[copyTo] = this.pieces_[i];
                        copyTo++;
                    }
                }
                this.pieces_.length = copyTo;
                this.pieceNum_ = 0;
            }
            else {
                this.pieces_ = pathOrString;
                this.pieceNum_ = pieceNum;
            }
        }
        toString() {
            let pathString = '';
            for (let i = this.pieceNum_; i < this.pieces_.length; i++) {
                if (this.pieces_[i] !== '') {
                    pathString += '/' + this.pieces_[i];
                }
            }
            return pathString || '/';
        }
    }
    function newEmptyPath() {
        return new Path('');
    }
    function pathGetFront(path) {
        if (path.pieceNum_ >= path.pieces_.length) {
            return null;
        }
        return path.pieces_[path.pieceNum_];
    }
    /**
     * @returns The number of segments in this path
     */
    function pathGetLength(path) {
        return path.pieces_.length - path.pieceNum_;
    }
    function pathPopFront(path) {
        let pieceNum = path.pieceNum_;
        if (pieceNum < path.pieces_.length) {
            pieceNum++;
        }
        return new Path(path.pieces_, pieceNum);
    }
    function pathGetBack(path) {
        if (path.pieceNum_ < path.pieces_.length) {
            return path.pieces_[path.pieces_.length - 1];
        }
        return null;
    }
    function pathToUrlEncodedString(path) {
        let pathString = '';
        for (let i = path.pieceNum_; i < path.pieces_.length; i++) {
            if (path.pieces_[i] !== '') {
                pathString += '/' + encodeURIComponent(String(path.pieces_[i]));
            }
        }
        return pathString || '/';
    }
    /**
     * Shallow copy of the parts of the path.
     *
     */
    function pathSlice(path, begin = 0) {
        return path.pieces_.slice(path.pieceNum_ + begin);
    }
    function pathParent(path) {
        if (path.pieceNum_ >= path.pieces_.length) {
            return null;
        }
        const pieces = [];
        for (let i = path.pieceNum_; i < path.pieces_.length - 1; i++) {
            pieces.push(path.pieces_[i]);
        }
        return new Path(pieces, 0);
    }
    function pathChild(path, childPathObj) {
        const pieces = [];
        for (let i = path.pieceNum_; i < path.pieces_.length; i++) {
            pieces.push(path.pieces_[i]);
        }
        if (childPathObj instanceof Path) {
            for (let i = childPathObj.pieceNum_; i < childPathObj.pieces_.length; i++) {
                pieces.push(childPathObj.pieces_[i]);
            }
        }
        else {
            const childPieces = childPathObj.split('/');
            for (let i = 0; i < childPieces.length; i++) {
                if (childPieces[i].length > 0) {
                    pieces.push(childPieces[i]);
                }
            }
        }
        return new Path(pieces, 0);
    }
    /**
     * @returns True if there are no segments in this path
     */
    function pathIsEmpty(path) {
        return path.pieceNum_ >= path.pieces_.length;
    }
    /**
     * @returns The path from outerPath to innerPath
     */
    function newRelativePath(outerPath, innerPath) {
        const outer = pathGetFront(outerPath), inner = pathGetFront(innerPath);
        if (outer === null) {
            return innerPath;
        }
        else if (outer === inner) {
            return newRelativePath(pathPopFront(outerPath), pathPopFront(innerPath));
        }
        else {
            throw new Error('INTERNAL ERROR: innerPath (' +
                innerPath +
                ') is not within ' +
                'outerPath (' +
                outerPath +
                ')');
        }
    }
    /**
     * @returns true if paths are the same.
     */
    function pathEquals(path, other) {
        if (pathGetLength(path) !== pathGetLength(other)) {
            return false;
        }
        for (let i = path.pieceNum_, j = other.pieceNum_; i <= path.pieces_.length; i++, j++) {
            if (path.pieces_[i] !== other.pieces_[j]) {
                return false;
            }
        }
        return true;
    }
    /**
     * @returns True if this path is a parent (or the same as) other
     */
    function pathContains(path, other) {
        let i = path.pieceNum_;
        let j = other.pieceNum_;
        if (pathGetLength(path) > pathGetLength(other)) {
            return false;
        }
        while (i < path.pieces_.length) {
            if (path.pieces_[i] !== other.pieces_[j]) {
                return false;
            }
            ++i;
            ++j;
        }
        return true;
    }
    /**
     * Dynamic (mutable) path used to count path lengths.
     *
     * This class is used to efficiently check paths for valid
     * length (in UTF8 bytes) and depth (used in path validation).
     *
     * Throws Error exception if path is ever invalid.
     *
     * The definition of a path always begins with '/'.
     */
    class ValidationPath {
        /**
         * @param path - Initial Path.
         * @param errorPrefix_ - Prefix for any error messages.
         */
        constructor(path, errorPrefix_) {
            this.errorPrefix_ = errorPrefix_;
            this.parts_ = pathSlice(path, 0);
            /** Initialize to number of '/' chars needed in path. */
            this.byteLength_ = Math.max(1, this.parts_.length);
            for (let i = 0; i < this.parts_.length; i++) {
                this.byteLength_ += stringLength(this.parts_[i]);
            }
            validationPathCheckValid(this);
        }
    }
    function validationPathPush(validationPath, child) {
        // Count the needed '/'
        if (validationPath.parts_.length > 0) {
            validationPath.byteLength_ += 1;
        }
        validationPath.parts_.push(child);
        validationPath.byteLength_ += stringLength(child);
        validationPathCheckValid(validationPath);
    }
    function validationPathPop(validationPath) {
        const last = validationPath.parts_.pop();
        validationPath.byteLength_ -= stringLength(last);
        // Un-count the previous '/'
        if (validationPath.parts_.length > 0) {
            validationPath.byteLength_ -= 1;
        }
    }
    function validationPathCheckValid(validationPath) {
        if (validationPath.byteLength_ > MAX_PATH_LENGTH_BYTES) {
            throw new Error(validationPath.errorPrefix_ +
                'has a key path longer than ' +
                MAX_PATH_LENGTH_BYTES +
                ' bytes (' +
                validationPath.byteLength_ +
                ').');
        }
        if (validationPath.parts_.length > MAX_PATH_DEPTH) {
            throw new Error(validationPath.errorPrefix_ +
                'path specified exceeds the maximum depth that can be written (' +
                MAX_PATH_DEPTH +
                ') or object contains a cycle ' +
                validationPathToErrorString(validationPath));
        }
    }
    /**
     * String for use in error messages - uses '.' notation for path.
     */
    function validationPathToErrorString(validationPath) {
        if (validationPath.parts_.length === 0) {
            return '';
        }
        return "in property '" + validationPath.parts_.join('.') + "'";
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    class VisibilityMonitor extends EventEmitter {
        constructor() {
            super(['visible']);
            let hidden;
            let visibilityChange;
            if (typeof document !== 'undefined' &&
                typeof document.addEventListener !== 'undefined') {
                if (typeof document['hidden'] !== 'undefined') {
                    // Opera 12.10 and Firefox 18 and later support
                    visibilityChange = 'visibilitychange';
                    hidden = 'hidden';
                }
                else if (typeof document['mozHidden'] !== 'undefined') {
                    visibilityChange = 'mozvisibilitychange';
                    hidden = 'mozHidden';
                }
                else if (typeof document['msHidden'] !== 'undefined') {
                    visibilityChange = 'msvisibilitychange';
                    hidden = 'msHidden';
                }
                else if (typeof document['webkitHidden'] !== 'undefined') {
                    visibilityChange = 'webkitvisibilitychange';
                    hidden = 'webkitHidden';
                }
            }
            // Initially, we always assume we are visible. This ensures that in browsers
            // without page visibility support or in cases where we are never visible
            // (e.g. chrome extension), we act as if we are visible, i.e. don't delay
            // reconnects
            this.visible_ = true;
            if (visibilityChange) {
                document.addEventListener(visibilityChange, () => {
                    const visible = !document[hidden];
                    if (visible !== this.visible_) {
                        this.visible_ = visible;
                        this.trigger('visible', visible);
                    }
                }, false);
            }
        }
        static getInstance() {
            return new VisibilityMonitor();
        }
        getInitialEvent(eventType) {
            assert(eventType === 'visible', 'Unknown event type: ' + eventType);
            return [this.visible_];
        }
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    const RECONNECT_MIN_DELAY = 1000;
    const RECONNECT_MAX_DELAY_DEFAULT = 60 * 5 * 1000; // 5 minutes in milliseconds (Case: 1858)
    const GET_CONNECT_TIMEOUT = 3 * 1000;
    const RECONNECT_MAX_DELAY_FOR_ADMINS = 30 * 1000; // 30 seconds for admin clients (likely to be a backend server)
    const RECONNECT_DELAY_MULTIPLIER = 1.3;
    const RECONNECT_DELAY_RESET_TIMEOUT = 30000; // Reset delay back to MIN_DELAY after being connected for 30sec.
    const SERVER_KILL_INTERRUPT_REASON = 'server_kill';
    // If auth fails repeatedly, we'll assume something is wrong and log a warning / back off.
    const INVALID_TOKEN_THRESHOLD = 3;
    /**
     * Firebase connection.  Abstracts wire protocol and handles reconnecting.
     *
     * NOTE: All JSON objects sent to the realtime connection must have property names enclosed
     * in quotes to make sure the closure compiler does not minify them.
     */
    class PersistentConnection extends ServerActions {
        /**
         * @param repoInfo_ - Data about the namespace we are connecting to
         * @param applicationId_ - The Firebase App ID for this project
         * @param onDataUpdate_ - A callback for new data from the server
         */
        constructor(repoInfo_, applicationId_, onDataUpdate_, onConnectStatus_, onServerInfoUpdate_, authTokenProvider_, appCheckTokenProvider_, authOverride_) {
            super();
            this.repoInfo_ = repoInfo_;
            this.applicationId_ = applicationId_;
            this.onDataUpdate_ = onDataUpdate_;
            this.onConnectStatus_ = onConnectStatus_;
            this.onServerInfoUpdate_ = onServerInfoUpdate_;
            this.authTokenProvider_ = authTokenProvider_;
            this.appCheckTokenProvider_ = appCheckTokenProvider_;
            this.authOverride_ = authOverride_;
            // Used for diagnostic logging.
            this.id = PersistentConnection.nextPersistentConnectionId_++;
            this.log_ = logWrapper('p:' + this.id + ':');
            this.interruptReasons_ = {};
            this.listens = new Map();
            this.outstandingPuts_ = [];
            this.outstandingGets_ = [];
            this.outstandingPutCount_ = 0;
            this.outstandingGetCount_ = 0;
            this.onDisconnectRequestQueue_ = [];
            this.connected_ = false;
            this.reconnectDelay_ = RECONNECT_MIN_DELAY;
            this.maxReconnectDelay_ = RECONNECT_MAX_DELAY_DEFAULT;
            this.securityDebugCallback_ = null;
            this.lastSessionId = null;
            this.establishConnectionTimer_ = null;
            this.visible_ = false;
            // Before we get connected, we keep a queue of pending messages to send.
            this.requestCBHash_ = {};
            this.requestNumber_ = 0;
            this.realtime_ = null;
            this.authToken_ = null;
            this.appCheckToken_ = null;
            this.forceTokenRefresh_ = false;
            this.invalidAuthTokenCount_ = 0;
            this.invalidAppCheckTokenCount_ = 0;
            this.firstConnection_ = true;
            this.lastConnectionAttemptTime_ = null;
            this.lastConnectionEstablishedTime_ = null;
            if (authOverride_ && !isNodeSdk()) {
                throw new Error('Auth override specified in options, but not supported on non Node.js platforms');
            }
            VisibilityMonitor.getInstance().on('visible', this.onVisible_, this);
            if (repoInfo_.host.indexOf('fblocal') === -1) {
                OnlineMonitor.getInstance().on('online', this.onOnline_, this);
            }
        }
        sendRequest(action, body, onResponse) {
            const curReqNum = ++this.requestNumber_;
            const msg = { r: curReqNum, a: action, b: body };
            this.log_(stringify(msg));
            assert(this.connected_, "sendRequest call when we're not connected not allowed.");
            this.realtime_.sendRequest(msg);
            if (onResponse) {
                this.requestCBHash_[curReqNum] = onResponse;
            }
        }
        get(query) {
            this.initConnection_();
            const deferred = new Deferred();
            const request = {
                p: query._path.toString(),
                q: query._queryObject
            };
            const outstandingGet = {
                action: 'g',
                request,
                onComplete: (message) => {
                    const payload = message['d'];
                    if (message['s'] === 'ok') {
                        this.onDataUpdate_(request['p'], payload, 
                        /*isMerge*/ false, 
                        /*tag*/ null);
                        deferred.resolve(payload);
                    }
                    else {
                        deferred.reject(payload);
                    }
                }
            };
            this.outstandingGets_.push(outstandingGet);
            this.outstandingGetCount_++;
            const index = this.outstandingGets_.length - 1;
            if (!this.connected_) {
                setTimeout(() => {
                    const get = this.outstandingGets_[index];
                    if (get === undefined || outstandingGet !== get) {
                        return;
                    }
                    delete this.outstandingGets_[index];
                    this.outstandingGetCount_--;
                    if (this.outstandingGetCount_ === 0) {
                        this.outstandingGets_ = [];
                    }
                    this.log_('get ' + index + ' timed out on connection');
                    deferred.reject(new Error('Client is offline.'));
                }, GET_CONNECT_TIMEOUT);
            }
            if (this.connected_) {
                this.sendGet_(index);
            }
            return deferred.promise;
        }
        listen(query, currentHashFn, tag, onComplete) {
            this.initConnection_();
            const queryId = query._queryIdentifier;
            const pathString = query._path.toString();
            this.log_('Listen called for ' + pathString + ' ' + queryId);
            if (!this.listens.has(pathString)) {
                this.listens.set(pathString, new Map());
            }
            assert(query._queryParams.isDefault() || !query._queryParams.loadsAllData(), 'listen() called for non-default but complete query');
            assert(!this.listens.get(pathString).has(queryId), 'listen() called twice for same path/queryId.');
            const listenSpec = {
                onComplete,
                hashFn: currentHashFn,
                query,
                tag
            };
            this.listens.get(pathString).set(queryId, listenSpec);
            if (this.connected_) {
                this.sendListen_(listenSpec);
            }
        }
        sendGet_(index) {
            const get = this.outstandingGets_[index];
            this.sendRequest('g', get.request, (message) => {
                delete this.outstandingGets_[index];
                this.outstandingGetCount_--;
                if (this.outstandingGetCount_ === 0) {
                    this.outstandingGets_ = [];
                }
                if (get.onComplete) {
                    get.onComplete(message);
                }
            });
        }
        sendListen_(listenSpec) {
            const query = listenSpec.query;
            const pathString = query._path.toString();
            const queryId = query._queryIdentifier;
            this.log_('Listen on ' + pathString + ' for ' + queryId);
            const req = { /*path*/ p: pathString };
            const action = 'q';
            // Only bother to send query if it's non-default.
            if (listenSpec.tag) {
                req['q'] = query._queryObject;
                req['t'] = listenSpec.tag;
            }
            req[ /*hash*/'h'] = listenSpec.hashFn();
            this.sendRequest(action, req, (message) => {
                const payload = message[ /*data*/'d'];
                const status = message[ /*status*/'s'];
                // print warnings in any case...
                PersistentConnection.warnOnListenWarnings_(payload, query);
                const currentListenSpec = this.listens.get(pathString) &&
                    this.listens.get(pathString).get(queryId);
                // only trigger actions if the listen hasn't been removed and readded
                if (currentListenSpec === listenSpec) {
                    this.log_('listen response', message);
                    if (status !== 'ok') {
                        this.removeListen_(pathString, queryId);
                    }
                    if (listenSpec.onComplete) {
                        listenSpec.onComplete(status, payload);
                    }
                }
            });
        }
        static warnOnListenWarnings_(payload, query) {
            if (payload && typeof payload === 'object' && contains$1(payload, 'w')) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const warnings = safeGet(payload, 'w');
                if (Array.isArray(warnings) && ~warnings.indexOf('no_index')) {
                    const indexSpec = '".indexOn": "' + query._queryParams.getIndex().toString() + '"';
                    const indexPath = query._path.toString();
                    warn(`Using an unspecified index. Your data will be downloaded and ` +
                        `filtered on the client. Consider adding ${indexSpec} at ` +
                        `${indexPath} to your security rules for better performance.`);
                }
            }
        }
        refreshAuthToken(token) {
            this.authToken_ = token;
            this.log_('Auth token refreshed');
            if (this.authToken_) {
                this.tryAuth();
            }
            else {
                //If we're connected we want to let the server know to unauthenticate us. If we're not connected, simply delete
                //the credential so we dont become authenticated next time we connect.
                if (this.connected_) {
                    this.sendRequest('unauth', {}, () => { });
                }
            }
            this.reduceReconnectDelayIfAdminCredential_(token);
        }
        reduceReconnectDelayIfAdminCredential_(credential) {
            // NOTE: This isn't intended to be bulletproof (a malicious developer can always just modify the client).
            // Additionally, we don't bother resetting the max delay back to the default if auth fails / expires.
            const isFirebaseSecret = credential && credential.length === 40;
            if (isFirebaseSecret || isAdmin(credential)) {
                this.log_('Admin auth credential detected.  Reducing max reconnect time.');
                this.maxReconnectDelay_ = RECONNECT_MAX_DELAY_FOR_ADMINS;
            }
        }
        refreshAppCheckToken(token) {
            this.appCheckToken_ = token;
            this.log_('App check token refreshed');
            if (this.appCheckToken_) {
                this.tryAppCheck();
            }
            else {
                //If we're connected we want to let the server know to unauthenticate us.
                //If we're not connected, simply delete the credential so we dont become
                // authenticated next time we connect.
                if (this.connected_) {
                    this.sendRequest('unappeck', {}, () => { });
                }
            }
        }
        /**
         * Attempts to authenticate with the given credentials. If the authentication attempt fails, it's triggered like
         * a auth revoked (the connection is closed).
         */
        tryAuth() {
            if (this.connected_ && this.authToken_) {
                const token = this.authToken_;
                const authMethod = isValidFormat(token) ? 'auth' : 'gauth';
                const requestData = { cred: token };
                if (this.authOverride_ === null) {
                    requestData['noauth'] = true;
                }
                else if (typeof this.authOverride_ === 'object') {
                    requestData['authvar'] = this.authOverride_;
                }
                this.sendRequest(authMethod, requestData, (res) => {
                    const status = res[ /*status*/'s'];
                    const data = res[ /*data*/'d'] || 'error';
                    if (this.authToken_ === token) {
                        if (status === 'ok') {
                            this.invalidAuthTokenCount_ = 0;
                        }
                        else {
                            // Triggers reconnect and force refresh for auth token
                            this.onAuthRevoked_(status, data);
                        }
                    }
                });
            }
        }
        /**
         * Attempts to authenticate with the given token. If the authentication
         * attempt fails, it's triggered like the token was revoked (the connection is
         * closed).
         */
        tryAppCheck() {
            if (this.connected_ && this.appCheckToken_) {
                this.sendRequest('appcheck', { 'token': this.appCheckToken_ }, (res) => {
                    const status = res[ /*status*/'s'];
                    const data = res[ /*data*/'d'] || 'error';
                    if (status === 'ok') {
                        this.invalidAppCheckTokenCount_ = 0;
                    }
                    else {
                        this.onAppCheckRevoked_(status, data);
                    }
                });
            }
        }
        /**
         * @inheritDoc
         */
        unlisten(query, tag) {
            const pathString = query._path.toString();
            const queryId = query._queryIdentifier;
            this.log_('Unlisten called for ' + pathString + ' ' + queryId);
            assert(query._queryParams.isDefault() || !query._queryParams.loadsAllData(), 'unlisten() called for non-default but complete query');
            const listen = this.removeListen_(pathString, queryId);
            if (listen && this.connected_) {
                this.sendUnlisten_(pathString, queryId, query._queryObject, tag);
            }
        }
        sendUnlisten_(pathString, queryId, queryObj, tag) {
            this.log_('Unlisten on ' + pathString + ' for ' + queryId);
            const req = { /*path*/ p: pathString };
            const action = 'n';
            // Only bother sending queryId if it's non-default.
            if (tag) {
                req['q'] = queryObj;
                req['t'] = tag;
            }
            this.sendRequest(action, req);
        }
        onDisconnectPut(pathString, data, onComplete) {
            this.initConnection_();
            if (this.connected_) {
                this.sendOnDisconnect_('o', pathString, data, onComplete);
            }
            else {
                this.onDisconnectRequestQueue_.push({
                    pathString,
                    action: 'o',
                    data,
                    onComplete
                });
            }
        }
        onDisconnectMerge(pathString, data, onComplete) {
            this.initConnection_();
            if (this.connected_) {
                this.sendOnDisconnect_('om', pathString, data, onComplete);
            }
            else {
                this.onDisconnectRequestQueue_.push({
                    pathString,
                    action: 'om',
                    data,
                    onComplete
                });
            }
        }
        onDisconnectCancel(pathString, onComplete) {
            this.initConnection_();
            if (this.connected_) {
                this.sendOnDisconnect_('oc', pathString, null, onComplete);
            }
            else {
                this.onDisconnectRequestQueue_.push({
                    pathString,
                    action: 'oc',
                    data: null,
                    onComplete
                });
            }
        }
        sendOnDisconnect_(action, pathString, data, onComplete) {
            const request = { /*path*/ p: pathString, /*data*/ d: data };
            this.log_('onDisconnect ' + action, request);
            this.sendRequest(action, request, (response) => {
                if (onComplete) {
                    setTimeout(() => {
                        onComplete(response[ /*status*/'s'], response[ /* data */'d']);
                    }, Math.floor(0));
                }
            });
        }
        put(pathString, data, onComplete, hash) {
            this.putInternal('p', pathString, data, onComplete, hash);
        }
        merge(pathString, data, onComplete, hash) {
            this.putInternal('m', pathString, data, onComplete, hash);
        }
        putInternal(action, pathString, data, onComplete, hash) {
            this.initConnection_();
            const request = {
                /*path*/ p: pathString,
                /*data*/ d: data
            };
            if (hash !== undefined) {
                request[ /*hash*/'h'] = hash;
            }
            // TODO: Only keep track of the most recent put for a given path?
            this.outstandingPuts_.push({
                action,
                request,
                onComplete
            });
            this.outstandingPutCount_++;
            const index = this.outstandingPuts_.length - 1;
            if (this.connected_) {
                this.sendPut_(index);
            }
            else {
                this.log_('Buffering put: ' + pathString);
            }
        }
        sendPut_(index) {
            const action = this.outstandingPuts_[index].action;
            const request = this.outstandingPuts_[index].request;
            const onComplete = this.outstandingPuts_[index].onComplete;
            this.outstandingPuts_[index].queued = this.connected_;
            this.sendRequest(action, request, (message) => {
                this.log_(action + ' response', message);
                delete this.outstandingPuts_[index];
                this.outstandingPutCount_--;
                // Clean up array occasionally.
                if (this.outstandingPutCount_ === 0) {
                    this.outstandingPuts_ = [];
                }
                if (onComplete) {
                    onComplete(message[ /*status*/'s'], message[ /* data */'d']);
                }
            });
        }
        reportStats(stats) {
            // If we're not connected, we just drop the stats.
            if (this.connected_) {
                const request = { /*counters*/ c: stats };
                this.log_('reportStats', request);
                this.sendRequest(/*stats*/ 's', request, result => {
                    const status = result[ /*status*/'s'];
                    if (status !== 'ok') {
                        const errorReason = result[ /* data */'d'];
                        this.log_('reportStats', 'Error sending stats: ' + errorReason);
                    }
                });
            }
        }
        onDataMessage_(message) {
            if ('r' in message) {
                // this is a response
                this.log_('from server: ' + stringify(message));
                const reqNum = message['r'];
                const onResponse = this.requestCBHash_[reqNum];
                if (onResponse) {
                    delete this.requestCBHash_[reqNum];
                    onResponse(message[ /*body*/'b']);
                }
            }
            else if ('error' in message) {
                throw 'A server-side error has occurred: ' + message['error'];
            }
            else if ('a' in message) {
                // a and b are action and body, respectively
                this.onDataPush_(message['a'], message['b']);
            }
        }
        onDataPush_(action, body) {
            this.log_('handleServerMessage', action, body);
            if (action === 'd') {
                this.onDataUpdate_(body[ /*path*/'p'], body[ /*data*/'d'], 
                /*isMerge*/ false, body['t']);
            }
            else if (action === 'm') {
                this.onDataUpdate_(body[ /*path*/'p'], body[ /*data*/'d'], 
                /*isMerge=*/ true, body['t']);
            }
            else if (action === 'c') {
                this.onListenRevoked_(body[ /*path*/'p'], body[ /*query*/'q']);
            }
            else if (action === 'ac') {
                this.onAuthRevoked_(body[ /*status code*/'s'], body[ /* explanation */'d']);
            }
            else if (action === 'apc') {
                this.onAppCheckRevoked_(body[ /*status code*/'s'], body[ /* explanation */'d']);
            }
            else if (action === 'sd') {
                this.onSecurityDebugPacket_(body);
            }
            else {
                error('Unrecognized action received from server: ' +
                    stringify(action) +
                    '\nAre you using the latest client?');
            }
        }
        onReady_(timestamp, sessionId) {
            this.log_('connection ready');
            this.connected_ = true;
            this.lastConnectionEstablishedTime_ = new Date().getTime();
            this.handleTimestamp_(timestamp);
            this.lastSessionId = sessionId;
            if (this.firstConnection_) {
                this.sendConnectStats_();
            }
            this.restoreState_();
            this.firstConnection_ = false;
            this.onConnectStatus_(true);
        }
        scheduleConnect_(timeout) {
            assert(!this.realtime_, "Scheduling a connect when we're already connected/ing?");
            if (this.establishConnectionTimer_) {
                clearTimeout(this.establishConnectionTimer_);
            }
            // NOTE: Even when timeout is 0, it's important to do a setTimeout to work around an infuriating "Security Error" in
            // Firefox when trying to write to our long-polling iframe in some scenarios (e.g. Forge or our unit tests).
            this.establishConnectionTimer_ = setTimeout(() => {
                this.establishConnectionTimer_ = null;
                this.establishConnection_();
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            }, Math.floor(timeout));
        }
        initConnection_() {
            if (!this.realtime_ && this.firstConnection_) {
                this.scheduleConnect_(0);
            }
        }
        onVisible_(visible) {
            // NOTE: Tabbing away and back to a window will defeat our reconnect backoff, but I think that's fine.
            if (visible &&
                !this.visible_ &&
                this.reconnectDelay_ === this.maxReconnectDelay_) {
                this.log_('Window became visible.  Reducing delay.');
                this.reconnectDelay_ = RECONNECT_MIN_DELAY;
                if (!this.realtime_) {
                    this.scheduleConnect_(0);
                }
            }
            this.visible_ = visible;
        }
        onOnline_(online) {
            if (online) {
                this.log_('Browser went online.');
                this.reconnectDelay_ = RECONNECT_MIN_DELAY;
                if (!this.realtime_) {
                    this.scheduleConnect_(0);
                }
            }
            else {
                this.log_('Browser went offline.  Killing connection.');
                if (this.realtime_) {
                    this.realtime_.close();
                }
            }
        }
        onRealtimeDisconnect_() {
            this.log_('data client disconnected');
            this.connected_ = false;
            this.realtime_ = null;
            // Since we don't know if our sent transactions succeeded or not, we need to cancel them.
            this.cancelSentTransactions_();
            // Clear out the pending requests.
            this.requestCBHash_ = {};
            if (this.shouldReconnect_()) {
                if (!this.visible_) {
                    this.log_("Window isn't visible.  Delaying reconnect.");
                    this.reconnectDelay_ = this.maxReconnectDelay_;
                    this.lastConnectionAttemptTime_ = new Date().getTime();
                }
                else if (this.lastConnectionEstablishedTime_) {
                    // If we've been connected long enough, reset reconnect delay to minimum.
                    const timeSinceLastConnectSucceeded = new Date().getTime() - this.lastConnectionEstablishedTime_;
                    if (timeSinceLastConnectSucceeded > RECONNECT_DELAY_RESET_TIMEOUT) {
                        this.reconnectDelay_ = RECONNECT_MIN_DELAY;
                    }
                    this.lastConnectionEstablishedTime_ = null;
                }
                const timeSinceLastConnectAttempt = new Date().getTime() - this.lastConnectionAttemptTime_;
                let reconnectDelay = Math.max(0, this.reconnectDelay_ - timeSinceLastConnectAttempt);
                reconnectDelay = Math.random() * reconnectDelay;
                this.log_('Trying to reconnect in ' + reconnectDelay + 'ms');
                this.scheduleConnect_(reconnectDelay);
                // Adjust reconnect delay for next time.
                this.reconnectDelay_ = Math.min(this.maxReconnectDelay_, this.reconnectDelay_ * RECONNECT_DELAY_MULTIPLIER);
            }
            this.onConnectStatus_(false);
        }
        async establishConnection_() {
            if (this.shouldReconnect_()) {
                this.log_('Making a connection attempt');
                this.lastConnectionAttemptTime_ = new Date().getTime();
                this.lastConnectionEstablishedTime_ = null;
                const onDataMessage = this.onDataMessage_.bind(this);
                const onReady = this.onReady_.bind(this);
                const onDisconnect = this.onRealtimeDisconnect_.bind(this);
                const connId = this.id + ':' + PersistentConnection.nextConnectionId_++;
                const lastSessionId = this.lastSessionId;
                let canceled = false;
                let connection = null;
                const closeFn = function () {
                    if (connection) {
                        connection.close();
                    }
                    else {
                        canceled = true;
                        onDisconnect();
                    }
                };
                const sendRequestFn = function (msg) {
                    assert(connection, "sendRequest call when we're not connected not allowed.");
                    connection.sendRequest(msg);
                };
                this.realtime_ = {
                    close: closeFn,
                    sendRequest: sendRequestFn
                };
                const forceRefresh = this.forceTokenRefresh_;
                this.forceTokenRefresh_ = false;
                try {
                    // First fetch auth and app check token, and establish connection after
                    // fetching the token was successful
                    const [authToken, appCheckToken] = await Promise.all([
                        this.authTokenProvider_.getToken(forceRefresh),
                        this.appCheckTokenProvider_.getToken(forceRefresh)
                    ]);
                    if (!canceled) {
                        log('getToken() completed. Creating connection.');
                        this.authToken_ = authToken && authToken.accessToken;
                        this.appCheckToken_ = appCheckToken && appCheckToken.token;
                        connection = new Connection(connId, this.repoInfo_, this.applicationId_, this.appCheckToken_, this.authToken_, onDataMessage, onReady, onDisconnect, 
                        /* onKill= */ reason => {
                            warn(reason + ' (' + this.repoInfo_.toString() + ')');
                            this.interrupt(SERVER_KILL_INTERRUPT_REASON);
                        }, lastSessionId);
                    }
                    else {
                        log('getToken() completed but was canceled');
                    }
                }
                catch (error) {
                    this.log_('Failed to get token: ' + error);
                    if (!canceled) {
                        if (this.repoInfo_.nodeAdmin) {
                            // This may be a critical error for the Admin Node.js SDK, so log a warning.
                            // But getToken() may also just have temporarily failed, so we still want to
                            // continue retrying.
                            warn(error);
                        }
                        closeFn();
                    }
                }
            }
        }
        interrupt(reason) {
            log('Interrupting connection for reason: ' + reason);
            this.interruptReasons_[reason] = true;
            if (this.realtime_) {
                this.realtime_.close();
            }
            else {
                if (this.establishConnectionTimer_) {
                    clearTimeout(this.establishConnectionTimer_);
                    this.establishConnectionTimer_ = null;
                }
                if (this.connected_) {
                    this.onRealtimeDisconnect_();
                }
            }
        }
        resume(reason) {
            log('Resuming connection for reason: ' + reason);
            delete this.interruptReasons_[reason];
            if (isEmpty(this.interruptReasons_)) {
                this.reconnectDelay_ = RECONNECT_MIN_DELAY;
                if (!this.realtime_) {
                    this.scheduleConnect_(0);
                }
            }
        }
        handleTimestamp_(timestamp) {
            const delta = timestamp - new Date().getTime();
            this.onServerInfoUpdate_({ serverTimeOffset: delta });
        }
        cancelSentTransactions_() {
            for (let i = 0; i < this.outstandingPuts_.length; i++) {
                const put = this.outstandingPuts_[i];
                if (put && /*hash*/ 'h' in put.request && put.queued) {
                    if (put.onComplete) {
                        put.onComplete('disconnect');
                    }
                    delete this.outstandingPuts_[i];
                    this.outstandingPutCount_--;
                }
            }
            // Clean up array occasionally.
            if (this.outstandingPutCount_ === 0) {
                this.outstandingPuts_ = [];
            }
        }
        onListenRevoked_(pathString, query) {
            // Remove the listen and manufacture a "permission_denied" error for the failed listen.
            let queryId;
            if (!query) {
                queryId = 'default';
            }
            else {
                queryId = query.map(q => ObjectToUniqueKey(q)).join('$');
            }
            const listen = this.removeListen_(pathString, queryId);
            if (listen && listen.onComplete) {
                listen.onComplete('permission_denied');
            }
        }
        removeListen_(pathString, queryId) {
            const normalizedPathString = new Path(pathString).toString(); // normalize path.
            let listen;
            if (this.listens.has(normalizedPathString)) {
                const map = this.listens.get(normalizedPathString);
                listen = map.get(queryId);
                map.delete(queryId);
                if (map.size === 0) {
                    this.listens.delete(normalizedPathString);
                }
            }
            else {
                // all listens for this path has already been removed
                listen = undefined;
            }
            return listen;
        }
        onAuthRevoked_(statusCode, explanation) {
            log('Auth token revoked: ' + statusCode + '/' + explanation);
            this.authToken_ = null;
            this.forceTokenRefresh_ = true;
            this.realtime_.close();
            if (statusCode === 'invalid_token' || statusCode === 'permission_denied') {
                // We'll wait a couple times before logging the warning / increasing the
                // retry period since oauth tokens will report as "invalid" if they're
                // just expired. Plus there may be transient issues that resolve themselves.
                this.invalidAuthTokenCount_++;
                if (this.invalidAuthTokenCount_ >= INVALID_TOKEN_THRESHOLD) {
                    // Set a long reconnect delay because recovery is unlikely
                    this.reconnectDelay_ = RECONNECT_MAX_DELAY_FOR_ADMINS;
                    // Notify the auth token provider that the token is invalid, which will log
                    // a warning
                    this.authTokenProvider_.notifyForInvalidToken();
                }
            }
        }
        onAppCheckRevoked_(statusCode, explanation) {
            log('App check token revoked: ' + statusCode + '/' + explanation);
            this.appCheckToken_ = null;
            this.forceTokenRefresh_ = true;
            // Note: We don't close the connection as the developer may not have
            // enforcement enabled. The backend closes connections with enforcements.
            if (statusCode === 'invalid_token' || statusCode === 'permission_denied') {
                // We'll wait a couple times before logging the warning / increasing the
                // retry period since oauth tokens will report as "invalid" if they're
                // just expired. Plus there may be transient issues that resolve themselves.
                this.invalidAppCheckTokenCount_++;
                if (this.invalidAppCheckTokenCount_ >= INVALID_TOKEN_THRESHOLD) {
                    this.appCheckTokenProvider_.notifyForInvalidToken();
                }
            }
        }
        onSecurityDebugPacket_(body) {
            if (this.securityDebugCallback_) {
                this.securityDebugCallback_(body);
            }
            else {
                if ('msg' in body) {
                    console.log('FIREBASE: ' + body['msg'].replace('\n', '\nFIREBASE: '));
                }
            }
        }
        restoreState_() {
            //Re-authenticate ourselves if we have a credential stored.
            this.tryAuth();
            this.tryAppCheck();
            // Puts depend on having received the corresponding data update from the server before they complete, so we must
            // make sure to send listens before puts.
            for (const queries of this.listens.values()) {
                for (const listenSpec of queries.values()) {
                    this.sendListen_(listenSpec);
                }
            }
            for (let i = 0; i < this.outstandingPuts_.length; i++) {
                if (this.outstandingPuts_[i]) {
                    this.sendPut_(i);
                }
            }
            while (this.onDisconnectRequestQueue_.length) {
                const request = this.onDisconnectRequestQueue_.shift();
                this.sendOnDisconnect_(request.action, request.pathString, request.data, request.onComplete);
            }
            for (let i = 0; i < this.outstandingGets_.length; i++) {
                if (this.outstandingGets_[i]) {
                    this.sendGet_(i);
                }
            }
        }
        /**
         * Sends client stats for first connection
         */
        sendConnectStats_() {
            const stats = {};
            let clientName = 'js';
            stats['sdk.' + clientName + '.' + SDK_VERSION.replace(/\./g, '-')] = 1;
            if (isMobileCordova()) {
                stats['framework.cordova'] = 1;
            }
            else if (isReactNative()) {
                stats['framework.reactnative'] = 1;
            }
            this.reportStats(stats);
        }
        shouldReconnect_() {
            const online = OnlineMonitor.getInstance().currentlyOnline();
            return isEmpty(this.interruptReasons_) && online;
        }
    }
    PersistentConnection.nextPersistentConnectionId_ = 0;
    /**
     * Counter for number of connections created. Mainly used for tagging in the logs
     */
    PersistentConnection.nextConnectionId_ = 0;

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    class NamedNode {
        constructor(name, node) {
            this.name = name;
            this.node = node;
        }
        static Wrap(name, node) {
            return new NamedNode(name, node);
        }
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    class Index {
        /**
         * @returns A standalone comparison function for
         * this index
         */
        getCompare() {
            return this.compare.bind(this);
        }
        /**
         * Given a before and after value for a node, determine if the indexed value has changed. Even if they are different,
         * it's possible that the changes are isolated to parts of the snapshot that are not indexed.
         *
         *
         * @returns True if the portion of the snapshot being indexed changed between oldNode and newNode
         */
        indexedValueChanged(oldNode, newNode) {
            const oldWrapped = new NamedNode(MIN_NAME, oldNode);
            const newWrapped = new NamedNode(MIN_NAME, newNode);
            return this.compare(oldWrapped, newWrapped) !== 0;
        }
        /**
         * @returns a node wrapper that will sort equal to or less than
         * any other node wrapper, using this index
         */
        minPost() {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            return NamedNode.MIN;
        }
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    let __EMPTY_NODE;
    class KeyIndex extends Index {
        static get __EMPTY_NODE() {
            return __EMPTY_NODE;
        }
        static set __EMPTY_NODE(val) {
            __EMPTY_NODE = val;
        }
        compare(a, b) {
            return nameCompare(a.name, b.name);
        }
        isDefinedOn(node) {
            // We could probably return true here (since every node has a key), but it's never called
            // so just leaving unimplemented for now.
            throw assertionError('KeyIndex.isDefinedOn not expected to be called.');
        }
        indexedValueChanged(oldNode, newNode) {
            return false; // The key for a node never changes.
        }
        minPost() {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            return NamedNode.MIN;
        }
        maxPost() {
            // TODO: This should really be created once and cached in a static property, but
            // NamedNode isn't defined yet, so I can't use it in a static.  Bleh.
            return new NamedNode(MAX_NAME, __EMPTY_NODE);
        }
        makePost(indexValue, name) {
            assert(typeof indexValue === 'string', 'KeyIndex indexValue must always be a string.');
            // We just use empty node, but it'll never be compared, since our comparator only looks at name.
            return new NamedNode(indexValue, __EMPTY_NODE);
        }
        /**
         * @returns String representation for inclusion in a query spec
         */
        toString() {
            return '.key';
        }
    }
    const KEY_INDEX = new KeyIndex();

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * An iterator over an LLRBNode.
     */
    class SortedMapIterator {
        /**
         * @param node - Node to iterate.
         * @param isReverse_ - Whether or not to iterate in reverse
         */
        constructor(node, startKey, comparator, isReverse_, resultGenerator_ = null) {
            this.isReverse_ = isReverse_;
            this.resultGenerator_ = resultGenerator_;
            this.nodeStack_ = [];
            let cmp = 1;
            while (!node.isEmpty()) {
                node = node;
                cmp = startKey ? comparator(node.key, startKey) : 1;
                // flip the comparison if we're going in reverse
                if (isReverse_) {
                    cmp *= -1;
                }
                if (cmp < 0) {
                    // This node is less than our start key. ignore it
                    if (this.isReverse_) {
                        node = node.left;
                    }
                    else {
                        node = node.right;
                    }
                }
                else if (cmp === 0) {
                    // This node is exactly equal to our start key. Push it on the stack, but stop iterating;
                    this.nodeStack_.push(node);
                    break;
                }
                else {
                    // This node is greater than our start key, add it to the stack and move to the next one
                    this.nodeStack_.push(node);
                    if (this.isReverse_) {
                        node = node.right;
                    }
                    else {
                        node = node.left;
                    }
                }
            }
        }
        getNext() {
            if (this.nodeStack_.length === 0) {
                return null;
            }
            let node = this.nodeStack_.pop();
            let result;
            if (this.resultGenerator_) {
                result = this.resultGenerator_(node.key, node.value);
            }
            else {
                result = { key: node.key, value: node.value };
            }
            if (this.isReverse_) {
                node = node.left;
                while (!node.isEmpty()) {
                    this.nodeStack_.push(node);
                    node = node.right;
                }
            }
            else {
                node = node.right;
                while (!node.isEmpty()) {
                    this.nodeStack_.push(node);
                    node = node.left;
                }
            }
            return result;
        }
        hasNext() {
            return this.nodeStack_.length > 0;
        }
        peek() {
            if (this.nodeStack_.length === 0) {
                return null;
            }
            const node = this.nodeStack_[this.nodeStack_.length - 1];
            if (this.resultGenerator_) {
                return this.resultGenerator_(node.key, node.value);
            }
            else {
                return { key: node.key, value: node.value };
            }
        }
    }
    /**
     * Represents a node in a Left-leaning Red-Black tree.
     */
    class LLRBNode {
        /**
         * @param key - Key associated with this node.
         * @param value - Value associated with this node.
         * @param color - Whether this node is red.
         * @param left - Left child.
         * @param right - Right child.
         */
        constructor(key, value, color, left, right) {
            this.key = key;
            this.value = value;
            this.color = color != null ? color : LLRBNode.RED;
            this.left =
                left != null ? left : SortedMap.EMPTY_NODE;
            this.right =
                right != null ? right : SortedMap.EMPTY_NODE;
        }
        /**
         * Returns a copy of the current node, optionally replacing pieces of it.
         *
         * @param key - New key for the node, or null.
         * @param value - New value for the node, or null.
         * @param color - New color for the node, or null.
         * @param left - New left child for the node, or null.
         * @param right - New right child for the node, or null.
         * @returns The node copy.
         */
        copy(key, value, color, left, right) {
            return new LLRBNode(key != null ? key : this.key, value != null ? value : this.value, color != null ? color : this.color, left != null ? left : this.left, right != null ? right : this.right);
        }
        /**
         * @returns The total number of nodes in the tree.
         */
        count() {
            return this.left.count() + 1 + this.right.count();
        }
        /**
         * @returns True if the tree is empty.
         */
        isEmpty() {
            return false;
        }
        /**
         * Traverses the tree in key order and calls the specified action function
         * for each node.
         *
         * @param action - Callback function to be called for each
         *   node.  If it returns true, traversal is aborted.
         * @returns The first truthy value returned by action, or the last falsey
         *   value returned by action
         */
        inorderTraversal(action) {
            return (this.left.inorderTraversal(action) ||
                !!action(this.key, this.value) ||
                this.right.inorderTraversal(action));
        }
        /**
         * Traverses the tree in reverse key order and calls the specified action function
         * for each node.
         *
         * @param action - Callback function to be called for each
         * node.  If it returns true, traversal is aborted.
         * @returns True if traversal was aborted.
         */
        reverseTraversal(action) {
            return (this.right.reverseTraversal(action) ||
                action(this.key, this.value) ||
                this.left.reverseTraversal(action));
        }
        /**
         * @returns The minimum node in the tree.
         */
        min_() {
            if (this.left.isEmpty()) {
                return this;
            }
            else {
                return this.left.min_();
            }
        }
        /**
         * @returns The maximum key in the tree.
         */
        minKey() {
            return this.min_().key;
        }
        /**
         * @returns The maximum key in the tree.
         */
        maxKey() {
            if (this.right.isEmpty()) {
                return this.key;
            }
            else {
                return this.right.maxKey();
            }
        }
        /**
         * @param key - Key to insert.
         * @param value - Value to insert.
         * @param comparator - Comparator.
         * @returns New tree, with the key/value added.
         */
        insert(key, value, comparator) {
            let n = this;
            const cmp = comparator(key, n.key);
            if (cmp < 0) {
                n = n.copy(null, null, null, n.left.insert(key, value, comparator), null);
            }
            else if (cmp === 0) {
                n = n.copy(null, value, null, null, null);
            }
            else {
                n = n.copy(null, null, null, null, n.right.insert(key, value, comparator));
            }
            return n.fixUp_();
        }
        /**
         * @returns New tree, with the minimum key removed.
         */
        removeMin_() {
            if (this.left.isEmpty()) {
                return SortedMap.EMPTY_NODE;
            }
            let n = this;
            if (!n.left.isRed_() && !n.left.left.isRed_()) {
                n = n.moveRedLeft_();
            }
            n = n.copy(null, null, null, n.left.removeMin_(), null);
            return n.fixUp_();
        }
        /**
         * @param key - The key of the item to remove.
         * @param comparator - Comparator.
         * @returns New tree, with the specified item removed.
         */
        remove(key, comparator) {
            let n, smallest;
            n = this;
            if (comparator(key, n.key) < 0) {
                if (!n.left.isEmpty() && !n.left.isRed_() && !n.left.left.isRed_()) {
                    n = n.moveRedLeft_();
                }
                n = n.copy(null, null, null, n.left.remove(key, comparator), null);
            }
            else {
                if (n.left.isRed_()) {
                    n = n.rotateRight_();
                }
                if (!n.right.isEmpty() && !n.right.isRed_() && !n.right.left.isRed_()) {
                    n = n.moveRedRight_();
                }
                if (comparator(key, n.key) === 0) {
                    if (n.right.isEmpty()) {
                        return SortedMap.EMPTY_NODE;
                    }
                    else {
                        smallest = n.right.min_();
                        n = n.copy(smallest.key, smallest.value, null, null, n.right.removeMin_());
                    }
                }
                n = n.copy(null, null, null, null, n.right.remove(key, comparator));
            }
            return n.fixUp_();
        }
        /**
         * @returns Whether this is a RED node.
         */
        isRed_() {
            return this.color;
        }
        /**
         * @returns New tree after performing any needed rotations.
         */
        fixUp_() {
            let n = this;
            if (n.right.isRed_() && !n.left.isRed_()) {
                n = n.rotateLeft_();
            }
            if (n.left.isRed_() && n.left.left.isRed_()) {
                n = n.rotateRight_();
            }
            if (n.left.isRed_() && n.right.isRed_()) {
                n = n.colorFlip_();
            }
            return n;
        }
        /**
         * @returns New tree, after moveRedLeft.
         */
        moveRedLeft_() {
            let n = this.colorFlip_();
            if (n.right.left.isRed_()) {
                n = n.copy(null, null, null, null, n.right.rotateRight_());
                n = n.rotateLeft_();
                n = n.colorFlip_();
            }
            return n;
        }
        /**
         * @returns New tree, after moveRedRight.
         */
        moveRedRight_() {
            let n = this.colorFlip_();
            if (n.left.left.isRed_()) {
                n = n.rotateRight_();
                n = n.colorFlip_();
            }
            return n;
        }
        /**
         * @returns New tree, after rotateLeft.
         */
        rotateLeft_() {
            const nl = this.copy(null, null, LLRBNode.RED, null, this.right.left);
            return this.right.copy(null, null, this.color, nl, null);
        }
        /**
         * @returns New tree, after rotateRight.
         */
        rotateRight_() {
            const nr = this.copy(null, null, LLRBNode.RED, this.left.right, null);
            return this.left.copy(null, null, this.color, null, nr);
        }
        /**
         * @returns Newt ree, after colorFlip.
         */
        colorFlip_() {
            const left = this.left.copy(null, null, !this.left.color, null, null);
            const right = this.right.copy(null, null, !this.right.color, null, null);
            return this.copy(null, null, !this.color, left, right);
        }
        /**
         * For testing.
         *
         * @returns True if all is well.
         */
        checkMaxDepth_() {
            const blackDepth = this.check_();
            return Math.pow(2.0, blackDepth) <= this.count() + 1;
        }
        check_() {
            if (this.isRed_() && this.left.isRed_()) {
                throw new Error('Red node has red child(' + this.key + ',' + this.value + ')');
            }
            if (this.right.isRed_()) {
                throw new Error('Right child of (' + this.key + ',' + this.value + ') is red');
            }
            const blackDepth = this.left.check_();
            if (blackDepth !== this.right.check_()) {
                throw new Error('Black depths differ');
            }
            else {
                return blackDepth + (this.isRed_() ? 0 : 1);
            }
        }
    }
    LLRBNode.RED = true;
    LLRBNode.BLACK = false;
    /**
     * Represents an empty node (a leaf node in the Red-Black Tree).
     */
    class LLRBEmptyNode {
        /**
         * Returns a copy of the current node.
         *
         * @returns The node copy.
         */
        copy(key, value, color, left, right) {
            return this;
        }
        /**
         * Returns a copy of the tree, with the specified key/value added.
         *
         * @param key - Key to be added.
         * @param value - Value to be added.
         * @param comparator - Comparator.
         * @returns New tree, with item added.
         */
        insert(key, value, comparator) {
            return new LLRBNode(key, value, null);
        }
        /**
         * Returns a copy of the tree, with the specified key removed.
         *
         * @param key - The key to remove.
         * @param comparator - Comparator.
         * @returns New tree, with item removed.
         */
        remove(key, comparator) {
            return this;
        }
        /**
         * @returns The total number of nodes in the tree.
         */
        count() {
            return 0;
        }
        /**
         * @returns True if the tree is empty.
         */
        isEmpty() {
            return true;
        }
        /**
         * Traverses the tree in key order and calls the specified action function
         * for each node.
         *
         * @param action - Callback function to be called for each
         * node.  If it returns true, traversal is aborted.
         * @returns True if traversal was aborted.
         */
        inorderTraversal(action) {
            return false;
        }
        /**
         * Traverses the tree in reverse key order and calls the specified action function
         * for each node.
         *
         * @param action - Callback function to be called for each
         * node.  If it returns true, traversal is aborted.
         * @returns True if traversal was aborted.
         */
        reverseTraversal(action) {
            return false;
        }
        minKey() {
            return null;
        }
        maxKey() {
            return null;
        }
        check_() {
            return 0;
        }
        /**
         * @returns Whether this node is red.
         */
        isRed_() {
            return false;
        }
    }
    /**
     * An immutable sorted map implementation, based on a Left-leaning Red-Black
     * tree.
     */
    class SortedMap {
        /**
         * @param comparator_ - Key comparator.
         * @param root_ - Optional root node for the map.
         */
        constructor(comparator_, root_ = SortedMap.EMPTY_NODE) {
            this.comparator_ = comparator_;
            this.root_ = root_;
        }
        /**
         * Returns a copy of the map, with the specified key/value added or replaced.
         * (TODO: We should perhaps rename this method to 'put')
         *
         * @param key - Key to be added.
         * @param value - Value to be added.
         * @returns New map, with item added.
         */
        insert(key, value) {
            return new SortedMap(this.comparator_, this.root_
                .insert(key, value, this.comparator_)
                .copy(null, null, LLRBNode.BLACK, null, null));
        }
        /**
         * Returns a copy of the map, with the specified key removed.
         *
         * @param key - The key to remove.
         * @returns New map, with item removed.
         */
        remove(key) {
            return new SortedMap(this.comparator_, this.root_
                .remove(key, this.comparator_)
                .copy(null, null, LLRBNode.BLACK, null, null));
        }
        /**
         * Returns the value of the node with the given key, or null.
         *
         * @param key - The key to look up.
         * @returns The value of the node with the given key, or null if the
         * key doesn't exist.
         */
        get(key) {
            let cmp;
            let node = this.root_;
            while (!node.isEmpty()) {
                cmp = this.comparator_(key, node.key);
                if (cmp === 0) {
                    return node.value;
                }
                else if (cmp < 0) {
                    node = node.left;
                }
                else if (cmp > 0) {
                    node = node.right;
                }
            }
            return null;
        }
        /**
         * Returns the key of the item *before* the specified key, or null if key is the first item.
         * @param key - The key to find the predecessor of
         * @returns The predecessor key.
         */
        getPredecessorKey(key) {
            let cmp, node = this.root_, rightParent = null;
            while (!node.isEmpty()) {
                cmp = this.comparator_(key, node.key);
                if (cmp === 0) {
                    if (!node.left.isEmpty()) {
                        node = node.left;
                        while (!node.right.isEmpty()) {
                            node = node.right;
                        }
                        return node.key;
                    }
                    else if (rightParent) {
                        return rightParent.key;
                    }
                    else {
                        return null; // first item.
                    }
                }
                else if (cmp < 0) {
                    node = node.left;
                }
                else if (cmp > 0) {
                    rightParent = node;
                    node = node.right;
                }
            }
            throw new Error('Attempted to find predecessor key for a nonexistent key.  What gives?');
        }
        /**
         * @returns True if the map is empty.
         */
        isEmpty() {
            return this.root_.isEmpty();
        }
        /**
         * @returns The total number of nodes in the map.
         */
        count() {
            return this.root_.count();
        }
        /**
         * @returns The minimum key in the map.
         */
        minKey() {
            return this.root_.minKey();
        }
        /**
         * @returns The maximum key in the map.
         */
        maxKey() {
            return this.root_.maxKey();
        }
        /**
         * Traverses the map in key order and calls the specified action function
         * for each key/value pair.
         *
         * @param action - Callback function to be called
         * for each key/value pair.  If action returns true, traversal is aborted.
         * @returns The first truthy value returned by action, or the last falsey
         *   value returned by action
         */
        inorderTraversal(action) {
            return this.root_.inorderTraversal(action);
        }
        /**
         * Traverses the map in reverse key order and calls the specified action function
         * for each key/value pair.
         *
         * @param action - Callback function to be called
         * for each key/value pair.  If action returns true, traversal is aborted.
         * @returns True if the traversal was aborted.
         */
        reverseTraversal(action) {
            return this.root_.reverseTraversal(action);
        }
        /**
         * Returns an iterator over the SortedMap.
         * @returns The iterator.
         */
        getIterator(resultGenerator) {
            return new SortedMapIterator(this.root_, null, this.comparator_, false, resultGenerator);
        }
        getIteratorFrom(key, resultGenerator) {
            return new SortedMapIterator(this.root_, key, this.comparator_, false, resultGenerator);
        }
        getReverseIteratorFrom(key, resultGenerator) {
            return new SortedMapIterator(this.root_, key, this.comparator_, true, resultGenerator);
        }
        getReverseIterator(resultGenerator) {
            return new SortedMapIterator(this.root_, null, this.comparator_, true, resultGenerator);
        }
    }
    /**
     * Always use the same empty node, to reduce memory.
     */
    SortedMap.EMPTY_NODE = new LLRBEmptyNode();

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    function NAME_ONLY_COMPARATOR(left, right) {
        return nameCompare(left.name, right.name);
    }
    function NAME_COMPARATOR(left, right) {
        return nameCompare(left, right);
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    let MAX_NODE$2;
    function setMaxNode$1(val) {
        MAX_NODE$2 = val;
    }
    const priorityHashText = function (priority) {
        if (typeof priority === 'number') {
            return 'number:' + doubleToIEEE754String(priority);
        }
        else {
            return 'string:' + priority;
        }
    };
    /**
     * Validates that a priority snapshot Node is valid.
     */
    const validatePriorityNode = function (priorityNode) {
        if (priorityNode.isLeafNode()) {
            const val = priorityNode.val();
            assert(typeof val === 'string' ||
                typeof val === 'number' ||
                (typeof val === 'object' && contains$1(val, '.sv')), 'Priority must be a string or number.');
        }
        else {
            assert(priorityNode === MAX_NODE$2 || priorityNode.isEmpty(), 'priority of unexpected type.');
        }
        // Don't call getPriority() on MAX_NODE to avoid hitting assertion.
        assert(priorityNode === MAX_NODE$2 || priorityNode.getPriority().isEmpty(), "Priority nodes can't have a priority of their own.");
    };

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    let __childrenNodeConstructor;
    /**
     * LeafNode is a class for storing leaf nodes in a DataSnapshot.  It
     * implements Node and stores the value of the node (a string,
     * number, or boolean) accessible via getValue().
     */
    class LeafNode {
        /**
         * @param value_ - The value to store in this leaf node. The object type is
         * possible in the event of a deferred value
         * @param priorityNode_ - The priority of this node.
         */
        constructor(value_, priorityNode_ = LeafNode.__childrenNodeConstructor.EMPTY_NODE) {
            this.value_ = value_;
            this.priorityNode_ = priorityNode_;
            this.lazyHash_ = null;
            assert(this.value_ !== undefined && this.value_ !== null, "LeafNode shouldn't be created with null/undefined value.");
            validatePriorityNode(this.priorityNode_);
        }
        static set __childrenNodeConstructor(val) {
            __childrenNodeConstructor = val;
        }
        static get __childrenNodeConstructor() {
            return __childrenNodeConstructor;
        }
        /** @inheritDoc */
        isLeafNode() {
            return true;
        }
        /** @inheritDoc */
        getPriority() {
            return this.priorityNode_;
        }
        /** @inheritDoc */
        updatePriority(newPriorityNode) {
            return new LeafNode(this.value_, newPriorityNode);
        }
        /** @inheritDoc */
        getImmediateChild(childName) {
            // Hack to treat priority as a regular child
            if (childName === '.priority') {
                return this.priorityNode_;
            }
            else {
                return LeafNode.__childrenNodeConstructor.EMPTY_NODE;
            }
        }
        /** @inheritDoc */
        getChild(path) {
            if (pathIsEmpty(path)) {
                return this;
            }
            else if (pathGetFront(path) === '.priority') {
                return this.priorityNode_;
            }
            else {
                return LeafNode.__childrenNodeConstructor.EMPTY_NODE;
            }
        }
        hasChild() {
            return false;
        }
        /** @inheritDoc */
        getPredecessorChildName(childName, childNode) {
            return null;
        }
        /** @inheritDoc */
        updateImmediateChild(childName, newChildNode) {
            if (childName === '.priority') {
                return this.updatePriority(newChildNode);
            }
            else if (newChildNode.isEmpty() && childName !== '.priority') {
                return this;
            }
            else {
                return LeafNode.__childrenNodeConstructor.EMPTY_NODE.updateImmediateChild(childName, newChildNode).updatePriority(this.priorityNode_);
            }
        }
        /** @inheritDoc */
        updateChild(path, newChildNode) {
            const front = pathGetFront(path);
            if (front === null) {
                return newChildNode;
            }
            else if (newChildNode.isEmpty() && front !== '.priority') {
                return this;
            }
            else {
                assert(front !== '.priority' || pathGetLength(path) === 1, '.priority must be the last token in a path');
                return this.updateImmediateChild(front, LeafNode.__childrenNodeConstructor.EMPTY_NODE.updateChild(pathPopFront(path), newChildNode));
            }
        }
        /** @inheritDoc */
        isEmpty() {
            return false;
        }
        /** @inheritDoc */
        numChildren() {
            return 0;
        }
        /** @inheritDoc */
        forEachChild(index, action) {
            return false;
        }
        val(exportFormat) {
            if (exportFormat && !this.getPriority().isEmpty()) {
                return {
                    '.value': this.getValue(),
                    '.priority': this.getPriority().val()
                };
            }
            else {
                return this.getValue();
            }
        }
        /** @inheritDoc */
        hash() {
            if (this.lazyHash_ === null) {
                let toHash = '';
                if (!this.priorityNode_.isEmpty()) {
                    toHash +=
                        'priority:' +
                            priorityHashText(this.priorityNode_.val()) +
                            ':';
                }
                const type = typeof this.value_;
                toHash += type + ':';
                if (type === 'number') {
                    toHash += doubleToIEEE754String(this.value_);
                }
                else {
                    toHash += this.value_;
                }
                this.lazyHash_ = sha1(toHash);
            }
            return this.lazyHash_;
        }
        /**
         * Returns the value of the leaf node.
         * @returns The value of the node.
         */
        getValue() {
            return this.value_;
        }
        compareTo(other) {
            if (other === LeafNode.__childrenNodeConstructor.EMPTY_NODE) {
                return 1;
            }
            else if (other instanceof LeafNode.__childrenNodeConstructor) {
                return -1;
            }
            else {
                assert(other.isLeafNode(), 'Unknown node type');
                return this.compareToLeafNode_(other);
            }
        }
        /**
         * Comparison specifically for two leaf nodes
         */
        compareToLeafNode_(otherLeaf) {
            const otherLeafType = typeof otherLeaf.value_;
            const thisLeafType = typeof this.value_;
            const otherIndex = LeafNode.VALUE_TYPE_ORDER.indexOf(otherLeafType);
            const thisIndex = LeafNode.VALUE_TYPE_ORDER.indexOf(thisLeafType);
            assert(otherIndex >= 0, 'Unknown leaf type: ' + otherLeafType);
            assert(thisIndex >= 0, 'Unknown leaf type: ' + thisLeafType);
            if (otherIndex === thisIndex) {
                // Same type, compare values
                if (thisLeafType === 'object') {
                    // Deferred value nodes are all equal, but we should also never get to this point...
                    return 0;
                }
                else {
                    // Note that this works because true > false, all others are number or string comparisons
                    if (this.value_ < otherLeaf.value_) {
                        return -1;
                    }
                    else if (this.value_ === otherLeaf.value_) {
                        return 0;
                    }
                    else {
                        return 1;
                    }
                }
            }
            else {
                return thisIndex - otherIndex;
            }
        }
        withIndex() {
            return this;
        }
        isIndexed() {
            return true;
        }
        equals(other) {
            if (other === this) {
                return true;
            }
            else if (other.isLeafNode()) {
                const otherLeaf = other;
                return (this.value_ === otherLeaf.value_ &&
                    this.priorityNode_.equals(otherLeaf.priorityNode_));
            }
            else {
                return false;
            }
        }
    }
    /**
     * The sort order for comparing leaf nodes of different types. If two leaf nodes have
     * the same type, the comparison falls back to their value
     */
    LeafNode.VALUE_TYPE_ORDER = ['object', 'boolean', 'number', 'string'];

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    let nodeFromJSON$1;
    let MAX_NODE$1;
    function setNodeFromJSON(val) {
        nodeFromJSON$1 = val;
    }
    function setMaxNode(val) {
        MAX_NODE$1 = val;
    }
    class PriorityIndex extends Index {
        compare(a, b) {
            const aPriority = a.node.getPriority();
            const bPriority = b.node.getPriority();
            const indexCmp = aPriority.compareTo(bPriority);
            if (indexCmp === 0) {
                return nameCompare(a.name, b.name);
            }
            else {
                return indexCmp;
            }
        }
        isDefinedOn(node) {
            return !node.getPriority().isEmpty();
        }
        indexedValueChanged(oldNode, newNode) {
            return !oldNode.getPriority().equals(newNode.getPriority());
        }
        minPost() {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            return NamedNode.MIN;
        }
        maxPost() {
            return new NamedNode(MAX_NAME, new LeafNode('[PRIORITY-POST]', MAX_NODE$1));
        }
        makePost(indexValue, name) {
            const priorityNode = nodeFromJSON$1(indexValue);
            return new NamedNode(name, new LeafNode('[PRIORITY-POST]', priorityNode));
        }
        /**
         * @returns String representation for inclusion in a query spec
         */
        toString() {
            return '.priority';
        }
    }
    const PRIORITY_INDEX = new PriorityIndex();

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    const LOG_2 = Math.log(2);
    class Base12Num {
        constructor(length) {
            const logBase2 = (num) => 
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            parseInt((Math.log(num) / LOG_2), 10);
            const bitMask = (bits) => parseInt(Array(bits + 1).join('1'), 2);
            this.count = logBase2(length + 1);
            this.current_ = this.count - 1;
            const mask = bitMask(this.count);
            this.bits_ = (length + 1) & mask;
        }
        nextBitIsOne() {
            //noinspection JSBitwiseOperatorUsage
            const result = !(this.bits_ & (0x1 << this.current_));
            this.current_--;
            return result;
        }
    }
    /**
     * Takes a list of child nodes and constructs a SortedSet using the given comparison
     * function
     *
     * Uses the algorithm described in the paper linked here:
     * http://citeseerx.ist.psu.edu/viewdoc/summary?doi=10.1.1.46.1458
     *
     * @param childList - Unsorted list of children
     * @param cmp - The comparison method to be used
     * @param keyFn - An optional function to extract K from a node wrapper, if K's
     * type is not NamedNode
     * @param mapSortFn - An optional override for comparator used by the generated sorted map
     */
    const buildChildSet = function (childList, cmp, keyFn, mapSortFn) {
        childList.sort(cmp);
        const buildBalancedTree = function (low, high) {
            const length = high - low;
            let namedNode;
            let key;
            if (length === 0) {
                return null;
            }
            else if (length === 1) {
                namedNode = childList[low];
                key = keyFn ? keyFn(namedNode) : namedNode;
                return new LLRBNode(key, namedNode.node, LLRBNode.BLACK, null, null);
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const middle = parseInt((length / 2), 10) + low;
                const left = buildBalancedTree(low, middle);
                const right = buildBalancedTree(middle + 1, high);
                namedNode = childList[middle];
                key = keyFn ? keyFn(namedNode) : namedNode;
                return new LLRBNode(key, namedNode.node, LLRBNode.BLACK, left, right);
            }
        };
        const buildFrom12Array = function (base12) {
            let node = null;
            let root = null;
            let index = childList.length;
            const buildPennant = function (chunkSize, color) {
                const low = index - chunkSize;
                const high = index;
                index -= chunkSize;
                const childTree = buildBalancedTree(low + 1, high);
                const namedNode = childList[low];
                const key = keyFn ? keyFn(namedNode) : namedNode;
                attachPennant(new LLRBNode(key, namedNode.node, color, null, childTree));
            };
            const attachPennant = function (pennant) {
                if (node) {
                    node.left = pennant;
                    node = pennant;
                }
                else {
                    root = pennant;
                    node = pennant;
                }
            };
            for (let i = 0; i < base12.count; ++i) {
                const isOne = base12.nextBitIsOne();
                // The number of nodes taken in each slice is 2^(arr.length - (i + 1))
                const chunkSize = Math.pow(2, base12.count - (i + 1));
                if (isOne) {
                    buildPennant(chunkSize, LLRBNode.BLACK);
                }
                else {
                    // current == 2
                    buildPennant(chunkSize, LLRBNode.BLACK);
                    buildPennant(chunkSize, LLRBNode.RED);
                }
            }
            return root;
        };
        const base12 = new Base12Num(childList.length);
        const root = buildFrom12Array(base12);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return new SortedMap(mapSortFn || cmp, root);
    };

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    let _defaultIndexMap;
    const fallbackObject = {};
    class IndexMap {
        constructor(indexes_, indexSet_) {
            this.indexes_ = indexes_;
            this.indexSet_ = indexSet_;
        }
        /**
         * The default IndexMap for nodes without a priority
         */
        static get Default() {
            assert(fallbackObject && PRIORITY_INDEX, 'ChildrenNode.ts has not been loaded');
            _defaultIndexMap =
                _defaultIndexMap ||
                    new IndexMap({ '.priority': fallbackObject }, { '.priority': PRIORITY_INDEX });
            return _defaultIndexMap;
        }
        get(indexKey) {
            const sortedMap = safeGet(this.indexes_, indexKey);
            if (!sortedMap) {
                throw new Error('No index defined for ' + indexKey);
            }
            if (sortedMap instanceof SortedMap) {
                return sortedMap;
            }
            else {
                // The index exists, but it falls back to just name comparison. Return null so that the calling code uses the
                // regular child map
                return null;
            }
        }
        hasIndex(indexDefinition) {
            return contains$1(this.indexSet_, indexDefinition.toString());
        }
        addIndex(indexDefinition, existingChildren) {
            assert(indexDefinition !== KEY_INDEX, "KeyIndex always exists and isn't meant to be added to the IndexMap.");
            const childList = [];
            let sawIndexedValue = false;
            const iter = existingChildren.getIterator(NamedNode.Wrap);
            let next = iter.getNext();
            while (next) {
                sawIndexedValue =
                    sawIndexedValue || indexDefinition.isDefinedOn(next.node);
                childList.push(next);
                next = iter.getNext();
            }
            let newIndex;
            if (sawIndexedValue) {
                newIndex = buildChildSet(childList, indexDefinition.getCompare());
            }
            else {
                newIndex = fallbackObject;
            }
            const indexName = indexDefinition.toString();
            const newIndexSet = Object.assign({}, this.indexSet_);
            newIndexSet[indexName] = indexDefinition;
            const newIndexes = Object.assign({}, this.indexes_);
            newIndexes[indexName] = newIndex;
            return new IndexMap(newIndexes, newIndexSet);
        }
        /**
         * Ensure that this node is properly tracked in any indexes that we're maintaining
         */
        addToIndexes(namedNode, existingChildren) {
            const newIndexes = map$1(this.indexes_, (indexedChildren, indexName) => {
                const index = safeGet(this.indexSet_, indexName);
                assert(index, 'Missing index implementation for ' + indexName);
                if (indexedChildren === fallbackObject) {
                    // Check to see if we need to index everything
                    if (index.isDefinedOn(namedNode.node)) {
                        // We need to build this index
                        const childList = [];
                        const iter = existingChildren.getIterator(NamedNode.Wrap);
                        let next = iter.getNext();
                        while (next) {
                            if (next.name !== namedNode.name) {
                                childList.push(next);
                            }
                            next = iter.getNext();
                        }
                        childList.push(namedNode);
                        return buildChildSet(childList, index.getCompare());
                    }
                    else {
                        // No change, this remains a fallback
                        return fallbackObject;
                    }
                }
                else {
                    const existingSnap = existingChildren.get(namedNode.name);
                    let newChildren = indexedChildren;
                    if (existingSnap) {
                        newChildren = newChildren.remove(new NamedNode(namedNode.name, existingSnap));
                    }
                    return newChildren.insert(namedNode, namedNode.node);
                }
            });
            return new IndexMap(newIndexes, this.indexSet_);
        }
        /**
         * Create a new IndexMap instance with the given value removed
         */
        removeFromIndexes(namedNode, existingChildren) {
            const newIndexes = map$1(this.indexes_, (indexedChildren) => {
                if (indexedChildren === fallbackObject) {
                    // This is the fallback. Just return it, nothing to do in this case
                    return indexedChildren;
                }
                else {
                    const existingSnap = existingChildren.get(namedNode.name);
                    if (existingSnap) {
                        return indexedChildren.remove(new NamedNode(namedNode.name, existingSnap));
                    }
                    else {
                        // No record of this child
                        return indexedChildren;
                    }
                }
            });
            return new IndexMap(newIndexes, this.indexSet_);
        }
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    // TODO: For memory savings, don't store priorityNode_ if it's empty.
    let EMPTY_NODE;
    /**
     * ChildrenNode is a class for storing internal nodes in a DataSnapshot
     * (i.e. nodes with children).  It implements Node and stores the
     * list of children in the children property, sorted by child name.
     */
    class ChildrenNode {
        /**
         * @param children_ - List of children of this node..
         * @param priorityNode_ - The priority of this node (as a snapshot node).
         */
        constructor(children_, priorityNode_, indexMap_) {
            this.children_ = children_;
            this.priorityNode_ = priorityNode_;
            this.indexMap_ = indexMap_;
            this.lazyHash_ = null;
            /**
             * Note: The only reason we allow null priority is for EMPTY_NODE, since we can't use
             * EMPTY_NODE as the priority of EMPTY_NODE.  We might want to consider making EMPTY_NODE its own
             * class instead of an empty ChildrenNode.
             */
            if (this.priorityNode_) {
                validatePriorityNode(this.priorityNode_);
            }
            if (this.children_.isEmpty()) {
                assert(!this.priorityNode_ || this.priorityNode_.isEmpty(), 'An empty node cannot have a priority');
            }
        }
        static get EMPTY_NODE() {
            return (EMPTY_NODE ||
                (EMPTY_NODE = new ChildrenNode(new SortedMap(NAME_COMPARATOR), null, IndexMap.Default)));
        }
        /** @inheritDoc */
        isLeafNode() {
            return false;
        }
        /** @inheritDoc */
        getPriority() {
            return this.priorityNode_ || EMPTY_NODE;
        }
        /** @inheritDoc */
        updatePriority(newPriorityNode) {
            if (this.children_.isEmpty()) {
                // Don't allow priorities on empty nodes
                return this;
            }
            else {
                return new ChildrenNode(this.children_, newPriorityNode, this.indexMap_);
            }
        }
        /** @inheritDoc */
        getImmediateChild(childName) {
            // Hack to treat priority as a regular child
            if (childName === '.priority') {
                return this.getPriority();
            }
            else {
                const child = this.children_.get(childName);
                return child === null ? EMPTY_NODE : child;
            }
        }
        /** @inheritDoc */
        getChild(path) {
            const front = pathGetFront(path);
            if (front === null) {
                return this;
            }
            return this.getImmediateChild(front).getChild(pathPopFront(path));
        }
        /** @inheritDoc */
        hasChild(childName) {
            return this.children_.get(childName) !== null;
        }
        /** @inheritDoc */
        updateImmediateChild(childName, newChildNode) {
            assert(newChildNode, 'We should always be passing snapshot nodes');
            if (childName === '.priority') {
                return this.updatePriority(newChildNode);
            }
            else {
                const namedNode = new NamedNode(childName, newChildNode);
                let newChildren, newIndexMap;
                if (newChildNode.isEmpty()) {
                    newChildren = this.children_.remove(childName);
                    newIndexMap = this.indexMap_.removeFromIndexes(namedNode, this.children_);
                }
                else {
                    newChildren = this.children_.insert(childName, newChildNode);
                    newIndexMap = this.indexMap_.addToIndexes(namedNode, this.children_);
                }
                const newPriority = newChildren.isEmpty()
                    ? EMPTY_NODE
                    : this.priorityNode_;
                return new ChildrenNode(newChildren, newPriority, newIndexMap);
            }
        }
        /** @inheritDoc */
        updateChild(path, newChildNode) {
            const front = pathGetFront(path);
            if (front === null) {
                return newChildNode;
            }
            else {
                assert(pathGetFront(path) !== '.priority' || pathGetLength(path) === 1, '.priority must be the last token in a path');
                const newImmediateChild = this.getImmediateChild(front).updateChild(pathPopFront(path), newChildNode);
                return this.updateImmediateChild(front, newImmediateChild);
            }
        }
        /** @inheritDoc */
        isEmpty() {
            return this.children_.isEmpty();
        }
        /** @inheritDoc */
        numChildren() {
            return this.children_.count();
        }
        /** @inheritDoc */
        val(exportFormat) {
            if (this.isEmpty()) {
                return null;
            }
            const obj = {};
            let numKeys = 0, maxKey = 0, allIntegerKeys = true;
            this.forEachChild(PRIORITY_INDEX, (key, childNode) => {
                obj[key] = childNode.val(exportFormat);
                numKeys++;
                if (allIntegerKeys && ChildrenNode.INTEGER_REGEXP_.test(key)) {
                    maxKey = Math.max(maxKey, Number(key));
                }
                else {
                    allIntegerKeys = false;
                }
            });
            if (!exportFormat && allIntegerKeys && maxKey < 2 * numKeys) {
                // convert to array.
                const array = [];
                // eslint-disable-next-line guard-for-in
                for (const key in obj) {
                    array[key] = obj[key];
                }
                return array;
            }
            else {
                if (exportFormat && !this.getPriority().isEmpty()) {
                    obj['.priority'] = this.getPriority().val();
                }
                return obj;
            }
        }
        /** @inheritDoc */
        hash() {
            if (this.lazyHash_ === null) {
                let toHash = '';
                if (!this.getPriority().isEmpty()) {
                    toHash +=
                        'priority:' +
                            priorityHashText(this.getPriority().val()) +
                            ':';
                }
                this.forEachChild(PRIORITY_INDEX, (key, childNode) => {
                    const childHash = childNode.hash();
                    if (childHash !== '') {
                        toHash += ':' + key + ':' + childHash;
                    }
                });
                this.lazyHash_ = toHash === '' ? '' : sha1(toHash);
            }
            return this.lazyHash_;
        }
        /** @inheritDoc */
        getPredecessorChildName(childName, childNode, index) {
            const idx = this.resolveIndex_(index);
            if (idx) {
                const predecessor = idx.getPredecessorKey(new NamedNode(childName, childNode));
                return predecessor ? predecessor.name : null;
            }
            else {
                return this.children_.getPredecessorKey(childName);
            }
        }
        getFirstChildName(indexDefinition) {
            const idx = this.resolveIndex_(indexDefinition);
            if (idx) {
                const minKey = idx.minKey();
                return minKey && minKey.name;
            }
            else {
                return this.children_.minKey();
            }
        }
        getFirstChild(indexDefinition) {
            const minKey = this.getFirstChildName(indexDefinition);
            if (minKey) {
                return new NamedNode(minKey, this.children_.get(minKey));
            }
            else {
                return null;
            }
        }
        /**
         * Given an index, return the key name of the largest value we have, according to that index
         */
        getLastChildName(indexDefinition) {
            const idx = this.resolveIndex_(indexDefinition);
            if (idx) {
                const maxKey = idx.maxKey();
                return maxKey && maxKey.name;
            }
            else {
                return this.children_.maxKey();
            }
        }
        getLastChild(indexDefinition) {
            const maxKey = this.getLastChildName(indexDefinition);
            if (maxKey) {
                return new NamedNode(maxKey, this.children_.get(maxKey));
            }
            else {
                return null;
            }
        }
        forEachChild(index, action) {
            const idx = this.resolveIndex_(index);
            if (idx) {
                return idx.inorderTraversal(wrappedNode => {
                    return action(wrappedNode.name, wrappedNode.node);
                });
            }
            else {
                return this.children_.inorderTraversal(action);
            }
        }
        getIterator(indexDefinition) {
            return this.getIteratorFrom(indexDefinition.minPost(), indexDefinition);
        }
        getIteratorFrom(startPost, indexDefinition) {
            const idx = this.resolveIndex_(indexDefinition);
            if (idx) {
                return idx.getIteratorFrom(startPost, key => key);
            }
            else {
                const iterator = this.children_.getIteratorFrom(startPost.name, NamedNode.Wrap);
                let next = iterator.peek();
                while (next != null && indexDefinition.compare(next, startPost) < 0) {
                    iterator.getNext();
                    next = iterator.peek();
                }
                return iterator;
            }
        }
        getReverseIterator(indexDefinition) {
            return this.getReverseIteratorFrom(indexDefinition.maxPost(), indexDefinition);
        }
        getReverseIteratorFrom(endPost, indexDefinition) {
            const idx = this.resolveIndex_(indexDefinition);
            if (idx) {
                return idx.getReverseIteratorFrom(endPost, key => {
                    return key;
                });
            }
            else {
                const iterator = this.children_.getReverseIteratorFrom(endPost.name, NamedNode.Wrap);
                let next = iterator.peek();
                while (next != null && indexDefinition.compare(next, endPost) > 0) {
                    iterator.getNext();
                    next = iterator.peek();
                }
                return iterator;
            }
        }
        compareTo(other) {
            if (this.isEmpty()) {
                if (other.isEmpty()) {
                    return 0;
                }
                else {
                    return -1;
                }
            }
            else if (other.isLeafNode() || other.isEmpty()) {
                return 1;
            }
            else if (other === MAX_NODE) {
                return -1;
            }
            else {
                // Must be another node with children.
                return 0;
            }
        }
        withIndex(indexDefinition) {
            if (indexDefinition === KEY_INDEX ||
                this.indexMap_.hasIndex(indexDefinition)) {
                return this;
            }
            else {
                const newIndexMap = this.indexMap_.addIndex(indexDefinition, this.children_);
                return new ChildrenNode(this.children_, this.priorityNode_, newIndexMap);
            }
        }
        isIndexed(index) {
            return index === KEY_INDEX || this.indexMap_.hasIndex(index);
        }
        equals(other) {
            if (other === this) {
                return true;
            }
            else if (other.isLeafNode()) {
                return false;
            }
            else {
                const otherChildrenNode = other;
                if (!this.getPriority().equals(otherChildrenNode.getPriority())) {
                    return false;
                }
                else if (this.children_.count() === otherChildrenNode.children_.count()) {
                    const thisIter = this.getIterator(PRIORITY_INDEX);
                    const otherIter = otherChildrenNode.getIterator(PRIORITY_INDEX);
                    let thisCurrent = thisIter.getNext();
                    let otherCurrent = otherIter.getNext();
                    while (thisCurrent && otherCurrent) {
                        if (thisCurrent.name !== otherCurrent.name ||
                            !thisCurrent.node.equals(otherCurrent.node)) {
                            return false;
                        }
                        thisCurrent = thisIter.getNext();
                        otherCurrent = otherIter.getNext();
                    }
                    return thisCurrent === null && otherCurrent === null;
                }
                else {
                    return false;
                }
            }
        }
        /**
         * Returns a SortedMap ordered by index, or null if the default (by-key) ordering can be used
         * instead.
         *
         */
        resolveIndex_(indexDefinition) {
            if (indexDefinition === KEY_INDEX) {
                return null;
            }
            else {
                return this.indexMap_.get(indexDefinition.toString());
            }
        }
    }
    ChildrenNode.INTEGER_REGEXP_ = /^(0|[1-9]\d*)$/;
    class MaxNode extends ChildrenNode {
        constructor() {
            super(new SortedMap(NAME_COMPARATOR), ChildrenNode.EMPTY_NODE, IndexMap.Default);
        }
        compareTo(other) {
            if (other === this) {
                return 0;
            }
            else {
                return 1;
            }
        }
        equals(other) {
            // Not that we every compare it, but MAX_NODE is only ever equal to itself
            return other === this;
        }
        getPriority() {
            return this;
        }
        getImmediateChild(childName) {
            return ChildrenNode.EMPTY_NODE;
        }
        isEmpty() {
            return false;
        }
    }
    /**
     * Marker that will sort higher than any other snapshot.
     */
    const MAX_NODE = new MaxNode();
    Object.defineProperties(NamedNode, {
        MIN: {
            value: new NamedNode(MIN_NAME, ChildrenNode.EMPTY_NODE)
        },
        MAX: {
            value: new NamedNode(MAX_NAME, MAX_NODE)
        }
    });
    /**
     * Reference Extensions
     */
    KeyIndex.__EMPTY_NODE = ChildrenNode.EMPTY_NODE;
    LeafNode.__childrenNodeConstructor = ChildrenNode;
    setMaxNode$1(MAX_NODE);
    setMaxNode(MAX_NODE);

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    const USE_HINZE = true;
    /**
     * Constructs a snapshot node representing the passed JSON and returns it.
     * @param json - JSON to create a node for.
     * @param priority - Optional priority to use.  This will be ignored if the
     * passed JSON contains a .priority property.
     */
    function nodeFromJSON(json, priority = null) {
        if (json === null) {
            return ChildrenNode.EMPTY_NODE;
        }
        if (typeof json === 'object' && '.priority' in json) {
            priority = json['.priority'];
        }
        assert(priority === null ||
            typeof priority === 'string' ||
            typeof priority === 'number' ||
            (typeof priority === 'object' && '.sv' in priority), 'Invalid priority type found: ' + typeof priority);
        if (typeof json === 'object' && '.value' in json && json['.value'] !== null) {
            json = json['.value'];
        }
        // Valid leaf nodes include non-objects or server-value wrapper objects
        if (typeof json !== 'object' || '.sv' in json) {
            const jsonLeaf = json;
            return new LeafNode(jsonLeaf, nodeFromJSON(priority));
        }
        if (!(json instanceof Array) && USE_HINZE) {
            const children = [];
            let childrenHavePriority = false;
            const hinzeJsonObj = json;
            each(hinzeJsonObj, (key, child) => {
                if (key.substring(0, 1) !== '.') {
                    // Ignore metadata nodes
                    const childNode = nodeFromJSON(child);
                    if (!childNode.isEmpty()) {
                        childrenHavePriority =
                            childrenHavePriority || !childNode.getPriority().isEmpty();
                        children.push(new NamedNode(key, childNode));
                    }
                }
            });
            if (children.length === 0) {
                return ChildrenNode.EMPTY_NODE;
            }
            const childSet = buildChildSet(children, NAME_ONLY_COMPARATOR, namedNode => namedNode.name, NAME_COMPARATOR);
            if (childrenHavePriority) {
                const sortedChildSet = buildChildSet(children, PRIORITY_INDEX.getCompare());
                return new ChildrenNode(childSet, nodeFromJSON(priority), new IndexMap({ '.priority': sortedChildSet }, { '.priority': PRIORITY_INDEX }));
            }
            else {
                return new ChildrenNode(childSet, nodeFromJSON(priority), IndexMap.Default);
            }
        }
        else {
            let node = ChildrenNode.EMPTY_NODE;
            each(json, (key, childData) => {
                if (contains$1(json, key)) {
                    if (key.substring(0, 1) !== '.') {
                        // ignore metadata nodes.
                        const childNode = nodeFromJSON(childData);
                        if (childNode.isLeafNode() || !childNode.isEmpty()) {
                            node = node.updateImmediateChild(key, childNode);
                        }
                    }
                }
            });
            return node.updatePriority(nodeFromJSON(priority));
        }
    }
    setNodeFromJSON(nodeFromJSON);

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    class PathIndex extends Index {
        constructor(indexPath_) {
            super();
            this.indexPath_ = indexPath_;
            assert(!pathIsEmpty(indexPath_) && pathGetFront(indexPath_) !== '.priority', "Can't create PathIndex with empty path or .priority key");
        }
        extractChild(snap) {
            return snap.getChild(this.indexPath_);
        }
        isDefinedOn(node) {
            return !node.getChild(this.indexPath_).isEmpty();
        }
        compare(a, b) {
            const aChild = this.extractChild(a.node);
            const bChild = this.extractChild(b.node);
            const indexCmp = aChild.compareTo(bChild);
            if (indexCmp === 0) {
                return nameCompare(a.name, b.name);
            }
            else {
                return indexCmp;
            }
        }
        makePost(indexValue, name) {
            const valueNode = nodeFromJSON(indexValue);
            const node = ChildrenNode.EMPTY_NODE.updateChild(this.indexPath_, valueNode);
            return new NamedNode(name, node);
        }
        maxPost() {
            const node = ChildrenNode.EMPTY_NODE.updateChild(this.indexPath_, MAX_NODE);
            return new NamedNode(MAX_NAME, node);
        }
        toString() {
            return pathSlice(this.indexPath_, 0).join('/');
        }
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    class ValueIndex extends Index {
        compare(a, b) {
            const indexCmp = a.node.compareTo(b.node);
            if (indexCmp === 0) {
                return nameCompare(a.name, b.name);
            }
            else {
                return indexCmp;
            }
        }
        isDefinedOn(node) {
            return true;
        }
        indexedValueChanged(oldNode, newNode) {
            return !oldNode.equals(newNode);
        }
        minPost() {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            return NamedNode.MIN;
        }
        maxPost() {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            return NamedNode.MAX;
        }
        makePost(indexValue, name) {
            const valueNode = nodeFromJSON(indexValue);
            return new NamedNode(name, valueNode);
        }
        /**
         * @returns String representation for inclusion in a query spec
         */
        toString() {
            return '.value';
        }
    }
    const VALUE_INDEX = new ValueIndex();

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    // Modeled after base64 web-safe chars, but ordered by ASCII.
    const PUSH_CHARS = '-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz';
    /**
     * Fancy ID generator that creates 20-character string identifiers with the
     * following properties:
     *
     * 1. They're based on timestamp so that they sort *after* any existing ids.
     * 2. They contain 72-bits of random data after the timestamp so that IDs won't
     *    collide with other clients' IDs.
     * 3. They sort *lexicographically* (so the timestamp is converted to characters
     *    that will sort properly).
     * 4. They're monotonically increasing. Even if you generate more than one in
     *    the same timestamp, the latter ones will sort after the former ones. We do
     *    this by using the previous random bits but "incrementing" them by 1 (only
     *    in the case of a timestamp collision).
     */
    const nextPushId = (function () {
        // Timestamp of last push, used to prevent local collisions if you push twice
        // in one ms.
        let lastPushTime = 0;
        // We generate 72-bits of randomness which get turned into 12 characters and
        // appended to the timestamp to prevent collisions with other clients. We
        // store the last characters we generated because in the event of a collision,
        // we'll use those same characters except "incremented" by one.
        const lastRandChars = [];
        return function (now) {
            const duplicateTime = now === lastPushTime;
            lastPushTime = now;
            let i;
            const timeStampChars = new Array(8);
            for (i = 7; i >= 0; i--) {
                timeStampChars[i] = PUSH_CHARS.charAt(now % 64);
                // NOTE: Can't use << here because javascript will convert to int and lose
                // the upper bits.
                now = Math.floor(now / 64);
            }
            assert(now === 0, 'Cannot push at time == 0');
            let id = timeStampChars.join('');
            if (!duplicateTime) {
                for (i = 0; i < 12; i++) {
                    lastRandChars[i] = Math.floor(Math.random() * 64);
                }
            }
            else {
                // If the timestamp hasn't changed since last push, use the same random
                // number, except incremented by 1.
                for (i = 11; i >= 0 && lastRandChars[i] === 63; i--) {
                    lastRandChars[i] = 0;
                }
                lastRandChars[i]++;
            }
            for (i = 0; i < 12; i++) {
                id += PUSH_CHARS.charAt(lastRandChars[i]);
            }
            assert(id.length === 20, 'nextPushId: Length should be 20.');
            return id;
        };
    })();

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    function changeValue(snapshotNode) {
        return { type: "value" /* VALUE */, snapshotNode };
    }
    function changeChildAdded(childName, snapshotNode) {
        return { type: "child_added" /* CHILD_ADDED */, snapshotNode, childName };
    }
    function changeChildRemoved(childName, snapshotNode) {
        return { type: "child_removed" /* CHILD_REMOVED */, snapshotNode, childName };
    }
    function changeChildChanged(childName, snapshotNode, oldSnap) {
        return {
            type: "child_changed" /* CHILD_CHANGED */,
            snapshotNode,
            childName,
            oldSnap
        };
    }
    function changeChildMoved(childName, snapshotNode) {
        return { type: "child_moved" /* CHILD_MOVED */, snapshotNode, childName };
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * Doesn't really filter nodes but applies an index to the node and keeps track of any changes
     */
    class IndexedFilter {
        constructor(index_) {
            this.index_ = index_;
        }
        updateChild(snap, key, newChild, affectedPath, source, optChangeAccumulator) {
            assert(snap.isIndexed(this.index_), 'A node must be indexed if only a child is updated');
            const oldChild = snap.getImmediateChild(key);
            // Check if anything actually changed.
            if (oldChild.getChild(affectedPath).equals(newChild.getChild(affectedPath))) {
                // There's an edge case where a child can enter or leave the view because affectedPath was set to null.
                // In this case, affectedPath will appear null in both the old and new snapshots.  So we need
                // to avoid treating these cases as "nothing changed."
                if (oldChild.isEmpty() === newChild.isEmpty()) {
                    // Nothing changed.
                    // This assert should be valid, but it's expensive (can dominate perf testing) so don't actually do it.
                    //assert(oldChild.equals(newChild), 'Old and new snapshots should be equal.');
                    return snap;
                }
            }
            if (optChangeAccumulator != null) {
                if (newChild.isEmpty()) {
                    if (snap.hasChild(key)) {
                        optChangeAccumulator.trackChildChange(changeChildRemoved(key, oldChild));
                    }
                    else {
                        assert(snap.isLeafNode(), 'A child remove without an old child only makes sense on a leaf node');
                    }
                }
                else if (oldChild.isEmpty()) {
                    optChangeAccumulator.trackChildChange(changeChildAdded(key, newChild));
                }
                else {
                    optChangeAccumulator.trackChildChange(changeChildChanged(key, newChild, oldChild));
                }
            }
            if (snap.isLeafNode() && newChild.isEmpty()) {
                return snap;
            }
            else {
                // Make sure the node is indexed
                return snap.updateImmediateChild(key, newChild).withIndex(this.index_);
            }
        }
        updateFullNode(oldSnap, newSnap, optChangeAccumulator) {
            if (optChangeAccumulator != null) {
                if (!oldSnap.isLeafNode()) {
                    oldSnap.forEachChild(PRIORITY_INDEX, (key, childNode) => {
                        if (!newSnap.hasChild(key)) {
                            optChangeAccumulator.trackChildChange(changeChildRemoved(key, childNode));
                        }
                    });
                }
                if (!newSnap.isLeafNode()) {
                    newSnap.forEachChild(PRIORITY_INDEX, (key, childNode) => {
                        if (oldSnap.hasChild(key)) {
                            const oldChild = oldSnap.getImmediateChild(key);
                            if (!oldChild.equals(childNode)) {
                                optChangeAccumulator.trackChildChange(changeChildChanged(key, childNode, oldChild));
                            }
                        }
                        else {
                            optChangeAccumulator.trackChildChange(changeChildAdded(key, childNode));
                        }
                    });
                }
            }
            return newSnap.withIndex(this.index_);
        }
        updatePriority(oldSnap, newPriority) {
            if (oldSnap.isEmpty()) {
                return ChildrenNode.EMPTY_NODE;
            }
            else {
                return oldSnap.updatePriority(newPriority);
            }
        }
        filtersNodes() {
            return false;
        }
        getIndexedFilter() {
            return this;
        }
        getIndex() {
            return this.index_;
        }
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * Filters nodes by range and uses an IndexFilter to track any changes after filtering the node
     */
    class RangedFilter {
        constructor(params) {
            this.indexedFilter_ = new IndexedFilter(params.getIndex());
            this.index_ = params.getIndex();
            this.startPost_ = RangedFilter.getStartPost_(params);
            this.endPost_ = RangedFilter.getEndPost_(params);
        }
        getStartPost() {
            return this.startPost_;
        }
        getEndPost() {
            return this.endPost_;
        }
        matches(node) {
            return (this.index_.compare(this.getStartPost(), node) <= 0 &&
                this.index_.compare(node, this.getEndPost()) <= 0);
        }
        updateChild(snap, key, newChild, affectedPath, source, optChangeAccumulator) {
            if (!this.matches(new NamedNode(key, newChild))) {
                newChild = ChildrenNode.EMPTY_NODE;
            }
            return this.indexedFilter_.updateChild(snap, key, newChild, affectedPath, source, optChangeAccumulator);
        }
        updateFullNode(oldSnap, newSnap, optChangeAccumulator) {
            if (newSnap.isLeafNode()) {
                // Make sure we have a children node with the correct index, not a leaf node;
                newSnap = ChildrenNode.EMPTY_NODE;
            }
            let filtered = newSnap.withIndex(this.index_);
            // Don't support priorities on queries
            filtered = filtered.updatePriority(ChildrenNode.EMPTY_NODE);
            const self = this;
            newSnap.forEachChild(PRIORITY_INDEX, (key, childNode) => {
                if (!self.matches(new NamedNode(key, childNode))) {
                    filtered = filtered.updateImmediateChild(key, ChildrenNode.EMPTY_NODE);
                }
            });
            return this.indexedFilter_.updateFullNode(oldSnap, filtered, optChangeAccumulator);
        }
        updatePriority(oldSnap, newPriority) {
            // Don't support priorities on queries
            return oldSnap;
        }
        filtersNodes() {
            return true;
        }
        getIndexedFilter() {
            return this.indexedFilter_;
        }
        getIndex() {
            return this.index_;
        }
        static getStartPost_(params) {
            if (params.hasStart()) {
                const startName = params.getIndexStartName();
                return params.getIndex().makePost(params.getIndexStartValue(), startName);
            }
            else {
                return params.getIndex().minPost();
            }
        }
        static getEndPost_(params) {
            if (params.hasEnd()) {
                const endName = params.getIndexEndName();
                return params.getIndex().makePost(params.getIndexEndValue(), endName);
            }
            else {
                return params.getIndex().maxPost();
            }
        }
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * Applies a limit and a range to a node and uses RangedFilter to do the heavy lifting where possible
     */
    class LimitedFilter {
        constructor(params) {
            this.rangedFilter_ = new RangedFilter(params);
            this.index_ = params.getIndex();
            this.limit_ = params.getLimit();
            this.reverse_ = !params.isViewFromLeft();
        }
        updateChild(snap, key, newChild, affectedPath, source, optChangeAccumulator) {
            if (!this.rangedFilter_.matches(new NamedNode(key, newChild))) {
                newChild = ChildrenNode.EMPTY_NODE;
            }
            if (snap.getImmediateChild(key).equals(newChild)) {
                // No change
                return snap;
            }
            else if (snap.numChildren() < this.limit_) {
                return this.rangedFilter_
                    .getIndexedFilter()
                    .updateChild(snap, key, newChild, affectedPath, source, optChangeAccumulator);
            }
            else {
                return this.fullLimitUpdateChild_(snap, key, newChild, source, optChangeAccumulator);
            }
        }
        updateFullNode(oldSnap, newSnap, optChangeAccumulator) {
            let filtered;
            if (newSnap.isLeafNode() || newSnap.isEmpty()) {
                // Make sure we have a children node with the correct index, not a leaf node;
                filtered = ChildrenNode.EMPTY_NODE.withIndex(this.index_);
            }
            else {
                if (this.limit_ * 2 < newSnap.numChildren() &&
                    newSnap.isIndexed(this.index_)) {
                    // Easier to build up a snapshot, since what we're given has more than twice the elements we want
                    filtered = ChildrenNode.EMPTY_NODE.withIndex(this.index_);
                    // anchor to the startPost, endPost, or last element as appropriate
                    let iterator;
                    if (this.reverse_) {
                        iterator = newSnap.getReverseIteratorFrom(this.rangedFilter_.getEndPost(), this.index_);
                    }
                    else {
                        iterator = newSnap.getIteratorFrom(this.rangedFilter_.getStartPost(), this.index_);
                    }
                    let count = 0;
                    while (iterator.hasNext() && count < this.limit_) {
                        const next = iterator.getNext();
                        let inRange;
                        if (this.reverse_) {
                            inRange =
                                this.index_.compare(this.rangedFilter_.getStartPost(), next) <= 0;
                        }
                        else {
                            inRange =
                                this.index_.compare(next, this.rangedFilter_.getEndPost()) <= 0;
                        }
                        if (inRange) {
                            filtered = filtered.updateImmediateChild(next.name, next.node);
                            count++;
                        }
                        else {
                            // if we have reached the end post, we cannot keep adding elemments
                            break;
                        }
                    }
                }
                else {
                    // The snap contains less than twice the limit. Faster to delete from the snap than build up a new one
                    filtered = newSnap.withIndex(this.index_);
                    // Don't support priorities on queries
                    filtered = filtered.updatePriority(ChildrenNode.EMPTY_NODE);
                    let startPost;
                    let endPost;
                    let cmp;
                    let iterator;
                    if (this.reverse_) {
                        iterator = filtered.getReverseIterator(this.index_);
                        startPost = this.rangedFilter_.getEndPost();
                        endPost = this.rangedFilter_.getStartPost();
                        const indexCompare = this.index_.getCompare();
                        cmp = (a, b) => indexCompare(b, a);
                    }
                    else {
                        iterator = filtered.getIterator(this.index_);
                        startPost = this.rangedFilter_.getStartPost();
                        endPost = this.rangedFilter_.getEndPost();
                        cmp = this.index_.getCompare();
                    }
                    let count = 0;
                    let foundStartPost = false;
                    while (iterator.hasNext()) {
                        const next = iterator.getNext();
                        if (!foundStartPost && cmp(startPost, next) <= 0) {
                            // start adding
                            foundStartPost = true;
                        }
                        const inRange = foundStartPost && count < this.limit_ && cmp(next, endPost) <= 0;
                        if (inRange) {
                            count++;
                        }
                        else {
                            filtered = filtered.updateImmediateChild(next.name, ChildrenNode.EMPTY_NODE);
                        }
                    }
                }
            }
            return this.rangedFilter_
                .getIndexedFilter()
                .updateFullNode(oldSnap, filtered, optChangeAccumulator);
        }
        updatePriority(oldSnap, newPriority) {
            // Don't support priorities on queries
            return oldSnap;
        }
        filtersNodes() {
            return true;
        }
        getIndexedFilter() {
            return this.rangedFilter_.getIndexedFilter();
        }
        getIndex() {
            return this.index_;
        }
        fullLimitUpdateChild_(snap, childKey, childSnap, source, changeAccumulator) {
            // TODO: rename all cache stuff etc to general snap terminology
            let cmp;
            if (this.reverse_) {
                const indexCmp = this.index_.getCompare();
                cmp = (a, b) => indexCmp(b, a);
            }
            else {
                cmp = this.index_.getCompare();
            }
            const oldEventCache = snap;
            assert(oldEventCache.numChildren() === this.limit_, '');
            const newChildNamedNode = new NamedNode(childKey, childSnap);
            const windowBoundary = this.reverse_
                ? oldEventCache.getFirstChild(this.index_)
                : oldEventCache.getLastChild(this.index_);
            const inRange = this.rangedFilter_.matches(newChildNamedNode);
            if (oldEventCache.hasChild(childKey)) {
                const oldChildSnap = oldEventCache.getImmediateChild(childKey);
                let nextChild = source.getChildAfterChild(this.index_, windowBoundary, this.reverse_);
                while (nextChild != null &&
                    (nextChild.name === childKey || oldEventCache.hasChild(nextChild.name))) {
                    // There is a weird edge case where a node is updated as part of a merge in the write tree, but hasn't
                    // been applied to the limited filter yet. Ignore this next child which will be updated later in
                    // the limited filter...
                    nextChild = source.getChildAfterChild(this.index_, nextChild, this.reverse_);
                }
                const compareNext = nextChild == null ? 1 : cmp(nextChild, newChildNamedNode);
                const remainsInWindow = inRange && !childSnap.isEmpty() && compareNext >= 0;
                if (remainsInWindow) {
                    if (changeAccumulator != null) {
                        changeAccumulator.trackChildChange(changeChildChanged(childKey, childSnap, oldChildSnap));
                    }
                    return oldEventCache.updateImmediateChild(childKey, childSnap);
                }
                else {
                    if (changeAccumulator != null) {
                        changeAccumulator.trackChildChange(changeChildRemoved(childKey, oldChildSnap));
                    }
                    const newEventCache = oldEventCache.updateImmediateChild(childKey, ChildrenNode.EMPTY_NODE);
                    const nextChildInRange = nextChild != null && this.rangedFilter_.matches(nextChild);
                    if (nextChildInRange) {
                        if (changeAccumulator != null) {
                            changeAccumulator.trackChildChange(changeChildAdded(nextChild.name, nextChild.node));
                        }
                        return newEventCache.updateImmediateChild(nextChild.name, nextChild.node);
                    }
                    else {
                        return newEventCache;
                    }
                }
            }
            else if (childSnap.isEmpty()) {
                // we're deleting a node, but it was not in the window, so ignore it
                return snap;
            }
            else if (inRange) {
                if (cmp(windowBoundary, newChildNamedNode) >= 0) {
                    if (changeAccumulator != null) {
                        changeAccumulator.trackChildChange(changeChildRemoved(windowBoundary.name, windowBoundary.node));
                        changeAccumulator.trackChildChange(changeChildAdded(childKey, childSnap));
                    }
                    return oldEventCache
                        .updateImmediateChild(childKey, childSnap)
                        .updateImmediateChild(windowBoundary.name, ChildrenNode.EMPTY_NODE);
                }
                else {
                    return snap;
                }
            }
            else {
                return snap;
            }
        }
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * This class is an immutable-from-the-public-api struct containing a set of query parameters defining a
     * range to be returned for a particular location. It is assumed that validation of parameters is done at the
     * user-facing API level, so it is not done here.
     *
     * @internal
     */
    class QueryParams {
        constructor() {
            this.limitSet_ = false;
            this.startSet_ = false;
            this.startNameSet_ = false;
            this.startAfterSet_ = false;
            this.endSet_ = false;
            this.endNameSet_ = false;
            this.endBeforeSet_ = false;
            this.limit_ = 0;
            this.viewFrom_ = '';
            this.indexStartValue_ = null;
            this.indexStartName_ = '';
            this.indexEndValue_ = null;
            this.indexEndName_ = '';
            this.index_ = PRIORITY_INDEX;
        }
        hasStart() {
            return this.startSet_;
        }
        hasStartAfter() {
            return this.startAfterSet_;
        }
        hasEndBefore() {
            return this.endBeforeSet_;
        }
        /**
         * @returns True if it would return from left.
         */
        isViewFromLeft() {
            if (this.viewFrom_ === '') {
                // limit(), rather than limitToFirst or limitToLast was called.
                // This means that only one of startSet_ and endSet_ is true. Use them
                // to calculate which side of the view to anchor to. If neither is set,
                // anchor to the end.
                return this.startSet_;
            }
            else {
                return this.viewFrom_ === "l" /* VIEW_FROM_LEFT */;
            }
        }
        /**
         * Only valid to call if hasStart() returns true
         */
        getIndexStartValue() {
            assert(this.startSet_, 'Only valid if start has been set');
            return this.indexStartValue_;
        }
        /**
         * Only valid to call if hasStart() returns true.
         * Returns the starting key name for the range defined by these query parameters
         */
        getIndexStartName() {
            assert(this.startSet_, 'Only valid if start has been set');
            if (this.startNameSet_) {
                return this.indexStartName_;
            }
            else {
                return MIN_NAME;
            }
        }
        hasEnd() {
            return this.endSet_;
        }
        /**
         * Only valid to call if hasEnd() returns true.
         */
        getIndexEndValue() {
            assert(this.endSet_, 'Only valid if end has been set');
            return this.indexEndValue_;
        }
        /**
         * Only valid to call if hasEnd() returns true.
         * Returns the end key name for the range defined by these query parameters
         */
        getIndexEndName() {
            assert(this.endSet_, 'Only valid if end has been set');
            if (this.endNameSet_) {
                return this.indexEndName_;
            }
            else {
                return MAX_NAME;
            }
        }
        hasLimit() {
            return this.limitSet_;
        }
        /**
         * @returns True if a limit has been set and it has been explicitly anchored
         */
        hasAnchoredLimit() {
            return this.limitSet_ && this.viewFrom_ !== '';
        }
        /**
         * Only valid to call if hasLimit() returns true
         */
        getLimit() {
            assert(this.limitSet_, 'Only valid if limit has been set');
            return this.limit_;
        }
        getIndex() {
            return this.index_;
        }
        loadsAllData() {
            return !(this.startSet_ || this.endSet_ || this.limitSet_);
        }
        isDefault() {
            return this.loadsAllData() && this.index_ === PRIORITY_INDEX;
        }
        copy() {
            const copy = new QueryParams();
            copy.limitSet_ = this.limitSet_;
            copy.limit_ = this.limit_;
            copy.startSet_ = this.startSet_;
            copy.indexStartValue_ = this.indexStartValue_;
            copy.startNameSet_ = this.startNameSet_;
            copy.indexStartName_ = this.indexStartName_;
            copy.endSet_ = this.endSet_;
            copy.indexEndValue_ = this.indexEndValue_;
            copy.endNameSet_ = this.endNameSet_;
            copy.indexEndName_ = this.indexEndName_;
            copy.index_ = this.index_;
            copy.viewFrom_ = this.viewFrom_;
            return copy;
        }
    }
    function queryParamsGetNodeFilter(queryParams) {
        if (queryParams.loadsAllData()) {
            return new IndexedFilter(queryParams.getIndex());
        }
        else if (queryParams.hasLimit()) {
            return new LimitedFilter(queryParams);
        }
        else {
            return new RangedFilter(queryParams);
        }
    }
    /**
     * Returns a set of REST query string parameters representing this query.
     *
     * @returns query string parameters
     */
    function queryParamsToRestQueryStringParameters(queryParams) {
        const qs = {};
        if (queryParams.isDefault()) {
            return qs;
        }
        let orderBy;
        if (queryParams.index_ === PRIORITY_INDEX) {
            orderBy = "$priority" /* PRIORITY_INDEX */;
        }
        else if (queryParams.index_ === VALUE_INDEX) {
            orderBy = "$value" /* VALUE_INDEX */;
        }
        else if (queryParams.index_ === KEY_INDEX) {
            orderBy = "$key" /* KEY_INDEX */;
        }
        else {
            assert(queryParams.index_ instanceof PathIndex, 'Unrecognized index type!');
            orderBy = queryParams.index_.toString();
        }
        qs["orderBy" /* ORDER_BY */] = stringify(orderBy);
        if (queryParams.startSet_) {
            qs["startAt" /* START_AT */] = stringify(queryParams.indexStartValue_);
            if (queryParams.startNameSet_) {
                qs["startAt" /* START_AT */] +=
                    ',' + stringify(queryParams.indexStartName_);
            }
        }
        if (queryParams.endSet_) {
            qs["endAt" /* END_AT */] = stringify(queryParams.indexEndValue_);
            if (queryParams.endNameSet_) {
                qs["endAt" /* END_AT */] +=
                    ',' + stringify(queryParams.indexEndName_);
            }
        }
        if (queryParams.limitSet_) {
            if (queryParams.isViewFromLeft()) {
                qs["limitToFirst" /* LIMIT_TO_FIRST */] = queryParams.limit_;
            }
            else {
                qs["limitToLast" /* LIMIT_TO_LAST */] = queryParams.limit_;
            }
        }
        return qs;
    }
    function queryParamsGetQueryObject(queryParams) {
        const obj = {};
        if (queryParams.startSet_) {
            obj["sp" /* INDEX_START_VALUE */] =
                queryParams.indexStartValue_;
            if (queryParams.startNameSet_) {
                obj["sn" /* INDEX_START_NAME */] =
                    queryParams.indexStartName_;
            }
        }
        if (queryParams.endSet_) {
            obj["ep" /* INDEX_END_VALUE */] = queryParams.indexEndValue_;
            if (queryParams.endNameSet_) {
                obj["en" /* INDEX_END_NAME */] = queryParams.indexEndName_;
            }
        }
        if (queryParams.limitSet_) {
            obj["l" /* LIMIT */] = queryParams.limit_;
            let viewFrom = queryParams.viewFrom_;
            if (viewFrom === '') {
                if (queryParams.isViewFromLeft()) {
                    viewFrom = "l" /* VIEW_FROM_LEFT */;
                }
                else {
                    viewFrom = "r" /* VIEW_FROM_RIGHT */;
                }
            }
            obj["vf" /* VIEW_FROM */] = viewFrom;
        }
        // For now, priority index is the default, so we only specify if it's some other index
        if (queryParams.index_ !== PRIORITY_INDEX) {
            obj["i" /* INDEX */] = queryParams.index_.toString();
        }
        return obj;
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * An implementation of ServerActions that communicates with the server via REST requests.
     * This is mostly useful for compatibility with crawlers, where we don't want to spin up a full
     * persistent connection (using WebSockets or long-polling)
     */
    class ReadonlyRestClient extends ServerActions {
        /**
         * @param repoInfo_ - Data about the namespace we are connecting to
         * @param onDataUpdate_ - A callback for new data from the server
         */
        constructor(repoInfo_, onDataUpdate_, authTokenProvider_, appCheckTokenProvider_) {
            super();
            this.repoInfo_ = repoInfo_;
            this.onDataUpdate_ = onDataUpdate_;
            this.authTokenProvider_ = authTokenProvider_;
            this.appCheckTokenProvider_ = appCheckTokenProvider_;
            /** @private {function(...[*])} */
            this.log_ = logWrapper('p:rest:');
            /**
             * We don't actually need to track listens, except to prevent us calling an onComplete for a listen
             * that's been removed. :-/
             */
            this.listens_ = {};
        }
        reportStats(stats) {
            throw new Error('Method not implemented.');
        }
        static getListenId_(query, tag) {
            if (tag !== undefined) {
                return 'tag$' + tag;
            }
            else {
                assert(query._queryParams.isDefault(), "should have a tag if it's not a default query.");
                return query._path.toString();
            }
        }
        /** @inheritDoc */
        listen(query, currentHashFn, tag, onComplete) {
            const pathString = query._path.toString();
            this.log_('Listen called for ' + pathString + ' ' + query._queryIdentifier);
            // Mark this listener so we can tell if it's removed.
            const listenId = ReadonlyRestClient.getListenId_(query, tag);
            const thisListen = {};
            this.listens_[listenId] = thisListen;
            const queryStringParameters = queryParamsToRestQueryStringParameters(query._queryParams);
            this.restRequest_(pathString + '.json', queryStringParameters, (error, result) => {
                let data = result;
                if (error === 404) {
                    data = null;
                    error = null;
                }
                if (error === null) {
                    this.onDataUpdate_(pathString, data, /*isMerge=*/ false, tag);
                }
                if (safeGet(this.listens_, listenId) === thisListen) {
                    let status;
                    if (!error) {
                        status = 'ok';
                    }
                    else if (error === 401) {
                        status = 'permission_denied';
                    }
                    else {
                        status = 'rest_error:' + error;
                    }
                    onComplete(status, null);
                }
            });
        }
        /** @inheritDoc */
        unlisten(query, tag) {
            const listenId = ReadonlyRestClient.getListenId_(query, tag);
            delete this.listens_[listenId];
        }
        get(query) {
            const queryStringParameters = queryParamsToRestQueryStringParameters(query._queryParams);
            const pathString = query._path.toString();
            const deferred = new Deferred();
            this.restRequest_(pathString + '.json', queryStringParameters, (error, result) => {
                let data = result;
                if (error === 404) {
                    data = null;
                    error = null;
                }
                if (error === null) {
                    this.onDataUpdate_(pathString, data, 
                    /*isMerge=*/ false, 
                    /*tag=*/ null);
                    deferred.resolve(data);
                }
                else {
                    deferred.reject(new Error(data));
                }
            });
            return deferred.promise;
        }
        /** @inheritDoc */
        refreshAuthToken(token) {
            // no-op since we just always call getToken.
        }
        /**
         * Performs a REST request to the given path, with the provided query string parameters,
         * and any auth credentials we have.
         */
        restRequest_(pathString, queryStringParameters = {}, callback) {
            queryStringParameters['format'] = 'export';
            return Promise.all([
                this.authTokenProvider_.getToken(/*forceRefresh=*/ false),
                this.appCheckTokenProvider_.getToken(/*forceRefresh=*/ false)
            ]).then(([authToken, appCheckToken]) => {
                if (authToken && authToken.accessToken) {
                    queryStringParameters['auth'] = authToken.accessToken;
                }
                if (appCheckToken && appCheckToken.token) {
                    queryStringParameters['ac'] = appCheckToken.token;
                }
                const url = (this.repoInfo_.secure ? 'https://' : 'http://') +
                    this.repoInfo_.host +
                    pathString +
                    '?' +
                    'ns=' +
                    this.repoInfo_.namespace +
                    querystring(queryStringParameters);
                this.log_('Sending REST request for ' + url);
                const xhr = new XMLHttpRequest();
                xhr.onreadystatechange = () => {
                    if (callback && xhr.readyState === 4) {
                        this.log_('REST Response for ' + url + ' received. status:', xhr.status, 'response:', xhr.responseText);
                        let res = null;
                        if (xhr.status >= 200 && xhr.status < 300) {
                            try {
                                res = jsonEval(xhr.responseText);
                            }
                            catch (e) {
                                warn('Failed to parse JSON response for ' +
                                    url +
                                    ': ' +
                                    xhr.responseText);
                            }
                            callback(null, res);
                        }
                        else {
                            // 401 and 404 are expected.
                            if (xhr.status !== 401 && xhr.status !== 404) {
                                warn('Got unsuccessful REST response for ' +
                                    url +
                                    ' Status: ' +
                                    xhr.status);
                            }
                            callback(xhr.status);
                        }
                        callback = null;
                    }
                };
                xhr.open('GET', url, /*asynchronous=*/ true);
                xhr.send();
            });
        }
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * Mutable object which basically just stores a reference to the "latest" immutable snapshot.
     */
    class SnapshotHolder {
        constructor() {
            this.rootNode_ = ChildrenNode.EMPTY_NODE;
        }
        getNode(path) {
            return this.rootNode_.getChild(path);
        }
        updateSnapshot(path, newSnapshotNode) {
            this.rootNode_ = this.rootNode_.updateChild(path, newSnapshotNode);
        }
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    function newSparseSnapshotTree() {
        return {
            value: null,
            children: new Map()
        };
    }
    /**
     * Stores the given node at the specified path. If there is already a node
     * at a shallower path, it merges the new data into that snapshot node.
     *
     * @param path - Path to look up snapshot for.
     * @param data - The new data, or null.
     */
    function sparseSnapshotTreeRemember(sparseSnapshotTree, path, data) {
        if (pathIsEmpty(path)) {
            sparseSnapshotTree.value = data;
            sparseSnapshotTree.children.clear();
        }
        else if (sparseSnapshotTree.value !== null) {
            sparseSnapshotTree.value = sparseSnapshotTree.value.updateChild(path, data);
        }
        else {
            const childKey = pathGetFront(path);
            if (!sparseSnapshotTree.children.has(childKey)) {
                sparseSnapshotTree.children.set(childKey, newSparseSnapshotTree());
            }
            const child = sparseSnapshotTree.children.get(childKey);
            path = pathPopFront(path);
            sparseSnapshotTreeRemember(child, path, data);
        }
    }
    /**
     * Recursively iterates through all of the stored tree and calls the
     * callback on each one.
     *
     * @param prefixPath - Path to look up node for.
     * @param func - The function to invoke for each tree.
     */
    function sparseSnapshotTreeForEachTree(sparseSnapshotTree, prefixPath, func) {
        if (sparseSnapshotTree.value !== null) {
            func(prefixPath, sparseSnapshotTree.value);
        }
        else {
            sparseSnapshotTreeForEachChild(sparseSnapshotTree, (key, tree) => {
                const path = new Path(prefixPath.toString() + '/' + key);
                sparseSnapshotTreeForEachTree(tree, path, func);
            });
        }
    }
    /**
     * Iterates through each immediate child and triggers the callback.
     * Only seems to be used in tests.
     *
     * @param func - The function to invoke for each child.
     */
    function sparseSnapshotTreeForEachChild(sparseSnapshotTree, func) {
        sparseSnapshotTree.children.forEach((tree, key) => {
            func(key, tree);
        });
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * Returns the delta from the previous call to get stats.
     *
     * @param collection_ - The collection to "listen" to.
     */
    class StatsListener {
        constructor(collection_) {
            this.collection_ = collection_;
            this.last_ = null;
        }
        get() {
            const newStats = this.collection_.get();
            const delta = Object.assign({}, newStats);
            if (this.last_) {
                each(this.last_, (stat, value) => {
                    delta[stat] = delta[stat] - value;
                });
            }
            this.last_ = newStats;
            return delta;
        }
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    // Assuming some apps may have a short amount of time on page, and a bulk of firebase operations probably
    // happen on page load, we try to report our first set of stats pretty quickly, but we wait at least 10
    // seconds to try to ensure the Firebase connection is established / settled.
    const FIRST_STATS_MIN_TIME = 10 * 1000;
    const FIRST_STATS_MAX_TIME = 30 * 1000;
    // We'll continue to report stats on average every 5 minutes.
    const REPORT_STATS_INTERVAL = 5 * 60 * 1000;
    class StatsReporter {
        constructor(collection, server_) {
            this.server_ = server_;
            this.statsToReport_ = {};
            this.statsListener_ = new StatsListener(collection);
            const timeout = FIRST_STATS_MIN_TIME +
                (FIRST_STATS_MAX_TIME - FIRST_STATS_MIN_TIME) * Math.random();
            setTimeoutNonBlocking(this.reportStats_.bind(this), Math.floor(timeout));
        }
        reportStats_() {
            const stats = this.statsListener_.get();
            const reportedStats = {};
            let haveStatsToReport = false;
            each(stats, (stat, value) => {
                if (value > 0 && contains$1(this.statsToReport_, stat)) {
                    reportedStats[stat] = value;
                    haveStatsToReport = true;
                }
            });
            if (haveStatsToReport) {
                this.server_.reportStats(reportedStats);
            }
            // queue our next run.
            setTimeoutNonBlocking(this.reportStats_.bind(this), Math.floor(Math.random() * 2 * REPORT_STATS_INTERVAL));
        }
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     *
     * @enum
     */
    var OperationType;
    (function (OperationType) {
        OperationType[OperationType["OVERWRITE"] = 0] = "OVERWRITE";
        OperationType[OperationType["MERGE"] = 1] = "MERGE";
        OperationType[OperationType["ACK_USER_WRITE"] = 2] = "ACK_USER_WRITE";
        OperationType[OperationType["LISTEN_COMPLETE"] = 3] = "LISTEN_COMPLETE";
    })(OperationType || (OperationType = {}));
    function newOperationSourceUser() {
        return {
            fromUser: true,
            fromServer: false,
            queryId: null,
            tagged: false
        };
    }
    function newOperationSourceServer() {
        return {
            fromUser: false,
            fromServer: true,
            queryId: null,
            tagged: false
        };
    }
    function newOperationSourceServerTaggedQuery(queryId) {
        return {
            fromUser: false,
            fromServer: true,
            queryId,
            tagged: true
        };
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    class AckUserWrite {
        /**
         * @param affectedTree - A tree containing true for each affected path. Affected paths can't overlap.
         */
        constructor(
        /** @inheritDoc */ path, 
        /** @inheritDoc */ affectedTree, 
        /** @inheritDoc */ revert) {
            this.path = path;
            this.affectedTree = affectedTree;
            this.revert = revert;
            /** @inheritDoc */
            this.type = OperationType.ACK_USER_WRITE;
            /** @inheritDoc */
            this.source = newOperationSourceUser();
        }
        operationForChild(childName) {
            if (!pathIsEmpty(this.path)) {
                assert(pathGetFront(this.path) === childName, 'operationForChild called for unrelated child.');
                return new AckUserWrite(pathPopFront(this.path), this.affectedTree, this.revert);
            }
            else if (this.affectedTree.value != null) {
                assert(this.affectedTree.children.isEmpty(), 'affectedTree should not have overlapping affected paths.');
                // All child locations are affected as well; just return same operation.
                return this;
            }
            else {
                const childTree = this.affectedTree.subtree(new Path(childName));
                return new AckUserWrite(newEmptyPath(), childTree, this.revert);
            }
        }
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    class ListenComplete {
        constructor(source, path) {
            this.source = source;
            this.path = path;
            /** @inheritDoc */
            this.type = OperationType.LISTEN_COMPLETE;
        }
        operationForChild(childName) {
            if (pathIsEmpty(this.path)) {
                return new ListenComplete(this.source, newEmptyPath());
            }
            else {
                return new ListenComplete(this.source, pathPopFront(this.path));
            }
        }
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    class Overwrite {
        constructor(source, path, snap) {
            this.source = source;
            this.path = path;
            this.snap = snap;
            /** @inheritDoc */
            this.type = OperationType.OVERWRITE;
        }
        operationForChild(childName) {
            if (pathIsEmpty(this.path)) {
                return new Overwrite(this.source, newEmptyPath(), this.snap.getImmediateChild(childName));
            }
            else {
                return new Overwrite(this.source, pathPopFront(this.path), this.snap);
            }
        }
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    class Merge {
        constructor(
        /** @inheritDoc */ source, 
        /** @inheritDoc */ path, 
        /** @inheritDoc */ children) {
            this.source = source;
            this.path = path;
            this.children = children;
            /** @inheritDoc */
            this.type = OperationType.MERGE;
        }
        operationForChild(childName) {
            if (pathIsEmpty(this.path)) {
                const childTree = this.children.subtree(new Path(childName));
                if (childTree.isEmpty()) {
                    // This child is unaffected
                    return null;
                }
                else if (childTree.value) {
                    // We have a snapshot for the child in question.  This becomes an overwrite of the child.
                    return new Overwrite(this.source, newEmptyPath(), childTree.value);
                }
                else {
                    // This is a merge at a deeper level
                    return new Merge(this.source, newEmptyPath(), childTree);
                }
            }
            else {
                assert(pathGetFront(this.path) === childName, "Can't get a merge for a child not on the path of the operation");
                return new Merge(this.source, pathPopFront(this.path), this.children);
            }
        }
        toString() {
            return ('Operation(' +
                this.path +
                ': ' +
                this.source.toString() +
                ' merge: ' +
                this.children.toString() +
                ')');
        }
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * A cache node only stores complete children. Additionally it holds a flag whether the node can be considered fully
     * initialized in the sense that we know at one point in time this represented a valid state of the world, e.g.
     * initialized with data from the server, or a complete overwrite by the client. The filtered flag also tracks
     * whether a node potentially had children removed due to a filter.
     */
    class CacheNode {
        constructor(node_, fullyInitialized_, filtered_) {
            this.node_ = node_;
            this.fullyInitialized_ = fullyInitialized_;
            this.filtered_ = filtered_;
        }
        /**
         * Returns whether this node was fully initialized with either server data or a complete overwrite by the client
         */
        isFullyInitialized() {
            return this.fullyInitialized_;
        }
        /**
         * Returns whether this node is potentially missing children due to a filter applied to the node
         */
        isFiltered() {
            return this.filtered_;
        }
        isCompleteForPath(path) {
            if (pathIsEmpty(path)) {
                return this.isFullyInitialized() && !this.filtered_;
            }
            const childKey = pathGetFront(path);
            return this.isCompleteForChild(childKey);
        }
        isCompleteForChild(key) {
            return ((this.isFullyInitialized() && !this.filtered_) || this.node_.hasChild(key));
        }
        getNode() {
            return this.node_;
        }
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * An EventGenerator is used to convert "raw" changes (Change) as computed by the
     * CacheDiffer into actual events (Event) that can be raised.  See generateEventsForChanges()
     * for details.
     *
     */
    class EventGenerator {
        constructor(query_) {
            this.query_ = query_;
            this.index_ = this.query_._queryParams.getIndex();
        }
    }
    /**
     * Given a set of raw changes (no moved events and prevName not specified yet), and a set of
     * EventRegistrations that should be notified of these changes, generate the actual events to be raised.
     *
     * Notes:
     *  - child_moved events will be synthesized at this time for any child_changed events that affect
     *    our index.
     *  - prevName will be calculated based on the index ordering.
     */
    function eventGeneratorGenerateEventsForChanges(eventGenerator, changes, eventCache, eventRegistrations) {
        const events = [];
        const moves = [];
        changes.forEach(change => {
            if (change.type === "child_changed" /* CHILD_CHANGED */ &&
                eventGenerator.index_.indexedValueChanged(change.oldSnap, change.snapshotNode)) {
                moves.push(changeChildMoved(change.childName, change.snapshotNode));
            }
        });
        eventGeneratorGenerateEventsForType(eventGenerator, events, "child_removed" /* CHILD_REMOVED */, changes, eventRegistrations, eventCache);
        eventGeneratorGenerateEventsForType(eventGenerator, events, "child_added" /* CHILD_ADDED */, changes, eventRegistrations, eventCache);
        eventGeneratorGenerateEventsForType(eventGenerator, events, "child_moved" /* CHILD_MOVED */, moves, eventRegistrations, eventCache);
        eventGeneratorGenerateEventsForType(eventGenerator, events, "child_changed" /* CHILD_CHANGED */, changes, eventRegistrations, eventCache);
        eventGeneratorGenerateEventsForType(eventGenerator, events, "value" /* VALUE */, changes, eventRegistrations, eventCache);
        return events;
    }
    /**
     * Given changes of a single change type, generate the corresponding events.
     */
    function eventGeneratorGenerateEventsForType(eventGenerator, events, eventType, changes, registrations, eventCache) {
        const filteredChanges = changes.filter(change => change.type === eventType);
        filteredChanges.sort((a, b) => eventGeneratorCompareChanges(eventGenerator, a, b));
        filteredChanges.forEach(change => {
            const materializedChange = eventGeneratorMaterializeSingleChange(eventGenerator, change, eventCache);
            registrations.forEach(registration => {
                if (registration.respondsTo(change.type)) {
                    events.push(registration.createEvent(materializedChange, eventGenerator.query_));
                }
            });
        });
    }
    function eventGeneratorMaterializeSingleChange(eventGenerator, change, eventCache) {
        if (change.type === 'value' || change.type === 'child_removed') {
            return change;
        }
        else {
            change.prevName = eventCache.getPredecessorChildName(change.childName, change.snapshotNode, eventGenerator.index_);
            return change;
        }
    }
    function eventGeneratorCompareChanges(eventGenerator, a, b) {
        if (a.childName == null || b.childName == null) {
            throw assertionError('Should only compare child_ events.');
        }
        const aWrapped = new NamedNode(a.childName, a.snapshotNode);
        const bWrapped = new NamedNode(b.childName, b.snapshotNode);
        return eventGenerator.index_.compare(aWrapped, bWrapped);
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    function newViewCache(eventCache, serverCache) {
        return { eventCache, serverCache };
    }
    function viewCacheUpdateEventSnap(viewCache, eventSnap, complete, filtered) {
        return newViewCache(new CacheNode(eventSnap, complete, filtered), viewCache.serverCache);
    }
    function viewCacheUpdateServerSnap(viewCache, serverSnap, complete, filtered) {
        return newViewCache(viewCache.eventCache, new CacheNode(serverSnap, complete, filtered));
    }
    function viewCacheGetCompleteEventSnap(viewCache) {
        return viewCache.eventCache.isFullyInitialized()
            ? viewCache.eventCache.getNode()
            : null;
    }
    function viewCacheGetCompleteServerSnap(viewCache) {
        return viewCache.serverCache.isFullyInitialized()
            ? viewCache.serverCache.getNode()
            : null;
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    let emptyChildrenSingleton;
    /**
     * Singleton empty children collection.
     *
     */
    const EmptyChildren = () => {
        if (!emptyChildrenSingleton) {
            emptyChildrenSingleton = new SortedMap(stringCompare);
        }
        return emptyChildrenSingleton;
    };
    /**
     * A tree with immutable elements.
     */
    class ImmutableTree {
        constructor(value, children = EmptyChildren()) {
            this.value = value;
            this.children = children;
        }
        static fromObject(obj) {
            let tree = new ImmutableTree(null);
            each(obj, (childPath, childSnap) => {
                tree = tree.set(new Path(childPath), childSnap);
            });
            return tree;
        }
        /**
         * True if the value is empty and there are no children
         */
        isEmpty() {
            return this.value === null && this.children.isEmpty();
        }
        /**
         * Given a path and predicate, return the first node and the path to that node
         * where the predicate returns true.
         *
         * TODO Do a perf test -- If we're creating a bunch of `{path: value:}`
         * objects on the way back out, it may be better to pass down a pathSoFar obj.
         *
         * @param relativePath - The remainder of the path
         * @param predicate - The predicate to satisfy to return a node
         */
        findRootMostMatchingPathAndValue(relativePath, predicate) {
            if (this.value != null && predicate(this.value)) {
                return { path: newEmptyPath(), value: this.value };
            }
            else {
                if (pathIsEmpty(relativePath)) {
                    return null;
                }
                else {
                    const front = pathGetFront(relativePath);
                    const child = this.children.get(front);
                    if (child !== null) {
                        const childExistingPathAndValue = child.findRootMostMatchingPathAndValue(pathPopFront(relativePath), predicate);
                        if (childExistingPathAndValue != null) {
                            const fullPath = pathChild(new Path(front), childExistingPathAndValue.path);
                            return { path: fullPath, value: childExistingPathAndValue.value };
                        }
                        else {
                            return null;
                        }
                    }
                    else {
                        return null;
                    }
                }
            }
        }
        /**
         * Find, if it exists, the shortest subpath of the given path that points a defined
         * value in the tree
         */
        findRootMostValueAndPath(relativePath) {
            return this.findRootMostMatchingPathAndValue(relativePath, () => true);
        }
        /**
         * @returns The subtree at the given path
         */
        subtree(relativePath) {
            if (pathIsEmpty(relativePath)) {
                return this;
            }
            else {
                const front = pathGetFront(relativePath);
                const childTree = this.children.get(front);
                if (childTree !== null) {
                    return childTree.subtree(pathPopFront(relativePath));
                }
                else {
                    return new ImmutableTree(null);
                }
            }
        }
        /**
         * Sets a value at the specified path.
         *
         * @param relativePath - Path to set value at.
         * @param toSet - Value to set.
         * @returns Resulting tree.
         */
        set(relativePath, toSet) {
            if (pathIsEmpty(relativePath)) {
                return new ImmutableTree(toSet, this.children);
            }
            else {
                const front = pathGetFront(relativePath);
                const child = this.children.get(front) || new ImmutableTree(null);
                const newChild = child.set(pathPopFront(relativePath), toSet);
                const newChildren = this.children.insert(front, newChild);
                return new ImmutableTree(this.value, newChildren);
            }
        }
        /**
         * Removes the value at the specified path.
         *
         * @param relativePath - Path to value to remove.
         * @returns Resulting tree.
         */
        remove(relativePath) {
            if (pathIsEmpty(relativePath)) {
                if (this.children.isEmpty()) {
                    return new ImmutableTree(null);
                }
                else {
                    return new ImmutableTree(null, this.children);
                }
            }
            else {
                const front = pathGetFront(relativePath);
                const child = this.children.get(front);
                if (child) {
                    const newChild = child.remove(pathPopFront(relativePath));
                    let newChildren;
                    if (newChild.isEmpty()) {
                        newChildren = this.children.remove(front);
                    }
                    else {
                        newChildren = this.children.insert(front, newChild);
                    }
                    if (this.value === null && newChildren.isEmpty()) {
                        return new ImmutableTree(null);
                    }
                    else {
                        return new ImmutableTree(this.value, newChildren);
                    }
                }
                else {
                    return this;
                }
            }
        }
        /**
         * Gets a value from the tree.
         *
         * @param relativePath - Path to get value for.
         * @returns Value at path, or null.
         */
        get(relativePath) {
            if (pathIsEmpty(relativePath)) {
                return this.value;
            }
            else {
                const front = pathGetFront(relativePath);
                const child = this.children.get(front);
                if (child) {
                    return child.get(pathPopFront(relativePath));
                }
                else {
                    return null;
                }
            }
        }
        /**
         * Replace the subtree at the specified path with the given new tree.
         *
         * @param relativePath - Path to replace subtree for.
         * @param newTree - New tree.
         * @returns Resulting tree.
         */
        setTree(relativePath, newTree) {
            if (pathIsEmpty(relativePath)) {
                return newTree;
            }
            else {
                const front = pathGetFront(relativePath);
                const child = this.children.get(front) || new ImmutableTree(null);
                const newChild = child.setTree(pathPopFront(relativePath), newTree);
                let newChildren;
                if (newChild.isEmpty()) {
                    newChildren = this.children.remove(front);
                }
                else {
                    newChildren = this.children.insert(front, newChild);
                }
                return new ImmutableTree(this.value, newChildren);
            }
        }
        /**
         * Performs a depth first fold on this tree. Transforms a tree into a single
         * value, given a function that operates on the path to a node, an optional
         * current value, and a map of child names to folded subtrees
         */
        fold(fn) {
            return this.fold_(newEmptyPath(), fn);
        }
        /**
         * Recursive helper for public-facing fold() method
         */
        fold_(pathSoFar, fn) {
            const accum = {};
            this.children.inorderTraversal((childKey, childTree) => {
                accum[childKey] = childTree.fold_(pathChild(pathSoFar, childKey), fn);
            });
            return fn(pathSoFar, this.value, accum);
        }
        /**
         * Find the first matching value on the given path. Return the result of applying f to it.
         */
        findOnPath(path, f) {
            return this.findOnPath_(path, newEmptyPath(), f);
        }
        findOnPath_(pathToFollow, pathSoFar, f) {
            const result = this.value ? f(pathSoFar, this.value) : false;
            if (result) {
                return result;
            }
            else {
                if (pathIsEmpty(pathToFollow)) {
                    return null;
                }
                else {
                    const front = pathGetFront(pathToFollow);
                    const nextChild = this.children.get(front);
                    if (nextChild) {
                        return nextChild.findOnPath_(pathPopFront(pathToFollow), pathChild(pathSoFar, front), f);
                    }
                    else {
                        return null;
                    }
                }
            }
        }
        foreachOnPath(path, f) {
            return this.foreachOnPath_(path, newEmptyPath(), f);
        }
        foreachOnPath_(pathToFollow, currentRelativePath, f) {
            if (pathIsEmpty(pathToFollow)) {
                return this;
            }
            else {
                if (this.value) {
                    f(currentRelativePath, this.value);
                }
                const front = pathGetFront(pathToFollow);
                const nextChild = this.children.get(front);
                if (nextChild) {
                    return nextChild.foreachOnPath_(pathPopFront(pathToFollow), pathChild(currentRelativePath, front), f);
                }
                else {
                    return new ImmutableTree(null);
                }
            }
        }
        /**
         * Calls the given function for each node in the tree that has a value.
         *
         * @param f - A function to be called with the path from the root of the tree to
         * a node, and the value at that node. Called in depth-first order.
         */
        foreach(f) {
            this.foreach_(newEmptyPath(), f);
        }
        foreach_(currentRelativePath, f) {
            this.children.inorderTraversal((childName, childTree) => {
                childTree.foreach_(pathChild(currentRelativePath, childName), f);
            });
            if (this.value) {
                f(currentRelativePath, this.value);
            }
        }
        foreachChild(f) {
            this.children.inorderTraversal((childName, childTree) => {
                if (childTree.value) {
                    f(childName, childTree.value);
                }
            });
        }
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * This class holds a collection of writes that can be applied to nodes in unison. It abstracts away the logic with
     * dealing with priority writes and multiple nested writes. At any given path there is only allowed to be one write
     * modifying that path. Any write to an existing path or shadowing an existing path will modify that existing write
     * to reflect the write added.
     */
    class CompoundWrite {
        constructor(writeTree_) {
            this.writeTree_ = writeTree_;
        }
        static empty() {
            return new CompoundWrite(new ImmutableTree(null));
        }
    }
    function compoundWriteAddWrite(compoundWrite, path, node) {
        if (pathIsEmpty(path)) {
            return new CompoundWrite(new ImmutableTree(node));
        }
        else {
            const rootmost = compoundWrite.writeTree_.findRootMostValueAndPath(path);
            if (rootmost != null) {
                const rootMostPath = rootmost.path;
                let value = rootmost.value;
                const relativePath = newRelativePath(rootMostPath, path);
                value = value.updateChild(relativePath, node);
                return new CompoundWrite(compoundWrite.writeTree_.set(rootMostPath, value));
            }
            else {
                const subtree = new ImmutableTree(node);
                const newWriteTree = compoundWrite.writeTree_.setTree(path, subtree);
                return new CompoundWrite(newWriteTree);
            }
        }
    }
    function compoundWriteAddWrites(compoundWrite, path, updates) {
        let newWrite = compoundWrite;
        each(updates, (childKey, node) => {
            newWrite = compoundWriteAddWrite(newWrite, pathChild(path, childKey), node);
        });
        return newWrite;
    }
    /**
     * Will remove a write at the given path and deeper paths. This will <em>not</em> modify a write at a higher
     * location, which must be removed by calling this method with that path.
     *
     * @param compoundWrite - The CompoundWrite to remove.
     * @param path - The path at which a write and all deeper writes should be removed
     * @returns The new CompoundWrite with the removed path
     */
    function compoundWriteRemoveWrite(compoundWrite, path) {
        if (pathIsEmpty(path)) {
            return CompoundWrite.empty();
        }
        else {
            const newWriteTree = compoundWrite.writeTree_.setTree(path, new ImmutableTree(null));
            return new CompoundWrite(newWriteTree);
        }
    }
    /**
     * Returns whether this CompoundWrite will fully overwrite a node at a given location and can therefore be
     * considered "complete".
     *
     * @param compoundWrite - The CompoundWrite to check.
     * @param path - The path to check for
     * @returns Whether there is a complete write at that path
     */
    function compoundWriteHasCompleteWrite(compoundWrite, path) {
        return compoundWriteGetCompleteNode(compoundWrite, path) != null;
    }
    /**
     * Returns a node for a path if and only if the node is a "complete" overwrite at that path. This will not aggregate
     * writes from deeper paths, but will return child nodes from a more shallow path.
     *
     * @param compoundWrite - The CompoundWrite to get the node from.
     * @param path - The path to get a complete write
     * @returns The node if complete at that path, or null otherwise.
     */
    function compoundWriteGetCompleteNode(compoundWrite, path) {
        const rootmost = compoundWrite.writeTree_.findRootMostValueAndPath(path);
        if (rootmost != null) {
            return compoundWrite.writeTree_
                .get(rootmost.path)
                .getChild(newRelativePath(rootmost.path, path));
        }
        else {
            return null;
        }
    }
    /**
     * Returns all children that are guaranteed to be a complete overwrite.
     *
     * @param compoundWrite - The CompoundWrite to get children from.
     * @returns A list of all complete children.
     */
    function compoundWriteGetCompleteChildren(compoundWrite) {
        const children = [];
        const node = compoundWrite.writeTree_.value;
        if (node != null) {
            // If it's a leaf node, it has no children; so nothing to do.
            if (!node.isLeafNode()) {
                node.forEachChild(PRIORITY_INDEX, (childName, childNode) => {
                    children.push(new NamedNode(childName, childNode));
                });
            }
        }
        else {
            compoundWrite.writeTree_.children.inorderTraversal((childName, childTree) => {
                if (childTree.value != null) {
                    children.push(new NamedNode(childName, childTree.value));
                }
            });
        }
        return children;
    }
    function compoundWriteChildCompoundWrite(compoundWrite, path) {
        if (pathIsEmpty(path)) {
            return compoundWrite;
        }
        else {
            const shadowingNode = compoundWriteGetCompleteNode(compoundWrite, path);
            if (shadowingNode != null) {
                return new CompoundWrite(new ImmutableTree(shadowingNode));
            }
            else {
                return new CompoundWrite(compoundWrite.writeTree_.subtree(path));
            }
        }
    }
    /**
     * Returns true if this CompoundWrite is empty and therefore does not modify any nodes.
     * @returns Whether this CompoundWrite is empty
     */
    function compoundWriteIsEmpty(compoundWrite) {
        return compoundWrite.writeTree_.isEmpty();
    }
    /**
     * Applies this CompoundWrite to a node. The node is returned with all writes from this CompoundWrite applied to the
     * node
     * @param node - The node to apply this CompoundWrite to
     * @returns The node with all writes applied
     */
    function compoundWriteApply(compoundWrite, node) {
        return applySubtreeWrite(newEmptyPath(), compoundWrite.writeTree_, node);
    }
    function applySubtreeWrite(relativePath, writeTree, node) {
        if (writeTree.value != null) {
            // Since there a write is always a leaf, we're done here
            return node.updateChild(relativePath, writeTree.value);
        }
        else {
            let priorityWrite = null;
            writeTree.children.inorderTraversal((childKey, childTree) => {
                if (childKey === '.priority') {
                    // Apply priorities at the end so we don't update priorities for either empty nodes or forget
                    // to apply priorities to empty nodes that are later filled
                    assert(childTree.value !== null, 'Priority writes must always be leaf nodes');
                    priorityWrite = childTree.value;
                }
                else {
                    node = applySubtreeWrite(pathChild(relativePath, childKey), childTree, node);
                }
            });
            // If there was a priority write, we only apply it if the node is not empty
            if (!node.getChild(relativePath).isEmpty() && priorityWrite !== null) {
                node = node.updateChild(pathChild(relativePath, '.priority'), priorityWrite);
            }
            return node;
        }
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * Create a new WriteTreeRef for the given path. For use with a new sync point at the given path.
     *
     */
    function writeTreeChildWrites(writeTree, path) {
        return newWriteTreeRef(path, writeTree);
    }
    /**
     * Record a new overwrite from user code.
     *
     * @param visible - This is set to false by some transactions. It should be excluded from event caches
     */
    function writeTreeAddOverwrite(writeTree, path, snap, writeId, visible) {
        assert(writeId > writeTree.lastWriteId, 'Stacking an older write on top of newer ones');
        if (visible === undefined) {
            visible = true;
        }
        writeTree.allWrites.push({
            path,
            snap,
            writeId,
            visible
        });
        if (visible) {
            writeTree.visibleWrites = compoundWriteAddWrite(writeTree.visibleWrites, path, snap);
        }
        writeTree.lastWriteId = writeId;
    }
    function writeTreeGetWrite(writeTree, writeId) {
        for (let i = 0; i < writeTree.allWrites.length; i++) {
            const record = writeTree.allWrites[i];
            if (record.writeId === writeId) {
                return record;
            }
        }
        return null;
    }
    /**
     * Remove a write (either an overwrite or merge) that has been successfully acknowledge by the server. Recalculates
     * the tree if necessary.  We return true if it may have been visible, meaning views need to reevaluate.
     *
     * @returns true if the write may have been visible (meaning we'll need to reevaluate / raise
     * events as a result).
     */
    function writeTreeRemoveWrite(writeTree, writeId) {
        // Note: disabling this check. It could be a transaction that preempted another transaction, and thus was applied
        // out of order.
        //const validClear = revert || this.allWrites_.length === 0 || writeId <= this.allWrites_[0].writeId;
        //assert(validClear, "Either we don't have this write, or it's the first one in the queue");
        const idx = writeTree.allWrites.findIndex(s => {
            return s.writeId === writeId;
        });
        assert(idx >= 0, 'removeWrite called with nonexistent writeId.');
        const writeToRemove = writeTree.allWrites[idx];
        writeTree.allWrites.splice(idx, 1);
        let removedWriteWasVisible = writeToRemove.visible;
        let removedWriteOverlapsWithOtherWrites = false;
        let i = writeTree.allWrites.length - 1;
        while (removedWriteWasVisible && i >= 0) {
            const currentWrite = writeTree.allWrites[i];
            if (currentWrite.visible) {
                if (i >= idx &&
                    writeTreeRecordContainsPath_(currentWrite, writeToRemove.path)) {
                    // The removed write was completely shadowed by a subsequent write.
                    removedWriteWasVisible = false;
                }
                else if (pathContains(writeToRemove.path, currentWrite.path)) {
                    // Either we're covering some writes or they're covering part of us (depending on which came first).
                    removedWriteOverlapsWithOtherWrites = true;
                }
            }
            i--;
        }
        if (!removedWriteWasVisible) {
            return false;
        }
        else if (removedWriteOverlapsWithOtherWrites) {
            // There's some shadowing going on. Just rebuild the visible writes from scratch.
            writeTreeResetTree_(writeTree);
            return true;
        }
        else {
            // There's no shadowing.  We can safely just remove the write(s) from visibleWrites.
            if (writeToRemove.snap) {
                writeTree.visibleWrites = compoundWriteRemoveWrite(writeTree.visibleWrites, writeToRemove.path);
            }
            else {
                const children = writeToRemove.children;
                each(children, (childName) => {
                    writeTree.visibleWrites = compoundWriteRemoveWrite(writeTree.visibleWrites, pathChild(writeToRemove.path, childName));
                });
            }
            return true;
        }
    }
    function writeTreeRecordContainsPath_(writeRecord, path) {
        if (writeRecord.snap) {
            return pathContains(writeRecord.path, path);
        }
        else {
            for (const childName in writeRecord.children) {
                if (writeRecord.children.hasOwnProperty(childName) &&
                    pathContains(pathChild(writeRecord.path, childName), path)) {
                    return true;
                }
            }
            return false;
        }
    }
    /**
     * Re-layer the writes and merges into a tree so we can efficiently calculate event snapshots
     */
    function writeTreeResetTree_(writeTree) {
        writeTree.visibleWrites = writeTreeLayerTree_(writeTree.allWrites, writeTreeDefaultFilter_, newEmptyPath());
        if (writeTree.allWrites.length > 0) {
            writeTree.lastWriteId =
                writeTree.allWrites[writeTree.allWrites.length - 1].writeId;
        }
        else {
            writeTree.lastWriteId = -1;
        }
    }
    /**
     * The default filter used when constructing the tree. Keep everything that's visible.
     */
    function writeTreeDefaultFilter_(write) {
        return write.visible;
    }
    /**
     * Static method. Given an array of WriteRecords, a filter for which ones to include, and a path, construct the tree of
     * event data at that path.
     */
    function writeTreeLayerTree_(writes, filter, treeRoot) {
        let compoundWrite = CompoundWrite.empty();
        for (let i = 0; i < writes.length; ++i) {
            const write = writes[i];
            // Theory, a later set will either:
            // a) abort a relevant transaction, so no need to worry about excluding it from calculating that transaction
            // b) not be relevant to a transaction (separate branch), so again will not affect the data for that transaction
            if (filter(write)) {
                const writePath = write.path;
                let relativePath;
                if (write.snap) {
                    if (pathContains(treeRoot, writePath)) {
                        relativePath = newRelativePath(treeRoot, writePath);
                        compoundWrite = compoundWriteAddWrite(compoundWrite, relativePath, write.snap);
                    }
                    else if (pathContains(writePath, treeRoot)) {
                        relativePath = newRelativePath(writePath, treeRoot);
                        compoundWrite = compoundWriteAddWrite(compoundWrite, newEmptyPath(), write.snap.getChild(relativePath));
                    }
                    else ;
                }
                else if (write.children) {
                    if (pathContains(treeRoot, writePath)) {
                        relativePath = newRelativePath(treeRoot, writePath);
                        compoundWrite = compoundWriteAddWrites(compoundWrite, relativePath, write.children);
                    }
                    else if (pathContains(writePath, treeRoot)) {
                        relativePath = newRelativePath(writePath, treeRoot);
                        if (pathIsEmpty(relativePath)) {
                            compoundWrite = compoundWriteAddWrites(compoundWrite, newEmptyPath(), write.children);
                        }
                        else {
                            const child = safeGet(write.children, pathGetFront(relativePath));
                            if (child) {
                                // There exists a child in this node that matches the root path
                                const deepNode = child.getChild(pathPopFront(relativePath));
                                compoundWrite = compoundWriteAddWrite(compoundWrite, newEmptyPath(), deepNode);
                            }
                        }
                    }
                    else ;
                }
                else {
                    throw assertionError('WriteRecord should have .snap or .children');
                }
            }
        }
        return compoundWrite;
    }
    /**
     * Given optional, underlying server data, and an optional set of constraints (exclude some sets, include hidden
     * writes), attempt to calculate a complete snapshot for the given path
     *
     * @param writeIdsToExclude - An optional set to be excluded
     * @param includeHiddenWrites - Defaults to false, whether or not to layer on writes with visible set to false
     */
    function writeTreeCalcCompleteEventCache(writeTree, treePath, completeServerCache, writeIdsToExclude, includeHiddenWrites) {
        if (!writeIdsToExclude && !includeHiddenWrites) {
            const shadowingNode = compoundWriteGetCompleteNode(writeTree.visibleWrites, treePath);
            if (shadowingNode != null) {
                return shadowingNode;
            }
            else {
                const subMerge = compoundWriteChildCompoundWrite(writeTree.visibleWrites, treePath);
                if (compoundWriteIsEmpty(subMerge)) {
                    return completeServerCache;
                }
                else if (completeServerCache == null &&
                    !compoundWriteHasCompleteWrite(subMerge, newEmptyPath())) {
                    // We wouldn't have a complete snapshot, since there's no underlying data and no complete shadow
                    return null;
                }
                else {
                    const layeredCache = completeServerCache || ChildrenNode.EMPTY_NODE;
                    return compoundWriteApply(subMerge, layeredCache);
                }
            }
        }
        else {
            const merge = compoundWriteChildCompoundWrite(writeTree.visibleWrites, treePath);
            if (!includeHiddenWrites && compoundWriteIsEmpty(merge)) {
                return completeServerCache;
            }
            else {
                // If the server cache is null, and we don't have a complete cache, we need to return null
                if (!includeHiddenWrites &&
                    completeServerCache == null &&
                    !compoundWriteHasCompleteWrite(merge, newEmptyPath())) {
                    return null;
                }
                else {
                    const filter = function (write) {
                        return ((write.visible || includeHiddenWrites) &&
                            (!writeIdsToExclude ||
                                !~writeIdsToExclude.indexOf(write.writeId)) &&
                            (pathContains(write.path, treePath) ||
                                pathContains(treePath, write.path)));
                    };
                    const mergeAtPath = writeTreeLayerTree_(writeTree.allWrites, filter, treePath);
                    const layeredCache = completeServerCache || ChildrenNode.EMPTY_NODE;
                    return compoundWriteApply(mergeAtPath, layeredCache);
                }
            }
        }
    }
    /**
     * With optional, underlying server data, attempt to return a children node of children that we have complete data for.
     * Used when creating new views, to pre-fill their complete event children snapshot.
     */
    function writeTreeCalcCompleteEventChildren(writeTree, treePath, completeServerChildren) {
        let completeChildren = ChildrenNode.EMPTY_NODE;
        const topLevelSet = compoundWriteGetCompleteNode(writeTree.visibleWrites, treePath);
        if (topLevelSet) {
            if (!topLevelSet.isLeafNode()) {
                // we're shadowing everything. Return the children.
                topLevelSet.forEachChild(PRIORITY_INDEX, (childName, childSnap) => {
                    completeChildren = completeChildren.updateImmediateChild(childName, childSnap);
                });
            }
            return completeChildren;
        }
        else if (completeServerChildren) {
            // Layer any children we have on top of this
            // We know we don't have a top-level set, so just enumerate existing children
            const merge = compoundWriteChildCompoundWrite(writeTree.visibleWrites, treePath);
            completeServerChildren.forEachChild(PRIORITY_INDEX, (childName, childNode) => {
                const node = compoundWriteApply(compoundWriteChildCompoundWrite(merge, new Path(childName)), childNode);
                completeChildren = completeChildren.updateImmediateChild(childName, node);
            });
            // Add any complete children we have from the set
            compoundWriteGetCompleteChildren(merge).forEach(namedNode => {
                completeChildren = completeChildren.updateImmediateChild(namedNode.name, namedNode.node);
            });
            return completeChildren;
        }
        else {
            // We don't have anything to layer on top of. Layer on any children we have
            // Note that we can return an empty snap if we have a defined delete
            const merge = compoundWriteChildCompoundWrite(writeTree.visibleWrites, treePath);
            compoundWriteGetCompleteChildren(merge).forEach(namedNode => {
                completeChildren = completeChildren.updateImmediateChild(namedNode.name, namedNode.node);
            });
            return completeChildren;
        }
    }
    /**
     * Given that the underlying server data has updated, determine what, if anything, needs to be
     * applied to the event cache.
     *
     * Possibilities:
     *
     * 1. No writes are shadowing. Events should be raised, the snap to be applied comes from the server data
     *
     * 2. Some write is completely shadowing. No events to be raised
     *
     * 3. Is partially shadowed. Events
     *
     * Either existingEventSnap or existingServerSnap must exist
     */
    function writeTreeCalcEventCacheAfterServerOverwrite(writeTree, treePath, childPath, existingEventSnap, existingServerSnap) {
        assert(existingEventSnap || existingServerSnap, 'Either existingEventSnap or existingServerSnap must exist');
        const path = pathChild(treePath, childPath);
        if (compoundWriteHasCompleteWrite(writeTree.visibleWrites, path)) {
            // At this point we can probably guarantee that we're in case 2, meaning no events
            // May need to check visibility while doing the findRootMostValueAndPath call
            return null;
        }
        else {
            // No complete shadowing. We're either partially shadowing or not shadowing at all.
            const childMerge = compoundWriteChildCompoundWrite(writeTree.visibleWrites, path);
            if (compoundWriteIsEmpty(childMerge)) {
                // We're not shadowing at all. Case 1
                return existingServerSnap.getChild(childPath);
            }
            else {
                // This could be more efficient if the serverNode + updates doesn't change the eventSnap
                // However this is tricky to find out, since user updates don't necessary change the server
                // snap, e.g. priority updates on empty nodes, or deep deletes. Another special case is if the server
                // adds nodes, but doesn't change any existing writes. It is therefore not enough to
                // only check if the updates change the serverNode.
                // Maybe check if the merge tree contains these special cases and only do a full overwrite in that case?
                return compoundWriteApply(childMerge, existingServerSnap.getChild(childPath));
            }
        }
    }
    /**
     * Returns a complete child for a given server snap after applying all user writes or null if there is no
     * complete child for this ChildKey.
     */
    function writeTreeCalcCompleteChild(writeTree, treePath, childKey, existingServerSnap) {
        const path = pathChild(treePath, childKey);
        const shadowingNode = compoundWriteGetCompleteNode(writeTree.visibleWrites, path);
        if (shadowingNode != null) {
            return shadowingNode;
        }
        else {
            if (existingServerSnap.isCompleteForChild(childKey)) {
                const childMerge = compoundWriteChildCompoundWrite(writeTree.visibleWrites, path);
                return compoundWriteApply(childMerge, existingServerSnap.getNode().getImmediateChild(childKey));
            }
            else {
                return null;
            }
        }
    }
    /**
     * Returns a node if there is a complete overwrite for this path. More specifically, if there is a write at
     * a higher path, this will return the child of that write relative to the write and this path.
     * Returns null if there is no write at this path.
     */
    function writeTreeShadowingWrite(writeTree, path) {
        return compoundWriteGetCompleteNode(writeTree.visibleWrites, path);
    }
    /**
     * This method is used when processing child remove events on a query. If we can, we pull in children that were outside
     * the window, but may now be in the window.
     */
    function writeTreeCalcIndexedSlice(writeTree, treePath, completeServerData, startPost, count, reverse, index) {
        let toIterate;
        const merge = compoundWriteChildCompoundWrite(writeTree.visibleWrites, treePath);
        const shadowingNode = compoundWriteGetCompleteNode(merge, newEmptyPath());
        if (shadowingNode != null) {
            toIterate = shadowingNode;
        }
        else if (completeServerData != null) {
            toIterate = compoundWriteApply(merge, completeServerData);
        }
        else {
            // no children to iterate on
            return [];
        }
        toIterate = toIterate.withIndex(index);
        if (!toIterate.isEmpty() && !toIterate.isLeafNode()) {
            const nodes = [];
            const cmp = index.getCompare();
            const iter = reverse
                ? toIterate.getReverseIteratorFrom(startPost, index)
                : toIterate.getIteratorFrom(startPost, index);
            let next = iter.getNext();
            while (next && nodes.length < count) {
                if (cmp(next, startPost) !== 0) {
                    nodes.push(next);
                }
                next = iter.getNext();
            }
            return nodes;
        }
        else {
            return [];
        }
    }
    function newWriteTree() {
        return {
            visibleWrites: CompoundWrite.empty(),
            allWrites: [],
            lastWriteId: -1
        };
    }
    /**
     * If possible, returns a complete event cache, using the underlying server data if possible. In addition, can be used
     * to get a cache that includes hidden writes, and excludes arbitrary writes. Note that customizing the returned node
     * can lead to a more expensive calculation.
     *
     * @param writeIdsToExclude - Optional writes to exclude.
     * @param includeHiddenWrites - Defaults to false, whether or not to layer on writes with visible set to false
     */
    function writeTreeRefCalcCompleteEventCache(writeTreeRef, completeServerCache, writeIdsToExclude, includeHiddenWrites) {
        return writeTreeCalcCompleteEventCache(writeTreeRef.writeTree, writeTreeRef.treePath, completeServerCache, writeIdsToExclude, includeHiddenWrites);
    }
    /**
     * If possible, returns a children node containing all of the complete children we have data for. The returned data is a
     * mix of the given server data and write data.
     *
     */
    function writeTreeRefCalcCompleteEventChildren(writeTreeRef, completeServerChildren) {
        return writeTreeCalcCompleteEventChildren(writeTreeRef.writeTree, writeTreeRef.treePath, completeServerChildren);
    }
    /**
     * Given that either the underlying server data has updated or the outstanding writes have updated, determine what,
     * if anything, needs to be applied to the event cache.
     *
     * Possibilities:
     *
     * 1. No writes are shadowing. Events should be raised, the snap to be applied comes from the server data
     *
     * 2. Some write is completely shadowing. No events to be raised
     *
     * 3. Is partially shadowed. Events should be raised
     *
     * Either existingEventSnap or existingServerSnap must exist, this is validated via an assert
     *
     *
     */
    function writeTreeRefCalcEventCacheAfterServerOverwrite(writeTreeRef, path, existingEventSnap, existingServerSnap) {
        return writeTreeCalcEventCacheAfterServerOverwrite(writeTreeRef.writeTree, writeTreeRef.treePath, path, existingEventSnap, existingServerSnap);
    }
    /**
     * Returns a node if there is a complete overwrite for this path. More specifically, if there is a write at
     * a higher path, this will return the child of that write relative to the write and this path.
     * Returns null if there is no write at this path.
     *
     */
    function writeTreeRefShadowingWrite(writeTreeRef, path) {
        return writeTreeShadowingWrite(writeTreeRef.writeTree, pathChild(writeTreeRef.treePath, path));
    }
    /**
     * This method is used when processing child remove events on a query. If we can, we pull in children that were outside
     * the window, but may now be in the window
     */
    function writeTreeRefCalcIndexedSlice(writeTreeRef, completeServerData, startPost, count, reverse, index) {
        return writeTreeCalcIndexedSlice(writeTreeRef.writeTree, writeTreeRef.treePath, completeServerData, startPost, count, reverse, index);
    }
    /**
     * Returns a complete child for a given server snap after applying all user writes or null if there is no
     * complete child for this ChildKey.
     */
    function writeTreeRefCalcCompleteChild(writeTreeRef, childKey, existingServerCache) {
        return writeTreeCalcCompleteChild(writeTreeRef.writeTree, writeTreeRef.treePath, childKey, existingServerCache);
    }
    /**
     * Return a WriteTreeRef for a child.
     */
    function writeTreeRefChild(writeTreeRef, childName) {
        return newWriteTreeRef(pathChild(writeTreeRef.treePath, childName), writeTreeRef.writeTree);
    }
    function newWriteTreeRef(path, writeTree) {
        return {
            treePath: path,
            writeTree
        };
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    class ChildChangeAccumulator {
        constructor() {
            this.changeMap = new Map();
        }
        trackChildChange(change) {
            const type = change.type;
            const childKey = change.childName;
            assert(type === "child_added" /* CHILD_ADDED */ ||
                type === "child_changed" /* CHILD_CHANGED */ ||
                type === "child_removed" /* CHILD_REMOVED */, 'Only child changes supported for tracking');
            assert(childKey !== '.priority', 'Only non-priority child changes can be tracked.');
            const oldChange = this.changeMap.get(childKey);
            if (oldChange) {
                const oldType = oldChange.type;
                if (type === "child_added" /* CHILD_ADDED */ &&
                    oldType === "child_removed" /* CHILD_REMOVED */) {
                    this.changeMap.set(childKey, changeChildChanged(childKey, change.snapshotNode, oldChange.snapshotNode));
                }
                else if (type === "child_removed" /* CHILD_REMOVED */ &&
                    oldType === "child_added" /* CHILD_ADDED */) {
                    this.changeMap.delete(childKey);
                }
                else if (type === "child_removed" /* CHILD_REMOVED */ &&
                    oldType === "child_changed" /* CHILD_CHANGED */) {
                    this.changeMap.set(childKey, changeChildRemoved(childKey, oldChange.oldSnap));
                }
                else if (type === "child_changed" /* CHILD_CHANGED */ &&
                    oldType === "child_added" /* CHILD_ADDED */) {
                    this.changeMap.set(childKey, changeChildAdded(childKey, change.snapshotNode));
                }
                else if (type === "child_changed" /* CHILD_CHANGED */ &&
                    oldType === "child_changed" /* CHILD_CHANGED */) {
                    this.changeMap.set(childKey, changeChildChanged(childKey, change.snapshotNode, oldChange.oldSnap));
                }
                else {
                    throw assertionError('Illegal combination of changes: ' +
                        change +
                        ' occurred after ' +
                        oldChange);
                }
            }
            else {
                this.changeMap.set(childKey, change);
            }
        }
        getChanges() {
            return Array.from(this.changeMap.values());
        }
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * An implementation of CompleteChildSource that never returns any additional children
     */
    // eslint-disable-next-line @typescript-eslint/naming-convention
    class NoCompleteChildSource_ {
        getCompleteChild(childKey) {
            return null;
        }
        getChildAfterChild(index, child, reverse) {
            return null;
        }
    }
    /**
     * Singleton instance.
     */
    const NO_COMPLETE_CHILD_SOURCE = new NoCompleteChildSource_();
    /**
     * An implementation of CompleteChildSource that uses a WriteTree in addition to any other server data or
     * old event caches available to calculate complete children.
     */
    class WriteTreeCompleteChildSource {
        constructor(writes_, viewCache_, optCompleteServerCache_ = null) {
            this.writes_ = writes_;
            this.viewCache_ = viewCache_;
            this.optCompleteServerCache_ = optCompleteServerCache_;
        }
        getCompleteChild(childKey) {
            const node = this.viewCache_.eventCache;
            if (node.isCompleteForChild(childKey)) {
                return node.getNode().getImmediateChild(childKey);
            }
            else {
                const serverNode = this.optCompleteServerCache_ != null
                    ? new CacheNode(this.optCompleteServerCache_, true, false)
                    : this.viewCache_.serverCache;
                return writeTreeRefCalcCompleteChild(this.writes_, childKey, serverNode);
            }
        }
        getChildAfterChild(index, child, reverse) {
            const completeServerData = this.optCompleteServerCache_ != null
                ? this.optCompleteServerCache_
                : viewCacheGetCompleteServerSnap(this.viewCache_);
            const nodes = writeTreeRefCalcIndexedSlice(this.writes_, completeServerData, child, 1, reverse, index);
            if (nodes.length === 0) {
                return null;
            }
            else {
                return nodes[0];
            }
        }
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    function newViewProcessor(filter) {
        return { filter };
    }
    function viewProcessorAssertIndexed(viewProcessor, viewCache) {
        assert(viewCache.eventCache.getNode().isIndexed(viewProcessor.filter.getIndex()), 'Event snap not indexed');
        assert(viewCache.serverCache.getNode().isIndexed(viewProcessor.filter.getIndex()), 'Server snap not indexed');
    }
    function viewProcessorApplyOperation(viewProcessor, oldViewCache, operation, writesCache, completeCache) {
        const accumulator = new ChildChangeAccumulator();
        let newViewCache, filterServerNode;
        if (operation.type === OperationType.OVERWRITE) {
            const overwrite = operation;
            if (overwrite.source.fromUser) {
                newViewCache = viewProcessorApplyUserOverwrite(viewProcessor, oldViewCache, overwrite.path, overwrite.snap, writesCache, completeCache, accumulator);
            }
            else {
                assert(overwrite.source.fromServer, 'Unknown source.');
                // We filter the node if it's a tagged update or the node has been previously filtered  and the
                // update is not at the root in which case it is ok (and necessary) to mark the node unfiltered
                // again
                filterServerNode =
                    overwrite.source.tagged ||
                        (oldViewCache.serverCache.isFiltered() && !pathIsEmpty(overwrite.path));
                newViewCache = viewProcessorApplyServerOverwrite(viewProcessor, oldViewCache, overwrite.path, overwrite.snap, writesCache, completeCache, filterServerNode, accumulator);
            }
        }
        else if (operation.type === OperationType.MERGE) {
            const merge = operation;
            if (merge.source.fromUser) {
                newViewCache = viewProcessorApplyUserMerge(viewProcessor, oldViewCache, merge.path, merge.children, writesCache, completeCache, accumulator);
            }
            else {
                assert(merge.source.fromServer, 'Unknown source.');
                // We filter the node if it's a tagged update or the node has been previously filtered
                filterServerNode =
                    merge.source.tagged || oldViewCache.serverCache.isFiltered();
                newViewCache = viewProcessorApplyServerMerge(viewProcessor, oldViewCache, merge.path, merge.children, writesCache, completeCache, filterServerNode, accumulator);
            }
        }
        else if (operation.type === OperationType.ACK_USER_WRITE) {
            const ackUserWrite = operation;
            if (!ackUserWrite.revert) {
                newViewCache = viewProcessorAckUserWrite(viewProcessor, oldViewCache, ackUserWrite.path, ackUserWrite.affectedTree, writesCache, completeCache, accumulator);
            }
            else {
                newViewCache = viewProcessorRevertUserWrite(viewProcessor, oldViewCache, ackUserWrite.path, writesCache, completeCache, accumulator);
            }
        }
        else if (operation.type === OperationType.LISTEN_COMPLETE) {
            newViewCache = viewProcessorListenComplete(viewProcessor, oldViewCache, operation.path, writesCache, accumulator);
        }
        else {
            throw assertionError('Unknown operation type: ' + operation.type);
        }
        const changes = accumulator.getChanges();
        viewProcessorMaybeAddValueEvent(oldViewCache, newViewCache, changes);
        return { viewCache: newViewCache, changes };
    }
    function viewProcessorMaybeAddValueEvent(oldViewCache, newViewCache, accumulator) {
        const eventSnap = newViewCache.eventCache;
        if (eventSnap.isFullyInitialized()) {
            const isLeafOrEmpty = eventSnap.getNode().isLeafNode() || eventSnap.getNode().isEmpty();
            const oldCompleteSnap = viewCacheGetCompleteEventSnap(oldViewCache);
            if (accumulator.length > 0 ||
                !oldViewCache.eventCache.isFullyInitialized() ||
                (isLeafOrEmpty && !eventSnap.getNode().equals(oldCompleteSnap)) ||
                !eventSnap.getNode().getPriority().equals(oldCompleteSnap.getPriority())) {
                accumulator.push(changeValue(viewCacheGetCompleteEventSnap(newViewCache)));
            }
        }
    }
    function viewProcessorGenerateEventCacheAfterServerEvent(viewProcessor, viewCache, changePath, writesCache, source, accumulator) {
        const oldEventSnap = viewCache.eventCache;
        if (writeTreeRefShadowingWrite(writesCache, changePath) != null) {
            // we have a shadowing write, ignore changes
            return viewCache;
        }
        else {
            let newEventCache, serverNode;
            if (pathIsEmpty(changePath)) {
                // TODO: figure out how this plays with "sliding ack windows"
                assert(viewCache.serverCache.isFullyInitialized(), 'If change path is empty, we must have complete server data');
                if (viewCache.serverCache.isFiltered()) {
                    // We need to special case this, because we need to only apply writes to complete children, or
                    // we might end up raising events for incomplete children. If the server data is filtered deep
                    // writes cannot be guaranteed to be complete
                    const serverCache = viewCacheGetCompleteServerSnap(viewCache);
                    const completeChildren = serverCache instanceof ChildrenNode
                        ? serverCache
                        : ChildrenNode.EMPTY_NODE;
                    const completeEventChildren = writeTreeRefCalcCompleteEventChildren(writesCache, completeChildren);
                    newEventCache = viewProcessor.filter.updateFullNode(viewCache.eventCache.getNode(), completeEventChildren, accumulator);
                }
                else {
                    const completeNode = writeTreeRefCalcCompleteEventCache(writesCache, viewCacheGetCompleteServerSnap(viewCache));
                    newEventCache = viewProcessor.filter.updateFullNode(viewCache.eventCache.getNode(), completeNode, accumulator);
                }
            }
            else {
                const childKey = pathGetFront(changePath);
                if (childKey === '.priority') {
                    assert(pathGetLength(changePath) === 1, "Can't have a priority with additional path components");
                    const oldEventNode = oldEventSnap.getNode();
                    serverNode = viewCache.serverCache.getNode();
                    // we might have overwrites for this priority
                    const updatedPriority = writeTreeRefCalcEventCacheAfterServerOverwrite(writesCache, changePath, oldEventNode, serverNode);
                    if (updatedPriority != null) {
                        newEventCache = viewProcessor.filter.updatePriority(oldEventNode, updatedPriority);
                    }
                    else {
                        // priority didn't change, keep old node
                        newEventCache = oldEventSnap.getNode();
                    }
                }
                else {
                    const childChangePath = pathPopFront(changePath);
                    // update child
                    let newEventChild;
                    if (oldEventSnap.isCompleteForChild(childKey)) {
                        serverNode = viewCache.serverCache.getNode();
                        const eventChildUpdate = writeTreeRefCalcEventCacheAfterServerOverwrite(writesCache, changePath, oldEventSnap.getNode(), serverNode);
                        if (eventChildUpdate != null) {
                            newEventChild = oldEventSnap
                                .getNode()
                                .getImmediateChild(childKey)
                                .updateChild(childChangePath, eventChildUpdate);
                        }
                        else {
                            // Nothing changed, just keep the old child
                            newEventChild = oldEventSnap.getNode().getImmediateChild(childKey);
                        }
                    }
                    else {
                        newEventChild = writeTreeRefCalcCompleteChild(writesCache, childKey, viewCache.serverCache);
                    }
                    if (newEventChild != null) {
                        newEventCache = viewProcessor.filter.updateChild(oldEventSnap.getNode(), childKey, newEventChild, childChangePath, source, accumulator);
                    }
                    else {
                        // no complete child available or no change
                        newEventCache = oldEventSnap.getNode();
                    }
                }
            }
            return viewCacheUpdateEventSnap(viewCache, newEventCache, oldEventSnap.isFullyInitialized() || pathIsEmpty(changePath), viewProcessor.filter.filtersNodes());
        }
    }
    function viewProcessorApplyServerOverwrite(viewProcessor, oldViewCache, changePath, changedSnap, writesCache, completeCache, filterServerNode, accumulator) {
        const oldServerSnap = oldViewCache.serverCache;
        let newServerCache;
        const serverFilter = filterServerNode
            ? viewProcessor.filter
            : viewProcessor.filter.getIndexedFilter();
        if (pathIsEmpty(changePath)) {
            newServerCache = serverFilter.updateFullNode(oldServerSnap.getNode(), changedSnap, null);
        }
        else if (serverFilter.filtersNodes() && !oldServerSnap.isFiltered()) {
            // we want to filter the server node, but we didn't filter the server node yet, so simulate a full update
            const newServerNode = oldServerSnap
                .getNode()
                .updateChild(changePath, changedSnap);
            newServerCache = serverFilter.updateFullNode(oldServerSnap.getNode(), newServerNode, null);
        }
        else {
            const childKey = pathGetFront(changePath);
            if (!oldServerSnap.isCompleteForPath(changePath) &&
                pathGetLength(changePath) > 1) {
                // We don't update incomplete nodes with updates intended for other listeners
                return oldViewCache;
            }
            const childChangePath = pathPopFront(changePath);
            const childNode = oldServerSnap.getNode().getImmediateChild(childKey);
            const newChildNode = childNode.updateChild(childChangePath, changedSnap);
            if (childKey === '.priority') {
                newServerCache = serverFilter.updatePriority(oldServerSnap.getNode(), newChildNode);
            }
            else {
                newServerCache = serverFilter.updateChild(oldServerSnap.getNode(), childKey, newChildNode, childChangePath, NO_COMPLETE_CHILD_SOURCE, null);
            }
        }
        const newViewCache = viewCacheUpdateServerSnap(oldViewCache, newServerCache, oldServerSnap.isFullyInitialized() || pathIsEmpty(changePath), serverFilter.filtersNodes());
        const source = new WriteTreeCompleteChildSource(writesCache, newViewCache, completeCache);
        return viewProcessorGenerateEventCacheAfterServerEvent(viewProcessor, newViewCache, changePath, writesCache, source, accumulator);
    }
    function viewProcessorApplyUserOverwrite(viewProcessor, oldViewCache, changePath, changedSnap, writesCache, completeCache, accumulator) {
        const oldEventSnap = oldViewCache.eventCache;
        let newViewCache, newEventCache;
        const source = new WriteTreeCompleteChildSource(writesCache, oldViewCache, completeCache);
        if (pathIsEmpty(changePath)) {
            newEventCache = viewProcessor.filter.updateFullNode(oldViewCache.eventCache.getNode(), changedSnap, accumulator);
            newViewCache = viewCacheUpdateEventSnap(oldViewCache, newEventCache, true, viewProcessor.filter.filtersNodes());
        }
        else {
            const childKey = pathGetFront(changePath);
            if (childKey === '.priority') {
                newEventCache = viewProcessor.filter.updatePriority(oldViewCache.eventCache.getNode(), changedSnap);
                newViewCache = viewCacheUpdateEventSnap(oldViewCache, newEventCache, oldEventSnap.isFullyInitialized(), oldEventSnap.isFiltered());
            }
            else {
                const childChangePath = pathPopFront(changePath);
                const oldChild = oldEventSnap.getNode().getImmediateChild(childKey);
                let newChild;
                if (pathIsEmpty(childChangePath)) {
                    // Child overwrite, we can replace the child
                    newChild = changedSnap;
                }
                else {
                    const childNode = source.getCompleteChild(childKey);
                    if (childNode != null) {
                        if (pathGetBack(childChangePath) === '.priority' &&
                            childNode.getChild(pathParent(childChangePath)).isEmpty()) {
                            // This is a priority update on an empty node. If this node exists on the server, the
                            // server will send down the priority in the update, so ignore for now
                            newChild = childNode;
                        }
                        else {
                            newChild = childNode.updateChild(childChangePath, changedSnap);
                        }
                    }
                    else {
                        // There is no complete child node available
                        newChild = ChildrenNode.EMPTY_NODE;
                    }
                }
                if (!oldChild.equals(newChild)) {
                    const newEventSnap = viewProcessor.filter.updateChild(oldEventSnap.getNode(), childKey, newChild, childChangePath, source, accumulator);
                    newViewCache = viewCacheUpdateEventSnap(oldViewCache, newEventSnap, oldEventSnap.isFullyInitialized(), viewProcessor.filter.filtersNodes());
                }
                else {
                    newViewCache = oldViewCache;
                }
            }
        }
        return newViewCache;
    }
    function viewProcessorCacheHasChild(viewCache, childKey) {
        return viewCache.eventCache.isCompleteForChild(childKey);
    }
    function viewProcessorApplyUserMerge(viewProcessor, viewCache, path, changedChildren, writesCache, serverCache, accumulator) {
        // HACK: In the case of a limit query, there may be some changes that bump things out of the
        // window leaving room for new items.  It's important we process these changes first, so we
        // iterate the changes twice, first processing any that affect items currently in view.
        // TODO: I consider an item "in view" if cacheHasChild is true, which checks both the server
        // and event snap.  I'm not sure if this will result in edge cases when a child is in one but
        // not the other.
        let curViewCache = viewCache;
        changedChildren.foreach((relativePath, childNode) => {
            const writePath = pathChild(path, relativePath);
            if (viewProcessorCacheHasChild(viewCache, pathGetFront(writePath))) {
                curViewCache = viewProcessorApplyUserOverwrite(viewProcessor, curViewCache, writePath, childNode, writesCache, serverCache, accumulator);
            }
        });
        changedChildren.foreach((relativePath, childNode) => {
            const writePath = pathChild(path, relativePath);
            if (!viewProcessorCacheHasChild(viewCache, pathGetFront(writePath))) {
                curViewCache = viewProcessorApplyUserOverwrite(viewProcessor, curViewCache, writePath, childNode, writesCache, serverCache, accumulator);
            }
        });
        return curViewCache;
    }
    function viewProcessorApplyMerge(viewProcessor, node, merge) {
        merge.foreach((relativePath, childNode) => {
            node = node.updateChild(relativePath, childNode);
        });
        return node;
    }
    function viewProcessorApplyServerMerge(viewProcessor, viewCache, path, changedChildren, writesCache, serverCache, filterServerNode, accumulator) {
        // If we don't have a cache yet, this merge was intended for a previously listen in the same location. Ignore it and
        // wait for the complete data update coming soon.
        if (viewCache.serverCache.getNode().isEmpty() &&
            !viewCache.serverCache.isFullyInitialized()) {
            return viewCache;
        }
        // HACK: In the case of a limit query, there may be some changes that bump things out of the
        // window leaving room for new items.  It's important we process these changes first, so we
        // iterate the changes twice, first processing any that affect items currently in view.
        // TODO: I consider an item "in view" if cacheHasChild is true, which checks both the server
        // and event snap.  I'm not sure if this will result in edge cases when a child is in one but
        // not the other.
        let curViewCache = viewCache;
        let viewMergeTree;
        if (pathIsEmpty(path)) {
            viewMergeTree = changedChildren;
        }
        else {
            viewMergeTree = new ImmutableTree(null).setTree(path, changedChildren);
        }
        const serverNode = viewCache.serverCache.getNode();
        viewMergeTree.children.inorderTraversal((childKey, childTree) => {
            if (serverNode.hasChild(childKey)) {
                const serverChild = viewCache.serverCache
                    .getNode()
                    .getImmediateChild(childKey);
                const newChild = viewProcessorApplyMerge(viewProcessor, serverChild, childTree);
                curViewCache = viewProcessorApplyServerOverwrite(viewProcessor, curViewCache, new Path(childKey), newChild, writesCache, serverCache, filterServerNode, accumulator);
            }
        });
        viewMergeTree.children.inorderTraversal((childKey, childMergeTree) => {
            const isUnknownDeepMerge = !viewCache.serverCache.isCompleteForChild(childKey) &&
                childMergeTree.value === undefined;
            if (!serverNode.hasChild(childKey) && !isUnknownDeepMerge) {
                const serverChild = viewCache.serverCache
                    .getNode()
                    .getImmediateChild(childKey);
                const newChild = viewProcessorApplyMerge(viewProcessor, serverChild, childMergeTree);
                curViewCache = viewProcessorApplyServerOverwrite(viewProcessor, curViewCache, new Path(childKey), newChild, writesCache, serverCache, filterServerNode, accumulator);
            }
        });
        return curViewCache;
    }
    function viewProcessorAckUserWrite(viewProcessor, viewCache, ackPath, affectedTree, writesCache, completeCache, accumulator) {
        if (writeTreeRefShadowingWrite(writesCache, ackPath) != null) {
            return viewCache;
        }
        // Only filter server node if it is currently filtered
        const filterServerNode = viewCache.serverCache.isFiltered();
        // Essentially we'll just get our existing server cache for the affected paths and re-apply it as a server update
        // now that it won't be shadowed.
        const serverCache = viewCache.serverCache;
        if (affectedTree.value != null) {
            // This is an overwrite.
            if ((pathIsEmpty(ackPath) && serverCache.isFullyInitialized()) ||
                serverCache.isCompleteForPath(ackPath)) {
                return viewProcessorApplyServerOverwrite(viewProcessor, viewCache, ackPath, serverCache.getNode().getChild(ackPath), writesCache, completeCache, filterServerNode, accumulator);
            }
            else if (pathIsEmpty(ackPath)) {
                // This is a goofy edge case where we are acking data at this location but don't have full data.  We
                // should just re-apply whatever we have in our cache as a merge.
                let changedChildren = new ImmutableTree(null);
                serverCache.getNode().forEachChild(KEY_INDEX, (name, node) => {
                    changedChildren = changedChildren.set(new Path(name), node);
                });
                return viewProcessorApplyServerMerge(viewProcessor, viewCache, ackPath, changedChildren, writesCache, completeCache, filterServerNode, accumulator);
            }
            else {
                return viewCache;
            }
        }
        else {
            // This is a merge.
            let changedChildren = new ImmutableTree(null);
            affectedTree.foreach((mergePath, value) => {
                const serverCachePath = pathChild(ackPath, mergePath);
                if (serverCache.isCompleteForPath(serverCachePath)) {
                    changedChildren = changedChildren.set(mergePath, serverCache.getNode().getChild(serverCachePath));
                }
            });
            return viewProcessorApplyServerMerge(viewProcessor, viewCache, ackPath, changedChildren, writesCache, completeCache, filterServerNode, accumulator);
        }
    }
    function viewProcessorListenComplete(viewProcessor, viewCache, path, writesCache, accumulator) {
        const oldServerNode = viewCache.serverCache;
        const newViewCache = viewCacheUpdateServerSnap(viewCache, oldServerNode.getNode(), oldServerNode.isFullyInitialized() || pathIsEmpty(path), oldServerNode.isFiltered());
        return viewProcessorGenerateEventCacheAfterServerEvent(viewProcessor, newViewCache, path, writesCache, NO_COMPLETE_CHILD_SOURCE, accumulator);
    }
    function viewProcessorRevertUserWrite(viewProcessor, viewCache, path, writesCache, completeServerCache, accumulator) {
        let complete;
        if (writeTreeRefShadowingWrite(writesCache, path) != null) {
            return viewCache;
        }
        else {
            const source = new WriteTreeCompleteChildSource(writesCache, viewCache, completeServerCache);
            const oldEventCache = viewCache.eventCache.getNode();
            let newEventCache;
            if (pathIsEmpty(path) || pathGetFront(path) === '.priority') {
                let newNode;
                if (viewCache.serverCache.isFullyInitialized()) {
                    newNode = writeTreeRefCalcCompleteEventCache(writesCache, viewCacheGetCompleteServerSnap(viewCache));
                }
                else {
                    const serverChildren = viewCache.serverCache.getNode();
                    assert(serverChildren instanceof ChildrenNode, 'serverChildren would be complete if leaf node');
                    newNode = writeTreeRefCalcCompleteEventChildren(writesCache, serverChildren);
                }
                newNode = newNode;
                newEventCache = viewProcessor.filter.updateFullNode(oldEventCache, newNode, accumulator);
            }
            else {
                const childKey = pathGetFront(path);
                let newChild = writeTreeRefCalcCompleteChild(writesCache, childKey, viewCache.serverCache);
                if (newChild == null &&
                    viewCache.serverCache.isCompleteForChild(childKey)) {
                    newChild = oldEventCache.getImmediateChild(childKey);
                }
                if (newChild != null) {
                    newEventCache = viewProcessor.filter.updateChild(oldEventCache, childKey, newChild, pathPopFront(path), source, accumulator);
                }
                else if (viewCache.eventCache.getNode().hasChild(childKey)) {
                    // No complete child available, delete the existing one, if any
                    newEventCache = viewProcessor.filter.updateChild(oldEventCache, childKey, ChildrenNode.EMPTY_NODE, pathPopFront(path), source, accumulator);
                }
                else {
                    newEventCache = oldEventCache;
                }
                if (newEventCache.isEmpty() &&
                    viewCache.serverCache.isFullyInitialized()) {
                    // We might have reverted all child writes. Maybe the old event was a leaf node
                    complete = writeTreeRefCalcCompleteEventCache(writesCache, viewCacheGetCompleteServerSnap(viewCache));
                    if (complete.isLeafNode()) {
                        newEventCache = viewProcessor.filter.updateFullNode(newEventCache, complete, accumulator);
                    }
                }
            }
            complete =
                viewCache.serverCache.isFullyInitialized() ||
                    writeTreeRefShadowingWrite(writesCache, newEmptyPath()) != null;
            return viewCacheUpdateEventSnap(viewCache, newEventCache, complete, viewProcessor.filter.filtersNodes());
        }
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * A view represents a specific location and query that has 1 or more event registrations.
     *
     * It does several things:
     *  - Maintains the list of event registrations for this location/query.
     *  - Maintains a cache of the data visible for this location/query.
     *  - Applies new operations (via applyOperation), updates the cache, and based on the event
     *    registrations returns the set of events to be raised.
     */
    class View {
        constructor(query_, initialViewCache) {
            this.query_ = query_;
            this.eventRegistrations_ = [];
            const params = this.query_._queryParams;
            const indexFilter = new IndexedFilter(params.getIndex());
            const filter = queryParamsGetNodeFilter(params);
            this.processor_ = newViewProcessor(filter);
            const initialServerCache = initialViewCache.serverCache;
            const initialEventCache = initialViewCache.eventCache;
            // Don't filter server node with other filter than index, wait for tagged listen
            const serverSnap = indexFilter.updateFullNode(ChildrenNode.EMPTY_NODE, initialServerCache.getNode(), null);
            const eventSnap = filter.updateFullNode(ChildrenNode.EMPTY_NODE, initialEventCache.getNode(), null);
            const newServerCache = new CacheNode(serverSnap, initialServerCache.isFullyInitialized(), indexFilter.filtersNodes());
            const newEventCache = new CacheNode(eventSnap, initialEventCache.isFullyInitialized(), filter.filtersNodes());
            this.viewCache_ = newViewCache(newEventCache, newServerCache);
            this.eventGenerator_ = new EventGenerator(this.query_);
        }
        get query() {
            return this.query_;
        }
    }
    function viewGetServerCache(view) {
        return view.viewCache_.serverCache.getNode();
    }
    function viewGetCompleteNode(view) {
        return viewCacheGetCompleteEventSnap(view.viewCache_);
    }
    function viewGetCompleteServerCache(view, path) {
        const cache = viewCacheGetCompleteServerSnap(view.viewCache_);
        if (cache) {
            // If this isn't a "loadsAllData" view, then cache isn't actually a complete cache and
            // we need to see if it contains the child we're interested in.
            if (view.query._queryParams.loadsAllData() ||
                (!pathIsEmpty(path) &&
                    !cache.getImmediateChild(pathGetFront(path)).isEmpty())) {
                return cache.getChild(path);
            }
        }
        return null;
    }
    function viewIsEmpty(view) {
        return view.eventRegistrations_.length === 0;
    }
    function viewAddEventRegistration(view, eventRegistration) {
        view.eventRegistrations_.push(eventRegistration);
    }
    /**
     * @param eventRegistration - If null, remove all callbacks.
     * @param cancelError - If a cancelError is provided, appropriate cancel events will be returned.
     * @returns Cancel events, if cancelError was provided.
     */
    function viewRemoveEventRegistration(view, eventRegistration, cancelError) {
        const cancelEvents = [];
        if (cancelError) {
            assert(eventRegistration == null, 'A cancel should cancel all event registrations.');
            const path = view.query._path;
            view.eventRegistrations_.forEach(registration => {
                const maybeEvent = registration.createCancelEvent(cancelError, path);
                if (maybeEvent) {
                    cancelEvents.push(maybeEvent);
                }
            });
        }
        if (eventRegistration) {
            let remaining = [];
            for (let i = 0; i < view.eventRegistrations_.length; ++i) {
                const existing = view.eventRegistrations_[i];
                if (!existing.matches(eventRegistration)) {
                    remaining.push(existing);
                }
                else if (eventRegistration.hasAnyCallback()) {
                    // We're removing just this one
                    remaining = remaining.concat(view.eventRegistrations_.slice(i + 1));
                    break;
                }
            }
            view.eventRegistrations_ = remaining;
        }
        else {
            view.eventRegistrations_ = [];
        }
        return cancelEvents;
    }
    /**
     * Applies the given Operation, updates our cache, and returns the appropriate events.
     */
    function viewApplyOperation(view, operation, writesCache, completeServerCache) {
        if (operation.type === OperationType.MERGE &&
            operation.source.queryId !== null) {
            assert(viewCacheGetCompleteServerSnap(view.viewCache_), 'We should always have a full cache before handling merges');
            assert(viewCacheGetCompleteEventSnap(view.viewCache_), 'Missing event cache, even though we have a server cache');
        }
        const oldViewCache = view.viewCache_;
        const result = viewProcessorApplyOperation(view.processor_, oldViewCache, operation, writesCache, completeServerCache);
        viewProcessorAssertIndexed(view.processor_, result.viewCache);
        assert(result.viewCache.serverCache.isFullyInitialized() ||
            !oldViewCache.serverCache.isFullyInitialized(), 'Once a server snap is complete, it should never go back');
        view.viewCache_ = result.viewCache;
        return viewGenerateEventsForChanges_(view, result.changes, result.viewCache.eventCache.getNode(), null);
    }
    function viewGetInitialEvents(view, registration) {
        const eventSnap = view.viewCache_.eventCache;
        const initialChanges = [];
        if (!eventSnap.getNode().isLeafNode()) {
            const eventNode = eventSnap.getNode();
            eventNode.forEachChild(PRIORITY_INDEX, (key, childNode) => {
                initialChanges.push(changeChildAdded(key, childNode));
            });
        }
        if (eventSnap.isFullyInitialized()) {
            initialChanges.push(changeValue(eventSnap.getNode()));
        }
        return viewGenerateEventsForChanges_(view, initialChanges, eventSnap.getNode(), registration);
    }
    function viewGenerateEventsForChanges_(view, changes, eventCache, eventRegistration) {
        const registrations = eventRegistration
            ? [eventRegistration]
            : view.eventRegistrations_;
        return eventGeneratorGenerateEventsForChanges(view.eventGenerator_, changes, eventCache, registrations);
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    let referenceConstructor$1;
    /**
     * SyncPoint represents a single location in a SyncTree with 1 or more event registrations, meaning we need to
     * maintain 1 or more Views at this location to cache server data and raise appropriate events for server changes
     * and user writes (set, transaction, update).
     *
     * It's responsible for:
     *  - Maintaining the set of 1 or more views necessary at this location (a SyncPoint with 0 views should be removed).
     *  - Proxying user / server operations to the views as appropriate (i.e. applyServerOverwrite,
     *    applyUserOverwrite, etc.)
     */
    class SyncPoint {
        constructor() {
            /**
             * The Views being tracked at this location in the tree, stored as a map where the key is a
             * queryId and the value is the View for that query.
             *
             * NOTE: This list will be quite small (usually 1, but perhaps 2 or 3; any more is an odd use case).
             */
            this.views = new Map();
        }
    }
    function syncPointSetReferenceConstructor(val) {
        assert(!referenceConstructor$1, '__referenceConstructor has already been defined');
        referenceConstructor$1 = val;
    }
    function syncPointGetReferenceConstructor() {
        assert(referenceConstructor$1, 'Reference.ts has not been loaded');
        return referenceConstructor$1;
    }
    function syncPointIsEmpty(syncPoint) {
        return syncPoint.views.size === 0;
    }
    function syncPointApplyOperation(syncPoint, operation, writesCache, optCompleteServerCache) {
        const queryId = operation.source.queryId;
        if (queryId !== null) {
            const view = syncPoint.views.get(queryId);
            assert(view != null, 'SyncTree gave us an op for an invalid query.');
            return viewApplyOperation(view, operation, writesCache, optCompleteServerCache);
        }
        else {
            let events = [];
            for (const view of syncPoint.views.values()) {
                events = events.concat(viewApplyOperation(view, operation, writesCache, optCompleteServerCache));
            }
            return events;
        }
    }
    /**
     * Get a view for the specified query.
     *
     * @param query - The query to return a view for
     * @param writesCache
     * @param serverCache
     * @param serverCacheComplete
     * @returns Events to raise.
     */
    function syncPointGetView(syncPoint, query, writesCache, serverCache, serverCacheComplete) {
        const queryId = query._queryIdentifier;
        const view = syncPoint.views.get(queryId);
        if (!view) {
            // TODO: make writesCache take flag for complete server node
            let eventCache = writeTreeRefCalcCompleteEventCache(writesCache, serverCacheComplete ? serverCache : null);
            let eventCacheComplete = false;
            if (eventCache) {
                eventCacheComplete = true;
            }
            else if (serverCache instanceof ChildrenNode) {
                eventCache = writeTreeRefCalcCompleteEventChildren(writesCache, serverCache);
                eventCacheComplete = false;
            }
            else {
                eventCache = ChildrenNode.EMPTY_NODE;
                eventCacheComplete = false;
            }
            const viewCache = newViewCache(new CacheNode(eventCache, eventCacheComplete, false), new CacheNode(serverCache, serverCacheComplete, false));
            return new View(query, viewCache);
        }
        return view;
    }
    /**
     * Add an event callback for the specified query.
     *
     * @param query
     * @param eventRegistration
     * @param writesCache
     * @param serverCache - Complete server cache, if we have it.
     * @param serverCacheComplete
     * @returns Events to raise.
     */
    function syncPointAddEventRegistration(syncPoint, query, eventRegistration, writesCache, serverCache, serverCacheComplete) {
        const view = syncPointGetView(syncPoint, query, writesCache, serverCache, serverCacheComplete);
        if (!syncPoint.views.has(query._queryIdentifier)) {
            syncPoint.views.set(query._queryIdentifier, view);
        }
        // This is guaranteed to exist now, we just created anything that was missing
        viewAddEventRegistration(view, eventRegistration);
        return viewGetInitialEvents(view, eventRegistration);
    }
    /**
     * Remove event callback(s).  Return cancelEvents if a cancelError is specified.
     *
     * If query is the default query, we'll check all views for the specified eventRegistration.
     * If eventRegistration is null, we'll remove all callbacks for the specified view(s).
     *
     * @param eventRegistration - If null, remove all callbacks.
     * @param cancelError - If a cancelError is provided, appropriate cancel events will be returned.
     * @returns removed queries and any cancel events
     */
    function syncPointRemoveEventRegistration(syncPoint, query, eventRegistration, cancelError) {
        const queryId = query._queryIdentifier;
        const removed = [];
        let cancelEvents = [];
        const hadCompleteView = syncPointHasCompleteView(syncPoint);
        if (queryId === 'default') {
            // When you do ref.off(...), we search all views for the registration to remove.
            for (const [viewQueryId, view] of syncPoint.views.entries()) {
                cancelEvents = cancelEvents.concat(viewRemoveEventRegistration(view, eventRegistration, cancelError));
                if (viewIsEmpty(view)) {
                    syncPoint.views.delete(viewQueryId);
                    // We'll deal with complete views later.
                    if (!view.query._queryParams.loadsAllData()) {
                        removed.push(view.query);
                    }
                }
            }
        }
        else {
            // remove the callback from the specific view.
            const view = syncPoint.views.get(queryId);
            if (view) {
                cancelEvents = cancelEvents.concat(viewRemoveEventRegistration(view, eventRegistration, cancelError));
                if (viewIsEmpty(view)) {
                    syncPoint.views.delete(queryId);
                    // We'll deal with complete views later.
                    if (!view.query._queryParams.loadsAllData()) {
                        removed.push(view.query);
                    }
                }
            }
        }
        if (hadCompleteView && !syncPointHasCompleteView(syncPoint)) {
            // We removed our last complete view.
            removed.push(new (syncPointGetReferenceConstructor())(query._repo, query._path));
        }
        return { removed, events: cancelEvents };
    }
    function syncPointGetQueryViews(syncPoint) {
        const result = [];
        for (const view of syncPoint.views.values()) {
            if (!view.query._queryParams.loadsAllData()) {
                result.push(view);
            }
        }
        return result;
    }
    /**
     * @param path - The path to the desired complete snapshot
     * @returns A complete cache, if it exists
     */
    function syncPointGetCompleteServerCache(syncPoint, path) {
        let serverCache = null;
        for (const view of syncPoint.views.values()) {
            serverCache = serverCache || viewGetCompleteServerCache(view, path);
        }
        return serverCache;
    }
    function syncPointViewForQuery(syncPoint, query) {
        const params = query._queryParams;
        if (params.loadsAllData()) {
            return syncPointGetCompleteView(syncPoint);
        }
        else {
            const queryId = query._queryIdentifier;
            return syncPoint.views.get(queryId);
        }
    }
    function syncPointViewExistsForQuery(syncPoint, query) {
        return syncPointViewForQuery(syncPoint, query) != null;
    }
    function syncPointHasCompleteView(syncPoint) {
        return syncPointGetCompleteView(syncPoint) != null;
    }
    function syncPointGetCompleteView(syncPoint) {
        for (const view of syncPoint.views.values()) {
            if (view.query._queryParams.loadsAllData()) {
                return view;
            }
        }
        return null;
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    let referenceConstructor;
    function syncTreeSetReferenceConstructor(val) {
        assert(!referenceConstructor, '__referenceConstructor has already been defined');
        referenceConstructor = val;
    }
    function syncTreeGetReferenceConstructor() {
        assert(referenceConstructor, 'Reference.ts has not been loaded');
        return referenceConstructor;
    }
    /**
     * Static tracker for next query tag.
     */
    let syncTreeNextQueryTag_ = 1;
    /**
     * SyncTree is the central class for managing event callback registration, data caching, views
     * (query processing), and event generation.  There are typically two SyncTree instances for
     * each Repo, one for the normal Firebase data, and one for the .info data.
     *
     * It has a number of responsibilities, including:
     *  - Tracking all user event callbacks (registered via addEventRegistration() and removeEventRegistration()).
     *  - Applying and caching data changes for user set(), transaction(), and update() calls
     *    (applyUserOverwrite(), applyUserMerge()).
     *  - Applying and caching data changes for server data changes (applyServerOverwrite(),
     *    applyServerMerge()).
     *  - Generating user-facing events for server and user changes (all of the apply* methods
     *    return the set of events that need to be raised as a result).
     *  - Maintaining the appropriate set of server listens to ensure we are always subscribed
     *    to the correct set of paths and queries to satisfy the current set of user event
     *    callbacks (listens are started/stopped using the provided listenProvider).
     *
     * NOTE: Although SyncTree tracks event callbacks and calculates events to raise, the actual
     * events are returned to the caller rather than raised synchronously.
     *
     */
    class SyncTree {
        /**
         * @param listenProvider_ - Used by SyncTree to start / stop listening
         *   to server data.
         */
        constructor(listenProvider_) {
            this.listenProvider_ = listenProvider_;
            /**
             * Tree of SyncPoints.  There's a SyncPoint at any location that has 1 or more views.
             */
            this.syncPointTree_ = new ImmutableTree(null);
            /**
             * A tree of all pending user writes (user-initiated set()'s, transaction()'s, update()'s, etc.).
             */
            this.pendingWriteTree_ = newWriteTree();
            this.tagToQueryMap = new Map();
            this.queryToTagMap = new Map();
        }
    }
    /**
     * Apply the data changes for a user-generated set() or transaction() call.
     *
     * @returns Events to raise.
     */
    function syncTreeApplyUserOverwrite(syncTree, path, newData, writeId, visible) {
        // Record pending write.
        writeTreeAddOverwrite(syncTree.pendingWriteTree_, path, newData, writeId, visible);
        if (!visible) {
            return [];
        }
        else {
            return syncTreeApplyOperationToSyncPoints_(syncTree, new Overwrite(newOperationSourceUser(), path, newData));
        }
    }
    /**
     * Acknowledge a pending user write that was previously registered with applyUserOverwrite() or applyUserMerge().
     *
     * @param revert - True if the given write failed and needs to be reverted
     * @returns Events to raise.
     */
    function syncTreeAckUserWrite(syncTree, writeId, revert = false) {
        const write = writeTreeGetWrite(syncTree.pendingWriteTree_, writeId);
        const needToReevaluate = writeTreeRemoveWrite(syncTree.pendingWriteTree_, writeId);
        if (!needToReevaluate) {
            return [];
        }
        else {
            let affectedTree = new ImmutableTree(null);
            if (write.snap != null) {
                // overwrite
                affectedTree = affectedTree.set(newEmptyPath(), true);
            }
            else {
                each(write.children, (pathString) => {
                    affectedTree = affectedTree.set(new Path(pathString), true);
                });
            }
            return syncTreeApplyOperationToSyncPoints_(syncTree, new AckUserWrite(write.path, affectedTree, revert));
        }
    }
    /**
     * Apply new server data for the specified path..
     *
     * @returns Events to raise.
     */
    function syncTreeApplyServerOverwrite(syncTree, path, newData) {
        return syncTreeApplyOperationToSyncPoints_(syncTree, new Overwrite(newOperationSourceServer(), path, newData));
    }
    /**
     * Apply new server data to be merged in at the specified path.
     *
     * @returns Events to raise.
     */
    function syncTreeApplyServerMerge(syncTree, path, changedChildren) {
        const changeTree = ImmutableTree.fromObject(changedChildren);
        return syncTreeApplyOperationToSyncPoints_(syncTree, new Merge(newOperationSourceServer(), path, changeTree));
    }
    /**
     * Apply a listen complete for a query
     *
     * @returns Events to raise.
     */
    function syncTreeApplyListenComplete(syncTree, path) {
        return syncTreeApplyOperationToSyncPoints_(syncTree, new ListenComplete(newOperationSourceServer(), path));
    }
    /**
     * Apply a listen complete for a tagged query
     *
     * @returns Events to raise.
     */
    function syncTreeApplyTaggedListenComplete(syncTree, path, tag) {
        const queryKey = syncTreeQueryKeyForTag_(syncTree, tag);
        if (queryKey) {
            const r = syncTreeParseQueryKey_(queryKey);
            const queryPath = r.path, queryId = r.queryId;
            const relativePath = newRelativePath(queryPath, path);
            const op = new ListenComplete(newOperationSourceServerTaggedQuery(queryId), relativePath);
            return syncTreeApplyTaggedOperation_(syncTree, queryPath, op);
        }
        else {
            // We've already removed the query. No big deal, ignore the update
            return [];
        }
    }
    /**
     * Remove event callback(s).
     *
     * If query is the default query, we'll check all queries for the specified eventRegistration.
     * If eventRegistration is null, we'll remove all callbacks for the specified query/queries.
     *
     * @param eventRegistration - If null, all callbacks are removed.
     * @param cancelError - If a cancelError is provided, appropriate cancel events will be returned.
     * @returns Cancel events, if cancelError was provided.
     */
    function syncTreeRemoveEventRegistration(syncTree, query, eventRegistration, cancelError) {
        // Find the syncPoint first. Then deal with whether or not it has matching listeners
        const path = query._path;
        const maybeSyncPoint = syncTree.syncPointTree_.get(path);
        let cancelEvents = [];
        // A removal on a default query affects all queries at that location. A removal on an indexed query, even one without
        // other query constraints, does *not* affect all queries at that location. So this check must be for 'default', and
        // not loadsAllData().
        if (maybeSyncPoint &&
            (query._queryIdentifier === 'default' ||
                syncPointViewExistsForQuery(maybeSyncPoint, query))) {
            const removedAndEvents = syncPointRemoveEventRegistration(maybeSyncPoint, query, eventRegistration, cancelError);
            if (syncPointIsEmpty(maybeSyncPoint)) {
                syncTree.syncPointTree_ = syncTree.syncPointTree_.remove(path);
            }
            const removed = removedAndEvents.removed;
            cancelEvents = removedAndEvents.events;
            // We may have just removed one of many listeners and can short-circuit this whole process
            // We may also not have removed a default listener, in which case all of the descendant listeners should already be
            // properly set up.
            //
            // Since indexed queries can shadow if they don't have other query constraints, check for loadsAllData(), instead of
            // queryId === 'default'
            const removingDefault = -1 !==
                removed.findIndex(query => {
                    return query._queryParams.loadsAllData();
                });
            const covered = syncTree.syncPointTree_.findOnPath(path, (relativePath, parentSyncPoint) => syncPointHasCompleteView(parentSyncPoint));
            if (removingDefault && !covered) {
                const subtree = syncTree.syncPointTree_.subtree(path);
                // There are potentially child listeners. Determine what if any listens we need to send before executing the
                // removal
                if (!subtree.isEmpty()) {
                    // We need to fold over our subtree and collect the listeners to send
                    const newViews = syncTreeCollectDistinctViewsForSubTree_(subtree);
                    // Ok, we've collected all the listens we need. Set them up.
                    for (let i = 0; i < newViews.length; ++i) {
                        const view = newViews[i], newQuery = view.query;
                        const listener = syncTreeCreateListenerForView_(syncTree, view);
                        syncTree.listenProvider_.startListening(syncTreeQueryForListening_(newQuery), syncTreeTagForQuery_(syncTree, newQuery), listener.hashFn, listener.onComplete);
                    }
                }
            }
            // If we removed anything and we're not covered by a higher up listen, we need to stop listening on this query
            // The above block has us covered in terms of making sure we're set up on listens lower in the tree.
            // Also, note that if we have a cancelError, it's already been removed at the provider level.
            if (!covered && removed.length > 0 && !cancelError) {
                // If we removed a default, then we weren't listening on any of the other queries here. Just cancel the one
                // default. Otherwise, we need to iterate through and cancel each individual query
                if (removingDefault) {
                    // We don't tag default listeners
                    const defaultTag = null;
                    syncTree.listenProvider_.stopListening(syncTreeQueryForListening_(query), defaultTag);
                }
                else {
                    removed.forEach((queryToRemove) => {
                        const tagToRemove = syncTree.queryToTagMap.get(syncTreeMakeQueryKey_(queryToRemove));
                        syncTree.listenProvider_.stopListening(syncTreeQueryForListening_(queryToRemove), tagToRemove);
                    });
                }
            }
            // Now, clear all of the tags we're tracking for the removed listens
            syncTreeRemoveTags_(syncTree, removed);
        }
        return cancelEvents;
    }
    /**
     * Apply new server data for the specified tagged query.
     *
     * @returns Events to raise.
     */
    function syncTreeApplyTaggedQueryOverwrite(syncTree, path, snap, tag) {
        const queryKey = syncTreeQueryKeyForTag_(syncTree, tag);
        if (queryKey != null) {
            const r = syncTreeParseQueryKey_(queryKey);
            const queryPath = r.path, queryId = r.queryId;
            const relativePath = newRelativePath(queryPath, path);
            const op = new Overwrite(newOperationSourceServerTaggedQuery(queryId), relativePath, snap);
            return syncTreeApplyTaggedOperation_(syncTree, queryPath, op);
        }
        else {
            // Query must have been removed already
            return [];
        }
    }
    /**
     * Apply server data to be merged in for the specified tagged query.
     *
     * @returns Events to raise.
     */
    function syncTreeApplyTaggedQueryMerge(syncTree, path, changedChildren, tag) {
        const queryKey = syncTreeQueryKeyForTag_(syncTree, tag);
        if (queryKey) {
            const r = syncTreeParseQueryKey_(queryKey);
            const queryPath = r.path, queryId = r.queryId;
            const relativePath = newRelativePath(queryPath, path);
            const changeTree = ImmutableTree.fromObject(changedChildren);
            const op = new Merge(newOperationSourceServerTaggedQuery(queryId), relativePath, changeTree);
            return syncTreeApplyTaggedOperation_(syncTree, queryPath, op);
        }
        else {
            // We've already removed the query. No big deal, ignore the update
            return [];
        }
    }
    /**
     * Add an event callback for the specified query.
     *
     * @returns Events to raise.
     */
    function syncTreeAddEventRegistration(syncTree, query, eventRegistration) {
        const path = query._path;
        let serverCache = null;
        let foundAncestorDefaultView = false;
        // Any covering writes will necessarily be at the root, so really all we need to find is the server cache.
        // Consider optimizing this once there's a better understanding of what actual behavior will be.
        syncTree.syncPointTree_.foreachOnPath(path, (pathToSyncPoint, sp) => {
            const relativePath = newRelativePath(pathToSyncPoint, path);
            serverCache =
                serverCache || syncPointGetCompleteServerCache(sp, relativePath);
            foundAncestorDefaultView =
                foundAncestorDefaultView || syncPointHasCompleteView(sp);
        });
        let syncPoint = syncTree.syncPointTree_.get(path);
        if (!syncPoint) {
            syncPoint = new SyncPoint();
            syncTree.syncPointTree_ = syncTree.syncPointTree_.set(path, syncPoint);
        }
        else {
            foundAncestorDefaultView =
                foundAncestorDefaultView || syncPointHasCompleteView(syncPoint);
            serverCache =
                serverCache || syncPointGetCompleteServerCache(syncPoint, newEmptyPath());
        }
        let serverCacheComplete;
        if (serverCache != null) {
            serverCacheComplete = true;
        }
        else {
            serverCacheComplete = false;
            serverCache = ChildrenNode.EMPTY_NODE;
            const subtree = syncTree.syncPointTree_.subtree(path);
            subtree.foreachChild((childName, childSyncPoint) => {
                const completeCache = syncPointGetCompleteServerCache(childSyncPoint, newEmptyPath());
                if (completeCache) {
                    serverCache = serverCache.updateImmediateChild(childName, completeCache);
                }
            });
        }
        const viewAlreadyExists = syncPointViewExistsForQuery(syncPoint, query);
        if (!viewAlreadyExists && !query._queryParams.loadsAllData()) {
            // We need to track a tag for this query
            const queryKey = syncTreeMakeQueryKey_(query);
            assert(!syncTree.queryToTagMap.has(queryKey), 'View does not exist, but we have a tag');
            const tag = syncTreeGetNextQueryTag_();
            syncTree.queryToTagMap.set(queryKey, tag);
            syncTree.tagToQueryMap.set(tag, queryKey);
        }
        const writesCache = writeTreeChildWrites(syncTree.pendingWriteTree_, path);
        let events = syncPointAddEventRegistration(syncPoint, query, eventRegistration, writesCache, serverCache, serverCacheComplete);
        if (!viewAlreadyExists && !foundAncestorDefaultView) {
            const view = syncPointViewForQuery(syncPoint, query);
            events = events.concat(syncTreeSetupListener_(syncTree, query, view));
        }
        return events;
    }
    /**
     * Returns a complete cache, if we have one, of the data at a particular path. If the location does not have a
     * listener above it, we will get a false "null". This shouldn't be a problem because transactions will always
     * have a listener above, and atomic operations would correctly show a jitter of <increment value> ->
     *     <incremented total> as the write is applied locally and then acknowledged at the server.
     *
     * Note: this method will *include* hidden writes from transaction with applyLocally set to false.
     *
     * @param path - The path to the data we want
     * @param writeIdsToExclude - A specific set to be excluded
     */
    function syncTreeCalcCompleteEventCache(syncTree, path, writeIdsToExclude) {
        const includeHiddenSets = true;
        const writeTree = syncTree.pendingWriteTree_;
        const serverCache = syncTree.syncPointTree_.findOnPath(path, (pathSoFar, syncPoint) => {
            const relativePath = newRelativePath(pathSoFar, path);
            const serverCache = syncPointGetCompleteServerCache(syncPoint, relativePath);
            if (serverCache) {
                return serverCache;
            }
        });
        return writeTreeCalcCompleteEventCache(writeTree, path, serverCache, writeIdsToExclude, includeHiddenSets);
    }
    function syncTreeGetServerValue(syncTree, query) {
        const path = query._path;
        let serverCache = null;
        // Any covering writes will necessarily be at the root, so really all we need to find is the server cache.
        // Consider optimizing this once there's a better understanding of what actual behavior will be.
        syncTree.syncPointTree_.foreachOnPath(path, (pathToSyncPoint, sp) => {
            const relativePath = newRelativePath(pathToSyncPoint, path);
            serverCache =
                serverCache || syncPointGetCompleteServerCache(sp, relativePath);
        });
        let syncPoint = syncTree.syncPointTree_.get(path);
        if (!syncPoint) {
            syncPoint = new SyncPoint();
            syncTree.syncPointTree_ = syncTree.syncPointTree_.set(path, syncPoint);
        }
        else {
            serverCache =
                serverCache || syncPointGetCompleteServerCache(syncPoint, newEmptyPath());
        }
        const serverCacheComplete = serverCache != null;
        const serverCacheNode = serverCacheComplete
            ? new CacheNode(serverCache, true, false)
            : null;
        const writesCache = writeTreeChildWrites(syncTree.pendingWriteTree_, query._path);
        const view = syncPointGetView(syncPoint, query, writesCache, serverCacheComplete ? serverCacheNode.getNode() : ChildrenNode.EMPTY_NODE, serverCacheComplete);
        return viewGetCompleteNode(view);
    }
    /**
     * A helper method that visits all descendant and ancestor SyncPoints, applying the operation.
     *
     * NOTES:
     * - Descendant SyncPoints will be visited first (since we raise events depth-first).
     *
     * - We call applyOperation() on each SyncPoint passing three things:
     *   1. A version of the Operation that has been made relative to the SyncPoint location.
     *   2. A WriteTreeRef of any writes we have cached at the SyncPoint location.
     *   3. A snapshot Node with cached server data, if we have it.
     *
     * - We concatenate all of the events returned by each SyncPoint and return the result.
     */
    function syncTreeApplyOperationToSyncPoints_(syncTree, operation) {
        return syncTreeApplyOperationHelper_(operation, syncTree.syncPointTree_, 
        /*serverCache=*/ null, writeTreeChildWrites(syncTree.pendingWriteTree_, newEmptyPath()));
    }
    /**
     * Recursive helper for applyOperationToSyncPoints_
     */
    function syncTreeApplyOperationHelper_(operation, syncPointTree, serverCache, writesCache) {
        if (pathIsEmpty(operation.path)) {
            return syncTreeApplyOperationDescendantsHelper_(operation, syncPointTree, serverCache, writesCache);
        }
        else {
            const syncPoint = syncPointTree.get(newEmptyPath());
            // If we don't have cached server data, see if we can get it from this SyncPoint.
            if (serverCache == null && syncPoint != null) {
                serverCache = syncPointGetCompleteServerCache(syncPoint, newEmptyPath());
            }
            let events = [];
            const childName = pathGetFront(operation.path);
            const childOperation = operation.operationForChild(childName);
            const childTree = syncPointTree.children.get(childName);
            if (childTree && childOperation) {
                const childServerCache = serverCache
                    ? serverCache.getImmediateChild(childName)
                    : null;
                const childWritesCache = writeTreeRefChild(writesCache, childName);
                events = events.concat(syncTreeApplyOperationHelper_(childOperation, childTree, childServerCache, childWritesCache));
            }
            if (syncPoint) {
                events = events.concat(syncPointApplyOperation(syncPoint, operation, writesCache, serverCache));
            }
            return events;
        }
    }
    /**
     * Recursive helper for applyOperationToSyncPoints_
     */
    function syncTreeApplyOperationDescendantsHelper_(operation, syncPointTree, serverCache, writesCache) {
        const syncPoint = syncPointTree.get(newEmptyPath());
        // If we don't have cached server data, see if we can get it from this SyncPoint.
        if (serverCache == null && syncPoint != null) {
            serverCache = syncPointGetCompleteServerCache(syncPoint, newEmptyPath());
        }
        let events = [];
        syncPointTree.children.inorderTraversal((childName, childTree) => {
            const childServerCache = serverCache
                ? serverCache.getImmediateChild(childName)
                : null;
            const childWritesCache = writeTreeRefChild(writesCache, childName);
            const childOperation = operation.operationForChild(childName);
            if (childOperation) {
                events = events.concat(syncTreeApplyOperationDescendantsHelper_(childOperation, childTree, childServerCache, childWritesCache));
            }
        });
        if (syncPoint) {
            events = events.concat(syncPointApplyOperation(syncPoint, operation, writesCache, serverCache));
        }
        return events;
    }
    function syncTreeCreateListenerForView_(syncTree, view) {
        const query = view.query;
        const tag = syncTreeTagForQuery_(syncTree, query);
        return {
            hashFn: () => {
                const cache = viewGetServerCache(view) || ChildrenNode.EMPTY_NODE;
                return cache.hash();
            },
            onComplete: (status) => {
                if (status === 'ok') {
                    if (tag) {
                        return syncTreeApplyTaggedListenComplete(syncTree, query._path, tag);
                    }
                    else {
                        return syncTreeApplyListenComplete(syncTree, query._path);
                    }
                }
                else {
                    // If a listen failed, kill all of the listeners here, not just the one that triggered the error.
                    // Note that this may need to be scoped to just this listener if we change permissions on filtered children
                    const error = errorForServerCode(status, query);
                    return syncTreeRemoveEventRegistration(syncTree, query, 
                    /*eventRegistration*/ null, error);
                }
            }
        };
    }
    /**
     * Return the tag associated with the given query.
     */
    function syncTreeTagForQuery_(syncTree, query) {
        const queryKey = syncTreeMakeQueryKey_(query);
        return syncTree.queryToTagMap.get(queryKey);
    }
    /**
     * Given a query, computes a "queryKey" suitable for use in our queryToTagMap_.
     */
    function syncTreeMakeQueryKey_(query) {
        return query._path.toString() + '$' + query._queryIdentifier;
    }
    /**
     * Return the query associated with the given tag, if we have one
     */
    function syncTreeQueryKeyForTag_(syncTree, tag) {
        return syncTree.tagToQueryMap.get(tag);
    }
    /**
     * Given a queryKey (created by makeQueryKey), parse it back into a path and queryId.
     */
    function syncTreeParseQueryKey_(queryKey) {
        const splitIndex = queryKey.indexOf('$');
        assert(splitIndex !== -1 && splitIndex < queryKey.length - 1, 'Bad queryKey.');
        return {
            queryId: queryKey.substr(splitIndex + 1),
            path: new Path(queryKey.substr(0, splitIndex))
        };
    }
    /**
     * A helper method to apply tagged operations
     */
    function syncTreeApplyTaggedOperation_(syncTree, queryPath, operation) {
        const syncPoint = syncTree.syncPointTree_.get(queryPath);
        assert(syncPoint, "Missing sync point for query tag that we're tracking");
        const writesCache = writeTreeChildWrites(syncTree.pendingWriteTree_, queryPath);
        return syncPointApplyOperation(syncPoint, operation, writesCache, null);
    }
    /**
     * This collapses multiple unfiltered views into a single view, since we only need a single
     * listener for them.
     */
    function syncTreeCollectDistinctViewsForSubTree_(subtree) {
        return subtree.fold((relativePath, maybeChildSyncPoint, childMap) => {
            if (maybeChildSyncPoint && syncPointHasCompleteView(maybeChildSyncPoint)) {
                const completeView = syncPointGetCompleteView(maybeChildSyncPoint);
                return [completeView];
            }
            else {
                // No complete view here, flatten any deeper listens into an array
                let views = [];
                if (maybeChildSyncPoint) {
                    views = syncPointGetQueryViews(maybeChildSyncPoint);
                }
                each(childMap, (_key, childViews) => {
                    views = views.concat(childViews);
                });
                return views;
            }
        });
    }
    /**
     * Normalizes a query to a query we send the server for listening
     *
     * @returns The normalized query
     */
    function syncTreeQueryForListening_(query) {
        if (query._queryParams.loadsAllData() && !query._queryParams.isDefault()) {
            // We treat queries that load all data as default queries
            // Cast is necessary because ref() technically returns Firebase which is actually fb.api.Firebase which inherits
            // from Query
            return new (syncTreeGetReferenceConstructor())(query._repo, query._path);
        }
        else {
            return query;
        }
    }
    function syncTreeRemoveTags_(syncTree, queries) {
        for (let j = 0; j < queries.length; ++j) {
            const removedQuery = queries[j];
            if (!removedQuery._queryParams.loadsAllData()) {
                // We should have a tag for this
                const removedQueryKey = syncTreeMakeQueryKey_(removedQuery);
                const removedQueryTag = syncTree.queryToTagMap.get(removedQueryKey);
                syncTree.queryToTagMap.delete(removedQueryKey);
                syncTree.tagToQueryMap.delete(removedQueryTag);
            }
        }
    }
    /**
     * Static accessor for query tags.
     */
    function syncTreeGetNextQueryTag_() {
        return syncTreeNextQueryTag_++;
    }
    /**
     * For a given new listen, manage the de-duplication of outstanding subscriptions.
     *
     * @returns This method can return events to support synchronous data sources
     */
    function syncTreeSetupListener_(syncTree, query, view) {
        const path = query._path;
        const tag = syncTreeTagForQuery_(syncTree, query);
        const listener = syncTreeCreateListenerForView_(syncTree, view);
        const events = syncTree.listenProvider_.startListening(syncTreeQueryForListening_(query), tag, listener.hashFn, listener.onComplete);
        const subtree = syncTree.syncPointTree_.subtree(path);
        // The root of this subtree has our query. We're here because we definitely need to send a listen for that, but we
        // may need to shadow other listens as well.
        if (tag) {
            assert(!syncPointHasCompleteView(subtree.value), "If we're adding a query, it shouldn't be shadowed");
        }
        else {
            // Shadow everything at or below this location, this is a default listener.
            const queriesToStop = subtree.fold((relativePath, maybeChildSyncPoint, childMap) => {
                if (!pathIsEmpty(relativePath) &&
                    maybeChildSyncPoint &&
                    syncPointHasCompleteView(maybeChildSyncPoint)) {
                    return [syncPointGetCompleteView(maybeChildSyncPoint).query];
                }
                else {
                    // No default listener here, flatten any deeper queries into an array
                    let queries = [];
                    if (maybeChildSyncPoint) {
                        queries = queries.concat(syncPointGetQueryViews(maybeChildSyncPoint).map(view => view.query));
                    }
                    each(childMap, (_key, childQueries) => {
                        queries = queries.concat(childQueries);
                    });
                    return queries;
                }
            });
            for (let i = 0; i < queriesToStop.length; ++i) {
                const queryToStop = queriesToStop[i];
                syncTree.listenProvider_.stopListening(syncTreeQueryForListening_(queryToStop), syncTreeTagForQuery_(syncTree, queryToStop));
            }
        }
        return events;
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    class ExistingValueProvider {
        constructor(node_) {
            this.node_ = node_;
        }
        getImmediateChild(childName) {
            const child = this.node_.getImmediateChild(childName);
            return new ExistingValueProvider(child);
        }
        node() {
            return this.node_;
        }
    }
    class DeferredValueProvider {
        constructor(syncTree, path) {
            this.syncTree_ = syncTree;
            this.path_ = path;
        }
        getImmediateChild(childName) {
            const childPath = pathChild(this.path_, childName);
            return new DeferredValueProvider(this.syncTree_, childPath);
        }
        node() {
            return syncTreeCalcCompleteEventCache(this.syncTree_, this.path_);
        }
    }
    /**
     * Generate placeholders for deferred values.
     */
    const generateWithValues = function (values) {
        values = values || {};
        values['timestamp'] = values['timestamp'] || new Date().getTime();
        return values;
    };
    /**
     * Value to use when firing local events. When writing server values, fire
     * local events with an approximate value, otherwise return value as-is.
     */
    const resolveDeferredLeafValue = function (value, existingVal, serverValues) {
        if (!value || typeof value !== 'object') {
            return value;
        }
        assert('.sv' in value, 'Unexpected leaf node or priority contents');
        if (typeof value['.sv'] === 'string') {
            return resolveScalarDeferredValue(value['.sv'], existingVal, serverValues);
        }
        else if (typeof value['.sv'] === 'object') {
            return resolveComplexDeferredValue(value['.sv'], existingVal);
        }
        else {
            assert(false, 'Unexpected server value: ' + JSON.stringify(value, null, 2));
        }
    };
    const resolveScalarDeferredValue = function (op, existing, serverValues) {
        switch (op) {
            case 'timestamp':
                return serverValues['timestamp'];
            default:
                assert(false, 'Unexpected server value: ' + op);
        }
    };
    const resolveComplexDeferredValue = function (op, existing, unused) {
        if (!op.hasOwnProperty('increment')) {
            assert(false, 'Unexpected server value: ' + JSON.stringify(op, null, 2));
        }
        const delta = op['increment'];
        if (typeof delta !== 'number') {
            assert(false, 'Unexpected increment value: ' + delta);
        }
        const existingNode = existing.node();
        assert(existingNode !== null && typeof existingNode !== 'undefined', 'Expected ChildrenNode.EMPTY_NODE for nulls');
        // Incrementing a non-number sets the value to the incremented amount
        if (!existingNode.isLeafNode()) {
            return delta;
        }
        const leaf = existingNode;
        const existingVal = leaf.getValue();
        if (typeof existingVal !== 'number') {
            return delta;
        }
        // No need to do over/underflow arithmetic here because JS only handles floats under the covers
        return existingVal + delta;
    };
    /**
     * Recursively replace all deferred values and priorities in the tree with the
     * specified generated replacement values.
     * @param path - path to which write is relative
     * @param node - new data written at path
     * @param syncTree - current data
     */
    const resolveDeferredValueTree = function (path, node, syncTree, serverValues) {
        return resolveDeferredValue(node, new DeferredValueProvider(syncTree, path), serverValues);
    };
    /**
     * Recursively replace all deferred values and priorities in the node with the
     * specified generated replacement values.  If there are no server values in the node,
     * it'll be returned as-is.
     */
    const resolveDeferredValueSnapshot = function (node, existing, serverValues) {
        return resolveDeferredValue(node, new ExistingValueProvider(existing), serverValues);
    };
    function resolveDeferredValue(node, existingVal, serverValues) {
        const rawPri = node.getPriority().val();
        const priority = resolveDeferredLeafValue(rawPri, existingVal.getImmediateChild('.priority'), serverValues);
        let newNode;
        if (node.isLeafNode()) {
            const leafNode = node;
            const value = resolveDeferredLeafValue(leafNode.getValue(), existingVal, serverValues);
            if (value !== leafNode.getValue() ||
                priority !== leafNode.getPriority().val()) {
                return new LeafNode(value, nodeFromJSON(priority));
            }
            else {
                return node;
            }
        }
        else {
            const childrenNode = node;
            newNode = childrenNode;
            if (priority !== childrenNode.getPriority().val()) {
                newNode = newNode.updatePriority(new LeafNode(priority));
            }
            childrenNode.forEachChild(PRIORITY_INDEX, (childName, childNode) => {
                const newChildNode = resolveDeferredValue(childNode, existingVal.getImmediateChild(childName), serverValues);
                if (newChildNode !== childNode) {
                    newNode = newNode.updateImmediateChild(childName, newChildNode);
                }
            });
            return newNode;
        }
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * A light-weight tree, traversable by path.  Nodes can have both values and children.
     * Nodes are not enumerated (by forEachChild) unless they have a value or non-empty
     * children.
     */
    class Tree {
        /**
         * @param name - Optional name of the node.
         * @param parent - Optional parent node.
         * @param node - Optional node to wrap.
         */
        constructor(name = '', parent = null, node = { children: {}, childCount: 0 }) {
            this.name = name;
            this.parent = parent;
            this.node = node;
        }
    }
    /**
     * Returns a sub-Tree for the given path.
     *
     * @param pathObj - Path to look up.
     * @returns Tree for path.
     */
    function treeSubTree(tree, pathObj) {
        // TODO: Require pathObj to be Path?
        let path = pathObj instanceof Path ? pathObj : new Path(pathObj);
        let child = tree, next = pathGetFront(path);
        while (next !== null) {
            const childNode = safeGet(child.node.children, next) || {
                children: {},
                childCount: 0
            };
            child = new Tree(next, child, childNode);
            path = pathPopFront(path);
            next = pathGetFront(path);
        }
        return child;
    }
    /**
     * Returns the data associated with this tree node.
     *
     * @returns The data or null if no data exists.
     */
    function treeGetValue(tree) {
        return tree.node.value;
    }
    /**
     * Sets data to this tree node.
     *
     * @param value - Value to set.
     */
    function treeSetValue(tree, value) {
        tree.node.value = value;
        treeUpdateParents(tree);
    }
    /**
     * @returns Whether the tree has any children.
     */
    function treeHasChildren(tree) {
        return tree.node.childCount > 0;
    }
    /**
     * @returns Whethe rthe tree is empty (no value or children).
     */
    function treeIsEmpty(tree) {
        return treeGetValue(tree) === undefined && !treeHasChildren(tree);
    }
    /**
     * Calls action for each child of this tree node.
     *
     * @param action - Action to be called for each child.
     */
    function treeForEachChild(tree, action) {
        each(tree.node.children, (child, childTree) => {
            action(new Tree(child, tree, childTree));
        });
    }
    /**
     * Does a depth-first traversal of this node's descendants, calling action for each one.
     *
     * @param action - Action to be called for each child.
     * @param includeSelf - Whether to call action on this node as well. Defaults to
     *   false.
     * @param childrenFirst - Whether to call action on children before calling it on
     *   parent.
     */
    function treeForEachDescendant(tree, action, includeSelf, childrenFirst) {
        if (includeSelf && !childrenFirst) {
            action(tree);
        }
        treeForEachChild(tree, child => {
            treeForEachDescendant(child, action, true, childrenFirst);
        });
        if (includeSelf && childrenFirst) {
            action(tree);
        }
    }
    /**
     * Calls action on each ancestor node.
     *
     * @param action - Action to be called on each parent; return
     *   true to abort.
     * @param includeSelf - Whether to call action on this node as well.
     * @returns true if the action callback returned true.
     */
    function treeForEachAncestor(tree, action, includeSelf) {
        let node = includeSelf ? tree : tree.parent;
        while (node !== null) {
            if (action(node)) {
                return true;
            }
            node = node.parent;
        }
        return false;
    }
    /**
     * @returns The path of this tree node, as a Path.
     */
    function treeGetPath(tree) {
        return new Path(tree.parent === null
            ? tree.name
            : treeGetPath(tree.parent) + '/' + tree.name);
    }
    /**
     * Adds or removes this child from its parent based on whether it's empty or not.
     */
    function treeUpdateParents(tree) {
        if (tree.parent !== null) {
            treeUpdateChild(tree.parent, tree.name, tree);
        }
    }
    /**
     * Adds or removes the passed child to this tree node, depending on whether it's empty.
     *
     * @param childName - The name of the child to update.
     * @param child - The child to update.
     */
    function treeUpdateChild(tree, childName, child) {
        const childEmpty = treeIsEmpty(child);
        const childExists = contains$1(tree.node.children, childName);
        if (childEmpty && childExists) {
            delete tree.node.children[childName];
            tree.node.childCount--;
            treeUpdateParents(tree);
        }
        else if (!childEmpty && !childExists) {
            tree.node.children[childName] = child.node;
            tree.node.childCount++;
            treeUpdateParents(tree);
        }
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * True for invalid Firebase keys
     */
    const INVALID_KEY_REGEX_ = /[\[\].#$\/\u0000-\u001F\u007F]/;
    /**
     * True for invalid Firebase paths.
     * Allows '/' in paths.
     */
    const INVALID_PATH_REGEX_ = /[\[\].#$\u0000-\u001F\u007F]/;
    /**
     * Maximum number of characters to allow in leaf value
     */
    const MAX_LEAF_SIZE_ = 10 * 1024 * 1024;
    const isValidKey = function (key) {
        return (typeof key === 'string' && key.length !== 0 && !INVALID_KEY_REGEX_.test(key));
    };
    const isValidPathString = function (pathString) {
        return (typeof pathString === 'string' &&
            pathString.length !== 0 &&
            !INVALID_PATH_REGEX_.test(pathString));
    };
    const isValidRootPathString = function (pathString) {
        if (pathString) {
            // Allow '/.info/' at the beginning.
            pathString = pathString.replace(/^\/*\.info(\/|$)/, '/');
        }
        return isValidPathString(pathString);
    };
    const isValidPriority = function (priority) {
        return (priority === null ||
            typeof priority === 'string' ||
            (typeof priority === 'number' && !isInvalidJSONNumber(priority)) ||
            (priority &&
                typeof priority === 'object' &&
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                contains$1(priority, '.sv')));
    };
    /**
     * Pre-validate a datum passed as an argument to Firebase function.
     */
    const validateFirebaseDataArg = function (fnName, value, path, optional) {
        if (optional && value === undefined) {
            return;
        }
        validateFirebaseData(errorPrefix(fnName, 'value'), value, path);
    };
    /**
     * Validate a data object client-side before sending to server.
     */
    const validateFirebaseData = function (errorPrefix, data, path_) {
        const path = path_ instanceof Path ? new ValidationPath(path_, errorPrefix) : path_;
        if (data === undefined) {
            throw new Error(errorPrefix + 'contains undefined ' + validationPathToErrorString(path));
        }
        if (typeof data === 'function') {
            throw new Error(errorPrefix +
                'contains a function ' +
                validationPathToErrorString(path) +
                ' with contents = ' +
                data.toString());
        }
        if (isInvalidJSONNumber(data)) {
            throw new Error(errorPrefix +
                'contains ' +
                data.toString() +
                ' ' +
                validationPathToErrorString(path));
        }
        // Check max leaf size, but try to avoid the utf8 conversion if we can.
        if (typeof data === 'string' &&
            data.length > MAX_LEAF_SIZE_ / 3 &&
            stringLength(data) > MAX_LEAF_SIZE_) {
            throw new Error(errorPrefix +
                'contains a string greater than ' +
                MAX_LEAF_SIZE_ +
                ' utf8 bytes ' +
                validationPathToErrorString(path) +
                " ('" +
                data.substring(0, 50) +
                "...')");
        }
        // TODO = Perf = Consider combining the recursive validation of keys into NodeFromJSON
        // to save extra walking of large objects.
        if (data && typeof data === 'object') {
            let hasDotValue = false;
            let hasActualChild = false;
            each(data, (key, value) => {
                if (key === '.value') {
                    hasDotValue = true;
                }
                else if (key !== '.priority' && key !== '.sv') {
                    hasActualChild = true;
                    if (!isValidKey(key)) {
                        throw new Error(errorPrefix +
                            ' contains an invalid key (' +
                            key +
                            ') ' +
                            validationPathToErrorString(path) +
                            '.  Keys must be non-empty strings ' +
                            'and can\'t contain ".", "#", "$", "/", "[", or "]"');
                    }
                }
                validationPathPush(path, key);
                validateFirebaseData(errorPrefix, value, path);
                validationPathPop(path);
            });
            if (hasDotValue && hasActualChild) {
                throw new Error(errorPrefix +
                    ' contains ".value" child ' +
                    validationPathToErrorString(path) +
                    ' in addition to actual children.');
            }
        }
    };
    /**
     * @internal
     */
    const validatePathString = function (fnName, argumentName, pathString, optional) {
        if (optional && pathString === undefined) {
            return;
        }
        if (!isValidPathString(pathString)) {
            throw new Error(errorPrefix(fnName, argumentName) +
                'was an invalid path = "' +
                pathString +
                '". Paths must be non-empty strings and ' +
                'can\'t contain ".", "#", "$", "[", or "]"');
        }
    };
    const validateRootPathString = function (fnName, argumentName, pathString, optional) {
        if (pathString) {
            // Allow '/.info/' at the beginning.
            pathString = pathString.replace(/^\/*\.info(\/|$)/, '/');
        }
        validatePathString(fnName, argumentName, pathString, optional);
    };
    /**
     * @internal
     */
    const validateWritablePath = function (fnName, path) {
        if (pathGetFront(path) === '.info') {
            throw new Error(fnName + " failed = Can't modify data under /.info/");
        }
    };
    const validateUrl = function (fnName, parsedUrl) {
        // TODO = Validate server better.
        const pathString = parsedUrl.path.toString();
        if (!(typeof parsedUrl.repoInfo.host === 'string') ||
            parsedUrl.repoInfo.host.length === 0 ||
            (!isValidKey(parsedUrl.repoInfo.namespace) &&
                parsedUrl.repoInfo.host.split(':')[0] !== 'localhost') ||
            (pathString.length !== 0 && !isValidRootPathString(pathString))) {
            throw new Error(errorPrefix(fnName, 'url') +
                'must be a valid firebase URL and ' +
                'the path can\'t contain ".", "#", "$", "[", or "]".');
        }
    };

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * The event queue serves a few purposes:
     * 1. It ensures we maintain event order in the face of event callbacks doing operations that result in more
     *    events being queued.
     * 2. raiseQueuedEvents() handles being called reentrantly nicely.  That is, if in the course of raising events,
     *    raiseQueuedEvents() is called again, the "inner" call will pick up raising events where the "outer" call
     *    left off, ensuring that the events are still raised synchronously and in order.
     * 3. You can use raiseEventsAtPath and raiseEventsForChangedPath to ensure only relevant previously-queued
     *    events are raised synchronously.
     *
     * NOTE: This can all go away if/when we move to async events.
     *
     */
    class EventQueue {
        constructor() {
            this.eventLists_ = [];
            /**
             * Tracks recursion depth of raiseQueuedEvents_, for debugging purposes.
             */
            this.recursionDepth_ = 0;
        }
    }
    /**
     * @param eventDataList - The new events to queue.
     */
    function eventQueueQueueEvents(eventQueue, eventDataList) {
        // We group events by path, storing them in a single EventList, to make it easier to skip over them quickly.
        let currList = null;
        for (let i = 0; i < eventDataList.length; i++) {
            const data = eventDataList[i];
            const path = data.getPath();
            if (currList !== null && !pathEquals(path, currList.path)) {
                eventQueue.eventLists_.push(currList);
                currList = null;
            }
            if (currList === null) {
                currList = { events: [], path };
            }
            currList.events.push(data);
        }
        if (currList) {
            eventQueue.eventLists_.push(currList);
        }
    }
    /**
     * Queues the specified events and synchronously raises all events (including previously queued ones)
     * for the specified path.
     *
     * It is assumed that the new events are all for the specified path.
     *
     * @param path - The path to raise events for.
     * @param eventDataList - The new events to raise.
     */
    function eventQueueRaiseEventsAtPath(eventQueue, path, eventDataList) {
        eventQueueQueueEvents(eventQueue, eventDataList);
        eventQueueRaiseQueuedEventsMatchingPredicate(eventQueue, eventPath => pathEquals(eventPath, path));
    }
    /**
     * Queues the specified events and synchronously raises all events (including previously queued ones) for
     * locations related to the specified change path (i.e. all ancestors and descendants).
     *
     * It is assumed that the new events are all related (ancestor or descendant) to the specified path.
     *
     * @param changedPath - The path to raise events for.
     * @param eventDataList - The events to raise
     */
    function eventQueueRaiseEventsForChangedPath(eventQueue, changedPath, eventDataList) {
        eventQueueQueueEvents(eventQueue, eventDataList);
        eventQueueRaiseQueuedEventsMatchingPredicate(eventQueue, eventPath => pathContains(eventPath, changedPath) ||
            pathContains(changedPath, eventPath));
    }
    function eventQueueRaiseQueuedEventsMatchingPredicate(eventQueue, predicate) {
        eventQueue.recursionDepth_++;
        let sentAll = true;
        for (let i = 0; i < eventQueue.eventLists_.length; i++) {
            const eventList = eventQueue.eventLists_[i];
            if (eventList) {
                const eventPath = eventList.path;
                if (predicate(eventPath)) {
                    eventListRaise(eventQueue.eventLists_[i]);
                    eventQueue.eventLists_[i] = null;
                }
                else {
                    sentAll = false;
                }
            }
        }
        if (sentAll) {
            eventQueue.eventLists_ = [];
        }
        eventQueue.recursionDepth_--;
    }
    /**
     * Iterates through the list and raises each event
     */
    function eventListRaise(eventList) {
        for (let i = 0; i < eventList.events.length; i++) {
            const eventData = eventList.events[i];
            if (eventData !== null) {
                eventList.events[i] = null;
                const eventFn = eventData.getEventRunner();
                if (logger) {
                    log('event: ' + eventData.toString());
                }
                exceptionGuard(eventFn);
            }
        }
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    const INTERRUPT_REASON = 'repo_interrupt';
    /**
     * If a transaction does not succeed after 25 retries, we abort it. Among other
     * things this ensure that if there's ever a bug causing a mismatch between
     * client / server hashes for some data, we won't retry indefinitely.
     */
    const MAX_TRANSACTION_RETRIES = 25;
    /**
     * A connection to a single data repository.
     */
    class Repo {
        constructor(repoInfo_, forceRestClient_, authTokenProvider_, appCheckProvider_) {
            this.repoInfo_ = repoInfo_;
            this.forceRestClient_ = forceRestClient_;
            this.authTokenProvider_ = authTokenProvider_;
            this.appCheckProvider_ = appCheckProvider_;
            this.dataUpdateCount = 0;
            this.statsListener_ = null;
            this.eventQueue_ = new EventQueue();
            this.nextWriteId_ = 1;
            this.interceptServerDataCallback_ = null;
            /** A list of data pieces and paths to be set when this client disconnects. */
            this.onDisconnect_ = newSparseSnapshotTree();
            /** Stores queues of outstanding transactions for Firebase locations. */
            this.transactionQueueTree_ = new Tree();
            // TODO: This should be @private but it's used by test_access.js and internal.js
            this.persistentConnection_ = null;
            // This key is intentionally not updated if RepoInfo is later changed or replaced
            this.key = this.repoInfo_.toURLString();
        }
        /**
         * @returns The URL corresponding to the root of this Firebase.
         */
        toString() {
            return ((this.repoInfo_.secure ? 'https://' : 'http://') + this.repoInfo_.host);
        }
    }
    function repoStart(repo, appId, authOverride) {
        repo.stats_ = statsManagerGetCollection(repo.repoInfo_);
        if (repo.forceRestClient_ || beingCrawled()) {
            repo.server_ = new ReadonlyRestClient(repo.repoInfo_, (pathString, data, isMerge, tag) => {
                repoOnDataUpdate(repo, pathString, data, isMerge, tag);
            }, repo.authTokenProvider_, repo.appCheckProvider_);
            // Minor hack: Fire onConnect immediately, since there's no actual connection.
            setTimeout(() => repoOnConnectStatus(repo, /* connectStatus= */ true), 0);
        }
        else {
            // Validate authOverride
            if (typeof authOverride !== 'undefined' && authOverride !== null) {
                if (typeof authOverride !== 'object') {
                    throw new Error('Only objects are supported for option databaseAuthVariableOverride');
                }
                try {
                    stringify(authOverride);
                }
                catch (e) {
                    throw new Error('Invalid authOverride provided: ' + e);
                }
            }
            repo.persistentConnection_ = new PersistentConnection(repo.repoInfo_, appId, (pathString, data, isMerge, tag) => {
                repoOnDataUpdate(repo, pathString, data, isMerge, tag);
            }, (connectStatus) => {
                repoOnConnectStatus(repo, connectStatus);
            }, (updates) => {
                repoOnServerInfoUpdate(repo, updates);
            }, repo.authTokenProvider_, repo.appCheckProvider_, authOverride);
            repo.server_ = repo.persistentConnection_;
        }
        repo.authTokenProvider_.addTokenChangeListener(token => {
            repo.server_.refreshAuthToken(token);
        });
        repo.appCheckProvider_.addTokenChangeListener(result => {
            repo.server_.refreshAppCheckToken(result.token);
        });
        // In the case of multiple Repos for the same repoInfo (i.e. there are multiple Firebase.Contexts being used),
        // we only want to create one StatsReporter.  As such, we'll report stats over the first Repo created.
        repo.statsReporter_ = statsManagerGetOrCreateReporter(repo.repoInfo_, () => new StatsReporter(repo.stats_, repo.server_));
        // Used for .info.
        repo.infoData_ = new SnapshotHolder();
        repo.infoSyncTree_ = new SyncTree({
            startListening: (query, tag, currentHashFn, onComplete) => {
                let infoEvents = [];
                const node = repo.infoData_.getNode(query._path);
                // This is possibly a hack, but we have different semantics for .info endpoints. We don't raise null events
                // on initial data...
                if (!node.isEmpty()) {
                    infoEvents = syncTreeApplyServerOverwrite(repo.infoSyncTree_, query._path, node);
                    setTimeout(() => {
                        onComplete('ok');
                    }, 0);
                }
                return infoEvents;
            },
            stopListening: () => { }
        });
        repoUpdateInfo(repo, 'connected', false);
        repo.serverSyncTree_ = new SyncTree({
            startListening: (query, tag, currentHashFn, onComplete) => {
                repo.server_.listen(query, currentHashFn, tag, (status, data) => {
                    const events = onComplete(status, data);
                    eventQueueRaiseEventsForChangedPath(repo.eventQueue_, query._path, events);
                });
                // No synchronous events for network-backed sync trees
                return [];
            },
            stopListening: (query, tag) => {
                repo.server_.unlisten(query, tag);
            }
        });
    }
    /**
     * @returns The time in milliseconds, taking the server offset into account if we have one.
     */
    function repoServerTime(repo) {
        const offsetNode = repo.infoData_.getNode(new Path('.info/serverTimeOffset'));
        const offset = offsetNode.val() || 0;
        return new Date().getTime() + offset;
    }
    /**
     * Generate ServerValues using some variables from the repo object.
     */
    function repoGenerateServerValues(repo) {
        return generateWithValues({
            timestamp: repoServerTime(repo)
        });
    }
    /**
     * Called by realtime when we get new messages from the server.
     */
    function repoOnDataUpdate(repo, pathString, data, isMerge, tag) {
        // For testing.
        repo.dataUpdateCount++;
        const path = new Path(pathString);
        data = repo.interceptServerDataCallback_
            ? repo.interceptServerDataCallback_(pathString, data)
            : data;
        let events = [];
        if (tag) {
            if (isMerge) {
                const taggedChildren = map$1(data, (raw) => nodeFromJSON(raw));
                events = syncTreeApplyTaggedQueryMerge(repo.serverSyncTree_, path, taggedChildren, tag);
            }
            else {
                const taggedSnap = nodeFromJSON(data);
                events = syncTreeApplyTaggedQueryOverwrite(repo.serverSyncTree_, path, taggedSnap, tag);
            }
        }
        else if (isMerge) {
            const changedChildren = map$1(data, (raw) => nodeFromJSON(raw));
            events = syncTreeApplyServerMerge(repo.serverSyncTree_, path, changedChildren);
        }
        else {
            const snap = nodeFromJSON(data);
            events = syncTreeApplyServerOverwrite(repo.serverSyncTree_, path, snap);
        }
        let affectedPath = path;
        if (events.length > 0) {
            // Since we have a listener outstanding for each transaction, receiving any events
            // is a proxy for some change having occurred.
            affectedPath = repoRerunTransactions(repo, path);
        }
        eventQueueRaiseEventsForChangedPath(repo.eventQueue_, affectedPath, events);
    }
    function repoOnConnectStatus(repo, connectStatus) {
        repoUpdateInfo(repo, 'connected', connectStatus);
        if (connectStatus === false) {
            repoRunOnDisconnectEvents(repo);
        }
    }
    function repoOnServerInfoUpdate(repo, updates) {
        each(updates, (key, value) => {
            repoUpdateInfo(repo, key, value);
        });
    }
    function repoUpdateInfo(repo, pathString, value) {
        const path = new Path('/.info/' + pathString);
        const newNode = nodeFromJSON(value);
        repo.infoData_.updateSnapshot(path, newNode);
        const events = syncTreeApplyServerOverwrite(repo.infoSyncTree_, path, newNode);
        eventQueueRaiseEventsForChangedPath(repo.eventQueue_, path, events);
    }
    function repoGetNextWriteId(repo) {
        return repo.nextWriteId_++;
    }
    /**
     * The purpose of `getValue` is to return the latest known value
     * satisfying `query`.
     *
     * This method will first check for in-memory cached values
     * belonging to active listeners. If they are found, such values
     * are considered to be the most up-to-date.
     *
     * If the client is not connected, this method will try to
     * establish a connection and request the value for `query`. If
     * the client is not able to retrieve the query result, it reports
     * an error.
     *
     * @param query - The query to surface a value for.
     */
    function repoGetValue(repo, query) {
        // Only active queries are cached. There is no persisted cache.
        const cached = syncTreeGetServerValue(repo.serverSyncTree_, query);
        if (cached != null) {
            return Promise.resolve(cached);
        }
        return repo.server_.get(query).then(payload => {
            const node = nodeFromJSON(payload).withIndex(query._queryParams.getIndex());
            const events = syncTreeApplyServerOverwrite(repo.serverSyncTree_, query._path, node);
            eventQueueRaiseEventsAtPath(repo.eventQueue_, query._path, events);
            return Promise.resolve(node);
        }, err => {
            repoLog(repo, 'get for query ' + stringify(query) + ' failed: ' + err);
            return Promise.reject(new Error(err));
        });
    }
    function repoSetWithPriority(repo, path, newVal, newPriority, onComplete) {
        repoLog(repo, 'set', {
            path: path.toString(),
            value: newVal,
            priority: newPriority
        });
        // TODO: Optimize this behavior to either (a) store flag to skip resolving where possible and / or
        // (b) store unresolved paths on JSON parse
        const serverValues = repoGenerateServerValues(repo);
        const newNodeUnresolved = nodeFromJSON(newVal, newPriority);
        const existing = syncTreeCalcCompleteEventCache(repo.serverSyncTree_, path);
        const newNode = resolveDeferredValueSnapshot(newNodeUnresolved, existing, serverValues);
        const writeId = repoGetNextWriteId(repo);
        const events = syncTreeApplyUserOverwrite(repo.serverSyncTree_, path, newNode, writeId, true);
        eventQueueQueueEvents(repo.eventQueue_, events);
        repo.server_.put(path.toString(), newNodeUnresolved.val(/*export=*/ true), (status, errorReason) => {
            const success = status === 'ok';
            if (!success) {
                warn('set at ' + path + ' failed: ' + status);
            }
            const clearEvents = syncTreeAckUserWrite(repo.serverSyncTree_, writeId, !success);
            eventQueueRaiseEventsForChangedPath(repo.eventQueue_, path, clearEvents);
            repoCallOnCompleteCallback(repo, onComplete, status, errorReason);
        });
        const affectedPath = repoAbortTransactions(repo, path);
        repoRerunTransactions(repo, affectedPath);
        // We queued the events above, so just flush the queue here
        eventQueueRaiseEventsForChangedPath(repo.eventQueue_, affectedPath, []);
    }
    /**
     * Applies all of the changes stored up in the onDisconnect_ tree.
     */
    function repoRunOnDisconnectEvents(repo) {
        repoLog(repo, 'onDisconnectEvents');
        const serverValues = repoGenerateServerValues(repo);
        const resolvedOnDisconnectTree = newSparseSnapshotTree();
        sparseSnapshotTreeForEachTree(repo.onDisconnect_, newEmptyPath(), (path, node) => {
            const resolved = resolveDeferredValueTree(path, node, repo.serverSyncTree_, serverValues);
            sparseSnapshotTreeRemember(resolvedOnDisconnectTree, path, resolved);
        });
        let events = [];
        sparseSnapshotTreeForEachTree(resolvedOnDisconnectTree, newEmptyPath(), (path, snap) => {
            events = events.concat(syncTreeApplyServerOverwrite(repo.serverSyncTree_, path, snap));
            const affectedPath = repoAbortTransactions(repo, path);
            repoRerunTransactions(repo, affectedPath);
        });
        repo.onDisconnect_ = newSparseSnapshotTree();
        eventQueueRaiseEventsForChangedPath(repo.eventQueue_, newEmptyPath(), events);
    }
    function repoAddEventCallbackForQuery(repo, query, eventRegistration) {
        let events;
        if (pathGetFront(query._path) === '.info') {
            events = syncTreeAddEventRegistration(repo.infoSyncTree_, query, eventRegistration);
        }
        else {
            events = syncTreeAddEventRegistration(repo.serverSyncTree_, query, eventRegistration);
        }
        eventQueueRaiseEventsAtPath(repo.eventQueue_, query._path, events);
    }
    function repoRemoveEventCallbackForQuery(repo, query, eventRegistration) {
        // These are guaranteed not to raise events, since we're not passing in a cancelError. However, we can future-proof
        // a little bit by handling the return values anyways.
        let events;
        if (pathGetFront(query._path) === '.info') {
            events = syncTreeRemoveEventRegistration(repo.infoSyncTree_, query, eventRegistration);
        }
        else {
            events = syncTreeRemoveEventRegistration(repo.serverSyncTree_, query, eventRegistration);
        }
        eventQueueRaiseEventsAtPath(repo.eventQueue_, query._path, events);
    }
    function repoInterrupt(repo) {
        if (repo.persistentConnection_) {
            repo.persistentConnection_.interrupt(INTERRUPT_REASON);
        }
    }
    function repoLog(repo, ...varArgs) {
        let prefix = '';
        if (repo.persistentConnection_) {
            prefix = repo.persistentConnection_.id + ':';
        }
        log(prefix, ...varArgs);
    }
    function repoCallOnCompleteCallback(repo, callback, status, errorReason) {
        if (callback) {
            exceptionGuard(() => {
                if (status === 'ok') {
                    callback(null);
                }
                else {
                    const code = (status || 'error').toUpperCase();
                    let message = code;
                    if (errorReason) {
                        message += ': ' + errorReason;
                    }
                    const error = new Error(message);
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    error.code = code;
                    callback(error);
                }
            });
        }
    }
    /**
     * Creates a new transaction, adds it to the transactions we're tracking, and
     * sends it to the server if possible.
     *
     * @param path - Path at which to do transaction.
     * @param transactionUpdate - Update callback.
     * @param onComplete - Completion callback.
     * @param unwatcher - Function that will be called when the transaction no longer
     * need data updates for `path`.
     * @param applyLocally - Whether or not to make intermediate results visible
     */
    function repoStartTransaction(repo, path, transactionUpdate, onComplete, unwatcher, applyLocally) {
        repoLog(repo, 'transaction on ' + path);
        // Initialize transaction.
        const transaction = {
            path,
            update: transactionUpdate,
            onComplete,
            // One of TransactionStatus enums.
            status: null,
            // Used when combining transactions at different locations to figure out
            // which one goes first.
            order: LUIDGenerator(),
            // Whether to raise local events for this transaction.
            applyLocally,
            // Count of how many times we've retried the transaction.
            retryCount: 0,
            // Function to call to clean up our .on() listener.
            unwatcher,
            // Stores why a transaction was aborted.
            abortReason: null,
            currentWriteId: null,
            currentInputSnapshot: null,
            currentOutputSnapshotRaw: null,
            currentOutputSnapshotResolved: null
        };
        // Run transaction initially.
        const currentState = repoGetLatestState(repo, path, undefined);
        transaction.currentInputSnapshot = currentState;
        const newVal = transaction.update(currentState.val());
        if (newVal === undefined) {
            // Abort transaction.
            transaction.unwatcher();
            transaction.currentOutputSnapshotRaw = null;
            transaction.currentOutputSnapshotResolved = null;
            if (transaction.onComplete) {
                transaction.onComplete(null, false, transaction.currentInputSnapshot);
            }
        }
        else {
            validateFirebaseData('transaction failed: Data returned ', newVal, transaction.path);
            // Mark as run and add to our queue.
            transaction.status = 0 /* RUN */;
            const queueNode = treeSubTree(repo.transactionQueueTree_, path);
            const nodeQueue = treeGetValue(queueNode) || [];
            nodeQueue.push(transaction);
            treeSetValue(queueNode, nodeQueue);
            // Update visibleData and raise events
            // Note: We intentionally raise events after updating all of our
            // transaction state, since the user could start new transactions from the
            // event callbacks.
            let priorityForNode;
            if (typeof newVal === 'object' &&
                newVal !== null &&
                contains$1(newVal, '.priority')) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                priorityForNode = safeGet(newVal, '.priority');
                assert(isValidPriority(priorityForNode), 'Invalid priority returned by transaction. ' +
                    'Priority must be a valid string, finite number, server value, or null.');
            }
            else {
                const currentNode = syncTreeCalcCompleteEventCache(repo.serverSyncTree_, path) ||
                    ChildrenNode.EMPTY_NODE;
                priorityForNode = currentNode.getPriority().val();
            }
            const serverValues = repoGenerateServerValues(repo);
            const newNodeUnresolved = nodeFromJSON(newVal, priorityForNode);
            const newNode = resolveDeferredValueSnapshot(newNodeUnresolved, currentState, serverValues);
            transaction.currentOutputSnapshotRaw = newNodeUnresolved;
            transaction.currentOutputSnapshotResolved = newNode;
            transaction.currentWriteId = repoGetNextWriteId(repo);
            const events = syncTreeApplyUserOverwrite(repo.serverSyncTree_, path, newNode, transaction.currentWriteId, transaction.applyLocally);
            eventQueueRaiseEventsForChangedPath(repo.eventQueue_, path, events);
            repoSendReadyTransactions(repo, repo.transactionQueueTree_);
        }
    }
    /**
     * @param excludeSets - A specific set to exclude
     */
    function repoGetLatestState(repo, path, excludeSets) {
        return (syncTreeCalcCompleteEventCache(repo.serverSyncTree_, path, excludeSets) ||
            ChildrenNode.EMPTY_NODE);
    }
    /**
     * Sends any already-run transactions that aren't waiting for outstanding
     * transactions to complete.
     *
     * Externally it's called with no arguments, but it calls itself recursively
     * with a particular transactionQueueTree node to recurse through the tree.
     *
     * @param node - transactionQueueTree node to start at.
     */
    function repoSendReadyTransactions(repo, node = repo.transactionQueueTree_) {
        // Before recursing, make sure any completed transactions are removed.
        if (!node) {
            repoPruneCompletedTransactionsBelowNode(repo, node);
        }
        if (treeGetValue(node)) {
            const queue = repoBuildTransactionQueue(repo, node);
            assert(queue.length > 0, 'Sending zero length transaction queue');
            const allRun = queue.every((transaction) => transaction.status === 0 /* RUN */);
            // If they're all run (and not sent), we can send them.  Else, we must wait.
            if (allRun) {
                repoSendTransactionQueue(repo, treeGetPath(node), queue);
            }
        }
        else if (treeHasChildren(node)) {
            treeForEachChild(node, childNode => {
                repoSendReadyTransactions(repo, childNode);
            });
        }
    }
    /**
     * Given a list of run transactions, send them to the server and then handle
     * the result (success or failure).
     *
     * @param path - The location of the queue.
     * @param queue - Queue of transactions under the specified location.
     */
    function repoSendTransactionQueue(repo, path, queue) {
        // Mark transactions as sent and increment retry count!
        const setsToIgnore = queue.map(txn => {
            return txn.currentWriteId;
        });
        const latestState = repoGetLatestState(repo, path, setsToIgnore);
        let snapToSend = latestState;
        const latestHash = latestState.hash();
        for (let i = 0; i < queue.length; i++) {
            const txn = queue[i];
            assert(txn.status === 0 /* RUN */, 'tryToSendTransactionQueue_: items in queue should all be run.');
            txn.status = 1 /* SENT */;
            txn.retryCount++;
            const relativePath = newRelativePath(path, txn.path);
            // If we've gotten to this point, the output snapshot must be defined.
            snapToSend = snapToSend.updateChild(relativePath /** @type {!Node} */, txn.currentOutputSnapshotRaw);
        }
        const dataToSend = snapToSend.val(true);
        const pathToSend = path;
        // Send the put.
        repo.server_.put(pathToSend.toString(), dataToSend, (status) => {
            repoLog(repo, 'transaction put response', {
                path: pathToSend.toString(),
                status
            });
            let events = [];
            if (status === 'ok') {
                // Queue up the callbacks and fire them after cleaning up all of our
                // transaction state, since the callback could trigger more
                // transactions or sets.
                const callbacks = [];
                for (let i = 0; i < queue.length; i++) {
                    queue[i].status = 2 /* COMPLETED */;
                    events = events.concat(syncTreeAckUserWrite(repo.serverSyncTree_, queue[i].currentWriteId));
                    if (queue[i].onComplete) {
                        // We never unset the output snapshot, and given that this
                        // transaction is complete, it should be set
                        callbacks.push(() => queue[i].onComplete(null, true, queue[i].currentOutputSnapshotResolved));
                    }
                    queue[i].unwatcher();
                }
                // Now remove the completed transactions.
                repoPruneCompletedTransactionsBelowNode(repo, treeSubTree(repo.transactionQueueTree_, path));
                // There may be pending transactions that we can now send.
                repoSendReadyTransactions(repo, repo.transactionQueueTree_);
                eventQueueRaiseEventsForChangedPath(repo.eventQueue_, path, events);
                // Finally, trigger onComplete callbacks.
                for (let i = 0; i < callbacks.length; i++) {
                    exceptionGuard(callbacks[i]);
                }
            }
            else {
                // transactions are no longer sent.  Update their status appropriately.
                if (status === 'datastale') {
                    for (let i = 0; i < queue.length; i++) {
                        if (queue[i].status === 3 /* SENT_NEEDS_ABORT */) {
                            queue[i].status = 4 /* NEEDS_ABORT */;
                        }
                        else {
                            queue[i].status = 0 /* RUN */;
                        }
                    }
                }
                else {
                    warn('transaction at ' + pathToSend.toString() + ' failed: ' + status);
                    for (let i = 0; i < queue.length; i++) {
                        queue[i].status = 4 /* NEEDS_ABORT */;
                        queue[i].abortReason = status;
                    }
                }
                repoRerunTransactions(repo, path);
            }
        }, latestHash);
    }
    /**
     * Finds all transactions dependent on the data at changedPath and reruns them.
     *
     * Should be called any time cached data changes.
     *
     * Return the highest path that was affected by rerunning transactions. This
     * is the path at which events need to be raised for.
     *
     * @param changedPath - The path in mergedData that changed.
     * @returns The rootmost path that was affected by rerunning transactions.
     */
    function repoRerunTransactions(repo, changedPath) {
        const rootMostTransactionNode = repoGetAncestorTransactionNode(repo, changedPath);
        const path = treeGetPath(rootMostTransactionNode);
        const queue = repoBuildTransactionQueue(repo, rootMostTransactionNode);
        repoRerunTransactionQueue(repo, queue, path);
        return path;
    }
    /**
     * Does all the work of rerunning transactions (as well as cleans up aborted
     * transactions and whatnot).
     *
     * @param queue - The queue of transactions to run.
     * @param path - The path the queue is for.
     */
    function repoRerunTransactionQueue(repo, queue, path) {
        if (queue.length === 0) {
            return; // Nothing to do!
        }
        // Queue up the callbacks and fire them after cleaning up all of our
        // transaction state, since the callback could trigger more transactions or
        // sets.
        const callbacks = [];
        let events = [];
        // Ignore all of the sets we're going to re-run.
        const txnsToRerun = queue.filter(q => {
            return q.status === 0 /* RUN */;
        });
        const setsToIgnore = txnsToRerun.map(q => {
            return q.currentWriteId;
        });
        for (let i = 0; i < queue.length; i++) {
            const transaction = queue[i];
            const relativePath = newRelativePath(path, transaction.path);
            let abortTransaction = false, abortReason;
            assert(relativePath !== null, 'rerunTransactionsUnderNode_: relativePath should not be null.');
            if (transaction.status === 4 /* NEEDS_ABORT */) {
                abortTransaction = true;
                abortReason = transaction.abortReason;
                events = events.concat(syncTreeAckUserWrite(repo.serverSyncTree_, transaction.currentWriteId, true));
            }
            else if (transaction.status === 0 /* RUN */) {
                if (transaction.retryCount >= MAX_TRANSACTION_RETRIES) {
                    abortTransaction = true;
                    abortReason = 'maxretry';
                    events = events.concat(syncTreeAckUserWrite(repo.serverSyncTree_, transaction.currentWriteId, true));
                }
                else {
                    // This code reruns a transaction
                    const currentNode = repoGetLatestState(repo, transaction.path, setsToIgnore);
                    transaction.currentInputSnapshot = currentNode;
                    const newData = queue[i].update(currentNode.val());
                    if (newData !== undefined) {
                        validateFirebaseData('transaction failed: Data returned ', newData, transaction.path);
                        let newDataNode = nodeFromJSON(newData);
                        const hasExplicitPriority = typeof newData === 'object' &&
                            newData != null &&
                            contains$1(newData, '.priority');
                        if (!hasExplicitPriority) {
                            // Keep the old priority if there wasn't a priority explicitly specified.
                            newDataNode = newDataNode.updatePriority(currentNode.getPriority());
                        }
                        const oldWriteId = transaction.currentWriteId;
                        const serverValues = repoGenerateServerValues(repo);
                        const newNodeResolved = resolveDeferredValueSnapshot(newDataNode, currentNode, serverValues);
                        transaction.currentOutputSnapshotRaw = newDataNode;
                        transaction.currentOutputSnapshotResolved = newNodeResolved;
                        transaction.currentWriteId = repoGetNextWriteId(repo);
                        // Mutates setsToIgnore in place
                        setsToIgnore.splice(setsToIgnore.indexOf(oldWriteId), 1);
                        events = events.concat(syncTreeApplyUserOverwrite(repo.serverSyncTree_, transaction.path, newNodeResolved, transaction.currentWriteId, transaction.applyLocally));
                        events = events.concat(syncTreeAckUserWrite(repo.serverSyncTree_, oldWriteId, true));
                    }
                    else {
                        abortTransaction = true;
                        abortReason = 'nodata';
                        events = events.concat(syncTreeAckUserWrite(repo.serverSyncTree_, transaction.currentWriteId, true));
                    }
                }
            }
            eventQueueRaiseEventsForChangedPath(repo.eventQueue_, path, events);
            events = [];
            if (abortTransaction) {
                // Abort.
                queue[i].status = 2 /* COMPLETED */;
                // Removing a listener can trigger pruning which can muck with
                // mergedData/visibleData (as it prunes data). So defer the unwatcher
                // until we're done.
                (function (unwatcher) {
                    setTimeout(unwatcher, Math.floor(0));
                })(queue[i].unwatcher);
                if (queue[i].onComplete) {
                    if (abortReason === 'nodata') {
                        callbacks.push(() => queue[i].onComplete(null, false, queue[i].currentInputSnapshot));
                    }
                    else {
                        callbacks.push(() => queue[i].onComplete(new Error(abortReason), false, null));
                    }
                }
            }
        }
        // Clean up completed transactions.
        repoPruneCompletedTransactionsBelowNode(repo, repo.transactionQueueTree_);
        // Now fire callbacks, now that we're in a good, known state.
        for (let i = 0; i < callbacks.length; i++) {
            exceptionGuard(callbacks[i]);
        }
        // Try to send the transaction result to the server.
        repoSendReadyTransactions(repo, repo.transactionQueueTree_);
    }
    /**
     * Returns the rootmost ancestor node of the specified path that has a pending
     * transaction on it, or just returns the node for the given path if there are
     * no pending transactions on any ancestor.
     *
     * @param path - The location to start at.
     * @returns The rootmost node with a transaction.
     */
    function repoGetAncestorTransactionNode(repo, path) {
        let front;
        // Start at the root and walk deeper into the tree towards path until we
        // find a node with pending transactions.
        let transactionNode = repo.transactionQueueTree_;
        front = pathGetFront(path);
        while (front !== null && treeGetValue(transactionNode) === undefined) {
            transactionNode = treeSubTree(transactionNode, front);
            path = pathPopFront(path);
            front = pathGetFront(path);
        }
        return transactionNode;
    }
    /**
     * Builds the queue of all transactions at or below the specified
     * transactionNode.
     *
     * @param transactionNode
     * @returns The generated queue.
     */
    function repoBuildTransactionQueue(repo, transactionNode) {
        // Walk any child transaction queues and aggregate them into a single queue.
        const transactionQueue = [];
        repoAggregateTransactionQueuesForNode(repo, transactionNode, transactionQueue);
        // Sort them by the order the transactions were created.
        transactionQueue.sort((a, b) => a.order - b.order);
        return transactionQueue;
    }
    function repoAggregateTransactionQueuesForNode(repo, node, queue) {
        const nodeQueue = treeGetValue(node);
        if (nodeQueue) {
            for (let i = 0; i < nodeQueue.length; i++) {
                queue.push(nodeQueue[i]);
            }
        }
        treeForEachChild(node, child => {
            repoAggregateTransactionQueuesForNode(repo, child, queue);
        });
    }
    /**
     * Remove COMPLETED transactions at or below this node in the transactionQueueTree_.
     */
    function repoPruneCompletedTransactionsBelowNode(repo, node) {
        const queue = treeGetValue(node);
        if (queue) {
            let to = 0;
            for (let from = 0; from < queue.length; from++) {
                if (queue[from].status !== 2 /* COMPLETED */) {
                    queue[to] = queue[from];
                    to++;
                }
            }
            queue.length = to;
            treeSetValue(node, queue.length > 0 ? queue : undefined);
        }
        treeForEachChild(node, childNode => {
            repoPruneCompletedTransactionsBelowNode(repo, childNode);
        });
    }
    /**
     * Aborts all transactions on ancestors or descendants of the specified path.
     * Called when doing a set() or update() since we consider them incompatible
     * with transactions.
     *
     * @param path - Path for which we want to abort related transactions.
     */
    function repoAbortTransactions(repo, path) {
        const affectedPath = treeGetPath(repoGetAncestorTransactionNode(repo, path));
        const transactionNode = treeSubTree(repo.transactionQueueTree_, path);
        treeForEachAncestor(transactionNode, (node) => {
            repoAbortTransactionsOnNode(repo, node);
        });
        repoAbortTransactionsOnNode(repo, transactionNode);
        treeForEachDescendant(transactionNode, (node) => {
            repoAbortTransactionsOnNode(repo, node);
        });
        return affectedPath;
    }
    /**
     * Abort transactions stored in this transaction queue node.
     *
     * @param node - Node to abort transactions for.
     */
    function repoAbortTransactionsOnNode(repo, node) {
        const queue = treeGetValue(node);
        if (queue) {
            // Queue up the callbacks and fire them after cleaning up all of our
            // transaction state, since the callback could trigger more transactions
            // or sets.
            const callbacks = [];
            // Go through queue.  Any already-sent transactions must be marked for
            // abort, while the unsent ones can be immediately aborted and removed.
            let events = [];
            let lastSent = -1;
            for (let i = 0; i < queue.length; i++) {
                if (queue[i].status === 3 /* SENT_NEEDS_ABORT */) ;
                else if (queue[i].status === 1 /* SENT */) {
                    assert(lastSent === i - 1, 'All SENT items should be at beginning of queue.');
                    lastSent = i;
                    // Mark transaction for abort when it comes back.
                    queue[i].status = 3 /* SENT_NEEDS_ABORT */;
                    queue[i].abortReason = 'set';
                }
                else {
                    assert(queue[i].status === 0 /* RUN */, 'Unexpected transaction status in abort');
                    // We can abort it immediately.
                    queue[i].unwatcher();
                    events = events.concat(syncTreeAckUserWrite(repo.serverSyncTree_, queue[i].currentWriteId, true));
                    if (queue[i].onComplete) {
                        callbacks.push(queue[i].onComplete.bind(null, new Error('set'), false, null));
                    }
                }
            }
            if (lastSent === -1) {
                // We're not waiting for any sent transactions.  We can clear the queue.
                treeSetValue(node, undefined);
            }
            else {
                // Remove the transactions we aborted.
                queue.length = lastSent + 1;
            }
            // Now fire the callbacks.
            eventQueueRaiseEventsForChangedPath(repo.eventQueue_, treeGetPath(node), events);
            for (let i = 0; i < callbacks.length; i++) {
                exceptionGuard(callbacks[i]);
            }
        }
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    function decodePath(pathString) {
        let pathStringDecoded = '';
        const pieces = pathString.split('/');
        for (let i = 0; i < pieces.length; i++) {
            if (pieces[i].length > 0) {
                let piece = pieces[i];
                try {
                    piece = decodeURIComponent(piece.replace(/\+/g, ' '));
                }
                catch (e) { }
                pathStringDecoded += '/' + piece;
            }
        }
        return pathStringDecoded;
    }
    /**
     * @returns key value hash
     */
    function decodeQuery(queryString) {
        const results = {};
        if (queryString.charAt(0) === '?') {
            queryString = queryString.substring(1);
        }
        for (const segment of queryString.split('&')) {
            if (segment.length === 0) {
                continue;
            }
            const kv = segment.split('=');
            if (kv.length === 2) {
                results[decodeURIComponent(kv[0])] = decodeURIComponent(kv[1]);
            }
            else {
                warn(`Invalid query segment '${segment}' in query '${queryString}'`);
            }
        }
        return results;
    }
    const parseRepoInfo = function (dataURL, nodeAdmin) {
        const parsedUrl = parseDatabaseURL(dataURL), namespace = parsedUrl.namespace;
        if (parsedUrl.domain === 'firebase.com') {
            fatal(parsedUrl.host +
                ' is no longer supported. ' +
                'Please use <YOUR FIREBASE>.firebaseio.com instead');
        }
        // Catch common error of uninitialized namespace value.
        if ((!namespace || namespace === 'undefined') &&
            parsedUrl.domain !== 'localhost') {
            fatal('Cannot parse Firebase url. Please use https://<YOUR FIREBASE>.firebaseio.com');
        }
        if (!parsedUrl.secure) {
            warnIfPageIsSecure();
        }
        const webSocketOnly = parsedUrl.scheme === 'ws' || parsedUrl.scheme === 'wss';
        return {
            repoInfo: new RepoInfo(parsedUrl.host, parsedUrl.secure, namespace, nodeAdmin, webSocketOnly, 
            /*persistenceKey=*/ '', 
            /*includeNamespaceInQueryParams=*/ namespace !== parsedUrl.subdomain),
            path: new Path(parsedUrl.pathString)
        };
    };
    const parseDatabaseURL = function (dataURL) {
        // Default to empty strings in the event of a malformed string.
        let host = '', domain = '', subdomain = '', pathString = '', namespace = '';
        // Always default to SSL, unless otherwise specified.
        let secure = true, scheme = 'https', port = 443;
        // Don't do any validation here. The caller is responsible for validating the result of parsing.
        if (typeof dataURL === 'string') {
            // Parse scheme.
            let colonInd = dataURL.indexOf('//');
            if (colonInd >= 0) {
                scheme = dataURL.substring(0, colonInd - 1);
                dataURL = dataURL.substring(colonInd + 2);
            }
            // Parse host, path, and query string.
            let slashInd = dataURL.indexOf('/');
            if (slashInd === -1) {
                slashInd = dataURL.length;
            }
            let questionMarkInd = dataURL.indexOf('?');
            if (questionMarkInd === -1) {
                questionMarkInd = dataURL.length;
            }
            host = dataURL.substring(0, Math.min(slashInd, questionMarkInd));
            if (slashInd < questionMarkInd) {
                // For pathString, questionMarkInd will always come after slashInd
                pathString = decodePath(dataURL.substring(slashInd, questionMarkInd));
            }
            const queryParams = decodeQuery(dataURL.substring(Math.min(dataURL.length, questionMarkInd)));
            // If we have a port, use scheme for determining if it's secure.
            colonInd = host.indexOf(':');
            if (colonInd >= 0) {
                secure = scheme === 'https' || scheme === 'wss';
                port = parseInt(host.substring(colonInd + 1), 10);
            }
            else {
                colonInd = host.length;
            }
            const hostWithoutPort = host.slice(0, colonInd);
            if (hostWithoutPort.toLowerCase() === 'localhost') {
                domain = 'localhost';
            }
            else if (hostWithoutPort.split('.').length <= 2) {
                domain = hostWithoutPort;
            }
            else {
                // Interpret the subdomain of a 3 or more component URL as the namespace name.
                const dotInd = host.indexOf('.');
                subdomain = host.substring(0, dotInd).toLowerCase();
                domain = host.substring(dotInd + 1);
                // Normalize namespaces to lowercase to share storage / connection.
                namespace = subdomain;
            }
            // Always treat the value of the `ns` as the namespace name if it is present.
            if ('ns' in queryParams) {
                namespace = queryParams['ns'];
            }
        }
        return {
            host,
            port,
            domain,
            subdomain,
            secure,
            scheme,
            pathString,
            namespace
        };
    };

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * Encapsulates the data needed to raise an event
     */
    class DataEvent {
        /**
         * @param eventType - One of: value, child_added, child_changed, child_moved, child_removed
         * @param eventRegistration - The function to call to with the event data. User provided
         * @param snapshot - The data backing the event
         * @param prevName - Optional, the name of the previous child for child_* events.
         */
        constructor(eventType, eventRegistration, snapshot, prevName) {
            this.eventType = eventType;
            this.eventRegistration = eventRegistration;
            this.snapshot = snapshot;
            this.prevName = prevName;
        }
        getPath() {
            const ref = this.snapshot.ref;
            if (this.eventType === 'value') {
                return ref._path;
            }
            else {
                return ref.parent._path;
            }
        }
        getEventType() {
            return this.eventType;
        }
        getEventRunner() {
            return this.eventRegistration.getEventRunner(this);
        }
        toString() {
            return (this.getPath().toString() +
                ':' +
                this.eventType +
                ':' +
                stringify(this.snapshot.exportVal()));
        }
    }
    class CancelEvent {
        constructor(eventRegistration, error, path) {
            this.eventRegistration = eventRegistration;
            this.error = error;
            this.path = path;
        }
        getPath() {
            return this.path;
        }
        getEventType() {
            return 'cancel';
        }
        getEventRunner() {
            return this.eventRegistration.getEventRunner(this);
        }
        toString() {
            return this.path.toString() + ':cancel';
        }
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * A wrapper class that converts events from the database@exp SDK to the legacy
     * Database SDK. Events are not converted directly as event registration relies
     * on reference comparison of the original user callback (see `matches()`) and
     * relies on equality of the legacy SDK's `context` object.
     */
    class CallbackContext {
        constructor(snapshotCallback, cancelCallback) {
            this.snapshotCallback = snapshotCallback;
            this.cancelCallback = cancelCallback;
        }
        onValue(expDataSnapshot, previousChildName) {
            this.snapshotCallback.call(null, expDataSnapshot, previousChildName);
        }
        onCancel(error) {
            assert(this.hasCancelCallback, 'Raising a cancel event on a listener with no cancel callback');
            return this.cancelCallback.call(null, error);
        }
        get hasCancelCallback() {
            return !!this.cancelCallback;
        }
        matches(other) {
            return (this.snapshotCallback === other.snapshotCallback ||
                (this.snapshotCallback.userCallback !== undefined &&
                    this.snapshotCallback.userCallback ===
                        other.snapshotCallback.userCallback &&
                    this.snapshotCallback.context === other.snapshotCallback.context));
        }
    }

    /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * @internal
     */
    class QueryImpl {
        /**
         * @hideconstructor
         */
        constructor(_repo, _path, _queryParams, _orderByCalled) {
            this._repo = _repo;
            this._path = _path;
            this._queryParams = _queryParams;
            this._orderByCalled = _orderByCalled;
        }
        get key() {
            if (pathIsEmpty(this._path)) {
                return null;
            }
            else {
                return pathGetBack(this._path);
            }
        }
        get ref() {
            return new ReferenceImpl(this._repo, this._path);
        }
        get _queryIdentifier() {
            const obj = queryParamsGetQueryObject(this._queryParams);
            const id = ObjectToUniqueKey(obj);
            return id === '{}' ? 'default' : id;
        }
        /**
         * An object representation of the query parameters used by this Query.
         */
        get _queryObject() {
            return queryParamsGetQueryObject(this._queryParams);
        }
        isEqual(other) {
            other = getModularInstance(other);
            if (!(other instanceof QueryImpl)) {
                return false;
            }
            const sameRepo = this._repo === other._repo;
            const samePath = pathEquals(this._path, other._path);
            const sameQueryIdentifier = this._queryIdentifier === other._queryIdentifier;
            return sameRepo && samePath && sameQueryIdentifier;
        }
        toJSON() {
            return this.toString();
        }
        toString() {
            return this._repo.toString() + pathToUrlEncodedString(this._path);
        }
    }
    /**
     * @internal
     */
    class ReferenceImpl extends QueryImpl {
        /** @hideconstructor */
        constructor(repo, path) {
            super(repo, path, new QueryParams(), false);
        }
        get parent() {
            const parentPath = pathParent(this._path);
            return parentPath === null
                ? null
                : new ReferenceImpl(this._repo, parentPath);
        }
        get root() {
            let ref = this;
            while (ref.parent !== null) {
                ref = ref.parent;
            }
            return ref;
        }
    }
    /**
     * A `DataSnapshot` contains data from a Database location.
     *
     * Any time you read data from the Database, you receive the data as a
     * `DataSnapshot`. A `DataSnapshot` is passed to the event callbacks you attach
     * with `on()` or `once()`. You can extract the contents of the snapshot as a
     * JavaScript object by calling the `val()` method. Alternatively, you can
     * traverse into the snapshot by calling `child()` to return child snapshots
     * (which you could then call `val()` on).
     *
     * A `DataSnapshot` is an efficiently generated, immutable copy of the data at
     * a Database location. It cannot be modified and will never change (to modify
     * data, you always call the `set()` method on a `Reference` directly).
     */
    class DataSnapshot {
        /**
         * @param _node - A SnapshotNode to wrap.
         * @param ref - The location this snapshot came from.
         * @param _index - The iteration order for this snapshot
         * @hideconstructor
         */
        constructor(_node, 
        /**
         * The location of this DataSnapshot.
         */
        ref, _index) {
            this._node = _node;
            this.ref = ref;
            this._index = _index;
        }
        /**
         * Gets the priority value of the data in this `DataSnapshot`.
         *
         * Applications need not use priority but can order collections by
         * ordinary properties (see
         * {@link https://firebase.google.com/docs/database/web/lists-of-data#sorting_and_filtering_data |Sorting and filtering data}
         * ).
         */
        get priority() {
            // typecast here because we never return deferred values or internal priorities (MAX_PRIORITY)
            return this._node.getPriority().val();
        }
        /**
         * The key (last part of the path) of the location of this `DataSnapshot`.
         *
         * The last token in a Database location is considered its key. For example,
         * "ada" is the key for the /users/ada/ node. Accessing the key on any
         * `DataSnapshot` will return the key for the location that generated it.
         * However, accessing the key on the root URL of a Database will return
         * `null`.
         */
        get key() {
            return this.ref.key;
        }
        /** Returns the number of child properties of this `DataSnapshot`. */
        get size() {
            return this._node.numChildren();
        }
        /**
         * Gets another `DataSnapshot` for the location at the specified relative path.
         *
         * Passing a relative path to the `child()` method of a DataSnapshot returns
         * another `DataSnapshot` for the location at the specified relative path. The
         * relative path can either be a simple child name (for example, "ada") or a
         * deeper, slash-separated path (for example, "ada/name/first"). If the child
         * location has no data, an empty `DataSnapshot` (that is, a `DataSnapshot`
         * whose value is `null`) is returned.
         *
         * @param path - A relative path to the location of child data.
         */
        child(path) {
            const childPath = new Path(path);
            const childRef = child(this.ref, path);
            return new DataSnapshot(this._node.getChild(childPath), childRef, PRIORITY_INDEX);
        }
        /**
         * Returns true if this `DataSnapshot` contains any data. It is slightly more
         * efficient than using `snapshot.val() !== null`.
         */
        exists() {
            return !this._node.isEmpty();
        }
        /**
         * Exports the entire contents of the DataSnapshot as a JavaScript object.
         *
         * The `exportVal()` method is similar to `val()`, except priority information
         * is included (if available), making it suitable for backing up your data.
         *
         * @returns The DataSnapshot's contents as a JavaScript value (Object,
         *   Array, string, number, boolean, or `null`).
         */
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        exportVal() {
            return this._node.val(true);
        }
        /**
         * Enumerates the top-level children in the `DataSnapshot`.
         *
         * Because of the way JavaScript objects work, the ordering of data in the
         * JavaScript object returned by `val()` is not guaranteed to match the
         * ordering on the server nor the ordering of `onChildAdded()` events. That is
         * where `forEach()` comes in handy. It guarantees the children of a
         * `DataSnapshot` will be iterated in their query order.
         *
         * If no explicit `orderBy*()` method is used, results are returned
         * ordered by key (unless priorities are used, in which case, results are
         * returned by priority).
         *
         * @param action - A function that will be called for each child DataSnapshot.
         * The callback can return true to cancel further enumeration.
         * @returns true if enumeration was canceled due to your callback returning
         * true.
         */
        forEach(action) {
            if (this._node.isLeafNode()) {
                return false;
            }
            const childrenNode = this._node;
            // Sanitize the return value to a boolean. ChildrenNode.forEachChild has a weird return type...
            return !!childrenNode.forEachChild(this._index, (key, node) => {
                return action(new DataSnapshot(node, child(this.ref, key), PRIORITY_INDEX));
            });
        }
        /**
         * Returns true if the specified child path has (non-null) data.
         *
         * @param path - A relative path to the location of a potential child.
         * @returns `true` if data exists at the specified child path; else
         *  `false`.
         */
        hasChild(path) {
            const childPath = new Path(path);
            return !this._node.getChild(childPath).isEmpty();
        }
        /**
         * Returns whether or not the `DataSnapshot` has any non-`null` child
         * properties.
         *
         * You can use `hasChildren()` to determine if a `DataSnapshot` has any
         * children. If it does, you can enumerate them using `forEach()`. If it
         * doesn't, then either this snapshot contains a primitive value (which can be
         * retrieved with `val()`) or it is empty (in which case, `val()` will return
         * `null`).
         *
         * @returns true if this snapshot has any children; else false.
         */
        hasChildren() {
            if (this._node.isLeafNode()) {
                return false;
            }
            else {
                return !this._node.isEmpty();
            }
        }
        /**
         * Returns a JSON-serializable representation of this object.
         */
        toJSON() {
            return this.exportVal();
        }
        /**
         * Extracts a JavaScript value from a `DataSnapshot`.
         *
         * Depending on the data in a `DataSnapshot`, the `val()` method may return a
         * scalar type (string, number, or boolean), an array, or an object. It may
         * also return null, indicating that the `DataSnapshot` is empty (contains no
         * data).
         *
         * @returns The DataSnapshot's contents as a JavaScript value (Object,
         *   Array, string, number, boolean, or `null`).
         */
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        val() {
            return this._node.val();
        }
    }
    /**
     *
     * Returns a `Reference` representing the location in the Database
     * corresponding to the provided path. If no path is provided, the `Reference`
     * will point to the root of the Database.
     *
     * @param db - The database instance to obtain a reference for.
     * @param path - Optional path representing the location the returned
     *   `Reference` will point. If not provided, the returned `Reference` will
     *   point to the root of the Database.
     * @returns If a path is provided, a `Reference`
     *   pointing to the provided path. Otherwise, a `Reference` pointing to the
     *   root of the Database.
     */
    function ref(db, path) {
        db = getModularInstance(db);
        db._checkNotDeleted('ref');
        return path !== undefined ? child(db._root, path) : db._root;
    }
    /**
     * Gets a `Reference` for the location at the specified relative path.
     *
     * The relative path can either be a simple child name (for example, "ada") or
     * a deeper slash-separated path (for example, "ada/name/first").
     *
     * @param parent - The parent location.
     * @param path - A relative path from this location to the desired child
     *   location.
     * @returns The specified child location.
     */
    function child(parent, path) {
        parent = getModularInstance(parent);
        if (pathGetFront(parent._path) === null) {
            validateRootPathString('child', 'path', path, false);
        }
        else {
            validatePathString('child', 'path', path, false);
        }
        return new ReferenceImpl(parent._repo, pathChild(parent._path, path));
    }
    /**
     * Generates a new child location using a unique key and returns its
     * `Reference`.
     *
     * This is the most common pattern for adding data to a collection of items.
     *
     * If you provide a value to `push()`, the value is written to the
     * generated location. If you don't pass a value, nothing is written to the
     * database and the child remains empty (but you can use the `Reference`
     * elsewhere).
     *
     * The unique keys generated by `push()` are ordered by the current time, so the
     * resulting list of items is chronologically sorted. The keys are also
     * designed to be unguessable (they contain 72 random bits of entropy).
     *
     * See {@link https://firebase.google.com/docs/database/web/lists-of-data#append_to_a_list_of_data | Append to a list of data}
     * </br>See {@link ttps://firebase.googleblog.com/2015/02/the-2120-ways-to-ensure-unique_68.html | The 2^120 Ways to Ensure Unique Identifiers}
     *
     * @param parent - The parent location.
     * @param value - Optional value to be written at the generated location.
     * @returns Combined `Promise` and `Reference`; resolves when write is complete,
     * but can be used immediately as the `Reference` to the child location.
     */
    function push(parent, value) {
        parent = getModularInstance(parent);
        validateWritablePath('push', parent._path);
        validateFirebaseDataArg('push', value, parent._path, true);
        const now = repoServerTime(parent._repo);
        const name = nextPushId(now);
        // push() returns a ThennableReference whose promise is fulfilled with a
        // regular Reference. We use child() to create handles to two different
        // references. The first is turned into a ThennableReference below by adding
        // then() and catch() methods and is used as the return value of push(). The
        // second remains a regular Reference and is used as the fulfilled value of
        // the first ThennableReference.
        const thennablePushRef = child(parent, name);
        const pushRef = child(parent, name);
        let promise;
        if (value != null) {
            promise = set$2(pushRef, value).then(() => pushRef);
        }
        else {
            promise = Promise.resolve(pushRef);
        }
        thennablePushRef.then = promise.then.bind(promise);
        thennablePushRef.catch = promise.then.bind(promise, undefined);
        return thennablePushRef;
    }
    /**
     * Writes data to this Database location.
     *
     * This will overwrite any data at this location and all child locations.
     *
     * The effect of the write will be visible immediately, and the corresponding
     * events ("value", "child_added", etc.) will be triggered. Synchronization of
     * the data to the Firebase servers will also be started, and the returned
     * Promise will resolve when complete. If provided, the `onComplete` callback
     * will be called asynchronously after synchronization has finished.
     *
     * Passing `null` for the new value is equivalent to calling `remove()`; namely,
     * all data at this location and all child locations will be deleted.
     *
     * `set()` will remove any priority stored at this location, so if priority is
     * meant to be preserved, you need to use `setWithPriority()` instead.
     *
     * Note that modifying data with `set()` will cancel any pending transactions
     * at that location, so extreme care should be taken if mixing `set()` and
     * `transaction()` to modify the same data.
     *
     * A single `set()` will generate a single "value" event at the location where
     * the `set()` was performed.
     *
     * @param ref - The location to write to.
     * @param value - The value to be written (string, number, boolean, object,
     *   array, or null).
     * @returns Resolves when write to server is complete.
     */
    function set$2(ref, value) {
        ref = getModularInstance(ref);
        validateWritablePath('set', ref._path);
        validateFirebaseDataArg('set', value, ref._path, false);
        const deferred = new Deferred();
        repoSetWithPriority(ref._repo, ref._path, value, 
        /*priority=*/ null, deferred.wrapCallback(() => { }));
        return deferred.promise;
    }
    /**
     * Gets the most up-to-date result for this query.
     *
     * @param query - The query to run.
     * @returns A `Promise` which resolves to the resulting DataSnapshot if a value is
     * available, or rejects if the client is unable to return a value (e.g., if the
     * server is unreachable and there is nothing cached).
     */
    function get$2(query) {
        query = getModularInstance(query);
        return repoGetValue(query._repo, query).then(node => {
            return new DataSnapshot(node, new ReferenceImpl(query._repo, query._path), query._queryParams.getIndex());
        });
    }
    /**
     * Represents registration for 'value' events.
     */
    class ValueEventRegistration {
        constructor(callbackContext) {
            this.callbackContext = callbackContext;
        }
        respondsTo(eventType) {
            return eventType === 'value';
        }
        createEvent(change, query) {
            const index = query._queryParams.getIndex();
            return new DataEvent('value', this, new DataSnapshot(change.snapshotNode, new ReferenceImpl(query._repo, query._path), index));
        }
        getEventRunner(eventData) {
            if (eventData.getEventType() === 'cancel') {
                return () => this.callbackContext.onCancel(eventData.error);
            }
            else {
                return () => this.callbackContext.onValue(eventData.snapshot, null);
            }
        }
        createCancelEvent(error, path) {
            if (this.callbackContext.hasCancelCallback) {
                return new CancelEvent(this, error, path);
            }
            else {
                return null;
            }
        }
        matches(other) {
            if (!(other instanceof ValueEventRegistration)) {
                return false;
            }
            else if (!other.callbackContext || !this.callbackContext) {
                // If no callback specified, we consider it to match any callback.
                return true;
            }
            else {
                return other.callbackContext.matches(this.callbackContext);
            }
        }
        hasAnyCallback() {
            return this.callbackContext !== null;
        }
    }
    /**
     * Represents the registration of a child_x event.
     */
    class ChildEventRegistration {
        constructor(eventType, callbackContext) {
            this.eventType = eventType;
            this.callbackContext = callbackContext;
        }
        respondsTo(eventType) {
            let eventToCheck = eventType === 'children_added' ? 'child_added' : eventType;
            eventToCheck =
                eventToCheck === 'children_removed' ? 'child_removed' : eventToCheck;
            return this.eventType === eventToCheck;
        }
        createCancelEvent(error, path) {
            if (this.callbackContext.hasCancelCallback) {
                return new CancelEvent(this, error, path);
            }
            else {
                return null;
            }
        }
        createEvent(change, query) {
            assert(change.childName != null, 'Child events should have a childName.');
            const childRef = child(new ReferenceImpl(query._repo, query._path), change.childName);
            const index = query._queryParams.getIndex();
            return new DataEvent(change.type, this, new DataSnapshot(change.snapshotNode, childRef, index), change.prevName);
        }
        getEventRunner(eventData) {
            if (eventData.getEventType() === 'cancel') {
                return () => this.callbackContext.onCancel(eventData.error);
            }
            else {
                return () => this.callbackContext.onValue(eventData.snapshot, eventData.prevName);
            }
        }
        matches(other) {
            if (other instanceof ChildEventRegistration) {
                return (this.eventType === other.eventType &&
                    (!this.callbackContext ||
                        !other.callbackContext ||
                        this.callbackContext.matches(other.callbackContext)));
            }
            return false;
        }
        hasAnyCallback() {
            return !!this.callbackContext;
        }
    }
    function addEventListener(query, eventType, callback, cancelCallbackOrListenOptions, options) {
        let cancelCallback;
        if (typeof cancelCallbackOrListenOptions === 'object') {
            cancelCallback = undefined;
            options = cancelCallbackOrListenOptions;
        }
        if (typeof cancelCallbackOrListenOptions === 'function') {
            cancelCallback = cancelCallbackOrListenOptions;
        }
        if (options && options.onlyOnce) {
            const userCallback = callback;
            const onceCallback = (dataSnapshot, previousChildName) => {
                repoRemoveEventCallbackForQuery(query._repo, query, container);
                userCallback(dataSnapshot, previousChildName);
            };
            onceCallback.userCallback = callback.userCallback;
            onceCallback.context = callback.context;
            callback = onceCallback;
        }
        const callbackContext = new CallbackContext(callback, cancelCallback || undefined);
        const container = eventType === 'value'
            ? new ValueEventRegistration(callbackContext)
            : new ChildEventRegistration(eventType, callbackContext);
        repoAddEventCallbackForQuery(query._repo, query, container);
        return () => repoRemoveEventCallbackForQuery(query._repo, query, container);
    }
    function onValue(query, callback, cancelCallbackOrListenOptions, options) {
        return addEventListener(query, 'value', callback, cancelCallbackOrListenOptions, options);
    }
    /**
     * Define reference constructor in various modules
     *
     * We are doing this here to avoid several circular
     * dependency issues
     */
    syncPointSetReferenceConstructor(ReferenceImpl);
    syncTreeSetReferenceConstructor(ReferenceImpl);

    /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * This variable is also defined in the firebase Node.js Admin SDK. Before
     * modifying this definition, consult the definition in:
     *
     * https://github.com/firebase/firebase-admin-node
     *
     * and make sure the two are consistent.
     */
    const FIREBASE_DATABASE_EMULATOR_HOST_VAR = 'FIREBASE_DATABASE_EMULATOR_HOST';
    /**
     * Creates and caches `Repo` instances.
     */
    const repos = {};
    /**
     * If true, any new `Repo` will be created to use `ReadonlyRestClient` (for testing purposes).
     */
    let useRestClient = false;
    /**
     * This function should only ever be called to CREATE a new database instance.
     * @internal
     */
    function repoManagerDatabaseFromApp(app, authProvider, appCheckProvider, url, nodeAdmin) {
        let dbUrl = url || app.options.databaseURL;
        if (dbUrl === undefined) {
            if (!app.options.projectId) {
                fatal("Can't determine Firebase Database URL. Be sure to include " +
                    ' a Project ID when calling firebase.initializeApp().');
            }
            log('Using default host for project ', app.options.projectId);
            dbUrl = `${app.options.projectId}-default-rtdb.firebaseio.com`;
        }
        let parsedUrl = parseRepoInfo(dbUrl, nodeAdmin);
        let repoInfo = parsedUrl.repoInfo;
        let isEmulator;
        let dbEmulatorHost = undefined;
        if (typeof process !== 'undefined') {
            dbEmulatorHost = process.env[FIREBASE_DATABASE_EMULATOR_HOST_VAR];
        }
        if (dbEmulatorHost) {
            isEmulator = true;
            dbUrl = `http://${dbEmulatorHost}?ns=${repoInfo.namespace}`;
            parsedUrl = parseRepoInfo(dbUrl, nodeAdmin);
            repoInfo = parsedUrl.repoInfo;
        }
        else {
            isEmulator = !parsedUrl.repoInfo.secure;
        }
        const authTokenProvider = nodeAdmin && isEmulator
            ? new EmulatorTokenProvider(EmulatorTokenProvider.OWNER)
            : new FirebaseAuthTokenProvider(app.name, app.options, authProvider);
        validateUrl('Invalid Firebase Database URL', parsedUrl);
        if (!pathIsEmpty(parsedUrl.path)) {
            fatal('Database URL must point to the root of a Firebase Database ' +
                '(not including a child path).');
        }
        const repo = repoManagerCreateRepo(repoInfo, app, authTokenProvider, new AppCheckTokenProvider(app.name, appCheckProvider));
        return new Database(repo, app);
    }
    /**
     * Remove the repo and make sure it is disconnected.
     *
     */
    function repoManagerDeleteRepo(repo, appName) {
        const appRepos = repos[appName];
        // This should never happen...
        if (!appRepos || appRepos[repo.key] !== repo) {
            fatal(`Database ${appName}(${repo.repoInfo_}) has already been deleted.`);
        }
        repoInterrupt(repo);
        delete appRepos[repo.key];
    }
    /**
     * Ensures a repo doesn't already exist and then creates one using the
     * provided app.
     *
     * @param repoInfo - The metadata about the Repo
     * @returns The Repo object for the specified server / repoName.
     */
    function repoManagerCreateRepo(repoInfo, app, authTokenProvider, appCheckProvider) {
        let appRepos = repos[app.name];
        if (!appRepos) {
            appRepos = {};
            repos[app.name] = appRepos;
        }
        let repo = appRepos[repoInfo.toURLString()];
        if (repo) {
            fatal('Database initialized multiple times. Please make sure the format of the database URL matches with each database() call.');
        }
        repo = new Repo(repoInfo, useRestClient, authTokenProvider, appCheckProvider);
        appRepos[repoInfo.toURLString()] = repo;
        return repo;
    }
    /**
     * Class representing a Firebase Realtime Database.
     */
    class Database {
        /** @hideconstructor */
        constructor(_repoInternal, 
        /** The {@link @firebase/app#FirebaseApp} associated with this Realtime Database instance. */
        app) {
            this._repoInternal = _repoInternal;
            this.app = app;
            /** Represents a `Database` instance. */
            this['type'] = 'database';
            /** Track if the instance has been used (root or repo accessed) */
            this._instanceStarted = false;
        }
        get _repo() {
            if (!this._instanceStarted) {
                repoStart(this._repoInternal, this.app.options.appId, this.app.options['databaseAuthVariableOverride']);
                this._instanceStarted = true;
            }
            return this._repoInternal;
        }
        get _root() {
            if (!this._rootInternal) {
                this._rootInternal = new ReferenceImpl(this._repo, newEmptyPath());
            }
            return this._rootInternal;
        }
        _delete() {
            if (this._rootInternal !== null) {
                repoManagerDeleteRepo(this._repo, this.app.name);
                this._repoInternal = null;
                this._rootInternal = null;
            }
            return Promise.resolve();
        }
        _checkNotDeleted(apiName) {
            if (this._rootInternal === null) {
                fatal('Cannot call ' + apiName + ' on a deleted database.');
            }
        }
    }
    /**
     * Returns the instance of the Realtime Database SDK that is associated
     * with the provided {@link @firebase/app#FirebaseApp}. Initializes a new instance with
     * with default settings if no instance exists or if the existing instance uses
     * a custom database URL.
     *
     * @param app - The {@link @firebase/app#FirebaseApp} instance that the returned Realtime
     * Database instance is associated with.
     * @param url - The URL of the Realtime Database instance to connect to. If not
     * provided, the SDK connects to the default instance of the Firebase App.
     * @returns The `Database` instance of the provided app.
     */
    function getDatabase(app = getApp(), url) {
        return _getProvider(app, 'database').getImmediate({
            identifier: url
        });
    }

    /**
     * @license
     * Copyright 2021 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    function registerDatabase(variant) {
        setSDKVersion(SDK_VERSION$1);
        _registerComponent(new Component('database', (container, { instanceIdentifier: url }) => {
            const app = container.getProvider('app').getImmediate();
            const authProvider = container.getProvider('auth-internal');
            const appCheckProvider = container.getProvider('app-check-internal');
            return repoManagerDatabaseFromApp(app, authProvider, appCheckProvider, url);
        }, "PUBLIC" /* PUBLIC */).setMultipleInstances(true));
        registerVersion(name, version, variant);
        // BUILD_TARGET will be replaced by values like esm5, esm2017, cjs5, etc during the compilation
        registerVersion(name, version, 'esm2017');
    }

    /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * A type for the resolve value of {@link runTransaction}.
     */
    class TransactionResult {
        /** @hideconstructor */
        constructor(
        /** Whether the transaction was successfully committed. */
        committed, 
        /** The resulting data snapshot. */
        snapshot) {
            this.committed = committed;
            this.snapshot = snapshot;
        }
        /** Returns a JSON-serializable representation of this object. */
        toJSON() {
            return { committed: this.committed, snapshot: this.snapshot.toJSON() };
        }
    }
    /**
     * Atomically modifies the data at this location.
     *
     * Atomically modify the data at this location. Unlike a normal `set()`, which
     * just overwrites the data regardless of its previous value, `runTransaction()` is
     * used to modify the existing value to a new value, ensuring there are no
     * conflicts with other clients writing to the same location at the same time.
     *
     * To accomplish this, you pass `runTransaction()` an update function which is
     * used to transform the current value into a new value. If another client
     * writes to the location before your new value is successfully written, your
     * update function will be called again with the new current value, and the
     * write will be retried. This will happen repeatedly until your write succeeds
     * without conflict or you abort the transaction by not returning a value from
     * your update function.
     *
     * Note: Modifying data with `set()` will cancel any pending transactions at
     * that location, so extreme care should be taken if mixing `set()` and
     * `runTransaction()` to update the same data.
     *
     * Note: When using transactions with Security and Firebase Rules in place, be
     * aware that a client needs `.read` access in addition to `.write` access in
     * order to perform a transaction. This is because the client-side nature of
     * transactions requires the client to read the data in order to transactionally
     * update it.
     *
     * @param ref - The location to atomically modify.
     * @param transactionUpdate - A developer-supplied function which will be passed
     * the current data stored at this location (as a JavaScript object). The
     * function should return the new value it would like written (as a JavaScript
     * object). If `undefined` is returned (i.e. you return with no arguments) the
     * transaction will be aborted and the data at this location will not be
     * modified.
     * @param options - An options object to configure transactions.
     * @returns A `Promise` that can optionally be used instead of the `onComplete`
     * callback to handle success and failure.
     */
    function runTransaction(ref, 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    transactionUpdate, options) {
        var _a;
        ref = getModularInstance(ref);
        validateWritablePath('Reference.transaction', ref._path);
        if (ref.key === '.length' || ref.key === '.keys') {
            throw ('Reference.transaction failed: ' + ref.key + ' is a read-only object.');
        }
        const applyLocally = (_a = options === null || options === void 0 ? void 0 : options.applyLocally) !== null && _a !== void 0 ? _a : true;
        const deferred = new Deferred();
        const promiseComplete = (error, committed, node) => {
            let dataSnapshot = null;
            if (error) {
                deferred.reject(error);
            }
            else {
                dataSnapshot = new DataSnapshot(node, new ReferenceImpl(ref._repo, ref._path), PRIORITY_INDEX);
                deferred.resolve(new TransactionResult(committed, dataSnapshot));
            }
        };
        // Add a watch to make sure we get server updates.
        const unwatcher = onValue(ref, () => { });
        repoStartTransaction(ref._repo, ref._path, transactionUpdate, promiseComplete, unwatcher, applyLocally);
        return deferred.promise;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    PersistentConnection.prototype.simpleListen = function (pathString, onComplete) {
        this.sendRequest('q', { p: pathString }, onComplete);
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    PersistentConnection.prototype.echo = function (data, onEcho) {
        this.sendRequest('echo', { d: data }, onEcho);
    };

    /**
     * Firebase Realtime Database
     *
     * @packageDocumentation
     */
    registerDatabase();

    const firebaseConfig = {
      apiKey: 'AIzaSyCFE8TqTBWCDSBee0CuT9HXLnNNRtSA4S8',
      authDomain: 'eye-tracking-8adeb.firebaseapp.com',
      databaseURL: 'https://eye-tracking-8adeb-default-rtdb.firebaseio.com',
      projectId: 'eye-tracking-8adeb',
      storageBucket: 'eye-tracking-8adeb.appspot.com',
      messagingSenderId: '214459503975',
      appId: '1:214459503975:web:ff62018ff95cb21cfe8bc2',
      measurementId: 'G-55T3T75PPR', // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    };

    // Initialize Firebase
    const app$1 = initializeApp(firebaseConfig);

    const db = getDatabase(app$1);
    const storage = getStorage(app$1);

    async function dbGet(itemPath) {
      try {
        let response = await get$2(child(ref(db), itemPath));
        if (response.exists()) {
          return response.val();
        } else {
          return null;
        }
      } catch (error) {
        console.error(error);
      }
    }

    async function dbWrite(itemPath, itemData) {
      try {
        await set$2(ref(db, itemPath), itemData);
        return 'db write done';
      } catch (error) {
        console.error(error);
      }
    }

    function postTest() {
      const postListRef = ref(db, 'works/mehretu-untitled2/sessions');
      const newPostRef = push(postListRef);
      set$2(newPostRef, {
        sessionId: 250,
      });
    }

    function appendData(path, dataToAppend) {
      const postRef = ref(db, path);

      runTransaction(postRef, (post) => {
        if (post) {
          post.push(dataToAppend);
        }
        return post;
      });
    }

    async function uploadBlob(path, blob) {
      try {
        const newFileRef = ref$2(storage, path);
        await uploadBytes(newFileRef, blob);
        return 'blobbity upload';
      } catch (error) {
        console.error(error);
      }
    }

    function ascending$2(a, b) {
      return a == null || b == null ? NaN : a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
    }

    function bisector(f) {
      let delta = f;
      let compare1 = f;
      let compare2 = f;

      if (f.length !== 2) {
        delta = (d, x) => f(d) - x;
        compare1 = ascending$2;
        compare2 = (d, x) => ascending$2(f(d), x);
      }

      function left(a, x, lo = 0, hi = a.length) {
        if (lo < hi) {
          if (compare1(x, x) !== 0) return hi;
          do {
            const mid = (lo + hi) >>> 1;
            if (compare2(a[mid], x) < 0) lo = mid + 1;
            else hi = mid;
          } while (lo < hi);
        }
        return lo;
      }

      function right(a, x, lo = 0, hi = a.length) {
        if (lo < hi) {
          if (compare1(x, x) !== 0) return hi;
          do {
            const mid = (lo + hi) >>> 1;
            if (compare2(a[mid], x) <= 0) lo = mid + 1;
            else hi = mid;
          } while (lo < hi);
        }
        return lo;
      }

      function center(a, x, lo = 0, hi = a.length) {
        const i = left(a, x, lo, hi - 1);
        return i > lo && delta(a[i - 1], x) > -delta(a[i], x) ? i - 1 : i;
      }

      return {left, center, right};
    }

    function number$1(x) {
      return x === null ? NaN : +x;
    }

    const ascendingBisect = bisector(ascending$2);
    const bisectRight = ascendingBisect.right;
    bisector(number$1).center;
    var bisect = bisectRight;

    function count(values, valueof) {
      let count = 0;
      if (valueof === undefined) {
        for (let value of values) {
          if (value != null && (value = +value) >= value) {
            ++count;
          }
        }
      } else {
        let index = -1;
        for (let value of values) {
          if ((value = valueof(value, ++index, values)) != null && (value = +value) >= value) {
            ++count;
          }
        }
      }
      return count;
    }

    function extent(values, valueof) {
      let min;
      let max;
      if (valueof === undefined) {
        for (const value of values) {
          if (value != null) {
            if (min === undefined) {
              if (value >= value) min = max = value;
            } else {
              if (min > value) min = value;
              if (max < value) max = value;
            }
          }
        }
      } else {
        let index = -1;
        for (let value of values) {
          if ((value = valueof(value, ++index, values)) != null) {
            if (min === undefined) {
              if (value >= value) min = max = value;
            } else {
              if (min > value) min = value;
              if (max < value) max = value;
            }
          }
        }
      }
      return [min, max];
    }

    // https://github.com/python/cpython/blob/a74eea238f5baba15797e2e8b570d153bc8690a7/Modules/mathmodule.c#L1423
    class Adder {
      constructor() {
        this._partials = new Float64Array(32);
        this._n = 0;
      }
      add(x) {
        const p = this._partials;
        let i = 0;
        for (let j = 0; j < this._n && j < 32; j++) {
          const y = p[j],
            hi = x + y,
            lo = Math.abs(x) < Math.abs(y) ? x - (hi - y) : y - (hi - x);
          if (lo) p[i++] = lo;
          x = hi;
        }
        p[i] = x;
        this._n = i + 1;
        return this;
      }
      valueOf() {
        const p = this._partials;
        let n = this._n, x, y, lo, hi = 0;
        if (n > 0) {
          hi = p[--n];
          while (n > 0) {
            x = hi;
            y = p[--n];
            hi = x + y;
            lo = y - (hi - x);
            if (lo) break;
          }
          if (n > 0 && ((lo < 0 && p[n - 1] < 0) || (lo > 0 && p[n - 1] > 0))) {
            y = lo * 2;
            x = hi + y;
            if (y == x - hi) hi = x;
          }
        }
        return hi;
      }
    }

    var e10 = Math.sqrt(50),
        e5 = Math.sqrt(10),
        e2 = Math.sqrt(2);

    function ticks(start, stop, count) {
      var reverse,
          i = -1,
          n,
          ticks,
          step;

      stop = +stop, start = +start, count = +count;
      if (start === stop && count > 0) return [start];
      if (reverse = stop < start) n = start, start = stop, stop = n;
      if ((step = tickIncrement(start, stop, count)) === 0 || !isFinite(step)) return [];

      if (step > 0) {
        let r0 = Math.round(start / step), r1 = Math.round(stop / step);
        if (r0 * step < start) ++r0;
        if (r1 * step > stop) --r1;
        ticks = new Array(n = r1 - r0 + 1);
        while (++i < n) ticks[i] = (r0 + i) * step;
      } else {
        step = -step;
        let r0 = Math.round(start * step), r1 = Math.round(stop * step);
        if (r0 / step < start) ++r0;
        if (r1 / step > stop) --r1;
        ticks = new Array(n = r1 - r0 + 1);
        while (++i < n) ticks[i] = (r0 + i) / step;
      }

      if (reverse) ticks.reverse();

      return ticks;
    }

    function tickIncrement(start, stop, count) {
      var step = (stop - start) / Math.max(0, count),
          power = Math.floor(Math.log(step) / Math.LN10),
          error = step / Math.pow(10, power);
      return power >= 0
          ? (error >= e10 ? 10 : error >= e5 ? 5 : error >= e2 ? 2 : 1) * Math.pow(10, power)
          : -Math.pow(10, -power) / (error >= e10 ? 10 : error >= e5 ? 5 : error >= e2 ? 2 : 1);
    }

    function tickStep(start, stop, count) {
      var step0 = Math.abs(stop - start) / Math.max(0, count),
          step1 = Math.pow(10, Math.floor(Math.log(step0) / Math.LN10)),
          error = step0 / step1;
      if (error >= e10) step1 *= 10;
      else if (error >= e5) step1 *= 5;
      else if (error >= e2) step1 *= 2;
      return stop < start ? -step1 : step1;
    }

    function thresholdSturges(values) {
      return Math.ceil(Math.log(count(values)) / Math.LN2) + 1;
    }

    function max(values, valueof) {
      let max;
      if (valueof === undefined) {
        for (const value of values) {
          if (value != null
              && (max < value || (max === undefined && value >= value))) {
            max = value;
          }
        }
      } else {
        let index = -1;
        for (let value of values) {
          if ((value = valueof(value, ++index, values)) != null
              && (max < value || (max === undefined && value >= value))) {
            max = value;
          }
        }
      }
      return max;
    }

    function min(values, valueof) {
      let min;
      if (valueof === undefined) {
        for (const value of values) {
          if (value != null
              && (min > value || (min === undefined && value >= value))) {
            min = value;
          }
        }
      } else {
        let index = -1;
        for (let value of values) {
          if ((value = valueof(value, ++index, values)) != null
              && (min > value || (min === undefined && value >= value))) {
            min = value;
          }
        }
      }
      return min;
    }

    function range(start, stop, step) {
      start = +start, stop = +stop, step = (n = arguments.length) < 2 ? (stop = start, start = 0, 1) : n < 3 ? 1 : +step;

      var i = -1,
          n = Math.max(0, Math.ceil((stop - start) / step)) | 0,
          range = new Array(n);

      while (++i < n) {
        range[i] = start + i * step;
      }

      return range;
    }

    var noop$2 = {value: () => {}};

    function dispatch() {
      for (var i = 0, n = arguments.length, _ = {}, t; i < n; ++i) {
        if (!(t = arguments[i] + "") || (t in _) || /[\s.]/.test(t)) throw new Error("illegal type: " + t);
        _[t] = [];
      }
      return new Dispatch(_);
    }

    function Dispatch(_) {
      this._ = _;
    }

    function parseTypenames$1(typenames, types) {
      return typenames.trim().split(/^|\s+/).map(function(t) {
        var name = "", i = t.indexOf(".");
        if (i >= 0) name = t.slice(i + 1), t = t.slice(0, i);
        if (t && !types.hasOwnProperty(t)) throw new Error("unknown type: " + t);
        return {type: t, name: name};
      });
    }

    Dispatch.prototype = dispatch.prototype = {
      constructor: Dispatch,
      on: function(typename, callback) {
        var _ = this._,
            T = parseTypenames$1(typename + "", _),
            t,
            i = -1,
            n = T.length;

        // If no callback was specified, return the callback of the given type and name.
        if (arguments.length < 2) {
          while (++i < n) if ((t = (typename = T[i]).type) && (t = get$1(_[t], typename.name))) return t;
          return;
        }

        // If a type was specified, set the callback for the given type and name.
        // Otherwise, if a null callback was specified, remove callbacks of the given name.
        if (callback != null && typeof callback !== "function") throw new Error("invalid callback: " + callback);
        while (++i < n) {
          if (t = (typename = T[i]).type) _[t] = set$1(_[t], typename.name, callback);
          else if (callback == null) for (t in _) _[t] = set$1(_[t], typename.name, null);
        }

        return this;
      },
      copy: function() {
        var copy = {}, _ = this._;
        for (var t in _) copy[t] = _[t].slice();
        return new Dispatch(copy);
      },
      call: function(type, that) {
        if ((n = arguments.length - 2) > 0) for (var args = new Array(n), i = 0, n, t; i < n; ++i) args[i] = arguments[i + 2];
        if (!this._.hasOwnProperty(type)) throw new Error("unknown type: " + type);
        for (t = this._[type], i = 0, n = t.length; i < n; ++i) t[i].value.apply(that, args);
      },
      apply: function(type, that, args) {
        if (!this._.hasOwnProperty(type)) throw new Error("unknown type: " + type);
        for (var t = this._[type], i = 0, n = t.length; i < n; ++i) t[i].value.apply(that, args);
      }
    };

    function get$1(type, name) {
      for (var i = 0, n = type.length, c; i < n; ++i) {
        if ((c = type[i]).name === name) {
          return c.value;
        }
      }
    }

    function set$1(type, name, callback) {
      for (var i = 0, n = type.length; i < n; ++i) {
        if (type[i].name === name) {
          type[i] = noop$2, type = type.slice(0, i).concat(type.slice(i + 1));
          break;
        }
      }
      if (callback != null) type.push({name: name, value: callback});
      return type;
    }

    var xhtml = "http://www.w3.org/1999/xhtml";

    var namespaces = {
      svg: "http://www.w3.org/2000/svg",
      xhtml: xhtml,
      xlink: "http://www.w3.org/1999/xlink",
      xml: "http://www.w3.org/XML/1998/namespace",
      xmlns: "http://www.w3.org/2000/xmlns/"
    };

    function namespace(name) {
      var prefix = name += "", i = prefix.indexOf(":");
      if (i >= 0 && (prefix = name.slice(0, i)) !== "xmlns") name = name.slice(i + 1);
      return namespaces.hasOwnProperty(prefix) ? {space: namespaces[prefix], local: name} : name; // eslint-disable-line no-prototype-builtins
    }

    function creatorInherit(name) {
      return function() {
        var document = this.ownerDocument,
            uri = this.namespaceURI;
        return uri === xhtml && document.documentElement.namespaceURI === xhtml
            ? document.createElement(name)
            : document.createElementNS(uri, name);
      };
    }

    function creatorFixed(fullname) {
      return function() {
        return this.ownerDocument.createElementNS(fullname.space, fullname.local);
      };
    }

    function creator(name) {
      var fullname = namespace(name);
      return (fullname.local
          ? creatorFixed
          : creatorInherit)(fullname);
    }

    function none() {}

    function selector(selector) {
      return selector == null ? none : function() {
        return this.querySelector(selector);
      };
    }

    function selection_select(select) {
      if (typeof select !== "function") select = selector(select);

      for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
        for (var group = groups[j], n = group.length, subgroup = subgroups[j] = new Array(n), node, subnode, i = 0; i < n; ++i) {
          if ((node = group[i]) && (subnode = select.call(node, node.__data__, i, group))) {
            if ("__data__" in node) subnode.__data__ = node.__data__;
            subgroup[i] = subnode;
          }
        }
      }

      return new Selection$1(subgroups, this._parents);
    }

    // Given something array like (or null), returns something that is strictly an
    // array. This is used to ensure that array-like objects passed to d3.selectAll
    // or selection.selectAll are converted into proper arrays when creating a
    // selection; we don’t ever want to create a selection backed by a live
    // HTMLCollection or NodeList. However, note that selection.selectAll will use a
    // static NodeList as a group, since it safely derived from querySelectorAll.
    function array$1(x) {
      return x == null ? [] : Array.isArray(x) ? x : Array.from(x);
    }

    function empty() {
      return [];
    }

    function selectorAll(selector) {
      return selector == null ? empty : function() {
        return this.querySelectorAll(selector);
      };
    }

    function arrayAll(select) {
      return function() {
        return array$1(select.apply(this, arguments));
      };
    }

    function selection_selectAll(select) {
      if (typeof select === "function") select = arrayAll(select);
      else select = selectorAll(select);

      for (var groups = this._groups, m = groups.length, subgroups = [], parents = [], j = 0; j < m; ++j) {
        for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
          if (node = group[i]) {
            subgroups.push(select.call(node, node.__data__, i, group));
            parents.push(node);
          }
        }
      }

      return new Selection$1(subgroups, parents);
    }

    function matcher(selector) {
      return function() {
        return this.matches(selector);
      };
    }

    function childMatcher(selector) {
      return function(node) {
        return node.matches(selector);
      };
    }

    var find = Array.prototype.find;

    function childFind(match) {
      return function() {
        return find.call(this.children, match);
      };
    }

    function childFirst() {
      return this.firstElementChild;
    }

    function selection_selectChild(match) {
      return this.select(match == null ? childFirst
          : childFind(typeof match === "function" ? match : childMatcher(match)));
    }

    var filter = Array.prototype.filter;

    function children() {
      return Array.from(this.children);
    }

    function childrenFilter(match) {
      return function() {
        return filter.call(this.children, match);
      };
    }

    function selection_selectChildren(match) {
      return this.selectAll(match == null ? children
          : childrenFilter(typeof match === "function" ? match : childMatcher(match)));
    }

    function selection_filter(match) {
      if (typeof match !== "function") match = matcher(match);

      for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
        for (var group = groups[j], n = group.length, subgroup = subgroups[j] = [], node, i = 0; i < n; ++i) {
          if ((node = group[i]) && match.call(node, node.__data__, i, group)) {
            subgroup.push(node);
          }
        }
      }

      return new Selection$1(subgroups, this._parents);
    }

    function sparse(update) {
      return new Array(update.length);
    }

    function selection_enter() {
      return new Selection$1(this._enter || this._groups.map(sparse), this._parents);
    }

    function EnterNode(parent, datum) {
      this.ownerDocument = parent.ownerDocument;
      this.namespaceURI = parent.namespaceURI;
      this._next = null;
      this._parent = parent;
      this.__data__ = datum;
    }

    EnterNode.prototype = {
      constructor: EnterNode,
      appendChild: function(child) { return this._parent.insertBefore(child, this._next); },
      insertBefore: function(child, next) { return this._parent.insertBefore(child, next); },
      querySelector: function(selector) { return this._parent.querySelector(selector); },
      querySelectorAll: function(selector) { return this._parent.querySelectorAll(selector); }
    };

    function constant$2(x) {
      return function() {
        return x;
      };
    }

    function bindIndex(parent, group, enter, update, exit, data) {
      var i = 0,
          node,
          groupLength = group.length,
          dataLength = data.length;

      // Put any non-null nodes that fit into update.
      // Put any null nodes into enter.
      // Put any remaining data into enter.
      for (; i < dataLength; ++i) {
        if (node = group[i]) {
          node.__data__ = data[i];
          update[i] = node;
        } else {
          enter[i] = new EnterNode(parent, data[i]);
        }
      }

      // Put any non-null nodes that don’t fit into exit.
      for (; i < groupLength; ++i) {
        if (node = group[i]) {
          exit[i] = node;
        }
      }
    }

    function bindKey(parent, group, enter, update, exit, data, key) {
      var i,
          node,
          nodeByKeyValue = new Map,
          groupLength = group.length,
          dataLength = data.length,
          keyValues = new Array(groupLength),
          keyValue;

      // Compute the key for each node.
      // If multiple nodes have the same key, the duplicates are added to exit.
      for (i = 0; i < groupLength; ++i) {
        if (node = group[i]) {
          keyValues[i] = keyValue = key.call(node, node.__data__, i, group) + "";
          if (nodeByKeyValue.has(keyValue)) {
            exit[i] = node;
          } else {
            nodeByKeyValue.set(keyValue, node);
          }
        }
      }

      // Compute the key for each datum.
      // If there a node associated with this key, join and add it to update.
      // If there is not (or the key is a duplicate), add it to enter.
      for (i = 0; i < dataLength; ++i) {
        keyValue = key.call(parent, data[i], i, data) + "";
        if (node = nodeByKeyValue.get(keyValue)) {
          update[i] = node;
          node.__data__ = data[i];
          nodeByKeyValue.delete(keyValue);
        } else {
          enter[i] = new EnterNode(parent, data[i]);
        }
      }

      // Add any remaining nodes that were not bound to data to exit.
      for (i = 0; i < groupLength; ++i) {
        if ((node = group[i]) && (nodeByKeyValue.get(keyValues[i]) === node)) {
          exit[i] = node;
        }
      }
    }

    function datum(node) {
      return node.__data__;
    }

    function selection_data(value, key) {
      if (!arguments.length) return Array.from(this, datum);

      var bind = key ? bindKey : bindIndex,
          parents = this._parents,
          groups = this._groups;

      if (typeof value !== "function") value = constant$2(value);

      for (var m = groups.length, update = new Array(m), enter = new Array(m), exit = new Array(m), j = 0; j < m; ++j) {
        var parent = parents[j],
            group = groups[j],
            groupLength = group.length,
            data = arraylike(value.call(parent, parent && parent.__data__, j, parents)),
            dataLength = data.length,
            enterGroup = enter[j] = new Array(dataLength),
            updateGroup = update[j] = new Array(dataLength),
            exitGroup = exit[j] = new Array(groupLength);

        bind(parent, group, enterGroup, updateGroup, exitGroup, data, key);

        // Now connect the enter nodes to their following update node, such that
        // appendChild can insert the materialized enter node before this node,
        // rather than at the end of the parent node.
        for (var i0 = 0, i1 = 0, previous, next; i0 < dataLength; ++i0) {
          if (previous = enterGroup[i0]) {
            if (i0 >= i1) i1 = i0 + 1;
            while (!(next = updateGroup[i1]) && ++i1 < dataLength);
            previous._next = next || null;
          }
        }
      }

      update = new Selection$1(update, parents);
      update._enter = enter;
      update._exit = exit;
      return update;
    }

    // Given some data, this returns an array-like view of it: an object that
    // exposes a length property and allows numeric indexing. Note that unlike
    // selectAll, this isn’t worried about “live” collections because the resulting
    // array will only be used briefly while data is being bound. (It is possible to
    // cause the data to change while iterating by using a key function, but please
    // don’t; we’d rather avoid a gratuitous copy.)
    function arraylike(data) {
      return typeof data === "object" && "length" in data
        ? data // Array, TypedArray, NodeList, array-like
        : Array.from(data); // Map, Set, iterable, string, or anything else
    }

    function selection_exit() {
      return new Selection$1(this._exit || this._groups.map(sparse), this._parents);
    }

    function selection_join(onenter, onupdate, onexit) {
      var enter = this.enter(), update = this, exit = this.exit();
      if (typeof onenter === "function") {
        enter = onenter(enter);
        if (enter) enter = enter.selection();
      } else {
        enter = enter.append(onenter + "");
      }
      if (onupdate != null) {
        update = onupdate(update);
        if (update) update = update.selection();
      }
      if (onexit == null) exit.remove(); else onexit(exit);
      return enter && update ? enter.merge(update).order() : update;
    }

    function selection_merge(context) {
      var selection = context.selection ? context.selection() : context;

      for (var groups0 = this._groups, groups1 = selection._groups, m0 = groups0.length, m1 = groups1.length, m = Math.min(m0, m1), merges = new Array(m0), j = 0; j < m; ++j) {
        for (var group0 = groups0[j], group1 = groups1[j], n = group0.length, merge = merges[j] = new Array(n), node, i = 0; i < n; ++i) {
          if (node = group0[i] || group1[i]) {
            merge[i] = node;
          }
        }
      }

      for (; j < m0; ++j) {
        merges[j] = groups0[j];
      }

      return new Selection$1(merges, this._parents);
    }

    function selection_order() {

      for (var groups = this._groups, j = -1, m = groups.length; ++j < m;) {
        for (var group = groups[j], i = group.length - 1, next = group[i], node; --i >= 0;) {
          if (node = group[i]) {
            if (next && node.compareDocumentPosition(next) ^ 4) next.parentNode.insertBefore(node, next);
            next = node;
          }
        }
      }

      return this;
    }

    function selection_sort(compare) {
      if (!compare) compare = ascending$1;

      function compareNode(a, b) {
        return a && b ? compare(a.__data__, b.__data__) : !a - !b;
      }

      for (var groups = this._groups, m = groups.length, sortgroups = new Array(m), j = 0; j < m; ++j) {
        for (var group = groups[j], n = group.length, sortgroup = sortgroups[j] = new Array(n), node, i = 0; i < n; ++i) {
          if (node = group[i]) {
            sortgroup[i] = node;
          }
        }
        sortgroup.sort(compareNode);
      }

      return new Selection$1(sortgroups, this._parents).order();
    }

    function ascending$1(a, b) {
      return a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
    }

    function selection_call() {
      var callback = arguments[0];
      arguments[0] = this;
      callback.apply(null, arguments);
      return this;
    }

    function selection_nodes() {
      return Array.from(this);
    }

    function selection_node() {

      for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) {
        for (var group = groups[j], i = 0, n = group.length; i < n; ++i) {
          var node = group[i];
          if (node) return node;
        }
      }

      return null;
    }

    function selection_size() {
      let size = 0;
      for (const node of this) ++size; // eslint-disable-line no-unused-vars
      return size;
    }

    function selection_empty() {
      return !this.node();
    }

    function selection_each(callback) {

      for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) {
        for (var group = groups[j], i = 0, n = group.length, node; i < n; ++i) {
          if (node = group[i]) callback.call(node, node.__data__, i, group);
        }
      }

      return this;
    }

    function attrRemove$1(name) {
      return function() {
        this.removeAttribute(name);
      };
    }

    function attrRemoveNS$1(fullname) {
      return function() {
        this.removeAttributeNS(fullname.space, fullname.local);
      };
    }

    function attrConstant$1(name, value) {
      return function() {
        this.setAttribute(name, value);
      };
    }

    function attrConstantNS$1(fullname, value) {
      return function() {
        this.setAttributeNS(fullname.space, fullname.local, value);
      };
    }

    function attrFunction$1(name, value) {
      return function() {
        var v = value.apply(this, arguments);
        if (v == null) this.removeAttribute(name);
        else this.setAttribute(name, v);
      };
    }

    function attrFunctionNS$1(fullname, value) {
      return function() {
        var v = value.apply(this, arguments);
        if (v == null) this.removeAttributeNS(fullname.space, fullname.local);
        else this.setAttributeNS(fullname.space, fullname.local, v);
      };
    }

    function selection_attr(name, value) {
      var fullname = namespace(name);

      if (arguments.length < 2) {
        var node = this.node();
        return fullname.local
            ? node.getAttributeNS(fullname.space, fullname.local)
            : node.getAttribute(fullname);
      }

      return this.each((value == null
          ? (fullname.local ? attrRemoveNS$1 : attrRemove$1) : (typeof value === "function"
          ? (fullname.local ? attrFunctionNS$1 : attrFunction$1)
          : (fullname.local ? attrConstantNS$1 : attrConstant$1)))(fullname, value));
    }

    function defaultView(node) {
      return (node.ownerDocument && node.ownerDocument.defaultView) // node is a Node
          || (node.document && node) // node is a Window
          || node.defaultView; // node is a Document
    }

    function styleRemove$1(name) {
      return function() {
        this.style.removeProperty(name);
      };
    }

    function styleConstant$1(name, value, priority) {
      return function() {
        this.style.setProperty(name, value, priority);
      };
    }

    function styleFunction$1(name, value, priority) {
      return function() {
        var v = value.apply(this, arguments);
        if (v == null) this.style.removeProperty(name);
        else this.style.setProperty(name, v, priority);
      };
    }

    function selection_style(name, value, priority) {
      return arguments.length > 1
          ? this.each((value == null
                ? styleRemove$1 : typeof value === "function"
                ? styleFunction$1
                : styleConstant$1)(name, value, priority == null ? "" : priority))
          : styleValue(this.node(), name);
    }

    function styleValue(node, name) {
      return node.style.getPropertyValue(name)
          || defaultView(node).getComputedStyle(node, null).getPropertyValue(name);
    }

    function propertyRemove(name) {
      return function() {
        delete this[name];
      };
    }

    function propertyConstant(name, value) {
      return function() {
        this[name] = value;
      };
    }

    function propertyFunction(name, value) {
      return function() {
        var v = value.apply(this, arguments);
        if (v == null) delete this[name];
        else this[name] = v;
      };
    }

    function selection_property(name, value) {
      return arguments.length > 1
          ? this.each((value == null
              ? propertyRemove : typeof value === "function"
              ? propertyFunction
              : propertyConstant)(name, value))
          : this.node()[name];
    }

    function classArray(string) {
      return string.trim().split(/^|\s+/);
    }

    function classList(node) {
      return node.classList || new ClassList(node);
    }

    function ClassList(node) {
      this._node = node;
      this._names = classArray(node.getAttribute("class") || "");
    }

    ClassList.prototype = {
      add: function(name) {
        var i = this._names.indexOf(name);
        if (i < 0) {
          this._names.push(name);
          this._node.setAttribute("class", this._names.join(" "));
        }
      },
      remove: function(name) {
        var i = this._names.indexOf(name);
        if (i >= 0) {
          this._names.splice(i, 1);
          this._node.setAttribute("class", this._names.join(" "));
        }
      },
      contains: function(name) {
        return this._names.indexOf(name) >= 0;
      }
    };

    function classedAdd(node, names) {
      var list = classList(node), i = -1, n = names.length;
      while (++i < n) list.add(names[i]);
    }

    function classedRemove(node, names) {
      var list = classList(node), i = -1, n = names.length;
      while (++i < n) list.remove(names[i]);
    }

    function classedTrue(names) {
      return function() {
        classedAdd(this, names);
      };
    }

    function classedFalse(names) {
      return function() {
        classedRemove(this, names);
      };
    }

    function classedFunction(names, value) {
      return function() {
        (value.apply(this, arguments) ? classedAdd : classedRemove)(this, names);
      };
    }

    function selection_classed(name, value) {
      var names = classArray(name + "");

      if (arguments.length < 2) {
        var list = classList(this.node()), i = -1, n = names.length;
        while (++i < n) if (!list.contains(names[i])) return false;
        return true;
      }

      return this.each((typeof value === "function"
          ? classedFunction : value
          ? classedTrue
          : classedFalse)(names, value));
    }

    function textRemove() {
      this.textContent = "";
    }

    function textConstant$1(value) {
      return function() {
        this.textContent = value;
      };
    }

    function textFunction$1(value) {
      return function() {
        var v = value.apply(this, arguments);
        this.textContent = v == null ? "" : v;
      };
    }

    function selection_text(value) {
      return arguments.length
          ? this.each(value == null
              ? textRemove : (typeof value === "function"
              ? textFunction$1
              : textConstant$1)(value))
          : this.node().textContent;
    }

    function htmlRemove() {
      this.innerHTML = "";
    }

    function htmlConstant(value) {
      return function() {
        this.innerHTML = value;
      };
    }

    function htmlFunction(value) {
      return function() {
        var v = value.apply(this, arguments);
        this.innerHTML = v == null ? "" : v;
      };
    }

    function selection_html(value) {
      return arguments.length
          ? this.each(value == null
              ? htmlRemove : (typeof value === "function"
              ? htmlFunction
              : htmlConstant)(value))
          : this.node().innerHTML;
    }

    function raise() {
      if (this.nextSibling) this.parentNode.appendChild(this);
    }

    function selection_raise() {
      return this.each(raise);
    }

    function lower() {
      if (this.previousSibling) this.parentNode.insertBefore(this, this.parentNode.firstChild);
    }

    function selection_lower() {
      return this.each(lower);
    }

    function selection_append(name) {
      var create = typeof name === "function" ? name : creator(name);
      return this.select(function() {
        return this.appendChild(create.apply(this, arguments));
      });
    }

    function constantNull() {
      return null;
    }

    function selection_insert(name, before) {
      var create = typeof name === "function" ? name : creator(name),
          select = before == null ? constantNull : typeof before === "function" ? before : selector(before);
      return this.select(function() {
        return this.insertBefore(create.apply(this, arguments), select.apply(this, arguments) || null);
      });
    }

    function remove() {
      var parent = this.parentNode;
      if (parent) parent.removeChild(this);
    }

    function selection_remove() {
      return this.each(remove);
    }

    function selection_cloneShallow() {
      var clone = this.cloneNode(false), parent = this.parentNode;
      return parent ? parent.insertBefore(clone, this.nextSibling) : clone;
    }

    function selection_cloneDeep() {
      var clone = this.cloneNode(true), parent = this.parentNode;
      return parent ? parent.insertBefore(clone, this.nextSibling) : clone;
    }

    function selection_clone(deep) {
      return this.select(deep ? selection_cloneDeep : selection_cloneShallow);
    }

    function selection_datum(value) {
      return arguments.length
          ? this.property("__data__", value)
          : this.node().__data__;
    }

    function contextListener(listener) {
      return function(event) {
        listener.call(this, event, this.__data__);
      };
    }

    function parseTypenames(typenames) {
      return typenames.trim().split(/^|\s+/).map(function(t) {
        var name = "", i = t.indexOf(".");
        if (i >= 0) name = t.slice(i + 1), t = t.slice(0, i);
        return {type: t, name: name};
      });
    }

    function onRemove(typename) {
      return function() {
        var on = this.__on;
        if (!on) return;
        for (var j = 0, i = -1, m = on.length, o; j < m; ++j) {
          if (o = on[j], (!typename.type || o.type === typename.type) && o.name === typename.name) {
            this.removeEventListener(o.type, o.listener, o.options);
          } else {
            on[++i] = o;
          }
        }
        if (++i) on.length = i;
        else delete this.__on;
      };
    }

    function onAdd(typename, value, options) {
      return function() {
        var on = this.__on, o, listener = contextListener(value);
        if (on) for (var j = 0, m = on.length; j < m; ++j) {
          if ((o = on[j]).type === typename.type && o.name === typename.name) {
            this.removeEventListener(o.type, o.listener, o.options);
            this.addEventListener(o.type, o.listener = listener, o.options = options);
            o.value = value;
            return;
          }
        }
        this.addEventListener(typename.type, listener, options);
        o = {type: typename.type, name: typename.name, value: value, listener: listener, options: options};
        if (!on) this.__on = [o];
        else on.push(o);
      };
    }

    function selection_on(typename, value, options) {
      var typenames = parseTypenames(typename + ""), i, n = typenames.length, t;

      if (arguments.length < 2) {
        var on = this.node().__on;
        if (on) for (var j = 0, m = on.length, o; j < m; ++j) {
          for (i = 0, o = on[j]; i < n; ++i) {
            if ((t = typenames[i]).type === o.type && t.name === o.name) {
              return o.value;
            }
          }
        }
        return;
      }

      on = value ? onAdd : onRemove;
      for (i = 0; i < n; ++i) this.each(on(typenames[i], value, options));
      return this;
    }

    function dispatchEvent(node, type, params) {
      var window = defaultView(node),
          event = window.CustomEvent;

      if (typeof event === "function") {
        event = new event(type, params);
      } else {
        event = window.document.createEvent("Event");
        if (params) event.initEvent(type, params.bubbles, params.cancelable), event.detail = params.detail;
        else event.initEvent(type, false, false);
      }

      node.dispatchEvent(event);
    }

    function dispatchConstant(type, params) {
      return function() {
        return dispatchEvent(this, type, params);
      };
    }

    function dispatchFunction(type, params) {
      return function() {
        return dispatchEvent(this, type, params.apply(this, arguments));
      };
    }

    function selection_dispatch(type, params) {
      return this.each((typeof params === "function"
          ? dispatchFunction
          : dispatchConstant)(type, params));
    }

    function* selection_iterator() {
      for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) {
        for (var group = groups[j], i = 0, n = group.length, node; i < n; ++i) {
          if (node = group[i]) yield node;
        }
      }
    }

    var root = [null];

    function Selection$1(groups, parents) {
      this._groups = groups;
      this._parents = parents;
    }

    function selection() {
      return new Selection$1([[document.documentElement]], root);
    }

    function selection_selection() {
      return this;
    }

    Selection$1.prototype = selection.prototype = {
      constructor: Selection$1,
      select: selection_select,
      selectAll: selection_selectAll,
      selectChild: selection_selectChild,
      selectChildren: selection_selectChildren,
      filter: selection_filter,
      data: selection_data,
      enter: selection_enter,
      exit: selection_exit,
      join: selection_join,
      merge: selection_merge,
      selection: selection_selection,
      order: selection_order,
      sort: selection_sort,
      call: selection_call,
      nodes: selection_nodes,
      node: selection_node,
      size: selection_size,
      empty: selection_empty,
      each: selection_each,
      attr: selection_attr,
      style: selection_style,
      property: selection_property,
      classed: selection_classed,
      text: selection_text,
      html: selection_html,
      raise: selection_raise,
      lower: selection_lower,
      append: selection_append,
      insert: selection_insert,
      remove: selection_remove,
      clone: selection_clone,
      datum: selection_datum,
      on: selection_on,
      dispatch: selection_dispatch,
      [Symbol.iterator]: selection_iterator
    };

    function select(selector) {
      return typeof selector === "string"
          ? new Selection$1([[document.querySelector(selector)]], [document.documentElement])
          : new Selection$1([[selector]], root);
    }

    function define(constructor, factory, prototype) {
      constructor.prototype = factory.prototype = prototype;
      prototype.constructor = constructor;
    }

    function extend(parent, definition) {
      var prototype = Object.create(parent.prototype);
      for (var key in definition) prototype[key] = definition[key];
      return prototype;
    }

    function Color() {}

    var darker = 0.7;
    var brighter = 1 / darker;

    var reI = "\\s*([+-]?\\d+)\\s*",
        reN = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)\\s*",
        reP = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)%\\s*",
        reHex = /^#([0-9a-f]{3,8})$/,
        reRgbInteger = new RegExp("^rgb\\(" + [reI, reI, reI] + "\\)$"),
        reRgbPercent = new RegExp("^rgb\\(" + [reP, reP, reP] + "\\)$"),
        reRgbaInteger = new RegExp("^rgba\\(" + [reI, reI, reI, reN] + "\\)$"),
        reRgbaPercent = new RegExp("^rgba\\(" + [reP, reP, reP, reN] + "\\)$"),
        reHslPercent = new RegExp("^hsl\\(" + [reN, reP, reP] + "\\)$"),
        reHslaPercent = new RegExp("^hsla\\(" + [reN, reP, reP, reN] + "\\)$");

    var named = {
      aliceblue: 0xf0f8ff,
      antiquewhite: 0xfaebd7,
      aqua: 0x00ffff,
      aquamarine: 0x7fffd4,
      azure: 0xf0ffff,
      beige: 0xf5f5dc,
      bisque: 0xffe4c4,
      black: 0x000000,
      blanchedalmond: 0xffebcd,
      blue: 0x0000ff,
      blueviolet: 0x8a2be2,
      brown: 0xa52a2a,
      burlywood: 0xdeb887,
      cadetblue: 0x5f9ea0,
      chartreuse: 0x7fff00,
      chocolate: 0xd2691e,
      coral: 0xff7f50,
      cornflowerblue: 0x6495ed,
      cornsilk: 0xfff8dc,
      crimson: 0xdc143c,
      cyan: 0x00ffff,
      darkblue: 0x00008b,
      darkcyan: 0x008b8b,
      darkgoldenrod: 0xb8860b,
      darkgray: 0xa9a9a9,
      darkgreen: 0x006400,
      darkgrey: 0xa9a9a9,
      darkkhaki: 0xbdb76b,
      darkmagenta: 0x8b008b,
      darkolivegreen: 0x556b2f,
      darkorange: 0xff8c00,
      darkorchid: 0x9932cc,
      darkred: 0x8b0000,
      darksalmon: 0xe9967a,
      darkseagreen: 0x8fbc8f,
      darkslateblue: 0x483d8b,
      darkslategray: 0x2f4f4f,
      darkslategrey: 0x2f4f4f,
      darkturquoise: 0x00ced1,
      darkviolet: 0x9400d3,
      deeppink: 0xff1493,
      deepskyblue: 0x00bfff,
      dimgray: 0x696969,
      dimgrey: 0x696969,
      dodgerblue: 0x1e90ff,
      firebrick: 0xb22222,
      floralwhite: 0xfffaf0,
      forestgreen: 0x228b22,
      fuchsia: 0xff00ff,
      gainsboro: 0xdcdcdc,
      ghostwhite: 0xf8f8ff,
      gold: 0xffd700,
      goldenrod: 0xdaa520,
      gray: 0x808080,
      green: 0x008000,
      greenyellow: 0xadff2f,
      grey: 0x808080,
      honeydew: 0xf0fff0,
      hotpink: 0xff69b4,
      indianred: 0xcd5c5c,
      indigo: 0x4b0082,
      ivory: 0xfffff0,
      khaki: 0xf0e68c,
      lavender: 0xe6e6fa,
      lavenderblush: 0xfff0f5,
      lawngreen: 0x7cfc00,
      lemonchiffon: 0xfffacd,
      lightblue: 0xadd8e6,
      lightcoral: 0xf08080,
      lightcyan: 0xe0ffff,
      lightgoldenrodyellow: 0xfafad2,
      lightgray: 0xd3d3d3,
      lightgreen: 0x90ee90,
      lightgrey: 0xd3d3d3,
      lightpink: 0xffb6c1,
      lightsalmon: 0xffa07a,
      lightseagreen: 0x20b2aa,
      lightskyblue: 0x87cefa,
      lightslategray: 0x778899,
      lightslategrey: 0x778899,
      lightsteelblue: 0xb0c4de,
      lightyellow: 0xffffe0,
      lime: 0x00ff00,
      limegreen: 0x32cd32,
      linen: 0xfaf0e6,
      magenta: 0xff00ff,
      maroon: 0x800000,
      mediumaquamarine: 0x66cdaa,
      mediumblue: 0x0000cd,
      mediumorchid: 0xba55d3,
      mediumpurple: 0x9370db,
      mediumseagreen: 0x3cb371,
      mediumslateblue: 0x7b68ee,
      mediumspringgreen: 0x00fa9a,
      mediumturquoise: 0x48d1cc,
      mediumvioletred: 0xc71585,
      midnightblue: 0x191970,
      mintcream: 0xf5fffa,
      mistyrose: 0xffe4e1,
      moccasin: 0xffe4b5,
      navajowhite: 0xffdead,
      navy: 0x000080,
      oldlace: 0xfdf5e6,
      olive: 0x808000,
      olivedrab: 0x6b8e23,
      orange: 0xffa500,
      orangered: 0xff4500,
      orchid: 0xda70d6,
      palegoldenrod: 0xeee8aa,
      palegreen: 0x98fb98,
      paleturquoise: 0xafeeee,
      palevioletred: 0xdb7093,
      papayawhip: 0xffefd5,
      peachpuff: 0xffdab9,
      peru: 0xcd853f,
      pink: 0xffc0cb,
      plum: 0xdda0dd,
      powderblue: 0xb0e0e6,
      purple: 0x800080,
      rebeccapurple: 0x663399,
      red: 0xff0000,
      rosybrown: 0xbc8f8f,
      royalblue: 0x4169e1,
      saddlebrown: 0x8b4513,
      salmon: 0xfa8072,
      sandybrown: 0xf4a460,
      seagreen: 0x2e8b57,
      seashell: 0xfff5ee,
      sienna: 0xa0522d,
      silver: 0xc0c0c0,
      skyblue: 0x87ceeb,
      slateblue: 0x6a5acd,
      slategray: 0x708090,
      slategrey: 0x708090,
      snow: 0xfffafa,
      springgreen: 0x00ff7f,
      steelblue: 0x4682b4,
      tan: 0xd2b48c,
      teal: 0x008080,
      thistle: 0xd8bfd8,
      tomato: 0xff6347,
      turquoise: 0x40e0d0,
      violet: 0xee82ee,
      wheat: 0xf5deb3,
      white: 0xffffff,
      whitesmoke: 0xf5f5f5,
      yellow: 0xffff00,
      yellowgreen: 0x9acd32
    };

    define(Color, color, {
      copy: function(channels) {
        return Object.assign(new this.constructor, this, channels);
      },
      displayable: function() {
        return this.rgb().displayable();
      },
      hex: color_formatHex, // Deprecated! Use color.formatHex.
      formatHex: color_formatHex,
      formatHsl: color_formatHsl,
      formatRgb: color_formatRgb,
      toString: color_formatRgb
    });

    function color_formatHex() {
      return this.rgb().formatHex();
    }

    function color_formatHsl() {
      return hslConvert(this).formatHsl();
    }

    function color_formatRgb() {
      return this.rgb().formatRgb();
    }

    function color(format) {
      var m, l;
      format = (format + "").trim().toLowerCase();
      return (m = reHex.exec(format)) ? (l = m[1].length, m = parseInt(m[1], 16), l === 6 ? rgbn(m) // #ff0000
          : l === 3 ? new Rgb((m >> 8 & 0xf) | (m >> 4 & 0xf0), (m >> 4 & 0xf) | (m & 0xf0), ((m & 0xf) << 4) | (m & 0xf), 1) // #f00
          : l === 8 ? rgba(m >> 24 & 0xff, m >> 16 & 0xff, m >> 8 & 0xff, (m & 0xff) / 0xff) // #ff000000
          : l === 4 ? rgba((m >> 12 & 0xf) | (m >> 8 & 0xf0), (m >> 8 & 0xf) | (m >> 4 & 0xf0), (m >> 4 & 0xf) | (m & 0xf0), (((m & 0xf) << 4) | (m & 0xf)) / 0xff) // #f000
          : null) // invalid hex
          : (m = reRgbInteger.exec(format)) ? new Rgb(m[1], m[2], m[3], 1) // rgb(255, 0, 0)
          : (m = reRgbPercent.exec(format)) ? new Rgb(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, 1) // rgb(100%, 0%, 0%)
          : (m = reRgbaInteger.exec(format)) ? rgba(m[1], m[2], m[3], m[4]) // rgba(255, 0, 0, 1)
          : (m = reRgbaPercent.exec(format)) ? rgba(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, m[4]) // rgb(100%, 0%, 0%, 1)
          : (m = reHslPercent.exec(format)) ? hsla(m[1], m[2] / 100, m[3] / 100, 1) // hsl(120, 50%, 50%)
          : (m = reHslaPercent.exec(format)) ? hsla(m[1], m[2] / 100, m[3] / 100, m[4]) // hsla(120, 50%, 50%, 1)
          : named.hasOwnProperty(format) ? rgbn(named[format]) // eslint-disable-line no-prototype-builtins
          : format === "transparent" ? new Rgb(NaN, NaN, NaN, 0)
          : null;
    }

    function rgbn(n) {
      return new Rgb(n >> 16 & 0xff, n >> 8 & 0xff, n & 0xff, 1);
    }

    function rgba(r, g, b, a) {
      if (a <= 0) r = g = b = NaN;
      return new Rgb(r, g, b, a);
    }

    function rgbConvert(o) {
      if (!(o instanceof Color)) o = color(o);
      if (!o) return new Rgb;
      o = o.rgb();
      return new Rgb(o.r, o.g, o.b, o.opacity);
    }

    function rgb(r, g, b, opacity) {
      return arguments.length === 1 ? rgbConvert(r) : new Rgb(r, g, b, opacity == null ? 1 : opacity);
    }

    function Rgb(r, g, b, opacity) {
      this.r = +r;
      this.g = +g;
      this.b = +b;
      this.opacity = +opacity;
    }

    define(Rgb, rgb, extend(Color, {
      brighter: function(k) {
        k = k == null ? brighter : Math.pow(brighter, k);
        return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
      },
      darker: function(k) {
        k = k == null ? darker : Math.pow(darker, k);
        return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
      },
      rgb: function() {
        return this;
      },
      displayable: function() {
        return (-0.5 <= this.r && this.r < 255.5)
            && (-0.5 <= this.g && this.g < 255.5)
            && (-0.5 <= this.b && this.b < 255.5)
            && (0 <= this.opacity && this.opacity <= 1);
      },
      hex: rgb_formatHex, // Deprecated! Use color.formatHex.
      formatHex: rgb_formatHex,
      formatRgb: rgb_formatRgb,
      toString: rgb_formatRgb
    }));

    function rgb_formatHex() {
      return "#" + hex(this.r) + hex(this.g) + hex(this.b);
    }

    function rgb_formatRgb() {
      var a = this.opacity; a = isNaN(a) ? 1 : Math.max(0, Math.min(1, a));
      return (a === 1 ? "rgb(" : "rgba(")
          + Math.max(0, Math.min(255, Math.round(this.r) || 0)) + ", "
          + Math.max(0, Math.min(255, Math.round(this.g) || 0)) + ", "
          + Math.max(0, Math.min(255, Math.round(this.b) || 0))
          + (a === 1 ? ")" : ", " + a + ")");
    }

    function hex(value) {
      value = Math.max(0, Math.min(255, Math.round(value) || 0));
      return (value < 16 ? "0" : "") + value.toString(16);
    }

    function hsla(h, s, l, a) {
      if (a <= 0) h = s = l = NaN;
      else if (l <= 0 || l >= 1) h = s = NaN;
      else if (s <= 0) h = NaN;
      return new Hsl(h, s, l, a);
    }

    function hslConvert(o) {
      if (o instanceof Hsl) return new Hsl(o.h, o.s, o.l, o.opacity);
      if (!(o instanceof Color)) o = color(o);
      if (!o) return new Hsl;
      if (o instanceof Hsl) return o;
      o = o.rgb();
      var r = o.r / 255,
          g = o.g / 255,
          b = o.b / 255,
          min = Math.min(r, g, b),
          max = Math.max(r, g, b),
          h = NaN,
          s = max - min,
          l = (max + min) / 2;
      if (s) {
        if (r === max) h = (g - b) / s + (g < b) * 6;
        else if (g === max) h = (b - r) / s + 2;
        else h = (r - g) / s + 4;
        s /= l < 0.5 ? max + min : 2 - max - min;
        h *= 60;
      } else {
        s = l > 0 && l < 1 ? 0 : h;
      }
      return new Hsl(h, s, l, o.opacity);
    }

    function hsl(h, s, l, opacity) {
      return arguments.length === 1 ? hslConvert(h) : new Hsl(h, s, l, opacity == null ? 1 : opacity);
    }

    function Hsl(h, s, l, opacity) {
      this.h = +h;
      this.s = +s;
      this.l = +l;
      this.opacity = +opacity;
    }

    define(Hsl, hsl, extend(Color, {
      brighter: function(k) {
        k = k == null ? brighter : Math.pow(brighter, k);
        return new Hsl(this.h, this.s, this.l * k, this.opacity);
      },
      darker: function(k) {
        k = k == null ? darker : Math.pow(darker, k);
        return new Hsl(this.h, this.s, this.l * k, this.opacity);
      },
      rgb: function() {
        var h = this.h % 360 + (this.h < 0) * 360,
            s = isNaN(h) || isNaN(this.s) ? 0 : this.s,
            l = this.l,
            m2 = l + (l < 0.5 ? l : 1 - l) * s,
            m1 = 2 * l - m2;
        return new Rgb(
          hsl2rgb(h >= 240 ? h - 240 : h + 120, m1, m2),
          hsl2rgb(h, m1, m2),
          hsl2rgb(h < 120 ? h + 240 : h - 120, m1, m2),
          this.opacity
        );
      },
      displayable: function() {
        return (0 <= this.s && this.s <= 1 || isNaN(this.s))
            && (0 <= this.l && this.l <= 1)
            && (0 <= this.opacity && this.opacity <= 1);
      },
      formatHsl: function() {
        var a = this.opacity; a = isNaN(a) ? 1 : Math.max(0, Math.min(1, a));
        return (a === 1 ? "hsl(" : "hsla(")
            + (this.h || 0) + ", "
            + (this.s || 0) * 100 + "%, "
            + (this.l || 0) * 100 + "%"
            + (a === 1 ? ")" : ", " + a + ")");
      }
    }));

    /* From FvD 13.37, CSS Color Module Level 3 */
    function hsl2rgb(h, m1, m2) {
      return (h < 60 ? m1 + (m2 - m1) * h / 60
          : h < 180 ? m2
          : h < 240 ? m1 + (m2 - m1) * (240 - h) / 60
          : m1) * 255;
    }

    var constant$1 = x => () => x;

    function linear$1(a, d) {
      return function(t) {
        return a + t * d;
      };
    }

    function exponential(a, b, y) {
      return a = Math.pow(a, y), b = Math.pow(b, y) - a, y = 1 / y, function(t) {
        return Math.pow(a + t * b, y);
      };
    }

    function gamma(y) {
      return (y = +y) === 1 ? nogamma : function(a, b) {
        return b - a ? exponential(a, b, y) : constant$1(isNaN(a) ? b : a);
      };
    }

    function nogamma(a, b) {
      var d = b - a;
      return d ? linear$1(a, d) : constant$1(isNaN(a) ? b : a);
    }

    var interpolateRgb = (function rgbGamma(y) {
      var color = gamma(y);

      function rgb$1(start, end) {
        var r = color((start = rgb(start)).r, (end = rgb(end)).r),
            g = color(start.g, end.g),
            b = color(start.b, end.b),
            opacity = nogamma(start.opacity, end.opacity);
        return function(t) {
          start.r = r(t);
          start.g = g(t);
          start.b = b(t);
          start.opacity = opacity(t);
          return start + "";
        };
      }

      rgb$1.gamma = rgbGamma;

      return rgb$1;
    })(1);

    function numberArray(a, b) {
      if (!b) b = [];
      var n = a ? Math.min(b.length, a.length) : 0,
          c = b.slice(),
          i;
      return function(t) {
        for (i = 0; i < n; ++i) c[i] = a[i] * (1 - t) + b[i] * t;
        return c;
      };
    }

    function isNumberArray(x) {
      return ArrayBuffer.isView(x) && !(x instanceof DataView);
    }

    function genericArray(a, b) {
      var nb = b ? b.length : 0,
          na = a ? Math.min(nb, a.length) : 0,
          x = new Array(na),
          c = new Array(nb),
          i;

      for (i = 0; i < na; ++i) x[i] = interpolate$1(a[i], b[i]);
      for (; i < nb; ++i) c[i] = b[i];

      return function(t) {
        for (i = 0; i < na; ++i) c[i] = x[i](t);
        return c;
      };
    }

    function date(a, b) {
      var d = new Date;
      return a = +a, b = +b, function(t) {
        return d.setTime(a * (1 - t) + b * t), d;
      };
    }

    function interpolateNumber(a, b) {
      return a = +a, b = +b, function(t) {
        return a * (1 - t) + b * t;
      };
    }

    function object(a, b) {
      var i = {},
          c = {},
          k;

      if (a === null || typeof a !== "object") a = {};
      if (b === null || typeof b !== "object") b = {};

      for (k in b) {
        if (k in a) {
          i[k] = interpolate$1(a[k], b[k]);
        } else {
          c[k] = b[k];
        }
      }

      return function(t) {
        for (k in i) c[k] = i[k](t);
        return c;
      };
    }

    var reA = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,
        reB = new RegExp(reA.source, "g");

    function zero(b) {
      return function() {
        return b;
      };
    }

    function one(b) {
      return function(t) {
        return b(t) + "";
      };
    }

    function interpolateString(a, b) {
      var bi = reA.lastIndex = reB.lastIndex = 0, // scan index for next number in b
          am, // current match in a
          bm, // current match in b
          bs, // string preceding current number in b, if any
          i = -1, // index in s
          s = [], // string constants and placeholders
          q = []; // number interpolators

      // Coerce inputs to strings.
      a = a + "", b = b + "";

      // Interpolate pairs of numbers in a & b.
      while ((am = reA.exec(a))
          && (bm = reB.exec(b))) {
        if ((bs = bm.index) > bi) { // a string precedes the next number in b
          bs = b.slice(bi, bs);
          if (s[i]) s[i] += bs; // coalesce with previous string
          else s[++i] = bs;
        }
        if ((am = am[0]) === (bm = bm[0])) { // numbers in a & b match
          if (s[i]) s[i] += bm; // coalesce with previous string
          else s[++i] = bm;
        } else { // interpolate non-matching numbers
          s[++i] = null;
          q.push({i: i, x: interpolateNumber(am, bm)});
        }
        bi = reB.lastIndex;
      }

      // Add remains of b.
      if (bi < b.length) {
        bs = b.slice(bi);
        if (s[i]) s[i] += bs; // coalesce with previous string
        else s[++i] = bs;
      }

      // Special optimization for only a single match.
      // Otherwise, interpolate each of the numbers and rejoin the string.
      return s.length < 2 ? (q[0]
          ? one(q[0].x)
          : zero(b))
          : (b = q.length, function(t) {
              for (var i = 0, o; i < b; ++i) s[(o = q[i]).i] = o.x(t);
              return s.join("");
            });
    }

    function interpolate$1(a, b) {
      var t = typeof b, c;
      return b == null || t === "boolean" ? constant$1(b)
          : (t === "number" ? interpolateNumber
          : t === "string" ? ((c = color(b)) ? (b = c, interpolateRgb) : interpolateString)
          : b instanceof color ? interpolateRgb
          : b instanceof Date ? date
          : isNumberArray(b) ? numberArray
          : Array.isArray(b) ? genericArray
          : typeof b.valueOf !== "function" && typeof b.toString !== "function" || isNaN(b) ? object
          : interpolateNumber)(a, b);
    }

    function interpolateRound(a, b) {
      return a = +a, b = +b, function(t) {
        return Math.round(a * (1 - t) + b * t);
      };
    }

    var degrees = 180 / Math.PI;

    var identity$3 = {
      translateX: 0,
      translateY: 0,
      rotate: 0,
      skewX: 0,
      scaleX: 1,
      scaleY: 1
    };

    function decompose(a, b, c, d, e, f) {
      var scaleX, scaleY, skewX;
      if (scaleX = Math.sqrt(a * a + b * b)) a /= scaleX, b /= scaleX;
      if (skewX = a * c + b * d) c -= a * skewX, d -= b * skewX;
      if (scaleY = Math.sqrt(c * c + d * d)) c /= scaleY, d /= scaleY, skewX /= scaleY;
      if (a * d < b * c) a = -a, b = -b, skewX = -skewX, scaleX = -scaleX;
      return {
        translateX: e,
        translateY: f,
        rotate: Math.atan2(b, a) * degrees,
        skewX: Math.atan(skewX) * degrees,
        scaleX: scaleX,
        scaleY: scaleY
      };
    }

    var svgNode;

    /* eslint-disable no-undef */
    function parseCss(value) {
      const m = new (typeof DOMMatrix === "function" ? DOMMatrix : WebKitCSSMatrix)(value + "");
      return m.isIdentity ? identity$3 : decompose(m.a, m.b, m.c, m.d, m.e, m.f);
    }

    function parseSvg(value) {
      if (value == null) return identity$3;
      if (!svgNode) svgNode = document.createElementNS("http://www.w3.org/2000/svg", "g");
      svgNode.setAttribute("transform", value);
      if (!(value = svgNode.transform.baseVal.consolidate())) return identity$3;
      value = value.matrix;
      return decompose(value.a, value.b, value.c, value.d, value.e, value.f);
    }

    function interpolateTransform(parse, pxComma, pxParen, degParen) {

      function pop(s) {
        return s.length ? s.pop() + " " : "";
      }

      function translate(xa, ya, xb, yb, s, q) {
        if (xa !== xb || ya !== yb) {
          var i = s.push("translate(", null, pxComma, null, pxParen);
          q.push({i: i - 4, x: interpolateNumber(xa, xb)}, {i: i - 2, x: interpolateNumber(ya, yb)});
        } else if (xb || yb) {
          s.push("translate(" + xb + pxComma + yb + pxParen);
        }
      }

      function rotate(a, b, s, q) {
        if (a !== b) {
          if (a - b > 180) b += 360; else if (b - a > 180) a += 360; // shortest path
          q.push({i: s.push(pop(s) + "rotate(", null, degParen) - 2, x: interpolateNumber(a, b)});
        } else if (b) {
          s.push(pop(s) + "rotate(" + b + degParen);
        }
      }

      function skewX(a, b, s, q) {
        if (a !== b) {
          q.push({i: s.push(pop(s) + "skewX(", null, degParen) - 2, x: interpolateNumber(a, b)});
        } else if (b) {
          s.push(pop(s) + "skewX(" + b + degParen);
        }
      }

      function scale(xa, ya, xb, yb, s, q) {
        if (xa !== xb || ya !== yb) {
          var i = s.push(pop(s) + "scale(", null, ",", null, ")");
          q.push({i: i - 4, x: interpolateNumber(xa, xb)}, {i: i - 2, x: interpolateNumber(ya, yb)});
        } else if (xb !== 1 || yb !== 1) {
          s.push(pop(s) + "scale(" + xb + "," + yb + ")");
        }
      }

      return function(a, b) {
        var s = [], // string constants and placeholders
            q = []; // number interpolators
        a = parse(a), b = parse(b);
        translate(a.translateX, a.translateY, b.translateX, b.translateY, s, q);
        rotate(a.rotate, b.rotate, s, q);
        skewX(a.skewX, b.skewX, s, q);
        scale(a.scaleX, a.scaleY, b.scaleX, b.scaleY, s, q);
        a = b = null; // gc
        return function(t) {
          var i = -1, n = q.length, o;
          while (++i < n) s[(o = q[i]).i] = o.x(t);
          return s.join("");
        };
      };
    }

    var interpolateTransformCss = interpolateTransform(parseCss, "px, ", "px)", "deg)");
    var interpolateTransformSvg = interpolateTransform(parseSvg, ", ", ")", ")");

    var frame = 0, // is an animation frame pending?
        timeout$1 = 0, // is a timeout pending?
        interval = 0, // are any timers active?
        pokeDelay = 1000, // how frequently we check for clock skew
        taskHead,
        taskTail,
        clockLast = 0,
        clockNow = 0,
        clockSkew = 0,
        clock = typeof performance === "object" && performance.now ? performance : Date,
        setFrame = typeof window === "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(f) { setTimeout(f, 17); };

    function now() {
      return clockNow || (setFrame(clearNow), clockNow = clock.now() + clockSkew);
    }

    function clearNow() {
      clockNow = 0;
    }

    function Timer() {
      this._call =
      this._time =
      this._next = null;
    }

    Timer.prototype = timer.prototype = {
      constructor: Timer,
      restart: function(callback, delay, time) {
        if (typeof callback !== "function") throw new TypeError("callback is not a function");
        time = (time == null ? now() : +time) + (delay == null ? 0 : +delay);
        if (!this._next && taskTail !== this) {
          if (taskTail) taskTail._next = this;
          else taskHead = this;
          taskTail = this;
        }
        this._call = callback;
        this._time = time;
        sleep();
      },
      stop: function() {
        if (this._call) {
          this._call = null;
          this._time = Infinity;
          sleep();
        }
      }
    };

    function timer(callback, delay, time) {
      var t = new Timer;
      t.restart(callback, delay, time);
      return t;
    }

    function timerFlush() {
      now(); // Get the current time, if not already set.
      ++frame; // Pretend we’ve set an alarm, if we haven’t already.
      var t = taskHead, e;
      while (t) {
        if ((e = clockNow - t._time) >= 0) t._call.call(undefined, e);
        t = t._next;
      }
      --frame;
    }

    function wake() {
      clockNow = (clockLast = clock.now()) + clockSkew;
      frame = timeout$1 = 0;
      try {
        timerFlush();
      } finally {
        frame = 0;
        nap();
        clockNow = 0;
      }
    }

    function poke() {
      var now = clock.now(), delay = now - clockLast;
      if (delay > pokeDelay) clockSkew -= delay, clockLast = now;
    }

    function nap() {
      var t0, t1 = taskHead, t2, time = Infinity;
      while (t1) {
        if (t1._call) {
          if (time > t1._time) time = t1._time;
          t0 = t1, t1 = t1._next;
        } else {
          t2 = t1._next, t1._next = null;
          t1 = t0 ? t0._next = t2 : taskHead = t2;
        }
      }
      taskTail = t0;
      sleep(time);
    }

    function sleep(time) {
      if (frame) return; // Soonest alarm already set, or will be.
      if (timeout$1) timeout$1 = clearTimeout(timeout$1);
      var delay = time - clockNow; // Strictly less than if we recomputed clockNow.
      if (delay > 24) {
        if (time < Infinity) timeout$1 = setTimeout(wake, time - clock.now() - clockSkew);
        if (interval) interval = clearInterval(interval);
      } else {
        if (!interval) clockLast = clock.now(), interval = setInterval(poke, pokeDelay);
        frame = 1, setFrame(wake);
      }
    }

    function timeout(callback, delay, time) {
      var t = new Timer;
      delay = delay == null ? 0 : +delay;
      t.restart(elapsed => {
        t.stop();
        callback(elapsed + delay);
      }, delay, time);
      return t;
    }

    var emptyOn = dispatch("start", "end", "cancel", "interrupt");
    var emptyTween = [];

    var CREATED = 0;
    var SCHEDULED = 1;
    var STARTING = 2;
    var STARTED = 3;
    var RUNNING = 4;
    var ENDING = 5;
    var ENDED = 6;

    function schedule(node, name, id, index, group, timing) {
      var schedules = node.__transition;
      if (!schedules) node.__transition = {};
      else if (id in schedules) return;
      create(node, id, {
        name: name,
        index: index, // For context during callback.
        group: group, // For context during callback.
        on: emptyOn,
        tween: emptyTween,
        time: timing.time,
        delay: timing.delay,
        duration: timing.duration,
        ease: timing.ease,
        timer: null,
        state: CREATED
      });
    }

    function init(node, id) {
      var schedule = get(node, id);
      if (schedule.state > CREATED) throw new Error("too late; already scheduled");
      return schedule;
    }

    function set(node, id) {
      var schedule = get(node, id);
      if (schedule.state > STARTED) throw new Error("too late; already running");
      return schedule;
    }

    function get(node, id) {
      var schedule = node.__transition;
      if (!schedule || !(schedule = schedule[id])) throw new Error("transition not found");
      return schedule;
    }

    function create(node, id, self) {
      var schedules = node.__transition,
          tween;

      // Initialize the self timer when the transition is created.
      // Note the actual delay is not known until the first callback!
      schedules[id] = self;
      self.timer = timer(schedule, 0, self.time);

      function schedule(elapsed) {
        self.state = SCHEDULED;
        self.timer.restart(start, self.delay, self.time);

        // If the elapsed delay is less than our first sleep, start immediately.
        if (self.delay <= elapsed) start(elapsed - self.delay);
      }

      function start(elapsed) {
        var i, j, n, o;

        // If the state is not SCHEDULED, then we previously errored on start.
        if (self.state !== SCHEDULED) return stop();

        for (i in schedules) {
          o = schedules[i];
          if (o.name !== self.name) continue;

          // While this element already has a starting transition during this frame,
          // defer starting an interrupting transition until that transition has a
          // chance to tick (and possibly end); see d3/d3-transition#54!
          if (o.state === STARTED) return timeout(start);

          // Interrupt the active transition, if any.
          if (o.state === RUNNING) {
            o.state = ENDED;
            o.timer.stop();
            o.on.call("interrupt", node, node.__data__, o.index, o.group);
            delete schedules[i];
          }

          // Cancel any pre-empted transitions.
          else if (+i < id) {
            o.state = ENDED;
            o.timer.stop();
            o.on.call("cancel", node, node.__data__, o.index, o.group);
            delete schedules[i];
          }
        }

        // Defer the first tick to end of the current frame; see d3/d3#1576.
        // Note the transition may be canceled after start and before the first tick!
        // Note this must be scheduled before the start event; see d3/d3-transition#16!
        // Assuming this is successful, subsequent callbacks go straight to tick.
        timeout(function() {
          if (self.state === STARTED) {
            self.state = RUNNING;
            self.timer.restart(tick, self.delay, self.time);
            tick(elapsed);
          }
        });

        // Dispatch the start event.
        // Note this must be done before the tween are initialized.
        self.state = STARTING;
        self.on.call("start", node, node.__data__, self.index, self.group);
        if (self.state !== STARTING) return; // interrupted
        self.state = STARTED;

        // Initialize the tween, deleting null tween.
        tween = new Array(n = self.tween.length);
        for (i = 0, j = -1; i < n; ++i) {
          if (o = self.tween[i].value.call(node, node.__data__, self.index, self.group)) {
            tween[++j] = o;
          }
        }
        tween.length = j + 1;
      }

      function tick(elapsed) {
        var t = elapsed < self.duration ? self.ease.call(null, elapsed / self.duration) : (self.timer.restart(stop), self.state = ENDING, 1),
            i = -1,
            n = tween.length;

        while (++i < n) {
          tween[i].call(node, t);
        }

        // Dispatch the end event.
        if (self.state === ENDING) {
          self.on.call("end", node, node.__data__, self.index, self.group);
          stop();
        }
      }

      function stop() {
        self.state = ENDED;
        self.timer.stop();
        delete schedules[id];
        for (var i in schedules) return; // eslint-disable-line no-unused-vars
        delete node.__transition;
      }
    }

    function interrupt(node, name) {
      var schedules = node.__transition,
          schedule,
          active,
          empty = true,
          i;

      if (!schedules) return;

      name = name == null ? null : name + "";

      for (i in schedules) {
        if ((schedule = schedules[i]).name !== name) { empty = false; continue; }
        active = schedule.state > STARTING && schedule.state < ENDING;
        schedule.state = ENDED;
        schedule.timer.stop();
        schedule.on.call(active ? "interrupt" : "cancel", node, node.__data__, schedule.index, schedule.group);
        delete schedules[i];
      }

      if (empty) delete node.__transition;
    }

    function selection_interrupt(name) {
      return this.each(function() {
        interrupt(this, name);
      });
    }

    function tweenRemove(id, name) {
      var tween0, tween1;
      return function() {
        var schedule = set(this, id),
            tween = schedule.tween;

        // If this node shared tween with the previous node,
        // just assign the updated shared tween and we’re done!
        // Otherwise, copy-on-write.
        if (tween !== tween0) {
          tween1 = tween0 = tween;
          for (var i = 0, n = tween1.length; i < n; ++i) {
            if (tween1[i].name === name) {
              tween1 = tween1.slice();
              tween1.splice(i, 1);
              break;
            }
          }
        }

        schedule.tween = tween1;
      };
    }

    function tweenFunction(id, name, value) {
      var tween0, tween1;
      if (typeof value !== "function") throw new Error;
      return function() {
        var schedule = set(this, id),
            tween = schedule.tween;

        // If this node shared tween with the previous node,
        // just assign the updated shared tween and we’re done!
        // Otherwise, copy-on-write.
        if (tween !== tween0) {
          tween1 = (tween0 = tween).slice();
          for (var t = {name: name, value: value}, i = 0, n = tween1.length; i < n; ++i) {
            if (tween1[i].name === name) {
              tween1[i] = t;
              break;
            }
          }
          if (i === n) tween1.push(t);
        }

        schedule.tween = tween1;
      };
    }

    function transition_tween(name, value) {
      var id = this._id;

      name += "";

      if (arguments.length < 2) {
        var tween = get(this.node(), id).tween;
        for (var i = 0, n = tween.length, t; i < n; ++i) {
          if ((t = tween[i]).name === name) {
            return t.value;
          }
        }
        return null;
      }

      return this.each((value == null ? tweenRemove : tweenFunction)(id, name, value));
    }

    function tweenValue(transition, name, value) {
      var id = transition._id;

      transition.each(function() {
        var schedule = set(this, id);
        (schedule.value || (schedule.value = {}))[name] = value.apply(this, arguments);
      });

      return function(node) {
        return get(node, id).value[name];
      };
    }

    function interpolate(a, b) {
      var c;
      return (typeof b === "number" ? interpolateNumber
          : b instanceof color ? interpolateRgb
          : (c = color(b)) ? (b = c, interpolateRgb)
          : interpolateString)(a, b);
    }

    function attrRemove(name) {
      return function() {
        this.removeAttribute(name);
      };
    }

    function attrRemoveNS(fullname) {
      return function() {
        this.removeAttributeNS(fullname.space, fullname.local);
      };
    }

    function attrConstant(name, interpolate, value1) {
      var string00,
          string1 = value1 + "",
          interpolate0;
      return function() {
        var string0 = this.getAttribute(name);
        return string0 === string1 ? null
            : string0 === string00 ? interpolate0
            : interpolate0 = interpolate(string00 = string0, value1);
      };
    }

    function attrConstantNS(fullname, interpolate, value1) {
      var string00,
          string1 = value1 + "",
          interpolate0;
      return function() {
        var string0 = this.getAttributeNS(fullname.space, fullname.local);
        return string0 === string1 ? null
            : string0 === string00 ? interpolate0
            : interpolate0 = interpolate(string00 = string0, value1);
      };
    }

    function attrFunction(name, interpolate, value) {
      var string00,
          string10,
          interpolate0;
      return function() {
        var string0, value1 = value(this), string1;
        if (value1 == null) return void this.removeAttribute(name);
        string0 = this.getAttribute(name);
        string1 = value1 + "";
        return string0 === string1 ? null
            : string0 === string00 && string1 === string10 ? interpolate0
            : (string10 = string1, interpolate0 = interpolate(string00 = string0, value1));
      };
    }

    function attrFunctionNS(fullname, interpolate, value) {
      var string00,
          string10,
          interpolate0;
      return function() {
        var string0, value1 = value(this), string1;
        if (value1 == null) return void this.removeAttributeNS(fullname.space, fullname.local);
        string0 = this.getAttributeNS(fullname.space, fullname.local);
        string1 = value1 + "";
        return string0 === string1 ? null
            : string0 === string00 && string1 === string10 ? interpolate0
            : (string10 = string1, interpolate0 = interpolate(string00 = string0, value1));
      };
    }

    function transition_attr(name, value) {
      var fullname = namespace(name), i = fullname === "transform" ? interpolateTransformSvg : interpolate;
      return this.attrTween(name, typeof value === "function"
          ? (fullname.local ? attrFunctionNS : attrFunction)(fullname, i, tweenValue(this, "attr." + name, value))
          : value == null ? (fullname.local ? attrRemoveNS : attrRemove)(fullname)
          : (fullname.local ? attrConstantNS : attrConstant)(fullname, i, value));
    }

    function attrInterpolate(name, i) {
      return function(t) {
        this.setAttribute(name, i.call(this, t));
      };
    }

    function attrInterpolateNS(fullname, i) {
      return function(t) {
        this.setAttributeNS(fullname.space, fullname.local, i.call(this, t));
      };
    }

    function attrTweenNS(fullname, value) {
      var t0, i0;
      function tween() {
        var i = value.apply(this, arguments);
        if (i !== i0) t0 = (i0 = i) && attrInterpolateNS(fullname, i);
        return t0;
      }
      tween._value = value;
      return tween;
    }

    function attrTween(name, value) {
      var t0, i0;
      function tween() {
        var i = value.apply(this, arguments);
        if (i !== i0) t0 = (i0 = i) && attrInterpolate(name, i);
        return t0;
      }
      tween._value = value;
      return tween;
    }

    function transition_attrTween(name, value) {
      var key = "attr." + name;
      if (arguments.length < 2) return (key = this.tween(key)) && key._value;
      if (value == null) return this.tween(key, null);
      if (typeof value !== "function") throw new Error;
      var fullname = namespace(name);
      return this.tween(key, (fullname.local ? attrTweenNS : attrTween)(fullname, value));
    }

    function delayFunction(id, value) {
      return function() {
        init(this, id).delay = +value.apply(this, arguments);
      };
    }

    function delayConstant(id, value) {
      return value = +value, function() {
        init(this, id).delay = value;
      };
    }

    function transition_delay(value) {
      var id = this._id;

      return arguments.length
          ? this.each((typeof value === "function"
              ? delayFunction
              : delayConstant)(id, value))
          : get(this.node(), id).delay;
    }

    function durationFunction(id, value) {
      return function() {
        set(this, id).duration = +value.apply(this, arguments);
      };
    }

    function durationConstant(id, value) {
      return value = +value, function() {
        set(this, id).duration = value;
      };
    }

    function transition_duration(value) {
      var id = this._id;

      return arguments.length
          ? this.each((typeof value === "function"
              ? durationFunction
              : durationConstant)(id, value))
          : get(this.node(), id).duration;
    }

    function easeConstant(id, value) {
      if (typeof value !== "function") throw new Error;
      return function() {
        set(this, id).ease = value;
      };
    }

    function transition_ease(value) {
      var id = this._id;

      return arguments.length
          ? this.each(easeConstant(id, value))
          : get(this.node(), id).ease;
    }

    function easeVarying(id, value) {
      return function() {
        var v = value.apply(this, arguments);
        if (typeof v !== "function") throw new Error;
        set(this, id).ease = v;
      };
    }

    function transition_easeVarying(value) {
      if (typeof value !== "function") throw new Error;
      return this.each(easeVarying(this._id, value));
    }

    function transition_filter(match) {
      if (typeof match !== "function") match = matcher(match);

      for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
        for (var group = groups[j], n = group.length, subgroup = subgroups[j] = [], node, i = 0; i < n; ++i) {
          if ((node = group[i]) && match.call(node, node.__data__, i, group)) {
            subgroup.push(node);
          }
        }
      }

      return new Transition(subgroups, this._parents, this._name, this._id);
    }

    function transition_merge(transition) {
      if (transition._id !== this._id) throw new Error;

      for (var groups0 = this._groups, groups1 = transition._groups, m0 = groups0.length, m1 = groups1.length, m = Math.min(m0, m1), merges = new Array(m0), j = 0; j < m; ++j) {
        for (var group0 = groups0[j], group1 = groups1[j], n = group0.length, merge = merges[j] = new Array(n), node, i = 0; i < n; ++i) {
          if (node = group0[i] || group1[i]) {
            merge[i] = node;
          }
        }
      }

      for (; j < m0; ++j) {
        merges[j] = groups0[j];
      }

      return new Transition(merges, this._parents, this._name, this._id);
    }

    function start(name) {
      return (name + "").trim().split(/^|\s+/).every(function(t) {
        var i = t.indexOf(".");
        if (i >= 0) t = t.slice(0, i);
        return !t || t === "start";
      });
    }

    function onFunction(id, name, listener) {
      var on0, on1, sit = start(name) ? init : set;
      return function() {
        var schedule = sit(this, id),
            on = schedule.on;

        // If this node shared a dispatch with the previous node,
        // just assign the updated shared dispatch and we’re done!
        // Otherwise, copy-on-write.
        if (on !== on0) (on1 = (on0 = on).copy()).on(name, listener);

        schedule.on = on1;
      };
    }

    function transition_on(name, listener) {
      var id = this._id;

      return arguments.length < 2
          ? get(this.node(), id).on.on(name)
          : this.each(onFunction(id, name, listener));
    }

    function removeFunction(id) {
      return function() {
        var parent = this.parentNode;
        for (var i in this.__transition) if (+i !== id) return;
        if (parent) parent.removeChild(this);
      };
    }

    function transition_remove() {
      return this.on("end.remove", removeFunction(this._id));
    }

    function transition_select(select) {
      var name = this._name,
          id = this._id;

      if (typeof select !== "function") select = selector(select);

      for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
        for (var group = groups[j], n = group.length, subgroup = subgroups[j] = new Array(n), node, subnode, i = 0; i < n; ++i) {
          if ((node = group[i]) && (subnode = select.call(node, node.__data__, i, group))) {
            if ("__data__" in node) subnode.__data__ = node.__data__;
            subgroup[i] = subnode;
            schedule(subgroup[i], name, id, i, subgroup, get(node, id));
          }
        }
      }

      return new Transition(subgroups, this._parents, name, id);
    }

    function transition_selectAll(select) {
      var name = this._name,
          id = this._id;

      if (typeof select !== "function") select = selectorAll(select);

      for (var groups = this._groups, m = groups.length, subgroups = [], parents = [], j = 0; j < m; ++j) {
        for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
          if (node = group[i]) {
            for (var children = select.call(node, node.__data__, i, group), child, inherit = get(node, id), k = 0, l = children.length; k < l; ++k) {
              if (child = children[k]) {
                schedule(child, name, id, k, children, inherit);
              }
            }
            subgroups.push(children);
            parents.push(node);
          }
        }
      }

      return new Transition(subgroups, parents, name, id);
    }

    var Selection = selection.prototype.constructor;

    function transition_selection() {
      return new Selection(this._groups, this._parents);
    }

    function styleNull(name, interpolate) {
      var string00,
          string10,
          interpolate0;
      return function() {
        var string0 = styleValue(this, name),
            string1 = (this.style.removeProperty(name), styleValue(this, name));
        return string0 === string1 ? null
            : string0 === string00 && string1 === string10 ? interpolate0
            : interpolate0 = interpolate(string00 = string0, string10 = string1);
      };
    }

    function styleRemove(name) {
      return function() {
        this.style.removeProperty(name);
      };
    }

    function styleConstant(name, interpolate, value1) {
      var string00,
          string1 = value1 + "",
          interpolate0;
      return function() {
        var string0 = styleValue(this, name);
        return string0 === string1 ? null
            : string0 === string00 ? interpolate0
            : interpolate0 = interpolate(string00 = string0, value1);
      };
    }

    function styleFunction(name, interpolate, value) {
      var string00,
          string10,
          interpolate0;
      return function() {
        var string0 = styleValue(this, name),
            value1 = value(this),
            string1 = value1 + "";
        if (value1 == null) string1 = value1 = (this.style.removeProperty(name), styleValue(this, name));
        return string0 === string1 ? null
            : string0 === string00 && string1 === string10 ? interpolate0
            : (string10 = string1, interpolate0 = interpolate(string00 = string0, value1));
      };
    }

    function styleMaybeRemove(id, name) {
      var on0, on1, listener0, key = "style." + name, event = "end." + key, remove;
      return function() {
        var schedule = set(this, id),
            on = schedule.on,
            listener = schedule.value[key] == null ? remove || (remove = styleRemove(name)) : undefined;

        // If this node shared a dispatch with the previous node,
        // just assign the updated shared dispatch and we’re done!
        // Otherwise, copy-on-write.
        if (on !== on0 || listener0 !== listener) (on1 = (on0 = on).copy()).on(event, listener0 = listener);

        schedule.on = on1;
      };
    }

    function transition_style(name, value, priority) {
      var i = (name += "") === "transform" ? interpolateTransformCss : interpolate;
      return value == null ? this
          .styleTween(name, styleNull(name, i))
          .on("end.style." + name, styleRemove(name))
        : typeof value === "function" ? this
          .styleTween(name, styleFunction(name, i, tweenValue(this, "style." + name, value)))
          .each(styleMaybeRemove(this._id, name))
        : this
          .styleTween(name, styleConstant(name, i, value), priority)
          .on("end.style." + name, null);
    }

    function styleInterpolate(name, i, priority) {
      return function(t) {
        this.style.setProperty(name, i.call(this, t), priority);
      };
    }

    function styleTween(name, value, priority) {
      var t, i0;
      function tween() {
        var i = value.apply(this, arguments);
        if (i !== i0) t = (i0 = i) && styleInterpolate(name, i, priority);
        return t;
      }
      tween._value = value;
      return tween;
    }

    function transition_styleTween(name, value, priority) {
      var key = "style." + (name += "");
      if (arguments.length < 2) return (key = this.tween(key)) && key._value;
      if (value == null) return this.tween(key, null);
      if (typeof value !== "function") throw new Error;
      return this.tween(key, styleTween(name, value, priority == null ? "" : priority));
    }

    function textConstant(value) {
      return function() {
        this.textContent = value;
      };
    }

    function textFunction(value) {
      return function() {
        var value1 = value(this);
        this.textContent = value1 == null ? "" : value1;
      };
    }

    function transition_text(value) {
      return this.tween("text", typeof value === "function"
          ? textFunction(tweenValue(this, "text", value))
          : textConstant(value == null ? "" : value + ""));
    }

    function textInterpolate(i) {
      return function(t) {
        this.textContent = i.call(this, t);
      };
    }

    function textTween(value) {
      var t0, i0;
      function tween() {
        var i = value.apply(this, arguments);
        if (i !== i0) t0 = (i0 = i) && textInterpolate(i);
        return t0;
      }
      tween._value = value;
      return tween;
    }

    function transition_textTween(value) {
      var key = "text";
      if (arguments.length < 1) return (key = this.tween(key)) && key._value;
      if (value == null) return this.tween(key, null);
      if (typeof value !== "function") throw new Error;
      return this.tween(key, textTween(value));
    }

    function transition_transition() {
      var name = this._name,
          id0 = this._id,
          id1 = newId();

      for (var groups = this._groups, m = groups.length, j = 0; j < m; ++j) {
        for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
          if (node = group[i]) {
            var inherit = get(node, id0);
            schedule(node, name, id1, i, group, {
              time: inherit.time + inherit.delay + inherit.duration,
              delay: 0,
              duration: inherit.duration,
              ease: inherit.ease
            });
          }
        }
      }

      return new Transition(groups, this._parents, name, id1);
    }

    function transition_end() {
      var on0, on1, that = this, id = that._id, size = that.size();
      return new Promise(function(resolve, reject) {
        var cancel = {value: reject},
            end = {value: function() { if (--size === 0) resolve(); }};

        that.each(function() {
          var schedule = set(this, id),
              on = schedule.on;

          // If this node shared a dispatch with the previous node,
          // just assign the updated shared dispatch and we’re done!
          // Otherwise, copy-on-write.
          if (on !== on0) {
            on1 = (on0 = on).copy();
            on1._.cancel.push(cancel);
            on1._.interrupt.push(cancel);
            on1._.end.push(end);
          }

          schedule.on = on1;
        });

        // The selection was empty, resolve end immediately
        if (size === 0) resolve();
      });
    }

    var id = 0;

    function Transition(groups, parents, name, id) {
      this._groups = groups;
      this._parents = parents;
      this._name = name;
      this._id = id;
    }

    function newId() {
      return ++id;
    }

    var selection_prototype = selection.prototype;

    Transition.prototype = {
      constructor: Transition,
      select: transition_select,
      selectAll: transition_selectAll,
      selectChild: selection_prototype.selectChild,
      selectChildren: selection_prototype.selectChildren,
      filter: transition_filter,
      merge: transition_merge,
      selection: transition_selection,
      transition: transition_transition,
      call: selection_prototype.call,
      nodes: selection_prototype.nodes,
      node: selection_prototype.node,
      size: selection_prototype.size,
      empty: selection_prototype.empty,
      each: selection_prototype.each,
      on: transition_on,
      attr: transition_attr,
      attrTween: transition_attrTween,
      style: transition_style,
      styleTween: transition_styleTween,
      text: transition_text,
      textTween: transition_textTween,
      remove: transition_remove,
      tween: transition_tween,
      delay: transition_delay,
      duration: transition_duration,
      ease: transition_ease,
      easeVarying: transition_easeVarying,
      end: transition_end,
      [Symbol.iterator]: selection_prototype[Symbol.iterator]
    };

    function cubicInOut(t) {
      return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
    }

    var defaultTiming = {
      time: null, // Set on use.
      delay: 0,
      duration: 250,
      ease: cubicInOut
    };

    function inherit(node, id) {
      var timing;
      while (!(timing = node.__transition) || !(timing = timing[id])) {
        if (!(node = node.parentNode)) {
          throw new Error(`transition ${id} not found`);
        }
      }
      return timing;
    }

    function selection_transition(name) {
      var id,
          timing;

      if (name instanceof Transition) {
        id = name._id, name = name._name;
      } else {
        id = newId(), (timing = defaultTiming).time = now(), name = name == null ? null : name + "";
      }

      for (var groups = this._groups, m = groups.length, j = 0; j < m; ++j) {
        for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
          if (node = group[i]) {
            schedule(node, name, id, i, group, timing || inherit(node, id));
          }
        }
      }

      return new Transition(groups, this._parents, name, id);
    }

    selection.prototype.interrupt = selection_interrupt;
    selection.prototype.transition = selection_transition;

    var array = Array.prototype;

    var slice = array.slice;

    function ascending(a, b) {
      return a - b;
    }

    function area(ring) {
      var i = 0, n = ring.length, area = ring[n - 1][1] * ring[0][0] - ring[n - 1][0] * ring[0][1];
      while (++i < n) area += ring[i - 1][1] * ring[i][0] - ring[i - 1][0] * ring[i][1];
      return area;
    }

    var constant = x => () => x;

    function contains(ring, hole) {
      var i = -1, n = hole.length, c;
      while (++i < n) if (c = ringContains(ring, hole[i])) return c;
      return 0;
    }

    function ringContains(ring, point) {
      var x = point[0], y = point[1], contains = -1;
      for (var i = 0, n = ring.length, j = n - 1; i < n; j = i++) {
        var pi = ring[i], xi = pi[0], yi = pi[1], pj = ring[j], xj = pj[0], yj = pj[1];
        if (segmentContains(pi, pj, point)) return 0;
        if (((yi > y) !== (yj > y)) && ((x < (xj - xi) * (y - yi) / (yj - yi) + xi))) contains = -contains;
      }
      return contains;
    }

    function segmentContains(a, b, c) {
      var i; return collinear(a, b, c) && within(a[i = +(a[0] === b[0])], c[i], b[i]);
    }

    function collinear(a, b, c) {
      return (b[0] - a[0]) * (c[1] - a[1]) === (c[0] - a[0]) * (b[1] - a[1]);
    }

    function within(p, q, r) {
      return p <= q && q <= r || r <= q && q <= p;
    }

    function noop$1() {}

    var cases = [
      [],
      [[[1.0, 1.5], [0.5, 1.0]]],
      [[[1.5, 1.0], [1.0, 1.5]]],
      [[[1.5, 1.0], [0.5, 1.0]]],
      [[[1.0, 0.5], [1.5, 1.0]]],
      [[[1.0, 1.5], [0.5, 1.0]], [[1.0, 0.5], [1.5, 1.0]]],
      [[[1.0, 0.5], [1.0, 1.5]]],
      [[[1.0, 0.5], [0.5, 1.0]]],
      [[[0.5, 1.0], [1.0, 0.5]]],
      [[[1.0, 1.5], [1.0, 0.5]]],
      [[[0.5, 1.0], [1.0, 0.5]], [[1.5, 1.0], [1.0, 1.5]]],
      [[[1.5, 1.0], [1.0, 0.5]]],
      [[[0.5, 1.0], [1.5, 1.0]]],
      [[[1.0, 1.5], [1.5, 1.0]]],
      [[[0.5, 1.0], [1.0, 1.5]]],
      []
    ];

    function contours() {
      var dx = 1,
          dy = 1,
          threshold = thresholdSturges,
          smooth = smoothLinear;

      function contours(values) {
        var tz = threshold(values);

        // Convert number of thresholds into uniform thresholds.
        if (!Array.isArray(tz)) {
          const e = extent(values), ts = tickStep(e[0], e[1], tz);
          tz = ticks(Math.floor(e[0] / ts) * ts, Math.floor(e[1] / ts - 1) * ts, tz);
        } else {
          tz = tz.slice().sort(ascending);
        }

        return tz.map(value => contour(values, value));
      }

      // Accumulate, smooth contour rings, assign holes to exterior rings.
      // Based on https://github.com/mbostock/shapefile/blob/v0.6.2/shp/polygon.js
      function contour(values, value) {
        var polygons = [],
            holes = [];

        isorings(values, value, function(ring) {
          smooth(ring, values, value);
          if (area(ring) > 0) polygons.push([ring]);
          else holes.push(ring);
        });

        holes.forEach(function(hole) {
          for (var i = 0, n = polygons.length, polygon; i < n; ++i) {
            if (contains((polygon = polygons[i])[0], hole) !== -1) {
              polygon.push(hole);
              return;
            }
          }
        });

        return {
          type: "MultiPolygon",
          value: value,
          coordinates: polygons
        };
      }

      // Marching squares with isolines stitched into rings.
      // Based on https://github.com/topojson/topojson-client/blob/v3.0.0/src/stitch.js
      function isorings(values, value, callback) {
        var fragmentByStart = new Array,
            fragmentByEnd = new Array,
            x, y, t0, t1, t2, t3;

        // Special case for the first row (y = -1, t2 = t3 = 0).
        x = y = -1;
        t1 = values[0] >= value;
        cases[t1 << 1].forEach(stitch);
        while (++x < dx - 1) {
          t0 = t1, t1 = values[x + 1] >= value;
          cases[t0 | t1 << 1].forEach(stitch);
        }
        cases[t1 << 0].forEach(stitch);

        // General case for the intermediate rows.
        while (++y < dy - 1) {
          x = -1;
          t1 = values[y * dx + dx] >= value;
          t2 = values[y * dx] >= value;
          cases[t1 << 1 | t2 << 2].forEach(stitch);
          while (++x < dx - 1) {
            t0 = t1, t1 = values[y * dx + dx + x + 1] >= value;
            t3 = t2, t2 = values[y * dx + x + 1] >= value;
            cases[t0 | t1 << 1 | t2 << 2 | t3 << 3].forEach(stitch);
          }
          cases[t1 | t2 << 3].forEach(stitch);
        }

        // Special case for the last row (y = dy - 1, t0 = t1 = 0).
        x = -1;
        t2 = values[y * dx] >= value;
        cases[t2 << 2].forEach(stitch);
        while (++x < dx - 1) {
          t3 = t2, t2 = values[y * dx + x + 1] >= value;
          cases[t2 << 2 | t3 << 3].forEach(stitch);
        }
        cases[t2 << 3].forEach(stitch);

        function stitch(line) {
          var start = [line[0][0] + x, line[0][1] + y],
              end = [line[1][0] + x, line[1][1] + y],
              startIndex = index(start),
              endIndex = index(end),
              f, g;
          if (f = fragmentByEnd[startIndex]) {
            if (g = fragmentByStart[endIndex]) {
              delete fragmentByEnd[f.end];
              delete fragmentByStart[g.start];
              if (f === g) {
                f.ring.push(end);
                callback(f.ring);
              } else {
                fragmentByStart[f.start] = fragmentByEnd[g.end] = {start: f.start, end: g.end, ring: f.ring.concat(g.ring)};
              }
            } else {
              delete fragmentByEnd[f.end];
              f.ring.push(end);
              fragmentByEnd[f.end = endIndex] = f;
            }
          } else if (f = fragmentByStart[endIndex]) {
            if (g = fragmentByEnd[startIndex]) {
              delete fragmentByStart[f.start];
              delete fragmentByEnd[g.end];
              if (f === g) {
                f.ring.push(end);
                callback(f.ring);
              } else {
                fragmentByStart[g.start] = fragmentByEnd[f.end] = {start: g.start, end: f.end, ring: g.ring.concat(f.ring)};
              }
            } else {
              delete fragmentByStart[f.start];
              f.ring.unshift(start);
              fragmentByStart[f.start = startIndex] = f;
            }
          } else {
            fragmentByStart[startIndex] = fragmentByEnd[endIndex] = {start: startIndex, end: endIndex, ring: [start, end]};
          }
        }
      }

      function index(point) {
        return point[0] * 2 + point[1] * (dx + 1) * 4;
      }

      function smoothLinear(ring, values, value) {
        ring.forEach(function(point) {
          var x = point[0],
              y = point[1],
              xt = x | 0,
              yt = y | 0,
              v0,
              v1 = values[yt * dx + xt];
          if (x > 0 && x < dx && xt === x) {
            v0 = values[yt * dx + xt - 1];
            point[0] = x + (value - v0) / (v1 - v0) - 0.5;
          }
          if (y > 0 && y < dy && yt === y) {
            v0 = values[(yt - 1) * dx + xt];
            point[1] = y + (value - v0) / (v1 - v0) - 0.5;
          }
        });
      }

      contours.contour = contour;

      contours.size = function(_) {
        if (!arguments.length) return [dx, dy];
        var _0 = Math.floor(_[0]), _1 = Math.floor(_[1]);
        if (!(_0 >= 0 && _1 >= 0)) throw new Error("invalid size");
        return dx = _0, dy = _1, contours;
      };

      contours.thresholds = function(_) {
        return arguments.length ? (threshold = typeof _ === "function" ? _ : Array.isArray(_) ? constant(slice.call(_)) : constant(_), contours) : threshold;
      };

      contours.smooth = function(_) {
        return arguments.length ? (smooth = _ ? smoothLinear : noop$1, contours) : smooth === smoothLinear;
      };

      return contours;
    }

    // TODO Optimize edge cases.
    // TODO Optimize index calculation.
    // TODO Optimize arguments.
    function blurX(source, target, r) {
      var n = source.width,
          m = source.height,
          w = (r << 1) + 1;
      for (var j = 0; j < m; ++j) {
        for (var i = 0, sr = 0; i < n + r; ++i) {
          if (i < n) {
            sr += source.data[i + j * n];
          }
          if (i >= r) {
            if (i >= w) {
              sr -= source.data[i - w + j * n];
            }
            target.data[i - r + j * n] = sr / Math.min(i + 1, n - 1 + w - i, w);
          }
        }
      }
    }

    // TODO Optimize edge cases.
    // TODO Optimize index calculation.
    // TODO Optimize arguments.
    function blurY(source, target, r) {
      var n = source.width,
          m = source.height,
          w = (r << 1) + 1;
      for (var i = 0; i < n; ++i) {
        for (var j = 0, sr = 0; j < m + r; ++j) {
          if (j < m) {
            sr += source.data[i + j * n];
          }
          if (j >= r) {
            if (j >= w) {
              sr -= source.data[i + (j - w) * n];
            }
            target.data[i + (j - r) * n] = sr / Math.min(j + 1, m - 1 + w - j, w);
          }
        }
      }
    }

    function defaultX(d) {
      return d[0];
    }

    function defaultY(d) {
      return d[1];
    }

    function defaultWeight() {
      return 1;
    }

    function density() {
      var x = defaultX,
          y = defaultY,
          weight = defaultWeight,
          dx = 960,
          dy = 500,
          r = 20, // blur radius
          k = 2, // log2(grid cell size)
          o = r * 3, // grid offset, to pad for blur
          n = (dx + o * 2) >> k, // grid width
          m = (dy + o * 2) >> k, // grid height
          threshold = constant(20);

      function density(data) {
        var values0 = new Float32Array(n * m),
            values1 = new Float32Array(n * m),
            pow2k = Math.pow(2, -k);

        data.forEach(function(d, i, data) {
          var xi = (x(d, i, data) + o) * pow2k,
              yi = (y(d, i, data) + o) * pow2k,
              wi = +weight(d, i, data);
          if (xi >= 0 && xi < n && yi >= 0 && yi < m) {
            var x0 = Math.floor(xi),
                y0 = Math.floor(yi),
                xt = xi - x0 - 0.5,
                yt = yi - y0 - 0.5;
            values0[x0 + y0 * n] += (1 - xt) * (1 - yt) * wi;
            values0[x0 + 1 + y0 * n] += xt * (1 - yt) * wi;
            values0[x0 + 1 + (y0 + 1) * n] += xt * yt * wi;
            values0[x0 + (y0 + 1) * n] += (1 - xt) * yt * wi;
          }
        });

        // TODO Optimize.
        blurX({width: n, height: m, data: values0}, {width: n, height: m, data: values1}, r >> k);
        blurY({width: n, height: m, data: values1}, {width: n, height: m, data: values0}, r >> k);
        blurX({width: n, height: m, data: values0}, {width: n, height: m, data: values1}, r >> k);
        blurY({width: n, height: m, data: values1}, {width: n, height: m, data: values0}, r >> k);
        blurX({width: n, height: m, data: values0}, {width: n, height: m, data: values1}, r >> k);
        blurY({width: n, height: m, data: values1}, {width: n, height: m, data: values0}, r >> k);

        var tz = threshold(values0);

        // Convert number of thresholds into uniform thresholds.
        if (!Array.isArray(tz)) {
          var stop = max(values0);
          tz = tickStep(0, stop, tz);
          tz = range(0, Math.floor(stop / tz) * tz, tz);
          tz.shift();
        }

        return contours()
            .thresholds(tz)
            .size([n, m])
          (values0)
            .map(transform);
      }

      function transform(geometry) {
        geometry.value *= Math.pow(2, -2 * k); // Density in points per square pixel.
        geometry.coordinates.forEach(transformPolygon);
        return geometry;
      }

      function transformPolygon(coordinates) {
        coordinates.forEach(transformRing);
      }

      function transformRing(coordinates) {
        coordinates.forEach(transformPoint);
      }

      // TODO Optimize.
      function transformPoint(coordinates) {
        coordinates[0] = coordinates[0] * Math.pow(2, k) - o;
        coordinates[1] = coordinates[1] * Math.pow(2, k) - o;
      }

      function resize() {
        o = r * 3;
        n = (dx + o * 2) >> k;
        m = (dy + o * 2) >> k;
        return density;
      }

      density.x = function(_) {
        return arguments.length ? (x = typeof _ === "function" ? _ : constant(+_), density) : x;
      };

      density.y = function(_) {
        return arguments.length ? (y = typeof _ === "function" ? _ : constant(+_), density) : y;
      };

      density.weight = function(_) {
        return arguments.length ? (weight = typeof _ === "function" ? _ : constant(+_), density) : weight;
      };

      density.size = function(_) {
        if (!arguments.length) return [dx, dy];
        var _0 = +_[0], _1 = +_[1];
        if (!(_0 >= 0 && _1 >= 0)) throw new Error("invalid size");
        return dx = _0, dy = _1, resize();
      };

      density.cellSize = function(_) {
        if (!arguments.length) return 1 << k;
        if (!((_ = +_) >= 1)) throw new Error("invalid cell size");
        return k = Math.floor(Math.log(_) / Math.LN2), resize();
      };

      density.thresholds = function(_) {
        return arguments.length ? (threshold = typeof _ === "function" ? _ : Array.isArray(_) ? constant(slice.call(_)) : constant(_), density) : threshold;
      };

      density.bandwidth = function(_) {
        if (!arguments.length) return Math.sqrt(r * (r + 1));
        if (!((_ = +_) >= 0)) throw new Error("invalid bandwidth");
        return r = Math.round((Math.sqrt(4 * _ * _ + 1) - 1) / 2), resize();
      };

      return density;
    }

    function formatDecimal(x) {
      return Math.abs(x = Math.round(x)) >= 1e21
          ? x.toLocaleString("en").replace(/,/g, "")
          : x.toString(10);
    }

    // Computes the decimal coefficient and exponent of the specified number x with
    // significant digits p, where x is positive and p is in [1, 21] or undefined.
    // For example, formatDecimalParts(1.23) returns ["123", 0].
    function formatDecimalParts(x, p) {
      if ((i = (x = p ? x.toExponential(p - 1) : x.toExponential()).indexOf("e")) < 0) return null; // NaN, ±Infinity
      var i, coefficient = x.slice(0, i);

      // The string returned by toExponential either has the form \d\.\d+e[-+]\d+
      // (e.g., 1.2e+3) or the form \de[-+]\d+ (e.g., 1e+3).
      return [
        coefficient.length > 1 ? coefficient[0] + coefficient.slice(2) : coefficient,
        +x.slice(i + 1)
      ];
    }

    function exponent(x) {
      return x = formatDecimalParts(Math.abs(x)), x ? x[1] : NaN;
    }

    function formatGroup(grouping, thousands) {
      return function(value, width) {
        var i = value.length,
            t = [],
            j = 0,
            g = grouping[0],
            length = 0;

        while (i > 0 && g > 0) {
          if (length + g + 1 > width) g = Math.max(1, width - length);
          t.push(value.substring(i -= g, i + g));
          if ((length += g + 1) > width) break;
          g = grouping[j = (j + 1) % grouping.length];
        }

        return t.reverse().join(thousands);
      };
    }

    function formatNumerals(numerals) {
      return function(value) {
        return value.replace(/[0-9]/g, function(i) {
          return numerals[+i];
        });
      };
    }

    // [[fill]align][sign][symbol][0][width][,][.precision][~][type]
    var re = /^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;

    function formatSpecifier(specifier) {
      if (!(match = re.exec(specifier))) throw new Error("invalid format: " + specifier);
      var match;
      return new FormatSpecifier({
        fill: match[1],
        align: match[2],
        sign: match[3],
        symbol: match[4],
        zero: match[5],
        width: match[6],
        comma: match[7],
        precision: match[8] && match[8].slice(1),
        trim: match[9],
        type: match[10]
      });
    }

    formatSpecifier.prototype = FormatSpecifier.prototype; // instanceof

    function FormatSpecifier(specifier) {
      this.fill = specifier.fill === undefined ? " " : specifier.fill + "";
      this.align = specifier.align === undefined ? ">" : specifier.align + "";
      this.sign = specifier.sign === undefined ? "-" : specifier.sign + "";
      this.symbol = specifier.symbol === undefined ? "" : specifier.symbol + "";
      this.zero = !!specifier.zero;
      this.width = specifier.width === undefined ? undefined : +specifier.width;
      this.comma = !!specifier.comma;
      this.precision = specifier.precision === undefined ? undefined : +specifier.precision;
      this.trim = !!specifier.trim;
      this.type = specifier.type === undefined ? "" : specifier.type + "";
    }

    FormatSpecifier.prototype.toString = function() {
      return this.fill
          + this.align
          + this.sign
          + this.symbol
          + (this.zero ? "0" : "")
          + (this.width === undefined ? "" : Math.max(1, this.width | 0))
          + (this.comma ? "," : "")
          + (this.precision === undefined ? "" : "." + Math.max(0, this.precision | 0))
          + (this.trim ? "~" : "")
          + this.type;
    };

    // Trims insignificant zeros, e.g., replaces 1.2000k with 1.2k.
    function formatTrim(s) {
      out: for (var n = s.length, i = 1, i0 = -1, i1; i < n; ++i) {
        switch (s[i]) {
          case ".": i0 = i1 = i; break;
          case "0": if (i0 === 0) i0 = i; i1 = i; break;
          default: if (!+s[i]) break out; if (i0 > 0) i0 = 0; break;
        }
      }
      return i0 > 0 ? s.slice(0, i0) + s.slice(i1 + 1) : s;
    }

    var prefixExponent;

    function formatPrefixAuto(x, p) {
      var d = formatDecimalParts(x, p);
      if (!d) return x + "";
      var coefficient = d[0],
          exponent = d[1],
          i = exponent - (prefixExponent = Math.max(-8, Math.min(8, Math.floor(exponent / 3))) * 3) + 1,
          n = coefficient.length;
      return i === n ? coefficient
          : i > n ? coefficient + new Array(i - n + 1).join("0")
          : i > 0 ? coefficient.slice(0, i) + "." + coefficient.slice(i)
          : "0." + new Array(1 - i).join("0") + formatDecimalParts(x, Math.max(0, p + i - 1))[0]; // less than 1y!
    }

    function formatRounded(x, p) {
      var d = formatDecimalParts(x, p);
      if (!d) return x + "";
      var coefficient = d[0],
          exponent = d[1];
      return exponent < 0 ? "0." + new Array(-exponent).join("0") + coefficient
          : coefficient.length > exponent + 1 ? coefficient.slice(0, exponent + 1) + "." + coefficient.slice(exponent + 1)
          : coefficient + new Array(exponent - coefficient.length + 2).join("0");
    }

    var formatTypes = {
      "%": (x, p) => (x * 100).toFixed(p),
      "b": (x) => Math.round(x).toString(2),
      "c": (x) => x + "",
      "d": formatDecimal,
      "e": (x, p) => x.toExponential(p),
      "f": (x, p) => x.toFixed(p),
      "g": (x, p) => x.toPrecision(p),
      "o": (x) => Math.round(x).toString(8),
      "p": (x, p) => formatRounded(x * 100, p),
      "r": formatRounded,
      "s": formatPrefixAuto,
      "X": (x) => Math.round(x).toString(16).toUpperCase(),
      "x": (x) => Math.round(x).toString(16)
    };

    function identity$2(x) {
      return x;
    }

    var map = Array.prototype.map,
        prefixes = ["y","z","a","f","p","n","µ","m","","k","M","G","T","P","E","Z","Y"];

    function formatLocale(locale) {
      var group = locale.grouping === undefined || locale.thousands === undefined ? identity$2 : formatGroup(map.call(locale.grouping, Number), locale.thousands + ""),
          currencyPrefix = locale.currency === undefined ? "" : locale.currency[0] + "",
          currencySuffix = locale.currency === undefined ? "" : locale.currency[1] + "",
          decimal = locale.decimal === undefined ? "." : locale.decimal + "",
          numerals = locale.numerals === undefined ? identity$2 : formatNumerals(map.call(locale.numerals, String)),
          percent = locale.percent === undefined ? "%" : locale.percent + "",
          minus = locale.minus === undefined ? "−" : locale.minus + "",
          nan = locale.nan === undefined ? "NaN" : locale.nan + "";

      function newFormat(specifier) {
        specifier = formatSpecifier(specifier);

        var fill = specifier.fill,
            align = specifier.align,
            sign = specifier.sign,
            symbol = specifier.symbol,
            zero = specifier.zero,
            width = specifier.width,
            comma = specifier.comma,
            precision = specifier.precision,
            trim = specifier.trim,
            type = specifier.type;

        // The "n" type is an alias for ",g".
        if (type === "n") comma = true, type = "g";

        // The "" type, and any invalid type, is an alias for ".12~g".
        else if (!formatTypes[type]) precision === undefined && (precision = 12), trim = true, type = "g";

        // If zero fill is specified, padding goes after sign and before digits.
        if (zero || (fill === "0" && align === "=")) zero = true, fill = "0", align = "=";

        // Compute the prefix and suffix.
        // For SI-prefix, the suffix is lazily computed.
        var prefix = symbol === "$" ? currencyPrefix : symbol === "#" && /[boxX]/.test(type) ? "0" + type.toLowerCase() : "",
            suffix = symbol === "$" ? currencySuffix : /[%p]/.test(type) ? percent : "";

        // What format function should we use?
        // Is this an integer type?
        // Can this type generate exponential notation?
        var formatType = formatTypes[type],
            maybeSuffix = /[defgprs%]/.test(type);

        // Set the default precision if not specified,
        // or clamp the specified precision to the supported range.
        // For significant precision, it must be in [1, 21].
        // For fixed precision, it must be in [0, 20].
        precision = precision === undefined ? 6
            : /[gprs]/.test(type) ? Math.max(1, Math.min(21, precision))
            : Math.max(0, Math.min(20, precision));

        function format(value) {
          var valuePrefix = prefix,
              valueSuffix = suffix,
              i, n, c;

          if (type === "c") {
            valueSuffix = formatType(value) + valueSuffix;
            value = "";
          } else {
            value = +value;

            // Determine the sign. -0 is not less than 0, but 1 / -0 is!
            var valueNegative = value < 0 || 1 / value < 0;

            // Perform the initial formatting.
            value = isNaN(value) ? nan : formatType(Math.abs(value), precision);

            // Trim insignificant zeros.
            if (trim) value = formatTrim(value);

            // If a negative value rounds to zero after formatting, and no explicit positive sign is requested, hide the sign.
            if (valueNegative && +value === 0 && sign !== "+") valueNegative = false;

            // Compute the prefix and suffix.
            valuePrefix = (valueNegative ? (sign === "(" ? sign : minus) : sign === "-" || sign === "(" ? "" : sign) + valuePrefix;
            valueSuffix = (type === "s" ? prefixes[8 + prefixExponent / 3] : "") + valueSuffix + (valueNegative && sign === "(" ? ")" : "");

            // Break the formatted value into the integer “value” part that can be
            // grouped, and fractional or exponential “suffix” part that is not.
            if (maybeSuffix) {
              i = -1, n = value.length;
              while (++i < n) {
                if (c = value.charCodeAt(i), 48 > c || c > 57) {
                  valueSuffix = (c === 46 ? decimal + value.slice(i + 1) : value.slice(i)) + valueSuffix;
                  value = value.slice(0, i);
                  break;
                }
              }
            }
          }

          // If the fill character is not "0", grouping is applied before padding.
          if (comma && !zero) value = group(value, Infinity);

          // Compute the padding.
          var length = valuePrefix.length + value.length + valueSuffix.length,
              padding = length < width ? new Array(width - length + 1).join(fill) : "";

          // If the fill character is "0", grouping is applied after padding.
          if (comma && zero) value = group(padding + value, padding.length ? width - valueSuffix.length : Infinity), padding = "";

          // Reconstruct the final output based on the desired alignment.
          switch (align) {
            case "<": value = valuePrefix + value + valueSuffix + padding; break;
            case "=": value = valuePrefix + padding + value + valueSuffix; break;
            case "^": value = padding.slice(0, length = padding.length >> 1) + valuePrefix + value + valueSuffix + padding.slice(length); break;
            default: value = padding + valuePrefix + value + valueSuffix; break;
          }

          return numerals(value);
        }

        format.toString = function() {
          return specifier + "";
        };

        return format;
      }

      function formatPrefix(specifier, value) {
        var f = newFormat((specifier = formatSpecifier(specifier), specifier.type = "f", specifier)),
            e = Math.max(-8, Math.min(8, Math.floor(exponent(value) / 3))) * 3,
            k = Math.pow(10, -e),
            prefix = prefixes[8 + e / 3];
        return function(value) {
          return f(k * value) + prefix;
        };
      }

      return {
        format: newFormat,
        formatPrefix: formatPrefix
      };
    }

    var locale;
    var format;
    var formatPrefix;

    defaultLocale({
      thousands: ",",
      grouping: [3],
      currency: ["$", ""]
    });

    function defaultLocale(definition) {
      locale = formatLocale(definition);
      format = locale.format;
      formatPrefix = locale.formatPrefix;
      return locale;
    }

    function precisionFixed(step) {
      return Math.max(0, -exponent(Math.abs(step)));
    }

    function precisionPrefix(step, value) {
      return Math.max(0, Math.max(-8, Math.min(8, Math.floor(exponent(value) / 3))) * 3 - exponent(Math.abs(step)));
    }

    function precisionRound(step, max) {
      step = Math.abs(step), max = Math.abs(max) - step;
      return Math.max(0, exponent(max) - exponent(step)) + 1;
    }

    var pi = Math.PI;
    var tau = pi * 2;

    var abs = Math.abs;
    var sqrt = Math.sqrt;

    function noop() {}

    function streamGeometry(geometry, stream) {
      if (geometry && streamGeometryType.hasOwnProperty(geometry.type)) {
        streamGeometryType[geometry.type](geometry, stream);
      }
    }

    var streamObjectType = {
      Feature: function(object, stream) {
        streamGeometry(object.geometry, stream);
      },
      FeatureCollection: function(object, stream) {
        var features = object.features, i = -1, n = features.length;
        while (++i < n) streamGeometry(features[i].geometry, stream);
      }
    };

    var streamGeometryType = {
      Sphere: function(object, stream) {
        stream.sphere();
      },
      Point: function(object, stream) {
        object = object.coordinates;
        stream.point(object[0], object[1], object[2]);
      },
      MultiPoint: function(object, stream) {
        var coordinates = object.coordinates, i = -1, n = coordinates.length;
        while (++i < n) object = coordinates[i], stream.point(object[0], object[1], object[2]);
      },
      LineString: function(object, stream) {
        streamLine(object.coordinates, stream, 0);
      },
      MultiLineString: function(object, stream) {
        var coordinates = object.coordinates, i = -1, n = coordinates.length;
        while (++i < n) streamLine(coordinates[i], stream, 0);
      },
      Polygon: function(object, stream) {
        streamPolygon(object.coordinates, stream);
      },
      MultiPolygon: function(object, stream) {
        var coordinates = object.coordinates, i = -1, n = coordinates.length;
        while (++i < n) streamPolygon(coordinates[i], stream);
      },
      GeometryCollection: function(object, stream) {
        var geometries = object.geometries, i = -1, n = geometries.length;
        while (++i < n) streamGeometry(geometries[i], stream);
      }
    };

    function streamLine(coordinates, stream, closed) {
      var i = -1, n = coordinates.length - closed, coordinate;
      stream.lineStart();
      while (++i < n) coordinate = coordinates[i], stream.point(coordinate[0], coordinate[1], coordinate[2]);
      stream.lineEnd();
    }

    function streamPolygon(coordinates, stream) {
      var i = -1, n = coordinates.length;
      stream.polygonStart();
      while (++i < n) streamLine(coordinates[i], stream, 1);
      stream.polygonEnd();
    }

    function geoStream(object, stream) {
      if (object && streamObjectType.hasOwnProperty(object.type)) {
        streamObjectType[object.type](object, stream);
      } else {
        streamGeometry(object, stream);
      }
    }

    var identity$1 = x => x;

    var areaSum = new Adder(),
        areaRingSum = new Adder(),
        x00$2,
        y00$2,
        x0$3,
        y0$3;

    var areaStream = {
      point: noop,
      lineStart: noop,
      lineEnd: noop,
      polygonStart: function() {
        areaStream.lineStart = areaRingStart;
        areaStream.lineEnd = areaRingEnd;
      },
      polygonEnd: function() {
        areaStream.lineStart = areaStream.lineEnd = areaStream.point = noop;
        areaSum.add(abs(areaRingSum));
        areaRingSum = new Adder();
      },
      result: function() {
        var area = areaSum / 2;
        areaSum = new Adder();
        return area;
      }
    };

    function areaRingStart() {
      areaStream.point = areaPointFirst;
    }

    function areaPointFirst(x, y) {
      areaStream.point = areaPoint;
      x00$2 = x0$3 = x, y00$2 = y0$3 = y;
    }

    function areaPoint(x, y) {
      areaRingSum.add(y0$3 * x - x0$3 * y);
      x0$3 = x, y0$3 = y;
    }

    function areaRingEnd() {
      areaPoint(x00$2, y00$2);
    }

    var pathArea = areaStream;

    var x0$2 = Infinity,
        y0$2 = x0$2,
        x1 = -x0$2,
        y1 = x1;

    var boundsStream = {
      point: boundsPoint,
      lineStart: noop,
      lineEnd: noop,
      polygonStart: noop,
      polygonEnd: noop,
      result: function() {
        var bounds = [[x0$2, y0$2], [x1, y1]];
        x1 = y1 = -(y0$2 = x0$2 = Infinity);
        return bounds;
      }
    };

    function boundsPoint(x, y) {
      if (x < x0$2) x0$2 = x;
      if (x > x1) x1 = x;
      if (y < y0$2) y0$2 = y;
      if (y > y1) y1 = y;
    }

    var boundsStream$1 = boundsStream;

    // TODO Enforce positive area for exterior, negative area for interior?

    var X0 = 0,
        Y0 = 0,
        Z0 = 0,
        X1 = 0,
        Y1 = 0,
        Z1 = 0,
        X2 = 0,
        Y2 = 0,
        Z2 = 0,
        x00$1,
        y00$1,
        x0$1,
        y0$1;

    var centroidStream = {
      point: centroidPoint,
      lineStart: centroidLineStart,
      lineEnd: centroidLineEnd,
      polygonStart: function() {
        centroidStream.lineStart = centroidRingStart;
        centroidStream.lineEnd = centroidRingEnd;
      },
      polygonEnd: function() {
        centroidStream.point = centroidPoint;
        centroidStream.lineStart = centroidLineStart;
        centroidStream.lineEnd = centroidLineEnd;
      },
      result: function() {
        var centroid = Z2 ? [X2 / Z2, Y2 / Z2]
            : Z1 ? [X1 / Z1, Y1 / Z1]
            : Z0 ? [X0 / Z0, Y0 / Z0]
            : [NaN, NaN];
        X0 = Y0 = Z0 =
        X1 = Y1 = Z1 =
        X2 = Y2 = Z2 = 0;
        return centroid;
      }
    };

    function centroidPoint(x, y) {
      X0 += x;
      Y0 += y;
      ++Z0;
    }

    function centroidLineStart() {
      centroidStream.point = centroidPointFirstLine;
    }

    function centroidPointFirstLine(x, y) {
      centroidStream.point = centroidPointLine;
      centroidPoint(x0$1 = x, y0$1 = y);
    }

    function centroidPointLine(x, y) {
      var dx = x - x0$1, dy = y - y0$1, z = sqrt(dx * dx + dy * dy);
      X1 += z * (x0$1 + x) / 2;
      Y1 += z * (y0$1 + y) / 2;
      Z1 += z;
      centroidPoint(x0$1 = x, y0$1 = y);
    }

    function centroidLineEnd() {
      centroidStream.point = centroidPoint;
    }

    function centroidRingStart() {
      centroidStream.point = centroidPointFirstRing;
    }

    function centroidRingEnd() {
      centroidPointRing(x00$1, y00$1);
    }

    function centroidPointFirstRing(x, y) {
      centroidStream.point = centroidPointRing;
      centroidPoint(x00$1 = x0$1 = x, y00$1 = y0$1 = y);
    }

    function centroidPointRing(x, y) {
      var dx = x - x0$1,
          dy = y - y0$1,
          z = sqrt(dx * dx + dy * dy);

      X1 += z * (x0$1 + x) / 2;
      Y1 += z * (y0$1 + y) / 2;
      Z1 += z;

      z = y0$1 * x - x0$1 * y;
      X2 += z * (x0$1 + x);
      Y2 += z * (y0$1 + y);
      Z2 += z * 3;
      centroidPoint(x0$1 = x, y0$1 = y);
    }

    var pathCentroid = centroidStream;

    function PathContext(context) {
      this._context = context;
    }

    PathContext.prototype = {
      _radius: 4.5,
      pointRadius: function(_) {
        return this._radius = _, this;
      },
      polygonStart: function() {
        this._line = 0;
      },
      polygonEnd: function() {
        this._line = NaN;
      },
      lineStart: function() {
        this._point = 0;
      },
      lineEnd: function() {
        if (this._line === 0) this._context.closePath();
        this._point = NaN;
      },
      point: function(x, y) {
        switch (this._point) {
          case 0: {
            this._context.moveTo(x, y);
            this._point = 1;
            break;
          }
          case 1: {
            this._context.lineTo(x, y);
            break;
          }
          default: {
            this._context.moveTo(x + this._radius, y);
            this._context.arc(x, y, this._radius, 0, tau);
            break;
          }
        }
      },
      result: noop
    };

    var lengthSum = new Adder(),
        lengthRing,
        x00,
        y00,
        x0,
        y0;

    var lengthStream = {
      point: noop,
      lineStart: function() {
        lengthStream.point = lengthPointFirst;
      },
      lineEnd: function() {
        if (lengthRing) lengthPoint(x00, y00);
        lengthStream.point = noop;
      },
      polygonStart: function() {
        lengthRing = true;
      },
      polygonEnd: function() {
        lengthRing = null;
      },
      result: function() {
        var length = +lengthSum;
        lengthSum = new Adder();
        return length;
      }
    };

    function lengthPointFirst(x, y) {
      lengthStream.point = lengthPoint;
      x00 = x0 = x, y00 = y0 = y;
    }

    function lengthPoint(x, y) {
      x0 -= x, y0 -= y;
      lengthSum.add(sqrt(x0 * x0 + y0 * y0));
      x0 = x, y0 = y;
    }

    var pathMeasure = lengthStream;

    function PathString() {
      this._string = [];
    }

    PathString.prototype = {
      _radius: 4.5,
      _circle: circle(4.5),
      pointRadius: function(_) {
        if ((_ = +_) !== this._radius) this._radius = _, this._circle = null;
        return this;
      },
      polygonStart: function() {
        this._line = 0;
      },
      polygonEnd: function() {
        this._line = NaN;
      },
      lineStart: function() {
        this._point = 0;
      },
      lineEnd: function() {
        if (this._line === 0) this._string.push("Z");
        this._point = NaN;
      },
      point: function(x, y) {
        switch (this._point) {
          case 0: {
            this._string.push("M", x, ",", y);
            this._point = 1;
            break;
          }
          case 1: {
            this._string.push("L", x, ",", y);
            break;
          }
          default: {
            if (this._circle == null) this._circle = circle(this._radius);
            this._string.push("M", x, ",", y, this._circle);
            break;
          }
        }
      },
      result: function() {
        if (this._string.length) {
          var result = this._string.join("");
          this._string = [];
          return result;
        } else {
          return null;
        }
      }
    };

    function circle(radius) {
      return "m0," + radius
          + "a" + radius + "," + radius + " 0 1,1 0," + -2 * radius
          + "a" + radius + "," + radius + " 0 1,1 0," + 2 * radius
          + "z";
    }

    function index(projection, context) {
      var pointRadius = 4.5,
          projectionStream,
          contextStream;

      function path(object) {
        if (object) {
          if (typeof pointRadius === "function") contextStream.pointRadius(+pointRadius.apply(this, arguments));
          geoStream(object, projectionStream(contextStream));
        }
        return contextStream.result();
      }

      path.area = function(object) {
        geoStream(object, projectionStream(pathArea));
        return pathArea.result();
      };

      path.measure = function(object) {
        geoStream(object, projectionStream(pathMeasure));
        return pathMeasure.result();
      };

      path.bounds = function(object) {
        geoStream(object, projectionStream(boundsStream$1));
        return boundsStream$1.result();
      };

      path.centroid = function(object) {
        geoStream(object, projectionStream(pathCentroid));
        return pathCentroid.result();
      };

      path.projection = function(_) {
        return arguments.length ? (projectionStream = _ == null ? (projection = null, identity$1) : (projection = _).stream, path) : projection;
      };

      path.context = function(_) {
        if (!arguments.length) return context;
        contextStream = _ == null ? (context = null, new PathString) : new PathContext(context = _);
        if (typeof pointRadius !== "function") contextStream.pointRadius(pointRadius);
        return path;
      };

      path.pointRadius = function(_) {
        if (!arguments.length) return pointRadius;
        pointRadius = typeof _ === "function" ? _ : (contextStream.pointRadius(+_), +_);
        return path;
      };

      return path.projection(projection).context(context);
    }

    function initRange(domain, range) {
      switch (arguments.length) {
        case 0: break;
        case 1: this.range(domain); break;
        default: this.range(range).domain(domain); break;
      }
      return this;
    }

    function constants(x) {
      return function() {
        return x;
      };
    }

    function number(x) {
      return +x;
    }

    var unit = [0, 1];

    function identity(x) {
      return x;
    }

    function normalize(a, b) {
      return (b -= (a = +a))
          ? function(x) { return (x - a) / b; }
          : constants(isNaN(b) ? NaN : 0.5);
    }

    function clamper(a, b) {
      var t;
      if (a > b) t = a, a = b, b = t;
      return function(x) { return Math.max(a, Math.min(b, x)); };
    }

    // normalize(a, b)(x) takes a domain value x in [a,b] and returns the corresponding parameter t in [0,1].
    // interpolate(a, b)(t) takes a parameter t in [0,1] and returns the corresponding range value x in [a,b].
    function bimap(domain, range, interpolate) {
      var d0 = domain[0], d1 = domain[1], r0 = range[0], r1 = range[1];
      if (d1 < d0) d0 = normalize(d1, d0), r0 = interpolate(r1, r0);
      else d0 = normalize(d0, d1), r0 = interpolate(r0, r1);
      return function(x) { return r0(d0(x)); };
    }

    function polymap(domain, range, interpolate) {
      var j = Math.min(domain.length, range.length) - 1,
          d = new Array(j),
          r = new Array(j),
          i = -1;

      // Reverse descending domains.
      if (domain[j] < domain[0]) {
        domain = domain.slice().reverse();
        range = range.slice().reverse();
      }

      while (++i < j) {
        d[i] = normalize(domain[i], domain[i + 1]);
        r[i] = interpolate(range[i], range[i + 1]);
      }

      return function(x) {
        var i = bisect(domain, x, 1, j) - 1;
        return r[i](d[i](x));
      };
    }

    function copy(source, target) {
      return target
          .domain(source.domain())
          .range(source.range())
          .interpolate(source.interpolate())
          .clamp(source.clamp())
          .unknown(source.unknown());
    }

    function transformer() {
      var domain = unit,
          range = unit,
          interpolate = interpolate$1,
          transform,
          untransform,
          unknown,
          clamp = identity,
          piecewise,
          output,
          input;

      function rescale() {
        var n = Math.min(domain.length, range.length);
        if (clamp !== identity) clamp = clamper(domain[0], domain[n - 1]);
        piecewise = n > 2 ? polymap : bimap;
        output = input = null;
        return scale;
      }

      function scale(x) {
        return x == null || isNaN(x = +x) ? unknown : (output || (output = piecewise(domain.map(transform), range, interpolate)))(transform(clamp(x)));
      }

      scale.invert = function(y) {
        return clamp(untransform((input || (input = piecewise(range, domain.map(transform), interpolateNumber)))(y)));
      };

      scale.domain = function(_) {
        return arguments.length ? (domain = Array.from(_, number), rescale()) : domain.slice();
      };

      scale.range = function(_) {
        return arguments.length ? (range = Array.from(_), rescale()) : range.slice();
      };

      scale.rangeRound = function(_) {
        return range = Array.from(_), interpolate = interpolateRound, rescale();
      };

      scale.clamp = function(_) {
        return arguments.length ? (clamp = _ ? true : identity, rescale()) : clamp !== identity;
      };

      scale.interpolate = function(_) {
        return arguments.length ? (interpolate = _, rescale()) : interpolate;
      };

      scale.unknown = function(_) {
        return arguments.length ? (unknown = _, scale) : unknown;
      };

      return function(t, u) {
        transform = t, untransform = u;
        return rescale();
      };
    }

    function continuous() {
      return transformer()(identity, identity);
    }

    function tickFormat(start, stop, count, specifier) {
      var step = tickStep(start, stop, count),
          precision;
      specifier = formatSpecifier(specifier == null ? ",f" : specifier);
      switch (specifier.type) {
        case "s": {
          var value = Math.max(Math.abs(start), Math.abs(stop));
          if (specifier.precision == null && !isNaN(precision = precisionPrefix(step, value))) specifier.precision = precision;
          return formatPrefix(specifier, value);
        }
        case "":
        case "e":
        case "g":
        case "p":
        case "r": {
          if (specifier.precision == null && !isNaN(precision = precisionRound(step, Math.max(Math.abs(start), Math.abs(stop))))) specifier.precision = precision - (specifier.type === "e");
          break;
        }
        case "f":
        case "%": {
          if (specifier.precision == null && !isNaN(precision = precisionFixed(step))) specifier.precision = precision - (specifier.type === "%") * 2;
          break;
        }
      }
      return format(specifier);
    }

    function linearish(scale) {
      var domain = scale.domain;

      scale.ticks = function(count) {
        var d = domain();
        return ticks(d[0], d[d.length - 1], count == null ? 10 : count);
      };

      scale.tickFormat = function(count, specifier) {
        var d = domain();
        return tickFormat(d[0], d[d.length - 1], count == null ? 10 : count, specifier);
      };

      scale.nice = function(count) {
        if (count == null) count = 10;

        var d = domain();
        var i0 = 0;
        var i1 = d.length - 1;
        var start = d[i0];
        var stop = d[i1];
        var prestep;
        var step;
        var maxIter = 10;

        if (stop < start) {
          step = start, start = stop, stop = step;
          step = i0, i0 = i1, i1 = step;
        }
        
        while (maxIter-- > 0) {
          step = tickIncrement(start, stop, count);
          if (step === prestep) {
            d[i0] = start;
            d[i1] = stop;
            return domain(d);
          } else if (step > 0) {
            start = Math.floor(start / step) * step;
            stop = Math.ceil(stop / step) * step;
          } else if (step < 0) {
            start = Math.ceil(start * step) / step;
            stop = Math.floor(stop * step) / step;
          } else {
            break;
          }
          prestep = step;
        }

        return scale;
      };

      return scale;
    }

    function linear() {
      var scale = continuous();

      scale.copy = function() {
        return copy(scale, linear());
      };

      initRange.apply(scale, arguments);

      return linearish(scale);
    }

    //we need to update this to blur better
    async function contourMapBlur(data) {
      console.log(data);
      let bbox = select('.img-holder').node().getBoundingClientRect();
      let width = bbox.width;
      let height = 0.705 * width;

      let svg = select('#contour-overlay')
        .attr('viewBox', [0, 0, width, height])
        .attr('preserveAspectRatio', 'xMinYMin meet');
      let margin = 30;

      let xPos = linear()
        .domain([0, 100])
        .range([margin, width - margin]);
      let yPos = linear()
        .domain([0, 100])
        .range([margin, height - margin]);

      let contours = density()
        .x((d) => xPos(d.xPct))
        .y((d) => yPos(d.yPct))
        .size([width, height])
        .bandwidth(25)
        .thresholds(20)(data);

      let minCoords = min(contours, (d) => d.value);
      let maxCoords = max(contours, (d) => d.value);

      let blurScale = linear()
        .domain([maxCoords, maxCoords * 0.75, , maxCoords / 2, minCoords])
        .range([0, 1, 2, 5]);
      let fillScale = linear()
        .domain([minCoords, maxCoords])
        .range(['#504d4d', '#67d0f1']);

      //, function (d) {
      // return d.coordinates[0].length;

      svg
        .selectAll('.clipPathGroup')
        .data(contours, (d) => d.coordinates[0])
        .join('g')
        .attr('class', 'clipPathGroup');

      svg
        .selectAll('.clipPathGroup')
        .append('clipPath')
        .attr('id', (d, i) => 'path-' + i)
        .append('path')
        .attr('stroke-linejoin', 'round')
        .attr('fill', (d) => fillScale(d.value))
        .attr('d', index());

      svg
        .selectAll('.clipPathGroup')
        // .data(contours)
        .append('image')
        .attr('clip-path', (d, i) => `url(#path-${i})`)
        .attr('width', '100%')
        .attr('height', '100%')
        .attr('xlink:href', './assets/img/mehretuCropped.png')
        .style('filter', (d) => `blur(${blurScale(d.value)}px`);
    }

    /* src\components\GalleryCard.svelte generated by Svelte v3.44.0 */

    const { Object: Object_1$1 } = globals;
    const file$b = "src\\components\\GalleryCard.svelte";

    function get_each_context$3(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[16] = list[i];
    	return child_ctx;
    }

    // (83:12) {#each sessionsArray as session}
    function create_each_block$3(ctx) {
    	let option;
    	let t_value = /*sessions*/ ctx[6][/*session*/ ctx[16]].name + "";
    	let t;

    	const block = {
    		c: function create() {
    			option = element("option");
    			t = text(t_value);
    			option.__value = /*session*/ ctx[16];
    			option.value = option.__value;
    			add_location(option, file$b, 83, 14, 2310);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, option, anchor);
    			append_dev(option, t);
    		},
    		p: noop$3,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(option);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$3.name,
    		type: "each",
    		source: "(83:12) {#each sessionsArray as session}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$b(ctx) {
    	let div7;
    	let h2;
    	let t0_value = /*data*/ ctx[0].artist + "";
    	let t0;
    	let t1;
    	let i;
    	let t2_value = /*data*/ ctx[0].title + "";
    	let t2;
    	let t3;
    	let div5;
    	let div4;
    	let div0;
    	let span0;
    	let t5;
    	let span1;
    	let t7;
    	let div3;
    	let div1;
    	let span2;
    	let t9;
    	let span3;
    	let t11;
    	let select;
    	let t12;
    	let div2;
    	let t14;
    	let div6;
    	let svg;
    	let mounted;
    	let dispose;
    	let each_value = /*sessionsArray*/ ctx[7];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$3(get_each_context$3(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			div7 = element("div");
    			h2 = element("h2");
    			t0 = text(t0_value);
    			t1 = text(", ");
    			i = element("i");
    			t2 = text(t2_value);
    			t3 = space();
    			div5 = element("div");
    			div4 = element("div");
    			div0 = element("div");
    			span0 = element("span");
    			span0.textContent = "people";
    			t5 = space();
    			span1 = element("span");
    			span1.textContent = "Viewer";
    			t7 = space();
    			div3 = element("div");
    			div1 = element("div");
    			span2 = element("span");
    			span2.textContent = "chevron_left";
    			t9 = space();
    			span3 = element("span");
    			span3.textContent = "chevron_right";
    			t11 = space();
    			select = element("select");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t12 = space();
    			div2 = element("div");
    			div2.textContent = "Add Gaze";
    			t14 = space();
    			div6 = element("div");
    			svg = svg_element("svg");
    			attr_dev(i, "class", "svelte-18dckwh");
    			add_location(i, file$b, 58, 21, 1377);
    			attr_dev(h2, "class", "svelte-18dckwh");
    			add_location(h2, file$b, 58, 2, 1358);
    			attr_dev(span0, "class", "material-icons-round md-14 svelte-18dckwh");
    			add_location(span0, file$b, 62, 8, 1501);
    			add_location(span1, file$b, 63, 8, 1565);
    			attr_dev(div0, "class", "label svelte-18dckwh");
    			add_location(div0, file$b, 61, 6, 1472);
    			attr_dev(span2, "class", "material-icons-round md-18 nav clickable svelte-18dckwh");
    			toggle_class(span2, "disabled", /*currSessionIndex*/ ctx[1] == 0);
    			add_location(span2, file$b, 67, 10, 1685);
    			attr_dev(span3, "class", "material-icons-round md-18 nav clickable svelte-18dckwh");
    			toggle_class(span3, "disabled", /*currSessionIndex*/ ctx[1] == /*sessionsArray*/ ctx[7].length - 1);
    			add_location(span3, file$b, 74, 10, 1928);
    			attr_dev(select, "class", "clickable svelte-18dckwh");
    			if (/*currSessionKey*/ ctx[2] === void 0) add_render_callback(() => /*select_change_handler*/ ctx[11].call(select));
    			add_location(select, file$b, 81, 10, 2194);
    			attr_dev(div1, "class", "filter selected svelte-18dckwh");
    			add_location(div1, file$b, 66, 8, 1644);
    			attr_dev(div2, "class", "filter clickable svelte-18dckwh");
    			add_location(div2, file$b, 91, 8, 2618);
    			attr_dev(div3, "class", "filter-options svelte-18dckwh");
    			add_location(div3, file$b, 65, 6, 1606);
    			attr_dev(div4, "class", "viewer-filter svelte-18dckwh");
    			add_location(div4, file$b, 60, 4, 1437);
    			attr_dev(div5, "class", "card-filters");
    			add_location(div5, file$b, 59, 2, 1405);
    			attr_dev(svg, "style", /*styleSubstring*/ ctx[5]);
    			attr_dev(svg, "id", "contour-overlay");
    			attr_dev(svg, "class", "svelte-18dckwh");
    			add_location(svg, file$b, 96, 4, 2769);
    			attr_dev(div6, "class", "img-holder svelte-18dckwh");
    			set_style(div6, "width", /*width*/ ctx[3]);
    			set_style(div6, "height", /*ht*/ ctx[4]);
    			add_location(div6, file$b, 95, 2, 2702);
    			attr_dev(div7, "class", "card-outer svelte-18dckwh");
    			add_location(div7, file$b, 57, 0, 1330);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div7, anchor);
    			append_dev(div7, h2);
    			append_dev(h2, t0);
    			append_dev(h2, t1);
    			append_dev(h2, i);
    			append_dev(i, t2);
    			append_dev(div7, t3);
    			append_dev(div7, div5);
    			append_dev(div5, div4);
    			append_dev(div4, div0);
    			append_dev(div0, span0);
    			append_dev(div0, t5);
    			append_dev(div0, span1);
    			append_dev(div4, t7);
    			append_dev(div4, div3);
    			append_dev(div3, div1);
    			append_dev(div1, span2);
    			append_dev(div1, t9);
    			append_dev(div1, span3);
    			append_dev(div1, t11);
    			append_dev(div1, select);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(select, null);
    			}

    			select_option(select, /*currSessionKey*/ ctx[2]);
    			append_dev(div3, t12);
    			append_dev(div3, div2);
    			append_dev(div7, t14);
    			append_dev(div7, div6);
    			append_dev(div6, svg);

    			if (!mounted) {
    				dispose = [
    					listen_dev(span2, "click", /*click_handler*/ ctx[9], false, false, false),
    					listen_dev(span3, "click", /*click_handler_1*/ ctx[10], false, false, false),
    					listen_dev(select, "change", /*select_change_handler*/ ctx[11])
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*data*/ 1 && t0_value !== (t0_value = /*data*/ ctx[0].artist + "")) set_data_dev(t0, t0_value);
    			if (dirty & /*data*/ 1 && t2_value !== (t2_value = /*data*/ ctx[0].title + "")) set_data_dev(t2, t2_value);

    			if (dirty & /*currSessionIndex*/ 2) {
    				toggle_class(span2, "disabled", /*currSessionIndex*/ ctx[1] == 0);
    			}

    			if (dirty & /*currSessionIndex, sessionsArray*/ 130) {
    				toggle_class(span3, "disabled", /*currSessionIndex*/ ctx[1] == /*sessionsArray*/ ctx[7].length - 1);
    			}

    			if (dirty & /*sessionsArray, sessions*/ 192) {
    				each_value = /*sessionsArray*/ ctx[7];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$3(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block$3(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(select, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}

    			if (dirty & /*currSessionKey, sessionsArray*/ 132) {
    				select_option(select, /*currSessionKey*/ ctx[2]);
    			}

    			if (dirty & /*styleSubstring*/ 32) {
    				attr_dev(svg, "style", /*styleSubstring*/ ctx[5]);
    			}

    			if (dirty & /*width*/ 8) {
    				set_style(div6, "width", /*width*/ ctx[3]);
    			}

    			if (dirty & /*ht*/ 16) {
    				set_style(div6, "height", /*ht*/ ctx[4]);
    			}
    		},
    		i: noop$3,
    		o: noop$3,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div7);
    			destroy_each(each_blocks, detaching);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$b.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$b($$self, $$props, $$invalidate) {
    	let $screenHeight;
    	validate_store(screenHeight, 'screenHeight');
    	component_subscribe($$self, screenHeight, $$value => $$invalidate(12, $screenHeight = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('GalleryCard', slots, []);
    	let { data } = $$props;
    	let maxW = 1000, maxH = $screenHeight * 0.85 - 200;

    	onMount(() => {
    		
    	}); //get this bounding client rect
    	//console.log(document.querySelector('.card-outer').getBoundingClientRect());

    	let width = 'auto', ht = 'auto', styleSubstring = '';

    	if (data.dimsWidthToHt > 1) {
    		ht = maxH + 'px';
    		styleSubstring = 'height: 100%';
    	} else {
    		width = maxW + 'px';
    		styleSubstring = 'width: 100%';
    	}

    	let sessions = data.sessionData;
    	let sessionsArray = Object.keys(sessions);
    	let currSessionIndex = 0;
    	let currSessionKey;

    	function navigateKeys(chg) {
    		$$invalidate(1, currSessionIndex = currSessionIndex + chg);
    	}

    	function patternDrilldown() {
    		selectedImage.set(data);
    		pageState.set('patterns');
    	}

    	const writable_props = ['data'];

    	Object_1$1.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<GalleryCard> was created with unknown prop '${key}'`);
    	});

    	const click_handler = () => {
    		navigateKeys(-1);
    	};

    	const click_handler_1 = () => {
    		navigateKeys(1);
    	};

    	function select_change_handler() {
    		currSessionKey = select_value(this);
    		(($$invalidate(2, currSessionKey), $$invalidate(7, sessionsArray)), $$invalidate(1, currSessionIndex));
    		$$invalidate(7, sessionsArray);
    	}

    	$$self.$$set = $$props => {
    		if ('data' in $$props) $$invalidate(0, data = $$props.data);
    	};

    	$$self.$capture_state = () => ({
    		pageState,
    		selectedImage,
    		screenWidth,
    		screenHeight,
    		dbGet,
    		onMount,
    		contourMapBlur,
    		data,
    		maxW,
    		maxH,
    		width,
    		ht,
    		styleSubstring,
    		sessions,
    		sessionsArray,
    		currSessionIndex,
    		currSessionKey,
    		navigateKeys,
    		patternDrilldown,
    		$screenHeight
    	});

    	$$self.$inject_state = $$props => {
    		if ('data' in $$props) $$invalidate(0, data = $$props.data);
    		if ('maxW' in $$props) maxW = $$props.maxW;
    		if ('maxH' in $$props) maxH = $$props.maxH;
    		if ('width' in $$props) $$invalidate(3, width = $$props.width);
    		if ('ht' in $$props) $$invalidate(4, ht = $$props.ht);
    		if ('styleSubstring' in $$props) $$invalidate(5, styleSubstring = $$props.styleSubstring);
    		if ('sessions' in $$props) $$invalidate(6, sessions = $$props.sessions);
    		if ('sessionsArray' in $$props) $$invalidate(7, sessionsArray = $$props.sessionsArray);
    		if ('currSessionIndex' in $$props) $$invalidate(1, currSessionIndex = $$props.currSessionIndex);
    		if ('currSessionKey' in $$props) $$invalidate(2, currSessionKey = $$props.currSessionKey);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*currSessionIndex*/ 2) {
    			{
    				$$invalidate(2, currSessionKey = sessionsArray[currSessionIndex]);
    			}
    		}

    		if ($$self.$$.dirty & /*currSessionKey*/ 4) {
    			(async () => {
    				let sessionData = await dbGet('sessionData/' + currSessionKey);

    				if (sessionData) {
    					contourMapBlur(sessionData);
    				}
    			})();
    		}
    	};

    	return [
    		data,
    		currSessionIndex,
    		currSessionKey,
    		width,
    		ht,
    		styleSubstring,
    		sessions,
    		sessionsArray,
    		navigateKeys,
    		click_handler,
    		click_handler_1,
    		select_change_handler
    	];
    }

    class GalleryCard extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init$1(this, options, instance$b, create_fragment$b, safe_not_equal, { data: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "GalleryCard",
    			options,
    			id: create_fragment$b.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*data*/ ctx[0] === undefined && !('data' in props)) {
    			console.warn("<GalleryCard> was created without expected prop 'data'");
    		}
    	}

    	get data() {
    		throw new Error("<GalleryCard>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set data(value) {
    		throw new Error("<GalleryCard>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\pages\Gallery.svelte generated by Svelte v3.44.0 */

    const { Object: Object_1, console: console_1$2 } = globals;
    const file$a = "src\\pages\\Gallery.svelte";

    function get_each_context$2(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[2] = list[i];
    	return child_ctx;
    }

    // (27:2) {#each works as img}
    function create_each_block$2(ctx) {
    	let gallerycard;
    	let current;

    	gallerycard = new GalleryCard({
    			props: { data: /*img*/ ctx[2] },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(gallerycard.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(gallerycard, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const gallerycard_changes = {};
    			if (dirty & /*works*/ 1) gallerycard_changes.data = /*img*/ ctx[2];
    			gallerycard.$set(gallerycard_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(gallerycard.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(gallerycard.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(gallerycard, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$2.name,
    		type: "each",
    		source: "(27:2) {#each works as img}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$a(ctx) {
    	let div;
    	let current;
    	let each_value = /*works*/ ctx[0];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$2(get_each_context$2(ctx, each_value, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	const block = {
    		c: function create() {
    			div = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr_dev(div, "class", "card-holder svelte-q1jwsq");
    			add_location(div, file$a, 25, 0, 598);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*works*/ 1) {
    				each_value = /*works*/ ctx[0];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$2(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block$2(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(div, null);
    					}
    				}

    				group_outros();

    				for (i = each_value.length; i < each_blocks.length; i += 1) {
    					out(i);
    				}

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;

    			for (let i = 0; i < each_value.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			each_blocks = each_blocks.filter(Boolean);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_each(each_blocks, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$a.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$a($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Gallery', slots, []);
    	let works = [];

    	async function getAllWorks() {
    		$$invalidate(0, works = Object.values(await dbGet('works')));
    		console.log(works);
    	}

    	getAllWorks();
    	const writable_props = [];

    	Object_1.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console_1$2.warn(`<Gallery> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ GalleryCard, dbGet, works, getAllWorks });

    	$$self.$inject_state = $$props => {
    		if ('works' in $$props) $$invalidate(0, works = $$props.works);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [works];
    }

    class Gallery extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init$1(this, options, instance$a, create_fragment$a, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Gallery",
    			options,
    			id: create_fragment$a.name
    		});
    	}
    }

    /* src\components\Header.svelte generated by Svelte v3.44.0 */

    const { console: console_1$1 } = globals;
    const file$9 = "src\\components\\Header.svelte";

    function create_fragment$9(ctx) {
    	let header;
    	let div2;
    	let div0;
    	let t1;
    	let div1;

    	const block = {
    		c: function create() {
    			header = element("header");
    			div2 = element("div");
    			div0 = element("div");
    			div0.textContent = "How We Gaze";
    			t1 = space();
    			div1 = element("div");
    			attr_dev(div0, "class", "header-left svelte-126kjse");
    			add_location(div0, file$9, 7, 4, 149);
    			attr_dev(div1, "class", "header-right svelte-126kjse");
    			add_location(div1, file$9, 8, 4, 197);
    			attr_dev(div2, "class", "header-content svelte-126kjse");
    			add_location(div2, file$9, 6, 2, 115);
    			attr_dev(header, "class", "svelte-126kjse");
    			add_location(header, file$9, 5, 0, 103);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, header, anchor);
    			append_dev(header, div2);
    			append_dev(div2, div0);
    			append_dev(div2, t1);
    			append_dev(div2, div1);
    		},
    		p: noop$3,
    		i: noop$3,
    		o: noop$3,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(header);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$9.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$9($$self, $$props, $$invalidate) {
    	let $pageState;
    	validate_store(pageState, 'pageState');
    	component_subscribe($$self, pageState, $$value => $$invalidate(0, $pageState = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Header', slots, []);
    	console.log($pageState);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console_1$1.warn(`<Header> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ pageState, $pageState });
    	return [];
    }

    class Header extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init$1(this, options, instance$9, create_fragment$9, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Header",
    			options,
    			id: create_fragment$9.name
    		});
    	}
    }

    /* src\pages\Patterns.svelte generated by Svelte v3.44.0 */
    const file$8 = "src\\pages\\Patterns.svelte";

    function create_fragment$8(ctx) {
    	let h1;
    	let t1;
    	let p;
    	let t2;
    	let t3_value = /*$selectedImage*/ ctx[0].artist + "'s" + "";
    	let t3;
    	let t4;
    	let t5_value = /*$selectedImage*/ ctx[0].label + "";
    	let t5;
    	let t6;
    	let t7;
    	let section;
    	let div1;
    	let div0;
    	let span;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			h1 = element("h1");
    			h1.textContent = "Viewing Patterns";
    			t1 = space();
    			p = element("p");
    			t2 = text("Below: a series of visualizations summarizing how participants viewed ");
    			t3 = text(t3_value);
    			t4 = space();
    			t5 = text(t5_value);
    			t6 = text(". Click on a tile to see a detailed analysis or\r\n  visualize your own viewing session!");
    			t7 = space();
    			section = element("section");
    			div1 = element("div");
    			div0 = element("div");
    			span = element("span");
    			span.textContent = "View & Visualize";
    			add_location(h1, file$8, 4, 0, 90);
    			attr_dev(p, "class", "font-lg");
    			add_location(p, file$8, 5, 0, 117);
    			add_location(span, file$8, 15, 6, 507);
    			attr_dev(div0, "class", "card");
    			add_location(div0, file$8, 14, 4, 481);
    			attr_dev(div1, "class", "card-outer clickable");
    			add_location(div1, file$8, 13, 2, 400);
    			attr_dev(section, "class", "card-holder");
    			add_location(section, file$8, 12, 0, 367);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, h1, anchor);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, p, anchor);
    			append_dev(p, t2);
    			append_dev(p, t3);
    			append_dev(p, t4);
    			append_dev(p, t5);
    			append_dev(p, t6);
    			insert_dev(target, t7, anchor);
    			insert_dev(target, section, anchor);
    			append_dev(section, div1);
    			append_dev(div1, div0);
    			append_dev(div0, span);

    			if (!mounted) {
    				dispose = listen_dev(div1, "click", /*click_handler*/ ctx[1], false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*$selectedImage*/ 1 && t3_value !== (t3_value = /*$selectedImage*/ ctx[0].artist + "'s" + "")) set_data_dev(t3, t3_value);
    			if (dirty & /*$selectedImage*/ 1 && t5_value !== (t5_value = /*$selectedImage*/ ctx[0].label + "")) set_data_dev(t5, t5_value);
    		},
    		i: noop$3,
    		o: noop$3,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(h1);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(p);
    			if (detaching) detach_dev(t7);
    			if (detaching) detach_dev(section);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$8.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$8($$self, $$props, $$invalidate) {
    	let $selectedImage;
    	validate_store(selectedImage, 'selectedImage');
    	component_subscribe($$self, selectedImage, $$value => $$invalidate(0, $selectedImage = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Patterns', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Patterns> was created with unknown prop '${key}'`);
    	});

    	const click_handler = () => pageState.set('record');
    	$$self.$capture_state = () => ({ pageState, selectedImage, $selectedImage });
    	return [$selectedImage, click_handler];
    }

    class Patterns extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init$1(this, options, instance$8, create_fragment$8, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Patterns",
    			options,
    			id: create_fragment$8.name
    		});
    	}
    }

    function cubicOut(t) {
        const f = t - 1.0;
        return f * f * f + 1.0;
    }

    function fade(node, { delay = 0, duration = 400, easing = identity$4 } = {}) {
        const o = +getComputedStyle(node).opacity;
        return {
            delay,
            duration,
            easing,
            css: t => `opacity: ${t * o}`
        };
    }
    function slide(node, { delay = 0, duration = 400, easing = cubicOut } = {}) {
        const style = getComputedStyle(node);
        const opacity = +style.opacity;
        const height = parseFloat(style.height);
        const padding_top = parseFloat(style.paddingTop);
        const padding_bottom = parseFloat(style.paddingBottom);
        const margin_top = parseFloat(style.marginTop);
        const margin_bottom = parseFloat(style.marginBottom);
        const border_top_width = parseFloat(style.borderTopWidth);
        const border_bottom_width = parseFloat(style.borderBottomWidth);
        return {
            delay,
            duration,
            easing,
            css: t => 'overflow: hidden;' +
                `opacity: ${Math.min(t * 20, 1) * opacity};` +
                `height: ${t * height}px;` +
                `padding-top: ${t * padding_top}px;` +
                `padding-bottom: ${t * padding_bottom}px;` +
                `margin-top: ${t * margin_top}px;` +
                `margin-bottom: ${t * margin_bottom}px;` +
                `border-top-width: ${t * border_top_width}px;` +
                `border-bottom-width: ${t * border_bottom_width}px;`
        };
    }

    /* src\components\RecordOverview.svelte generated by Svelte v3.44.0 */
    const file$7 = "src\\components\\RecordOverview.svelte";

    function create_fragment$7(ctx) {
    	let h3;
    	let t1;
    	let p0;
    	let t3;
    	let p1;
    	let strong;
    	let t5;
    	let t6;
    	let p2;

    	const block = {
    		c: function create() {
    			h3 = element("h3");
    			h3.textContent = "Overview";
    			t1 = space();
    			p0 = element("p");
    			p0.textContent = "In order to generate a visualization of your viewing session, we’ll ask you to\r\n  study a piece of artwork for 15 seconds with your webcam turned on.";
    			t3 = space();
    			p1 = element("p");
    			strong = element("strong");
    			strong.textContent = "No personal information will be recorded.";
    			t5 = text(" The only information\r\n  that will be recorded is a series of points corresponding to your eye movement.\r\n  Please enable webcam permission to proceed!");
    			t6 = space();
    			p2 = element("p");
    			p2.textContent = "This should take about 5 minutes total.";
    			add_location(h3, file$7, 4, 0, 75);
    			add_location(p0, file$7, 5, 0, 94);
    			add_location(strong, file$7, 10, 2, 265);
    			add_location(p1, file$7, 9, 0, 258);
    			add_location(p2, file$7, 14, 0, 482);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, h3, anchor);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, p0, anchor);
    			insert_dev(target, t3, anchor);
    			insert_dev(target, p1, anchor);
    			append_dev(p1, strong);
    			append_dev(p1, t5);
    			insert_dev(target, t6, anchor);
    			insert_dev(target, p2, anchor);
    		},
    		p: noop$3,
    		i: noop$3,
    		o: noop$3,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(h3);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(p0);
    			if (detaching) detach_dev(t3);
    			if (detaching) detach_dev(p1);
    			if (detaching) detach_dev(t6);
    			if (detaching) detach_dev(p2);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$7.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$7($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('RecordOverview', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<RecordOverview> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ slide, fade });
    	return [];
    }

    class RecordOverview extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init$1(this, options, instance$7, create_fragment$7, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "RecordOverview",
    			options,
    			id: create_fragment$7.name
    		});
    	}
    }

    function gazerMoveVideo(pos) {
      let vidContainer = document.querySelector('#webgazerVideoContainer');
      let vidSize = 320;
      if (pos == 'top') {
        vidSize = 110;
        webgazer.setVideoViewerSize(vidSize, vidSize);
        vidContainer.style.top = '0%';
        vidContainer.style.left = '90%';
        vidContainer.style.width = `${vidSize}px`;
        vidContainer.style.height = 'auto';
      } else if (pos == 'middle') {
        webgazer.setVideoViewerSize(vidSize, vidSize);
        vidContainer.style.width = `${vidSize}px`;
        vidContainer.style.height = 'auto';
        vidContainer.style.position = 'absolute';
        vidContainer.style.left = '50%';
        vidContainer.style.top = '30%';
        vidContainer.style.transform = 'translate(-50%, -50%)';
      }
    }

    async function gazerInitVideo() {
      await webgazer.resume();
      gazerPauseTraining();
      gazerInitVideoDone.set(true);
    }

    function gazerInitialize() {
      webgazer.showVideo(false);
      webgazer.begin();
      gazerLoadCheck();
    }

    async function gazerArtRecording() {
      let bbox = document.querySelector('#artView').getBoundingClientRect();
      webgazer.setGazeListener(function (data, elapsedTime) {
        if (data == null) {
          return;
        }
        let recordingObj = {
          time: elapsedTime,
          x: data.x - bbox.x,
          y: data.y - bbox.y,
          xPct: (100 * (data.x - bbox.x)) / bbox.width,
          yPct: (100 * (data.y - bbox.y)) / bbox.height,
          xMin: bbox.left,
          xMax: bbox.right,
          yMin: bbox.top,
          yMax: bbox.bottom,
          sessionID: get_store_value(sessionID),
        };

        let gazerArray = get_store_value(gazerRecordingArt); //this is prob not good
        gazerArray.push(recordingObj);
        gazerRecordingArt.set(gazerArray);
      });
      setTimeout(() => {
        webgazer.clearGazeListener();
        console.log(get_store_value(gazerRecordingArt));
        stateIndex.set(get_store_value(stateIndex) + 1);
      }, 4000);
    }

    function gazerCalibrationRecording() {
      webgazer.setGazeListener(function (data, elapsedTime) {
        if (data == null) {
          return;
        }
        let gazerArray = get_store_value(gazerRecordingTraining);
        gazerArray.push({ x: data.x, y: data.y });
        gazerRecordingTraining.set(gazerArray);
      });
      setTimeout(() => {
        webgazer.clearGazeListener();
        calculateAccuracy();
      }, 4000);
    }

    function calculateAccuracy() {
      let centerPt = document.querySelector('.center-dot').getBoundingClientRect();
      //.x, .y, /width, ht
      let sum = 0;
      let gazerPts = get_store_value(gazerRecordingTraining);
      gazerPts.map((d) => {
        let xDiff = d.x - centerPt.x + centerPt.width / 2;
        let yDiff = d.y - centerPt.y + centerPt.height / 2;
        let diff = Math.sqrt(yDiff * yDiff + xDiff * xDiff);
        sum += diff;
        return diff;
      });
      let meanDiff = sum / gazerPts.length;
      let pct =
        100 *
        (1 -
          meanDiff /
            (document.querySelector('.container-body').getBoundingClientRect()
              .width /
              2));
      console.log(pct);
      calibrationPct.set(Math.round(pct));
      return;
    }

    function gazerRestartCalibration() {
      console.log('uh restarting i guess');
      //webgazer.clearData();
      calibrationPct.set(null);
    }

    async function gazerTrain() {
      webgazer.addMouseEventListeners();
    }

    function gazerPauseTraining() {
      webgazer.removeMouseEventListeners();
    }

    async function gazerLoadCheck() {
      if (!webgazer.isReady()) {
        await setTimeout(gazerLoadCheck, 100);
      } else {
        console.log('gazer fully loaded');
        webgazer.pause();
        webgazer.setVideoViewerSize(300, 300);
        let vidContainer = document.querySelector('#webgazerVideoContainer');
        document.querySelector('.container-body').append(vidContainer);

        setTimeout(() => {
          loadingInd.set(false);
        }, 1500);
      }
    }

    /* src\components\RecordCalibrateVid.svelte generated by Svelte v3.44.0 */
    const file$6 = "src\\components\\RecordCalibrateVid.svelte";

    // (20:0) {#if !$gazerInitVideoDone}
    function create_if_block$3(ctx) {
    	let div;
    	let p;

    	const block = {
    		c: function create() {
    			div = element("div");
    			p = element("p");
    			p.textContent = "Initializing Video Stream...";
    			add_location(p, file$6, 21, 4, 569);
    			attr_dev(div, "class", "video-wrapper svelte-n1d24a");
    			add_location(div, file$6, 20, 2, 536);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, p);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$3.name,
    		type: "if",
    		source: "(20:0) {#if !$gazerInitVideoDone}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$6(ctx) {
    	let h3;
    	let t1;
    	let p;
    	let t3;
    	let if_block_anchor;
    	let if_block = !/*$gazerInitVideoDone*/ ctx[0] && create_if_block$3(ctx);

    	const block = {
    		c: function create() {
    			h3 = element("h3");
    			h3.textContent = "Calibrate: Video";
    			t1 = space();
    			p = element("p");
    			p.textContent = "We’ll need to first calibrate your webcam in order to proceed. Ensure that\r\n  your are in a well-lit environment, and that your face is in the green section\r\n  of the screen below.";
    			t3 = space();
    			if (if_block) if_block.c();
    			if_block_anchor = empty$1();
    			add_location(h3, file$6, 12, 0, 269);
    			attr_dev(p, "class", "inst svelte-n1d24a");
    			add_location(p, file$6, 13, 0, 296);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, h3, anchor);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, p, anchor);
    			insert_dev(target, t3, anchor);
    			if (if_block) if_block.m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    		},
    		p: function update(ctx, [dirty]) {
    			if (!/*$gazerInitVideoDone*/ ctx[0]) {
    				if (if_block) ; else {
    					if_block = create_if_block$3(ctx);
    					if_block.c();
    					if_block.m(if_block_anchor.parentNode, if_block_anchor);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}
    		},
    		i: noop$3,
    		o: noop$3,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(h3);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(p);
    			if (detaching) detach_dev(t3);
    			if (if_block) if_block.d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$6.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$6($$self, $$props, $$invalidate) {
    	let $gazerInitVideoDone;
    	validate_store(gazerInitVideoDone, 'gazerInitVideoDone');
    	component_subscribe($$self, gazerInitVideoDone, $$value => $$invalidate(0, $gazerInitVideoDone = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('RecordCalibrateVid', slots, []);

    	onMount(() => {
    		setTimeout(
    			() => {
    				gazerInitVideo();
    			},
    			100
    		);
    	});

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<RecordCalibrateVid> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		gazerInitVideo,
    		onMount,
    		gazerInitVideoDone,
    		$gazerInitVideoDone
    	});

    	return [$gazerInitVideoDone];
    }

    class RecordCalibrateVid extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init$1(this, options, instance$6, create_fragment$6, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "RecordCalibrateVid",
    			options,
    			id: create_fragment$6.name
    		});
    	}
    }

    /* src\components\RecordCalibrateExercise.svelte generated by Svelte v3.44.0 */

    const file$5 = "src\\components\\RecordCalibrateExercise.svelte";

    function get_each_context$1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[8] = list[i];
    	return child_ctx;
    }

    // (89:36) 
    function create_if_block_2$2(ctx) {
    	let if_block_anchor;

    	function select_block_type_1(ctx, dirty) {
    		if (/*$calibrationPct*/ ctx[1] > 70) return create_if_block_3$1;
    		return create_else_block$1;
    	}

    	let current_block_type = select_block_type_1(ctx);
    	let if_block = current_block_type(ctx);

    	const block = {
    		c: function create() {
    			if_block.c();
    			if_block_anchor = empty$1();
    		},
    		m: function mount(target, anchor) {
    			if_block.m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (current_block_type === (current_block_type = select_block_type_1(ctx)) && if_block) {
    				if_block.p(ctx, dirty);
    			} else {
    				if_block.d(1);
    				if_block = current_block_type(ctx);

    				if (if_block) {
    					if_block.c();
    					if_block.m(if_block_anchor.parentNode, if_block_anchor);
    				}
    			}
    		},
    		d: function destroy(detaching) {
    			if_block.d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_2$2.name,
    		type: "if",
    		source: "(89:36) ",
    		ctx
    	});

    	return block;
    }

    // (73:37) 
    function create_if_block_1$2(ctx) {
    	let p;
    	let t1;
    	let div0;
    	let t3;
    	let div1;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			p = element("p");
    			p.textContent = "Great work! Now stare at the dot at the center of the screen for 5 seconds\r\n    so we can calculate your accuracy rate!";
    			t1 = space();
    			div0 = element("div");
    			div0.textContent = "Start staring!";
    			t3 = space();
    			div1 = element("div");
    			attr_dev(p, "class", "svelte-1ttilq9");
    			add_location(p, file$5, 73, 2, 2030);
    			attr_dev(div0, "class", "clickable btn btn-stare accent svelte-1ttilq9");
    			toggle_class(div0, "disabled", /*initStare*/ ctx[2]);
    			add_location(div0, file$5, 77, 2, 2170);
    			attr_dev(div1, "class", "center-dot svelte-1ttilq9");
    			add_location(div1, file$5, 87, 2, 2381);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p, anchor);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, div0, anchor);
    			insert_dev(target, t3, anchor);
    			insert_dev(target, div1, anchor);

    			if (!mounted) {
    				dispose = listen_dev(div0, "click", /*click_handler*/ ctx[5], false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*initStare*/ 4) {
    				toggle_class(div0, "disabled", /*initStare*/ ctx[2]);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(div0);
    			if (detaching) detach_dev(t3);
    			if (detaching) detach_dev(div1);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1$2.name,
    		type: "if",
    		source: "(73:37) ",
    		ctx
    	});

    	return block;
    }

    // (64:0) {#if calibrationMode == 'dots'}
    function create_if_block$2(ctx) {
    	let each_1_anchor;
    	let each_value = /*calibrationPoints*/ ctx[3];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$1(get_each_context$1(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			each_1_anchor = empty$1();
    		},
    		m: function mount(target, anchor) {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(target, anchor);
    			}

    			insert_dev(target, each_1_anchor, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*calibrationPoints, calibrateClick*/ 24) {
    				each_value = /*calibrationPoints*/ ctx[3];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$1(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block$1(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}
    		},
    		d: function destroy(detaching) {
    			destroy_each(each_blocks, detaching);
    			if (detaching) detach_dev(each_1_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$2.name,
    		type: "if",
    		source: "(64:0) {#if calibrationMode == 'dots'}",
    		ctx
    	});

    	return block;
    }

    // (105:2) {:else}
    function create_else_block$1(ctx) {
    	let p0;
    	let t0;
    	let strong;
    	let t1;
    	let t2;
    	let t3;
    	let t4;
    	let p1;

    	const block = {
    		c: function create() {
    			p0 = element("p");
    			t0 = text("Your calculated accuracy is ");
    			strong = element("strong");
    			t1 = text(/*$calibrationPct*/ ctx[1]);
    			t2 = text("%");
    			t3 = text(".");
    			t4 = space();
    			p1 = element("p");
    			p1.textContent = ":( Unfortunately we require an accuracy rate of 75% or higher to proceed";
    			add_location(strong, file$5, 106, 34, 3168);
    			set_style(p0, "color", "var(--color-neg)");
    			attr_dev(p0, "class", "svelte-1ttilq9");
    			add_location(p0, file$5, 105, 4, 3097);
    			attr_dev(p1, "class", "svelte-1ttilq9");
    			add_location(p1, file$5, 108, 4, 3220);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p0, anchor);
    			append_dev(p0, t0);
    			append_dev(p0, strong);
    			append_dev(strong, t1);
    			append_dev(strong, t2);
    			append_dev(p0, t3);
    			insert_dev(target, t4, anchor);
    			insert_dev(target, p1, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*$calibrationPct*/ 2) set_data_dev(t1, /*$calibrationPct*/ ctx[1]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p0);
    			if (detaching) detach_dev(t4);
    			if (detaching) detach_dev(p1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block$1.name,
    		type: "else",
    		source: "(105:2) {:else}",
    		ctx
    	});

    	return block;
    }

    // (90:2) {#if $calibrationPct > 70}
    function create_if_block_3$1(ctx) {
    	let p0;
    	let t0;
    	let strong;
    	let t1;
    	let t2;
    	let t3;
    	let t4;
    	let p1;
    	let t5;
    	let t6_value = 100 - /*$calibrationPct*/ ctx[1] + "";
    	let t6;
    	let t7;
    	let t8;
    	let p2;

    	const block = {
    		c: function create() {
    			p0 = element("p");
    			t0 = text("Your calculated accuracy is ");
    			strong = element("strong");
    			t1 = text(/*$calibrationPct*/ ctx[1]);
    			t2 = text("%");
    			t3 = text("!");
    			t4 = space();
    			p1 = element("p");
    			t5 = text("This means that the eye tracker can detect your eye movements with a\r\n      margin of error of ");
    			t6 = text(t6_value);
    			t7 = text("% of the size of the container\r\n      that holds this text.");
    			t8 = space();
    			p2 = element("p");
    			p2.textContent = "Not perfect, but good enough to deduce patterns in how you look at art!\r\n      Lastly, please look at the selected piece of artwork (full-screen) for 20\r\n      seconds, and we’ll generate a custom visual summarizing how you viewed the\r\n      painting.";
    			add_location(strong, file$5, 91, 34, 2552);
    			set_style(p0, "color", "var(--color-pos)");
    			attr_dev(p0, "class", "svelte-1ttilq9");
    			add_location(p0, file$5, 90, 4, 2481);
    			attr_dev(p1, "class", "svelte-1ttilq9");
    			add_location(p1, file$5, 93, 4, 2604);
    			attr_dev(p2, "class", "svelte-1ttilq9");
    			add_location(p2, file$5, 98, 4, 2808);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p0, anchor);
    			append_dev(p0, t0);
    			append_dev(p0, strong);
    			append_dev(strong, t1);
    			append_dev(strong, t2);
    			append_dev(p0, t3);
    			insert_dev(target, t4, anchor);
    			insert_dev(target, p1, anchor);
    			append_dev(p1, t5);
    			append_dev(p1, t6);
    			append_dev(p1, t7);
    			insert_dev(target, t8, anchor);
    			insert_dev(target, p2, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*$calibrationPct*/ 2) set_data_dev(t1, /*$calibrationPct*/ ctx[1]);
    			if (dirty & /*$calibrationPct*/ 2 && t6_value !== (t6_value = 100 - /*$calibrationPct*/ ctx[1] + "")) set_data_dev(t6, t6_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p0);
    			if (detaching) detach_dev(t4);
    			if (detaching) detach_dev(p1);
    			if (detaching) detach_dev(t8);
    			if (detaching) detach_dev(p2);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_3$1.name,
    		type: "if",
    		source: "(90:2) {#if $calibrationPct > 70}",
    		ctx
    	});

    	return block;
    }

    // (65:2) {#each calibrationPoints as pt}
    function create_each_block$1(ctx) {
    	let div;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			div = element("div");
    			attr_dev(div, "class", "calibration-pt svelte-1ttilq9");
    			set_style(div, "top", /*pt*/ ctx[8].top);
    			set_style(div, "right", /*pt*/ ctx[8].right);
    			attr_dev(div, "numclicks", "0");
    			add_location(div, file$5, 65, 4, 1834);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);

    			if (!mounted) {
    				dispose = listen_dev(div, "click", /*calibrateClick*/ ctx[4], false, false, false);
    				mounted = true;
    			}
    		},
    		p: noop$3,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$1.name,
    		type: "each",
    		source: "(65:2) {#each calibrationPoints as pt}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$5(ctx) {
    	let h3;
    	let t1;
    	let if_block_anchor;

    	function select_block_type(ctx, dirty) {
    		if (/*calibrationMode*/ ctx[0] == 'dots') return create_if_block$2;
    		if (/*calibrationMode*/ ctx[0] == 'stare') return create_if_block_1$2;
    		if (/*calibrationMode*/ ctx[0] == 'done') return create_if_block_2$2;
    	}

    	let current_block_type = select_block_type(ctx);
    	let if_block = current_block_type && current_block_type(ctx);

    	const block = {
    		c: function create() {
    			h3 = element("h3");
    			h3.textContent = "Calibrate: Exercise";
    			t1 = space();
    			if (if_block) if_block.c();
    			if_block_anchor = empty$1();
    			add_location(h3, file$5, 61, 0, 1730);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, h3, anchor);
    			insert_dev(target, t1, anchor);
    			if (if_block) if_block.m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    		},
    		p: function update(ctx, [dirty]) {
    			if (current_block_type === (current_block_type = select_block_type(ctx)) && if_block) {
    				if_block.p(ctx, dirty);
    			} else {
    				if (if_block) if_block.d(1);
    				if_block = current_block_type && current_block_type(ctx);

    				if (if_block) {
    					if_block.c();
    					if_block.m(if_block_anchor.parentNode, if_block_anchor);
    				}
    			}
    		},
    		i: noop$3,
    		o: noop$3,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(h3);
    			if (detaching) detach_dev(t1);

    			if (if_block) {
    				if_block.d(detaching);
    			}

    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$5.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$5($$self, $$props, $$invalidate) {
    	let $calibrationPct;
    	validate_store(calibrationPct, 'calibrationPct');
    	component_subscribe($$self, calibrationPct, $$value => $$invalidate(1, $calibrationPct = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('RecordCalibrateExercise', slots, []);
    	let calibrationMode = 'dots';
    	gazerTrain();

    	let calibrationPoints = [{ top: '4%', right: '4%', numClicks: 0 }]; // { top: '50%', right: '4%', numClicks: 0 },
    	// { top: '96%', right: '4%', numClicks: 0 },
    	// { top: '4%', right: 'calc(100% - 400px)', numClicks: 0 },

    	// { top: '50%', right: '96%', numClicks: 0 },
    	// { top: '96%', right: '96%', numClicks: 0 },
    	// { top: '4%', right: '50%', numClicks: 0 },
    	// { top: '96%', right: '50%', numClicks: 0 },
    	// { top: '50%', right: '50%', numClicks: 0 },
    	let maxClicks = 4;

    	function calibrateClick(e) {
    		let numClicks = parseInt(this.getAttribute('numclicks')) + 1;
    		this.setAttribute('numclicks', numClicks);
    		this.style.opacity = 1 - numClicks * (1 / maxClicks);

    		if (numClicks == maxClicks) {
    			if (checkDotsClicked()) {
    				$$invalidate(0, calibrationMode = 'stare');
    			}
    		}
    	}

    	function checkDotsClicked() {
    		let pts = document.querySelectorAll('.calibration-pt');
    		let fullyClicked = true;

    		pts.forEach(d => {
    			if (parseInt(d.getAttribute('numclicks')) < maxClicks) {
    				fullyClicked = false;
    			}
    		});

    		return fullyClicked;
    	}

    	let initStare;
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<RecordCalibrateExercise> was created with unknown prop '${key}'`);
    	});

    	const click_handler = () => {
    		$$invalidate(2, initStare = true);
    		gazerCalibrationRecording();
    	};

    	$$self.$capture_state = () => ({
    		gazerRecordingTraining,
    		calibrationPct,
    		gazerPauseTraining,
    		gazerCalibrationRecording,
    		gazerTrain,
    		calibrationMode,
    		calibrationPoints,
    		maxClicks,
    		calibrateClick,
    		checkDotsClicked,
    		initStare,
    		$calibrationPct
    	});

    	$$self.$inject_state = $$props => {
    		if ('calibrationMode' in $$props) $$invalidate(0, calibrationMode = $$props.calibrationMode);
    		if ('calibrationPoints' in $$props) $$invalidate(3, calibrationPoints = $$props.calibrationPoints);
    		if ('maxClicks' in $$props) maxClicks = $$props.maxClicks;
    		if ('initStare' in $$props) $$invalidate(2, initStare = $$props.initStare);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*calibrationMode, $calibrationPct*/ 3) {
    			{
    				if (calibrationMode == 'stare') {
    					gazerPauseTraining();
    				}

    				if ($calibrationPct) {
    					$$invalidate(0, calibrationMode = 'done');
    				}
    			}
    		}
    	};

    	return [
    		calibrationMode,
    		$calibrationPct,
    		initStare,
    		calibrationPoints,
    		calibrateClick,
    		click_handler
    	];
    }

    class RecordCalibrateExercise extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init$1(this, options, instance$5, create_fragment$5, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "RecordCalibrateExercise",
    			options,
    			id: create_fragment$5.name
    		});
    	}
    }

    /* src\components\RecordCalibrateInstructions.svelte generated by Svelte v3.44.0 */
    const file$4 = "src\\components\\RecordCalibrateInstructions.svelte";

    function create_fragment$4(ctx) {
    	let h3;
    	let t1;
    	let p0;
    	let t3;
    	let div2;
    	let div0;
    	let p1;
    	let t5;
    	let img0;
    	let img0_src_value;
    	let t6;
    	let div1;
    	let p2;
    	let t8;
    	let img1;
    	let img1_src_value;

    	const block = {
    		c: function create() {
    			h3 = element("h3");
    			h3.textContent = "Calibrate: Instructions";
    			t1 = space();
    			p0 = element("p");
    			p0.textContent = "Great! Your face calibration will be displayed on the right for reference.\r\n  Next, we’ll calibrate your eye tracking movement on the screen. Remember these\r\n  two rules!";
    			t3 = space();
    			div2 = element("div");
    			div0 = element("div");
    			p1 = element("p");
    			p1.textContent = "Eyes on cursor at all times";
    			t5 = space();
    			img0 = element("img");
    			t6 = space();
    			div1 = element("div");
    			p2 = element("p");
    			p2.textContent = "Move cursor to each red dot, and click on dot until it disappears";
    			t8 = space();
    			img1 = element("img");
    			add_location(h3, file$4, 4, 0, 75);
    			attr_dev(p0, "class", "instr svelte-1t38vns");
    			add_location(p0, file$4, 5, 0, 109);
    			attr_dev(p1, "class", "svelte-1t38vns");
    			add_location(p1, file$4, 13, 4, 346);
    			if (!src_url_equal(img0.src, img0_src_value = "./assets/img/explain-eye.svg")) attr_dev(img0, "src", img0_src_value);
    			attr_dev(img0, "class", "svelte-1t38vns");
    			add_location(img0, file$4, 14, 4, 386);
    			attr_dev(div0, "class", "svelte-1t38vns");
    			add_location(div0, file$4, 12, 2, 335);
    			attr_dev(p2, "class", "svelte-1t38vns");
    			add_location(p2, file$4, 17, 4, 453);
    			if (!src_url_equal(img1.src, img1_src_value = "./assets/img/explain-cursor.svg")) attr_dev(img1, "src", img1_src_value);
    			attr_dev(img1, "class", "svelte-1t38vns");
    			add_location(img1, file$4, 18, 4, 531);
    			attr_dev(div1, "class", "svelte-1t38vns");
    			add_location(div1, file$4, 16, 2, 442);
    			attr_dev(div2, "class", "explain svelte-1t38vns");
    			add_location(div2, file$4, 11, 0, 310);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, h3, anchor);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, p0, anchor);
    			insert_dev(target, t3, anchor);
    			insert_dev(target, div2, anchor);
    			append_dev(div2, div0);
    			append_dev(div0, p1);
    			append_dev(div0, t5);
    			append_dev(div0, img0);
    			append_dev(div2, t6);
    			append_dev(div2, div1);
    			append_dev(div1, p2);
    			append_dev(div1, t8);
    			append_dev(div1, img1);
    		},
    		p: noop$3,
    		i: noop$3,
    		o: noop$3,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(h3);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(p0);
    			if (detaching) detach_dev(t3);
    			if (detaching) detach_dev(div2);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$4.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$4($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('RecordCalibrateInstructions', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<RecordCalibrateInstructions> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ slide, fade });
    	return [];
    }

    class RecordCalibrateInstructions extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init$1(this, options, instance$4, create_fragment$4, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "RecordCalibrateInstructions",
    			options,
    			id: create_fragment$4.name
    		});
    	}
    }

    let artworkData = {
      mehretuUntitled: {
        artist: 'Julie Mehretu',
        title: 'Untitled',
        url: './assets/img/mehretuCropped.png',
        sessionData: {},
      },
    };

    let artworkMetadata = writable(artworkData);

    /* src\components\RecordCalibrateResults.svelte generated by Svelte v3.44.0 */

    const { console: console_1 } = globals;

    const file$3 = "src\\components\\RecordCalibrateResults.svelte";

    function create_fragment$3(ctx) {
    	let h3;
    	let t1;
    	let p;
    	let t3;
    	let div1;
    	let input;
    	let t4;
    	let div0;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			h3 = element("h3");
    			h3.textContent = "Calibrate: Results";
    			t1 = space();
    			p = element("p");
    			p.textContent = "Great work! We’re generating your custom visualization (it will take up to 30\r\n  seconds). In the meantime, enter the name with which you’d like associate your\r\n  visualization in the gallery!";
    			t3 = space();
    			div1 = element("div");
    			input = element("input");
    			t4 = space();
    			div0 = element("div");
    			div0.textContent = "Save";
    			add_location(h3, file$3, 73, 0, 1889);
    			add_location(p, file$3, 74, 0, 1918);
    			attr_dev(input, "placeholder", "Enter name here");
    			attr_dev(input, "class", "svelte-bwlty8");
    			add_location(input, file$3, 80, 2, 2156);
    			attr_dev(div0, "class", "btn accent clickable svelte-bwlty8");
    			toggle_class(div0, "disabled-part", /*nameInputted*/ ctx[0] == true);
    			add_location(div0, file$3, 91, 2, 2380);
    			attr_dev(div1, "class", "input-wrapper svelte-bwlty8");
    			add_location(div1, file$3, 79, 0, 2125);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, h3, anchor);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, p, anchor);
    			insert_dev(target, t3, anchor);
    			insert_dev(target, div1, anchor);
    			append_dev(div1, input);
    			set_input_value(input, /*userName*/ ctx[1]);
    			append_dev(div1, t4);
    			append_dev(div1, div0);

    			if (!mounted) {
    				dispose = [
    					listen_dev(input, "input", /*input_input_handler*/ ctx[3]),
    					listen_dev(input, "keyup", /*keyup_handler*/ ctx[4], false, false, false),
    					listen_dev(div0, "click", /*updateUserName*/ ctx[2], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*userName*/ 2 && input.value !== /*userName*/ ctx[1]) {
    				set_input_value(input, /*userName*/ ctx[1]);
    			}

    			if (dirty & /*nameInputted*/ 1) {
    				toggle_class(div0, "disabled-part", /*nameInputted*/ ctx[0] == true);
    			}
    		},
    		i: noop$3,
    		o: noop$3,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(h3);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(p);
    			if (detaching) detach_dev(t3);
    			if (detaching) detach_dev(div1);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$3.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$3($$self, $$props, $$invalidate) {
    	let $loadingInd;
    	let $artworkID;
    	let $artworkMetadata;
    	let $gazerRecordingArt;
    	let $sessionID;
    	validate_store(loadingInd, 'loadingInd');
    	component_subscribe($$self, loadingInd, $$value => $$invalidate(5, $loadingInd = $$value));
    	validate_store(artworkID, 'artworkID');
    	component_subscribe($$self, artworkID, $$value => $$invalidate(6, $artworkID = $$value));
    	validate_store(artworkMetadata, 'artworkMetadata');
    	component_subscribe($$self, artworkMetadata, $$value => $$invalidate(7, $artworkMetadata = $$value));
    	validate_store(gazerRecordingArt, 'gazerRecordingArt');
    	component_subscribe($$self, gazerRecordingArt, $$value => $$invalidate(8, $gazerRecordingArt = $$value));
    	validate_store(sessionID, 'sessionID');
    	component_subscribe($$self, sessionID, $$value => $$invalidate(9, $sessionID = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('RecordCalibrateResults', slots, []);
    	let sessionId = $sessionID;
    	let sessionData = $gazerRecordingArt;
    	let artworkId = $artworkID, artworkData = $artworkMetadata[$artworkID];

    	//name input ind
    	let nameInputted = false;

    	let userName;

    	async function writeSessionToArtwork() {
    		let res = await dbGet('works/' + artworkId);
    		console.log(res);

    		if (!res) {
    			await dbWrite('works/' + artworkId, artworkData);
    		}

    		return await dbWrite('works/' + artworkId + '/sessionData/' + sessionId, { name: 'none' });
    	}

    	async function storeSessionData() {
    		await dbWrite('sessionData/' + sessionId, sessionData);
    		return await dbWrite('sessionData/' + sessionId, sessionData);
    	}

    	async function updateUserName() {
    		$$invalidate(0, nameInputted = true);
    		return await dbWrite('works/' + artworkId + '/sessionData/' + sessionId + '/name', userName);
    	}

    	async function writeAllData() {
    		storeSessionData();
    		writeSessionToArtwork();
    		let vis = generateContour();
    		let svgBlob = await new Blob([vis], { type: 'image/svg+xml;charset=utf-8' });
    		await uploadBlob('svgContours/' + artworkId + '/contours/' + sessionId + '.svg', svgBlob);
    		console.log('made it ma');
    		loadingInd.set(false);
    		console.log($loadingInd);
    	}

    	writeAllData();
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console_1.warn(`<RecordCalibrateResults> was created with unknown prop '${key}'`);
    	});

    	function input_input_handler() {
    		userName = this.value;
    		$$invalidate(1, userName);
    	}

    	const keyup_handler = e => {
    		if (e.keyCode === 13) {
    			updateUserName();
    		} else {
    			$$invalidate(0, nameInputted = false);
    		}
    	};

    	$$self.$capture_state = () => ({
    		artworkMetadata,
    		gazerRecordingArt,
    		artworkID,
    		sessionID,
    		loadingInd,
    		dbGet,
    		dbWrite,
    		postTest,
    		appendData,
    		uploadBlob,
    		sessionId,
    		sessionData,
    		artworkId,
    		artworkData,
    		nameInputted,
    		userName,
    		writeSessionToArtwork,
    		storeSessionData,
    		updateUserName,
    		writeAllData,
    		$loadingInd,
    		$artworkID,
    		$artworkMetadata,
    		$gazerRecordingArt,
    		$sessionID
    	});

    	$$self.$inject_state = $$props => {
    		if ('sessionId' in $$props) sessionId = $$props.sessionId;
    		if ('sessionData' in $$props) sessionData = $$props.sessionData;
    		if ('artworkId' in $$props) artworkId = $$props.artworkId;
    		if ('artworkData' in $$props) artworkData = $$props.artworkData;
    		if ('nameInputted' in $$props) $$invalidate(0, nameInputted = $$props.nameInputted);
    		if ('userName' in $$props) $$invalidate(1, userName = $$props.userName);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [nameInputted, userName, updateUserName, input_input_handler, keyup_handler];
    }

    class RecordCalibrateResults extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init$1(this, options, instance$3, create_fragment$3, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "RecordCalibrateResults",
    			options,
    			id: create_fragment$3.name
    		});
    	}
    }

    /* src\components\RecordView.svelte generated by Svelte v3.44.0 */
    const file$2 = "src\\components\\RecordView.svelte";

    function create_fragment$2(ctx) {
    	let div1;
    	let div0;
    	let img;
    	let img_src_value;
    	let t0;
    	let p;

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			div0 = element("div");
    			img = element("img");
    			t0 = space();
    			p = element("p");
    			p.textContent = "Please look at the following image for 20 seconds";
    			attr_dev(img, "id", "artView");
    			if (!src_url_equal(img.src, img_src_value = "./assets/img/mehretuCropped.png")) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "class", "svelte-pcr7ku");
    			toggle_class(img, "inactive", /*imageInactive*/ ctx[0] == true);
    			add_location(img, file$2, 15, 4, 386);
    			attr_dev(p, "class", "svelte-pcr7ku");
    			toggle_class(p, "inactive", /*imageInactive*/ ctx[0] == false);
    			add_location(p, file$2, 20, 4, 515);
    			attr_dev(div0, "class", "img-holder svelte-pcr7ku");
    			add_location(div0, file$2, 14, 2, 356);
    			attr_dev(div1, "class", "wrapper-full svelte-pcr7ku");
    			add_location(div1, file$2, 13, 0, 326);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, div0);
    			append_dev(div0, img);
    			append_dev(div0, t0);
    			append_dev(div0, p);
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*imageInactive*/ 1) {
    				toggle_class(img, "inactive", /*imageInactive*/ ctx[0] == true);
    			}

    			if (dirty & /*imageInactive*/ 1) {
    				toggle_class(p, "inactive", /*imageInactive*/ ctx[0] == false);
    			}
    		},
    		i: noop$3,
    		o: noop$3,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$2.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$2($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('RecordView', slots, []);
    	let imageInactive = true;

    	setTimeout(
    		() => {
    			$$invalidate(0, imageInactive = false);
    			gazerArtRecording();
    		},
    		3000
    	);

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<RecordView> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ gazerArtRecording, imageInactive });

    	$$self.$inject_state = $$props => {
    		if ('imageInactive' in $$props) $$invalidate(0, imageInactive = $$props.imageInactive);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [imageInactive];
    }

    class RecordView extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init$1(this, options, instance$2, create_fragment$2, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "RecordView",
    			options,
    			id: create_fragment$2.name
    		});
    	}
    }

    /* src\pages\Record.svelte generated by Svelte v3.44.0 */
    const file$1 = "src\\pages\\Record.svelte";

    function get_each_context(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[16] = list[i];
    	return child_ctx;
    }

    // (161:6) {#each sections as section}
    function create_each_block(ctx) {
    	let div;

    	const block = {
    		c: function create() {
    			div = element("div");
    			attr_dev(div, "class", "nav-dot svelte-97qozu");
    			toggle_class(div, "active", /*sections*/ ctx[6][/*$stateIndex*/ ctx[2]] === /*section*/ ctx[16]);
    			add_location(div, file$1, 161, 8, 4021);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*sections, $stateIndex*/ 68) {
    				toggle_class(div, "active", /*sections*/ ctx[6][/*$stateIndex*/ ctx[2]] === /*section*/ ctx[16]);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block.name,
    		type: "each",
    		source: "(161:6) {#each sections as section}",
    		ctx
    	});

    	return block;
    }

    // (177:61) 
    function create_if_block_6(ctx) {
    	let calibrateresults;
    	let current;
    	calibrateresults = new RecordCalibrateResults({ $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(calibrateresults.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(calibrateresults, target, anchor);
    			current = true;
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(calibrateresults.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(calibrateresults.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(calibrateresults, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_6.name,
    		type: "if",
    		source: "(177:61) ",
    		ctx
    	});

    	return block;
    }

    // (175:58) 
    function create_if_block_5(ctx) {
    	let calibrateview;
    	let current;
    	calibrateview = new RecordView({ $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(calibrateview.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(calibrateview, target, anchor);
    			current = true;
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(calibrateview.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(calibrateview.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(calibrateview, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_5.name,
    		type: "if",
    		source: "(175:58) ",
    		ctx
    	});

    	return block;
    }

    // (173:72) 
    function create_if_block_4(ctx) {
    	let calibrateexercise;
    	let current;
    	calibrateexercise = new RecordCalibrateExercise({ $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(calibrateexercise.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(calibrateexercise, target, anchor);
    			current = true;
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(calibrateexercise.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(calibrateexercise.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(calibrateexercise, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_4.name,
    		type: "if",
    		source: "(173:72) ",
    		ctx
    	});

    	return block;
    }

    // (171:76) 
    function create_if_block_3(ctx) {
    	let calibrateinstructions;
    	let current;
    	calibrateinstructions = new RecordCalibrateInstructions({ $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(calibrateinstructions.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(calibrateinstructions, target, anchor);
    			current = true;
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(calibrateinstructions.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(calibrateinstructions.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(calibrateinstructions, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_3.name,
    		type: "if",
    		source: "(171:76) ",
    		ctx
    	});

    	return block;
    }

    // (169:67) 
    function create_if_block_2$1(ctx) {
    	let calibratevid;
    	let current;
    	calibratevid = new RecordCalibrateVid({ $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(calibratevid.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(calibratevid, target, anchor);
    			current = true;
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(calibratevid.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(calibratevid.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(calibratevid, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_2$1.name,
    		type: "if",
    		source: "(169:67) ",
    		ctx
    	});

    	return block;
    }

    // (167:4) {#if sections[$stateIndex].sectionName == 'overview'}
    function create_if_block_1$1(ctx) {
    	let overview;
    	let current;
    	overview = new RecordOverview({ $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(overview.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(overview, target, anchor);
    			current = true;
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(overview.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(overview.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(overview, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1$1.name,
    		type: "if",
    		source: "(167:4) {#if sections[$stateIndex].sectionName == 'overview'}",
    		ctx
    	});

    	return block;
    }

    // (198:6) {:else}
    function create_else_block(ctx) {
    	let t_value = /*sections*/ ctx[6][/*$stateIndex*/ ctx[2]].btnLabel + "";
    	let t;

    	const block = {
    		c: function create() {
    			t = text(t_value);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*$stateIndex*/ 4 && t_value !== (t_value = /*sections*/ ctx[6][/*$stateIndex*/ ctx[2]].btnLabel + "")) set_data_dev(t, t_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block.name,
    		type: "else",
    		source: "(198:6) {:else}",
    		ctx
    	});

    	return block;
    }

    // (196:6) {#if $loadingInd}
    function create_if_block$1(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("Loading...");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		p: noop$3,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$1.name,
    		type: "if",
    		source: "(196:6) {#if $loadingInd}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$1(ctx) {
    	let script;
    	let script_src_value;
    	let t0;
    	let section;
    	let div2;
    	let div0;
    	let t1;
    	let div1;
    	let t2;
    	let div3;
    	let current_block_type_index;
    	let if_block0;
    	let t3;
    	let div6;
    	let div4;
    	let t4_value = /*sections*/ ctx[6][/*$stateIndex*/ ctx[2]].btnBackLabel + "";
    	let t4;
    	let t5;
    	let div5;
    	let current;
    	let mounted;
    	let dispose;
    	let each_value = /*sections*/ ctx[6];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
    	}

    	const if_block_creators = [
    		create_if_block_1$1,
    		create_if_block_2$1,
    		create_if_block_3,
    		create_if_block_4,
    		create_if_block_5,
    		create_if_block_6
    	];

    	const if_blocks = [];

    	function select_block_type(ctx, dirty) {
    		if (/*sections*/ ctx[6][/*$stateIndex*/ ctx[2]].sectionName == 'overview') return 0;
    		if (/*sections*/ ctx[6][/*$stateIndex*/ ctx[2]].sectionName == 'calibrate-vid') return 1;
    		if (/*sections*/ ctx[6][/*$stateIndex*/ ctx[2]].sectionName == 'calibrate-instructions') return 2;
    		if (/*sections*/ ctx[6][/*$stateIndex*/ ctx[2]].sectionName == 'calibrate-exercise') return 3;
    		if (/*sections*/ ctx[6][/*$stateIndex*/ ctx[2]].sectionName == 'view') return 4;
    		if (/*sections*/ ctx[6][/*$stateIndex*/ ctx[2]].sectionName == 'results') return 5;
    		return -1;
    	}

    	if (~(current_block_type_index = select_block_type(ctx))) {
    		if_block0 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    	}

    	function select_block_type_1(ctx, dirty) {
    		if (/*$loadingInd*/ ctx[5]) return create_if_block$1;
    		return create_else_block;
    	}

    	let current_block_type = select_block_type_1(ctx);
    	let if_block1 = current_block_type(ctx);

    	const block = {
    		c: function create() {
    			script = element("script");
    			t0 = space();
    			section = element("section");
    			div2 = element("div");
    			div0 = element("div");
    			t1 = space();
    			div1 = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t2 = space();
    			div3 = element("div");
    			if (if_block0) if_block0.c();
    			t3 = space();
    			div6 = element("div");
    			div4 = element("div");
    			t4 = text(t4_value);
    			t5 = space();
    			div5 = element("div");
    			if_block1.c();
    			if (!src_url_equal(script.src, script_src_value = "./assets/webgazer.min.js")) attr_dev(script, "src", script_src_value);
    			add_location(script, file$1, 149, 2, 3626);
    			attr_dev(div0, "class", "current-selection");
    			add_location(div0, file$1, 156, 4, 3815);
    			attr_dev(div1, "class", "nav-ind svelte-97qozu");
    			add_location(div1, file$1, 159, 4, 3955);
    			attr_dev(div2, "class", "container-header svelte-97qozu");
    			add_location(div2, file$1, 155, 2, 3779);
    			attr_dev(div3, "class", "container-body svelte-97qozu");
    			add_location(div3, file$1, 165, 2, 4134);
    			attr_dev(div4, "class", "btn-prev btn disabled svelte-97qozu");
    			toggle_class(div4, "accent", /*$calibrationPct*/ ctx[1] && /*$calibrationPct*/ ctx[1] < 70);
    			toggle_class(div4, "disabled", /*disableBack*/ ctx[3] == true);
    			add_location(div4, file$1, 181, 4, 4785);
    			attr_dev(div5, "class", "btn-next btn accent clickable svelte-97qozu");
    			toggle_class(div5, "disabled", /*disableNext*/ ctx[4] == true);
    			toggle_class(div5, "glow", /*$loadingInd*/ ctx[5] == true);
    			add_location(div5, file$1, 189, 4, 5029);
    			attr_dev(div6, "class", "container-footer svelte-97qozu");
    			add_location(div6, file$1, 180, 2, 4749);
    			attr_dev(section, "class", "experiment-container svelte-97qozu");
    			add_location(section, file$1, 154, 0, 3737);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			append_dev(document.head, script);
    			insert_dev(target, t0, anchor);
    			insert_dev(target, section, anchor);
    			append_dev(section, div2);
    			append_dev(div2, div0);
    			append_dev(div2, t1);
    			append_dev(div2, div1);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div1, null);
    			}

    			append_dev(section, t2);
    			append_dev(section, div3);

    			if (~current_block_type_index) {
    				if_blocks[current_block_type_index].m(div3, null);
    			}

    			append_dev(section, t3);
    			append_dev(section, div6);
    			append_dev(div6, div4);
    			append_dev(div4, t4);
    			append_dev(div6, t5);
    			append_dev(div6, div5);
    			if_block1.m(div5, null);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(script, "load", /*load_handler*/ ctx[11], false, false, false),
    					listen_dev(div4, "click", /*backClick*/ ctx[7], false, false, false),
    					listen_dev(div5, "click", /*click_handler*/ ctx[12], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*sections, $stateIndex*/ 68) {
    				each_value = /*sections*/ ctx[6];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(div1, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}

    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type(ctx);

    			if (current_block_type_index !== previous_block_index) {
    				if (if_block0) {
    					group_outros();

    					transition_out(if_blocks[previous_block_index], 1, 1, () => {
    						if_blocks[previous_block_index] = null;
    					});

    					check_outros();
    				}

    				if (~current_block_type_index) {
    					if_block0 = if_blocks[current_block_type_index];

    					if (!if_block0) {
    						if_block0 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    						if_block0.c();
    					}

    					transition_in(if_block0, 1);
    					if_block0.m(div3, null);
    				} else {
    					if_block0 = null;
    				}
    			}

    			if ((!current || dirty & /*$stateIndex*/ 4) && t4_value !== (t4_value = /*sections*/ ctx[6][/*$stateIndex*/ ctx[2]].btnBackLabel + "")) set_data_dev(t4, t4_value);

    			if (dirty & /*$calibrationPct*/ 2) {
    				toggle_class(div4, "accent", /*$calibrationPct*/ ctx[1] && /*$calibrationPct*/ ctx[1] < 70);
    			}

    			if (dirty & /*disableBack*/ 8) {
    				toggle_class(div4, "disabled", /*disableBack*/ ctx[3] == true);
    			}

    			if (current_block_type === (current_block_type = select_block_type_1(ctx)) && if_block1) {
    				if_block1.p(ctx, dirty);
    			} else {
    				if_block1.d(1);
    				if_block1 = current_block_type(ctx);

    				if (if_block1) {
    					if_block1.c();
    					if_block1.m(div5, null);
    				}
    			}

    			if (dirty & /*disableNext*/ 16) {
    				toggle_class(div5, "disabled", /*disableNext*/ ctx[4] == true);
    			}

    			if (dirty & /*$loadingInd*/ 32) {
    				toggle_class(div5, "glow", /*$loadingInd*/ ctx[5] == true);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block0);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block0);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			detach_dev(script);
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(section);
    			destroy_each(each_blocks, detaching);

    			if (~current_block_type_index) {
    				if_blocks[current_block_type_index].d();
    			}

    			if_block1.d();
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$1.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$1($$self, $$props, $$invalidate) {
    	let $calibrationCutoff;
    	let $calibrationPct;
    	let $gazerInitVideoDone;
    	let $stateIndex;
    	let $sessionID;
    	let $loadingInd;
    	validate_store(calibrationCutoff, 'calibrationCutoff');
    	component_subscribe($$self, calibrationCutoff, $$value => $$invalidate(9, $calibrationCutoff = $$value));
    	validate_store(calibrationPct, 'calibrationPct');
    	component_subscribe($$self, calibrationPct, $$value => $$invalidate(1, $calibrationPct = $$value));
    	validate_store(gazerInitVideoDone, 'gazerInitVideoDone');
    	component_subscribe($$self, gazerInitVideoDone, $$value => $$invalidate(10, $gazerInitVideoDone = $$value));
    	validate_store(stateIndex, 'stateIndex');
    	component_subscribe($$self, stateIndex, $$value => $$invalidate(2, $stateIndex = $$value));
    	validate_store(sessionID, 'sessionID');
    	component_subscribe($$self, sessionID, $$value => $$invalidate(13, $sessionID = $$value));
    	validate_store(loadingInd, 'loadingInd');
    	component_subscribe($$self, loadingInd, $$value => $$invalidate(5, $loadingInd = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Record', slots, []);
    	let gazerReady, mount; //webgazer library loaded
    	let disableBack = false, disableNext = false;

    	let sections = [
    		{
    			sectionName: 'overview',
    			videoShown: false,
    			btnLabel: 'Start!',
    			disableBack: true,
    			showLoader: true
    		},
    		{
    			sectionName: 'calibrate-vid',
    			videoShown: true,
    			videoPos: 'middle',
    			disableBack: false,
    			disableNext: true,
    			btnBackLabel: 'Back to Overview',
    			btnLabel: 'Got It - Face is Aligned'
    		},
    		{
    			sectionName: 'calibrate-instructions',
    			videoShown: true,
    			videoPos: 'top',
    			btnBackLabel: 'Back to Video Alignment',
    			btnLabel: 'Got It - Proceed'
    		},
    		{
    			sectionName: 'calibrate-exercise',
    			videoShown: true,
    			videoPos: 'top',
    			disableNext: true,
    			btnBackLabel: 'Restart Eye Calibration',
    			btnLabel: 'Proceed to View Art',
    			gazerRecording: true
    		},
    		{
    			sectionName: 'view',
    			videoShown: false,
    			btnLabel: 'Proceed',
    			disableNext: true,
    			btnBackLabel: 'Back to Calibration',
    			showLoader: true
    		},
    		{
    			sectionName: 'results',
    			videoShown: false,
    			btnLabel: 'View Pattern',
    			btnBackLabel: 'Back to Calibration',
    			showLoader: true
    		}
    	];

    	afterUpdate(() => {
    		$$invalidate(8, mount = true);

    		if (!$sessionID) {
    			sessionID.set(new Date().getTime());
    		}
    	});

    	function backClick() {
    		if (sections[$stateIndex] == 'calibrate-exercise') {
    			gazerRestartCalibration();
    		}

    		set_store_value(stateIndex, $stateIndex--, $stateIndex);
    	}

    	//anytime page substate changes
    	let gazeActive, gazeRecording;

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Record> was created with unknown prop '${key}'`);
    	});

    	const load_handler = () => {
    		$$invalidate(0, gazerReady = true);
    	};

    	const click_handler = () => set_store_value(stateIndex, $stateIndex++, $stateIndex);

    	$$self.$capture_state = () => ({
    		pageState,
    		selectedImage,
    		gazerInitVideoDone,
    		calibrationPct,
    		calibrationCutoff,
    		stateIndex,
    		loadingInd,
    		sessionID,
    		slide,
    		fade,
    		Overview: RecordOverview,
    		CalibrateVid: RecordCalibrateVid,
    		CalibrateExercise: RecordCalibrateExercise,
    		CalibrateInstructions: RecordCalibrateInstructions,
    		CalibrateResults: RecordCalibrateResults,
    		CalibrateView: RecordView,
    		afterUpdate,
    		gazerInitialize,
    		gazerMoveVideo,
    		gazerInitVideo,
    		gazerRestartCalibration,
    		time_ranges_to_array,
    		gazerReady,
    		mount,
    		disableBack,
    		disableNext,
    		sections,
    		backClick,
    		gazeActive,
    		gazeRecording,
    		$calibrationCutoff,
    		$calibrationPct,
    		$gazerInitVideoDone,
    		$stateIndex,
    		$sessionID,
    		$loadingInd
    	});

    	$$self.$inject_state = $$props => {
    		if ('gazerReady' in $$props) $$invalidate(0, gazerReady = $$props.gazerReady);
    		if ('mount' in $$props) $$invalidate(8, mount = $$props.mount);
    		if ('disableBack' in $$props) $$invalidate(3, disableBack = $$props.disableBack);
    		if ('disableNext' in $$props) $$invalidate(4, disableNext = $$props.disableNext);
    		if ('sections' in $$props) $$invalidate(6, sections = $$props.sections);
    		if ('gazeActive' in $$props) gazeActive = $$props.gazeActive;
    		if ('gazeRecording' in $$props) gazeRecording = $$props.gazeRecording;
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*mount, gazerReady*/ 257) {
    			{
    				if (mount && gazerReady) {
    					gazerInitialize();
    				}
    			}
    		}

    		if ($$self.$$.dirty & /*$stateIndex, mount, gazerReady*/ 261) {
    			{
    				let currSection = sections[$stateIndex];

    				if (mount && gazerReady) {
    					if (currSection.videoShown == true) {
    						webgazer.showVideo(true);
    						gazerMoveVideo(currSection.videoPos);
    					} else {
    						webgazer.showVideo(false);
    					}

    					if (currSection.disableBack) {
    						$$invalidate(3, disableBack = true);
    					} else {
    						$$invalidate(3, disableBack = false);
    					}

    					if (currSection.showLoader == true) {
    						loadingInd.set(true);
    					} else {
    						loadingInd.set(false);
    					}

    					if (currSection.disableNext) {
    						$$invalidate(4, disableNext = true);
    					} else {
    						$$invalidate(4, disableNext = false);
    					}
    				}
    			}
    		}

    		if ($$self.$$.dirty & /*$gazerInitVideoDone*/ 1024) {
    			//detect if going back
    			{
    				if ($gazerInitVideoDone) {
    					$$invalidate(4, disableNext = false);
    				}
    			}
    		}

    		if ($$self.$$.dirty & /*$calibrationPct, $calibrationCutoff*/ 514) {
    			{
    				if ($calibrationPct > $calibrationCutoff) {
    					$$invalidate(4, disableNext = false);
    				}
    			}
    		}
    	};

    	return [
    		gazerReady,
    		$calibrationPct,
    		$stateIndex,
    		disableBack,
    		disableNext,
    		$loadingInd,
    		sections,
    		backClick,
    		mount,
    		$calibrationCutoff,
    		$gazerInitVideoDone,
    		load_handler,
    		click_handler
    	];
    }

    class Record extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init$1(this, options, instance$1, create_fragment$1, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Record",
    			options,
    			id: create_fragment$1.name
    		});
    	}
    }

    /* src\App.svelte generated by Svelte v3.44.0 */
    const file = "src\\App.svelte";

    // (36:37) 
    function create_if_block_2(ctx) {
    	let record;
    	let current;
    	record = new Record({ $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(record.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(record, target, anchor);
    			current = true;
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(record.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(record.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(record, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_2.name,
    		type: "if",
    		source: "(36:37) ",
    		ctx
    	});

    	return block;
    }

    // (34:39) 
    function create_if_block_1(ctx) {
    	let patterns;
    	let current;
    	patterns = new Patterns({ $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(patterns.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(patterns, target, anchor);
    			current = true;
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(patterns.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(patterns.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(patterns, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1.name,
    		type: "if",
    		source: "(34:39) ",
    		ctx
    	});

    	return block;
    }

    // (32:4) {#if $pageState == 'gallery'}
    function create_if_block(ctx) {
    	let gallery;
    	let current;
    	gallery = new Gallery({ $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(gallery.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(gallery, target, anchor);
    			current = true;
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(gallery.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(gallery.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(gallery, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block.name,
    		type: "if",
    		source: "(32:4) {#if $pageState == 'gallery'}",
    		ctx
    	});

    	return block;
    }

    function create_fragment(ctx) {
    	let main;
    	let header;
    	let t;
    	let div;
    	let current_block_type_index;
    	let if_block;
    	let current;
    	header = new Header({ $$inline: true });
    	const if_block_creators = [create_if_block, create_if_block_1, create_if_block_2];
    	const if_blocks = [];

    	function select_block_type(ctx, dirty) {
    		if (/*$pageState*/ ctx[0] == 'gallery') return 0;
    		if (/*$pageState*/ ctx[0] == 'patterns') return 1;
    		if (/*$pageState*/ ctx[0] == 'record') return 2;
    		return -1;
    	}

    	if (~(current_block_type_index = select_block_type(ctx))) {
    		if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    	}

    	const block = {
    		c: function create() {
    			main = element("main");
    			create_component(header.$$.fragment);
    			t = space();
    			div = element("div");
    			if (if_block) if_block.c();
    			attr_dev(div, "class", "container svelte-x9w58t");
    			add_location(div, file, 30, 2, 682);
    			add_location(main, file, 28, 0, 660);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, main, anchor);
    			mount_component(header, main, null);
    			append_dev(main, t);
    			append_dev(main, div);

    			if (~current_block_type_index) {
    				if_blocks[current_block_type_index].m(div, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type(ctx);

    			if (current_block_type_index !== previous_block_index) {
    				if (if_block) {
    					group_outros();

    					transition_out(if_blocks[previous_block_index], 1, 1, () => {
    						if_blocks[previous_block_index] = null;
    					});

    					check_outros();
    				}

    				if (~current_block_type_index) {
    					if_block = if_blocks[current_block_type_index];

    					if (!if_block) {
    						if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    						if_block.c();
    					}

    					transition_in(if_block, 1);
    					if_block.m(div, null);
    				} else {
    					if_block = null;
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(header.$$.fragment, local);
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(header.$$.fragment, local);
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(main);
    			destroy_component(header);

    			if (~current_block_type_index) {
    				if_blocks[current_block_type_index].d();
    			}
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance($$self, $$props, $$invalidate) {
    	let $pageState;
    	validate_store(pageState, 'pageState');
    	component_subscribe($$self, pageState, $$value => $$invalidate(0, $pageState = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('App', slots, []);

    	function updateScreenSize() {
    		screenWidth.set(screenSize().windowW);
    		screenHeight.set(screenSize().windowH);
    	}

    	onMount(() => {
    		updateScreenSize();
    	});

    	window.onresize = function () {
    		updateScreenSize();
    	};

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		pageState,
    		screenWidth,
    		screenHeight,
    		screenSize,
    		onMount,
    		Gallery,
    		Header,
    		Patterns,
    		Record,
    		updateScreenSize,
    		$pageState
    	});

    	return [$pageState];
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init$1(this, options, instance, create_fragment, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "App",
    			options,
    			id: create_fragment.name
    		});
    	}
    }

    const app = new App({
    	target: document.body,
    	props: {
    		name: 'world'
    	}
    });

    return app;

})();
//# sourceMappingURL=bundle.js.map
