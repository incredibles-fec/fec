export const sampleOutfitDefault = {
  id: 55524,
  image: 'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80',
  category: 'Pants',
  name: 'Morning Joggers',
  sale_price: null,
  price: 400,
  default_price: 551,
};

export const sampleOutfitSale = {
  id: 55525,
  image: 'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80',
  category: 'Pants',
  name: 'Morning Joggers',
  sale_price: 400,
  default_price: 551,
};

export const sampleProductDefault = {
  id: 55524,
  campus: 'rfp2212',
  image: 'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80',
  category: 'Pants',
  name: 'Morning Joggers',
  salePrice: null,
  features: [
    {
      feature: 'Sole',
      value: 'Rubber'
    },
    {
      feature: 'Material',
      value: 'FullControlSkin'
    },
    {
      feature: 'Stitching',
      value: 'Double Stitch'
    }
  ],
  price: 400,
};

export const sampleProductSale = {
  id: 40352,
  image: 'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80',
  category: 'Pants',
  name: 'Morning Joggers',
  salePrice: 400,
  price: 551,
  features: [
    {
      feature: 'Material',
      value: 'FullControlSkin'
    },
    {
      feature: 'Stitching',
      value: 'Double Stitch'
    }
  ],
};

export const sampleOutfitList = [
  {
    id: 40351,
    campus: 'hr-rfp',
    name: 'YEasy 350',
    slogan: 'Just jumped over jumpman',
    description: 'These stretchy knit shoes show off asymmetrical la…bber midsole. In a nod to adidas soccer heritage.',
    category: 'Pants',
  },
  {
    id: 40352,
    campus: 'hr-rfp',
    name: 'Airforce Twos',
    slogan: 'Higher Jumper than you',
    description: 'Great pair of shoes',
    category: 'Pants',
  },
];
