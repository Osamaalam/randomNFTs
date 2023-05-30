module.exports = {
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
      options: [
        {
          name: "Blue",
          file: "background/blue.png",
          weight: 1,
        },
        {
          name: "Green",
          file: "background/green.png",
          weight: 1,
        },
        {
          name: "Orange",
          file: "background/orange.png",
          weight: 1,
        },
        {
          name: "Wheat",
          file: "background/wheat.png",
          weight: 1,
        },
      ],
    },
    {
      name: "Head",
      probability: 1.0,
      options: [
        {
          name: "Albino",
          file: "head/albino.png",
          weight: 0.25,
        },
        {
          name: "Light",
          file: "head/light.png",
          weight: 1,
        },
        {
          name: "Mid",
          file: "head/mid.png",
          weight: 1,
        },
        {
          name: "Skeleton",
          file: "head/skeleton.png",
          weight: 0.1,
        },
        {
          name: "Zombie",
          file: "head/zombie.png",
          weight: 0.1,
        },
      ],
    },
    {
      name: "Shirt",
      probability: 1.0,
      options: [
        {
          name: "Flames",
          file: "shirt/flames.png",
          weight: 0.2,
        },
        {
          name: "Pinata",
          file: "shirt/pinata.png",
          weight: 0.4,
        },
        {
          name: "Purple Blue Pink",
          file: "shirt/purple-blue-pink.png",
          weight: 1,
        },
        {
          name: "Stripes Blue White",
          file: "shirt/stripes-blue-white.png",
          weight: 1,
        },
      ],
    },
    {
      name: "Eyes",
      probability: 0.25,
      options: [
        {
          name: "3D",
          file: "eyes/3d.png",
          weight: 1,
        },
        {
          name: "Long Beard",
          file: "eyes/laser.png",
          weight: 0.25,
        },
        {
          name: "Square Shades",
          file: "eyes/square-shades.png",
          weight: 1,
        },
      ],
    },
  ],
};
