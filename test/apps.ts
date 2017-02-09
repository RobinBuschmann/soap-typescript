import * as express from 'express';
import {ExampleController} from "./controllers/ExampleController";
import {soap, ISoapOptions} from "../index";

export const SOAP_PATH = '/soap';

const app = express();
const exampleController = new ExampleController();

app.use(SOAP_PATH, soap(exampleController));

const injectorMock = {
  get(_class: new(...args: any[]) => any): any {
    return new _class();
  }
};

const appWithInjector = express();
const options: ISoapOptions = {injector: injectorMock, forceHttpsForAddressLocation: true};

appWithInjector.use(SOAP_PATH, soap(ExampleController, options));

const appWithInjectorGetter = express();
const appWithInjectorGetterOptions: ISoapOptions = {injectorGetter: injectorMock.get};

appWithInjectorGetter.use(SOAP_PATH, soap(ExampleController, appWithInjectorGetterOptions));

export const apps: Array<{description: string; value: express.Application, options: ISoapOptions}> = [
  {description: 'app', value: app, options: {}},
  {description: 'app with injector and forced https', value: appWithInjector, options},
  {description: 'app with injector getter', value: appWithInjectorGetter, options: appWithInjectorGetterOptions},
];

