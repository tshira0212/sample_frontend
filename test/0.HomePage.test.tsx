//index.test.tsx
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Home from '../pages'

describe('Home', () => {
  it('0.HomePageRenderingTest', () => {
    render(<Home />)
    expect(screen.getByText('Unit Test Sample')).toBeInTheDocument()
  })
})