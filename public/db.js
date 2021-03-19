let db;
// create a new db request for a "budget" database.
const request = indexedDB.open("budget", 1);

request.onupgradeneeded = function(event) {
   // create object store called "pendingTransactions" and set autoIncrement to true
  const db = event.target.result;
  db.createObjectStore("pendingTransactions", { autoIncrement: true });
};

request.onsuccess = function(event) {
  db = event.target.result;

  // check if app is online before reading from db
  if (navigator.onLine) {
    checkDatabase();
  }
};

request.onerror = function(event) {
  console.log("Uh oh! You have an error: " + event.target.errorCode);
};

function saveRecord(record) {
  // create a transaction on the pendingTransactions db with readwrite access
  const transaction = db.transaction(["pendingTransactions"], "readwrite");

  // access the pendingTransactions object store
  const store = transaction.objectStore("pendingTransactions");

  // add record to the store with add method.
  store.add(record);
}

function checkDatabase() {
  // open a transaction on the pendingTransactions db
  const transaction = db.transaction(["pendingTransactions"], "readwrite");
  // access the pendingTransactions object store
  const store = transaction.objectStore("pendingTransactions");
  // get all records from the store and set to a variable
  const getAll = store.getAll();

  getAll.onsuccess = function() {
    if (getAll.result.length > 0) {
      fetch("/api/transaction/bulk", {
        method: "POST",
        body: JSON.stringify(getAll.result),
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json"
        }
      })
      .then(response => response.json())
      .then(() => {
        // if successful, open a transaction on the pendingTransactions db
        const transaction = db.transaction(["pendingTransactions"], "readwrite");

        // access the pendingTransactions object store
        const store = transaction.objectStore("pendingTransactions");

        // clear all items in the store
        store.clear();
      });
    }
  };
}

// listen for app coming back online
window.addEventListener("online", checkDatabase);
