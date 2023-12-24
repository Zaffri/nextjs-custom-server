import ServerData from '@/server-data';
import Test from '@/singleton-test';
import BasicNav from "@/app/components/BasicNav";

export const dynamic = 'force-dynamic';

const findSingletonInCache = () => {
  const c = require.cache || [];
  Object.entries(c).find(([key, value]) => {
    if(key.includes('singleton')) {
      console.log(key);
      console.log(value);
    }
  });
};

async function getServerSideData() {
  console.log("Fetching server side data");
  console.log("Process ID (NextJS)", process.pid);
  // console.log(require.cache)
  // Blows up next line: Cache is diff from custom server ... singleton not possible w/ custom server
  // Test.log();
  console.log("ON PAGE LOAD NEXT");
  findSingletonInCache();
  return ServerData.getData();
}

export default async function TestPage () {
  const { text } = await getServerSideData();

  return (
    <>
      <p>Test page 1</p>
      <p>{text}</p>
      <BasicNav />
    </>
  );

};