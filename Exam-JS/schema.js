class Airport {
    name;

    getFirstname() {
        return this.name.split(" ")[0];
    }

    constructor(name) {
        this.name = name;
    }

    static from(data) {
        return new Airport(
            data.name
        );
    }
}

class DbContext {

    static DB_NAME = "airports";
    static VERSION = 1;
  
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
          const store = db.createObjectStore("airports", {
            autoIncrement: true
          });
        }
      }
    }
  
    clear() {
      return new Promise((resolve, reject) => {
        const transaction = this.db.transaction("airports", "readwrite");
  
        transaction.addEventListener("complete", e => {
          console.log("DbContext", "Очистили", e);
          resolve();
        });
  
        transaction.addEventListener("error", e => {
          reject(e);
        });
    
        const store = transaction.objectStore("airports");
  
        store.clear();
      });
    }
  
    seed(mockAirports) {
      return new Promise((resolve, reject) => {
        const transaction = this.db.transaction("airports", "readwrite");
  
        transaction.addEventListener("complete", e => {
          console.log("DbContext", "Cохранили", e);
          resolve();
        });
  
        transaction.addEventListener("error", e => {
          reject(e);
        });
    
        const store = transaction.objectStore("airports");
  
        store.count().onsuccess = e => {
          if (e.target.result > 0) {
            return;
          }
  
          mockAirports(10).forEach(airport => {
            store.add(airport);
          });
        }
  
      });
    }
  
    findContacts(predicate) {
      return new Promise((resolve, reject) => {
        const transaction = this.db.transaction("airports", "readonly");
  
        const result = [];
  
        transaction.addEventListener("complete", e => {
          console.log("DbContext", "Нашли", e);
          resolve(result);
        });
  
        transaction.addEventListener("error", e => {
          reject(e);
        });
    
        const store = transaction.objectStore("airports");
  
        store.openCursor().onsuccess = e => {
          var cursor = e.target.result;
          if (cursor) {
            const value = Airport.from(cursor.value);
  
            predicate(value) && (result.push(value));
  
            cursor.continue();
          } 
        }
  
      });
    }
  
  
    listRandom(n) {
      return new Promise((resolve, reject) => {
        const transaction = this.db.transaction("airports", "readonly");
  
        const result = [];
  
        transaction.addEventListener("complete", e => {
          console.log("DbContext", "Нашли", result, e);
          resolve(result);
        });
  
        transaction.addEventListener("error", e => {
          reject(e);
        });
    
        const store = transaction.objectStore("airports");
        
        // Достать N случайных контактов
        store.getAllKeys().onsuccess = e => {
          const ids = e.target.result;
  
          Array.from({ length: n })
            .map(() => {
              const index = randomInt(0, ids.length - 1);
              const [id] = ids.splice(index, 1);
              return id;
            })
            .forEach(id => {
              store.get(id).onsuccess = e => {
                result.push(e.target.result);
              }
            });
        };
  
  
  
      });
    }
  
    
  }