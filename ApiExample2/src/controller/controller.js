const express = require("express");
const Order = require("../models/schema");
const userData = require("../models/userSchema");
const bcrypt = require('bcryptjs');
const { json } = require("express");
const jwt = require("jsonwebtoken")

const controller = {};

controller.post =async (req,res)=>{
        
	console.log(req.body);
	const user = await new Order(req.body);
	
	user.save().then(() =>{
		res.status(201).send("Data Created Successfully");
	}).catch((error) =>{
		res.status(400).send(error);
		console.log(error)
	})
}

controller.get = async(req,res)=>{
	try{
		console.log("query : ",req.query);

		const order = await Order.find();
		console.log("Data ::::::::::::::::::=>",order);
		const response = {
			data :order,
			recordsFiltered: order.length,
        	recordsTotal: order.length
		}
		console.log("data : ",order);
		
		res.send(response);
	}
	catch(error) {
		res.status(400).send(error);
	}
    
}

controller.search = async(req,res) =>{
	const data = await Order.find();

	 const oSearch = {
            '$match': {
                $or: [{
                    Name: {
                        $regex: new RegExp(req.body.search.value, 'i')
                    }
                }, {
                    OrderId: {
                        $regex: new RegExp(req.body.search.value, 'i')
                    }
                }]
            }
        }


    const datas = await Order.aggregate([
    	oSearch,
    	{
    	'$sort': {
      		'Name': (req.body.order[0].dir == "asc") ? 1 : -1, 
      		//'OrderId': (req.body.order[0].dir == "asc") ? 1 : -1
    	}
  		},
            {
                '$skip': Number(req.body.start)
            }, {
                '$limit': Number(req.body.length)
            }
        
        ]);


	const response = {
		data:datas,
		recordsFiltered:data.length,
		recordsTotal:data.length,
		draw: req.body.draw
	}
	return res.json(response);
}


controller.put = async(req,res)=>{
	try{

        console.log(req.body);
       
        const data =await  Order.findOneAndUpdate({"OrderId": req.body.OrderId}, {$set:{"Name":req.body.Name}});
        console.log("data : ",data);

        if(!data){
        	console.log(data);
        	return res.status(404).send("Error");
        }
        else{
        	return res.status(200).send("Data Updated Successfully.");
        }

   	}
	catch(error) {
        console.log(error);
		return res.status(500).send(error);
	}
}

controller.delete = async(req,res)=>{
	try{

		console.log(req.body.Name);
       
        const data = await Order.findOneAndDelete({Name: req.body.Name });
        console.log(data);

        if(!data){
        	console.log("data not found");
        	return res.status(404).send("Error");
        }
        else{
        	return res.status(200).send("Data Deleted Successfully");
        }
        
       	}
	catch(error) {
        console.log(error);
		res.status(500).send(error);
	}
}


controller.deleteItem = async(req,res)=>{
	try{

		console.log(req.body.Name);
       
        const data = await Order.findOneAndDelete({Name: req.body.Name });
        console.log(data);

        if(!data){
        	console.log("data not found");
        	return res.status(404).send("Error");
        }
        else{
        	return res.status(200).send("Data Deleted Successfully");
        }
        
       	}
	catch(error) {
        console.log(error);
		res.status(500).send(error);
	}
}

controller.updateOrder = async(req,res) =>{
	try{
		//console.log(req.params.id);

		let data = await Order.findOneAndUpdate({OrderId: req.body.OrderId },{
			$set:{
				OrderId :req.body.OrderId,
				OrderAmount:req.body.OrderAmount,
				Name:req.body.Name,
				Address :req.body.Address,
				City:req.body.City,
				State:req.body.State,
				ZipCode:req.body.ZipCode,
				PhoneNumber:req.body.PhoneNumber,
				Email:req.body.Email,
				TrackingNumber:req.body.TrackingNumber
		}
		}).then((result) =>{
			console.log(result);
		}).catch((error) =>{
			console.log(error);
		})
		return res.status(200).send("Data Edited");
	}
	catch(error){
		console.log(error);
		return res.status(500).send(error);
	}
}


module.exports = {controller};
