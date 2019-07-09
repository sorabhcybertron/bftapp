import { SafeHtml } from './safe-html.pipe';
describe('SafeHtml', () => {
  it('create an instance', () => {
    const pipe = new SafeHtml();
    expect(pipe).toBeTruthy();
  });
});
