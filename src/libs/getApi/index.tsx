// api.ts (hoặc file utils.js)
const BASE_URL = 'http://localhost:8000'; // Đặt base URL mặc định

export const getApi = async (path: string) => {
  try {
    // Tạo URL đầy đủ bằng cách nối BASE_URL với path
    const url = `${BASE_URL}${path}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // Nếu cần, có thể thêm Authorization hoặc các header khác
        // 'Authorization': `Bearer ${token}`
      },
    });

    // Kiểm tra nếu status trả về không phải 2xx
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    // Chuyển đổi response thành JSON (nếu dữ liệu trả về ở dạng JSON)
    const data = await response.json();

    return data; // Trả về dữ liệu API
  } catch (error) {
    console.error("Error fetching data:", error);
    return null; // Trả về null nếu có lỗi
  }
};
