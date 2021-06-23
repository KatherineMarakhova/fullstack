const Order = require('../models/Order')
const errorHandler = require('../utils/errorHandler')


// (get) localhost:5000/api/order?offset=2&limit=5  5-число нужных заказов, offset=2 число элементов которые нужно пропутить
module.exports.getAll = async function (req, res){

    const query = {
        user: req.user.id
    }
    //Дата старта (от какого чила нам нужны заказы)
    if(req.query.start){
        query.date = {
            $gte:req.query.start //>=
        }
    }
    //Дата конца
    if(req.query.end){
        if(!query.date){
            query.date = {}
        }
        query.date = {$lte:req.query.end}  //<=
    }

    if (req.query.order){
        query.order = +req.query.order
    }

    try{
        const orders = await new Order
            .find(query)
            .sort({date:-1})
            .skip(+req.query.offset) // + приводит к числу
            .limit(+req.query.limit)
        res.status(200).json(orders)
    }
    catch(e){
        errorHandler(res, e)
    }

}
module.exports.create = async function (req, res){
    try{
        const lastOrder = await Order
            .findOne({user: req.user.id})  //найдем последний заказ
            .sort({date:-1}) //отсортируем даты
        const maxOrder = lastOrder ? lastOrder.order : 0

        const order = await new Order({
            list: req.body.list,
            user: req.user.id,
            order: maxOrder + 1
        }).save()
    res.status(201).json(order)
    }
    catch(e){
        errorHandler(res, e)
    }
}