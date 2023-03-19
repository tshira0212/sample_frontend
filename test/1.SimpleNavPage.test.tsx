/**
 * @jest-environment jsdom
 */
 import { render, screen } from '@testing-library/react';
 import '@testing-library/jest-dom/extend-expect';
 import userEvent from '@testing-library/user-event'; // ユーザーにクリックさせるため必要
 // next-page-testerからgetPageとinitTestHelpersをインポート
 import { getPage } from 'next-page-tester';
 import { initTestHelpers } from 'next-page-tester'; // 初期設定を行うもの
import { act } from 'react-dom/test-utils';

 // next-page-testerを使用するために実行しておく
 initTestHelpers();
 
 // Linkタグに対するページ遷移のテストを実施
 // describe でテストタイトルを設定
 describe('1.Navigation by Link', () => {
   // next-page-testerを使うには、関数をasyncにする
   it('Should route to selected page in navar', async () => {
     const { page } = await getPage({
       route: '/index', // 取得したいページのパス
     });
     render(page); // HTMLの構造を取得
 
     // getByTestIdでテストIDを取得し、それに対しクリックのシミュレーションを実施
     userEvent.click(screen.getByTestId('nav-test'));
     // 非同期の場合は、findByTextでテキストを検索
     expect(await screen.findByText('1.SimpleNavPage')).toBeInTheDocument();
   });
 });