import './app.scss';
import angular from 'angular';
import { appConfig, appRun, bootstrap } from './app.utils';

window.localforageSerializer = require('localforageSerializer');

const appModule = angular.module('Touriscopie', ['ionic', 'js-data', 'jett.ionic.filter.bar', 'ngCordova'])
  .config(appConfig)
  .run(appRun);

bootstrap(appModule);

export default appModule;
