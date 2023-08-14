import { CaixaDaLanchonete } from './src/caixa-da-lanchonete';

const caixa = new CaixaDaLanchonete();
const resultado = caixa.calcularValorDaCompra('debito', ['chantily,1']);
console.log(resultado);
