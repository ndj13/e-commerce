const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  Category.findAll({
    include: {
      model: Product,
      attribute: ["id", "product_name", "price", "stock", "category_id"]
    }
  })
  .then(dbCategoryData => res.json(dbCategoryData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
  // be sure to include its associated Products
});

router.get('/:id', (req, res) => {
 // find one category by "id"
 Category.findOne({
   where: {id: req.params.id},
   attribute: ["id", "category_name"],
  include: {
    model: Product,
    attribute: ["id", "product_name", "price", "stock", "category_id"]
  }
})
.then(dbCategoryData => res.json(dbCategoryData))
.catch(err => {
  console.log(err);
  res.status(500).json(err);
});
});

router.post('/', (req, res) => {
 // create a new category
 Category.create({
   category_name: req.body.category_name,})
   .then(dbCategoryData => res.json(dbCategoryData))
.catch(err => {
  console.log(err);
  res.status(500).json(err);
});
});

router.put('/:id', (req, res) => {
  // update a category by id value
  Category.update(req.body, {
    where: {id: req.params.id}
  })

  .then(dbaCategoryData => res.json(dbCategoryData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.delete('/:id', (req, res) => {
  // delete category by its id value
  Category.delete({
    where: {id: req.params.id}
  })
  .then(dbCategoryData => res.json(dbCategoryData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
 
});

module.exports = router;
