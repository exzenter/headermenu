const defaultConfig = require('@wordpress/scripts/config/webpack.config');
const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    ...defaultConfig,
    entry: {
        'trigger/index': path.resolve(process.cwd(), 'src/trigger', 'index.js'),
        'trigger/view': path.resolve(process.cwd(), 'src/trigger', 'view.js'),
        'trigger/frontend': path.resolve(process.cwd(), 'src/trigger', 'style.scss'),
        'trigger/editor': path.resolve(process.cwd(), 'src/trigger', 'editor.scss'),
        'dropdown/index': path.resolve(process.cwd(), 'src/dropdown', 'index.js'),
        'dropdown/frontend': path.resolve(process.cwd(), 'src/dropdown', 'style.scss'),
        'dropdown/editor': path.resolve(process.cwd(), 'src/dropdown', 'editor.scss'),
    },
    output: {
        path: path.resolve(process.cwd(), 'build'),
        filename: '[name].js',
    },
    plugins: [
        ...defaultConfig.plugins,
        new CopyPlugin({
            patterns: [
                { from: 'src/trigger/block.json', to: 'trigger/block.json' },
                { from: 'src/dropdown/block.json', to: 'dropdown/block.json' },
            ],
        }),
    ],
};
