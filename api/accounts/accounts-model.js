const db = require("../../data/db-config");

const getAll = async () => {
  return await db("accounts");
};

const getById = async (id) => {
  return await db("accounts").where("id", id).first();
};

const getByName = async (name) => {
  return await db("accounts").where("name", name).first();
};

const create = async (account) => {
  const [id] = await db("accounts").insert(account);
  return await getById(id);
};

const updateById = async (id, account) => {
  await db("accounts").where("id", id).update(account);
  return await getById(id);
};

const deleteById = async (id) => {
  return await db("accounts").where("id", id).del();
};

module.exports = {
  getAll,
  getById,
  getByName,
  create,
  updateById,
  deleteById,
};
