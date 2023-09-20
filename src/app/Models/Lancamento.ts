export class Lancamento{
    id: number = 0;
    nome: string;
    valor: number;
    mes: number;
    ano: number;
    tipoLancamento: number;
    dataCadastro: Date;
    dataAlteracao: Date;
    dataPagamento: Date;
    dataVencimento: Date;
    pago: boolean;
    despesaAtrasada: boolean;
    idCategoria: number;
    
    NomePropriedade: string = "";
    mensagem: string ="";
    notificacoes:[] = [];
}