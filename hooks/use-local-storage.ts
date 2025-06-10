import { useState, useEffect, Dispatch, SetStateAction } from 'react';

function getValueFromLocalStorage<T>(key: string, initialValue: T): T {
  if (typeof window === 'undefined') {
    return initialValue;
  }
  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : initialValue;
  } catch (error) {
    console.error(error);
    return initialValue;
  }
}

// 반환 값의 타입을 수정합니다.
export function useLocalStorage<T>(key: string, initialValue: T): [T, Dispatch<SetStateAction<T>>] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    return getValueFromLocalStorage(key, initialValue);
  });
  
  // useEffect 부분은 동일합니다.
  useEffect(() => {
    try {
      // 'storedValue'가 함수일 경우를 대비해, 실제 값으로 업데이트되도록 처리합니다.
      const valueToStore = storedValue instanceof Function ? storedValue(getValueFromLocalStorage(key, initialValue)) : storedValue;
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  }, [key, storedValue, initialValue]);

  return [storedValue, setStoredValue];
}