export default class Helpers {
    static getCategories() {
      return ['Starter', 'Main course', 'Dessert', 'Beverage'];
    }
  
    static getTypes() {
        return ['Breakfast', 'Brunch', 'Lunch', 'Small meal', 'Dinner'];
    }
    
    static getRandomImage(){
      const images = [
        'anna.jpg',
        'casey.jpg',
        'gonzalez.jpg',
        'jimmy.jpg',
        'joseph.jpg',
        'lecker.jpg',
        'lidye.jpg',
        'montano.jpg',
        'pizza.jpg',
        'salat.jpg',
        'sonas.jpg',
      ];
      return images[Math.floor(Math.random()*images.length)];
    }
  }