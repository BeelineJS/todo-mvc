/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/beelinejs-core/src/beeline.js":
/*!****************************************************!*\
  !*** ./node_modules/beelinejs-core/src/beeline.js ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const util = __webpack_require__(/*! ./shared/util */ \"./node_modules/beelinejs-core/src/shared/util.js\");\r\nconst types = __webpack_require__(/*! ./shared/types */ \"./node_modules/beelinejs-core/src/shared/types.js\");\r\n\r\nmodule.exports = {\r\n    create,\r\n    types,\r\n    util\r\n}\r\n\r\nfunction create(boot) {\r\n\r\n    const { components, layouts, request, doc, win, log } = __webpack_require__(/*! ./repository/init */ \"./node_modules/beelinejs-core/src/repository/init.js\")(boot, onLoad);\r\n    const repository = __webpack_require__(/*! ./repository/repository */ \"./node_modules/beelinejs-core/src/repository/repository.js\")(components, layouts, request, doc, log);\r\n    const renderer = __webpack_require__(/*! ./render/renderer */ \"./node_modules/beelinejs-core/src/render/renderer.js\")(repository, doc, win, log);\r\n    const events = __webpack_require__(/*! ./event/events */ \"./node_modules/beelinejs-core/src/event/events.js\")(repository, renderer, boot.events, doc, win, log);\r\n\r\n    const api = {\r\n        onLoad,\r\n        destroy,\r\n        _: {\r\n            events,\r\n            renderer,\r\n            repository\r\n        }\r\n    }\r\n\r\n    return api;\r\n\r\n    function onLoad(data) {\r\n        data = {\r\n            models: data.models || [],\r\n            viewModels: data.viewModels || [],\r\n            views: data.views || [],\r\n            layouts: data.layouts || [],\r\n            events: data.events || []\r\n        }\r\n\r\n        const { load, sanitize, save } = repository;\r\n        const { update } = renderer;\r\n\r\n        util.pipe(\r\n            load,\r\n            update,\r\n            sanitize,\r\n            save\r\n        )(data);\r\n\r\n        return api;\r\n    }\r\n\r\n    function destroy() {\r\n        observer.destroy();\r\n        repository.destroy();\r\n        events.destroy();\r\n    }\r\n}\n\n//# sourceURL=webpack://beelinejs-todo-mvc/./node_modules/beelinejs-core/src/beeline.js?");

/***/ }),

/***/ "./node_modules/beelinejs-core/src/event/document.js":
/*!***********************************************************!*\
  !*** ./node_modules/beelinejs-core/src/event/document.js ***!
  \***********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = {\r\n  create\r\n}\r\n\r\nconst defaultEvents = ['mousemove'];\r\nconst { checkForDoubleClickEvent } = __webpack_require__(/*! ./eventsHelper */ \"./node_modules/beelinejs-core/src/event/eventsHelper.js\");\r\nlet previousEvent = {\r\n  type: null,\r\n  time: 0,\r\n  key: null\r\n};\r\n\r\nfunction create(repository, doc, win, add, remove, onEvent, events = defaultEvents, doubleClickDelay = 300) {\r\n  events.forEach(name => doc.addEventListener(name, onDocumentEvent));\r\n\r\n  return {\r\n    add,\r\n    remove,\r\n    destroy,\r\n    _: {\r\n      onDocumentEvent\r\n    }\r\n  }\r\n\r\n  function onDocumentEvent(e) {\r\n    repository\r\n      .views\r\n      .list()\r\n      .map(view => {\r\n\r\n        const { models, viewModels } = repository;\r\n\r\n        let model = models.get(view.mKey);\r\n        const viewModel = viewModels.get(view.vmKey);\r\n        const ee = checkForDoubleClickEvent(e, events, previousEvent, doubleClickDelay);\r\n\r\n        previousEvent = {\r\n          type: e.type,\r\n          time: (new Date()).getTime(),\r\n          target: e.target\r\n        }\r\n\r\n        const context = {\r\n          e: ee,\r\n          view,\r\n          data: viewModel == null\r\n            ? {}\r\n            : viewModel.value,\r\n          value: model.value,\r\n          util: view.util,\r\n          events: view.events,\r\n          el: view.util.el(),\r\n          doc, win\r\n        }\r\n\r\n        Object.freeze(context);\r\n\r\n        return context;\r\n      })\r\n      .forEach(context => {\r\n        onEvent(context, context.view.events.documentEvents());\r\n      });\r\n  }\r\n\r\n  function destroy() {\r\n    events.forEach(name => doc.removeListener(name, onEvent));\r\n  }\r\n}\r\n\n\n//# sourceURL=webpack://beelinejs-todo-mvc/./node_modules/beelinejs-core/src/event/document.js?");

/***/ }),

/***/ "./node_modules/beelinejs-core/src/event/events.js":
/*!*********************************************************!*\
  !*** ./node_modules/beelinejs-core/src/event/events.js ***!
  \*********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = create;\r\n\r\nfunction create(repository, renderer, events = {}, doc, win) {\r\n    const user = (__webpack_require__(/*! ./user */ \"./node_modules/beelinejs-core/src/event/user.js\").create)(repository, doc, addFn(doc), removeFn(doc), onEvent, events.user);\r\n    const document = (__webpack_require__(/*! ./document */ \"./node_modules/beelinejs-core/src/event/document.js\").create)(repository, doc, win, addFn(doc), removeFn(doc), onEvent, events.document);\r\n    const window = (__webpack_require__(/*! ./window */ \"./node_modules/beelinejs-core/src/event/window.js\").create)(repository, win, doc, addFn(win), removeFn(win), onEvent, events.window);\r\n\r\n    return {\r\n        user,\r\n        document,\r\n        window,\r\n        destroy\r\n    }\r\n\r\n    function destroy() {\r\n        user.destroy();\r\n        document.destroy();\r\n        window.destroy();\r\n    }\r\n\r\n\r\n    function addFn(target) {\r\n        return function add(value) {\r\n            removeFn(target)(value);\r\n            if (typeof value === 'string') {\r\n                target.addEventListener(value, onEvent);\r\n                return;\r\n            }\r\n            if (Array.isArray(value)) {\r\n                value.array.forEach(name => {\r\n                    target.addEventListener(name, onEvent);\r\n                });\r\n            }\r\n        }\r\n    }\r\n\r\n    function removeFn(target) {\r\n        return function remove(value) {\r\n            if (typeof value === 'string') {\r\n                target.removeEventListener(value, onEvent);\r\n                return;\r\n            }\r\n            if (Array.isArray(value)) {\r\n                value.array.forEach(name => {\r\n                    target.removeEventListener(name, onEvent);\r\n                });\r\n                return;\r\n            }\r\n        }\r\n    }\r\n\r\n    function onEvent(context, eventList) {\r\n        const { e, events, view } = context;\r\n        const event = events.serialize(e);\r\n        if (eventList == null ||\r\n            Object.keys(eventList).length == 0 ||\r\n            eventList[event] == null) return;\r\n\r\n        const value = eventList[event](context);\r\n        update(e, view, value);\r\n        repository.save()\r\n    }\r\n\r\n    function update(e, view, value) {\r\n\r\n        const { models } = repository;\r\n        const { compare } = __webpack_require__(/*! ../shared/util */ \"./node_modules/beelinejs-core/src/shared/util.js\");\r\n\r\n        model = models.get(view.mKey);\r\n\r\n        const modified = value !== undefined && !compare(model.value, value);\r\n\r\n        if (!modified) return;\r\n        model = models.set(model.key, value);\r\n\r\n        renderer.refresh({\r\n            models: [model]\r\n        }, e);\r\n    }\r\n}\n\n//# sourceURL=webpack://beelinejs-todo-mvc/./node_modules/beelinejs-core/src/event/events.js?");

/***/ }),

