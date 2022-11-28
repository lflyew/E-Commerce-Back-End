const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  try {
    const DataTag = await Tag.findAll({
      include: [{model: Product, through: ProductTag}]
    });
    res.status(200).json(DataTag);
  } catch (err) {
    res.status(500).json(err);
  }
  // find all tags
  // be sure to include its associated Product data
});

router.get('/:id', async (req, res) => {
  try {
    const DataTag = await Tag.findByPk(req.params.id, {
      include: [{model: Product, through: ProductTag}]
    });
    if (!DataTag) {
      res.status(404).json({ message: "No tag found!"});
      return;
    }
    res.status(200).json(DataTag);
  } catch (err) {
    res.status(500).json(err);
  }
  // find a single tag by its `id`
  // be sure to include its associated Product data
});

router.post('/', async (req, res) => {
  // create a new tag
  try{
    const DataTag = await Tag.create(req.body);
    res.status(200).json(DataTag);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const DataTag = await Tag.update(req.body, {
      where: {
        id: req.params.id
      }
    });
    if (!DataTag[0]) {
      res.status(404).json({ message: "No tag found!"});
      return;
    }
    res.status(200).json(DataTag);
  }
  catch (err) {
    res.status(500).json(err);
  }

  // update a tag's name by its `id` value
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
try {
  const DataTag = await Tag.destroy({
    where: {
      id: req.params.id
    }
  });
  if (!DataTag) {
    res.status(404).json({ message: "No tag found"});
    return;
  }
  res.status(200).json(DataTag);
} catch (err) {
  res.status(500).json(err);
}
});

module.exports = router;
