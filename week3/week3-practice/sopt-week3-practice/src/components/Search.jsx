/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const searchContainerStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const buttonStyle = css`
  padding: 6px 10px;
  border: none;
  background-color: #3b82f6;
  color: white;
  &:hover {
    border: 1px solid #3b82f6;
    background-color: white;
    color: #3b82f6;
  }
`;

const inputStyle = css`
  width: 300px;
  padding: 5px 10px;
  margin-right: 10px;
`;

const Search = ({ search, handleSearchChange, handleSearch }) => {
  return (
    <div css={searchContainerStyle}>
      <input
        placeholder="이름을 입력하세요"
        onChange={handleSearchChange}
        value={search}
        css={inputStyle}
      />
      <button css={buttonStyle} onClick={handleSearch}>
        확인
      </button>
    </div>
  );
};

export default Search;
