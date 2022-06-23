const express = require('express');
const router = express.Router();

const Orders = require('../models/order');

router.get('/', async (req, res) => {
    try{
        const allOrders = await Orders.find();
        res.status(200).json(allOrders);
  }catch(err) {
        res.status(500).json({message: err.message})
  }
});

router.get('/:id', getOrder, (req, res) => {

    const getOrderOne = res.result;
    res.status(200).json(getOrderOne);
});

router.post('/', async (req, res) => {
    try{
        const order = await Orders.create({
            name: req.body.name,
            order: req.body.order,
            address: req.body.address,
            quantity: req.body.quantity,
        });
        res.status(201).json(order);
    }catch(err) {
         res.status(400).json({message: err.message});
    }
});

router.patch('/:id', getOrder, async (req, res) => {
    const getUpdateOrder = res.result;
    if(req.body.name !== null) {
        getUpdateOrder.name = req.body.name;
    }
    if(req.body.order !== null){
        getUpdateOrder.order = req.body.order;
    }
    if(req.body.address !== null){
        getUpdateOrder.address = req.body.address;
    }
    if(req.body.quantity !== null) {
        getUpdateOrder.quantity = req.body.quantity;
    } 
    try{
        const updateOrder = await getUpdateOrder.save();
        res.status(200).send(updateOrder);  
    }catch(err) {
        res.status(400).json({message: err.message});
    }
});

router.delete('/:id', getOrder, async (req, res) => {
    const deleteOrder = res.result;
    try{
        const del = await Orders.deleteOne({'_id': deleteOrder._id});
        res.status(204).send(del);
    }catch(err) {
        res.status(500).json({message: 'Cannot delete order'});
    }
});

async function getOrder(req, res, next) {
    const getId = req.params.id;
    let resultOrder;
    try{
        const getOrder = await Orders.findById(getId);
        if(getOrder) {
             resultOrder = getOrder;
        }else {
            return res.status(404).json({message: 'Cannot find your order'});
        }
        res.result = resultOrder;
        next();
    }catch(err) {
            res.status(500).json({message: err.message});
    }
}

module.exports = router;

