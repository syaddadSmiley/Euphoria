import { Br, Cut, Line, Printer, Text, Row, render, Image, Cashdraw } from 'react-thermal-printer';
import Currency from './currency';
import moment from 'moment';

async function printInvoiceInProgress(orderItemList, bill){
  console.log(bill)
  var totalWithServiceFee = (bill.total * 5/100) + bill.total;
  const detailItems = bill.order_items.map((val, index) => {
    return (
      <Row left={`${val.name} x${val.quantity}`} right={`${Currency(val.sub_total_price)}`} 
      key={index}>
        {val.items.map((itm, index) => {
          return (
            <Row left={`- ${itm.item_type}`} right={`${Currency(itm.item_price)}`} key={index} />
          );
        })}
      </Row>
    );
  });

  const receipt = (
    <Printer type="epson" width={42}>
      {bill.notes.length > 0 ? bill.notes.map((val, index) => {
        if(index === 0){
          return <Row bold={true} left={`- ${val}`} right={`#${bill.order_num}`} key={index} />
        }else{
          return (
            <Row bold={true} left={`- ${val}`} right="" key={index} />
          );
        }
      }) : null}
      <Image align="center" src="/logo-fnb.png" width={200} height={60} />
      <Br />
      <Line />
      <Row left="Open Bill" right={`${moment(bill.date).format('DD-MM-YYYY HH:mm')}`} />
      {
        bill.status === 'paid' ?
        <Row left="Close Bill" right={`${moment(bill.dateCloseBill).format('DD-MM-YYYY HH:mm')}`} />
        : null
      }
      <Line />
      {bill.order_items.map((val, index) => {
      return (
        <Printer type="epson" width={42}>
          <Row left={`${val.item_name} x ${val.quantity}`} right={`${Currency(val.sub_total_price)}`} 
          key={index} />
          {val.items.filter((filter) => filter.item_type !== 'default').map((itm, index) => {
            return (
              // <Row left={`- ${itm.item_type}`} right={`${Currency(itm.item_price)}`} key={index} />
              <Row left={`- ${itm.item_type}`} right="" key={index} />
            );
          })}
        </Printer>
        );
      })};
      <Line />
      <Row left="Metode Bayar: Cash" right={`Status: ${bill.status}`} />
      <Row left="Harga Jual" right={`${Currency(bill.total)}`} />
      <Row left="Service (5%)" right={`${Currency(bill.total * 5/100)}`} />
      <Row left="Total" right={`${Currency(totalWithServiceFee)}`} />
      <Row left={`Uang: ${Currency(bill.money)}`} right={`Kembalian: ${Currency(bill.kembalian)}`}/>
      <Line />
      <Row left="Kasir: AYS" right="Alamat: Jl. Sumatera No. 48A" />
      <Line /> 
      <Text align="center">Wifi: Kopi-Agus WIFI / PW: Candradimuka0987</Text>
      <Cut />
      {bill.status === "paid" ? <Cashdraw pin="5pin" /> : null}
    </Printer>
  );
  const data = await render(receipt);

  var port = null;
  try{
    port = await window.navigator.serial.requestPort();
    await port.open({ baudRate: 9600 });

    const writer = port.writable?.getWriter();
    if (writer != null) {
      await writer.write(data);
      writer.releaseLock();
    }
    port.close();
  }catch(err){
    console.log(err)
  }
  return data;
}

async function printDailyReport(dataReport){
  const receipt = (
    <Printer type="epson" width={42}>
      <Image align="center" src="/logo-fnb.png" width={200} height={60} />
      <Br />
      <Text bold={true}>Laporan Harian</Text>
      <Text>{moment().format('DD/MM/YYYY')}</Text>
      <Line />
      <Row left="Total Penjualan" right={`${Currency(dataReport.totalSales)}`} />
      <Row left="Total Service Fee" right={`${Currency(dataReport.totalServiceFee)}`} />
      <Row left="Total Transaksi" right={`${dataReport.totalTransaction}`} />
      <Text bold={true}>Detail Penjualan</Text>
      <Line />
      {dataReport.detailSales.map((val, index) => {
        return (
          <Row left={`${val.name} x${val.quantity}`} right={`${Currency(val.sub_total_price)}`} 
          key={index} />
        );
      })}
      <Cut />
    </Printer>
  );
  const data = await render(receipt);

  var port = null;
  try{
    port = await window.navigator.serial.requestPort();
    await port.open({ baudRate: 9600 });

    const writer = port.writable?.getWriter();
    if (writer != null) {
      await writer.write(data);
      writer.releaseLock();
    }
    port.close();
  } catch(err) {
    console.log(err)
  }
  return data;
}

export default { printInvoiceInProgress, printDailyReport };
