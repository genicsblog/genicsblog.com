module.exports = {
    content: [
        './_includes/**/*.html',
        './_layouts/**/*.html',
        './*.html',
    ],
    safelist: [
        '!bg-android',
        '!bg-jekyll',
        '!bg-web',
        '!bg-node-js',
        '!bg-backend',
        '!bg-api',
        'hover:border-android',
        'hover:border-web',
        'hover:border-jekyll',
        'hover:border-node-js',
        'hover:border-backend',
        'hover:border-api',
        'mt-16'
    ],
    theme: {
        extend: {
            colors: {
                'background': '#16161f',
                'primary': '#2564eb',
                'web': '#F06529',
                'android': '#3ddc84',
                'jekyll': '#c83c3c',
                'node-js': '#68a063',
                'backend': '#1494fc',
                'api': '#fceccc'
            }
        },
    },
    variants: {},
    plugins: [],
}