import { TIMEOUT } from "./config";

export const sendJSON = async function (url, payload) {
    try {
        const fetchPro = fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        })

        const res = await Promise.race([fetchPro, timeout(TIMEOUT)]);
        const data = await res.json();

        if (!res.ok) throw new Error(`${data.message} (${res.status})`)

        return data;
    } catch (error) {
        throw error;
    }
}

export const getJSON = async function (url) {
    try {
        const res = await Promise.race([fetch(url), timeout(TIMEOUT)]);
        const data = await res.json();

        if (!res.ok) throw new Error(`${data.message} (${res.status})`)

        return data;
    } catch (error) {
        throw error;
    }
}

export const timeout = function (s) {
    return new Promise(function (_, reject) {
        setTimeout(function () {
            reject(new Error(`Request took too long! Timeout after ${s} second`));
        }, s * 1000);
    });
};