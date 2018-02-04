const db = require('../util/dbhelper.js');
/**
* 
* @returns {any}
*/
module.exports = async (context) => {
  try {
    let test = await db.setUser(12345678, 'food', 'ARC');
    return test;
  }catch(err){
    return err;
  }
  
};