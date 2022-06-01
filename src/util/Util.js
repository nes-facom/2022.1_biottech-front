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
}


export default new Util();