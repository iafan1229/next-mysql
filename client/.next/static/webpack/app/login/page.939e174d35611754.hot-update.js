"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/login/page",{

/***/ "(app-client)/./context/auth.tsx":
/*!**************************!*\
  !*** ./context/auth.tsx ***!
  \**************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"AuthProvider\": function() { return /* binding */ AuthProvider; },\n/* harmony export */   \"useAuthDispatch\": function() { return /* binding */ useAuthDispatch; },\n/* harmony export */   \"useAuthState\": function() { return /* binding */ useAuthState; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-client)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"(app-client)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n\nvar _s = $RefreshSig$(), _s1 = $RefreshSig$(), _s2 = $RefreshSig$();\n\nconst StateContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)({\n    authenticated: false,\n    user: undefined,\n    loading: true\n});\nconst DispatchContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)(null);\nconst reducer = (state, param)=>{\n    let { type , payload  } = param;\n    switch(type){\n        case \"LOGIN\":\n            return {\n                ...state,\n                authenticated: true,\n                user: payload\n            };\n        case \"LOGOUT\":\n            return {\n                ...state,\n                authenticated: false,\n                user: null\n            };\n        case \"STOP_LOADING\":\n            return {\n                ...state,\n                loading: false\n            };\n        default:\n            throw new Error(\"unknown action type \".concat(type));\n    }\n};\nconst AuthProvider = (param)=>{\n    let { children  } = param;\n    _s();\n    const [state, defaultDispatch] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useReducer)(reducer, {\n        user: null,\n        authenticated: false,\n        loading: true\n    });\n    console.log(\"state\", state);\n    const dispatch = (type, payload)=>{\n        defaultDispatch({\n            type,\n            payload\n        });\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(DispatchContext.Provider, {\n        value: dispatch,\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(StateContext.Provider, {\n            value: state,\n            children: children\n        }, void 0, false, {\n            fileName: \"C:\\\\Users\\\\tg88\\\\Desktop\\\\next-mysql\\\\client\\\\context\\\\auth.tsx\",\n            lineNumber: 63,\n            columnNumber: 4\n        }, undefined)\n    }, void 0, false, {\n        fileName: \"C:\\\\Users\\\\tg88\\\\Desktop\\\\next-mysql\\\\client\\\\context\\\\auth.tsx\",\n        lineNumber: 62,\n        columnNumber: 3\n    }, undefined);\n};\n_s(AuthProvider, \"iHdNvyyAYldyaOLHFDAprdvWRbY=\");\n_c = AuthProvider;\nconst useAuthState = ()=>{\n    _s1();\n    return (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(StateContext);\n};\n_s1(useAuthState, \"gDsCjeeItUuvgOWf1v4qoK9RF6k=\");\nconst useAuthDispatch = ()=>{\n    _s2();\n    return (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(DispatchContext);\n};\n_s2(useAuthDispatch, \"gDsCjeeItUuvgOWf1v4qoK9RF6k=\");\nvar _c;\n$RefreshReg$(_c, \"AuthProvider\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1jbGllbnQpLy4vY29udGV4dC9hdXRoLnRzeC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFxRTtBQWNyRSxNQUFNSSw2QkFBZUgsb0RBQWFBLENBQVE7SUFDekNJLGVBQWUsS0FBSztJQUNwQkMsTUFBTUM7SUFDTkMsU0FBUyxJQUFJO0FBQ2Q7QUFFQSxNQUFNQyxnQ0FBa0JSLG9EQUFhQSxDQUFNLElBQUk7QUFNL0MsTUFBTVMsVUFBVSxDQUFDQyxlQUE0QztRQUE5QixFQUFFQyxLQUFJLEVBQUVDLFFBQU8sRUFBVTtJQUN2RCxPQUFRRDtRQUNQLEtBQUs7WUFDSixPQUFPO2dCQUNOLEdBQUdELEtBQUs7Z0JBQ1JOLGVBQWUsSUFBSTtnQkFDbkJDLE1BQU1PO1lBQ1A7UUFDRCxLQUFLO1lBQ0osT0FBTztnQkFDTixHQUFHRixLQUFLO2dCQUNSTixlQUFlLEtBQUs7Z0JBQ3BCQyxNQUFNLElBQUk7WUFDWDtRQUNELEtBQUs7WUFDSixPQUFPO2dCQUNOLEdBQUdLLEtBQUs7Z0JBQ1JILFNBQVMsS0FBSztZQUNmO1FBQ0Q7WUFDQyxNQUFNLElBQUlNLE1BQU0sdUJBQTRCLE9BQUxGLE9BQVE7SUFDakQ7QUFDRDtBQUVPLE1BQU1HLGVBQWUsU0FBaUQ7UUFBaEQsRUFBRUMsU0FBUSxFQUFpQzs7SUFDdkUsTUFBTSxDQUFDTCxPQUFPTSxnQkFBZ0IsR0FBR2YsaURBQVVBLENBQUNRLFNBQVM7UUFDcERKLE1BQU0sSUFBSTtRQUNWRCxlQUFlLEtBQUs7UUFDcEJHLFNBQVMsSUFBSTtJQUNkO0lBQ0FVLFFBQVFDLEdBQUcsQ0FBQyxTQUFTUjtJQUNyQixNQUFNUyxXQUFXLENBQUNSLE1BQWNDLFVBQWtCO1FBQ2pESSxnQkFBZ0I7WUFBRUw7WUFBTUM7UUFBUTtJQUNqQztJQUNBLHFCQUNDLDhEQUFDSixnQkFBZ0JZLFFBQVE7UUFBQ0MsT0FBT0Y7a0JBQ2hDLDRFQUFDaEIsYUFBYWlCLFFBQVE7WUFBQ0MsT0FBT1g7c0JBQVFLOzs7Ozs7Ozs7OztBQUd6QyxFQUFFO0dBZldEO0tBQUFBO0FBaUJOLE1BQU1RLGVBQWUsSUFBTXBCOztJQUFBQSxPQUFBQSxpREFBVUEsQ0FBQ0M7QUFBWSxFQUFFO0lBQTlDbUI7QUFDTixNQUFNQyxrQkFBa0IsSUFBTXJCOztJQUFBQSxPQUFBQSxpREFBVUEsQ0FBQ007QUFBZSxFQUFFO0lBQXBEZSIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9jb250ZXh0L2F1dGgudHN4PzhjMWYiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IGNyZWF0ZUNvbnRleHQsIHVzZVJlZHVjZXIsIHVzZUNvbnRleHQgfSBmcm9tICdyZWFjdCc7XHJcblxyXG5pbnRlcmZhY2UgU3RhdGUge1xyXG5cdGF1dGhlbnRpY2F0ZWQ6IGJvb2xlYW47XHJcblx0dXNlcjogVXNlciB8IHVuZGVmaW5lZDtcclxuXHRsb2FkaW5nOiBib29sZWFuO1xyXG59XHJcbmludGVyZmFjZSBVc2VyIHtcclxuXHRuYW1lOiBzdHJpbmc7XHJcblx0ZW1haWw6IHN0cmluZztcclxuXHRjcmVhdGVkQXQ6IHN0cmluZztcclxuXHR1cGRhdGVkQXQ6IHN0cmluZztcclxufVxyXG5cclxuY29uc3QgU3RhdGVDb250ZXh0ID0gY3JlYXRlQ29udGV4dDxTdGF0ZT4oe1xyXG5cdGF1dGhlbnRpY2F0ZWQ6IGZhbHNlLFxyXG5cdHVzZXI6IHVuZGVmaW5lZCxcclxuXHRsb2FkaW5nOiB0cnVlLFxyXG59KTtcclxuXHJcbmNvbnN0IERpc3BhdGNoQ29udGV4dCA9IGNyZWF0ZUNvbnRleHQ8YW55PihudWxsKTtcclxuXHJcbmludGVyZmFjZSBBY3Rpb24ge1xyXG5cdHR5cGU6IHN0cmluZztcclxuXHRwYXlsb2FkOiBhbnk7XHJcbn1cclxuY29uc3QgcmVkdWNlciA9IChzdGF0ZTogU3RhdGUsIHsgdHlwZSwgcGF5bG9hZCB9OiBBY3Rpb24pID0+IHtcclxuXHRzd2l0Y2ggKHR5cGUpIHtcclxuXHRcdGNhc2UgJ0xPR0lOJzpcclxuXHRcdFx0cmV0dXJuIHtcclxuXHRcdFx0XHQuLi5zdGF0ZSxcclxuXHRcdFx0XHRhdXRoZW50aWNhdGVkOiB0cnVlLFxyXG5cdFx0XHRcdHVzZXI6IHBheWxvYWQsXHJcblx0XHRcdH07XHJcblx0XHRjYXNlICdMT0dPVVQnOlxyXG5cdFx0XHRyZXR1cm4ge1xyXG5cdFx0XHRcdC4uLnN0YXRlLFxyXG5cdFx0XHRcdGF1dGhlbnRpY2F0ZWQ6IGZhbHNlLFxyXG5cdFx0XHRcdHVzZXI6IG51bGwsXHJcblx0XHRcdH07XHJcblx0XHRjYXNlICdTVE9QX0xPQURJTkcnOlxyXG5cdFx0XHRyZXR1cm4ge1xyXG5cdFx0XHRcdC4uLnN0YXRlLFxyXG5cdFx0XHRcdGxvYWRpbmc6IGZhbHNlLFxyXG5cdFx0XHR9O1xyXG5cdFx0ZGVmYXVsdDpcclxuXHRcdFx0dGhyb3cgbmV3IEVycm9yKGB1bmtub3duIGFjdGlvbiB0eXBlICR7dHlwZX1gKTtcclxuXHR9XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgQXV0aFByb3ZpZGVyID0gKHsgY2hpbGRyZW4gfTogeyBjaGlsZHJlbjogUmVhY3QuUmVhY3ROb2RlIH0pID0+IHtcclxuXHRjb25zdCBbc3RhdGUsIGRlZmF1bHREaXNwYXRjaF0gPSB1c2VSZWR1Y2VyKHJlZHVjZXIsIHtcclxuXHRcdHVzZXI6IG51bGwsXHJcblx0XHRhdXRoZW50aWNhdGVkOiBmYWxzZSxcclxuXHRcdGxvYWRpbmc6IHRydWUsXHJcblx0fSk7XHJcblx0Y29uc29sZS5sb2coJ3N0YXRlJywgc3RhdGUpO1xyXG5cdGNvbnN0IGRpc3BhdGNoID0gKHR5cGU6IHN0cmluZywgcGF5bG9hZD86IGFueSkgPT4ge1xyXG5cdFx0ZGVmYXVsdERpc3BhdGNoKHsgdHlwZSwgcGF5bG9hZCB9KTtcclxuXHR9O1xyXG5cdHJldHVybiAoXHJcblx0XHQ8RGlzcGF0Y2hDb250ZXh0LlByb3ZpZGVyIHZhbHVlPXtkaXNwYXRjaH0+XHJcblx0XHRcdDxTdGF0ZUNvbnRleHQuUHJvdmlkZXIgdmFsdWU9e3N0YXRlfT57Y2hpbGRyZW59PC9TdGF0ZUNvbnRleHQuUHJvdmlkZXI+XHJcblx0XHQ8L0Rpc3BhdGNoQ29udGV4dC5Qcm92aWRlcj5cclxuXHQpO1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IHVzZUF1dGhTdGF0ZSA9ICgpID0+IHVzZUNvbnRleHQoU3RhdGVDb250ZXh0KTtcclxuZXhwb3J0IGNvbnN0IHVzZUF1dGhEaXNwYXRjaCA9ICgpID0+IHVzZUNvbnRleHQoRGlzcGF0Y2hDb250ZXh0KTtcclxuIl0sIm5hbWVzIjpbIlJlYWN0IiwiY3JlYXRlQ29udGV4dCIsInVzZVJlZHVjZXIiLCJ1c2VDb250ZXh0IiwiU3RhdGVDb250ZXh0IiwiYXV0aGVudGljYXRlZCIsInVzZXIiLCJ1bmRlZmluZWQiLCJsb2FkaW5nIiwiRGlzcGF0Y2hDb250ZXh0IiwicmVkdWNlciIsInN0YXRlIiwidHlwZSIsInBheWxvYWQiLCJFcnJvciIsIkF1dGhQcm92aWRlciIsImNoaWxkcmVuIiwiZGVmYXVsdERpc3BhdGNoIiwiY29uc29sZSIsImxvZyIsImRpc3BhdGNoIiwiUHJvdmlkZXIiLCJ2YWx1ZSIsInVzZUF1dGhTdGF0ZSIsInVzZUF1dGhEaXNwYXRjaCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(app-client)/./context/auth.tsx\n"));

/***/ })

});