/***/ "./node_modules/beelinejs-core/src/event/eventsHelper.js":
/*!***************************************************************!*\
  !*** ./node_modules/beelinejs-core/src/event/eventsHelper.js ***!
  \***************************************************************/
/***/ ((module) => {

eval("module.exports = {\r\n    checkForDoubleClickEvent\r\n}\r\n\r\nfunction checkForDoubleClickEvent(e, events, previousEvent, doubleClickDelay) {\r\n    if (!events.includes('dblclick') || previousEvent.type !== 'click' || e.type !== 'click') return e;\r\n    if ((new Date()).getTime() - previousEvent.time > doubleClickDelay) {\r\n        return e;\r\n    }\r\n    return {\r\n        type: 'dblclick',\r\n        target: e.target,\r\n        isTrusted: e.isTrusted,\r\n        currentTarget: e.currentTarget,\r\n        childNodes: e.childNodes,\r\n        children: e.children,\r\n        offsetX: e.offsetX,\r\n        offsetY: e.offsetY,\r\n        pageX: e.pageX,\r\n        pageY: e.pageY,\r\n        screenX: e.screenX,\r\n        screenY: e.screenY,\r\n        shiftKey: e.shiftKey,\r\n        metaKey: e.metaKey,\r\n        ctrlKey: e.ctrlKey,\r\n        x: e.x,\r\n        y: e.y,\r\n        srcElement: e.srcElement\r\n    };\r\n}\n\n//# sourceURL=webpack://beelinejs-todo-mvc/./node_modules/beelinejs-core/src/event/eventsHelper.js?");

/***/ }),

/***/ "./node_modules/beelinejs-core/src/event/user.js":
/*!*******************************************************!*\
  !*** ./node_modules/beelinejs-core/src/event/user.js ***!
  \*******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = {\r\n  create\r\n}\r\n\r\nconst { getId } = __webpack_require__(/*! ../shared/util */ \"./node_modules/beelinejs-core/src/shared/util.js\");\r\nconst { checkForDoubleClickEvent } = __webpack_require__(/*! ./eventsHelper */ \"./node_modules/beelinejs-core/src/event/eventsHelper.js\");\r\nconst defaultEvents = ['click', 'dblclick', 'change', 'input', 'keyup', 'keydown', 'focus', 'focusout'];\r\nlet previousEvent = {\r\n  type: null,\r\n  time: 0,\r\n  key: null\r\n};\r\n\r\nfunction create(repository, doc, add, remove, onEvent, events = defaultEvents, doubleClickDelay = 300) {\r\n  events.forEach(name => doc.addEventListener(name, onUserEvent));\r\n\r\n  return {\r\n    add,\r\n    remove,\r\n    destroy,\r\n    _: {\r\n      onEvent: onUserEvent\r\n    }\r\n  }\r\n\r\n  function onUserEvent(e) {\r\n\r\n    const id = getId(e);\r\n    if (id == null) {\r\n      return;\r\n    }\r\n\r\n    e.stopImmediatePropagation();\r\n\r\n    const {\r\n      views,\r\n      models\r\n    } = repository;\r\n\r\n    const view = views.get(id);\r\n\r\n    let model = models.get(view.mKey);\r\n    const viewModel = models.get(view.vmKey);\r\n    const ee = checkForDoubleClickEvent(e, events, previousEvent, doubleClickDelay);\r\n\r\n    previousEvent = {\r\n      type: e.type,\r\n      time: (new Date()).getTime(),\r\n      target: e.target\r\n    }\r\n\r\n    const context = {\r\n      e: ee,\r\n      view,\r\n      data: viewModel == null\r\n        ? {}\r\n        : viewModel.value,\r\n      value: model.value,\r\n      util: view.util,\r\n      events: view.events,\r\n      el: view.util.el(),\r\n      doc,\r\n      state: {}\r\n    };\r\n\r\n    Object.freeze(context);\r\n\r\n    onEvent(context, view.events.userEvents());\r\n  }\r\n\r\n  function destroy() {\r\n    events.forEach(name => doc.removeListener(name, onUserEvent));\r\n  }\r\n}\r\n\n\n//# sourceURL=webpack://beelinejs-todo-mvc/./node_modules/beelinejs-core/src/event/user.js?");

/***/ }),

/***/ "./node_modules/beelinejs-core/src/event/window.js":
/*!*********************************************************!*\
  !*** ./node_modules/beelinejs-core/src/event/window.js ***!
  \*********************************************************/
/***/ ((module) => {

eval("module.exports = {\r\n  create\r\n}\r\nconst defaultEvents = ['resize', 'load', 'hashchange'];\r\n\r\nfunction create(repository, win, doc, add, remove, onEvent, events = defaultEvents) {\r\n\r\n  events.forEach(name => win.addEventListener(name, onWindowEvent));\r\n\r\n  return {\r\n    add,\r\n    remove,\r\n    destroy,\r\n    _: {\r\n      onWindowEvent\r\n    }\r\n  }\r\n\r\n  function onWindowEvent(e) {\r\n    repository\r\n      .views\r\n      .list()\r\n      .map(view => {\r\n        const context = {\r\n          view,\r\n          value: repository.models.get(view.mKey).value,\r\n          viewModel: repository.viewModels.get(view.vmKey),\r\n          util: view.util,\r\n          events: view.events,\r\n          el: view.util.el(),\r\n          e,\r\n          doc,\r\n          win,\r\n          state: {}\r\n        }\r\n        Object.freeze(context);\r\n\r\n        return context;\r\n      })\r\n      .forEach(context => {\r\n        onEvent(context, context.view.events.windowEvents());\r\n      });\r\n  }\r\n\r\n  function destroy() {\r\n    events.forEach(name => win.removeListener(name, onWindowEvent));\r\n  }\r\n}\n\n//# sourceURL=webpack://beelinejs-todo-mvc/./node_modules/beelinejs-core/src/event/window.js?");

/***/ }),

/***/ "./node_modules/beelinejs-core/src/render/layout.js":
/*!**********************************************************!*\
  !*** ./node_modules/beelinejs-core/src/render/layout.js ***!
  \**********************************************************/
/***/ ((module) => {

eval("module.exports = insert;\r\n\r\nfunction insert(data, repository, doc) {\r\n  data.layouts.forEach(layout => {\r\n    const layoutHtml = repository.layouts(layout.name);\r\n    const parentElement = doc.querySelector(layout.parentPath);\r\n    if (parentElement == null) {\r\n      console.log(`${view.parentPath} is missing`)\r\n      return data;\r\n    }\r\n    parentElement.innerHTML = layoutHtml;\r\n    parentElement.dataset.layout = layout.name;\r\n    parentElement.dataset.path = layout.parentPath;\r\n  })\r\n\r\n  return data;\r\n}\r\n\n\n//# sourceURL=webpack://beelinejs-todo-mvc/./node_modules/beelinejs-core/src/render/layout.js?");

/***/ }),

