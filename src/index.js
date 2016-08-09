import * as randamData from './randamData.js'
import Random from 'random-js'
import moment from 'moment'


export default class RandamData {

  constructor({params, count}) {
    this.nameData = randamData.nameData;
    this.params = params;
    this.count = count;
    this.sequence = 1;
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
    if(this["_"+type] != undefined)
      colData = this["_"+type]({col});
    else colData = ""
    return colData;
  }
  _sequence() {
    let seq = this.sequence;
    this.sequence += 1;
    return seq;
  }
  _number({col}) {
    let max = parseInt(col.format.split("#").join(9));
    let result = this.random.integer(0, max);
    return result;
  }

  _name({col}) {
    let nameDataLang = this.nameData[col.lang];
    let max = nameDataLang.length - 1;
    let index = this.random.integer(0, max);
    let result = nameDataLang[index];

    return result;
  }

  _static({col}) {
    let result = col.text;
    return result;
  }

  _random_pick({col}) {
    let {source} = col;
    let max = source.length - 1;
    let index = this.random.integer(0, max);

    let result = source[index];
    return result;
  }

  _random_num({col}) {

    let {max, min} = col;
    let result = this.random.integer(min, max);

    return result;
  }
  _date({col}) {

    let stringToDate = (stringDate) => {
      var parts = stringDate.split('-');
      var date = new Date(parts[0],parts[1]-1,parts[2]);
      return date
    }

    let randomDateCreate = (start, end) => {
        return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    }

    let {start, end} = col;
    let startDate = stringToDate(start);
    let endDate = stringToDate(end);
    let randamDate = randomDateCreate(startDate, endDate);
    let result = moment(randamDate).format('YYYY-MM-DD');
    return result;

  }

  _icon({col}) {
    let {className} = col;
    let result = `<i class="${className}"></i>`;
    return result;
  }



}
