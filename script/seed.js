'use strict'

const db = require('../server/db')
const Products = require('../server/db/models/product')
const User = require('../server/db/models/user.js')

const products = [
  {
    name: 'Premium Pils',
    brand: 'Bitburger Braurie',
    description:
      'First the bright, fresh golden colour and rich frothy head so typical of this elegant Pilsner beer. Its refined herbal notes are delicately poised, followed by a nutty and honeyed aftertaste. The overall impression of this gently sparkling beer is one of deep harmony, with the unmistakeable bitterness of the hops balanced and contained by an agreeable, mellow sweetness in the body.',
    imageUrl:
      'https://d2lnr5mha7bycj.cloudfront.net/product-image/file/large_cf161e55-2dc7-42f5-b5e9-7aa13ae93948.jpg',
    price: 1299
  },
  {
    name: 'Schofferhofer Hefeweizen Grapefruit Bier',
    brand: 'Binding-Brauerei AG',
    description:
      'As you might’ve guessed we’re from Germany, but what might surprise you is that we’re the world’s first Hefeweizen (wheat beer) grapefruit beer. Best served cold, it’s the perfect casual brew to cool you off during the summer, but it can be enjoyed all year round any time of the day. It’s a true 50/50 blend of total refreshment made from 50% Schofferhofer Hefeweizen blended with 50% carbonated juice of 100% natural ingredients.',
    imageUrl:
      'https://cdn.shopify.com/s/files/1/0566/6837/products/schoffer_grapefruit_grande.jpg?v=1550461097',
    price: 1099
  },
  {
    name: 'Breakfast Stout',
    brand: 'Founders Brewing Company',
    description:
      'The coffee lover’s consummate beer. Brewed with an abundance of flaked oats, bitter and imported chocolates, and two types of coffee, this stout has an intense fresh-roasted java nose topped with a frothy, cinnamon-colored head that goes forever.',
    imageUrl:
      'https://cdn.shopify.com/s/files/1/0566/6837/products/breakfast_stout_grande.png?v=1540418505',
    price: 1099
  },
  {
    name: 'Sunday Brunch',
    brand: 'Kane Brewing Company',
    description: 'Formerly known as Morning Bell with Cinnamon & Maple Syrup',
    imageUrl:
      'https://images.squarespace-cdn.com/content/v1/56f17f6f45bf211d1030c046/1500852007080-B8Q6IZ4YT3OCZPWW6QWR/ke17ZwdGBToddI8pDm48kKAwwdAfKsTlKsCcElEApLR7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QPOohDIaIeljMHgDF5CVlOqpeNLcJ80NK65_fV7S1UegTYNQkRo-Jk4EWsyBNhwKrKLo5CceA1-Tdpfgyxoog5ck0MD3_q0rY3jFJjjoLbQ/image-asset.jpeg?format=2500w',
    price: 1499
  },
  {
    name: 'Weihenstephaner Hefeweissbier',
    brand: 'Weihenstephaner Hefeweissbier',
    description:
      ' Our golden-yellow wheat beer, with its fine-poured white foam, smells of cloves and impresses consumers with its refreshing banana flavour. It is full bodied and with a smooth yeast taste. To be enjoyed at any time,goes excellently with fish and seafood, with spicy cheese and especially with the traditional Bavarian veal sausage. Brewed according to our centuries-old brewing tradition on the Weihenstephan hill.',
    imageUrl:
      'https://devinecellars.com.au/wp-content/uploads/k4_beer_international_weihenstephaner_hefe_weissbier_12pk.jpg',
    price: 999
  },
  {
    name: 'Of Foam And Fury',
    brand: 'Galway Bay Brewery',
    description:
      'This double IPA is hazy orange, dense bubbly white head, good lacing. Aroma - big tropical fruits, sweet fruity malts, grapefruit pith, lots of pithy resinous fruits, super aroma. Taste as the aroma, great background of sweet fruits, mango, tropical nots, juicy citrus, resinous hops, good bitter sweet balance, complex flavour, so drinkable for the abv, cracking stuff.',
    imageUrl: 'http://i.ytimg.com/vi/t8d4Tv34RXU/hqdefault.jpg',
    price: 899
  },
  {
    name: 'Amber Ella',
    brand: 'Eight Degrees Brewing',
    description:
      'For this American Amber Ale, we had our pick of the Aussie hop harvest so it’s all about Galaxy and Ella in this rather special limited edition brew.',
    imageUrl:
      'https://www.belgiansmaak.com/wp-content/gallery/irish-beer-tasting/cache/IMG_0440.JPG-nggid03638-ngg0dyn-0x0x100-00f0w010c010r110f110r010t010.JPG',
    price: 1199
  },
  {
    name: 'Mac Nutty',
    brand: 'Lough Gill Brewing Company',
    description:
      'Things were getting a bit squirrely over here, it must be the trays upon trays of macadamia nuts we hand-roasted for this beer. Some would say we have gone nuts – but taking our time over each and every step is part of what makes every one of our craft brews unique.',
    imageUrl:
      'https://i2.wp.com/simonsaysbeer.com/wp-content/uploads/2017/01/wp-image-1371930644jpg.jpg?zoom=2&resize=640%2C853',
    price: 799
  },
  {
    name: 'Heady Topper',
    brand: 'The Alchemist',
    description: 'An American Double IPA. Drink from the can.',
    imageUrl:
      'https://www.tripsavvy.com/thmb/j16ngPzenjW3ukKmCts3i1hy0ac=/960x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/heady-topper-58e258523df78c5162add349.jpg',
    price: 1099
  }
]

const users = [
  {
    firstName: 'Ally',
    lastName: 'Lobova',
    address: '5 Hanover Pl',
    email: 'abc@gmail.com',
    password: '12345'
  },
  {
    firstName: 'Sam',
    lastName: 'Li',
    address: '7 Hanover Pl',
    email: 'def@gmail.com',
    password: '6789'
  },
  {
    firstName: 'Oleksii',
    lastName: 'Musinov',
    address: '9 Hanover Pl',
    email: 'ghi@gmail.com',
    password: '1112'
  }
]

const seed = async () => {
  await db.sync({force: true})
  const product = await seedProducts()
  console.log('Seeded', product.length, 'products.')
  const user = await seedUsers()
  console.log('Seeded', user.length, 'users.')
  console.log('Seeding success!')
}

function seedProducts() {
  return Promise.all(
    products.map(product => {
      return Products.create(product)
    })
  )
}

function seedUsers() {
  return Promise.all(
    users.map(user => {
      return User.create(user)
    })
  )
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
