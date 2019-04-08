const Icon = require('./models/Icon');
const icons = require('./util/icons');
const INIT_ICONS = 'INIT_ICONS';

/**
 * @desc Init database based on parameters
 * @params string
 * @return void
 * @values 'INIT_ICONS'
 */

class StartupSchema {
  constructor(startupElements){
    this.startupElements = startupElements;
    this.startupInit(this.startupElements);
  }
  startupInit (initValue) {
    switch(initValue){
      case INIT_ICONS:
        this.initIconsSchema();
      break;
      default:
      break;
    }
  }

  initIconsSchema (){
    const iconFields = {};
    let loadingIcons = new Promise (()=>{ 
        icons.map (icon => {
            iconFields.name = icon.name;
            iconFields.type = icon.type;
            iconFields.icon = icon.icon;
            console.log(iconFields)
            new Icon(iconFields).save();
        })
    });
    loadingIcons.then(console.log('Icons Filled')).catch(err=>console.log(err));
  }
}


const initDb = new StartupSchema(INIT_ICONS);