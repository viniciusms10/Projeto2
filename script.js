const clicar = (ano,cod,ch,not,fre) => {

    const valorAno = document.getElementById('periodo')
    const valorDisciplina = documment.getElementById('disciplina')
    const valorCH = document.getElementById('CH')
    const valorNota = document.getElementById('nota')
    const valorFrequencia = document.getElementById('frequencia')

    valorAno.innerText = ano
    valorDisciplina.innerHTML = cod
    valorCH.innerHTML = ch
    valorNota.innerHTML = not
    valorFrequencia.innerHTML = fre

}



const Form = document.getElementById("form");

Form.addEventListener('submit', (e) => {
    e.preventDefault()

    const disciplina = {
        Nota: parseFloat(document.getElementById('not').value),
        Periodo: document.getElementById('ano').value,
        Codigo: document.getElementById('cod').value,
        Frequencia: parseFloat(document.getElementById('fre').value),
        CargaHoraria:  parseFloat(document.getElementById('car').value)
    }

    Form.reset()

    ftempo(disciplina.Periodo)
    fmediach(disciplina.CargaHoraria)
    fdesvio(disciplina.Nota)
    faprovados(disciplina.Nota, disciplina.Codigo, disciplina.Frequencia)
    fdepartamento( disciplina.Codigo, disciplina.Nota)
    flistar(disciplina.Codigo, disciplina.Nota, disciplina.Periodo, disciplina.Frequencia, disciplina.CargaHoraria)
})

const disciplinasaprovadas = []
const disciplinasreprovadas = []
const listanotas = []
const listaperiodos = []
const listafrequencia = []
const listach = []
const listacodigos = []

const flistar = (codigo, nota, periodo, frequencia, cargahoraria) => {
    document.getElementById('disciplina').innerHTML = codigo
    document.getElementById('nota').innerHTML = nota
    document.getElementById('periodo').innerHTML = periodo
    document.getElementById('frequencia').innerHTML = `${frequencia}%`
    document.getElementById('CH').innerHTML = `${cargahoraria} horas.`
}

const ftempo = (periodo) => {

    if (listaperiodos.indexOf(periodo) == -1) {
        listaperiodos.push(periodo)

    } else return

    document.getElementById('resulttempo').innerHTML = `${listaperiodos.length} período(s)`

}


const fmediach = (cargahoraria) => {
    listach.push(cargahoraria)
    listareduzida = listach.reduce((acc, x) => acc + x, 0)
    const mediach = listareduzida / listach.length

    if (Number.isInteger(mediach)) {
        document.getElementById('resultmedia').innerHTML = `Média da carga horária é de ${mediach} horas.`
    } else {
        document.getElementById('resultmedia').innerHTML = `Média da carga horária é de ${mediach.toFixed(2)} horas.`
    }

    document.getElementById('chtotal').innerHTML = `${listareduzida} horas.`

}


const fdesvio = (nota) => {
    listanotas.push(nota)
    const listnotared = listanotas.reduce((acc, x) => acc + x)

    const media = listnotared / listanotas.length

    const step1 = listanotas.map((x) => x - media)

    const step2 = step1.map((x) => x**2)

    const somastep2 = step2.reduce((acc, x) => acc + x,0)

    const dividir = somastep2 / (listanotas.length)

    const result = Math.sqrt(dividir)

    if (result == 0) {
        document.getElementById('resultdesvio').innerHTML = `O desvio padrão da média geral é 0`
    } else if (Number.isInteger(result)) {
        document.getElementById('resultdesvio').innerHTML = `O desvio padrão da média geral é ${result}`
    } else {
        document.getElementById('resultdesvio').innerHTML = `O desvio padrão da média geral é  aproximadamente ${result.toFixed(2)}`
    }

}


const faprovados = (nota, codigo, frequencia) => {

    if (nota >= 5 && frequencia >= 75 ) {
        disciplinasaprovadas.push(codigo)

    } else {
        if(disciplinasreprovadas.indexOf(codigo) == -1) {

            disciplinasreprovadas.push(codigo)

        }
    }

    if (disciplinasaprovadas.length == 0) {

        document.getElementById('aprovadas').innerHTML = "Não foi aprovado em nenhuma disciplina até o momento."

    } else {
        document.getElementById('aprovadas').innerHTML = disciplinasaprovadas.map((x) => x)

    }


    if (disciplinasreprovadas.length == 0) {

        document.getElementById('reprovadas').innerHTML = "Não foi reprovado em nenhuma disciplina até o momento."
    } else {
        document.getElementById('reprovadas').innerHTML = disciplinasreprovadas.map((x) => x)
    }

}

const notasdep = []

const fdepartamento = (codigo, nota) => {
    const firststep = codigo.split('')
    const numeros = ['0','1','2','3','4','5','6','7','8','9']

    const filter = (x) => numeros.indexOf(x) == -1

    const listfiltrada = firststep.filter(filter)

    const listjoin = listfiltrada.join('')

    notasdep.push({
        Nome: listjoin,
        Nota: nota
    })


    const filtrodep = notasdep.filter((x) => x.Nome == listjoin)
    const redfiltro = filtrodep.reduce((acc, x) => acc + x.Nota, 0)
    const arrayparagraph = document.getElementById('depart').textContent.split(' ')
    if (arrayparagraph.indexOf(`${listjoin}:`) == -1) {
        document.getElementById('depart').innerHTML += `<p id='${listjoin}'> Média de ${listjoin}: é ${(redfiltro / filtrodep.length).toFixed(2)} </p>`
    } else {
        document.getElementById(`${listjoin}`).innerHTML = `Média de ${listjoin}: é ${(redfiltro / filtrodep.length).toFixed(2)}`
    }
}