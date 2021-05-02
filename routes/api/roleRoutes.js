const router = require('express').Router();
const Roles = require('../../models/Role')

router.get('/', async (req, res) => {
    try{
        const roles = await Roles.findAll().catch((err) => res.json(err));
        // console.log(departments)
        // res.send(departments)
        const role = roles.map((data) => data.get({plain: true}));
        // console.log(depart[0].id)
        res.send(role)
        res.status(200);
    } catch (err){ 
        res.send(err)
        res.status(500).json(err);
    }
})

router.get('/:id', async (req, res) => {
    try {
        const data = await Roles.findByPk(req.params.id);
        const role = data.get({plain: true});
        res.send(role.title);
        res.status(200)
    }catch (err) {
        res.status(500).json(err);
    }
})

router.post('/', async (req, res) => {
    try{
        await Roles.create(req.body)
        res.send("Added a new role!");
        res.status(200);
    } catch (err) {
        res.status(500).json(err)
    }
})

router.put('/:id', async (req, res) => {
    try{
        await Roles.update(req.body, {where: {id: req.params.id}});

        res.send("Updated Role!");
        res.status(200);
    } catch (err){
        res.status(500).json(err);
    }
})

router.delete('/:id', async (req, res) =>{
    try{
        await Roles.destroy({where: {id: req.params.id}});

        res.send("Role has been deleted!");
        res.status(200);
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router;