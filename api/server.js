const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const cors = require("cors")
const app = express();
const port = 9000;
const { uuid } = require("uuidv4");

// setup middleware
app.use(bodyParser.json());
app.use(cors());

//
var _dishes = [
    {
        _id: 1,
        name: 'Name 1',
        description: 'Description 1',
        price: 15,
        category: 'Main course',
        type: 'Breakfast',
        isActive: true,
        preparationTime: '60 min',
        isGlutenFree: false,
        img: 'anna.jpg'
    },
    {
        _id: 2,
        name: 'Name 2',
        description: 'Description 2',
        price: 20,
        category: 'Starter',
        type: 'Brunch',
        isActive: true,
        preparationTime: '30 min',
        isGlutenFree: false,
        img: 'casey.jpg'
    },
    {
        _id: 3,
        name: 'Name 3',
        description: 'Description 3',
        price: 20,
        category: 'Main course',
        type: 'Lunch',
        isActive: true,
        preparationTime: '25 min',
        isGlutenFree: true,
        img: 'montano.jpg'
    },
    {
        _id: 4,
        name: 'Name 4',
        description: 'Description 4',
        price: 20,
        category: 'Dessert',
        type: 'Small meal',
        isActive: true,
        preparationTime: '25 min',
        isGlutenFree: false,
        img: 'jimmy.jpg'
    }
];

// get dishes
router.get('/dishes', (req, res) => {
    res.json({
        status: "OK",
        data: _dishes
    });
});

// clear dishes
router.get('/dishes/clear', (req, res) => {
    _dishes = [];
    
    res.json({
        status: "OK"
    });
});

// get dish by id
router.get('/dishes/:_id', (req, res) => {
    console.log('In service', req.params._id);
    const idToString = req.params._id;
    const dish = _dishes.find(x => x._id == idToString);
    console.log('In service-dish', dish);
    res.json({
        status: "OK",
        data: dish ? dish : null
    });
});

// insert/update dish
router.put('/dishes', (req, res) => {
    if (req.body == null) {
        res.json({
            status: "Failed",
            message: "No content provided"
        });
    }
    else {
        let dish = req.body,
            status = "OK";
        
        if (!dish._id) {
            //
            dish._id = uuid();
            dish._Created = new Date();
            dish._Changed = null;

            //
            _dishes.push(dish);
        }
        else {
            //
            const dishIndex = _dishes.findIndex(x => x._id === dish._id);

            //
            if (dishIndex >= 0) {
                //
                dish._Changed = new Date();

                //
                _dishes[dishIndex] = dish;
            }
            else {
                //
                status = `dish not found for _id ${dish._id}`;
            }
        }

        res.json({
            status: status,
            data: dish
        });
    }
});

// delete dish
router.delete('/dishes/:_id', (req, res) => {
    let dishIndex = _dishes.findIndex(x => x._id === req.params._id);

    if (dishIndex !== -1) {
        _dishes.splice(dishIndex, 1);
    }

    res.json({
        status: "OK",
        message: dishIndex !== -1 ? "Dish deleted" : "Dish not found"
    });
});


//
app.use(router);

//
app.listen(port, () => {
    console.log(`api is ready on http://localhost:${port}`)
});