// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, setDoc, doc, onSnapshot } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCh-ZS_u5AEk1a8z8ZPY7LU9qavYOdmKbE",
  authDomain: "impulso-aliexpress.firebaseapp.com",
  projectId: "impulso-aliexpress",
  storageBucket: "impulso-aliexpress.appspot.com",
  messagingSenderId: "354972574023",
  appId: "1:354972574023:web:befcb8ca29ce101bbeac62",
  measurementId: "G-E4JP58Z82R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

let links = [];

// Referência ao banco de dados Firebase
onSnapshot(doc(db, "links", "links-ali"), (doc) => {
    const source = doc.metadata.hasPendingWrites ? "Local" : "Server";
    links = doc.data().links === undefined ? [] : doc.data().links;
    exibirLinks();
})

async function buscaLinks () {
    const linksRef = await getDocs(collection(db, "links"))
    let actualLink
    linksRef.forEach((doc) => {
        actualLink = doc.data().links === undefined ? [] : doc.data().links
    });

    return actualLink
}

async function adicionarLink() {
    const linkInput = document.getElementById('linkInput');
    const link = linkInput.value.trim();

    let actualLinks = await buscaLinks()

    if (!link.includes(".com") || !link.includes("aliexpress")){
        alert('esse não é um link válido');
    }
    
    if (link && !actualLinks.includes(link)) {
        links.push(link);
        salvarLinks();
        exibirLinks();
        linkInput.value = '';
    } else if (actualLinks.includes(link)) {
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

async function salvarLinks() {
    await setDoc(doc(db, "links", "links-ali"), {
        links: links
      });
}

// Tornando funções globais para acesso ao clique do botão
window.adicionarLink = adicionarLink;
window.exibirLinks = exibirLinks;
