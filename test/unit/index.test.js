
import MockData from '../../src';


describe('test mockup', () => {

  let mockData;
  let count = 3;
  beforeEach(() => {
    let params = {
      cols: [
        { key: 'seq', name: '項次', type: 'sequence' },
        { key: 'user', name: '員工帳號', type: 'number', format: '######' },
        { key: 'name', name: '姓名', type: 'name', lang: 'zh' },
        { key: 'type', name: '測驗類別', type: 'static', text: '1-16冊' },
        { key: 'subject', name: '測驗科目', type: 'static', text: 'Unit01' },
        { key: 'progress', name: '測驗進度', type: 'random_pick', source: ['第 1 部分', '第 2 部分', '第 3 部分', 'Finish'] },
        { key: 'none', name: '非申請分數', type: 'random_num', min: 10, max: 100 },
        { key: 'done_time', name: '測驗完成時間', type: 'random_num', min: 5, max: 20, interval: 5 },
        { key: 'check', name: '批閱', type: 'static', text: '-' },
        { key: 'exma_date', name: '測驗日期', type: 'date', start: '2016-07-08', end: '2016-08-10' },
        { key: 'exma_status', name: '測驗狀態', type: 'random_pick', source: ['已完成', '未完成'] },
        { key: 'exma_type', name: '測驗形式', type: 'random_pick', source: ['電腦測驗', '紙本測驗'] },
        { key: 'report', name: '報表', type: 'image', src: 'report-icon-32x32.png' },
      ]
    }
    mockData = new MockData({params, count});
  });

  it('should create 3 data', async (done) => {
    try {
      mockData.processRandamData();

      let data = mockData.getData();
      console.log(data);
      (data.length == count).should.be.true;
      done();
    } catch (e) {
      done(e);
    }

    // sample result
    /*
    [ { seq: 0,
        user: 469660,
        name: '賴陽愛',
        type: '1-16冊',
        subject: 'Unit01',
        progress: '第 2 部分',
        none: 78,
        done_time: 20,
        check: '-',
        exma_date: '2016-07-14',
        exma_status: '已完成',
        exma_type: '紙本測驗',
        report: 'report-icon-32x32.png' },
      { seq: 1,
        user: 923149,
        name: '楊宗星',
        type: '1-16冊',
        subject: 'Unit01',
        progress: 'Finish',
        none: 11,
        done_time: 10,
        check: '-',
        exma_date: '2016-07-23',
        exma_status: '已完成',
        exma_type: '電腦測驗',
        report: 'report-icon-32x32.png' },
      { seq: 2,
        user: 510599,
        name: '楊瑩恭',
        type: '1-16冊',
        subject: 'Unit01',
        progress: 'Finish',
        none: 25,
        done_time: 8,
        check: '-',
        exma_date: '2016-07-25',
        exma_status: '未完成',
        exma_type: '電腦測驗',
        report: 'report-icon-32x32.png' } ]
    */
  });

});
