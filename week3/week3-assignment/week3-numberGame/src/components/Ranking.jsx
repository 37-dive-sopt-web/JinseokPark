/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { theme } from "../theme";
import { useState } from "react";
import { useEffect } from "react";

const wrapper = css`
  display: flex;
  justify-content: center;
  width: 100vw;
  margin-top: 5rem;
`;

const ranking = css`
  display: grid;
  grid-template-rows: auto 1fr;
  width: 80vw;
  min-height: 80rem;
  padding: 4rem;
  border-radius: 1.6rem;
  background-color: ${theme.colors.secondary};
`;

const ranking__title = css`
  display: flex;
  justify-content: space-between;
  align-items: center;

  h3 {
    font-size: 3rem;
  }

  button {
    padding: 1rem 2rem;
    border-radius: 1.6rem;
    border: none;
    background-color: ${theme.colors.point};
    font-size: 1.5rem;
    color: white;
    transition: all 0.5s ease;
  }

  button:hover {
    transform: translateY(-0.5rem);
  }
`;

const ranking__board = css`
  width: 100%;
  margin-top: 3rem;
  align-self: start;
  border-collapse: collapse;

  thead tr {
    background-color: ${theme.colors.main};
    color: white;
  }

  th,
  td {
    padding: 1rem;
    text-align: center;
  }

  tbody tr {
    border-bottom: 1px solid ${theme.colors.main};
  }
`;

const ranking__empty = css`
  display: flex;
  justify-content: center;
  align-items: center;

  p {
    font-size: 2rem;
    color: ${theme.colors.main};
    font-weight: 700;
  }
`;

const Ranking = () => {
  const [rankingData, setRankingData] = useState([]);

  // 처음 렌더링 될 때 실행
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("rankings") || "[]");

    // localStorage에서 가져온 데이터 조건에 맞게 정렬
    data.sort((a, b) => {
      if (a.level !== b.level) {
        return b.level - a.level;
      }
      return a.time - b.time;
    });
    setRankingData(data);
  }, []);

  // 기록 빈 배열로 초기화
  const resetRecord = () => {
    localStorage.setItem("rankings", JSON.stringify([]));
    setRankingData([]);
  };

  return (
    <div css={wrapper}>
      <div css={ranking}>
        <div css={ranking__title}>
          <h3>랭킹 보드</h3>
          <button onClick={resetRecord}>기록 초기화</button>
        </div>
        {rankingData.length === 0 ? (
          <div css={ranking__empty}>
            <p>아직 기록이 없습니다</p>
          </div>
        ) : (
          <table css={ranking__board}>
            <thead>
              <tr>
                <th>순위</th>
                <th>레벨</th>
                <th>클리어 시간(초)</th>
                <th>기록 시간</th>
              </tr>
            </thead>
            <tbody>
              {rankingData.map((data, index) => (
                <tr key={data.date}>
                  <td>{index + 1}위</td>
                  <td>Level {data.level}</td>
                  <td>{data.time.toFixed(2)}초</td>
                  <td>{new Date(data.date).toLocaleString("ko-KR")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Ranking;
