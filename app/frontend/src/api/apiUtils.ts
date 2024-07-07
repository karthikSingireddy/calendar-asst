// eslint-disable-next-line  @typescript-eslint/no-explicit-any
function sendRequest<R>(url: string, method: string, data?: any): Promise<R> {
  return fetch(url, {
    method,
    // @ts-expect-error smth
    headers: {
      'Content-Type': 'application/json',
      'access_token': localStorage.getItem('accessToken') || undefined
    },
    body: JSON.stringify(data),
  }).then((res) => res.json());
}

export function get<R>(url: string): Promise<R> {
  return sendRequest<R>(url, 'GET');
}

export function post<B, R>(url: string, data: B): Promise<R> {
  return sendRequest<R>(url, 'POST', data);
}
