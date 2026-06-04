/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Ingredient {
  name: string;
  icon: string;
  desc: string;
}

export interface ScentNote {
  id: 'top' | 'heart' | 'base';
  title: string;
  subtitle: string;
  olfactoryDesc: string;
  philosophy: string;
  ingredients: Ingredient[];
  color: string;
  bgGradient: string;
}

export interface AstronomerMoment {
  id: string;
  year: number;
  name: string;
  title: string;
  text: string;
  historicalVignette: string;
  scientificDiscovery: string;
  ambience: string;
  coordinates: string;
}

export interface PlanetData {
  id: string;
  name: string;
  symbol: string;
  distance: number; // orbital radius in relative units
  speed: number;    // orbital speed factor
  size: number;     // radius in px
  color: string;
  quote: string;
  context: string;
  details: string;
}
