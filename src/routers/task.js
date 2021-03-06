const express = require('express')
const { update } = require('../models/task')
const Task = require('../models/task')
const router = express.Router()

router.post('/tasks', async (req, res) => {
    const task = new Task(req.body)
    try{
        task.save()
        res.status(201).send(task)
    }catch(e){
        res.status(400).send(e)
    }
})

router.get('/tasks', async (req, res) => {

    try{
        const task = await Task.find({})
        res.send(task)
    }catch(e){
        res.status(500).send(e)
    }
})

router.get('/tasks/:id', async (req, res) => {
    const _id = req.params.id

    try{
        const task = Task.findById(_id)
        if(!task){
            return res.status(404).send()
        }
        res.send(task)
    }catch(e){
        res.status(500).send(e)
    }
})

router.patch('/tasks/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update)
    )

    if(!isValidOperation){
        return res.status(400).send({error: 'Invalid updates!'})
    }

    try{

        const task = Task.findById(req.params.id)

        updates.forEach((update) => task[update] = req.body[update])

        if(!task){
            return res.status(404).send()
        }

        res.send(task)
    }catch(e){
        res.send(400).send(e)
    }
})

router.delete('/tasks/:id', async (req, res) => {
    try{
        const task = await Task.findByIdAndDelete(req.params.id)
        if(!task){
            return res.status(404).send()
        }
        res.send(task)
    }catch(e){
        res.status(500).send(e)
    }
})

module.exports = router
