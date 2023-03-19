/**
 * @jest-environment jsdom
 */
 import '@testing-library/jest-dom/extend-expect';
 import { render, screen } from '@testing-library/react';
 import News from '../components/News';
  
 describe('Post component with given props', () => { 
 
  // ダミーのpropsを定義
   let dummyProps:any;
   beforeEach(() => {
     dummyProps = [
        {
          id: "1",
          title: "test1",
          content: "texttext1",
        },
        {
          id: "2",
          title: "test2",
          content: "texttext2",
        },
      ];
   });
 
   it('Should render correctly with given props value', () => {
 　 // ダミーのpropsを渡してコンポーネントをレンダー
     render(<News news = {dummyProps} />);
     expect(screen.getByText("1:test1:texttext1")).toBeInTheDocument();
     expect(screen.getByText("2:test2:texttext2")).toBeInTheDocument();
   });
 }); 