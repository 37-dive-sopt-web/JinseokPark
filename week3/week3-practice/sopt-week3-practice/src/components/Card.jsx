import style from "./Card.module.css";

const Card = ({ name, engName, github }) => {
  return (
    <div className={style.card}>
      <p>이름 : {name}</p>
      <p>깃허브 : {github}</p>
      <p>영어 이름 : {engName}</p>
    </div>
  );
};

export default Card;
