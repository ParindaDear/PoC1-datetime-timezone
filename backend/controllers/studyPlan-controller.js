var service = require("../services/studyPlan-service.js");

module.exports = {
  create: async function (req, res) {
    const newPlan = req.body
    try {
      const created = await service.createStudyPlan(newPlan);
      res.status(201).json(created)

    } catch (e) {
      const status = e.status || (e.code === "ER_DUP_ENTRY" ? 409 : 500);
      res.status(status).json({
        error: {
          code: e.code || "SERVER_ERROR",
          message: e.message || "Error creating study plan",
          status: status
        }
      });
    }
  },
};
