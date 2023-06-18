import vue from '@vitejs/plugin-vue'

import createAutoImport from './auto-import'
import createSvgIcon from './svg-icon'
import createCompression from './compression'
import createSetupExtend from './setup-extend'
import createMock from './mock'

export default function createVitePlugins(viteEnv, isBuild = false) {
  const vitePlugins = [vue({
    reactivityTransform: true,
  })]
  vitePlugins.push(createAutoImport())
  vitePlugins.push(createSetupExtend())
  vitePlugins.push(createSvgIcon(isBuild))
  vitePlugins.push(createMock(isBuild))
  isBuild && vitePlugins.push(...createCompression(viteEnv))
  //  return [
  //   vue(),
  //   createAutoImport(),
  //   createSetupExtend()，
  //   createSvgIcon(isBuild)
  //   createMock(isBuild)
  // ]
  return vitePlugins
}
