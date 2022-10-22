const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
  constructor(field){
    this.field=field
  }
  print(){
    let f=this.field.map(a=>a.join(''))
    for (let i=0;i<f.length;i++){
      process.stdout.write(`${f[i].toString()} \n`)
    }
    // console.log(this.field[0][2]==hole)
  }


  play(){
    this.print()

    const boundary=()=>{
      process.stdout.write('you are out of bounds \n GAME OVER! \n')
      process.exit()
    }

    const holes=()=>{
      process.stdout.write('you fell into a hole \n GAME OVER!')
      process.exit()
    }

    const winner=()=>{
      process.stdout.write('you found your hat \n CONGRATULATIONS!')
      process.exit()
    }

    let pos=[0,0]

    let out=pos[0];
    let inner =pos[1];
    while(true){
      let move=prompt("what's your move : ")
      switch(move) {
        case 'd': {
          pos[0]++;
          out =pos[0];
          if (pos[0]>=this.field.length){
          this.print();
          boundary();
          }

          else if (this.field[out][inner]==hole){
            this.print();
            holes();
          }
          else if (this.field[out][inner]==hat){
            this.print();
            winner();
          }
          else {
            this.field[out][inner]=pathCharacter;
            this.print()
          }
          break;
        }
        case 'u': {
          pos[0]--;
          out =pos[0];
          if (pos[0]< 0){
            this.print();
            boundary();
          }

          else if (this.field[out][inner]==hole){
            this.print();
            holes();
          }
          else if (this.field[out][inner]==hat){
            this.print();
            winner();
          }
          else {
            this.field[out][inner]=pathCharacter;
            this.print()
          }
          break;
        }
        case 'r': {
          pos[1]++;
          inner=pos[1];
          if (pos[1]>=this.field[out].length){
          this.print();
          boundary();
          }
          else if (this.field[out][inner]==='O'){
            this.print();
            holes();
          }
          else if (this.field[out][inner]==hat){
            this.print();
            winner();
          }
          else {
            this.field[out][inner]=pathCharacter;
            this.print()
          }
          break;
        }
        case 'l': {
          pos[1]--;
          inner=pos[1];
          if (pos[1]< 0){
          this.print();
          boundary();
          }
          else if (this.field[out][inner]===hole){
            this.print();
            holes();
          }
          else if (this.field[out][inner]==hat){
            this.print();
            winner();
          }
          else {
            this.field[out][inner]=pathCharacter;
            this.print()
          }
          break;
        }
        default : process.stdout.write('enter u: for up \nd: for down \nr: for right \nl:left')
      }
    }
  }

   generateField(width,height){
    const arr=[];
    for (let i=0;i<height;i++){
      const temp=[]
      for (let j=0;j<width;j++){
      temp.push('░')
      }
      arr.push(temp)
    }
    
    for (let i=0;i<height/2;i++){
      const ho=Math.floor(Math.random()*height)
      for (let j=0;j<width/2;j++){
        const oh=Math.floor(Math.random()*width);
        arr[ho][oh]='O'
      }
    }
    const ha=Math.floor(Math.random()*height);
    const ah=Math.floor(Math.random()*width);
    arr[ha][ah]='^';
    arr[0][0]='*'
    this.field=arr;

  }
}
const game=new Field([['*', '░', 'O'],
  ['░', 'O', '░'],
  ['░', '^', '░'],
])

// console.log(game.field)
// game.print()
// game.play()
game.generateField(4,5)
game.play()
