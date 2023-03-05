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
      'https://jsonplaceholder.typicode.com/posts/?_limit=10',
      (req, res, ctx) => {
        return res(
          // 以下はダミーデータ
          ctx.status(200),
          ctx.json([
            {
              userId: 1,
              id: 1,
              title: 'dummy title 1',
              body: 'dummy body 1',
            },
            {
              userId: 2,
              id: 2,
              title: 'dummy title 2',
              body: 'dummy body 2',
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
        route: '/blog-page',
      });
   // renderでpageの内容を取得する
      render(page);
   // ブログページのテキストが取得できるまで待機する
   //   expect(await screen.findByText('Blog Page')).toBeInTheDocument();
   // ダミーデータのレスポンスがDOMに表示されているかを確認する
      expect(screen.getByText('dummy title 1')).toBeInTheDocument();
      expect(screen.getByText('dummy title 2')).toBeInTheDocument();
    });
  });