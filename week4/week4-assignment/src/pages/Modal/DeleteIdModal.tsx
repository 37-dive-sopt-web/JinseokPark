import ReactDOM from "react-dom";
import {
  modalBackgroundStyle,
  modalContentStyle,
  modalBtnContainer,
} from "./DeleteIdModal.css";
import { deleteId } from "../../api/auth";
import { useUserInfo } from "../../hooks/useUserInfo";
import { useNavigate } from "react-router-dom";

const modalRoot = document.getElementById("modal");

interface DeleteIdModalProps {
  onClose: () => void; // 모달을 닫는 함수만 받음
}

const DeleteIdModal = ({ onClose }: DeleteIdModalProps) => {
  const navigate = useNavigate();
  const { userId } = useUserInfo();

  if (!modalRoot) {
    return null;
  }

  const handleDeleteId = async () => {
    try {
      const response = await deleteId(userId);
      alert("회원 삭제 성공");
      console.log(response);
      navigate("/");
    } catch (error) {
      alert(`계정 삭제 실패. 오류가 발생했습니다. ${error}`);
    }
  };

  return ReactDOM.createPortal(
    <div className={modalBackgroundStyle}>
      <div className={modalContentStyle}>
        <h2>정말 탈퇴하시겠어요?</h2>
        <p>탈퇴 후에는 모든 정보가 삭제돼요</p>
        <div className={modalBtnContainer}>
          <button onClick={onClose}>취소</button>
          <button onClick={handleDeleteId}>회원 탈퇴</button>
        </div>
      </div>
    </div>,

    modalRoot
  );
};

export default DeleteIdModal;
