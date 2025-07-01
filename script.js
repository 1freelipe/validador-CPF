function ValidaCPF(cpf) {

    if (cpf === undefined) return;

    Object.defineProperty(this, 'cpfLimpo', {
        get: function () {
            return cpf.replace(/\D+/g, '');
        }
    })

}

ValidaCPF.prototype.valida = function () {
    if (this.cpfLimpo === undefined) return false;
    if (this.cpfLimpo.length !== 11) return false;
    if (this.isSequencia()) return false;

    const cpfParcial = this.cpfLimpo.slice(0, -2);
    const calculo1 = this.calculo(cpfParcial);
    const calculo2 = this.calculo(cpfParcial + calculo1);

    const novoCPF = calculo1 + calculo2;

    if (novoCPF === this.cpfLimpo.slice(-2)) {
        return true;
    } else {
        return false;
    }
}

ValidaCPF.prototype.calculo = function (cpfParcial) {
    const arrayCPF = Array.from(cpfParcial);

    let regressivo = arrayCPF.length + 1;
    const digito = arrayCPF.reduce((ac, val) => {
        ac += (regressivo * Number(val));
        regressivo--;
        return ac;
    }, 0)

    let primeiroDigito = 11 - (digito % 11);

    return primeiroDigito > 9 ? '0' : String(primeiroDigito);

}

ValidaCPF.prototype.isSequencia = function () {
    return this.cpfLimpo[0].repeat(11) === this.cpfLimpo;
}


const valida = document.querySelector('#btnValida')
valida.addEventListener('click', (e) => {
    e.preventDefault('submit');

    const inputCPF = document.querySelector('#recebecpf').value;
    const cpf = new ValidaCPF(inputCPF);
    const validador = cpf.valida();
    const resultado = document.querySelector('#resultado');

    if (validador) {
        resultado.innerHTML = 'CPF válido';
        resultado.classList.add('CPFvalido');
        resultado.classList.remove('CPFinvalido');
    } else {
        resultado.innerHTML = 'CPF inválido';
        resultado.classList.add('CPFinvalido');
        resultado.classList.remove('CPFvalido');
    }

});
