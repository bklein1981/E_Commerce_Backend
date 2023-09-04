const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// find all categories
router.get('/', async (req, res) => {
  console.log('Category GET route is working')
  try {
    // Attempt to get all categories
    const categoryData = await Category.findAll({
       // Include any product details for the categories
      include: [{ model: Product }]
    });
    // If successful, return a 200 response
    res.status(200).json(categoryData);
  } catch (err) {
    // Handle any errors and return a 500 response with the error details
    res.status(500).json(err);
  }

});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  console.log('Category Id GET route is working')
  try {
    // Attempt to get a category by its `id` value
    const categoryData = await Category.findByPk(req.params.id, {
      // Include any product details for the category
      include: [{ model: Product }]
    });
    if (!categoryData) {
      // If no rows were returned, return a 404 response
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }
    // If successful, return a 200 response
    res.status(200).json(categoryData);
  } catch (err) {
    // Handle any errors and return a 500 response with the error details
    res.status(500).json(err);
  };
});

router.post('/', async (req, res) => {
  // create a new category
  console.log('Category Id POST route is working')
  try {
    // Attempt to create a new category
    const categoryData = await Category.create(req.body);
     // If successful, return a 200 response
    res.status(200).json(categoryData);
  } catch (err) {
    // Handle any errors and return a 400 response with the error details
    res.status(400).json(err);
  };
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  console.log('Category Id PUT route is working')
  try {
    //Attempt to update a category
    const updatedCategory = await Category.update(
      {
        category_name: req.body.category_name
      },
      {
        where: { id: req.params.id },
      })
      if (updatedCategory[0] === 0) {
        // If no rows were deleted, return a 404 response
        res.status(404).json({ message: 'No category found with this id!' });
      } else
      // If the update was successful, return a 200 response
      res.status(200).json(updatedCategory);
  } catch (err) {
    // Handle any errors and return a 400 response with the error details
    res.status(400).json(err);
  };
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  console.log('Category Id DELETE route is working')
  try {
    // Attempt to delete the category
    const catDeleted = await Category.destroy({
      where: { id: req.params.id },
    });
    if (catDeleted === 0) {
      // If no rows were deleted, return a 404 response
      res.status(404).json({ message: 'No category found with this id!' });
    } else {
      // If the deletion was successful, return a 200 response
      res.status(200).json({ message: 'Category deleted successfully.' });
    }
  } catch (err) {
    // Handle any errors and return a 400 response with the error details
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
