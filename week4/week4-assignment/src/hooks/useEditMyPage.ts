import { useEffect, useState } from "react";
import { useUserInfo } from "./useUserInfo";
import { getInfo, editInfo } from "../api/auth";
import type { ChangeEvent } from "react";
import type { editInfoRequest } from "../types/auth";

interface UserData {
  username?: string;
  name: string;
  email: string;
  age: number;
}

export const useEditMyPage = () => {
  const [userData, setUserData] = useState<UserData>({
    username: "",
    name: "",
    email: "",
    age: 0,
  });
  const { userId, setUserName } = useUserInfo();
  const [refreshKey, setRefreshKey] = useState(0);

  const handleInputChange =
    (field: keyof UserData) => (e: ChangeEvent<HTMLInputElement>) => {
      const value = field === "age" ? Number(e.target.value) : e.target.value;
      setUserData((prev) => ({ ...prev, [field]: value }));
    };

  useEffect(() => {
    const fetchData = async () => {
      if (!userId) return;

      try {
        const response = await getInfo(userId);
        setUserData(response.data);
        setUserName(response.data.name);
      } catch (error) {
        alert(`불러오기 실패. ${error}`);
      }
    };

    fetchData();
  }, [refreshKey, userId, setUserName]);

  const handleEdit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data: editInfoRequest = {
      name: userData.name,
      email: userData.email,
      age: userData.age,
    };

    try {
      const response = await editInfo(userId, data);
      alert(`수정 성공 ${response}`);
      setRefreshKey((prev) => prev + 1);
      setUserName(userData.name);
    } catch (error) {
      alert(`정보 수정 실패. ${error}`);
    }
  };

  return {
    userData,
    handleInputChange,
    handleEdit,
  };
};
