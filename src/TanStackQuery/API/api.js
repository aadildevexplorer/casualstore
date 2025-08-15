import axios from "axios";
const api = axios.create({
  baseURL: "https://zylomart-3bzq.onrender.com/api/admin/users",
});

// fetch user's
export const fetchsUsersDataForAdmin = async () => {
  const res = await api.get("/get");
  if (res.status === 200) {
    return res.data;
  } else {
    return [];
  }
};

// ✅ Corrected fetch function
export const fetchsUsersOrderForAdmin = async () => {
  const res = await api.get(
    "https://zylomart-3bzq.onrender.com/api/admin/orders/get"
  );
  if (res.status === 200) {
    return res.data;
  } else {
    return { data: [] };
  }
};
