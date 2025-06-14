import { useEffect, useState } from "react";
import getData from "./api";

export default function useFetch<T>(url: string) {
  const [data, setData] = useState<T | undefined>();
  const [error, setError] = useState<{ message: string } | null>(null);
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    let doUpdate = true;

    setStatus('loading');
    setData(undefined);
    setError(null);

    getData<T>(url)
      .then(data => {
        if (doUpdate) {
          setData(data);
          setStatus('success')
        }
      })
      .catch(err => {
        if (doUpdate) {
          setError(err);
          setStatus('error')
        }
      })
    return () => { doUpdate = false; }
  }, [url])

  return {
    data,
    status,
    error
  }
}