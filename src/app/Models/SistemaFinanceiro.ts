export class SistemaFinanceiro{
    id : number;
    nome: string;
    mes: number;
    ano: number;
    diaFechamento: number;
    gerarCopiaDespesa: boolean;
    mesCopia: number;
    anoCopia: number;

    NomePropriedade: string = "";
    mensagem: string ="";
    notificacoes:[] = [];
}