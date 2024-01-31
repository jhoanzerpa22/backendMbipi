module.exports = {

  //Local
  //HOST: "dpg-ceg740la499e21rqul70-a",
  //USER: "mbipi_user",
  //PASSWORD: "3W5lc8dEtIbCDFClfQoScWNmQ0nqKWcs",
  //DB: "mbipi",
  //PORT: 5432,

//Heroku
  /*
  USER: "mtaligncgdmqzd",
  PASSWORD: "1ee6689d3e58a91bbb1da37be35d36191b1d3db6ba0bfa07f4e9bebb0b046e1c",
  DB: "d143lrl2dkme0e",
  HOST: "ec2-3-225-110-188.compute-1.amazonaws.com",*/
  //PORT: 5432,

  //Produccion
  //HOST: "45.7.229.117",
  //USER: "tresidea_mbipidb",
  //PASSWORD: "k{ndin[m}maR",
  //DB: "tresidea_mbipi",

  //NEW 2024
    HOST: 'mydbinstance.cx8veodvooht.us-east-2.rds.amazonaws.com',
    USER: 'gqbcuhhtuzirgfv',
    PASSWORD: 'passwordmaster',
    DB: 'mbipi',
    
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
