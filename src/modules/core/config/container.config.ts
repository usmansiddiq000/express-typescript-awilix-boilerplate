import {createContainer, InjectionMode, asValue, asClass} from 'awilix';
import express from 'express';
import mongoose from 'mongoose';
import ExpressApp from '../../../../app';


const container = createContainer({
  injectionMode: InjectionMode.PROXY,
});

console.log('Registering dependencies...');

container.register({
  app: asValue(express()),
  expressApp: asClass(ExpressApp),
  mongoose: asValue(mongoose),
});


export default container;
