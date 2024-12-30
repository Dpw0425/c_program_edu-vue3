// @see https://stylelint.bootcss.com/

const { rules } = require("eslint-plugin-vue");

module.exports = {
    extends: [
        'stylelint-config-standard', // 配置 stylelint 拓展插件
        'stylelint-config-html/vue', // 配置 vue 中 template 样式格式化
        'stylelint-config-standard-scss', // 配置 stylelint scss 插件
        'stylelint-config-recommended-vue/scss', // 配置 vue 中 scss 样式格式化
        'stylelint-config-recess-order', // 配置 stylelint css 属性书写顺序插件
        'stylelint-config-prettier', // 配置 stylelint 与 prettier 兼容
    ],
    overrides: [
        {
            files: ['**/*.(scss|css|vue|html)'],
            customSyntax: 'postcss-scss',
        },
        {
            files: ['**/*.(html|vue)'],
            customSyntax: 'postcss-html',
        },
    ],
    ignoreFiles: [
        '**/*.js',
        '**/*.jsx',
        '**/*.tsx',
        '**/*.ts',
        '**/*.json',
        '**/*.md',
        '**/*.yaml',
    ],
    /**
     * null => 关闭该规则
     * always => 必须
     */
    rules: {
        'value-keyword-case': null, // 在 css 中使用 v-bind 不报错
        'no-descending-specificity': null, // 禁止在具有较高优先级的选择器出现后被其覆盖的较低优先级的选择器
        'function-url-quotes': 'always', // 要求或禁止 url 的引号
        'no-empty-source': null, // 关闭禁止空源码
        'selector-class-pattern': null, // 关闭强制选择器类名的格式
        'property-no-unknown': null, // 禁止未知的属性
        'block-opening-brace-space-before': 'always', // 大括号之前必须有一个空格符或不能有空白符
        'value-no-vendor-prefix': null, // 关闭属性值前缀 --webkit-box
        'property-no-vendor-prefix': null, // 关闭属性值前缀 --webkit-mask
        'selector-pseudo-class-no-unknown': [
            // 不允许未知的选择器
            true,
            {
                ignorePseudoClasses: ['global', 'v-deep', 'deep'], // 忽略属性, 修改 element 默认样式时才会用到
            },
        ],
    },
}