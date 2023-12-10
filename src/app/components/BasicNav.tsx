import Link from 'next/link';

export default function BasicNav () {
  return (
    <ul style={{ marginTop: '15px' }}>
      <li>
          <Link href="/test">Test 1</Link>
      </li>
      <li>
          <Link href="/test/two">Test 2</Link>
      </li>
    </ul>
  );
};