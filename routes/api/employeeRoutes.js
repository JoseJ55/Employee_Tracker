const router = require('express').Router();
const Employees = require('../../models/Employees')

router.get('/', async (req, res) => {
    try{
        const employees = await Employees.findAll().catch((err) => res.json(err));
        // console.log(departments)
        // res.send(departments)
        const employee = employees.map((employee) => employee.get({plain: true}));
        // console.log(depart[0].id)
        res.send(employee)
        res.status(200);
    } catch (err){ 
        res.send(err)
        res.status(500).json(err);
    }
})

router.get('/:id', async (req, res) => {
    try {
        const data = await Employees.findByPk(req.params.id);
        const employee = data.get({plain: true});
        res.send(employee.firstName);
        res.status(200)
    }catch (err) {
        res.status(500).json(err);
    }
})

router.post('/', async (req, res) => {
    try{
        await Employees.create(req.body)
        // console.log(req.body);

        res.send("Added new employee!");
        res.status(200);
    } catch (err) {
        res.status(500).json(err);
    }
})

router.put('/:id', async (req, res) => {
    try{
        await Employees.update(req.body,{where: {id: req.params.id}});

        // console.log(req.body)
        res.send("Update data!");
        res.status(200);
    } catch (err) {
        res.status(500).json(err);
    }
})

router.delete('/:id', async (req, res) => {
    try{
        await Employees.destroy({where: {id: req.params.id}})

        res.send("Data has been deleted!");
        res.status(200);
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router;