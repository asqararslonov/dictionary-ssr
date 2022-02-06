const fs = require("fs/promises");
const path = require("path");

async function wordGET(word, description) {
    if (word && description ) {
        let words = await loadWord()
        let $word = words.find(el => el['title'] == word)
        let desc = words.find(el => el['description'] == description)
        if ($word || desc) {
            return { ok: false, message: 'word username exists' }
        }

        const newWord = {
            id: words.length ? words[words.length - 1].id + 1 : 1,
              word,
            description
        }
        // let newUser = {
        //     id: users.length ? users[users.length - 1].id + 1 : 1,
        //
        // }

        words.push(newWord)

        await fs.writeFile(
            path.join(process.cwd(), 'src', 'database', 'post.json'),
            JSON.stringify(words, null, 4))
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
const wordAddPOST = async(req, res) => {
    const { word, description } = req.body
    const { ok, message } = await wordGET( word, description)
    if (ok) {
        return res.redirect('/')
    }
    // return res.render('pages/admin/auth/create', { ok, message: message, method: 'POST' })
}


module.exports = wordAddPOST;
