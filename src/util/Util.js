class Util {
  formatPhones(obj) {
    const arr = Object.keys(obj).map(function (key) {
      return obj[key]
    })
    let str = ''
    arr.forEach((element) => {
      if (str == '') {
        str += element.telefone
      } else {
        str += '\n' + element.telefone
      }
    })
    return str
  }

  getListYears() {
    const years = [2018, 2019, 2020, 2021, 2022]
    return years
  }
}

export default new Util()
