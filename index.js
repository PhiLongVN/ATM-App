const inputSO = document.querySelector('.inputso')
const btnClick = document.querySelector('button')
const number = document.querySelector('.number')
const number2 = document.querySelector('.number2')
const number3 = document.querySelector('.number3')
const number4 = document.querySelector('.number4')

class Money {
  constructor() {
    this.namTram = 20
    this.haiTram = 30
    this.motTram = 30
    this.namChuc = 20
    this.tong = this.namTram * 500 + this.haiTram * 200 + this.motTram * 100 + this.namChuc * 50
  }

  keuNapTien() {
    if (this.tong < 5000) {
      return true
    }
  }

  checkTien(data) {
    const leTien = data % 50
    return leTien
  }

  checkTiemConLai(data) {
    if (data > this.tong) {
      return true
    }
  }

  tinhNamTram(data) {
    const namTramCan = Math.floor(data / 500)
    const namTramDu = data % 500 || 0

    if (this.namTram < namTramCan) {
      const namTram = this.namTram
      data = data - namTram * 500
      return { namTramCan: namTram, namTramDu: data }
    }
    return { namTramCan, namTramDu }
  }
  tinhHaiTram(data) {
    const haiTramCan = Math.floor(data / 200)
    const haiTramDu = data % 200 ?? 0
    if (this.haiTram < haiTramCan) {
      const haiTram = this.haiTram
      data = data - haiTram * 200
      return { haiTramCan: haiTram, haiTramDu: data }
    }

    return { haiTramCan, haiTramDu }
  }
  tinhMotTram(data) {
    const motTramCan = Math.floor(data / 100)
    const motTramDu = data % 100

    if (this.motTram < motTramCan) {
      const motTram = this.motTram
      data = data - motTram * 100
      return { motTramCan: motTram, motTramDu: data }
    }
    return { motTramCan, motTramDu }
  }
  tinhNamChuc(data) {
    const namChucCan = Math.floor(data / 50)
    const namChucDu = data % 50

    return { namChucCan, namChucDu }
  }

  tinhToTien(data) {
    let tienNamTram = this.tinhNamTram(data)
    let tienHaiTram = { haiTramCan: 0, haiTramDu: 0 }
    let tienMotTram = { motTramCan: 0, motTramDu: 0 }
    let tienNamChuc = { namChucCan: 0, namChucDu: 0 }
    if (tienNamTram.namTramDu !== 0) {
      tienHaiTram = this.tinhHaiTram(tienNamTram.namTramDu)
    }
    if (tienHaiTram && tienHaiTram?.haiTramDu !== 0) {
      tienMotTram = this.tinhMotTram(tienHaiTram.haiTramDu)
    }
    if (tienMotTram && tienMotTram?.motTramDu !== 0) {
      tienNamChuc = this.tinhNamChuc(tienMotTram.motTramDu)
    }

    return { tienNamTram, tienHaiTram, tienMotTram, tienNamChuc }
  }

  tinhTatCa(data) {
    const tien = this.tinhToTien(data)
    const toTien500 = tien.tienNamTram.namTramCan
    const toTien200 = tien.tienHaiTram.haiTramCan
    const toTien100 = tien.tienMotTram.motTramCan
    const toTien50 = tien.tienNamChuc.namChucCan

    this.namTram = this.namTram - toTien500
    this.haiTram = this.haiTram - toTien200
    this.motTram = this.motTram - toTien100
    this.namChuc = this.namChuc - toTien50
    this.tong = this.tong - data

    return { toTien500, toTien200, toTien100, toTien50 }
  }
}

const tien = new Money()
number2.innerText = `số tờ tiền còn lại: tờ 500: ${tien.namTram}---tờ 200: ${tien.haiTram}---- tờ 100: ${tien.motTram}-----50: ${tien.namChuc}`

number3.innerText = `số tiền còn lại: ${tien.tong}`

inputSO.addEventListener('input', (e) => {
  const value = Number.parseFloat(e.target.value)
  if (Number.isNaN(value)) {
    inputSO.value = ''
  }
})

btnClick.addEventListener('click', () => {
  const value = inputSO.value

  const isSomeThingWrong = checkAll(value)
  if (isSomeThingWrong) {
    return
  }

  const toTien = tien.tinhTatCa(value)
  const toTien500 = toTien.toTien500
  const toTien200 = toTien.toTien200
  const toTien100 = toTien.toTien100
  const toTien50 = toTien.toTien50

  const checkHetTien = tien.keuNapTien()
  if (checkHetTien) {
    number4.innerText = `thông báo:số tiền gần hết, hãy nạp thêm tiền`
  }

  number.innerText = `số tờ tiền rút ra tờ 500: ${toTien500}---tờ 200: ${toTien200}---- tờ 100: ${toTien100}-----50: ${toTien50}`

  number2.innerText = `số tờ tiền còn lại tờ 500: ${tien.namTram}---tờ 200: ${tien.haiTram}---- tờ 100: ${tien.motTram}-----50: ${tien.namChuc}`

  number3.innerText = `số tiền còn lại ${tien.tong}`
})

const handleData = (data) => {
  const floatData = Number.parseFloat(data)

  if (data == '') {
    alert('phải nhập số tiền vào')
    return true
  } else if (floatData < 1) {
    alert('so lon hon 0')
    return true
  }
}

const checkAll = (value) => {
  const check = handleData(value)
  if (check) {
    return true
  }

  const checkThieuTien = tien.checkTiemConLai(value)
  if (checkThieuTien) {
    alert('số tiền còn lại không đủ')
    return true
  }

  const leTien = tien.checkTien(value)
  if (leTien !== 0) {
    alert('số tiền phải chia hết cho 50k')
    return true
  }
}
