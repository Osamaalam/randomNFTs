exports.generateRandomNFTs = async (req, res, next) => {
  try {
    //JSON parse data;
    const background = JSON.parse(req.query.backgroundoptions);
    const head = JSON.parse(req.query.headoptions);
    const shirt = JSON.parse(req.query.shirtoptions);
    const eye = JSON.parse(req.query.eyeoptions);

    //Layers data from API
    const layers = {
      backgroundoptions: background.backgroundoptions,
      headoptions: head.headoptions,
      shirtoptions: shirt.shirtoptions,
      eyeoptions: eye.eyeoptions,
    };

    //Content to set probabilities
    const content = {
      metadataTemplate: (tokenId, attributes) => ({
        image: "Image URL",
        name: `NFT #${tokenId}`,
        external_url: "",
        description: "",
        attributes: attributes,
      }),
      layers: [
        {
          name: "Background",
          probability: 1.0,
          options: layers.backgroundoptions,
        },
        {
          name: "Head",
          probability: 1.0,
          options: layers.headoptions,
        },
        {
          name: "Shirt",
          probability: 1.0,
          options: layers.shirtoptions,
        },
        {
          name: "Eyes",
          probability: 0.25,
          options: layers.eyeoptions,
        },
      ],
    };

    //Creating random NFTs
    const mergeImages = require("merge-images");
    const { Canvas, Image } = require("canvas");
    const path = require("path");
    const fs = require("fs");
    const { MersenneTwister19937, bool, real } = require("random-js");

    const layersPath = path.join(process.cwd(), "layers");
    const outputPath = path.join(process.cwd(), "output");

    async function generateNFTs(num, outputPath) {
      let generated = new Set();

      for (let tokenId = 0; tokenId < num; tokenId++) {
        console.log(`Generating NFT #${tokenId} …`);

        let selection = randomlySelectLayers(layersPath, content.layers);
        const traitsStr = JSON.stringify(selection.selectedTraits);

        if (generated.has(traitsStr)) {
          console.log("Duplicate detected. Retry …");
          tokenId--;
          continue;
        } else {
          generated.add(traitsStr);
          await mergeLayersAndSave(selection.images, path.join(outputPath, `${tokenId}.png`));

          let metadata = generateMetadata(content, tokenId, selection.selectedTraits);
          fs.writeFileSync(path.join(outputPath, `${tokenId}`), JSON.stringify(metadata));
        }
      }
    }

    function generateMetadata(content, tokenId, traits) {
      attributes = [];
      for (const [trait_type, value] of Object.entries(traits)) {
        attributes.push({ trait_type, value });
      }

      return content.metadataTemplate(tokenId, attributes);
    }

    function randomlySelectLayers(layersPath, layers) {
      const mt = MersenneTwister19937.autoSeed();

      let images = [];
      let selectedTraits = {};

      for (const layer of layers) {
        if (bool(layer.probability)(mt)) {
          let selected = pickWeighted(mt, layer.options);
          selectedTraits[layer.name] = selected.name;
          images.push(path.join(layersPath, selected.file));
        }
      }

      return {
        images,
        selectedTraits,
      };
    }

    function pickWeighted(mt, options) {
      const weightSum = options.reduce((acc, option) => {
        return acc + (option.weight ?? 1.0);
      }, 0);

      const r = real(0.0, weightSum, false)(mt);

      let summedWeight = 0.0;
      for (const option of options) {
        summedWeight += option.weight ?? 1.0;
        if (r <= summedWeight) {
          return option;
        }
      }
    }

    async function mergeLayersAndSave(layers, outputFile) {
      const image = await mergeImages(layers, { Canvas: Canvas, Image: Image });
      saveBase64Image(image, outputFile);
    }

    function saveBase64Image(base64PngImage, filename) {
      let base64 = base64PngImage.split(",")[1];
      let imageBuffer = Buffer.from(base64, "base64");
      fs.writeFileSync(filename, imageBuffer);
    }

    generateNFTs(1, outputPath);

    //Successfully log data

    res.status(200).json({
      success: true,
      message: "Success",
    });
  } catch (error) {
    next(error);
  }
};
