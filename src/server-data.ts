// Hardcoded test
const data = {
  name: 'blah',
  count: 10,
  text: 'Sample content here coming from CMS.',
};

export default class ServerData {
 static instance: ServerData;
 data: Record<string, any> = {};

  async loadData () {
    console.log('Pulling and loading data into cache.');
    this.data = data;
  }

  getServerData() {
    return this.data;
  }

  static async getData () {
    if (!ServerData.instance) {
      ServerData.instance = new ServerData();
      await ServerData.instance.loadData();
    }
    return ServerData.instance.getServerData();
  }
}