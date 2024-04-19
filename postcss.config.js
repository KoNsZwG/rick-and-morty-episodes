import postcssImport from 'postcss-import'
import tailwindcss from 'tailwindcss'
import postcssPresetEnv from 'postcss-preset-env'

export default {
  plugins: [postcssImport, tailwindcss, postcssPresetEnv({ stage: 1 })]
}
