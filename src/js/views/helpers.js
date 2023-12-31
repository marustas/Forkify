import { TIMEOUT } from "../config";

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