const Sequelize = require('sequelize');
const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/dealers_choice_react');
const { STRING, TEXT } = Sequelize.DataTypes;
const faker = require('faker');

const Food = conn.define('foods', {
    name: {
        type: STRING,
        allowNull: false,
        unique: true,
        defaultValue: faker.lorem.word()
    },
    bio: {
        type: TEXT,
        defaultValue: faker.lorem.paragraph(2)
    },
    videoUrl: {
        type: STRING,
        defaultValue: 'https://www.youtube.com/embed/_PK95JMWd_Y'
    },
    imgURL: {
        type: STRING,
        defaultValue: faker.image.food()
    }
});

const Country = conn.define('countries', {
    name: {
        type: STRING,
        allowNull: false,
        unique: true,
        defaultValue: faker.address.country()
    },
    imgURL: {
        type: STRING,
        defaultValue: faker.image.imageUrl()
    }
});

Food.belongsTo(Country);
Country.hasMany(Food);

const syncAndSeed = async() => {
    try {
        await conn.sync({force: true});
        const korea = await Country.create({
            name: 'Korea',
            imgURL: 'https://asiasociety.org/sites/default/files/styles/1200w/public/K/korean-flag.jpg'
        });
        const italy = await Country.create({
            name: 'Italy',
            imgURL: 'https://emgf-wordpress-media.s3.eu-west-2.amazonaws.com/wp-content/uploads/2021/02/27112120/italy-italia-flag-of-italy-italian-flag-flag.jpg'
        });
        const india = await Country.create({
            name: 'India',
            imgURL: 'https://cdn.britannica.com/97/1597-004-05816F4E/Flag-India.jpg'
        });
        const sundubu = await Food.create({
            name: 'Sundubu',
            bio: 'Sundubu-jjigae or soft tofu stew is a jjigae (Korean stew) in Korean cuisine. The dish is made with freshly curdled soft tofu (which has not been strained and pressed), vegetables, sometimes mushrooms, onion, optional seafood (commonly oysters, mussels, clams and shrimp), optional meat (commonly beef or pork), and gochujang (chili paste) or gochu garu (chili powder).',
            videoUrl: 'https://www.youtube.com/embed/itUDRx9vcb0',
            imgURL: 'https://www.maangchi.com/wp-content/uploads/2015/01/soondubujjigae.jpg',
            countryId: korea.id
        });
        const bibimbap = await Food.create({
            name: 'Bibimbap',
            bio: 'Bibimbap is a Korean rice dish. The term "bibim" means mixing rice, while the "bap" noun refers to rice. Bibimbap is served as a bowl of warm white rice topped with namul (sautéed and seasoned vegetables) or kimchi and gochujang (chili pepper paste), soy sauce, or doenjang (a fermented soybean paste). A raw or fried egg and sliced meat are common additions. The hot dish is stirred together thoroughly just before eating',
            videoUrl: 'https://www.youtube.com/embed/-kzUbOYvILU',
            imgURL: 'https://www.acouplecooks.com/wp-content/uploads/2018/11/Dolsot-Bibimbap-002.jpg',
            countryId: korea.id
        });
        const francese = await Food.create({
            name: 'Chicken Francese',
            bio: 'Chicken Française (or Chicken Francese) is an Italian-American dish of flour-dredged, egg-dipped, sautéed chicken cutlets with a lemon-butter and white wine sauce. The dish is popular in the region surrounding Rochester, New York, where it is known as Chicken French, to the point that some have suggested the dish be called Chicken Rochester.',
            videoUrl: 'https://www.youtube.com/embed/SlAnXIcgn5g',
            imgURL: 'https://thesaltymarshmallow.com/wp-content/uploads/2019/11/Chicken-Francese.jpg',
            countryId: italy.id
        });
        const penne = await Food.create({
            name: 'Penne Vodka',
            bio: 'Penne alla vodka is a pasta dish made with vodka and penne pasta, usually made with heavy cream, crushed tomatoes, onions, and sometimes sausage, pancetta or peas. The recipe became very popular in Italy and in the United States around the 1980s, when it was offered to discotheque customers.',
            videoUrl: 'https://www.youtube.com/embed/HksBGrlsjTw',
            imgURL: 'https://sweetandsavorymeals.com/wp-content/uploads/2019/11/Penne-alla-Vodka-2.jpg',
            countryId: italy.id
        });
        const tandoori = await Food.create({
            name: 'Tandoori Chicken',
            bio: 'Tandoori chicken is a chicken dish prepared by roasting chicken marinated in yogurt and spices in a tandoor, a cylindrical clay oven. The dish originated from the Indian subcontinent and is popular in many other parts of the world. It’s a highly consistent product throughout curry houses within the UK and firm favourite.',
            videoUrl: 'https://www.youtube.com/embed/p5T1dcSS_zc',
            imgURL: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/chicken-tandori-1526595014.jpg',
            countryId: india.id
        });
        const biryani = await Food.create({
            name: 'Biryani',
            bio: 'Biryani is a mixed rice dish originating among the Muslims of the Indian subcontinent. It is made with spices, rice, and meat usually that of beef, chicken, goat, lamb, prawn, fish, and sometimes, in addition, eggs or vegetables such as potatoes in certain regional varieties.',
            videoUrl: 'https://www.youtube.com/embed/yM_W6Hq5r6c',
            imgURL: 'https://www.indianhealthyrecipes.com/wp-content/uploads/2019/02/chicken-biryani-recipe.jpg',
            countryId: india.id
        });
    }
    catch(ex) {
        console.log(ex);
    }
};

module.exports = {
    syncAndSeed,
    models: {
        Food,
        Country
    }
}