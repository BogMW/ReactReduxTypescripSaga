/* eslint-disable */
/// <reference types="react-scripts" />

interface Window {
    VERSION: string;
    REACT_APP_BASE_URL: string;
    AUTH_SERVICE_URL: string;
    API_BASE_URL: string;
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: <R>(a: R) => R;
}

declare var window: Window;