/***/ "./node_modules/beelinejs-core/src/render/renderer.js":
/*!************************************************************!*\
  !*** ./node_modules/beelinejs-core/src/render/renderer.js ***!
  \************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = create;\r\n\r\nfunction create(repository, doc, win) {\r\n  const {\r\n    Refresh\r\n  } = (__webpack_require__(/*! ../shared/types */ \"./node_modules/beelinejs-core/src/shared/types.js\").event.application);\r\n\r\n  const {\r\n    areIntersected,\r\n    distinct\r\n  } = __webpack_require__(/*! ../shared/util */ \"./node_modules/beelinejs-core/src/shared/util.js\");\r\n\r\n  return {\r\n    update,\r\n    refresh\r\n  }\r\n\r\n  function update(data, eventType = {\r\n    type: Refresh\r\n  }) {\r\n    data = __webpack_require__(/*! ./layout */ \"./node_modules/beelinejs-core/src/render/layout.js\")(data, repository, doc, win);\r\n    data = __webpack_require__(/*! ./view */ \"./node_modules/beelinejs-core/src/render/view.js\")(data, repository, doc, win);\r\n    refresh(data, eventType);\r\n\r\n    return data;\r\n  }\r\n\r\n  function refresh(data, e = {\r\n    type: Refresh\r\n  }) {\r\n\r\n    const modelKeys = data == null ?\r\n      repository.models.list()\r\n        .map(i => i.key) :\r\n      data.models == null ? [] :\r\n        data\r\n          .models\r\n          .filter(m => m.key != null)\r\n          .map(m => m.key);\r\n\r\n    const viewModelKeys = data == null || data.viewModels == null ? [] :\r\n      data\r\n        .viewModels\r\n        .filter(m => m.key != null)\r\n        .map(m => m.key);\r\n\r\n    const views = repository.views.list();\r\n    const modelViews = views.filter(view => modelKeys.includes(view.mKey));\r\n    const viewModelViews = views.filter(view => viewModelKeys.includes(view.vmKey));\r\n\r\n    const modelBindings = views.filter(view => areIntersected(modelKeys, view.bindings));\r\n\r\n    const viewList = distinct([...viewModelViews, ...modelBindings, ...modelViews]);\r\n    viewList.forEach(view => {\r\n      const component = repository.components(view.component);\r\n      const viewModel = repository.viewModels.get(view.vmKey);\r\n      const model = repository.models.get(view.mKey);\r\n      const context = {\r\n        e,\r\n        view,\r\n        data: viewModel == null\r\n          ? {}\r\n          : viewModel.value,\r\n        value: model.value,\r\n        util: view.util,\r\n        events: view.events,\r\n        el: view.util.el(),\r\n        doc,\r\n        win,\r\n        state: {}\r\n      };\r\n      Object.freeze(context);\r\n\r\n      component.render(context);\r\n    })\r\n  }\r\n}\r\n\r\n\r\n\n\n//# sourceURL=webpack://beelinejs-todo-mvc/./node_modules/beelinejs-core/src/render/renderer.js?");

/***/ }),

/***/ "./node_modules/beelinejs-core/src/render/view.js":
/*!********************************************************!*\
  !*** ./node_modules/beelinejs-core/src/render/view.js ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = insert;\r\n\r\nconst {\r\n  Create,\r\n  Init,\r\n} = (__webpack_require__(/*! ../shared/types */ \"./node_modules/beelinejs-core/src/shared/types.js\").event.application);\r\n\r\nconst {\r\n  htmlToElement,\r\n} = __webpack_require__(/*! ../shared/util */ \"./node_modules/beelinejs-core/src/shared/util.js\");\r\n\r\nfunction insert(data, repository, doc, win) {\r\n  data.views.forEach(view => {\r\n    const component = repository.components(view.component);\r\n    const viewModel = repository.viewModels.get(view.vmKey);\r\n    const model = repository.models.get(view.mKey);\r\n    const e = {\r\n      type: Create\r\n    };\r\n\r\n    const context = {\r\n      e,\r\n      view,\r\n      data: viewModel == null\r\n        ? {}\r\n        : viewModel.value,\r\n      value: model.value,\r\n      util: view.util,\r\n      events: view.events,\r\n      el: view.util.el(),\r\n      doc,\r\n      win,\r\n      state: {}\r\n    };\r\n    Object.freeze(context);\r\n\r\n    const html = component.create(context);\r\n    const element = htmlToElement(html, doc);\r\n    element.setAttribute('data-id', view.id);\r\n    element.classList.add(view.component);\r\n\r\n    //TODO: use fragments and insert once at the end of the loop \r\n    const parentElement = doc.querySelector(view.parentPath);\r\n    if (parentElement == null) {\r\n      console.log(`${view.parentPath} is missing`)\r\n      return;\r\n    }\r\n\r\n    parentElement.appendChild(element);\r\n    const initContext = {\r\n      e: {\r\n        type: Init\r\n      },\r\n      view,\r\n      data: viewModel == null\r\n        ? {}\r\n        : viewModel.value,\r\n      value: model.value,\r\n      util: view.util,\r\n      events: view.events,\r\n      el: view.util.el(),\r\n      doc,\r\n      win,\r\n      state: {}\r\n    }\r\n    Object.freeze(initContext);\r\n\r\n    component.init(initContext)\r\n  });\r\n\r\n  return data;\r\n}\r\n\n\n//# sourceURL=webpack://beelinejs-todo-mvc/./node_modules/beelinejs-core/src/render/view.js?");

/***/ }),

/***/ "./node_modules/beelinejs-core/src/repository/init.js":
/*!************************************************************!*\
  !*** ./node_modules/beelinejs-core/src/repository/init.js ***!
  \************************************************************/
/***/ ((module) => {

eval("module.exports = init;\r\n\r\nfunction init(boot, onLoad) {\r\n    const log = boot.log || safeLog;\r\n    const values = ['components', 'layouts', 'request'];\r\n    values.forEach(value => {\r\n        if (boot[value] == null) {\r\n            log(`${value} is missing`);\r\n\r\n        }\r\n    });\r\n\r\n    return {\r\n        log,\r\n        components: boot.components || _components,\r\n        layouts: boot.layouts || _layouts,\r\n        request: (boot.request || _request).create(onLoad).request,\r\n        doc: boot.doc || document,\r\n        win: boot.win || window\r\n    }\r\n}\r\n\r\n\r\nconst _components = {\r\n    get() {\r\n        return null;\r\n    }\r\n};\r\n\r\nconst _layouts = {\r\n    get() {\r\n        return null;\r\n    }\r\n};\r\n\r\nconst _request = {\r\n    create() {\r\n        return {\r\n            request() {\r\n                return null;\r\n            }\r\n        }\r\n    }\r\n}\r\n\r\nfunction safeLog() {\r\n    if (console && console.log) {\r\n        [...arguments].forEach(value => {\r\n            console.log(value);\r\n        });\r\n    }\r\n}\n\n//# sourceURL=webpack://beelinejs-todo-mvc/./node_modules/beelinejs-core/src/repository/init.js?");

/***/ }),

/***/ "./node_modules/beelinejs-core/src/repository/models.js":
/*!**************************************************************!*\
  !*** ./node_modules/beelinejs-core/src/repository/models.js ***!
  \**************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = {\r\n  load,\r\n  get,\r\n  getFormValues,\r\n  set,\r\n  list,\r\n  sanitize,\r\n  destroy\r\n}\r\n\r\nconst {\r\n  clone,\r\n  areEqual\r\n} = __webpack_require__(/*! ../shared/util */ \"./node_modules/beelinejs-core/src/shared/util.js\");\r\n\r\nconst _models = {};\r\n\r\nfunction get(key) {\r\n  return clone(_models[key])\r\n}\r\n\r\nfunction getFormValues(formKey) {\r\n  return Object.values(_models)\r\n    .filter(m => formKey === m.form)\r\n    .map(m => clone(m))\r\n    .reduce((acc, item) => {\r\n      acc[item.key] = item.value;\r\n      return acc;\r\n    }, {});\r\n}\r\n\r\nfunction set(key, value) {\r\n  var model = _models[key];\r\n  model.value = value\r\n  model.isDirty = model.value != model.dbValue;\r\n\r\n  return clone(_models[key]);\r\n}\r\n\r\nfunction list() {\r\n  return clone(Object.values(_models))\r\n}\r\n\r\nfunction load(data) {\r\n  data.models.forEach(m => {\r\n    var model = _models[m.key];\r\n    if (model == null) {\r\n      _models[m.key] = _create(m)\r\n      return;\r\n    }\r\n    model.value = m.value;\r\n    model.isDirty = !areEqual(model.value, m.value);\r\n  })\r\n\r\n  return data;\r\n}\r\n\r\nfunction _create(model) {\r\n  const m = clone(model);\r\n  return {\r\n    value: m.value,\r\n    dbValue: m.value,\r\n    form: m.form || null,\r\n    key: m.key,\r\n    isDirty: false\r\n  }\r\n}\r\n\r\nfunction sanitize(keys) {\r\n  const unusedModelKeys = list()\r\n    .filter(m => !keys.includes(m.key))\r\n    .map(m => m.key);\r\n\r\n  unusedModelKeys.forEach(key => delete _models[key]);\r\n}\r\n\r\nfunction destroy() {\r\n\r\n}\r\n\n\n//# sourceURL=webpack://beelinejs-todo-mvc/./node_modules/beelinejs-core/src/repository/models.js?");

