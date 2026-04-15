// var generateName = require('sillyname');

import generateName from "sillyname";
var sillyName = generateName();
console.log(sillyName);

import superheroes from 'superheroes';
// console.log(superheroes); // it returns an array. 

var random = Math.floor(Math.random() * superheroes.length);
console.log(superheroes[random]);

import {randomSuperhero} from 'superheroes';
var hero = randomSuperhero();
console.log(hero);
