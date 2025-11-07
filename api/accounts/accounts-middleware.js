const modelFunctions = require("./accounts-model");

exports.checkAccountPayload = (req, res, next) => {
  try {
    const { name, budget } = req.body;

    if (name === undefined || budget === undefined) {
      return res.status(400).json({ message: "name and budget are required" });
    }

    const nameLast = name.trim();
    if (nameLast.length < 3 || nameLast.length > 100) {
      return res
        .status(400)
        .json({ message: "name of account must be between 3 and 100" });
    }

    if (typeof budget !== "number") {
      return res
        .status(400)
        .json({ message: "budget of account must be a number" });
    }

    if (budget < 0 || budget > 1000000) {
      return res
        .status(400)
        .json({ message: "budget of account is too large or too small" });
    }

    req.body.name = nameLast;
    next();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.checkAccountNameUnique = async (req, res, next) => {
  try {
    const name = req.body?.name?.trim();
    if (!name) {
      return res.status(400).json({ message: "name is required" });
    }

    const taken = await modelFunctions.getByName(name);
    if (taken) {
      return res.status(400).json({ message: "that name is taken" });
    }

    req.body.name = name;
    next();
  } catch (err) {
    res.status(400).json({ message: error.message });
  }
};

exports.checkAccountId = async (req, res, next) => {
  try {
    const account = await modelFunctions.getById(req.params.id);
    if (!account) {
      return res.status(404).json({ message: "account not found" });
    }

    req.Account = account;
    next();
  } catch (err) {
    next(err);
  }
};
