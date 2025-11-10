const router = require("express").Router();
const modelFunctions = require("./accounts-model");
const {
  checkAccountPayload,
  checkAccountNameUnique,
  checkAccountId,
} = require("./accounts-middleware");

router.get("/", async (req, res, next) => {
  try {
    res.json(await modelFunctions.getAll());
  } catch (error) {
    next(error);
  }
});

router.get("/:id", checkAccountId, (req, res) => {
  res.json(req.Account);
});

router.post(
  "/",
  checkAccountPayload,
  checkAccountNameUnique,
  async (req, res, next) => {
    try {
      res.status(201).json(await modelFunctions.create(req.body));
    } catch (err) {
      next(err);
    }
  }
);

router.put(
  "/:id",
  checkAccountId,
  checkAccountPayload,
  checkAccountNameUnique,
  async (req, res, next) => {
    try {
      res.json(await modelFunctions.updateById(req.params.id, req.body));
    } catch (error) {
      next(error);
    }
  }
);

router.delete("/:id", checkAccountId, async (req, res, next) => {
  try {
    await modelFunctions.deleteById(req.params.id);
    res.json({ message: `${req.Account.name} deleted` });
  } catch (error) {
    next(error);
  }
});

router.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message,
  });
});

module.exports = router;
