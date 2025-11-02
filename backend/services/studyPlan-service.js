var repo = require("../repositories/studyPlan-repository.js");

function validateStudyPlanBody(plan) {
  if (!plan.plan_code || !plan.name_eng || !plan.name_th) {
    const err = new Error("Bad Request: empty body")
    err.status = 400;
    throw err;
  }
}

module.exports = {
  createStudyPlan: async function (plan) {
    validateStudyPlanBody(plan)
    const created = await repo.save(plan)
    return created
  },
};
