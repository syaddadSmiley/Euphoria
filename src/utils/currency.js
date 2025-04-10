export default function Currency(value) {
    var formattedValue = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
    }).format(value);

    return formattedValue.slice(0, -3);
}