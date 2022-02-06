const fs = require("fs/promises");
const path = require("path");


const wordGET = (req, res) => {
    const {word, description} = req.body
    if (word && description) {
        console.log(word, description)
        // res.redirect("/")
    }
}

async function addWord(title, description) {
    if (title && description ) {
        let words = await loadWord()
        let word = words.find(el => el['title'] == title)
        if (word) {
            return { ok: false, message: 'alredy username exists' }
        }

        let newWord = {
            id: words.length ? words[words.length - 1].id + 1 : 1,
            title,
            description,
        }
        words.push(newWord)
        await fs.writeFile(
            path.join(process.cwd(), 'src', 'database', 'post.json'),
            JSON.stringify(users, null, 4))
        return { ok: true, message: 'user created' }
    } else {
        return { ok: false, message: 'error' }
    }
}


async function loadWord() {
    let data = await fs.readFile(
        path.join(process.cwd(), 'src', 'database', 'post.json'),
        'utf-8'
    )
    return data ? JSON.parse(data) : []
}


module.exports = [
    loadWord,
    addWord,
    wordGET
]