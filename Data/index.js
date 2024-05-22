export const TOP_PLACES = [
  {
    id: 1,
    image: require('../assets/image/place1.jpeg'),
    title: 'Rome',
    location: 'Italy',
    description:
      'The ultimate Amalfi Coast travel guide, where to stay, where to eat, and what areas to visit in the Amalfi Coast of Italy. Positano, Ravello, Amalfi and more',
  },
  {
    id: 2,
    image: require('../assets/image/place2.jpeg'),
    title: 'Paris',
    location: 'France',
    description:
      'Granada is the capital city of the province of Granada, in the autonomous community of Andalusia, Spain',
  },
  {
    id: 3,
    image: require('../assets/image/place3.jpeg'),
    title: 'Barcelone',
    location: 'Spain',
    description:
      "Cherry blossoms usually bloom between mid-March and early May. In 2022, Tokyo's cherry blossom season officially began on March 20",
  },
];

export const BOATS = [
  {
    id: 1,
    name:"Cruiser - OCeanis 40",
    images:require('../assets/image/boat1.webp'),
    title:'4 - 7 hours No Captain',
    description: 'Do not miss the opportunity to board this magnificent oceanis 35. Finot-Conqs sharp-edged boat hull and the slightly displaced mast will offer you great balance and comfort on the one hand, and on the other excellent performance and great stability in navigation. The large space inside, consisting of a fitted kitchen, three double cabins and a bathroom with shower will ensure you maximum comfort while the two helm stations and the wide stern platform from which you can dive into the crystal clear waters of sardinia will simplify the conduct of the boat and facilitate the descent into the sea. Come and discover capo san marco, a promontory in the southern part of the sinis peninsula that can be reached in just 40 minutes by boat or take this opportunity to visit an ancient settlement such as a phoenician city founded in the 8th century BC. Furthermore, about 14 nautical miles from the tourist port of oristano, there is also mal di Ventre, in Sardinian Malu Etna, a small island facing the coast.',
    price: '250',
    location: {
      ville: 'Paris ',
      pays: 'France'
    },
    capacity:12,
    nbrCabins:2,
    nbrBaths : 1,
    ownerInfo:{
      username:"firas ben achour",
      avatar:require('../assets/image/profilepic.png'),
    }
  },
  {
    id: 2,
    name:"Cruiser - OCeanis 777",
    images:require('../assets/image/boat2.webp'),title:'4 - 7 hours No Captain',
    description: 'Do not miss the opportunity to board this magnificent oceanis 35. Finot-Conqs sharp-edged boat hull and the slightly displaced mast will offer you great balance and comfort on the one hand, and on the other excellent performance and great stability in navigation. The large space inside, consisting of a fitted kitchen, three double cabins and a bathroom with shower will ensure you maximum comfort while the two helm stations and the wide stern platform from which you can dive into the crystal clear waters of sardinia will simplify the conduct of the boat and facilitate the descent into the sea. Come and discover capo san marco, a promontory in the southern part of the sinis peninsula that can be reached in just 40 minutes by boat or take this opportunity to visit an ancient settlement such as a phoenician city founded in the 8th century BC. Furthermore, about 14 nautical miles from the tourist port of oristano, there is also mal di Ventre, in Sardinian Malu Etna, a small island facing the coast.',
    price: '300',
    location: {
      ville: 'London ',
      pays: 'United Kingdom'
    },
    capacity:12,
    nbrCabins:2,
    nbrBaths : 1,
    ownerInfo:{
      username:"Anis Gh ",
      avatar:require('../assets/image/profilepic.png'),
    }
  },
  {
    id: 3,
    name:"Cruiser - OCeanis 35",
    images:require('../assets/image/boat3.webp'),
      title:'4 - 7 hours No Captain',
    description: 'Do not miss the opportunity to board this magnificent oceanis 35. Finot-Conqs sharp-edged boat hull and the slightly displaced mast will offer you great balance and comfort on the one hand, and on the other excellent performance and great stability in navigation. The large space inside, consisting of a fitted kitchen, three double cabins and a bathroom with shower will ensure you maximum comfort while the two helm stations and the wide stern platform from which you can dive into the crystal clear waters of sardinia will simplify the conduct of the boat and facilitate the descent into the sea. Come and discover capo san marco, a promontory in the southern part of the sinis peninsula that can be reached in just 40 minutes by boat or take this opportunity to visit an ancient settlement such as a phoenician city founded in the 8th century BC. Furthermore, about 14 nautical miles from the tourist port of oristano, there is also mal di Ventre, in Sardinian Malu Etna, a small island facing the coast.',
    price: '300',
    location: {
      ville: 'London ',
      pays: 'United Kingdom'
    },
    capacity:12,
    nbrCabins:2,
    nbrBaths : 1,
    ownerInfo:{
      username:"firas ben achour",
      avatar:require('../assets/image/profilepic.png'),
    }
  },
  {
    id: 4 ,
    name:"Cruiser - OCeanis 35",
    images:require('../assets/image/boat4.webp'),
    title:'4 - 7 hours No Captain',
    description: 'Do not miss the opportunity to board this magnificent oceanis 35. Finot-Conqs sharp-edged boat hull and the slightly displaced mast will offer you great balance and comfort on the one hand, and on the other excellent performance and great stability in navigation. The large space inside, consisting of a fitted kitchen, three double cabins and a bathroom with shower will ensure you maximum comfort while the two helm stations and the wide stern platform from which you can dive into the crystal clear waters of sardinia will simplify the conduct of the boat and facilitate the descent into the sea. Come and discover capo san marco, a promontory in the southern part of the sinis peninsula that can be reached in just 40 minutes by boat or take this opportunity to visit an ancient settlement such as a phoenician city founded in the 8th century BC. Furthermore, about 14 nautical miles from the tourist port of oristano, there is also mal di Ventre, in Sardinian Malu Etna, a small island facing the coast.',
    price: '300',
    location: {
      ville: 'London ',
      pays: 'United Kingdom'
    },
    capacity:12,
    nbrCabins:2,
    nbrBaths : 1,
    ownerInfo:{
      username:"firas ben achour",
      avatar:require('../assets/image/profilepic.png'),
    }
  },
];



export const swiperImages = BOATS.map(boat => boat.images);

const dummyMessages = [
  {
    id: '1',
    avatar: require('../assets/image/profilepic.png'),
    username: 'Firas Ben Achour',
    messagePreview: 'Hey there! How are you?',
    timestamp: '10:00 AM',
  },
  {
    id: '2',
    avatar: require('../assets/image/profilepic.png'),
    username: 'Anis Ghodhbani',
    messagePreview: 'Just wanted to say hi!',
    timestamp: 'Yesterday',
  },
  {
    id: '3',
    avatar: require('../assets/image/profilepic.png'),
    username: 'Anis Ghodhbani',
    messagePreview: 'Just wanted to say hi!',
    timestamp: 'Yesterday',
  },
  // Add more dummy messages as needed
];

export default dummyMessages;
