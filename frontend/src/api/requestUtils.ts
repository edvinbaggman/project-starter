import axios, { Method, isAxiosError } from 'axios';

const BASE_URL = 'http://localhost:3000';

type RequestProps = {
  method: Method;
  endpoint: string;
  jwt?: string;
  body?: Record<string, unknown>;
};

export const sendRequest = async ({
  method,
  endpoint,
  jwt,
  body,
}: RequestProps) => {
  try {
    const response = await axios({
      method: method,
      url: `${BASE_URL}/${endpoint}`,
      headers: {
        'Authorization': `Bearer ${jwt}`,
        'Accept': '*/*',
        'Content-type': 'application/json',
      },
      data: body,
    });
    return response;
  } catch (error) {
    if (isAxiosError(error)) {
      return error.response;
    }
    console.log(error);
  }
};

export const request = async ({
  method,
  endpoint,
  jwt,
  body,
}: RequestProps) => {
  const response = await sendRequest({ method, endpoint, jwt, body });
  let status: number = 418;
  let data: unknown;
  let error: boolean = true;
  let errorMsg: string = 'Unknown error';
  if (response) {
    status = response.status;
    if (status >= 200 && status < 300) {
      data = response.data;
      error = false;
      errorMsg = '';
    } else {
      error = true;
      if (response.data?.message) {
        errorMsg = response.data.message;
      }
    }
  }
  return { status, data, error, errorMsg };
};
