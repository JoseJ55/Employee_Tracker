const router = require('express').Router();
const Department = require('../../models/Department')

router.get('/', async (req, res) => {
    const departments = await Department.findAll().catch((err) => res.json(err));
    const depart = departments.map((department) => department.get({plain: true}));
    console.log(depart)
    res.status(200);
})

// router.get('/', async (req, res) => {
//     try {
//         res.send("working get");
//         res.status(200)
//     }catch (err) {
//         res.status(500).json(err);
//     }
// })

module.exports = router;