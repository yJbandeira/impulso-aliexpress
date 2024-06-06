
// Referência ao banco de dados Firebase
const db = firebase.database().ref('links');

let links = [];

// Carrega os links do Firebase ao iniciar
db.on('value', (snapshot) => {
    const data = snapshot.val();
    links = data ? Object.values(data) : [];
    exibirLinks();
});

function adicionarLink() {
    const linkInput = document.getElementById('linkInput');
    const link = linkInput.value.trim();
    
    if (link && !links.includes(link)) {
        links.push(link);
        salvarLinks();
        exibirLinks();
        linkInput.value = '';
    } else if (links.includes(link)) {
        alert('Link já adicionado!');
    }
}

function exibirLinks() {
    const linkList = document.getElementById('linkList');
    linkList.innerHTML = '';

    links.forEach(link => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        const checkbox = document.createElement('input');

        a.href = link;
        a.textContent = link;
        a.target = '_blank';

        checkbox.type = 'checkbox';

        li.appendChild(checkbox);
        li.appendChild(a);
        linkList.appendChild(li);
    });
}

function salvarLinks() {
    db.set(links);
}
