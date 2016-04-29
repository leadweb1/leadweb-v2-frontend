/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var locales = [
    'en',
    'fr',
];

var appConfig = {
  clientId: 'NOT-SET',
  timeout :  30,
  project : 'leadweb-v2',
  gaUa    : 'UA-64984920-2',
  postUrl : 'http://astral-analytics.picard.lead-web.com/post-session',
  postKey : '_ujWA-rIA8IQfUD1',
  //driveUrl: 'https://spreadsheets.google.com/feeds/list/1I3ymWKzSZHpV4wicdLLpbmBjLaOhUp7aXncA3W9j_Ok/'
  apiUrl  : 'http://localhost:8000',
  facebookAppId: '1601298056859713',
  stateUrlLangPrefix: '/{lang:(?:'+locales.join('|')+')}',
  defaultLocale: locales[0],
  locales: locales,
};