import {useEffect, useRef} from 'react';

export const TEST_RERENDER_ATTRIBUTE_NAME = 'data-test-render';

export function useTestRerender() {
  if (!['development', 'test'].includes(process.env.NODE_ENV)) {
    return {
      bind: {}
    };
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const renderCount = useRef(0);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    renderCount.current++;
  });

  return {
    bind: {
      [TEST_RERENDER_ATTRIBUTE_NAME]: renderCount.current
    }
  };
}
