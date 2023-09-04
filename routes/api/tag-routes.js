const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  console.log('This is the find all tag route')
  try {
    // Attempt to get all tags
    const tagData = await Tag.findAll({
      // Include any product details for the tags
      include: [{ model: Product, through: ProductTag, as: 'products' }]
    });
    // If successful, return a 200 response
    res.status(200).json(tagData);
  } catch (err) {
     // Handle any errors and return a 500 response with the error details
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  console.log('Tag Id get route is working')
  try {
    // Attempt to get a tag by its `id` value
    const tagData = await Tag.findByPk(req.params.id, {
      // Include any product details for the tag
      include: [{ model: Product, through: ProductTag, as: 'products' }]
    });
    if (!tagData) {
       // If no rows were returned, return a 404 response
      res.status(404).json({ message: 'No tag found with this id!' });
      return;
    }
    // If successful, return a 200 response
    res.status(200).json(tagData);
  } catch (err) {
     // Handle any errors and return a 500 response with the error details
    res.status(500).json(err);
  };
});

router.post('/', async (req, res) => {
  // create a new tag
  console.log('Tag post route is working')
  try {
    // Attempt to create a new tag
    const tagData = await Tag.create(req.body);
    // If successful, return a 200 response
    res.status(200).json(tagData);
  } catch (err) {
    // Handle any errors and return a 400 response with the error details
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  console.log('Tag Id PUT route is working')
  // update a tag's name by its `id` value
  try {
    // Attempt to update a tag by its Id
    const updatedTag = await Tag.update(
      {
        tag_name: req.body.tag_name
      },
      {
        where: { id: req.params.id }
      });
      if (updatedTag[0] === 0) {
        // If no rows were deleted, return a 404 response
        res.status(404).json({ message: 'No Tag found with this id!' });
      } else
      // If the update was successful, return a 200 response
      res.status(200).json(updatedTag);
  } catch (err) {
    // Handle any errors and return a 400 response with the error details
    res.status(400).json(err);
  };
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  console.log('Tag Id DELETE route is working')
  try {
    // Attempt to delete the category
    const tagDeleted = await Tag.destroy({
      where: { id: req.params.id },
    });
    if (tagDeleted === 0) {
      // If no rows were deleted, return a 404 response
      res.status(404).json({ message: 'No tag found with this id!' });
    } else {
      // If the deletion was successful, return a 200 response
      res.status(200).json({ message: 'tag deleted successfully.' });
    }
  } catch (err) {
    // Handle any errors and return a 400 response with the error details
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
