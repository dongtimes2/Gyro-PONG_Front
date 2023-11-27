import { describe, test, expect } from 'vitest';

import { render, screen } from 'src/test/testUtils';

import Title from '../Title';

describe('Title 컴포넌트 테스트', () => {
  test('텍스트가 보여야 합니다', () => {
    render(<Title>Hello World</Title>);
    const titleElement = screen.getByText('Hello World');
    expect(titleElement).toBeInTheDocument();
  });
});