/***/ }),

/***/ "./node_modules/beelinejs-core/src/repository/observer.js":
/*!****************************************************************!*\
  !*** ./node_modules/beelinejs-core/src/repository/observer.js ***!
  \****************************************************************/
/***/ ((module) => {

eval("module.exports = {\r\n  create\r\n};\r\n\r\nfunction create() {\r\n  const _subscriptions = {};\r\n  const _viewSubscriptions = {};\r\n  const _subscriptionsById = {};\r\n  let _id = 1;\r\n\r\n  return {\r\n    notify,\r\n    subscribeFn,\r\n    unsubscribeFn,\r\n    destroy\r\n  };\r\n\r\n  function unsubscribeFn(viewId) {\r\n\r\n    return function unsubscribe(id) {\r\n      if (viewId) {\r\n        _viewSubscriptions[viewId].array.forEach(id => {\r\n          _clear(id)\r\n        });\r\n        return;\r\n      }\r\n\r\n      _clear(id);\r\n    }\r\n  }\r\n\r\n  function _clear(id) {\r\n    var item = _subscriptionsById[id];\r\n    if (item == null) {\r\n      return;\r\n    }\r\n\r\n    delete _subscriptions[item.event][item.id];\r\n  }\r\n\r\n  function notify(event, data) {\r\n\r\n    if (_subscriptions[event] == null) {\r\n      return;\r\n    }\r\n\r\n    for (var id in _subscriptions[event]) {\r\n      _subscriptions[event][id](data);\r\n    };\r\n  }\r\n\r\n  function subscribeFn(viewId) {\r\n\r\n    return function subscribe(event, callback) {\r\n      if (_subscriptions[event] == null) {\r\n        _subscriptions[event] = {};\r\n      }\r\n\r\n      _subscriptions[event][_id] = callback;\r\n      _subscriptionsById[_id] = {\r\n        event: event,\r\n        id: _id,\r\n        viewId: viewId\r\n      };\r\n\r\n      if (_viewSubscriptions[viewId] == null) {\r\n        _viewSubscriptions[viewId] = [];\r\n      }\r\n\r\n      _viewSubscriptions[viewId].push(_id);\r\n\r\n      return _id++;\r\n    }\r\n  }\r\n\r\n  function destroy() {\r\n    _subscriptions.clear();\r\n    _viewSubscriptions.clear();\r\n    _subscriptionsById.clear();\r\n  }\r\n\r\n}\r\n\n\n//# sourceURL=webpack://beelinejs-todo-mvc/./node_modules/beelinejs-core/src/repository/observer.js?");

/***/ }),

/***/ "./node_modules/beelinejs-core/src/repository/repository.js":
/*!******************************************************************!*\
  !*** ./node_modules/beelinejs-core/src/repository/repository.js ***!
  \******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = create;\r\n\r\nfunction create(components, layouts, request, doc, log) {\r\n    const viewModels = __webpack_require__(/*! ./viewModels */ \"./node_modules/beelinejs-core/src/repository/viewModels.js\");\r\n    const models = __webpack_require__(/*! ./models */ \"./node_modules/beelinejs-core/src/repository/models.js\");\r\n    const views = (__webpack_require__(/*! ./views */ \"./node_modules/beelinejs-core/src/repository/views.js\").create)(request, viewModels.get, models.getFormValues, doc);\r\n\r\n    return {\r\n        load,\r\n        sanitize,\r\n        save,\r\n        components,\r\n        viewModels,\r\n        models,\r\n        views,\r\n        layouts,\r\n        destroy\r\n    }\r\n\r\n    function load(data) {\r\n        data = viewModels.load(data);\r\n        data = models.load(data);\r\n        data = views.load(data);\r\n\r\n        return data;\r\n    }\r\n\r\n    function sanitize() {\r\n        views.sanitize();\r\n\r\n        const modelKeys = views\r\n            .list()\r\n            .map(v => v.mKey);\r\n\r\n        models.sanitize(modelKeys);\r\n\r\n        const viewModelKeys = views\r\n            .list()\r\n            .map(v => v.vmKey);\r\n\r\n        viewModels.sanitize(viewModelKeys);\r\n    }\r\n\r\n    function save() {\r\n        var state = {\r\n            //TODO set hierarchy for layout child/parent \r\n            layouts: [...doc.querySelectorAll('[data-layout][data-path]')]\r\n                .map(el => {\r\n                    return {\r\n                        name: el.dataset.layout,\r\n                        parentPath: el.dataset.path\r\n                    }\r\n                }),\r\n            models: models.list().map(m => {\r\n                return {\r\n                    key: m.key,\r\n                    value: m.value\r\n                }\r\n            }),\r\n            viewModels: viewModels.list().map(vm => {\r\n                return {\r\n                    key: vm.key,\r\n                    value: vm.value\r\n                }\r\n            }),\r\n            views: views.list().map(v => {\r\n                return {\r\n                    mKey: v.mKey,\r\n                    vmKey: v.vmKey,\r\n                    component: v.component,\r\n                    parentPath: v.parentPath,\r\n                    requestEvents: v.parentPath,\r\n                    bindings: v.bindings || [],\r\n                    dispatch: v.dispatch || [],\r\n                    requestEvents: v.requestEvents || [],\r\n                }\r\n            })\r\n        }\r\n        // limited to 10mb.\r\n        localStorage.setItem('state', JSON.stringify(state));\r\n    }\r\n\r\n    function destroy() {\r\n        models.destroy();\r\n        viewModels.destroy();\r\n        views.destroy();\r\n    }\r\n}\n\n//# sourceURL=webpack://beelinejs-todo-mvc/./node_modules/beelinejs-core/src/repository/repository.js?");

/***/ }),

/***/ "./node_modules/beelinejs-core/src/repository/viewModels.js":
/*!******************************************************************!*\
  !*** ./node_modules/beelinejs-core/src/repository/viewModels.js ***!
  \******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = {\r\n  load,\r\n  get,\r\n  list,\r\n  sanitize,\r\n  destroy\r\n}\r\n\r\nconst {\r\n  clone\r\n} = __webpack_require__(/*! ../shared/util */ \"./node_modules/beelinejs-core/src/shared/util.js\");\r\n\r\nconst _viewModels = {};\r\n\r\nfunction get(key) {\r\n  return clone(_viewModels[key])\r\n}\r\n\r\nfunction load(data) {\r\n  data.viewModels.forEach(m => {\r\n    _viewModels[m.key] = m;\r\n  })\r\n\r\n  return data;\r\n}\r\n\r\nfunction list() {\r\n  return clone(Object.values(_viewModels))\r\n}\r\n\r\nfunction sanitize(keys) {\r\n  const unusedModelKeys = Object.values(_viewModels)\r\n    .filter(m => !keys.includes(m.key))\r\n    .map(m => m.key);\r\n\r\n  unusedModelKeys.forEach(key => delete _viewModels[key]);\r\n}\r\n\r\nfunction destroy() {\r\n\r\n}\n\n//# sourceURL=webpack://beelinejs-todo-mvc/./node_modules/beelinejs-core/src/repository/viewModels.js?");

/***/ }),

/***/ "./node_modules/beelinejs-core/src/repository/views.events.js":
/*!********************************************************************!*\
  !*** ./node_modules/beelinejs-core/src/repository/views.events.js ***!
  \********************************************************************/
