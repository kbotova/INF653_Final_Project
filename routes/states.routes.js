const { Router } = require('express');
const statesController = require('../controllers/states.controller');
const checkStateMiddleware = require('../middlewares/check-state.middleware');

const statesRouter = new Router();

statesRouter.get('/', statesController.getAll);
statesRouter.get('/:state', checkStateMiddleware, statesController.getById);
statesRouter.get('/:state/funfact', checkStateMiddleware, statesController.getFunfact);
statesRouter.get('/:state/capital', checkStateMiddleware, statesController.getCapital);
statesRouter.get('/:state/nickname', checkStateMiddleware, statesController.getNickname);
statesRouter.get('/:state/population', checkStateMiddleware, statesController.getPopulation);
statesRouter.get('/:state/admission', checkStateMiddleware, statesController.getAdmission);

statesRouter.post('/:state/funfact', checkStateMiddleware, statesController.createFunfacts);

statesRouter.patch('/:state/funfact', checkStateMiddleware, statesController.updateFunfact);

statesRouter.delete('/:state/funfact', checkStateMiddleware, statesController.deleteFunfact);

module.exports = statesRouter;
