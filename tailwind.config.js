module.exports = {
    content: [
        './_includes/**/*.html',
        './_layouts/**/*.html',
        './*.html',
    ],
    safelist: [
        '!bg-android',
        '!bg-web',
        'hover:border-android',
        'hover:border-web'
    ],
    theme: {
        extend: {
            colors: {
                'background': '#16161f',
                'primary': '#2564eb',
                'web': '#F06529',
                'android': '#3ddc84'
            }
        },
    },
    variants: {},
    plugins: [],
}