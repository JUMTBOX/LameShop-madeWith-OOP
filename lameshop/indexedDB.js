const dbReq = indexedDB.open("storageDummy", 1);

dbReq.onupgradeneeded = function (event) {
  const db = event.target.result;
  const objStore = db.createObjectStore("products", { keyPath: "id" });

  objStore.transaction.oncomplete = function () {
    const productsStore = db
      .transaction("products", "readwrite")
      .objectStore("products");

    productsStore.add({
      id: "p1",
      title: "A First Product",
      price: 12.99,
      tags: ["Expensive", "Luxury"],
    });
  };
};

dbReq.onerror = function (event) {
  console.log("error");
};
