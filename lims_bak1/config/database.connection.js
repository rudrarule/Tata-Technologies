module.exports = {
  user: process.env.ORACLE_USER || "system",
  password: process.env.ORACLE_PASSWORD || "rudrax",
  connectString: "localhost:1521/orcl",
};
