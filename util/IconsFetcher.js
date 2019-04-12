const fs = require('fs');
/**
 * @params {string} folderPath
 *
 */
module.exports = class IconFetcher {
  constructor(folderPath){
    this.folderPath = folderPath;
    this.isValid = this.validator(folderPath);
    this.fileNamesArray = [];
    //Check if path is a valid parameter and scan for files if so
    if(this.isValid===true){
      this.fileNamesArray = this.scanFolderForFiles(this.folderPath);
    }
    
  }
  
  /**
   * Check if parameter is a string
   * @param {*} param 
   * @return true || error
   */
  validator (param) {
    const parameter = param;
    if(typeof parameter !== 'string'){
      throw new Error('The folder path must be a string');
    }else{
      return true;
    }
  }

  /**
   * Check for files in the folder and return the array
   * @param {string} path 
   * @return {array} filesArray
   */
  scanFolderForFiles (path) {
    let filesArray = [];
    fs.readdirSync(path).forEach(file => {
          const fileName = file.split('.').slice(0,-1).join('.');
          filesArray.push(fileName);
    })
    return filesArray;
  }
}

