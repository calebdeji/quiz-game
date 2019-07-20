var ejo = window.indexedDB.open("counter", 1);

ejo.onupgradeneeded = event => {
    let db = event.target.result;
    let objectStore = db
        .transaction(["id-getQuestion"], "readwrite")
        .objectStore("id-getQuestion");
    objectStore.clear();
};