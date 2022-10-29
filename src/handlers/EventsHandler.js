const fs = require("fs");

module.exports = async () => {
    const path = "./src/events";
    const folders = fs.readdirSync(path);

    for (const folder of folders) {
        const files = fs.readdirSync(`${path}/${folder}`).filter(f => f.endsWith('.js'));
        for (const file of files) {
            require(`../events/${folder}/${file}`)
        }
    }
}