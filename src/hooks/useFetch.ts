import { useState, useEffect } from "react";

interface UseFetchResult<T> {
  data: T | null; // Dữ liệu fetch về
  loading: boolean; // Trạng thái loading
  error: string | null; // Thông tin lỗi nếu có
}

const useFetch = <T>(url: string): UseFetchResult<T> => {
  const [state, setState] = useState<{
    data: T | null;
    loading: boolean;
    error: string | null;
  }>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      setState({ ...state, loading: true });
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setState({ data: result, loading: false, error: null });
      } catch (err) {
        setState({
          data: null,
          loading: false,
          error: err instanceof Error ? err.message : "Something went wrong!",
        });
      }
    };

    fetchData();

    // Cleanup function
    return () => {
      setState({ data: null, loading: false, error: null });
    };
  }, [url]); // Chạy effect khi URL thay đổi

  return state; // Trả về toàn bộ trạng thái
};

export default useFetch;
