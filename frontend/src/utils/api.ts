import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import toast from 'react-hot-toast';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

class ApiClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    // Request interceptor
    this.client.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.client.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        if (error.response) {
          const { status, data } = error.response;
          
          switch (status) {
            case 401:
              // Unauthorized - clear token and redirect to login
              localStorage.removeItem('token');
              localStorage.removeItem('user');
              window.location.href = '/login';
              break;
            case 403:
              toast.error('접근 권한이 없습니다.');
              break;
            case 404:
              toast.error('요청한 리소스를 찾을 수 없습니다.');
              break;
            case 422:
              // Validation error
              if (data.error) {
                toast.error(data.error);
              } else if (data.errors) {
                const errorMessages = Object.values(data.errors).flat();
                errorMessages.forEach((message: any) => toast.error(message));
              }
              break;
            case 500:
              toast.error('서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
              break;
            default:
              if (data.error) {
                toast.error(data.error);
              } else {
                toast.error('알 수 없는 오류가 발생했습니다.');
              }
          }
        } else if (error.request) {
          toast.error('네트워크 연결을 확인해주세요.');
        } else {
          toast.error('요청을 처리하는 중 오류가 발생했습니다.');
        }
        
        return Promise.reject(error);
      }
    );
  }

  async get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.client.get(url, config);
    return response.data;
  }

  async post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.client.post(url, data, config);
    return response.data;
  }

  async put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.client.put(url, data, config);
    return response.data;
  }

  async patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.client.patch(url, data, config);
    return response.data;
  }

  async delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.client.delete(url, config);
    return response.data;
  }

  // File upload
  async uploadFile<T = any>(url: string, file: File): Promise<T> {
    const formData = new FormData();
    formData.append('file', file);

    const response: AxiosResponse<T> = await this.client.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        if (progressEvent.total) {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          // WHY: 업로드 진행률을 계산하지만 실제로는 사용하지 않음
          console.log(`Upload progress: ${percentCompleted}%`);
        }
      },
    });

    return response.data;
  }
}

export const apiClient = new ApiClient();
export default apiClient;
