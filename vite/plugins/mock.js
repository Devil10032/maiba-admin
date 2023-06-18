
import { viteMockServe } from 'vite-plugin-mock'

export default function createMock(isBuild) {
  return viteMockServe({
    mockPath: 'mock',  // 设置mokc文件阿基
    // localEnabled: isBuild,
    localEnabled: true,
    prodEnabled: true, // 生产环境mock是否会被打包
    watchFiles: true, // 监视⽂件更改，并重新加载 mock 数据
  })
}