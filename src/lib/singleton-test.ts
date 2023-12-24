export class Test {
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
      console.log('Test instance setup...');
      Test.instance = new Test();
    } else {
      console.log('Test instance already setup.');
    }
  }

  static log() {
    this.instance.log();
  }
}