let ids = 0;
let ingressos = [];

module.export{
  new(nome,preco,estoque){
    let ingresso = {id: ids,nome: nome, preco:preco, estoque:estoque};
    ingressos.push(ingresso);
    ids++;
  },
  getPositionById(identificador) {
        let i = 0;
        if (identificador) {
            for (i = 0; i < users.length; i++) {
                if (ingressos[i].id == identificador) {
                    return i;
                }
            }
        }
        return -1;
    }
}
