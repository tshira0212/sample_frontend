/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import { SWRConfig } from 'swr';
import ToDo from '../components/ToDo';
import { setupWorker, rest } from 'msw';
import { setupServer } from 'msw/node'

// APIのモックサーバーを立てる
const handlers = [
    rest.get(
      'https://jsonplaceholder.typicode.com/todos/',
      // ダミーデータ
      (req, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.json([
            {
              postId: 1,
              id: 1,
              name: 'A',
              title: 'dummy body A',
            },
            {
              postId: 2,
              id: 2,
              name: 'B',
              title: 'dummy body B',
            },
          ]),
        );
      },
    ),
  ];
  const server = setupServer(...handlers);
  beforeAll(() => {
    server.listen();
  });
  afterEach(() => {
    server.resetHandlers();
  });
  afterAll(() => {
    server.close();
  });
  
  describe('Comment page with useSWR / Success+Error', () => {
   // Success時
    it('Should render the value fetched by useSWR', async () => {
      render(
        // useSWRの機能もテストしたい場合は、SWRConfigでラップ
        // dedupingIntervalを0にすることで、useSWRのデータをキャッシュしないようにする
        <SWRConfig value={{ dedupingInterval: 0 }}>
          <ToDo />
        </SWRConfig>,
      );
      expect(await screen.findByText('1:dummy body A'));
      expect(screen.getByText('2:dummy body B'));
    });
  
   // Error発生時
    it('Should render Error text when fetch failed', async () => {
      // エラー用にモックサーバの上書き
      server.use(
        rest.get(
            'https://jsonplaceholder.typicode.com/todos/',  
          (req, res, ctx) => {
            return res(ctx.status(400));
          },
        ),
      );
      render(
        <SWRConfig value={{ dedupingInterval: 0 }}>
          <ToDo />
        </SWRConfig>,
      );
      expect(await screen.findByText('Error!'));
      screen.debug();
    });
  });