/***/ ((module) => {

eval("module.exports = events;\r\n\r\nfunction events(request, view, getFormValues) {\r\n    let _userEvents = {};\r\n    let _documentEvents = {};\r\n    let _windowEvents = {};\r\n\r\n    return {\r\n        user: {\r\n            set: setUserEvents,\r\n            add: addUserEvent,\r\n            remove: removeUserEvent\r\n        },\r\n        document: {\r\n            set: setDocumentEvents,\r\n            add: addDocumentEvent,\r\n            remove: removeDocumentEvent,\r\n        },\r\n        window: {\r\n            set: setWindowEvents,\r\n            add: addWindowEvent,\r\n            remove: removeWindowEvent,\r\n        },\r\n        userEvents,\r\n        documentEvents,\r\n        windowEvents,\r\n        serialize,\r\n        submit: submitFn(request),\r\n        destroy\r\n    }\r\n\r\n    function destroy() {\r\n        _userEvents = null;\r\n        _documentEvents = null;\r\n        _windowEvents = null;\r\n    }\r\n\r\n    function userEvents() {\r\n        return { ..._userEvents };\r\n    }\r\n\r\n    function documentEvents() {\r\n        return { ..._documentEvents };\r\n    }\r\n\r\n    function windowEvents() {\r\n        return { ..._windowEvents };\r\n    }\r\n\r\n    function addUserEvent(name, func) {\r\n        _userEvents[name] = func;\r\n    }\r\n\r\n    function removeUserEvent(name) {\r\n        delete _userEvents[name];\r\n    }\r\n\r\n    function setUserEvents(events) {\r\n        _userEvents = { ...events };\r\n    }\r\n\r\n    function addDocumentEvent(name, func) {\r\n        _documentEvents[name] = func;\r\n    }\r\n\r\n    function removeDocumentEvent(name) {\r\n        delete _documentEvents[name];\r\n    }\r\n\r\n    function setDocumentEvents(events) {\r\n        _documentEvents = { ...events };\r\n    }\r\n\r\n    function addWindowEvent(name, func) {\r\n        _windowEvents[name] = func;\r\n    }\r\n\r\n    function removeWindowEvent(name) {\r\n        delete _windowEvents[name];\r\n    }\r\n\r\n    function setWindowEvents(events) {\r\n        _windowEvents = { ...events };\r\n    }\r\n\r\n    function serialize(e) {\r\n        const arr = [e.type];\r\n        if (e.target && e.target.dataset && e.target.dataset.key) {\r\n            arr.push(e.target.dataset.key);\r\n        }\r\n        if (e.key != null) {\r\n            arr.push(e.key);\r\n        }\r\n        return arr.join('/');\r\n    }\r\n\r\n    function submitFn(request) {\r\n        return function submit() {\r\n            if (!request) return;\r\n\r\n            let form = {};\r\n            if (view.request.formKey) {\r\n                form = getFormValues(view.request.formKey);\r\n            }\r\n\r\n            const data = {\r\n                ...view.request,\r\n                ...{\r\n                    form\r\n                }\r\n            }\r\n            request(data);\r\n            // todo add dispatch events\r\n        }\r\n    }\r\n}\n\n//# sourceURL=webpack://beelinejs-todo-mvc/./node_modules/beelinejs-core/src/repository/views.events.js?");

/***/ }),

/***/ "./node_modules/beelinejs-core/src/repository/views.js":
/*!*************************************************************!*\
  !*** ./node_modules/beelinejs-core/src/repository/views.js ***!
  \*************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = {\r\n  create\r\n}\r\n\r\nconst _util = __webpack_require__(/*! ../shared/util */ \"./node_modules/beelinejs-core/src/shared/util.js\");\r\nconst _observer = (__webpack_require__(/*! ./observer */ \"./node_modules/beelinejs-core/src/repository/observer.js\").create)();\r\n\r\nfunction create(request, valueForKey, getFormValues, doc) {\r\n  const _views = {};\r\n  let _uid = 1;\r\n\r\n  return {\r\n    load,\r\n    list,\r\n    get,\r\n    forKey,\r\n    forBoundKey,\r\n    sanitize,\r\n    destroy,\r\n    _: {\r\n      build\r\n    }\r\n  }\r\n\r\n  function build(data) {\r\n    const cData = _util.clone(data);\r\n\r\n    cData.views = cData.views.map(vw => {\r\n      const id = _hexId(_uid++);\r\n      const core = {\r\n        subscribe: _observer.subscribeFn(id),\r\n        notify: _observer.notify,\r\n        valueForKey,\r\n        request: request,\r\n        remove: removeFn(id)\r\n      }\r\n\r\n      const view = {\r\n        id,\r\n        bindings: vw.bindings || [],\r\n        dispatch: vw.dispatch || [],\r\n        requestEvents: vw.requestEvents || [],\r\n        model: vw.model || null,\r\n        core,\r\n        util: __webpack_require__(/*! ./views.utility */ \"./node_modules/beelinejs-core/src/repository/views.utility.js\")(id, doc),\r\n        events: __webpack_require__(/*! ./views.events */ \"./node_modules/beelinejs-core/src/repository/views.events.js\")(core.request, vw, getFormValues),\r\n      }\r\n\r\n      const newView = {\r\n        ...vw,\r\n        ...view\r\n      };\r\n\r\n      Object.freeze(newView);\r\n\r\n      return newView;\r\n    })\r\n\r\n    return cData;\r\n  }\r\n\r\n  function load(data) {\r\n    data = build(data);\r\n    data.views.forEach(vw => {\r\n      _views[vw.id] = vw;\r\n    })\r\n\r\n    return data;\r\n  }\r\n\r\n  function list() {\r\n    return Object.values(_views)\r\n  }\r\n\r\n  function get(id) {\r\n    return _views[id]\r\n  }\r\n\r\n  function forKey(key) {\r\n    return Object.values(_views)\r\n      .filter(view => view.key === key);\r\n  }\r\n\r\n  function forBoundKey(key) {\r\n    return Object.values(_views)\r\n      .filter(view => view.bindings.length > 0)\r\n      .filter(view => view.bindings.includes(key));\r\n  }\r\n\r\n  function _hexId(id) {\r\n    return 'H' + Number(id)\r\n      .toString(16)\r\n      .toUpperCase();\r\n  }\r\n\r\n  function removeFn(id) {\r\n    return function remove() {\r\n      const el = doc.querySelector(`[data-id=\"${id}\"]`);\r\n      el.remove();\r\n    }\r\n  }\r\n\r\n  function sanitize() {\r\n\r\n    const unusedIds = list()\r\n      .filter(v => doc.querySelector(`[data-id=\"${v.id}\"]`) == null)\r\n      .map(v => v.id);\r\n\r\n    unusedIds.forEach(id => {\r\n      _views[id].events.destroy()\r\n      delete _views[id]\r\n    });\r\n  }\r\n\r\n  function destroy() {\r\n    _observer.destroy();\r\n    _views.forEach(v => v.events.destroy())\r\n    _views = null;\r\n  }\r\n}\r\n\n\n//# sourceURL=webpack://beelinejs-todo-mvc/./node_modules/beelinejs-core/src/repository/views.js?");

/***/ }),

/***/ "./node_modules/beelinejs-core/src/repository/views.utility.js":
/*!*********************************************************************!*\
  !*** ./node_modules/beelinejs-core/src/repository/views.utility.js ***!
  \*********************************************************************/
