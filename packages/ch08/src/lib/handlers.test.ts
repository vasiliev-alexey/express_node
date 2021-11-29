import { about, home, notFound, serverError } from './handlers';

import { getMockReq, getMockRes } from '@jest-mock/express';

let req: ReturnType<typeof getMockReq>;
let retRespType: ReturnType<typeof getMockRes>;

let res: typeof retRespType.res;
let next: typeof retRespType.next;

beforeEach(() => {
  req = getMockReq();
  res = getMockRes().res;
  next = getMockRes().next;

  const render = jest.fn();
  res.render = render;
});

test('home page renders', () => {
  const { next } = getMockRes();
  const render = jest.fn();
  res.render = render;
  home(req, res, next);
  expect(render).toBeCalledWith('home');
});

test('страница О нас отображается с предсказанием', () => {
  about(req, res, next);
  expect(res.render).toBeCalledTimes(1);
  expect(res.render).toBeCalledWith(
    'about',
    expect.objectContaining({
      fortune: expect.stringMatching(/\W/),
    })
  );
});

test('рендеринг обработчика ошибки 404', () => {
  notFound(req, res, next);
  expect(res.render).toBeCalledTimes(1);
  expect(res.render).toBeCalledWith('404');
});

test('рендеринг обработчика ошибки 500', () => {
  const err = new Error('some error');
  serverError(err, req, res, next);
  expect(res.render).toBeCalledTimes(1);
  expect(res.render).toBeCalledWith('500');
});
