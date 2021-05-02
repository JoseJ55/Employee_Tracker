const router = require('express').Router();
const Department = require('../../models/Department')

router.get('/', async (req, res) => {
    try{
        const departments = await Department.findAll().catch((err) => res.json(err));
        // console.log(departments)
        // res.send(departments)
        const depart = departments.map((department) => department.get({plain: true}));
        // console.log(depart[0].id)
        res.send(depart)
        res.status(200);
    } catch (err){ 
        res.send(err)
        res.status(500).json(err);
    }
})

router.get('/:id', async (req, res) => {
    try {
        const data = await Department.findByPk(req.params.id);
        const depart = data.get({plain: true});
        res.send(depart.departmentName);
        res.status(200)
    }catch (err) {
        res.status(500).json(err);
    }
})

router.post('/', async (req, res) => {
    try{
        const depart = await Department.create(req.body);
        // console.log(req.body)
        res.send("Added new data!")
        res.status(200);
    } catch (err) {
        res.status(500).json(err)
    }
})

router.put('/:id', async (req, res) => {
    try{
        await Department.update(req.body, {where: {id: req.params.id}})

        res.send("Updated data!")
        res.status(200);
    }catch (err){ 
        res.status(500).json(err);
    }
})

router.delete('/:id', async (req, res) => {
    try{
        await Department.destroy({where: {id: req.params.id}})

        res.send("Data has been deleted!")
        res.status(200);
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router;