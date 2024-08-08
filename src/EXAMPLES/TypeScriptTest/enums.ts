




export function enumTest(){
  {
    enum Days {Mon, Tue, Wed, Thu, Fri, Sat, Sun}
    const sun: string = Days[6] // Sun
    const one: number = Days["Tue"] // 1
    const tue: number = Days.Tue
    const fri: Days = Days.Fri
    const thu: Days = 3
    const idxByEnumValue: number = Days.Sat.valueOf() // 5
    
    console.log(Days)
    console.log(sun) // => Sun
    console.log(one) // => 1 - (as number)
    console.log(tue) // => 1 - (as number)
    console.log(tue === Days.Tue) // => true
    console.log(tue === 1) // => true
    console.log(fri === 4) // => true
    console.log("idxByEnumValue: "+idxByEnumValue) // => 5
  }
  
  {
    // порядок продолжается от текущего числа если явно присвоить индекс
    enum Days {Mon, Tue, Wed=9, Thu, Fri, Sat, Sun}
    let value: string  = Days[4] // undefined - хотя тип undefined явно не указан, но ошибки не будет
    
    console.log(Days)
    console.log(value) // => undefined - (as undefined)
    
    value+="jjj"
    console.log(value) // => undefinedjjj - (as string)
  }
  
  {
    enum Directions {Up, Down, Left, Right}
    const directions = Directions
    console.log(directions) // => {0: 'Up', 1: 'Down', 2: 'Left', 3: 'Right', Up: 0, Down: 1, Left: 2, Right: 3} (as object)
    const up = Directions.Up
    console.log(up) // => 0 (as number)
    const up2 = Directions["Up"]
    console.log(up2) // => 0 (as number)
    const up3 = Directions[0]
    console.log(up3) // => Up (as string)
    
    const f = (d: Directions)=>{
      console.log(d)
      console.log(Directions[d])
      console.log()
    }
    f(Directions.Down)
    f(1)
  }
  
  {
    enum BooleanLikeHeterogeneousEnum {
      No = 0,
      Yes = "YES",
    }
  }
  
  {
    enum Random {
      RandomNum = Math.random(),
      Str = 'str',
      Num = 5,
    }
    const StrOrNum: Random.Str | Random.Num = Random.Num
    const NumOrRandomNum: Random.Num | Random.RandomNum = Random.RandomNum
  }
  
  
  
  {
    // const enum
    /*
     Const enums can only use constant enum expressions and unlike regular enums they are completely
     removed during compilation. Const enum members are inlined at use sites.
     This is possible since const enums cannot have computed members.
     */
    const enum Direction {
      Up,
      Down,
      Left,
      Right,
    }
    {
      let directions = [
        Direction.Up,
        Direction.Down,
        Direction.Left,
        Direction.Right,
      ];
    }
    // In generated code will become:
    let directions = [
      0 /* Direction.Up */,
      1 /* Direction.Down */,
      2 /* Direction.Left */,
      3 /* Direction.Right */,
    ];
  }
}