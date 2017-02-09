import * as express from 'express';
import * as http from 'http';
import {soap} from "../index";
import {CalculatorController} from "./controllers/CalculatorController";

const app = express();
const calculatorController = new CalculatorController();

app.use('/calculation', soap(calculatorController));

/* tslint:disable:no-console */
http
  .createServer(app)
  .listen(3000, () => console.log('Soap server listening'))
;