/***/ ((module) => {

eval("module.exports = utility\r\n\r\nfunction utility(id, doc) {\r\n  return {\r\n    encode,\r\n    decode,\r\n    textContent,\r\n    show,\r\n    el,\r\n    find,\r\n    findFirst,\r\n    findLast,\r\n    findNth,\r\n    findAll\r\n  }\r\n\r\n  function encode(value) {\r\n    const el = doc.createElement('div');\r\n    el.textContent = value;\r\n    return el.innerHTML;\r\n  }\r\n\r\n  function decode(value) {\r\n    const el = doc.createElement('div');\r\n    el.innerHTML = value;\r\n    return el.textContent;\r\n  }\r\n\r\n  function textContent(path, value) {\r\n    return el()\r\n      .querySelector(path)\r\n      .textContent = value;\r\n  }\r\n\r\n  function show(path, value) {\r\n    const classList = el()\r\n      .querySelector(path)\r\n      .classList;\r\n\r\n    if (value) {\r\n      classList.remove('hidden');\r\n      return;\r\n    }\r\n\r\n    classList.add('hidden')\r\n  }\r\n\r\n  function el() {\r\n    return doc.querySelector(`[data-id=\"${id}\"]`);\r\n  }\r\n\r\n  function find(path) {\r\n    return findFirst(path);\r\n  }\r\n\r\n  function findFirst(path) {\r\n    return el()\r\n      .querySelector(path);\r\n  }\r\n\r\n  function findAll(path) {\r\n    return [...el().querySelectorAll(path)];\r\n  }\r\n\r\n  function findLast(path) {\r\n    const items = findAll(path);\r\n    return items.length == 0\r\n      ? null\r\n      : items[items.length - 1];\r\n  }\r\n\r\n  function findNth(path, index) {\r\n    const items = findAll(path);\r\n    return items.length < index\r\n      ? null\r\n      : items[index];\r\n  }\r\n}\n\n//# sourceURL=webpack://beelinejs-todo-mvc/./node_modules/beelinejs-core/src/repository/views.utility.js?");

/***/ }),

/***/ "./node_modules/beelinejs-core/src/shared/types.js":
/*!*********************************************************!*\
  !*** ./node_modules/beelinejs-core/src/shared/types.js ***!
  \*********************************************************/
/***/ ((module) => {

eval("const event = {\r\n    application: {\r\n        Create: 'create',\r\n        Init: 'init',\r\n        Refresh: 'refresh',\r\n        Update: 'update'\r\n    },\r\n\r\n}\r\nObject.freeze(event);\r\n\r\nconst request = {\r\n    types: {\r\n        Json: 'json',\r\n        Page: 'page',\r\n        File: 'file'\r\n    },\r\n    method: {\r\n        Post: 'post',\r\n        Get: 'get'\r\n    }\r\n}\r\nObject.freeze(request);\r\n\r\n\r\nmodule.exports = {\r\n    event,\r\n    request\r\n}\n\n//# sourceURL=webpack://beelinejs-todo-mvc/./node_modules/beelinejs-core/src/shared/types.js?");

/***/ }),

/***/ "./node_modules/beelinejs-core/src/shared/util.js":
/*!********************************************************!*\
  !*** ./node_modules/beelinejs-core/src/shared/util.js ***!
  \********************************************************/
/***/ ((module) => {

eval("module.exports = {\r\n  clone,\r\n  compare,\r\n  areEqual,\r\n  htmlToElement,\r\n  pipe,\r\n  toArray,\r\n  distinct,\r\n  intersection,\r\n  areIntersected,\r\n  getId\r\n}\r\n\r\nfunction clone(obj) {\r\n  if (obj == null) {\r\n    return null;\r\n  }\r\n  return JSON.parse(JSON.stringify(obj));\r\n}\r\n\r\nfunction compare(a, b) {\r\n  if (a == null && b == null) {\r\n    return true;\r\n  }\r\n\r\n  if (a == null || b == null) {\r\n    return false;\r\n  }\r\n\r\n  return JSON.stringify(a) === JSON.stringify(b);\r\n}\r\n\r\nfunction areEqual(a, b) {\r\n  switch (true) {\r\n    case a !== Object(a) || a != Object(a):\r\n      return a === b;\r\n    case a === b:\r\n      return true;\r\n    case aKeys.length !== bKeys.length:\r\n      return false;\r\n  }\r\n\r\n  const aKeys = Object.keys(a);\r\n  const bKeys = Object.keys(b);\r\n\r\n  aKeys.forEach(key => {\r\n    if (a[key] !== b[key]) {\r\n      if (typeof a[key] === 'object' && typeof b[key] === 'object') {\r\n        return !areEqual(a[key], b[key]);\r\n      }\r\n      return false;\r\n    }\r\n  })\r\n\r\n  return true;\r\n}\r\n\r\nfunction htmlToElement(html, doc) {\r\n  const div = doc.createElement('div');\r\n  div.innerHTML = html.trim();\r\n\r\n  return div.firstChild;\r\n}\r\n\r\nfunction pipe(...fns) {\r\n  return function (value) {\r\n    fns.reduce((v, f) => {\r\n      return f(v)\r\n    }, value);\r\n  }\r\n}\r\n\r\nfunction toArray(obj) {\r\n  var copy = clone(obj)\r\n  return Object.values(copy);\r\n}\r\n\r\nfunction areIntersected(a, b) {\r\n  return intersection(a, b)\r\n    .length > 0;\r\n}\r\n\r\nfunction intersection(a, b) {\r\n  const setA = new Set(a);\r\n  return b.filter(value => setA.has(value));\r\n}\r\n\r\nfunction distinct(arr) {\r\n  return arr.filter((x, i, a) => a.indexOf(x) == i)\r\n}\r\n\r\nfunction getId(e) {\r\n  var el = e.srcElement || e.target;\r\n  while (el != null && !el.hasAttribute('data-id')) {\r\n    el = el.parentElement;\r\n  }\r\n\r\n  if (el == null) {\r\n    return null;\r\n  }\r\n\r\n  return el.getAttribute('data-id');\r\n}\n\n//# sourceURL=webpack://beelinejs-todo-mvc/./node_modules/beelinejs-core/src/shared/util.js?");

/***/ }),

/***/ "./src/style.scss":
/*!************************!*\
  !*** ./src/style.scss ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + \"style.css\");\n\n//# sourceURL=webpack://beelinejs-todo-mvc/./src/style.scss?");

/***/ }),

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style.scss */ \"./src/style.scss\");\n\r\n\r\nconst components = __webpack_require__(/*! ./components/factory */ \"./src/components/factory.js\");\r\nconst layouts = __webpack_require__(/*! ./layouts/factory */ \"./src/layouts/factory.js\");\r\n\r\nconst localData = localStorage.getItem('state');\r\nconst data = localData != null\r\n  ? JSON.parse(localData)\r\n  : __webpack_require__(/*! ./data.json */ \"./src/data.json\");\r\n\r\nconst BeelineJS = __webpack_require__(/*! beelinejs-core */ \"./node_modules/beelinejs-core/src/beeline.js\");\r\n\r\nBeelineJS\r\n  .create({\r\n    components,\r\n    layouts\r\n  })\r\n  .onLoad(data);\r\n\n\n//# sourceURL=webpack://beelinejs-todo-mvc/./src/app.js?");

/***/ }),

/***/ "./src/components/TodoFooter/TodoFooter.html.js":
/*!******************************************************!*\
  !*** ./src/components/TodoFooter/TodoFooter.html.js ***!
  \******************************************************/
/***/ ((module) => {

eval("// auto generated based on src\\components\\TodoFooter\\TodoFooter.html\n\nmodule.exports =  create;\n\nfunction create(value) {\n\n   return `<div>\r\n  <span class=\"todo-count\"><strong data-key=\"count\">0</strong> <span data-key=\"description\">items left</span></span>\r\n  <ul class=\"filters\">\r\n    <li>\r\n      <a class=\"selected\" href=\"#/\">All</a>\r\n    </li>\r\n    <li>\r\n      <a href=\"#/active\">Active</a>\r\n    </li>\r\n    <li>\r\n      <a href=\"#/completed\">Completed</a>\r\n    </li>\r\n  </ul>\r\n  <button class=\"clear-completed\" data-key=\"clear-completed\">Clear completed</button>\r\n</div>\r\n`;\n}\n\n//# sourceURL=webpack://beelinejs-todo-mvc/./src/components/TodoFooter/TodoFooter.html.js?");

/***/ }),

