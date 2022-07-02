class Util {
  
  getListYears() {
    const years = [2018, 2019, 2020, 2021, 2022]
    return years
  }

  formatDate(today) {
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1; // Months start at 0!
    let dd = today.getDate();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    today = yyyy + '-' + mm + '-' + dd;

    return today;
  }

  formatDateTable(today) {
    var date = today.split("-");

    return date[2] + '/' + date[1] + '/' + date[0];
  }
}

export default new Util()
