export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    const singleton = (await import('./lib/singleton-test')).Test;
    await singleton.setup();
    singleton.log();
  }
}