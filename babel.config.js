module.exports = {
    presets: [
        ["@babel/preset-env", {
            useBuiltIns: "usage",
            corejs: 3.8,
            targets: "last 2 version"
        }],
        ["@babel/preset-typescript"]
    ]
}