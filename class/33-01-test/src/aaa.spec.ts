// 1. 하나 테스트
it('더하기 테스트', () => {
  const a = 1;
  const b = 2;

  expect(a + b).toBe(3);
});

// 2. 테스트 그룹화
describe('나의 테스트 그룹', () => {
  it('더하기 테스트', () => {
    const a = 1;
    const b = 2;

    expect(a + b).toBe(3);
  });

  it('곱하기 테스트', () => {
    const a = 1;
    const b = 2;

    expect(a * b).toBe(2);
  });
});

// 3. 상품 구매하기 테스트 예제
describe('상품 구매 테스트', () => {
  // 테스트 전에 필요한 과정
  beforeEach(() => {
    //로그인 로직
  });

  it('금액 검증', () => {
    const result = true;
    expect(result).toBe(true);
  });

  it('상품 구매', () => {
    const result = true;
    expect(result).toBe(true);
  });
});
