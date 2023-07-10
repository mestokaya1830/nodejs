const router = require('express').Router()
const Products = require('../modules/productsSchema')


router.get('/', async(req, res, next) => {
  res.json({message:'Home Page'})
})

router.get('/products', async(req, res, next) => {
  const result = await Products.find({})
  res.json({message: result})
})

router.get('/products/:id', async(req, res, next) => {
  console.log(req.params.id)
  try {
    const result = await Products.find({name: req.params.id})
    res.json({ message:result })
  } catch (error) {
    console.log(error)
  }
  
})

router.post('/products', async(req, res, next) => {
  const newProducts = new Products({
    name:req.body.name,
    price:req.body.price
  })
  await newProducts.save()
  res.json({message:'Saved'})
})

router.put('/products/:id', async(req, res, next) => {
  await Products.updateOne(
    { name: req.params.id },
    {
      $set: {
        price: req.body.price
      },
    }
  );
  res.json({ message: "Updated" });
})

router.delete('/products/:id', async(req, res, next) => {
  await Products.deleteOne({name: req.params.id})
  res.json({message:'Deleted'})
})

module.exports = router