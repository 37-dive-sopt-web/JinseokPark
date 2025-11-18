import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";
import path from "path"; // 💡 path 모듈 import (필요할 수 있음)

export default defineConfig({
  plugins: [react(), vanillaExtractPlugin()],

  // 💡 아래 resolve 객체를 추가/수정합니다.
  resolve: {
    alias: {
      // React 라이브러리 경로를 현재 node_modules의 React 경로로 강제 지정
      // 이렇게 하면 pnpm의 심볼릭 링크 구조 때문에 발생하는 충돌을 방지할 수 있습니다.
      react: path.resolve(__dirname, "node_modules/react"),
      "react-dom": path.resolve(__dirname, "node_modules/react-dom"),
    },
  },
});
