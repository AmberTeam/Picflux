const Router = require('express')

const router = new Router()

router.get('/uts/js/ch.js', (req, res) => {
    return res.status(404).json()
})

module.exports = router