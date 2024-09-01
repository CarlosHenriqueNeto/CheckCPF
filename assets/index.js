let form = document.querySelector('#formulario');
let input = document.querySelector('#cpf');
let paragrafo = document.querySelector('#paragrafo');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    paragrafo.innerHTML = validaCPF(input.value);
    criaClasse(validaCPF(input.value));
})

function criaClasse(value) {
    //Como a pagina não atualiza, as classes que são colocadas ficam duplicadas após 2 inserts com valores true e false
    //Esse if verifica se o elemento <p> ja não tem classe, para que não ocorra essa duplicação
    if (paragrafo.classList.length > 0) paragrafo.classList.remove(paragrafo.classList.item(0));

    //esse if insere uma class no <p> para estilização no css
    if (value === "CPF CERTO!!!") return paragrafo.classList.add("sucesso");
    return paragrafo.classList.add("errado");
};
//função que valida o CPF
function validaCPF(cpf) {

    let LimpaCpf = (cpf) => {
        cpfLimpo = cpf.replace(/\D+/g, '');
        let cpfArray = Array.from(cpfLimpo);
        cpfArray.splice(-2);
        return cpfArray;
    };

    let calculaDigito = (cpfArray) => {

        for (let i = 0; i <= 1; i++) {
            let num = 10 + i;

            let map = cpfArray.map((x) => {
                let armazena = x * num;
                num--;
                return armazena;
            });
            let cpfReduzido = map.reduce((ac, val) => ac + val, 0);
            let digito = 11 - (cpfReduzido % 11);

            if (digito > 9) {
                digito = 0;
                cpfArray.push(String(digito));
            }
            cpfArray.push(String(digito));
        }
    };

    let arrayEmString = array => array.join('');

    let verificaCPF = (cpfCalculado) => {
        let msg;
        let cpfLimpo = cpf.replace(/\D+/g, '');
        if (cpfCalculado === cpfLimpo) return msg = 'CPF CERTO!!!';
        return msg = 'CPF ERRADO!!!';
    };

    let cpfArray = LimpaCpf(cpf);
    calculaDigito(cpfArray);
    return verificaCPF(arrayEmString(cpfArray));
}
