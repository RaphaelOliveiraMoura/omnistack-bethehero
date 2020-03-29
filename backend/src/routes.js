import { Router } from 'express';

import OngController from './controllers/OngController';
import IncidentController from './controllers/IncidentController';
import ProfileController from './controllers/ProfileController';
import SessionController from './controllers/SessionController';

import checkAuthorizationHeader from './validators/checkAuthorizationHeader';
import checkIdParam from './validators/checkIdParam';
import checkPageQuery from './validators/checkPageQuery';
import checkCreateOngBody from './validators/checkCreateOngBody';

const routes = Router();

routes.post('/sessions', SessionController.create);

routes.get('/ongs', OngController.index);

routes.post('/ongs', checkCreateOngBody, OngController.create);

routes.get('/incidents', checkPageQuery, IncidentController.index);

routes.post('/incidents', IncidentController.create);

routes.delete('/incidents/:id', checkIdParam, IncidentController.delete);

routes.get('/profile', checkAuthorizationHeader, ProfileController.index);

export default routes;
