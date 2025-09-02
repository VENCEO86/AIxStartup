export async function fetchWithTimeout(
  input: any,
  init: any = {},
  ms = 2800
) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), ms);
  
  try {
    const res = await fetch(input, { ...init, signal: controller.signal });
    clearTimeout(id);
    return res;
  } catch (error) {
    clearTimeout(id);
    
    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error(`Request aborted after ${ms}ms timeout`);
    }
    
    throw error;
  }
}
