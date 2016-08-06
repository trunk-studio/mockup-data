import * as randamData from './randamData.js'
import Random from 'random-js'

export default class HelloWord {



  constructor({params, count}) {
    this.nameData = randamData.nameData;
    this.params = params;
    this.count = count;
    this.sequence = 0;
    this.data = [];
    this.random = new Random();
  }

  processRandamData() {
    this.data = Array.from(new Array(this.count)).map((row) => {
      row = {};

      this.params.cols.forEach((col) => {
        let type = col.type;
        row[col.key] = this._getColData({type, col});
      });

      return row;
    });
  }

  getData(){
    return this.data;
  }

  _getColData({type, col}) {
    let colData = null;
    switch (type) {
      case "sequence":
        colData = this._sequence({col});
        break;
      case "number":
        colData = this._number({col});
        break;
      case "name":
        colData = this._name({col});
        break;
      default:
        colData = ""
    }
    return colData;
  }
  _sequence() {
    let seq = this.sequence;
    this.sequence += 1;
    return seq;
  }
  _number({col}) {
    let max = parseInt(col.format.split("#").join(9));
    let result =  this.random.integer(0, max);
  }

  _name({col}) {
    let nameDataLang = this.nameData[col.lang];
    let max = nameDataLang.length;
    let index =  this.random.integer(0, max);
    let result =  nameDataLang[index];

    return result;
  }


}