/***/ "./src/components/TodoFooter/TodoFooter.js":
/*!*************************************************!*\
  !*** ./src/components/TodoFooter/TodoFooter.js ***!
  \*************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = {\r\n  create,\r\n  init,\r\n  render\r\n}\r\n\r\nconst userEvents = {\r\n  'click/clear-completed': _clearCompleted\r\n};\r\n\r\nconst windowEvents = {\r\n  'hashchange': _onHashChange,\r\n  'load': _onHashChange\r\n}\r\n\r\nfunction create() {\r\n  return __webpack_require__(/*! ./TodoFooter.html.js */ \"./src/components/TodoFooter/TodoFooter.html.js\")();\r\n}\r\n\r\nfunction init(context) {\r\n  const { events } = context;\r\n  events.user.set(userEvents);\r\n  events.window.set(windowEvents);\r\n}\r\n\r\nfunction render(context) {\r\n  const { util, value } = context;\r\n  const { textContent, show } = util;\r\n\r\n  const noOfActiveItems = value.filter(v => v.active).length;\r\n  textContent('[data-key=\"count\"]', noOfActiveItems);\r\n\r\n  const description = noOfActiveItems === 1 ? 'item left' : 'items left'\r\n  textContent('[data-key=\"description\"]', description);\r\n\r\n  const hasCompleted = value.some(v => !v.active);\r\n  show('[data-key=\"clear-completed\"]', hasCompleted);\r\n}\r\n\r\nfunction _onHashChange(context) {\r\n  const { doc, util } = context;\r\n  let hash = doc.location.hash;\r\n  const links = util.findAll('.filters a');\r\n  links.forEach(l => l.classList.remove('selected'));\r\n  if (util.find(`.filters a[href=\"${hash}\"]`) == null) hash = '#/'\r\n  util.find(`.filters a[href=\"${hash}\"]`).classList.add('selected');\r\n}\r\n\r\nfunction _clearCompleted(context) {\r\n  const { value } = context;\r\n\r\n  return value.filter(v => v.active)\r\n}\n\n//# sourceURL=webpack://beelinejs-todo-mvc/./src/components/TodoFooter/TodoFooter.js?");

/***/ }),

/***/ "./src/components/TodoHeader/TodoHeader.html.js":
/*!******************************************************!*\
  !*** ./src/components/TodoHeader/TodoHeader.html.js ***!
  \******************************************************/
/***/ ((module) => {

eval("// auto generated based on src\\components\\TodoHeader\\TodoHeader.html\n\nmodule.exports =  create;\n\nfunction create(value) {\n\n   return `<div>\r\n  <input data-key=\"insert\" class=\"new-todo\" placeholder=\"What needs to be done?\" autofocus=\"\">\r\n  <div class=\"toggle-button\" data-key=\"toggle\">\r\n    <input id=\"toggle-all\" class=\"toggle-all\" >\r\n    <label for=\"toggle-all\">Mark all as complete</label>\r\n  </div>\r\n</div>\r\n`;\n}\n\n//# sourceURL=webpack://beelinejs-todo-mvc/./src/components/TodoHeader/TodoHeader.html.js?");

/***/ }),

/***/ "./src/components/TodoHeader/TodoHeader.js":
/*!*************************************************!*\
  !*** ./src/components/TodoHeader/TodoHeader.js ***!
  \*************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = {\r\n  create,\r\n  init\r\n}\r\nconst userEvents = {\r\n  'keydown/insert/Enter': _insertTodo,\r\n  'click/toggle': _toggle\r\n};\r\n\r\nfunction create() {\r\n  return __webpack_require__(/*! ./TodoHeader.html.js */ \"./src/components/TodoHeader/TodoHeader.html.js\")();\r\n}\r\n\r\nfunction init(context) {\r\n  const { events } = context;\r\n  events.user.set(userEvents);\r\n}\r\n\r\nfunction _insertTodo(context) {\r\n  const { el, value } = context;\r\n  const input = el.querySelector('input');\r\n\r\n  const inputValue = input.value;\r\n  if (inputValue.trim() === '') return;\r\n\r\n  const todo = {\r\n    task: input.value,\r\n    active: true\r\n  }\r\n\r\n  value.push(todo);\r\n  input.value = '';\r\n\r\n  return value;\r\n}\r\n\r\nfunction _toggle(context) {\r\n  const { value } = context;\r\n  const state = !model.value.every(v => v.active);\r\n  value.forEach(v => v.active = state);\r\n\r\n  return value;\r\n}\r\n\n\n//# sourceURL=webpack://beelinejs-todo-mvc/./src/components/TodoHeader/TodoHeader.js?");

/***/ }),

/***/ "./src/components/TodoItems/TodoItems.html.js":
/*!****************************************************!*\
  !*** ./src/components/TodoItems/TodoItems.html.js ***!
  \****************************************************/
/***/ ((module) => {

eval("// auto generated based on src\\components\\TodoItems\\TodoItems.html\n\nmodule.exports =  create;\n\nfunction create(value) {\n\n   return `<ul class=\"todo-list\">\r\n\r\n</ul>`;\n}\n\n//# sourceURL=webpack://beelinejs-todo-mvc/./src/components/TodoItems/TodoItems.html.js?");

/***/ }),

/***/ "./src/components/TodoItems/TodoItems.js":
/*!***********************************************!*\
  !*** ./src/components/TodoItems/TodoItems.js ***!
  \***********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = {\r\n  create,\r\n  init,\r\n  render\r\n}\r\n\r\nconst windowEvents = {\r\n  'hashchange': render\r\n}\r\nconst userEvents = {\r\n  'keydown/input/Enter': _update,\r\n  'keydown/input/Tab': _update,\r\n  'keydown/input/Escape': _exitEdit,\r\n  'click/toggle': _toggle,\r\n  'click/destroy': _destroy,\r\n  'dblclick/edit': _edit,\r\n  'focusout/input': _endEdit\r\n}\r\n\r\nconst itemTemplate = __webpack_require__(/*! ./todoItem.html.js */ \"./src/components/TodoItems/todoItem.html.js\")\r\n\r\n\r\nfunction create(context) {\r\n  const { value, util } = context;\r\n\r\n  const templateValue = util.encode(value);\r\n  return __webpack_require__(/*! ./TodoItems.html.js */ \"./src/components/TodoItems/TodoItems.html.js\")(templateValue);\r\n}\r\n\r\nfunction init(context) {\r\n  const { events } = context;\r\n  events.user.set(userEvents);\r\n  events.window.set(windowEvents)\r\n}\r\n\r\nfunction render(context) {\r\n  const { value, el, doc } = context;\r\n  const hash = doc.location.hash;\r\n\r\n  const html = value\r\n    .filter(m => isFiltered(m.active, hash))\r\n    .map(m => itemTemplate({\r\n      task: m.task,\r\n      checked: m.active ? '' : 'checked',\r\n      completed: m.active ? '' : 'completed',\r\n    }))\r\n    .join('');\r\n\r\n  el.innerHTML = html;\r\n}\r\n\r\nfunction isFiltered(isActive, hash) {\r\n  switch (hash) {\r\n    case '#/active': return isActive;\r\n    case '#/completed': return !isActive;\r\n  }\r\n  return true;\r\n}\r\n\r\nfunction _update(context) {\r\n  const { e, util } = context;\r\n  const index = getIndex(util, e.target, 'input');\r\n  util.findNth('li', index).classList.remove('editing');\r\n}\r\n\r\nfunction _toggle(context) {\r\n  const { e, util, value } = context;\r\n  const index = getIndex(util, e.target, 'toggle');\r\n  value[index].active = !value[index].active;\r\n\r\n  return value;\r\n}\r\n\r\nfunction _destroy(context) {\r\n  const { e, util, value } = context;\r\n  const index = getIndex(util, e.target, 'destroy');\r\n  value.splice(index, 1);\r\n\r\n  return value;\r\n}\r\n\r\nfunction _exitEdit(context) {\r\n  const { e, util } = context;\r\n  const index = getIndex(util, e.target, 'input');\r\n  util.findNth('li', index).classList.remove('editing');\r\n}\r\n\r\nfunction _endEdit(context) {\r\n  const { e, util, value } = context;\r\n  const index = getIndex(util, e.target, 'input');\r\n  util.findNth('li', index).classList.remove('editing');\r\n\r\n  const input = util.findNth('input.edit', index);\r\n  if (input.value.trim().length === 0) {\r\n    value.splice(index, 1);\r\n    return value;\r\n  }\r\n\r\n  value[index].task = input.value;\r\n  return value;\r\n}\r\n\r\nfunction _edit(context) {\r\n  const { e, util, value } = context;\r\n  const index = getIndex(util, e.target, 'edit');\r\n  util.findNth('li', index).classList.add('editing');\r\n  const input = util.findNth('input.edit', index);\r\n  input.value = value[index].task;\r\n  input.focus();\r\n}\r\n\r\nfunction getIndex(util, el, key) {\r\n  return util.findAll(`[data-key=\"${key}\"]`).findIndex(e => e === el);\r\n}\n\n//# sourceURL=webpack://beelinejs-todo-mvc/./src/components/TodoItems/TodoItems.js?");

