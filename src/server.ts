process.env['NODE_CONFIG_DIR'] = __dirname + '/configs';

import 'dotenv/config';
import App from '@/app';
import AuthRoute from '@routes/auth.route';
import IndexRoute from '@routes/index.route';
import ApiRoute from '@routes/api.route';
import WeatherRoute from '@routes/weather.route';
import AdminRoute from '@routes/admin.route';
import UsersRoute from '@routes/users.route';
import validateEnv from '@utils/validateEnv';

validateEnv();

const app = new App([new IndexRoute(), new AuthRoute(), new ApiRoute([new WeatherRoute()]), new AdminRoute([new UsersRoute()])]);

app.listen();
