const mongoose = require("mongoose");
const { MONGODB_URL } = require("./server.config.js");

let instance; // stores db instance

class DatabaseConn {
  #isConnected;
  constructor(db_uri) {
    if (instance) {
      throw new Error("can not have multiple db connections");
    }
    this.uri = db_uri;
    instance = this;
    this.#isConnected = false;
  }

  async connect() {
    if (this.#isConnected) {
      throw new Error("already connected to the database");
    }
    await mongoose.connect(MONGODB_URL);
    console.log("connected to mongodb database");
    this.#isConnected = true;
  }

  async disconnect() {
    this.isConnected = false;
  }
}

const db = Object.freeze(new DatabaseConn());
module.exports = db;
