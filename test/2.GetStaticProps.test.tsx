// APIをモック化

import { cleanup } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react'
import { rest } from "msw";
import { setupServer } from "msw/node";
import { getPage } from "next-page-tester";

// どの URL のリクエストに対して、どのようなレスポンスを返すのかを定義
const handlers = [
    rest.get(
      'https://jsonplaceholder.typicode.com/users',
      (req, res, ctx) => {
        return res(
          // 以下はダミーデータ
          ctx.status(200),
          ctx.json([
            {
              userId: 1,
              id: 1,
              username: 'dummyname1',
              email: 'dummy@dummy.com',
            },
            {
              userId: 2,
              id: 2,
              username: 'dummyname2',
              email: 'dummy@dummy.com',
            },
          ]),
        );
      },
    ),
  ];
  
  // setupServerを使ってサーバーをたてておく
  const server = setupServer(...handlers);
  
  beforeAll(() => {
    // モックサーバの起動
    server.listen();
  });
  // 各テストケースが終わるたびに呼ばれる
  afterEach(() => {
    // モックサーバーのリセットとクリーンアップをして、テスト間の副作用が起こらないように。
    server.resetHandlers();
    cleanup();
  });
  afterAll(() => {
    // サーバーを閉じる
    server.close();
  });

  describe('Blog Page', () => {
    it('Should render the list of blogs pre-fetched by GetStaticProps', async () => {
      const { page } = await getPage({
        route: '/GetStaticPropsPage',
      });
   // renderでpageの内容を取得する
      render(page);
   // ブログページのテキストが取得できるまで待機する
      expect(await screen.findByText('2.GetStaticProps')).toBeInTheDocument();
   // ダミーデータのレスポンスがDOMに表示されているかを確認する
      expect(screen.getByText('ID:1')).toBeInTheDocument();
      expect(screen.getByText('ユーザー名：dummyname1')).toBeInTheDocument();
      expect(screen.getByText('メールアドレス：dummy@dummy.com')).toBeInTheDocument();
    });
  });