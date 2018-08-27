import { targetAPI } from './config.js';

const fetchSettings = {
    method: "GET",
    headers: {
        Accept: "application/json; odata=verbose"
    }
};

const doFetch = (url) => {
    return fetch(new Request(url, fetchSettings))
        .then(response => {
            if (response.status >= 400) {
                throw new Error("Bad response from server");
            }
            return response.json();
        })
        .then(data => {
            return data;
        });
};

export const getTarget = () => {
    return doFetch(targetAPI);
};

