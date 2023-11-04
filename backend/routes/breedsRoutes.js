const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
const router = express.Router();
router.use(bodyParser.json());

router.get("/list", async (req, res) => {
  const url = "https://dog.ceo/api/breeds/list/all";

  await axios
    .get(url)
    .then((response) => {
      const list = response.data.message;
      res.send(list);
    })
    .catch((error) => {
      console.log(error);
    });
});

router.post("/subBreed/list", async (req, res) => {
  const { subBreed } = req.body;

  const url = `https://dog.ceo/api/breed/${subBreed}/list`;

  await axios
    .get(url)
    .then((response) => {
      const list = response.data.message;
      res.send(list);
    })
    .catch((error) => {
      console.log(error);
    });
});

router.post("/allImages", async (req, res) => {
  const { breed } = req.body;

  const url = `https://dog.ceo/api/breed/${breed}/images`;

  await axios
    .get(url)
    .then((response) => {
      const breedsImages = response.data.message;
      res.send(breedsImages);
    })
    .catch((error) => {
      console.log(error);
    });
});

router.post("/subBreed/allImages", async (req, res) => {
  const { breed, subBreed } = req.body;

  const url = `https://dog.ceo/api/breed/${breed}/${subBreed}/images`;

  await axios
    .get(url)
    .then((response) => {
      const subBreedImages = response.data.message;
      res.send(subBreedImages);
    })
    .catch((error) => {
      console.log(error);
    });
});

router.post("/subBreed/random", async (req, res) => {
    const { breed, subBreed } = req.body;
  
    const url = `https://dog.ceo/api/breed/${breed}/${subBreed}/images/random`;
  
    await axios
      .get(url)
      .then((response) => {
        const subBreedImages = response.data.message;
        res.send(subBreedImages);
      })
      .catch((error) => {
        console.log(error);
      });
  });


router.post("/random", async (req, res) => {
  const { breed } = req.body;

  const url = `https://dog.ceo/api/breed/${breed}/images/random`;

  await axios
    .get(url)
    .then((response) => {
      const randomImage = response.data.message;
      res.send(randomImage);
    })
    .catch((error) => {
      console.log(error);
    });
});

module.exports = router;
