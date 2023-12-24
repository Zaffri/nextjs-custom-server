export default class Test {
 static instance: Test;
 data: Record<string, any> = {};

  getTest() {
    return this.data;
  }

  log() {
    console.log('[Log action]');
  }

  static async setup () {
    if (!Test.instance) {
      console.log('Instance for Test setup...');
      Test.instance = new Test();
    }
  }

  static log() {
    this.instance.log();
  }
}