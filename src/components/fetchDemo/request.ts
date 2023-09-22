const host_url = process.env.NEXT_PUBLIC_HOST as string;

export class FetchService {
    async get<T>(url: string, params = {}): Promise<T> {
        const _url = `${host_url}${url}?`;
        console.log('fetch GET queryparams: ', params);
        const response = await fetch(_url + new URLSearchParams(params));
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        const data: T = await response.json();
        console.log('GET response: ', data);
        return data;
    }
  
    async post<T>(url: string, body={}): Promise<T> {
        const _url = `${host_url}${url}?`;
        console.log('fetch POST data: ', body);
        const response = await fetch(_url, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        const data: T = await response.json();
        return data;
    }
  
    async put<T>(url: string, body: any): Promise<T> {
        const _url = `${host_url}${url}?`;
        console.log('fetch PUT data: ', body);
        const response = await fetch(_url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        const data: T = await response.json();
        return data;
    }
  
    async delete<T>(url: string, params = {}): Promise<T> {
        const _url = `${host_url}${url}?`;
        console.log('fetch DELETE queryparams: ', params);
        const response = await fetch(_url + new URLSearchParams(params), {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        const data: T = await response.json();
        console.log('DELETE response: ', data);
        return data;
    }
}