/***/ }),

/***/ "./src/components/TodoItems/todoItem.html.js":
/*!***************************************************!*\
  !*** ./src/components/TodoItems/todoItem.html.js ***!
  \***************************************************/
/***/ ((module) => {

eval("// auto generated based on src\\components\\TodoItems\\TodoItem.html\n\nmodule.exports =  create;\n\nfunction create(value) {\n\n   return `<li  class=\"${value.completed}\">\r\n    <div class=\"view\">\r\n        <input class=\"toggle\" type=\"checkbox\" ${value.checked}  data-key=\"toggle\">\r\n        <label data-key=\"edit\">${value.task}</label>\r\n        <button class=\"destroy\" data-key=\"destroy\"></button>\r\n    </div>\r\n    <input class=\"edit\" data-key=\"input\"/>\r\n</li>`;\n}\n\n//# sourceURL=webpack://beelinejs-todo-mvc/./src/components/TodoItems/todoItem.html.js?");

/***/ }),

/***/ "./src/components/component.js":
/*!*************************************!*\
  !*** ./src/components/component.js ***!
  \*************************************/
/***/ ((module) => {

eval("function create() {\r\n  return '';\r\n}\r\n\r\nfunction init() {\r\n}\r\n\r\nfunction render() {\r\n}\r\n\r\nfunction onUserEvent(context) {\r\n  return _onEvent(context, context.events.userEvents());\r\n}\r\n\r\nfunction onDocumentEvent(context){\r\n  return _onEvent(context, context.events.documentEvents());\r\n}\r\n\r\nfunction onWindowEvent(context){\r\n  return _onEvent(context, context.events.windowEvents());\r\n}\r\n\r\nfunction destroy() {\r\n}\r\n\r\nfunction _onEvent(context, events){\r\n  const { e, util } = context;\r\n  const event = util.serializeEvent(e);\r\n  if(events == null || \r\n    Object.keys(events).length == 0 ||\r\n    events[event] == null) return;\r\n\r\n  return events[event](context);\r\n}\r\n\r\nmodule.exports = {\r\n  create,\r\n  init,\r\n  render,\r\n  destroy,\r\n  onUserEvent,\r\n  onDocumentEvent,\r\n  onWindowEvent\r\n}\r\n\n\n//# sourceURL=webpack://beelinejs-todo-mvc/./src/components/component.js?");

/***/ }),

/***/ "./src/components/factory.js":
/*!***********************************!*\
  !*** ./src/components/factory.js ***!
  \***********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("// auto generated list of available components\n\nconst components = {\n'TodoFooter': __webpack_require__(/*! ./TodoFooter/TodoFooter.js */ \"./src/components/TodoFooter/TodoFooter.js\"),\n'TodoHeader': __webpack_require__(/*! ./TodoHeader/TodoHeader.js */ \"./src/components/TodoHeader/TodoHeader.js\"),\n'TodoItems': __webpack_require__(/*! ./TodoItems/TodoItems.js */ \"./src/components/TodoItems/TodoItems.js\")\n};\n\nfunction get(key) {\n   if (components[key] == null) {\n      console.log('Component ' +key + ' not found')\n      return new components['Component']()\n   }\n\n   return {\n      ...__webpack_require__(/*! ./component */ \"./src/components/component.js\"),\n      ...components[key]\n   }\n}\n\nmodule.exports =  get;\n\n\n//# sourceURL=webpack://beelinejs-todo-mvc/./src/components/factory.js?");

/***/ }),

/***/ "./src/layouts/app-layout/app-layout.html.js":
/*!***************************************************!*\
  !*** ./src/layouts/app-layout/app-layout.html.js ***!
  \***************************************************/
/***/ ((module) => {

eval("// auto generated by build/layouts.js\n\n    function get() {\n      return `<section class=\"todoapp app-layout\">\r\n  <header class=\"header\">\r\n    <h1>todos</h1>\r\n  </header>\r\n  <!-- This section should be hidden by default and shown when there are todos -->\r\n  <section class=\"main\">\r\n\r\n  </section>\r\n  <!-- This footer should be hidden by default and shown when there are todos -->\r\n  <footer class=\"footer\">\r\n\r\n  </footer>\r\n</section>\r\n<footer class=\"info\">\r\n  <p>Double-click to edit a todo</p>\r\n  <p>Template by <a href=\"http://sindresorhus.com\">Sindre Sorhus</a></p>\r\n  <p>Created by <a href=\"http://todomvc.com\">you</a></p>\r\n  <p>Part of <a href=\"http://todomvc.com\">TodoMVC</a></p>\r\n</footer>\r\n`;\n   }\n\n   module.exports =  get;\n  \n\n//# sourceURL=webpack://beelinejs-todo-mvc/./src/layouts/app-layout/app-layout.html.js?");

/***/ }),

/***/ "./src/layouts/factory.js":
/*!********************************!*\
  !*** ./src/layouts/factory.js ***!
  \********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("// auto generated by build/layouts.js\n\nmodule.exports = get;\n\nconst layouts = {\n   'app-layout': __webpack_require__(/*! ./app-layout/app-layout.html.js */ \"./src/layouts/app-layout/app-layout.html.js\")\n};\n\nfunction get(type) {\n   if (layouts[type] == null) {\n      console.log('layout not found for ', type);\n   }\n\n   return layouts[type]();\n}\n\n//# sourceURL=webpack://beelinejs-todo-mvc/./src/layouts/factory.js?");

/***/ }),

/***/ "./src/data.json":
/*!***********************!*\
  !*** ./src/data.json ***!
  \***********************/
/***/ ((module) => {

"use strict";
eval("module.exports = JSON.parse('{\"models\":[{\"key\":\"Todos\",\"value\":[]}],\"views\":[{\"mKey\":\"Todos\",\"component\":\"TodoHeader\",\"parentPath\":\".todoapp .header\"},{\"mKey\":\"Todos\",\"component\":\"TodoItems\",\"parentPath\":\".todoapp .main\"},{\"mKey\":\"Todos\",\"component\":\"TodoFooter\",\"parentPath\":\".todoapp .footer\"}],\"layouts\":[{\"name\":\"app-layout\",\"parentPath\":\"#content\"}]}');\n\n//# sourceURL=webpack://beelinejs-todo-mvc/./src/data.json?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src;
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) {
/******/ 					var i = scripts.length - 1;
/******/ 					while (i > -1 && !scriptUrl) scriptUrl = scripts[i--].src;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/app.js");
/******/ 	
/******/ })()
;