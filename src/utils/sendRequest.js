export default function sendRequest(url, method) {
    return fetch(url, {
        headers: {
            'Content-Type': 'application/json'
        },
    }).then(response => {
        return response.json();
    })
}