import { DomSecurityPipe } from './dom-security.pipe';

describe('DomSecurityPipe', () => {
  it('create an instance', () => {
    const pipe = new DomSecurityPipe();
    expect(pipe).toBeTruthy();
  });
});
