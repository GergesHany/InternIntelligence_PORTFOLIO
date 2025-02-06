const urlRegex = new RegExp(/^(ftp|http|https):\/\/[^ "]+$/);
const validUrl = (url) => {
    return urlRegex.test(url);
}

module.exports = validUrl;
