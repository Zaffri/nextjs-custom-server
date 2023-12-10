import { PropsWithChildren } from 'react';

export default function TestLayout ({ children }: PropsWithChildren ) {
  return (
    <>
      <h1>Testing app router with custom server.</h1>
      {children}
    </>
  );
}