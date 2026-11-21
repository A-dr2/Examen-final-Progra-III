import { useEffect, useState } from 'react';
type State<T> = { key: string; attempt: number; status: 'loading' | 'success' | 'error'; data?: T; error?: string };
export function useResource<T>(key: string, load: (signal: AbortSignal) => Promise<T>) {
  const [attempt, setAttempt] = useState(0);
  const [state, setState] = useState<State<T>>({ key, attempt, status: 'loading' });
  useEffect(() => {
    const controller = new AbortController();
    let current = true;
    const timeout = setTimeout(() => {
      if (current) setState({ key, attempt, status: 'error', error: 'El servicio tardó más de 20 segundos. Vuelve a intentarlo.' });
      current = false;
      controller.abort();
    }, 20000);
    setState({ key, attempt, status: 'loading' });
    load(controller.signal).then(data => {
      if (current) setState({ key, attempt, status: 'success', data });
    }).catch(error => {
      if (current) setState({ key, attempt, status: 'error', error: error instanceof Error ? error.message : 'No se pudo realizar la consulta.' });
    }).finally(() => clearTimeout(timeout));
    return () => { current = false; clearTimeout(timeout); controller.abort(); };
  }, [key, load, attempt]);
  const visible = state.key === key && state.attempt === attempt ? state : { key, attempt, status: 'loading' as const };
  return { ...visible, retry: () => setAttempt(n => n + 1) };
}
