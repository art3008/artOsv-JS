class DbContext {
    static DB_NAME = "comments";
    static VERSION = 2;
    /**
   * @type {IDBDatabase}
   */
    db;
    constructor(db) {
        this.db = db;
    }
    static open() {
        return new Promise((resolve, reject) => {
            const request = window.indexedDB.open(DbContext.DB_NAME, DbContext.VERSION);
            request.addEventListener("error", (e) => {
                console.log(request, e);
                reject(e);
            });
            request.addEventListener("success", (e) => {
                console.log("asd");
                const db = request.result;
                db.addEventListener("error", e => {
                    console.log("DbContext", "Error", e);
                });
                resolve(new DbContext(db));
            });
            request.addEventListener("upgradeneeded", DbContext.upgrade);
        });
    }
    /**
     * @param {IDBVersionChangeEvent} e 
     */
    static upgrade(e) {
        console.log("DbContext", `Upgrade from ${e.oldVersion} to ${e.newVersion}`);
        // e.target.transaction.abort();
        const db = e.target.result;
        switch (e.oldVersion) {
            case 0:
            case 1: {
                const store = db.createObjectStore("comments", {
                    autoIncrement: true
                });
            }
        }
    }
    addCommentsFromFile(comments) {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction("comments", "readwrite");
            transaction.addEventListener("complete", e => {
                console.log("DbContext", "Cохранили", e);
                resolve();
            });
            transaction.addEventListener("error", e => {
                reject(e);
            });
            const store = transaction.objectStore("comments");
            store.count().onsuccess = e => {
                if (e.target.result > 0) {
                    console.log(e.target.result);
                    return;
                }
                comments.forEach(comment => {
                    store.add(comment);
                });
            }
        });
    }
    addNewComment(comment) {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction("comments", "readwrite");
            transaction.addEventListener("complete", e => {
                console.log("DbContext", "Cохранили", e);
                resolve();
            });
            transaction.addEventListener("error", e => {
                reject(e);
            });
            const store = transaction.objectStore("comments");
            store.count().onsuccess = e => {
                store.add(comment);
            }
        });

    }
    clear() {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction("comments", "readwrite");
            transaction.addEventListener("complete", e => {
                console.log("DbContext", "Очистили", e);
                resolve();
            });
            transaction.addEventListener("error", e => {
                reject(e);
            });
            const store = transaction.objectStore("comments");
            store.clear();
        });
    }
}